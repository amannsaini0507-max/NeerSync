# NeerSync Hardware Mandatory Design Checks

**Standard**: Jal Jeevan Mission IoT Architecture  
**Microcontroller**: ESP32-WROOM-32D (3.3V Logic, 12-bit SAR ADC)  
**Safety Protocol**: Industrial / Rural Field Grade  

---

## 1. GPIO Voltage Rating Checks (<= 3.3V Strict Compliance)

ESP32 GPIO pins are **NOT 5V tolerant**. Applying voltages above $V_{DD} + 0.3\text{V}$ (3.6V max) will trigger internal ESD latch-up and destroy the chip. Every 5V sensor or signal must be attenuated or level-shifted.

### 1.1 Flow Sensor Hall-Effect Pulse Signal (5V)
* **Sensor Model**: YF-S201 / YF-DN15 / YF-DN20 (5V $V_{CC}$ required for internal Hall switch).
* **Signal Characteristics**: Open-collector or 0–5V active push-pull square wave.
* **Level Shifter Circuit**: Passive resistor voltage divider with Schottky clamping diode:
  $$V_{\text{out}} = V_{\text{in}} \times \frac{R_2}{R_1 + R_2}$$
  Selecting $R_1 = 10\,\text{k}\Omega \pm 1\%$, $R_2 = 20\,\text{k}\Omega \pm 1\%$:
  $$V_{\text{out}} = 5.0\,\text{V} \times \frac{20\,\text{k}\Omega}{10\,\text{k}\Omega + 20\,\text{k}\Omega} = 5.0 \times \frac{2}{3} = 3.33\,\text{V}$$
* **Safety Margin**: A BAT54S dual Schottky diode is connected from the GPIO node to 3.3V rail (clamps transients to $3.3\text{V} + 0.3\text{V} = 3.6\text{V}$) and to GND (prevents negative inductive ring).
* **Checked**: **YES**. Calculated $3.33\,\text{V} \le 3.6\,\text{V}$ absolute max; clamped via BAT54S.

### 1.2 Ultrasonic Echo / UART Signal (5V)
* **Sensor Model**: JSN-SR04T v3.0 / A02YYUW (waterproof ultrasonic probe).
* **Case A: JSN-SR04T Echo Pulse (5V)**:
  * Divider: $R_1 = 1\,\text{k}\Omega$, $R_2 = 2\,\text{k}\Omega$:
    $$V_{\text{out}} = 5.0\,\text{V} \times \frac{2000}{1000 + 2000} = 3.33\,\text{V}$$
* **Case B: A02YYUW Waterproof UART**:
  * Operates at 3.3V–5V $V_{CC}$. Powered directly from 3.3V or 5V rail with $1\,\text{k}\Omega$ series current-limiting resistor on RX (ESP32 TX) and $1\,\text{k}\Omega / 2\,\text{k}\Omega$ divider on TX (ESP32 RX).
* **Checked**: **YES**. Divider steps 5.0V down to 3.33V safely.

### 1.3 Piezoresistive Pressure Transducer (0.5V – 4.5V)
* **Sensor Model**: Stainless steel ceramic piezoresistive pressure transmitter (0–1.0 MPa / 10 bar, 5V excitation).
* **Signal Range**: $0.5\,\text{V}$ (at $0\,\text{kPa}$) to $4.5\,\text{V}$ (at $1000\,\text{kPa}$).
* **Linear Voltage Divider Calculation**:
  * Selecting precision metal-film resistors: $R_1 = 20\,\text{k}\Omega$ ($0.1\%$), $R_2 = 33\,\text{k}\Omega$ ($0.1\%$).
  * At minimum pressure ($0\,\text{kPa}$, $V_{\text{in}} = 0.5\,\text{V}$):
    $$V_{\text{ADC, min}} = 0.5\,\text{V} \times \frac{33}{20 + 33} = 0.5 \times 0.6226 = 0.311\,\text{V}$$
  * At maximum pressure ($1000\,\text{kPa}$, $V_{\text{in}} = 4.5\,\text{V}$):
    $$V_{\text{ADC, max}} = 4.5\,\text{V} \times \frac{33}{20 + 33} = 4.5 \times 0.6226 = 2.802\,\text{V}$$
* **ESP32 ADC Compatibility**:
  * With 11 dB attenuation (`ADC_ATTEN_DB_11`), the ESP32 ADC linear range is $0.15\,\text{V} \text{ to } 3.10\,\text{V}$.
  * The mapped signal range ($0.311\,\text{V} \text{ to } 2.802\,\text{V}$) falls strictly within the linear window.
  * Adding a $100\,\text{nF}$ ceramic capacitor in parallel with $R_2$ provides anti-aliasing low-pass filtering ($f_c \approx 128\,\text{Hz}$).
* **Checked**: **YES**. Maximum analog voltage applied to GPIO is $2.802\,\text{V} \ll 3.3\,\text{V}$.

### 1.4 Turbidity Sensor Analog Output (0V – 4.5V)
* **Sensor Model**: DFRobot / TSW-20M nephelometric optical sensor module (5V $V_{CC}$).
* **Signal Range**: $2.5\,\text{V}$ (opaque/dirty water) to $4.2\,\text{V}$ (clear water).
* **Divider**: $R_1 = 10\,\text{k}\Omega$, $R_2 = 20\,\text{k}\Omega$ ($0.1\%$):
  $$V_{\text{ADC, max}} = 4.5\,\text{V} \times \frac{20}{30} = 3.00\,\text{V} \le 3.3\,\text{V}$$
* **Checked**: **YES**. Peak output scaled to $3.00\,\text{V}$.

---

## 2. ADC1 Pin Selection & Strapping Pin Verification

The ESP32 integrated SAR ADCs are divided into ADC1 and ADC2. **ADC2 cannot be used when Wi-Fi or cellular background RF is active**, because the radio peripheral arbitrates and forces ADC2 calibration locks.

### 2.1 Allowed vs Forbidden Pins
| Pin | Functionality | Status in NeerSync | Design Usage / Rationale |
|---|---|---|---|
| **GPIO36 / SENSOR_VP** | ADC1_CH0 | **ALLOWED (Input Only)** | Used for Pressure Transducer (N3) or Analog Turbidity (N4) |
| **GPIO39 / SENSOR_VN** | ADC1_CH3 | **ALLOWED (Input Only)** | Used for Battery Voltage Monitoring Divider |
| **GPIO34** | ADC1_CH6 | **ALLOWED (Input Only)** | Used for Solar Panel Voltage Divider |
| **GPIO35** | ADC1_CH7 | **ALLOWED (Input Only)** | Used for CT Analog Sensor or Flow Pulse Interrupt |
| **GPIO32** | ADC1_CH4, RTC | **ALLOWED** | Used for Ultrasonic Echo Pulse or LoRa DIO0 |
| **GPIO33** | ADC1_CH5, RTC | **ALLOWED** | Used for Sensor Power Enable Switch (MOSFET Gate) |
| **GPIO0** | Strapping (Boot) | **RESTRICTED** | Must stay HIGH on boot. Left floating or pulled to 3.3V with 10kΩ. |
| **GPIO2** | Strapping (Boot) | **RESTRICTED** | Must stay LOW on boot. Connected to status LED only with 1kΩ pull-down. |
| **GPIO12 / MTDI** | Strapping (V_SDIO) | **RESTRICTED** | Must stay LOW on boot (selecting 3.3V Flash). Do NOT pull HIGH. |
| **GPIO15 / MTDO** | Strapping (JTAG) | **RESTRICTED** | Must stay HIGH on boot. Do NOT pull LOW externally. |
| **GPIO6–GPIO11** | SPI Flash Internal | **FORBIDDEN** | Internal SPI bus connected to integrated 4MB Flash. Never connect. |
| **GPIO0, 2, 4, 12–15, 25–27** | ADC2 Channels | **FORBIDDEN FOR ADC** | Never used for analog readings. Digital GPIO only. |

* **Input-Only Pins Checked**: GPIO34, GPIO35, GPIO36, GPIO39 have no internal pull-up/pull-down silicon resistors. External $100\,\text{k}\Omega$ pull-down resistors are added to prevent high-impedance floating states.
* **Checked**: **YES**. 100% of analog inputs use ADC1 exclusively; zero strapping pin conflicts.

---

## 3. GSM Peak Current & Power Supply Isolation

Cellular modems (SIMCom A7672S 4G LTE Cat-1 or SIM800L 2G GSM) transmit RF bursts with peak currents up to **2.0 Amperes** for durations of $577\,\mu\text{s}$ during 2G TDMA timeslots and LTE PRACH preamble broadcasts.
If powered from the ESP32 3.3V rail or a standard 500mA LDO, the voltage will drop below $3.3\text{V}$, triggering a brown-out reset (`BOR`) on the ESP32.

### 3.1 Power Supply Architecture
* **Dedicated DC-DC Buck Regulator**:
  * An independent synchronous step-down switching regulator (TI TPS5430 or MP2307 / XL4015) is supplied directly from the battery pack ($3.2\text{V} - 4.2\text{V} \to 3.8\text{V} \pm 0.1\text{V}$, rated for $3.0\text{A}$ continuous, $4.0\text{A}$ peak).
* **Decoupling Capacitor Bank**:
  * Directly at the GSM module $V_{BAT}$ and $GND$ pins (< 10 mm trace length):
    1. **$1\times 1000\,\mu\text{F} \text{ / } 10\,\text{V}$ Low-ESR Solid Electrolytic Capacitor** (ESR $< 45\,\text{m}\Omega$) acts as the local energy reservoir to supply the $2\text{A}$ burst without battery sag.
    2. **$1\times 100\,\mu\text{F}$ Tantalum Capacitor** (filters intermediate audio frequency ripple).
    3. **$2\times 100\,\text{nF}$ X7R Ceramic Capacitors** (filters RF harmonic pickup around 850 MHz and 1800 MHz).
* **Voltage Drop Calculation during 2A Burst**:
  * Energy required for $577\,\mu\text{s}$ burst at $2.0\,\text{A}$:
    $$\Delta Q = I \times \Delta t = 2.0\,\text{A} \times 577 \times 10^{-6}\,\text{s} = 1.154 \times 10^{-3}\,\text{Coulombs}$$
  * Voltage sag across $1000\,\mu\text{F}$ capacitor:
    $$\Delta V = \frac{\Delta Q}{C} = \frac{1.154 \times 10^{-3}\,\text{C}}{1000 \times 10^{-6}\,\text{F}} = 1.15\,\text{V without supply}$$
  * Since the DC-DC converter supplies $1.5\,\text{A}$ continuous response, actual capacitor sag is:
    $$\Delta V_{\text{sag}} = (I_{\text{peak}} - I_{\text{reg}}) \times \left( \frac{\Delta t}{C} + R_{\text{ESR}} \right) = (2.0 - 1.5) \times \left( \frac{577\,\mu\text{s}}{1000\,\mu\text{F}} + 0.045\,\Omega \right) \approx 0.5 \times (0.577 + 0.045) = 0.311\,\text{V}$$
  * $V_{BAT}$ dips from $3.80\,\text{V}$ to $3.49\,\text{V}$, staying safely above the modem minimum operating cutoff ($3.40\,\text{V}$).
* **Checked**: **YES**. Dedicated 3.8V rail + $1000\,\mu\text{F}$ Low-ESR bulk reservoir prevents brown-outs.

---

## 4. Protection, Surge, and Environmental Hardening

Rural Indian field conditions face monsoon humidity, lightning-induced ground potential surges, dust, and solar UV radiation.

### 4.1 Electrical Ingress & Battery Protection
1. **Resettable Overcurrent Fuse**:
   * A **1.5A Polymeric Positive Temperature Coefficient (PTC)** resettable fuse (Bourns MF-MSMF150) is placed on the raw battery line.
2. **Reverse Polarity Protection**:
   * P-Channel MOSFET circuit (AO3401A in high-side configuration with $100\,\text{k}\Omega$ gate pull-down and 10V Zener gate-source clamp). Delivers $< 20\,\text{mV}$ voltage drop ($R_{DS(on)} = 45\,\text{m}\Omega$) compared to a $0.4\text{V}$ drop for a Schottky diode.
3. **Overvoltage & Transient Voltage Suppression (TVS)**:
   * **Power Rails**: SMAJ5.0A unidirectional TVS diode clamps 5V / 3.8V lines to $< 9.2\text{V}$ during lightning inductive surges.
   * **External Sensor Leads (Flow, Pressure, Level)**: High-speed bi-directional TVS diodes (SMBJ6.0CA) placed at the screw terminal block on all lines entering the enclosure.
4. **Battery Management System (BMS)**:
   * Dedicated hardware BMS circuit (DW01A + FS8205A dual N-MOSFET) providing:
     * Overcharge protection cutoff: $4.250\,\text{V} \pm 0.05\,\text{V}$.
     * Over-discharge protection cutoff: $2.50\,\text{V} \pm 0.1\,\text{V}$.
     * Short-circuit current cutoff: $3.0\,\text{A}$.
     * NTC thermistor input to disable charging when cell temperature exceeds $50^\circ\text{C}$ in summer.

### 4.2 Enclosure & Mechanical Placement
1. **Enclosure Rating**:
   * Polycarbonate weatherproof enclosure certified to **IP65 / IP67** with UV-stabilized silicone gasket and stainless steel latching screws.
2. **Cable Entry**:
   * All field sensor cables pass through **PG7 and PG9 nylon cable glands** with rubber compression bushings, facing downwards to prevent water ingress along cable drip loops.
3. **Pressure Equalization Vent**:
   * A waterproof, breathable ePTFE membrane vent (Gore-Tex plug) prevents internal condensation caused by diurnal heating and cooling.
4. **Antenna Placement**:
   * External outdoor omnidirectional fiberglass antenna ($3\,\text{dBi}$ gain) with IPEX-to-SMA bulkhead connector.
   * Antenna is mounted vertically on the top or exterior bracket, separated by $> 15\,\text{cm}$ from metallic pipe infrastructure.
* **Checked**: **YES**. Complete fuse, reverse-polarity, TVS, IP65 enclosure, and antenna isolation specified.

---

## 5. Mains & Pump-Panel Measurement Isolation

> [!CAUTION]
> ### ⚡ HIGH VOLTAGE 415V / 230V AC SAFETY WARNING
> **DANGER**: Measurement of tube-well pump starters involves dangerous 415V three-phase or 230V single-phase alternating current capable of fatal electric shock.
> - **DO NOT make direct galvanic electrical connections between the ESP32 board and 230V/415V mains.**
> - **Installation inside pump starter panels MUST be performed exclusively by a licensed/certified industrial electrician with the main circuit breaker / isolator LOCKED OUT and TAGGED OUT (LOTO).**

### 5.1 Certified Isolation Methods for Node N1
1. **AC Current Measurement**:
   * Non-invasive, split-core Current Transformer (**YHDC SCT-013-000**, 0–100A AC input, 0–50mA output or built-in burden resistor 0–1V RMS).
   * **Dielectric Isolation Rating**: $> 3500\,\text{V AC} \text{ / } 1\,\text{min}$ between the conductor cable and secondary signal leads.
   * Secondary leads are referenced to a buffered $1.65\,\text{V}$ virtual ground with $10\,\mu\text{F}$ bypass capacitor.
2. **AC Voltage Measurement**:
   * **ZMPT101B Active Isolated Potential Transformer Module**:
     * Micro-transformer provides **4000V RMS galvanic isolation**.
     * Operating with high-impedance series limiting resistor ($R = 82\,\text{k}\Omega \times 2$ in series, 2W rated) to keep primary current $< 2\,\text{mA}$.
   * **PZEM-004T v3.0 Alternative**:
     * Integrated high-speed optocouplers (**PC817 / 6N137**) providing **1500V RMS optical isolation** between the high-voltage energy metering ASIC and the 3.3V UART serial pins of the ESP32.
* **Checked**: **YES**. Both voltage and current measurement paths have $> 1500\text{V}$ certified galvanic isolation.
