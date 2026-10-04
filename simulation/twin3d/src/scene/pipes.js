/**
 * JalSetu 3D Village Digital Twin - Pipes, Valves, & Pressure Shaders
 * Builds subterranean PVC and HDPE piping with physical diameter scaling,
 * fittings, gate valves, and pressure-colour gradients.
 */

import * as THREE from 'three';
import { PIPE_SPECS } from '../config.js';

export class VillagePipes {
  constructor(scene, networkModel) {
    this.scene = scene;
    this.model = networkModel;
    this.pipes = [];
    this.pipeGroup = new THREE.Group();
    this.valvesGroup = new THREE.Group();

    this.buildNetworkPipes();
    this.buildFittingsAndValves();
    this.scene.add(this.pipeGroup, this.valvesGroup);
  }

  createPipeCylinder(startPos, endPos, diameterMm, type, refNode = null) {
    const a = new THREE.Vector3(...startPos);
    const b = new THREE.Vector3(...endPos);

    // Place pipe 0.6m subterranean beneath ground surface
    a.y = a.y - 0.6;
    b.y = b.y - 0.6;

    const length = a.distanceTo(b);
    const radius = Math.max(0.06, (diameterMm / 1000) * 1.6); // Slightly enlarged for visibility

    const geo = new THREE.CylinderGeometry(radius, radius, length, 12);
    // Align cylinder with vector from a to b
    geo.translate(0, length / 2, 0);
    geo.rotateX(Math.PI / 2);

    const mat = new THREE.MeshStandardMaterial({
      color: 0x0284c7, // Base PVC Blue
      roughness: 0.35,
      metalness: 0.15,
    });

    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.copy(a);
    mesh.lookAt(b);
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    this.pipeGroup.add(mesh);

    const pipeData = {
      a,
      b,
      mesh,
      length,
      diameterMm,
      type, // 'trunk' | 'branch' | 'service' | 'pump'
      refNode,
      particlesPhase: [0.0, 0.2, 0.4, 0.6, 0.8],
    };

    this.pipes.push(pipeData);
    return pipeData;
  }

  buildNetworkPipes() {
    const { PUMP_POS, ESR_POS, J0_POS, nodes } = this.model;

    // 1. Pump to Elevated Storage Reservoir Header (90mm HDPE)
    this.createPipeCylinder(PUMP_POS, ESR_POS, PIPE_SPECS.TRUNK_DIA_MM, 'pump');

    // 2. ESR to Main Distribution Header J0 (90mm Trunk Main)
    this.createPipeCylinder(ESR_POS, J0_POS, PIPE_SPECS.TRUNK_DIA_MM, 'trunk');

    // 3. Distribution Branch Mains and Household Service Connections
    nodes.forEach((branch) => {
      branch.forEach((node, i) => {
        const prevPos = (i === 0) ? J0_POS : branch[i - 1].pos;
        const dia = PIPE_SPECS.BRANCH_DIAS_MM[i];

        // Distribution main segment
        this.createPipeCylinder(prevPos, node.pos, dia, 'branch', node);

        // Household service line from branch node to household tap stand
        this.createPipeCylinder(node.pos, node.housePos, PIPE_SPECS.SERVICE_DIA_MM, 'service', node);
      });
    });
  }

  buildFittingsAndValves() {
    // Branch Header Tees and Isolation Gate Valves at J0
    const [jx, jy, jz] = this.model.J0_POS;
    const groundJ = jy - 0.6;

    // Sluice Gate Valve Handwheels at the head of each branch
    const valveGeo = new THREE.TorusGeometry(0.28, 0.04, 8, 16);
    valveGeo.rotateX(Math.PI / 2);
    const stemGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.6, 8);
    const valveMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.4, metalness: 0.6 }); // Brass/Bronze

    this.model.nodes.forEach((branch) => {
      const dir = branch[0].pos;
      const vx = jx + (dir[0] - jx) * 0.15;
      const vz = jz + (dir[2] - jz) * 0.15;

      const valveGroup = new THREE.Group();
      valveGroup.position.set(vx, groundJ + 0.3, vz);

      const stem = new THREE.Mesh(stemGeo, valveMat);
      stem.position.y = 0.3;
      const wheel = new THREE.Mesh(valveGeo, valveMat);
      wheel.position.y = 0.6;

      valveGroup.add(stem, wheel);
      this.valvesGroup.add(valveGroup);
    });
  }

  /**
   * Updates pipe colors along the network to show pressure and water quality gradients.
   */
  update(state, hydraulicResults) {
    const cOK = new THREE.Color(0x0284c7);    // Normal Pressure (>=70 kPa / 7.14m)
    const cLOW = new THREE.Color(0xf59e0b);   // Low Pressure (<70 kPa)
    const cNONE = new THREE.Color(0xef4444);  // Critical Depletion / Outage (<3m)
    const cDIRTY = new THREE.Color(0x78350f); // Contaminated Water (>5 NTU)

    this.pipes.forEach((p) => {
      let pressure = 14.0;
      let turbidity = state.tu;

      if (p.refNode) {
        pressure = p.refNode.P;
        turbidity = p.refNode.tu;
      } else if (p.type === 'trunk') {
        pressure = state.PJ_head || 14.0;
      }

      // Color selection based on physical state
      if (turbidity > 5.0) {
        p.mesh.material.color.copy(cDIRTY);
      } else if (pressure >= 7.14) {
        p.mesh.material.color.copy(cOK);
      } else if (pressure >= 3.0) {
        p.mesh.material.color.copy(cLOW);
      } else {
        p.mesh.material.color.copy(cNONE);
      }
    });
  }
}
