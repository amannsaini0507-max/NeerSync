/**
 * NeerSync 3D Village Digital Twin - Camera Controller
 * Implements OrbitControls, smooth focus fly-to transitions, and dynamic camera shake.
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export class CameraManager {
  constructor(canvasElement, aspect = 1.0) {
    this.camera = new THREE.PerspectiveCamera(42, aspect, 0.2, 500);

    // Initial viewpoint showing village layout from southern-east vantage
    this.defaultTarget = new THREE.Vector3(0, 4.0, 0);
    this.camera.position.set(38, 30, 44);
    this.camera.lookAt(this.defaultTarget);

    this.controls = new OrbitControls(this.camera, canvasElement);
    this.controls.target.copy(this.defaultTarget);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.maxPolarAngle = Math.PI / 2 - 0.04; // Prevent viewing from underground
    this.controls.minDistance = 6.0;
    this.controls.maxDistance = 140.0;

    // Transition state
    this.isTransitioning = false;
    this.transitionStart = 0;
    this.transitionDuration = 1200; // ms
    this.sourcePos = new THREE.Vector3();
    this.targetPos = new THREE.Vector3();
    this.sourceLookAt = new THREE.Vector3();
    this.targetLookAt = new THREE.Vector3();

    // Camera shake state (for catastrophic bursts)
    this.shakeIntensity = 0;
    this.shakeDecay = 0;
    this.shakeOffset = new THREE.Vector3();
  }

  resize(aspect) {
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();
  }

  /**
   * Smoothly animates the camera to focus on a specific village asset or incident location.
   * @param {THREE.Vector3} targetCoord The target focus position
   * @param {number} distance Desired distance from target
   */
  flyTo(targetCoord, distance = 16.0) {
    this.isTransitioning = true;
    this.transitionStart = performance.now();

    this.sourcePos.copy(this.camera.position);
    this.sourceLookAt.copy(this.controls.target);

    this.targetLookAt.copy(targetCoord);
    // Position camera slightly elevated and offset
    this.targetPos.set(
      targetCoord.x + distance * 0.7,
      targetCoord.y + distance * 0.6,
      targetCoord.z + distance * 0.7
    );
  }

  /**
   * Triggers physical camera shake (e.g. upon pipe burst rupture).
   * @param {number} intensity Shake magnitude
   * @param {number} durationSeconds Duration of shake
   */
  triggerShake(intensity = 0.45, durationSeconds = 1.2) {
    this.shakeIntensity = intensity;
    this.shakeDecay = intensity / (durationSeconds * 60);
  }

  resetView() {
    this.flyTo(this.defaultTarget, 48.0);
  }

  update() {
    // 1. Handle flying transitions
    if (this.isTransitioning) {
      const elapsed = performance.now() - this.transitionStart;
      const progress = Math.min(1.0, elapsed / this.transitionDuration);

      // Smooth cubic ease-out
      const ease = 1 - Math.pow(1 - progress, 3);

      this.camera.position.lerpVectors(this.sourcePos, this.targetPos, ease);
      this.controls.target.lerpVectors(this.sourceLookAt, this.targetLookAt, ease);

      if (progress >= 1.0) {
        this.isTransitioning = false;
      }
    }

    // 2. Handle camera shake
    if (this.shakeIntensity > 0.001) {
      this.shakeOffset.set(
        (Math.random() - 0.5) * this.shakeIntensity,
        (Math.random() - 0.5) * this.shakeIntensity,
        (Math.random() - 0.5) * this.shakeIntensity
      );
      this.camera.position.add(this.shakeOffset);
      this.shakeIntensity = Math.max(0, this.shakeIntensity - this.shakeDecay);
    }

    this.controls.update();
  }
}
