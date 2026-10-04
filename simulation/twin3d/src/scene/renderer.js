/**
 * NeerSync 3D Village Digital Twin - WebGL Renderer & Quality Controller
 * Supports Low/Medium/High quality profiles, soft shadows, tone mapping, and resize handling.
 */

import * as THREE from 'three';

export class SceneRenderer {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.quality = 'high'; // 'low' | 'medium' | 'high'

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
    });

    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.applyQualitySettings();
  }

  setQuality(level) {
    this.quality = level;
    this.applyQualitySettings();
  }

  applyQualitySettings() {
    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio : 1;

    if (this.quality === 'low') {
      this.renderer.setPixelRatio(1.0);
      this.renderer.shadowMap.enabled = false;
    } else if (this.quality === 'medium') {
      this.renderer.setPixelRatio(Math.min(dpr, 1.25));
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.BasicShadowMap;
    } else {
      // High quality
      this.renderer.setPixelRatio(Math.min(dpr, 2.0));
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }
  }

  resize(width, height) {
    this.renderer.setSize(width, height, false);
  }

  render(scene, camera) {
    this.renderer.render(scene, camera);
  }

  dispose() {
    this.renderer.dispose();
  }
}
