# JalSetu 3D Digital Twin - Architectural & Calibration Changes (`CHANGES.md`)

This document records all modifications and calibrations made when transitioning from the single-file prototype (`jalsetu_village_twin.html`) to the modular, realistic 3D twin in `/simulation/twin3d`.

---

### 1. Hydraulic Elevation & Physical Head Datum
* **Prototype Behavior**: All 15 households and pipe nodes were placed at flat elevation $Z = 0$ with base reservoir head $H_0 = 10 + \text{level} \approx 13\,\text{m}$.
* **Realism Upgrade**: Replaced flat topography with a pronounced 3D terrain profile ($Z \in [0.0, 8.0]\,\text{m}$):
  - Elevated Storage Reservoir (ESR) placed on knoll ($Z = 8.0\,\text{m}$) atop a $15.0\,\text{m}$ physical staging tower, giving total datum head $H = 23.0 + \text{level}\,\text{m}$.
  - Branch B located along the upper ridge ($Z = 5.2\,\text{m}$ to $6.5\,\text{m}$).
  - Branch A along the middle terrace ($Z = 3.0\,\text{m}$ to $4.2\,\text{m}$).
  - Branch C descending into the village pond valley ($Z = 0.8\,\text{m}$ to $3.8\,\text{m}$).
* **Hydraulic Implication**: Physical gauge pressure head at each tap is rigorously calculated as $P_{node} = \max(0, H_{hydraulic} - Z_{ground})$. This naturally reduces static pressure on the elevated ridge (Branch B) and provides realistic gravitational head to Branch C.

---

### 2. Choke Fault Resistance Multiplier Calibration
* **Prototype Value**: `nodes[2][0].res = S.f.choke ? 80 : 1;`
* **Calibrated Realistic Value**: `nodes[2][0].res = faults.choke ? 1200.0 : 1.0;`
* **Rationale**: Because the realistic water tower has a $15\,\text{m}$ staging structure plus an $8\,\text{m}$ knoll (total head $>26\,\text{m}$), an $80\times$ resistance multiplier only generated $\approx 12.2\,\text{m}$ of frictional head loss, leaving residual pressure $>12\,\text{m}$ at the taps. To accurately simulate severe pipeline occlusion (such as 90%+ cross-sectional silt blockage or calcium carbonate scaling) that starves the downstream tail end to $<3.0\,\text{m}$ / low-pressure failure under higher tower heads, the resistance multiplier was calibrated to $1200.0$. Numerical under-relaxation was simultaneously added to prevent oscillatory demand-friction divergence.

---

### 3. Contracts Alignment
* **Node Identifiers**: Updated from internal indices (`A1`, `B3`) to canonical JJM format:
  - Source Pump: `JS-UP-245123-N001`
  - Elevated Tank: `JS-UP-245123-N002`
  - Bulk Transmission Flow: `JS-UP-245123-N003`
  - Tail-End Pressure: `JS-UP-245123-N004`
  - Water Quality Node: `JS-UP-245123-N005`
* **Household Taps**: Mapped 1:1 to canonical FHTC IDs (`FHTC-UP-245123-0001` through `0015`).
* **Fixed Units**: Standardized to `pressure_kpa`, `flow_lpm`, `level_cm`, `turbidity_ntu`, `chlorine_mgl`, `current_a`, `voltage_v`, `battery_v`, `rssi_dbm`. All emitted telemetry strictly validated against `/contracts/telemetry.schema.json`.
