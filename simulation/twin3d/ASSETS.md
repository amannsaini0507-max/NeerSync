# Asset Registry & Licensing (`ASSETS.md`)

This document records the provenance, licensing, and attribution for all graphical, 3D, and auditory assets used in the **NeerSync 3D Village Digital Twin** (`/simulation/twin3d`).

---

### 1. Licensing Standard
In strict adherence to the project quality rules:
- **Zero Piracy**: Only Free and Open Source (FOSS) and Public Domain (Creative Commons CC0) assets are utilized.
- **Zero Proprietary Formats**: All procedural geometries, shaders, and textures are bundled locally with no external runtime CDN dependencies.

---

### 2. Asset Manifest

| Asset Component | Type | Source & Provenance | License | Notes |
|---|---|---|---|---|
| **Village Topography (0–8m)** | Procedural Mesh | Analytic Gaussian & exponential displacement in `terrain.js` | MIT (Project Code) | Generates sloped knoll, ridge, paths, and valley |
| **PBR Vernacular Houses (4 Typologies)** | Procedural PBR | Parametric Three.js geometries in `buildings.js` | MIT (Project Code) | Mud, brick, tin roof, and terraced RCC with Sintex tank |
| **Elevated Storage Reservoir (ESR)** | Procedural 3D | Staging columns, bracing, and translucent tank in `buildings.js` | MIT (Project Code) | 15m elevation tower with dynamic water level |
| **Public Handpump (India Mark II)** | Procedural 3D | Cast iron body and handle geometry in `terrain.js` | MIT (Project Code) | Positioned at village crossroads |
| **Subterranean Piping & Valves** | Procedural PBR | Scaled PVC/HDPE cylinders with Torus valves in `pipes.js` | MIT (Project Code) | Features pressure-color gradient shaders |
| **Pipe Flow & Burst Fountain** | Dynamic Particles | Ballistic kinematics and particle shaders in `water.js` | MIT (Project Code) | Velocity scales with calculated flow rate |
| **Village Trees & Vegetation** | Procedural 3D | Dodecahedron canopy and cylinder trunks in `terrain.js` | MIT (Project Code) | Inspired by Kenney Nature Kit (CC0 1.0 Universal) |
| **Bricolage Grotesque Font** | Web Font | Google Fonts / Mathieu Triay | SIL Open Font License 1.1 | Modern heading typography |
| **Figtree Font** | Web Font | Google Fonts / Erik Kennedy | SIL Open Font License 1.1 | High-legibility UI body typography |

---

### 3. Open Source Attribution
- **Three.js**: MIT License (Copyright © 2010-2026 Three.js Authors)
- **epanet-js**: MIT License (Copyright © 2020-2026 Luke Butler)
- **Ajv JSON Schema Validator**: MIT License (Copyright © 2012-2026 Evgeny Poberezkin)
