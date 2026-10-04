/**
 * NeerSync 3D Village Digital Twin - Dynamic Fluid Dynamics & Visual Effects
 * Simulates pipe internal flow particles, tap water discharge/dribbles,
 * catastrophic burst fountains, and terrain-spreading puddles.
 */

import * as THREE from 'three';

export class VillageWaterEffects {
  constructor(scene, pipesManager, buildingsManager) {
    this.scene = scene;
    this.pipesManager = pipesManager;
    this.buildingsManager = buildingsManager;

    this.flowPointsMesh = null;
    this.flowPositions = null;
    this.tapStreams = [];

    // Fountains and puddles for burst and leak faults
    this.burstEffect = null;
    this.leakEffect = null;

    this.initPipeFlowParticles();
    this.initHouseholdTapStreams();
    this.initBurstAndLeakEffects();
  }

  initPipeFlowParticles() {
    const totalPipes = this.pipesManager.pipes.length;
    const particlesPerPipe = 8;
    const totalParticles = totalPipes * particlesPerPipe;

    this.flowPositions = new Float32Array(totalParticles * 3);

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(this.flowPositions, 3));

    const mat = new THREE.PointsMaterial({
      color: 0xbae6fd,
      size: 0.35,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
    });

    this.flowPointsMesh = new THREE.Points(geo, mat);
    this.flowPointsMesh.renderOrder = 2;
    this.flowPointsMesh.frustumCulled = false;
    this.scene.add(this.flowPointsMesh);
  }

  initHouseholdTapStreams() {
    const streamGeo = new THREE.CylinderGeometry(0.015, 0.02, 0.7, 6);
    streamGeo.translate(0, -0.35, 0);

    const streamMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.85,
      roughness: 0.1,
      metalness: 0.5,
    });

    this.buildingsManager.tapStands.forEach((tap) => {
      const mesh = new THREE.Mesh(streamGeo, streamMat.clone());
      mesh.position.copy(tap.worldPos);
      mesh.visible = false;
      this.scene.add(mesh);

      this.tapStreams.push({
        node: tap.node,
        mesh,
        tapPos: tap.worldPos,
      });
    });
  }

  createSprayEffect(particleCount, size, sourceCoord, maxPuddleRadius) {
    const pos = new Float32Array(particleCount * 3).fill(-100);
    const vel = new Float32Array(particleCount * 3);

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

    const mat = new THREE.PointsMaterial({
      color: 0xe0f2fe,
      size,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
    });

    const particles = new THREE.Points(geo, mat);
    particles.visible = false;
    particles.renderOrder = 3;
    particles.frustumCulled = false;
    this.scene.add(particles);

    // Spreading terrain puddle mesh
    const puddleGeo = new THREE.CircleGeometry(1.0, 32);
    puddleGeo.rotateX(-Math.PI / 2);

    const puddleMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      transparent: true,
      opacity: 0.75,
      roughness: 0.1,
      metalness: 0.8,
    });

    const puddle = new THREE.Mesh(puddleGeo, puddleMat);
    puddle.position.set(sourceCoord[0], sourceCoord[1] + 0.06, sourceCoord[2]);
    puddle.scale.set(0.01, 0.01, 0.01);
    this.scene.add(puddle);

    return {
      particles,
      pos,
      vel,
      count: particleCount,
      source: new THREE.Vector3(...sourceCoord),
      puddle,
      maxPuddleRadius,
      growth: 0.0,
    };
  }

  initBurstAndLeakEffects() {
    // Ruptured pipe burst at Branch A, Node 1 (House A2)
    const burstNodePos = this.pipesManager.model.nodes[0][1].pos;
    this.burstEffect = this.createSprayEffect(220, 0.38, burstNodePos, 4.5);

    // Incipient leak at Branch B, Node 2 (House B3)
    const leakNodePos = this.pipesManager.model.nodes[1][2].pos;
    this.leakEffect = this.createSprayEffect(60, 0.22, leakNodePos, 1.8);
  }

  stepSpraySystem(spray, active, dtSeconds, velocityPower) {
    spray.particles.visible = active || spray.growth > 0.02;

    // Puddle dynamic spreading
    spray.growth = Math.max(0, Math.min(1.0, spray.growth + (active ? 0.08 : -0.04) * dtSeconds * 4));
    const puddleScale = Math.max(0.01, spray.growth * spray.maxPuddleRadius);
    spray.puddle.scale.set(puddleScale, 1.0, puddleScale);

    if (!spray.particles.visible) return;

    for (let k = 0; k < spray.count; k++) {
      const idx = k * 3;

      // Respawn particle if active and hit ground
      if (active && spray.pos[idx + 1] < spray.source.y) {
        spray.pos[idx] = spray.source.x + (Math.random() - 0.5) * 0.4;
        spray.pos[idx + 1] = spray.source.y + 0.1;
        spray.pos[idx + 2] = spray.source.z + (Math.random() - 0.5) * 0.4;

        spray.vel[idx] = (Math.random() - 0.5) * velocityPower * 1.5;
        spray.vel[idx + 1] = velocityPower * (1.5 + Math.random() * 2.2); // Ballistic upward jet
        spray.vel[idx + 2] = (Math.random() - 0.5) * velocityPower * 1.5;
      } else if (spray.pos[idx + 1] >= spray.source.y) {
        // Physical ballistic kinematics
        spray.pos[idx] += spray.vel[idx] * dtSeconds;
        spray.pos[idx + 1] += spray.vel[idx + 1] * dtSeconds;
        spray.pos[idx + 2] += spray.vel[idx + 2] * dtSeconds;
        spray.vel[idx + 1] -= 9.81 * dtSeconds; // Gravity deceleration
      }
    }

    spray.particles.geometry.attributes.position.needsUpdate = true;
  }

  update(state, hydraulicResults, dtSeconds) {
    // 1. Update Pipe Flow Particle Motion
    let particleIdx = 0;
    const particlesPerPipe = 8;
    const cClean = new THREE.Color(0xbae6fd);
    const cDirty = new THREE.Color(0xa16207);

    if (this.flowPointsMesh) {
      this.flowPointsMesh.material.color.copy(state.tu > 5.0 ? cDirty : cClean);
    }

    this.pipesManager.pipes.forEach((p) => {
      // Determine segment flow rate
      let flow = 0;
      if (p.type === 'pump') {
        flow = state.pumpOn ? 400.0 : 0.0;
      } else if (p.type === 'trunk') {
        flow = hydraulicResults.trunkFlow;
      } else if (p.refNode) {
        flow = p.type === 'branch' ? hydraulicResults.branchFlows[p.refNode.bIdx][p.refNode.index] : p.refNode.q;
      }

      // Speed proportional to physical flow rate
      const speed = flow > 0.5 ? Math.min(3.0, 0.2 + flow * 0.008) : 0.0;

      for (let j = 0; j < particlesPerPipe; j++) {
        p.particlesPhase[j] = (p.particlesPhase[j] + (speed * dtSeconds) / Math.max(1.0, p.length)) % 1.0;
        const phase = p.particlesPhase[j];

        const o = particleIdx * 3;
        this.flowPositions[o] = p.a.x + (p.b.x - p.a.x) * phase;
        this.flowPositions[o + 1] = p.a.y + (p.b.y - p.a.y) * phase;
        this.flowPositions[o + 2] = p.a.z + (p.b.z - p.a.z) * phase;

        particleIdx++;
      }
    });

    if (this.flowPointsMesh) {
      this.flowPointsMesh.geometry.attributes.position.needsUpdate = true;
    }

    // 2. Update Household Tap Water Streams
    this.tapStreams.forEach((tap) => {
      const isSupply = hydraulicResults.isSupply;
      const pressure = tap.node.P;
      const isDirty = tap.node.tu > 5.0;

      if (!isSupply || pressure < 3.0) {
        // Tap is closed or dry
        tap.mesh.visible = false;
      } else {
        tap.mesh.visible = true;
        tap.mesh.material.color.setHex(isDirty ? 0x78350f : 0x38bdf8);

        if (pressure < 7.14) {
          // Low pressure: thin dribble / sputtering
          tap.mesh.scale.set(0.35, 0.7, 0.35);
        } else {
          // Robust full flow
          tap.mesh.scale.set(1.0, 1.0, 1.0);
        }
      }
    });

    // 3. Update Ruptured Pipe Burst and Slow Leak Fountains
    this.stepSpraySystem(this.burstEffect, Boolean(state.faults.burst), dtSeconds, 4.2);
    this.stepSpraySystem(this.leakEffect, Boolean(state.faults.leak), dtSeconds, 1.6);
  }
}
