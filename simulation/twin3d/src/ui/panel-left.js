/**
 * NeerSync 3D Village Digital Twin - Left Control Panel
 * Renders fault toggles, scenario presets, time controls, house legend, and x-ray cutaway.
 */

import { FAULT_DEFINITIONS, SCENARIO_PRESETS } from '../scenarios/faults.js';

export class PanelLeft {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.onToggleFault = options.onToggleFault || (() => {});
    this.onClearFaults = options.onClearFaults || (() => {});
    this.onSpeedChange = options.onSpeedChange || (() => {});
    this.onJumpSupply = options.onJumpSupply || (() => {});
    this.onToggleCutaway = options.onToggleCutaway || (() => {});
    this.onSelectPreset = options.onSelectPreset || (() => {});

    this.render();
    this.attachEventListeners();
  }

  render() {
    if (!this.container) return;

    const faultsHtml = FAULT_DEFINITIONS.map(f => `
      <button class="fault-btn" data-fault="${f.key}">
        <b>${f.title}</b>
        <small>${f.desc}</small>
      </button>
    `).join('');

    const presetsHtml = SCENARIO_PRESETS.map(p => `
      <option value="${p.id}">${p.name}</option>
    `).join('');

    this.container.innerHTML = `
      <div class="section-card">
        <h2>Inject A Problem</h2>
        <div id="faults-list">
          ${faultsHtml}
          <button class="btn-block" id="btn-clear-faults" style="margin-top:8px;">
            Clear All Problems
          </button>
        </div>
      </div>

      <div class="section-card">
        <h2>Scenario Presets</h2>
        <select id="preset-select" style="width:100%; padding:7px; border-radius:6px; border:1px solid var(--line); background:var(--panel); color:var(--ink); font-size:12px; margin-bottom:8px;">
          <option value="">-- Choose a Preset Scenario --</option>
          ${presetsHtml}
        </select>
        <button class="btn-block btn-sm" id="btn-load-preset">Run Preset Scenario</button>
      </div>

      <div class="section-card">
        <h2>Simulation Clock</h2>
        <div class="btn-row" id="speed-buttons">
          <button data-speed="0">Pause</button>
          <button data-speed="2" class="active">2x (Normal)</button>
          <button data-speed="8">8x (Fast)</button>
        </div>
        <button class="btn-block btn-sm" id="btn-jump-supply" style="margin-top:8px;">
          Jump To Next Supply Window
        </button>
      </div>

      <div class="section-card">
        <h2>3D Views & Inspection</h2>
        <button class="btn-block" id="btn-toggle-xray" style="margin-bottom:8px;">
          Trench Cutaway (X-Ray View): OFF
        </button>
        <div class="legend-grid">
          <div class="legend-item"><span class="legend-color" style="background:#dfe9e4;"></span>Water OK</div>
          <div class="legend-item"><span class="legend-color" style="background:#f59e0b;"></span>Low Pressure</div>
          <div class="legend-item"><span class="legend-color" style="background:#ef4444;"></span>No Water</div>
          <div class="legend-item"><span class="legend-color" style="background:#9333ea;"></span>Unsafe Quality</div>
        </div>
      </div>
    `;
  }

  attachEventListeners() {
    // Fault toggle buttons
    this.container.querySelectorAll('[data-fault]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.fault;
        this.onToggleFault(key);
      });
    });

    // Clear faults
    const clearBtn = this.container.querySelector('#btn-clear-faults');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => this.onClearFaults());
    }

    // Speed controls
    this.container.querySelectorAll('[data-speed]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const speed = Number(btn.dataset.speed);
        this.container.querySelectorAll('[data-speed]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.onSpeedChange(speed);
      });
    });

    // Jump supply
    const jumpBtn = this.container.querySelector('#btn-jump-supply');
    if (jumpBtn) {
      jumpBtn.addEventListener('click', () => this.onJumpSupply());
    }

    // Trench Cutaway
    const xrayBtn = this.container.querySelector('#btn-toggle-xray');
    if (xrayBtn) {
      let xrayState = false;
      xrayBtn.addEventListener('click', () => {
        xrayState = !xrayState;
        xrayBtn.classList.toggle('active', xrayState);
        xrayBtn.textContent = `Trench Cutaway (X-Ray View): ${xrayState ? 'ON' : 'OFF'}`;
        this.onToggleCutaway(xrayState);
      });
    }

    // Presets
    const loadPresetBtn = this.container.querySelector('#btn-load-preset');
    const select = this.container.querySelector('#preset-select');
    if (loadPresetBtn && select) {
      loadPresetBtn.addEventListener('click', () => {
        if (select.value) {
          this.onSelectPreset(select.value);
        }
      });
    }
  }

  updateFaultButtons(faults) {
    this.container.querySelectorAll('[data-fault]').forEach((btn) => {
      const key = btn.dataset.fault;
      btn.classList.toggle('active', Boolean(faults[key]));
    });
  }
}
