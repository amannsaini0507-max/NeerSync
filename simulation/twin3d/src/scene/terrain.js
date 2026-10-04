/**
 * NeerSync 3D Village Digital Twin - Procedural Terrain & Environment
 * Generates sloped topography (0m to 8m), village paths, fields, pond,
 * public handpump, trees, and vulnerable site markers (Anganwadi, Primary School).
 */

import * as THREE from 'three';

export class VillageTerrain {
  constructor(scene) {
    this.scene = scene;
    this.groundMesh = null;
    this.pondMesh = null;
    this.decorationsGroup = new THREE.Group();
    this.isXRayCutaway = false;

    this.buildTerrain();
    this.buildVillagePond();
    this.buildPublicHandpump();
    this.buildVegetationAndFields();
    this.scene.add(this.decorationsGroup);
  }

  /**
   * Analytic height equation mapping (x, z) to ground elevation.
   * Matches network node elevations in network-model.js exactly.
   */
  getElevation(x, z) {
    // ESR knoll peak at (0, -9)
    const distToEsr = Math.hypot(x - 0, z - (-9));
    const esrKnoll = Math.max(0, 8.0 * Math.exp(-Math.pow(distToEsr / 8.0, 2)));

    // Pump terrace at (-14, -9)
    const distToPump = Math.hypot(x - (-14), z - (-9));
    const pumpTerrace = Math.max(0, 4.0 * Math.exp(-Math.pow(distToPump / 6.0, 2)));

    // Branch B ridge along positive X: rises from 4.5m to 6.5m
    const ridgeB = (x > 0 && Math.abs(z) < 10) ? Math.min(6.5, 4.5 + (x / 25.0) * 2.0) : 0;

    // Branch A terrace along negative X: descends to 3.0m
    const terraceA = (x < 0 && Math.abs(z) < 10) ? Math.max(3.0, 4.5 - (Math.abs(x) / 25.0) * 1.5) : 0;

    // Branch C slope along positive Z: descends to 0.8m near pond
    const slopeC = (z > 0 && Math.abs(x) < 12) ? Math.max(0.6, 4.5 - (z / 25.0) * 3.7) : 0;

    // General ambient baseline
    const base = Math.max(0.5, 4.0 - (z / 20.0) * 2.0 + (x / 30.0) * 1.5);

    return Math.max(0.2, Math.max(esrKnoll, pumpTerrace, ridgeB, terraceA, slopeC, base));
  }

  buildTerrain() {
    const size = 110;
    const segments = 64;
    const geo = new THREE.PlaneGeometry(size, size, segments, segments);
    geo.rotateX(-Math.PI / 2);

    const pos = geo.attributes.position;
    const colors = new Float32Array(pos.count * 3);

    const cGrass = new THREE.Color(0xb5cfb8);   // Rural green
    const cDirt = new THREE.Color(0xd4be99);    // Village earth
    const cRidge = new THREE.Color(0xcac0a5);   // Rocky upper ridge
    const tempColor = new THREE.Color();

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const y = this.getElevation(x, z);
      pos.setY(i, y);

      // Procedural vertex coloring: paths vs fields vs hills
      const isRoad = (Math.abs(x) < 2.2 && z > -12 && z < 25) || (Math.abs(z) < 2.0 && Math.abs(x) < 30);
      if (isRoad) {
        tempColor.copy(cDirt);
      } else if (y > 5.5) {
        tempColor.copy(cRidge);
      } else {
        tempColor.copy(cGrass);
      }

      colors[i * 3] = tempColor.r;
      colors[i * 3 + 1] = tempColor.g;
      colors[i * 3 + 2] = tempColor.b;
    }

    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.computeVertexNormals();

    const mat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.88,
      metalness: 0.05,
      transparent: true,
      opacity: 1.0,
    });

    this.groundMesh = new THREE.Mesh(geo, mat);
    this.groundMesh.receiveShadow = true;
    this.scene.add(this.groundMesh);
  }

  buildVillagePond() {
    // Village pond at southern valley depression (x=0, z=28)
    const pondGeo = new THREE.CircleGeometry(8.5, 32);
    pondGeo.rotateX(-Math.PI / 2);

    const pondMat = new THREE.MeshStandardMaterial({
      color: 0x2b7a78,
      roughness: 0.1,
      metalness: 0.8,
      transparent: true,
      opacity: 0.85,
    });

    this.pondMesh = new THREE.Mesh(pondGeo, pondMat);
    this.pondMesh.position.set(0, 0.45, 27);
    this.scene.add(this.pondMesh);
  }

  buildPublicHandpump() {
    // Public India Mark II Handpump at village crossroads (x=3, z=3)
    const handpumpGroup = new THREE.Group();
    const groundY = this.getElevation(3, 3);
    handpumpGroup.position.set(3, groundY, 3);

    // Concrete platform
    const platform = new THREE.Mesh(
      new THREE.CylinderGeometry(1.4, 1.4, 0.2, 16),
      new THREE.MeshStandardMaterial({ color: 0x9ca3af, roughness: 0.7 })
    );
    platform.position.y = 0.1;
    platform.receiveShadow = true;
    handpumpGroup.add(platform);

    // Cast iron pump body (green)
    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 1.1, 8),
      new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.5 })
    );
    body.position.y = 0.65;
    body.castShadow = true;
    handpumpGroup.add(body);

    // Pump handle
    const handle = new THREE.Mesh(
      new THREE.CylinderGeometry(0.03, 0.03, 0.9, 6),
      new THREE.MeshStandardMaterial({ color: 0x374151 })
    );
    handle.position.set(0.3, 1.0, 0);
    handle.rotation.z = Math.PI / 6;
    handpumpGroup.add(handle);

    this.decorationsGroup.add(handpumpGroup);
  }

  buildVegetationAndFields() {
    // Procedural rural trees (neem / banyan style)
    const trunkGeo = new THREE.CylinderGeometry(0.18, 0.25, 2.2, 6);
    const foliageGeo = new THREE.DodecahedronGeometry(1.6);
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5c4033, roughness: 0.9 });
    const foliageMat = new THREE.MeshStandardMaterial({ color: 0x2d6a4f, roughness: 0.8 });

    const treePositions = [
      [-18, -14], [-8, -14], [8, -14], [18, -14],
      [-22, 10], [-18, 22], [18, 12], [22, 20],
      [-5, 26], [7, 26]
    ];

    treePositions.forEach(([x, z]) => {
      const y = this.getElevation(x, z);
      const tree = new THREE.Group();
      tree.position.set(x, y, z);

      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.y = 1.1;
      trunk.castShadow = true;

      const foliage = new THREE.Mesh(foliageGeo, foliageMat);
      foliage.position.y = 2.4;
      foliage.scale.set(1.0, 1.2, 1.0);
      foliage.castShadow = true;

      tree.add(trunk, foliage);
      this.decorationsGroup.add(tree);
    });
  }

  /**
   * Toggles the Trench Cutaway (X-Ray view) to reveal subterranean piping.
   */
  setTrenchCutaway(enabled) {
    this.isXRayCutaway = enabled;
    if (this.groundMesh) {
      if (enabled) {
        this.groundMesh.material.opacity = 0.28;
        this.groundMesh.material.depthWrite = false;
        this.groundMesh.material.wireframe = true;
      } else {
        this.groundMesh.material.opacity = 1.0;
        this.groundMesh.material.depthWrite = true;
        this.groundMesh.material.wireframe = false;
      }
    }
  }
}
