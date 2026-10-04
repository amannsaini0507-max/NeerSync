/**
 * NeerSync 3D Village Digital Twin - Buildings & Infrastructure
 * Builds 15 village houses (mud, brick, tin roof, terraced RCC with rooftop tanks),
 * tap standposts, pump house with borewell casing & control panel, and the 15m ESR.
 */

import * as THREE from 'three';
import { HydraulicEngine } from '../hydraulics/solver-interface.js';

export class VillageBuildings {
  constructor(scene, networkModel) {
    this.scene = scene;
    this.model = networkModel;
    this.houseMeshes = [];
    this.tapStands = [];

    // References to dynamic components
    this.waterMesh = null;
    this.pumpLed = null;

    this.buildElevatedStorageReservoir();
    this.buildPumpHouse();
    this.buildHouseholdDwellings();
  }

  buildElevatedStorageReservoir() {
    const esrGroup = new THREE.Group();
    const [x, groundY, z] = this.model.ESR_POS;
    esrGroup.position.set(x, groundY, z);

    const stagingHeight = 15.0; // 15m structural elevation

    // 4 Structural Reinforced Concrete Columns
    const colGeo = new THREE.CylinderGeometry(0.35, 0.45, stagingHeight, 12);
    const colMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.7 });

    const offsets = [
      [2.2, 2.2], [-2.2, 2.2], [2.2, -2.2], [-2.2, -2.2]
    ];

    offsets.forEach(([ox, oz]) => {
      const col = new THREE.Mesh(colGeo, colMat);
      col.position.set(ox, stagingHeight / 2, oz);
      col.castShadow = true;
      col.receiveShadow = true;
      esrGroup.add(col);
    });

    // Horizontal bracing rings
    [5.0, 10.0, 14.8].forEach((h) => {
      const brace = new THREE.Mesh(
        new THREE.TorusGeometry(3.1, 0.12, 8, 16),
        colMat
      );
      brace.rotation.x = Math.PI / 2;
      brace.position.y = h;
      esrGroup.add(brace);
    });

    // Vertical central riser pipe (transmission & discharge)
    const riser = new THREE.Mesh(
      new THREE.CylinderGeometry(0.24, 0.24, stagingHeight + 1.0, 12),
      new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.4, roughness: 0.4 })
    );
    riser.position.y = (stagingHeight + 1.0) / 2;
    riser.castShadow = true;
    esrGroup.add(riser);

    // Staging top platform
    const platform = new THREE.Mesh(
      new THREE.CylinderGeometry(3.6, 3.6, 0.4, 24),
      new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.6 })
    );
    platform.position.y = stagingHeight;
    platform.receiveShadow = true;
    esrGroup.add(platform);

    // Elevated Water Storage Tank (50,000 Litres buffer)
    const tankHeight = 4.2;
    const tankRadius = 3.2;

    const tankOuter = new THREE.Mesh(
      new THREE.CylinderGeometry(tankRadius, tankRadius, tankHeight, 32),
      new THREE.MeshStandardMaterial({
        color: 0xbae6fd,
        transparent: true,
        opacity: 0.35,
        roughness: 0.1,
        metalness: 0.1,
      })
    );
    tankOuter.position.y = stagingHeight + tankHeight / 2;
    esrGroup.add(tankOuter);

    // Conical tank roof
    const tankRoof = new THREE.Mesh(
      new THREE.ConeGeometry(tankRadius + 0.3, 1.2, 32),
      new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.5 })
    );
    tankRoof.position.y = stagingHeight + tankHeight + 0.6;
    esrGroup.add(tankRoof);

    // Dynamic internal water level cylinder
    const waterGeo = new THREE.CylinderGeometry(tankRadius - 0.1, tankRadius - 0.1, 1.0, 24);
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      roughness: 0.1,
      metalness: 0.6,
      transparent: true,
      opacity: 0.85,
    });
    this.waterMesh = new THREE.Mesh(waterGeo, waterMat);
    this.waterMesh.position.y = stagingHeight + 0.5;
    esrGroup.add(this.waterMesh);

    this.scene.add(esrGroup);
  }

  buildPumpHouse() {
    const pumpGroup = new THREE.Group();
    const [x, groundY, z] = this.model.PUMP_POS;
    pumpGroup.position.set(x, groundY, z);

    // Pump House Building (Brick with tin roof)
    const building = new THREE.Mesh(
      new THREE.BoxGeometry(4.0, 2.8, 3.2),
      new THREE.MeshStandardMaterial({ color: 0xbe123c, roughness: 0.8 }) // Red brick
    );
    building.position.y = 1.4;
    building.castShadow = true;
    building.receiveShadow = true;
    pumpGroup.add(building);

    // Sloped Corrugated Tin Roof
    const roof = new THREE.Mesh(
      new THREE.ConeGeometry(3.2, 1.0, 4),
      new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.6, roughness: 0.4 })
    );
    roof.position.y = 3.3;
    roof.rotation.y = Math.PI / 4;
    roof.castShadow = true;
    pumpGroup.add(roof);

    // Visible Borewell Steel Casing Pipe
    const casing = new THREE.Mesh(
      new THREE.CylinderGeometry(0.25, 0.25, 1.4, 12),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.7, roughness: 0.3 })
    );
    casing.position.set(2.8, 0.7, 0);
    casing.castShadow = true;
    pumpGroup.add(casing);

    // Borewell Cap & Delivery Flange
    const flange = new THREE.Mesh(
      new THREE.CylinderGeometry(0.35, 0.35, 0.2, 12),
      new THREE.MeshStandardMaterial({ color: 0x0284c7 })
    );
    flange.position.set(2.8, 1.4, 0);
    pumpGroup.add(flange);

    // Electrical Starter Panel with Status LED
    const panel = new THREE.Mesh(
      new THREE.BoxGeometry(0.6, 0.9, 0.3),
      new THREE.MeshStandardMaterial({ color: 0x94a3b8 })
    );
    panel.position.set(-2.05, 1.6, 0.5);
    pumpGroup.add(panel);

    const ledGeo = new THREE.SphereGeometry(0.12, 12, 12);
    const ledMat = new THREE.MeshBasicMaterial({ color: 0x22c55e });
    this.pumpLed = new THREE.Mesh(ledGeo, ledMat);
    this.pumpLed.position.set(-2.22, 1.8, 0.5);
    pumpGroup.add(this.pumpLed);

    this.scene.add(pumpGroup);
  }

  buildHouseholdDwellings() {
    // 4 Architectural vernacular materials
    const materials = {
      mud: new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.9 }),
      brick: new THREE.MeshStandardMaterial({ color: 0xb91c1c, roughness: 0.8 }),
      plaster: new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.6 }),
      roofTile: new THREE.MeshStandardMaterial({ color: 0x9a3412, roughness: 0.7 }),
      roofTin: new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.6, roughness: 0.4 }),
      roofFlat: new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.6 }),
      sintexTank: new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.3 }),
      faucetBrass: new THREE.MeshStandardMaterial({ color: 0xeab308, metalness: 0.8, roughness: 0.2 }),
    };

    this.model.households.forEach((node, idx) => {
      const houseGroup = new THREE.Group();
      const [hx, hy, hz] = node.housePos;
      houseGroup.position.set(hx, hy, hz);

      const variant = idx % 4; // 0=mud, 1=brick, 2=tin, 3=terraced RCC
      const bodyMat = (variant === 0) ? materials.mud : (variant === 1) ? materials.brick : materials.plaster;

      // House main building
      const width = node.siteType === 'school' ? 4.2 : 2.6;
      const height = node.siteType === 'school' ? 2.4 : 1.8;
      const depth = node.siteType === 'school' ? 3.4 : 2.4;

      const body = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), bodyMat.clone());
      body.position.y = height / 2;
      body.castShadow = true;
      body.receiveShadow = true;
      body.userData.node = node;
      houseGroup.add(body);
      this.houseMeshes.push(body);
      node.mesh = body;

      // Roof styles
      if (variant === 0) {
        // Thatch/mud roof
        const roof = new THREE.Mesh(new THREE.ConeGeometry(2.2, 1.1, 4), materials.roofTile);
        roof.position.y = height + 0.55;
        roof.rotation.y = Math.PI / 4;
        roof.castShadow = true;
        houseGroup.add(roof);
      } else if (variant === 1 || variant === 2) {
        // Sloped tile or tin roof
        const roof = new THREE.Mesh(
          new THREE.ConeGeometry(2.3, 0.9, 4),
          variant === 1 ? materials.roofTile : materials.roofTin
        );
        roof.position.y = height + 0.45;
        roof.rotation.y = Math.PI / 4;
        roof.castShadow = true;
        houseGroup.add(roof);
      } else {
        // Flat terraced RCC with Sintex Rooftop Tank
        const parapet = new THREE.Mesh(
          new THREE.BoxGeometry(width + 0.2, 0.25, depth + 0.2),
          materials.roofFlat
        );
        parapet.position.y = height + 0.12;
        houseGroup.add(parapet);

        const sintex = new THREE.Mesh(
          new THREE.CylinderGeometry(0.45, 0.45, 0.8, 12),
          materials.sintexTank
        );
        sintex.position.set(0.6, height + 0.55, 0.4);
        sintex.castShadow = true;
        houseGroup.add(sintex);
      }

      // Private Courtyard Tap Standpost
      const standPost = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 0.85, 8),
        new THREE.MeshStandardMaterial({ color: 0x475569 })
      );
      standPost.position.set(1.6, 0.42, 1.2);
      standPost.castShadow = true;

      // Brass Faucet
      const bibcock = new THREE.Mesh(
        new THREE.CylinderGeometry(0.03, 0.03, 0.15, 6),
        materials.faucetBrass
      );
      bibcock.position.set(1.68, 0.8, 1.2);
      bibcock.rotation.z = Math.PI / 2;

      houseGroup.add(standPost, bibcock);
      this.tapStands.push({
        node,
        worldPos: new THREE.Vector3(hx + 1.68, hy + 0.8, hz + 1.2),
      });

      this.scene.add(houseGroup);
    });
  }

  /**
   * Updates visual appearance of tank water, pump status lamp, and house colors.
   */
  update(state) {
    // 1. Elevated Storage Reservoir Water Level
    if (this.waterMesh) {
      const normalizedLevel = Math.max(0.05, Math.min(4.0, state.level));
      this.waterMesh.scale.y = normalizedLevel;
      // Staging platform is at y=15m
      this.waterMesh.position.y = 15.0 + normalizedLevel / 2;
    }

    // 2. Pump Electrical Status Lamp
    if (this.pumpLed) {
      if (state.pumpOn) {
        this.pumpLed.material.color.setHex(0x22c55e); // Green: Running
      } else if (state.pumpCmd) {
        this.pumpLed.material.color.setHex(0xef4444); // Red: Tripped / Fault
      } else {
        this.pumpLed.material.color.setHex(0x94a3b8); // Gray: Idle
      }
    }

    // 3. Household Color Coding by Status
    const statusColors = {
      ok: 0xdfe9e4,     // Pale clean stone
      low: 0xf59e0b,    // Amber warning
      none: 0xef4444,   // Red outage
      unsafe: 0x9333ea, // Purple contamination
    };

    this.model.households.forEach((n) => {
      const status = HydraulicEngine.getHouseholdStatus(n);
      if (n.mesh) {
        n.mesh.material.color.setHex(statusColors[status] || 0xdfe9e4);
      }
    });
  }
}
