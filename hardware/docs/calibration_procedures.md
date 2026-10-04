# NeerSync Sensor Calibration & Field Test Procedures

**Target Audience**: Field Engineers, Block Resource Persons, and Gram Panchayat Jal Surakshaks  
**Standard**: Jal Jeevan Mission Quality & Operational Benchmark  

---

## 1. Elevated Storage Reservoir (ESR) Tank-Level Two-Point Calibration

Overhead storage reservoir (ESR / OHT) height measurements utilize the waterproof ultrasonic sensor (A02YYUW / JSN-SR04T) mounted at the top air vent facing downward toward the water surface.

### 1.1 Physical Setup & Geometry
```
 [Top Tank Manhole / Vent]
       |
     [A02YYUW Ultrasonic Sensor]
       |  |  (Distance measured: D_meas)
       |  v
       |~~~~ Water Surface (Current Level: H_water) ~~~~
       |
       |  (Total Tank Depth: H_total)
       v
 [Tank Floor / Drain Outlet]
```
The water depth $H_{\text{water}}$ is calculated as:
$$H_{\text{water}} = H_{\text{total}} - D_{\text{meas}}$$

### 1.2 Two-Point Calibration Protocol
1. **Point 1: Tank Empty Baseline ($D_{\text{empty}}$)**:
   * During scheduled cleaning or before filling, measure distance to the tank bottom floor.
   * Record distance $D_{\text{empty}}$ in centimeters (e.g. $D_{\text{empty}} = 350.0\,\text{cm}$).
   * This sets $H_{\text{total}} = D_{\text{empty}}$.
2. **Point 2: Tank Overflow / Full Level ($D_{\text{full}}$)**:
   * When tank reaches the overflow weir or high-water cutoff, record distance $D_{\text{full}}$ (e.g. $D_{\text{full}} = 50.0\,\text{cm}$).
   * Note: Ensure $D_{\text{full}} \ge 25\,\text{cm}$ to respect the ultrasonic transducer blind zone (dead band).
3. **Slope & Offset Computation**:
   $$\text{Scaling Factor } S = \frac{H_{\text{calib, known}}}{D_{\text{empty}} - D_{\text{full}}}$$
   $$H_{\text{water}}(\text{cm}) = (D_{\text{empty}} - D_{\text{meas}}) \times S$$
4. **Validation Test**:
   * Lower a calibrated manual dip-tape or sounding rod.
   * Tolerance: Sensor reading must match physical sounding rod within **$\pm 2.0\,\text{cm}$**.

---

## 2. Pipeline Pressure Transducer Calibration (Against Reference Gauge)

Piezoresistive pressure transmitters (0–10 bar / 1000 kPa, 0.5–4.5V output) installed at tail-end nodes (N3) must be calibrated against a certified digital test gauge.

### 2.1 Equipment Required
1. Certified master digital pressure gauge (accuracy $\pm 0.05\%$ FS, e.g. Fluke 700G or Keller LEO 2).
2. Portable hydraulic hand pump or dead-weight tester.
3. 3-way manifold test tee with needle isolator valve.

### 2.2 Calibration Procedure (5-Point Test)
Connect the transducer and reference gauge to the test manifold. Apply pressure in 5 steps:

| Calibration Step | Applied Reference Pressure | Expected Transducer Out ($V_{\text{sens}}$) | Expected ESP32 ADC In ($V_{\text{pin}}$) | Permissible Error ($\pm 1.5\%$) |
|---|---|---|---|---|
| **Step 1 (Zero)** | $0.0\,\text{kPa}$ ($0.00\,\text{bar}$) | $0.500\,\text{V}$ | $0.311\,\text{V}$ ($386\text{ counts}$) | $\pm 5.0\,\text{kPa}$ |
| **Step 2 (25%)** | $250.0\,\text{kPa}$ ($2.50\,\text{bar}$) | $1.500\,\text{V}$ | $0.934\,\text{V}$ ($1159\text{ counts}$) | $\pm 7.5\,\text{kPa}$ |
| **Step 3 (50%)** | $500.0\,\text{kPa}$ ($5.00\,\text{bar}$) | $2.500\,\text{V}$ | $1.557\,\text{V}$ ($1931\text{ counts}$) | $\pm 10.0\,\text{kPa}$ |
| **Step 4 (75%)** | $750.0\,\text{kPa}$ ($7.50\,\text{bar}$) | $3.500\,\text{V}$ | $2.179\,\text{V}$ ($2703\text{ counts}$) | $\pm 12.5\,\text{kPa}$ |
| **Step 5 (100%)**| $1000.0\,\text{kPa}$ ($10.00\,\text{bar}$) | $4.500\,\text{V}$ | $2.802\,\text{V}$ ($3475\text{ counts}$) | $\pm 15.0\,\text{kPa}$ |

### 2.3 Field Zero-Tare Adjustment
In rural pipelines, static elevation head or zero drift can occur. With the isolation valve closed and bleed screw open ($0\,\text{kPa}$ gauge pressure), trigger the firmware tare command:
```bash
# Via serial console or MQTT command channel:
mosquitto_pub -t "neersync/v1/245123/NS-UP-245123-N003/cmd" \
  -m '{"command_id":"CMD-001","action":"CALIBRATE","target_node":"NS-UP-245123-N003","target_actuator":"PRESS_01"}'
```

---

## 3. Flow Meter Bucket Test ($K$-Factor Calibration)

The volumetric bucket test is the gold-standard field method to verify turbine and Hall-effect pulse flow meters (YF-DN15 / YF-S201) in rural settings without expensive flow test benches.

### 3.1 Equipment Required
1. Calibrated graduated bucket (20.0 Litres capacity with $100\,\text{mL}$ graduation marks).
2. Stopwatch (accurate to $0.1\,\text{second}$).
3. Quick-acting full-port ball valve.

### 3.2 Test Procedure
1. Open pipeline supply valve to achieve steady flow (e.g. approx $15–20\,\text{L/min}$).
2. Divert water into waste drain until flow is bubble-free and laminar.
3. Switch diverter instantly into the 20-Litre calibrated bucket while simultaneously starting the stopwatch and resetting the ESP32 pulse counter:
   ```c
   g_pulse_count = 0;
   ```
4. Fill precisely to the **$20.0\,\text{Litre}$ mark**, stop the stopwatch, and record the elapsed time $T_{\text{sec}}$ and accumulated pulse count $N_{\text{pulses}}$.
5. Repeat test 3 times and average the results.

### 3.3 Formula & $K$-Factor Calculation
* **Measured Flow Rate ($Q_{\text{actual}}$)**:
  $$Q_{\text{actual}} (\text{L/min}) = \frac{20.0\,\text{Litres}}{T_{\text{sec}}} \times 60$$
* **Field Pulse Factor ($K_{\text{field}}$)**:
  $$K_{\text{field}} (\text{pulses/L}) = \frac{N_{\text{pulses}}}{20.0\,\text{Litres}}$$
* **Example**:
  If filling 20 Litres takes $68.4\,\text{seconds}$ and registers $9,120\text{ pulses}$:
  $$Q = \frac{20}{68.4} \times 60 = 17.54\,\text{L/min}$$
  $$K = \frac{9120}{20} = 456.0\,\text{pulses/L}$$
* Update `CALIB_FLOW_PULSES_PER_LITER` in firmware `config.h` or store in ESP32 NVS non-volatile flash.

---

## 4. Optical Turbidity Sensor Calibration

Water turbidity indicates suspended solids and silt in rural supply.

### 4.1 Calibration Standards
1. **Zero Point**: Distilled / Deionized water ($0.0\,\text{NTU}$).
2. **Span Point**: Certified Formazin Turbidity Standard ($20.0\,\text{NTU}$ or $100.0\,\text{NTU}$).

### 4.2 Two-Point Voltage Mapping
1. Clean the optical prism with lens wipe and submerge in distilled water in light-tight container.
2. Record output voltage: $V_{\text{clear}} \approx 4.10\,\text{V} \pm 0.15\,\text{V}$.
3. Submerge sensor in $20.0\,\text{NTU}$ standard solution.
4. Record output voltage: $V_{\text{20NTU}} \approx 3.85\,\text{V}$.
5. Calculate characteristic slope $M$:
   $$M = \frac{20.0 - 0.0}{V_{\text{clear}} - V_{\text{20NTU}}}\,\text{NTU/Volt}$$
6. Permissible drinking water limit under JJM / BIS IS-10500: **$< 1.0\,\text{NTU}$ desirable, $< 5.0\,\text{NTU}$ maximum**. Readings $> 5.0\,\text{NTU}$ trigger automated contamination alerts.
