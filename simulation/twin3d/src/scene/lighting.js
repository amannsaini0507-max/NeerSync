/**
 * JalSetu 3D Village Digital Twin - Dynamic Lighting & Day-Night Cycle
 * Syncs sun azimuth, elevation, color temperature, ambient lighting, and shadows
 * to the simulation clock (00:00 to 24:00).
 */

import * as THREE from 'three';

export class LightingManager {
  constructor(scene) {
    this.scene = scene;

    // Ambient light for general illumination
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    this.scene.add(this.ambientLight);

    // Directional Sun / Moon light
    this.sunLight = new THREE.DirectionalLight(0xfffaed, 1.2);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.width = 2048;
    this.sunLight.shadow.mapSize.height = 2048;
    this.sunLight.shadow.camera.near = 0.5;
    this.sunLight.shadow.camera.far = 250;
    this.sunLight.shadow.bias = -0.0005;

    // Shadow frustum covering the village bounds (90m x 90m)
    const d = 48;
    this.sunLight.shadow.camera.left = -d;
    this.sunLight.shadow.camera.right = d;
    this.sunLight.shadow.camera.top = d;
    this.sunLight.shadow.camera.bottom = -d;

    this.scene.add(this.sunLight);

    // Hemisphere light for ground bounce and atmospheric depth
    this.hemiLight = new THREE.HemisphereLight(0xd7e9f2, 0x8a9ba3, 0.4);
    this.scene.add(this.hemiLight);

    // Atmosphere Fog
    this.fog = new THREE.Fog(0xd7e9f2, 55, 160);
    this.scene.fog = this.fog;
  }

  /**
   * Updates sun angle, color, and scene ambience according to simulation time.
   * @param {number} simMinutes Simulation clock in minutes
   * @param {string} theme 'light' | 'dark'
   */
  updateDayNightCycle(simMinutes, theme = 'light') {
    const hour = (simMinutes / 60) % 24;

    // Sun solar progress (0 at 06:00, PI/2 at 12:00, PI at 18:00)
    const sunAngle = ((hour - 6.0) / 12.0) * Math.PI;
    const isDay = hour >= 5.5 && hour <= 18.5;

    // Calculate 3D sun position orbiting over village
    const radius = 65.0;
    const sunElevation = Math.sin(sunAngle);
    const sunAzimuth = Math.cos(sunAngle);

    if (isDay) {
      // Day Sun
      this.sunLight.position.set(
        sunAzimuth * radius * 0.7,
        Math.max(8.0, sunElevation * radius),
        sunAzimuth * radius * 0.5
      );

      // Color temperature variation
      if (hour >= 5.5 && hour < 7.0) {
        // Dawn: Warm sunrise
        const t = (hour - 5.5) / 1.5;
        this.sunLight.color.setHex(0xffaa66);
        this.sunLight.intensity = 0.6 + 0.5 * t;
        this.ambientLight.intensity = 0.4 + 0.2 * t;
      } else if (hour >= 17.0 && hour <= 18.5) {
        // Sunset / Golden Hour
        const t = (hour - 17.0) / 1.5;
        this.sunLight.color.setHex(0xff7744);
        this.sunLight.intensity = 1.1 - 0.6 * t;
        this.ambientLight.intensity = 0.6 - 0.2 * t;
      } else {
        // High Noon / Midday
        this.sunLight.color.setHex(0xfff8ee);
        this.sunLight.intensity = 1.25;
        this.ambientLight.intensity = 0.7;
      }
    } else {
      // Night Moon
      const nightAngle = ((hour < 6 ? hour + 18 : hour - 6) / 12.0) * Math.PI;
      this.sunLight.position.set(
        Math.cos(nightAngle) * radius * 0.6,
        Math.max(12.0, Math.sin(nightAngle) * radius * 0.7),
        Math.sin(nightAngle) * radius * 0.6
      );
      this.sunLight.color.setHex(0x60a5fa); // Cool moonlight
      this.sunLight.intensity = 0.25;
      this.ambientLight.intensity = 0.25;
    }

    // Adjust background & fog based on lighting & theme
    if (theme === 'dark' || !isDay) {
      const nightBg = new THREE.Color(0x071118);
      this.scene.background = nightBg;
      this.fog.color.copy(nightBg);
    } else {
      const dayBg = new THREE.Color(0xd7e9f2);
      this.scene.background = dayBg;
      this.fog.color.copy(dayBg);
    }
  }
}
