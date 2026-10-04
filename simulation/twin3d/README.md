# NeerSync 3D Village Digital Twin (`/simulation/twin3d`)

**Project**: NeerSync (नीर सिंक) — IoT & AI/ML Platform for Jal Jeevan Mission (JJM)  
**Target Unit**: Gram Panchayat Badepur (LGD: `245123`, Scheme: `SCH-UP-245123`)  
**Technology Stack**: Three.js (`0.174.0`), `epanet-js` (`0.9.0`), Web Workers, Vite, Vitest, Playwright  

---

> [!IMPORTANT]
> ### 🛡️ Synthetic Experimental Rigor Disclosure
> All hydraulic flows, pipe pressures, disinfectant decays, and citizen grievance tickets in this 3D Digital Twin are generated from synthetic EPANET / Hazen-Williams physical models and stochastic fault injections. No claims of field pilot calibration are made.

---

## 1. Architecture Overview

```mermaid
flowchart TD
    subgraph UI ["User Interface Layer"]
        A[Header: Clock, Presets, Quality, Theme]
        B[Left Panel: Fault Toggles, Time Speed, X-Ray Cutaway]
        C[Right Panel: Live Sensors, Alerts, Grievance Feed]
        D[Analytics Bar: SVG Sparklines, FHTC Service Index]
        E[Inspector Modal: Click-a-House JJM Stats]
    end

    subgraph Core ["Simulation & Orchestration Engine (main.js)"]
        F[Simulation Clock & State Manager]
        G[Scenario Recorder & Presets Runner]
    end

    subgraph Hydraulics ["Hydraulic Solvers (Worker + Analytical)"]
        H[epanet-js Web Worker (epanet-worker.js)]
        I[Hazen-Williams Dual Solver (hazen-williams.js)]
        J[Topography & Elevation Datum (0m - 8m)]
    end

    subgraph Scene ["3D Visualization Layer (Three.js)"]
        K[Sloped Terrain & Roads (terrain.js)]
        L[Vernacular Houses & 15m ESR (buildings.js)]
        M[Subterranean PVC/HDPE Pipes (pipes.js)]
        N[Flow Particles & Burst Fountain (water.js)]
    end

    subgraph IoT ["Contracts & IoT Compliance"]
        O[IoT Telemetry Manager (nodes.js)]
        P[Draft 2020-12 Schema Validator (validator.js)]
        Q[MQTT-over-WebSocket Streamer (mqtt-client.js)]
        R[Bundle Exporter (exporter.js)]
    end

    UI --> Core
    Core --> Hydraulics
    Hydraulics --> Scene
    Core --> Scene
    Hydraulics --> IoT
    IoT --> P
    P --> Q
    P --> R
```

---

## 2. Quickstart & How to Run

```bash
# Navigate to twin3d directory
cd simulation/twin3d

# 1. Install pinned dependencies
npm install

# 2. Start the local development server (http://localhost:5173)
npm run dev

# 3. Build optimized production bundle
npm run build

# 4. Run unit tests (Vitest: 13/13 passing)
npm test

# 5. Run end-to-end smoke test & capture screenshots (Playwright)
node capture-screenshots.js
```

---

## 3. Interactive Controls & Features

* **3D Viewport Controls**:
  - **Left Click + Drag**: Rotate camera azimuth and elevation.
  - **Right Click + Drag**: Pan viewpoint across the village.
  - **Scroll Wheel**: Smooth zoom (clamped from $6\,\text{m}$ to $140\,\text{m}$).
  - **Click any House**: Opens the detailed household inspector showing FHTC ID, dynamic pressure (m / kPa), tap flow rate, and water quality.
  - **Reset Camera Button**: Instantly restores the optimal aerial vantage point.
* **Trench Cutaway (X-Ray View)**:
  - Toggles ground transparency to reveal subterranean pipes ($0.6\,\text{m}$ depth), fittings, branch tees, and isolation valves.
* **Fault Scenarios**:
  - **Pump Failure**: Submersible pump thermal trip; current drops to 0A while commanded ON.
  - **Slow Leak (Branch B)**: Hidden loss near House B3 on the high ridge; elevates Night Minimum Flow.
  - **Pipe Burst (Branch A)**: Pressurized upward particle fountain, rapid reservoir depletion, and camera shake.
  - **Choked Pipe (Branch C)**: Pipeline occlusion starves downstream valley taps ($P < 3.0\,\text{m}$).
  - **Monsoon Contamination**: Runoff ingress spikes turbidity ($>5.0\,\text{NTU}$) and washes out chlorine ($<0.20\,\text{mg/L}$); discolors pipes and tap streams.
* **Administrative Escalation**:
  - Alert age $<30\,\text{m}$: Jal Mitra notified.
  - $30-120\,\text{m}$: Escalated to Village Water & Sanitation Committee (VWSC).
  - $120-360\,\text{m}$: Escalated to Junior Engineer (JE).
  - $>360\,\text{m}$: Escalated to Executive Engineer (EE).
  - "Focus on Alert" button smoothly flies the camera to the affected pipe in 3D.
* **JJM FHTC Service Index**:
  $$\text{Index} = 0.30 \times \text{Regularity} + 0.20 \times \text{Adequacy} + 0.20 \times \text{Quality} + 0.15 \times \text{Pressure} + 0.15 \times \text{Grievance}$$

---

## 4. Captured Verification Screenshots

| Scenario | Screenshot File | Description |
|---|---|---|
| **Normal Operation** | [`screenshots/normal_operation.png`](./screenshots/normal_operation.png) | High-noon solar illumination, blue pipes, steady tap flow |
| **Pipe Burst (Branch A)** | [`screenshots/fault_pipe_burst.png`](./screenshots/fault_pipe_burst.png) | Catastrophic fountain, ground erosion, high-severity alert |
| **Trench Cutaway (X-Ray)** | [`screenshots/trench_cutaway_xray.png`](./screenshots/trench_cutaway_xray.png) | Translucent ground reveals subterranean pipe network |
| **Monsoon Contamination** | [`screenshots/fault_contamination.png`](./screenshots/fault_contamination.png) | Turbidity surge, brown water discoloration, quality alarm |

---

## 5. Known Limitations

1. **Synthetic Hydraulic Calibration**: While head loss and mass balance use EPANET 2.2 / Hazen-Williams formulas, real-world networks involve soil suction, intermittent air-pocket acoustics, and illegal booster pumps.
2. **Simplified Biofilm Dynamics**: Contamination represents sudden chemical washouts; biological pathogen regrowth kinetics are not modeled.
