/**
 * JalSetu 3D Village Digital Twin - Master Application Orchestrator
 * Integrates Three.js PBR rendering, Hazen-Williams/epanet-js hydraulics,
 * IoT sensor telemetry, JJM alert engine, and interactive UI panels.
 */

import * as THREE from 'three';
import { createNetworkModel } from './hydraulics/network-model.js';
import { HydraulicEngine } from './hydraulics/solver-interface.js';
import { SceneRenderer } from './scene/renderer.js';
import { CameraManager } from './scene/camera.js';
import { LightingManager } from './scene/lighting.js';
import { VillageTerrain } from './scene/terrain.js';
import { VillageBuildings } from './scene/buildings.js';
import { VillagePipes } from './scene/pipes.js';
import { VillageWaterEffects } from './scene/water.js';
import { AlertEngine } from './alerts/rules.js';
import { CitizenGrievanceSimulator } from './alerts/grievances.js';
import { IoTTelemetryManager } from './telemetry/nodes.js';
import { ContractsValidator } from './telemetry/validator.js';
import { MQTTStreamer } from './telemetry/mqtt-client.js';
import { exportContractsBundle } from './telemetry/exporter.js';
import { ScenarioRecorder } from './scenarios/recorder.js';
import { PanelLeft } from './ui/panel-left.js';
import { PanelRight } from './ui/panel-right.js';
import { PanelAnalytics } from './ui/panel-analytics.js';
import { HouseInspector } from './ui/details-modal.js';
import { SENSOR_NODES } from './config.js';

class JalSetuVillageTwinApp {
  constructor() {
    this.canvas = document.getElementById('canvas3d');
    this.container = document.getElementById('viewport-container');

    // 1. Hydraulic & Village Graph Model
    this.model = createNetworkModel();
    this.engine = new HydraulicEngine(this.model);

    // 2. Simulation State (Seeded & Reproducible)
    this.state = {
      simTimeMinutes: 330, // Start at 05:30 AM
      speed: 2,            // 2x speed default
      level: 3.0,          // 3.0m in elevated tank
      pumpCmd: false,
      pumpOn: false,
      pumpCurrent: 0.0,
      pumpFlow: 0.0,
      cl: 0.48,            // 0.48 mg/L residual chlorine
      tu: 1.10,            // 1.10 NTU turbidity
      nodes: this.model.nodes,
      faults: {
        pump: 0,
        leak: 0,
        burst: 0,
        choke: 0,
        rain: 0,
      },
      currentTheme: 'light',
    };

    // 3. Scene, Camera, Renderer, & Lighting
    this.scene = new THREE.Scene();
    this.renderer = new SceneRenderer(this.canvas);
    this.cameraManager = new CameraManager(this.canvas, this.container.clientWidth / this.container.clientHeight);
    this.lighting = new LightingManager(this.scene);

    // 4. Physical 3D Assets & Dynamics
    this.terrain = new VillageTerrain(this.scene);
    this.buildings = new VillageBuildings(this.scene, this.model);
    this.pipes = new VillagePipes(this.scene, this.model);
    this.water = new VillageWaterEffects(this.scene, this.pipes, this.buildings);

    // 5. IoT Telemetry, Alerts, & Contracts
    this.alertEngine = new AlertEngine(this.model);
    this.grievanceSimulator = new CitizenGrievanceSimulator(this.model);
    this.telemetryManager = new IoTTelemetryManager();
    this.validator = new ContractsValidator();
    this.recorder = new ScenarioRecorder();

    this.mqtt = new MQTTStreamer({
      onStatusChange: (statusText, isConnected) => {
        this.panelRight?.setMqttStatus(statusText, isConnected);
      },
    });

    // History tracking for export
    this.telemetryHistory = [];
    this.alertsHistory = [];

    // 6. UI Panels
    this.inspector = new HouseInspector('house-inspector');
    this.panelLeft = null;
    this.panelRight = null;
    this.panelAnalytics = null;

    // Raycasting for interactive clicks
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.lastFrameTime = performance.now();
    this.init();
  }

  init() {
    this.initThemeAndHeader();
    this.initPanels();
    this.initInteraction();
    this.initResizeHandler();

    // Initial solve step
    const initialHydraulics = this.engine.step(this.state, 0.1);
    this.updateVisuals(initialHydraulics, 0.016);

    // Start render loop
    requestAnimationFrame((t) => this.loop(t));
  }

  initThemeAndHeader() {
    const themeBtn = document.getElementById('btn-theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        this.state.currentTheme = this.state.currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.state.currentTheme);
        this.lighting.updateDayNightCycle(this.state.simTimeMinutes, this.state.currentTheme);
      });
    }

    const qualitySelector = document.getElementById('quality-selector');
    if (qualitySelector) {
      qualitySelector.addEventListener('change', (e) => {
        this.renderer.setQuality(e.target.value);
      });
    }

    const resetBtn = document.getElementById('btn-reset-view');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => this.cameraManager.resetView());
    }
  }

  initPanels() {
    // Left Control Panel
    this.panelLeft = new PanelLeft('panel-left', {
      onToggleFault: (key) => {
        this.state.faults[key] = this.state.faults[key] ? 0 : 1;
        this.panelLeft.updateFaultButtons(this.state.faults);

        // Shake camera if burst triggered
        if (key === 'burst' && this.state.faults.burst) {
          this.cameraManager.triggerShake(0.55, 1.5);
          const burstPos = this.model.nodes[0][1].pos;
          this.cameraManager.flyTo(new THREE.Vector3(...burstPos), 18.0);
        }
      },
      onClearFaults: () => {
        Object.keys(this.state.faults).forEach(k => (this.state.faults[k] = 0));
        this.panelLeft.updateFaultButtons(this.state.faults);
      },
      onSpeedChange: (speed) => {
        this.state.speed = speed;
      },
      onJumpSupply: () => {
        // Jump to next scheduled supply window (06:00 or 17:00)
        const hour = (this.state.simTimeMinutes / 60) % 24;
        let targetHour = 6.0;
        if (hour < 5.8) targetHour = 6.0;
        else if (hour < 16.8) targetHour = 17.0;
        else targetHour = 30.0; // 06:00 next day

        const baseDay = Math.floor(this.state.simTimeMinutes / 1440) * 1440;
        this.state.simTimeMinutes = baseDay + targetHour * 60;
      },
      onToggleCutaway: (enabled) => {
        this.terrain.setTrenchCutaway(enabled);
      },
      onSelectPreset: (presetId) => {
        this.loadScenarioPreset(presetId);
      },
    });

    // Right Telemetry & Alerts Panel
    this.panelRight = new PanelRight('panel-right', {
      onFocusAlert: (scopeText) => {
        this.focusCameraOnScope(scopeText);
      },
      onDownloadBundle: () => {
        exportContractsBundle({
          telemetryHistory: this.telemetryHistory.slice(-50),
          alertsHistory: this.alertsHistory,
          feedbackLog: this.grievanceSimulator.feedbackLog,
        });
      },
    });

    // Bottom Analytics Panel
    this.panelAnalytics = new PanelAnalytics('analytics-bar');
  }

  initInteraction() {
    // Click on canvas to inspect household
    this.canvas.addEventListener('pointerup', (e) => {
      // Calculate normalized device coordinates
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.cameraManager.camera);
      const intersects = this.raycaster.intersectObjects(this.buildings.houseMeshes);

      if (intersects.length > 0) {
        const clickedHouse = intersects[0].object;
        const node = clickedHouse.userData.node;
        if (node) {
          this.inspector.show(node);
          this.cameraManager.flyTo(new THREE.Vector3(...node.housePos), 14.0);
        }
      }
    });
  }

  focusCameraOnScope(scopeText) {
    if (scopeText.includes('Branch A')) {
      const pos = this.model.nodes[0][1].pos;
      this.cameraManager.flyTo(new THREE.Vector3(...pos), 18.0);
    } else if (scopeText.includes('Branch B')) {
      const pos = this.model.nodes[1][2].pos;
      this.cameraManager.flyTo(new THREE.Vector3(...pos), 18.0);
    } else if (scopeText.includes('Branch C')) {
      const pos = this.model.nodes[2][2].pos;
      this.cameraManager.flyTo(new THREE.Vector3(...pos), 18.0);
    } else if (scopeText.includes('Pump')) {
      this.cameraManager.flyTo(new THREE.Vector3(...this.model.PUMP_POS), 18.0);
    } else if (scopeText.includes('Reservoir') || scopeText.includes('Tank')) {
      this.cameraManager.flyTo(new THREE.Vector3(...this.model.ESR_POS), 22.0);
    }
  }

  loadScenarioPreset(presetId) {
    if (presetId === 'monsoon_week') {
      this.state.faults.rain = 1;
      this.state.faults.burst = 1;
    } else if (presetId === 'summer_shortage') {
      this.state.faults.choke = 1;
      this.state.level = 0.8;
    } else if (presetId === 'dawn_pump_trip') {
      this.state.faults.pump = 1;
      this.state.simTimeMinutes = 350; // 05:50 AM
    }
    this.panelLeft?.updateFaultButtons(this.state.faults);
  }

  initResizeHandler() {
    const handleResize = () => {
      const w = this.container.clientWidth;
      const h = this.container.clientHeight;
      if (w > 0 && h > 0) {
        this.renderer.resize(w, h);
        this.cameraManager.resize(w / h);
      }
    };

    window.addEventListener('resize', handleResize);
    new ResizeObserver(handleResize).observe(this.container);
  }

  loop(currentTime) {
    const dtSeconds = Math.min(0.1, (currentTime - this.lastFrameTime) / 1000);
    this.lastFrameTime = currentTime;

    // Simulation time advance
    if (this.state.speed > 0) {
      const simDeltaMinutes = dtSeconds * this.state.speed;

      // 1. Advance hydraulics & water quality
      const hydraulicResults = this.engine.step(this.state, simDeltaMinutes);

      // 2. Evaluate explainable alert rules
      const alertResults = this.alertEngine.evaluate(this.state, hydraulicResults);

      // 3. Citizen grievance probability step
      this.grievanceSimulator.step(this.state, simDeltaMinutes);

      // 4. Emit IoT telemetry and validate against /contracts
      const packets = this.telemetryManager.emitLiveTelemetry(this.state, hydraulicResults);
      packets.forEach((packet) => {
        // Schema check
        const validRes = this.validator.validateTelemetry(packet);
        if (validRes.valid) {
          this.mqtt.publishTelemetry(packet);
          this.telemetryHistory.push(packet);
        }
      });

      // Keep recent telemetry history bounded
      if (this.telemetryHistory.length > 200) {
        this.telemetryHistory.splice(0, 50);
      }

      this.alertsHistory = alertResults.active;

      // 5. Update UI Panels
      this.updateUI(hydraulicResults, alertResults.active);

      // 6. Update 3D Visual Effects
      this.updateVisuals(hydraulicResults, dtSeconds);
    }

    // Camera update & render
    this.cameraManager.update();
    this.renderer.render(this.scene, this.cameraManager.camera);

    requestAnimationFrame((t) => this.loop(t));
  }

  updateUI(hydraulicResults, activeAlerts) {
    // Clock badge in header
    const clockDisplay = document.getElementById('clock-display');
    const supplyTag = document.getElementById('supply-tag');
    if (clockDisplay) {
      const day = Math.floor(this.state.simTimeMinutes / 1440) + 1;
      const timeStr = this.alertEngine.formatTime(this.state.simTimeMinutes);
      clockDisplay.textContent = `Day ${day}, ${timeStr}`;
    }
    if (supplyTag) {
      supplyTag.style.display = hydraulicResults.isSupply ? 'inline-block' : 'none';
    }

    // Panels
    this.panelRight?.updateSensors(this.state, hydraulicResults, this.model);
    this.panelRight?.updateAlerts(activeAlerts, this.state.simTimeMinutes);
    this.panelRight?.updateGrievances(this.grievanceSimulator.feedbackLog);
    this.panelAnalytics?.update(this.state, hydraulicResults, this.model);

    // Refresh clicked house inspector if open
    if (this.inspector?.selectedNode) {
      this.inspector.render();
    }
  }

  updateVisuals(hydraulicResults, dtSeconds) {
    this.lighting.updateDayNightCycle(this.state.simTimeMinutes, this.state.currentTheme);
    this.buildings.update(this.state);
    this.pipes.update(this.state, hydraulicResults);
    this.water.update(this.state, hydraulicResults, dtSeconds);
  }
}

// Instantiate on DOM load
window.addEventListener('DOMContentLoaded', () => {
  window.jalSetuApp = new JalSetuVillageTwinApp();
});
