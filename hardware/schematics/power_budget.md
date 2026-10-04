# JalSetu IoT Node Family Power Budget & Solar Sizing Analysis

**Target Geography**: Rural India (Jal Jeevan Mission Gram Panchayats)  
**Standard Autonomy Goal**: **3–5 days continuous operation under zero sunlight (monsoon overcast conditions)**  
**Battery Baseline**: 3.7V Li-ion (2x 18650 in parallel, $5200\,\text{mAh}$ nominal) or 3.2V LiFePO4 (1x 32650, $6000\,\text{mAh}$)  

---

## 1. Operating State Current Profiles

Each node alternates between three distinct power states:

| Operating State | Description & Subsystems Active | Duration ($t$) | Node Current @ 3.7V |
|---|---|---|---|
| **State 1: Deep Sleep** | ESP32 in Deep Sleep, RTC timer active, sensors unpowered (MOSFET cut), modem buck OFF. | $898\,\text{s}$ (per 15 min cycle) | **$0.065\,\text{mA}$** ($65\,\mu\text{A}$) |
| **State 2: Sensor Sample** | ESP32 @ 80 MHz, sensor MOSFET enabled, median 7-sample burst reading & processing. | $2.0\,\text{s}$ | **$45.0\,\text{mA}$** – **$65.0\,\text{mA}$** |
| **State 3A: LoRaWAN Tx** | SX1276 transmitting payload @ +14 dBm (IN865 band, SF7BW125) + RX1/RX2 windows. | $1.2\,\text{s}$ | **$120.0\,\text{mA}$** |
| **State 3B: Cellular 4G Tx**| A7672S powered, network attach, SSL handshake, MQTT Publish (QoS 1), power down. | $15.0\,\text{s}$ | **$260.0\,\text{mA}$ avg** ($2000\,\text{mA}$ peak) |

---

## 2. Per-Node Power Consumption Calculations

Calculations assume a **15-minute reporting cycle** ($96\text{ cycles/day}$) under standard conditions.

### 2.1 Node N1 — Tube-well / Pump Monitoring Node
* **Sensors**: PZEM-004T v3.0 metering module (powered via high-side MOSFET) + AC status sampling.
* **Sampling State**: $2.0\,\text{s} @ 55\,\text{mA} = 110\,\text{mA}\cdot\text{s}$.
* **Transmission Profile (Dual Mode)**:
  * 80% of packets transmitted via LoRaWAN: $0.8 \times (1.2\,\text{s} @ 120\,\text{mA}) = 115.2\,\text{mA}\cdot\text{s}$.
  * 20% of packets transmitted via 4G GSM: $0.2 \times (15.0\,\text{s} @ 260\,\text{mA}) = 780.0\,\text{mA}\cdot\text{s}$.
  * Weighted average Tx energy: $895.2\,\text{mA}\cdot\text{s}$ per cycle.
* **Deep Sleep Energy**: $(900 - 2.0 - 4.0)\,\text{s} \times 0.065\,\text{mA} = 894\,\text{s} \times 0.065\,\text{mA} = 58.1\,\text{mA}\cdot\text{s}$.
* **Total Energy Per 15-Minute Cycle**:
  $$E_{\text{cycle}} = 110 + 895.2 + 58.1 = 1063.3\,\text{mA}\cdot\text{s} = 0.2954\,\text{mAh}$$
* **Total Daily Energy Consumption**:
  $$E_{\text{daily}} = 0.2954\,\text{mAh} \times 96\text{ cycles} = 28.36\,\text{mAh/day}$$
* **Average Continuous Current**:
  $$I_{\text{avg}} = \frac{28.36\,\text{mAh}}{24\,\text{h}} = 1.18\,\text{mA}$$
* **Peak Burst Current**: $2.0\,\text{A}$ (during GSM RF transmission burst, supported by $1000\,\mu\text{F}$ capacitor).

---

### 2.2 Node N2 — Elevated Storage Reservoir (ESR) Node
* **Sensors**: A02YYUW waterproof ultrasonic level sensor ($30\,\text{mA}$) + YF-DN15 Hall flow pulse sensor ($10\,\text{mA}$).
* **Sampling State**: $2.5\,\text{s} @ 75\,\text{mA} = 187.5\,\text{mA}\cdot\text{s}$.
* **Transmission Profile**: Transmits 2 telemetry frames per cycle (`esr_level` and `flow`):
  * Weighted average Tx energy: $1180.0\,\text{mA}\cdot\text{s}$.
* **Deep Sleep Energy**: $893\,\text{s} \times 0.065\,\text{mA} = 58.0\,\text{mA}\cdot\text{s}$.
* **Total Energy Per 15-Minute Cycle**:
  $$E_{\text{cycle}} = 187.5 + 1180.0 + 58.0 = 1425.5\,\text{mA}\cdot\text{s} = 0.396\,\text{mAh}$$
* **Total Daily Energy Consumption**:
  $$E_{\text{daily}} = 0.396\,\text{mAh} \times 96\text{ cycles} = 38.02\,\text{mAh/day}$$
* **Average Continuous Current**:
  $$I_{\text{avg}} = \frac{38.02\,\text{mAh}}{24\,\text{h}} = 1.58\,\text{mA}$$
* **Peak Burst Current**: $2.0\,\text{A}$ (Cellular transmit burst).

---

### 2.3 Node N3 — Tail-End Pressure Monitoring Node
* **Sensors**: 0.5–4.5V ratiometric pressure transducer ($10\,\text{mA}$ via 5V step-up booster).
* **Sampling State**: $1.5\,\text{s} @ 48\,\text{mA} = 72.0\,\text{mA}\cdot\text{s}$.
* **Transmission Profile** (Primary LoRaWAN with daily GSM heartbeat):
  * 90% LoRaWAN ($1.2\,\text{s} @ 120\,\text{mA} = 144\,\text{mA}\cdot\text{s}$).
  * 10% GSM ($15.0\,\text{s} @ 260\,\text{mA} = 3900\,\text{mA}\cdot\text{s}$).
  * Weighted Tx: $519.6\,\text{mA}\cdot\text{s}$.
* **Deep Sleep Energy**: $895\,\text{s} \times 0.065\,\text{mA} = 58.2\,\text{mA}\cdot\text{s}$.
* **Total Energy Per 15-Minute Cycle**:
  $$E_{\text{cycle}} = 72.0 + 519.6 + 58.2 = 649.8\,\text{mA}\cdot\text{s} = 0.1805\,\text{mAh}$$
* **Total Daily Energy Consumption**:
  $$E_{\text{daily}} = 0.1805\,\text{mAh} \times 96\text{ cycles} = 17.33\,\text{mAh/day}$$
* **Average Continuous Current**:
  $$I_{\text{avg}} = \frac{17.33\,\text{mAh}}{24\,\text{h}} = 0.72\,\text{mA}$$
* **Peak Burst Current**: $2.0\,\text{A}$ (during GSM sync).

---

### 2.4 Node N4 — Water Quality Monitoring Node (Modular / Turbidity)
* **Sensors**: Optical turbidity sensor ($35\,\text{mA}$ optical LED emitter).
* **Sampling State**: $2.0\,\text{s} @ 65\,\text{mA} = 130.0\,\text{mA}\cdot\text{s}$.
* **Transmission Profile**: Weighted Tx: $895.2\,\text{mA}\cdot\text{s}$.
* **Deep Sleep Energy**: $58.1\,\text{mA}\cdot\text{s}$.
* **Total Energy Per 15-Minute Cycle**:
  $$E_{\text{cycle}} = 130.0 + 895.2 + 58.1 = 1083.3\,\text{mA}\cdot\text{s} = 0.3009\,\text{mAh}$$
* **Total Daily Energy Consumption**:
  $$E_{\text{daily}} = 0.3009\,\text{mAh} \times 96\text{ cycles} = 28.89\,\text{mAh/day}$$
* **Average Continuous Current**:
  $$I_{\text{avg}} = \frac{28.89\,\text{mAh}}{24\,\text{h}} = 1.20\,\text{mA}$$
* **Peak Burst Current**: $2.0\,\text{A}$.

---

## 3. Battery Autonomy Without Sunlight (Zero Sun Days)

Assuming a **$5200\,\text{mAh}$ Li-ion battery pack** (2x 18650 in parallel) with an **80% Depth of Discharge (DoD)** threshold to maximize cycle lifespan:
$$\text{Usable Capacity} = 5200\,\text{mAh} \times 0.80 = 4160\,\text{mAh}$$

| Node Identifier | Daily Consumption ($E_{\text{daily}}$) | Average Current ($I_{\text{avg}}$) | Continuous Autonomy (Days with 0 Sun) | JJM Target Met? |
|---|---|---|---|---|
| **N1 Pump Node** | $28.36\,\text{mAh/day}$ | $1.18\,\text{mA}$ | $\frac{4160}{28.36} = \mathbf{146.7\,\text{days}}$ | **YES** ($> 30\times$ margin) |
| **N2 ESR Node** | $38.02\,\text{mAh/day}$ | $1.58\,\text{mA}$ | $\frac{4160}{38.02} = \mathbf{109.4\,\text{days}}$ | **YES** ($> 20\times$ margin) |
| **N3 Pressure Node**| $17.33\,\text{mAh/day}$ | $0.72\,\text{mA}$ | $\frac{4160}{17.33} = \mathbf{240.0\,\text{days}}$ | **YES** ($> 45\times$ margin) |
| **N4 Quality Node** | $28.89\,\text{mAh/day}$ | $1.20\,\text{mA}$ | $\frac{4160}{28.89} = \mathbf{143.9\,\text{days}}$ | **YES** ($> 30\times$ margin) |

> **Severe Fallback Scenario (High-Frequency 1-Minute Sampling & Hourly GSM Reporting)**:  
> Under aggressive continuous sensing ($I_{\text{avg}} \approx 18.5\,\text{mA}$):  
> $\text{Autonomy} = \frac{4160\,\text{mAh}}{18.5\,\text{mA} \times 24\,\text{h}} = \mathbf{9.37\,\text{days}}$ of uninterrupted operation under total cloud cover.

---

## 4. Solar Photovoltaic Panel Sizing Calculation

### 4.1 Solar Resource Parameters (India Standard)
* **Average Peak Sun Hours (PSH)**:
  * Winter (North India): $4.0 - 4.5\,\text{h/day}$.
  * Summer: $6.0 - 7.0\,\text{h/day}$.
  * Monsoon Worst-Case (heavy cloud cover): **$2.0\,\text{h/day}$**.
* **System Efficiency Deratings**:
  * Dust / Soiling factor on glass: $0.85$.
  * MPPT / PWM charging efficiency ($\eta_{\text{chg}}$): $0.85$.
  * Battery coulombic efficiency ($\eta_{\text{batt}}$): $0.90$.
  * Combined balance-of-system efficiency: $\eta_{\text{sys}} = 0.85 \times 0.85 \times 0.90 = \mathbf{0.65}$.

### 4.2 Sizing Equation for Worst-Case Node (N2 ESR, $38.02\,\text{mAh/day}$ @ 3.7V)
$$\text{Daily Energy Required} = 38.02\,\text{mAh} \times 3.7\,\text{V} = 0.1407\,\text{Wh/day}$$
Accounting for worst-case high-frequency sampling buffer ($5.0\,\text{Wh/day}$ worst-case):
$$P_{\text{panel, min}} = \frac{E_{\text{daily, worst}}}{\text{PSH}_{\text{monsoon}} \times \eta_{\text{sys}}} = \frac{5.0\,\text{Wh}}{2.0\,\text{h} \times 0.65} = \mathbf{3.85\,\text{Watts}}$$

### 4.3 Recommended Solar Panel Specification
* **Standard Panel**: **$10\,\text{Watt} \text{ / } 12\,\text{V}$ (or $6\,\text{V}$) Monocrystalline Solar Panel**.
* **Dimensions**: Approx $350 \times 250 \times 18\,\text{mm}$, weight $0.9\,\text{kg}$.
* **Peak Output**: $10\,\text{W} \implies V_{\text{mp}} = 18.0\,\text{V}, I_{\text{mp}} = 0.56\,\text{A}$ (or $6\text{V}, 1.6\text{A}$).
* **Margin of Safety**: Over $250\%$ margin above monsoon worst-case requirements. Fully recharges a drained $5200\,\text{mAh}$ battery in **$< 4\text{ hours}$ of direct sunlight**.
