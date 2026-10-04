# JalSetu IoT Node Family Pin Mapping Table

**MCU**: ESP32-WROOM-32D (38-pin NodeMCU-32S / ESP32 DevKit v1)  
**Standard**: Jal Jeevan Mission Shared Contract v1.0  
**Rule**: Every schematic net and physical connection maps 1:1 to this table.

---

## 1. Unified Pin Assignment Architecture

To maximize firmware reusability across all nodes, common subsystems (LoRa SPI, Cellular UART, Power Management, and Status Indication) share identical pin assignments across the node family:

| Subsystem | Function | Pin / GPIO | Direction | Electrical Interface | Description / Peripheral |
|---|---|---|---|---|---|
| **Power Control** | `PWR_SENS_EN` | **GPIO 25** | Output | 3.3V Logic -> P-MOSFET Gate | High = Cut sensor power, Low = Power ON |
| **Power Control** | `PWR_MODEM_EN`| **GPIO 26** | Output | 3.3V Logic -> Buck EN pin | High = Modem 3.8V rail ON, Low = Sleep |
| **Power Control** | `MODEM_PWRKEY` | **GPIO 4** | Output | 3.3V Logic -> Open Drain | Active low pulse (1.0s) to boot A7672S |
| **LoRa (SPI)** | `LORA_SCK` | **GPIO 18** | Output | VSPI CLK (3.3V) | SX1276 Serial Clock |
| **LoRa (SPI)** | `LORA_MISO` | **GPIO 19** | Input | VSPI MISO (3.3V) | SX1276 Master In Slave Out |
| **LoRa (SPI)** | `LORA_MOSI` | **GPIO 23** | Output | VSPI MOSI (3.3V) | SX1276 Master Out Slave In |
| **LoRa (Control)**| `LORA_CS` | **GPIO 5** | Output | Active Low CS (3.3V) | SX1276 Chip Select |
| **LoRa (Control)**| `LORA_RST` | **GPIO 14** | Output | Active Low Reset (3.3V) | SX1276 Hardware Reset |
| **LoRa (Control)**| `LORA_DIO0` | **GPIO 32** | Input | Interrupt (3.3V) | SX1276 Packet Rx/Tx Done IRQ |
| **Cellular (UART)**|`GSM_TXD` | **GPIO 17** | Output | UART2 TX (3.3V) | Connects to A7672S / SIM800 RXD |
| **Cellular (UART)**|`GSM_RXD` | **GPIO 16** | Input | UART2 RX (3.3V) | Connects to A7672S / SIM800 TXD |
| **System Status**| `LED_STATUS` | **GPIO 2** | Output | 3.3V Active High (via 1kΩ) | Strapping pin (kept LOW at reset) |
| **System Status**| `BTN_WAKE_USR` | **GPIO 27** | Input | Active Low with 10kΩ pull-up | External wake-up push button (RTC GPIO) |
| **Battery Sense**| `BATT_SENSE` | **GPIO 39 (VN)**| Input | ADC1_CH3 ($0–3.1\text{V}$) | 1:2 Divider ($100\text{k}\Omega / 100\text{k}\Omega$) |
| **Solar Sense** | `SOLAR_SENSE`| **GPIO 34** | Input | ADC1_CH6 ($0–3.1\text{V}$) | 1:6 Divider ($100\text{k}\Omega / 20\text{k}\Omega$) |

---

## 2. Node-Specific Pin Mapping Tables

### 2.1 Node N1 — Tube-well / Pump Monitoring Node
* **Function**: Monitors pump running state, run-hours, single/three-phase AC voltage (`voltage_v`), and AC current (`current_a`).
* **Contract Output**: `type: "pump"`, `values: { "current_a": float, "voltage_v": float }`.
* **Mains Interface**: Optically isolated PZEM-004T v3.0 (UART1) or SCT-013 CT clamp + ZMPT101B potential transformer.

| Pin / GPIO | Net Name | Direction | Signal Type | Connected Component & Pin | Circuit Function |
|---|---|---|---|---|---|
| **GPIO 13** | `PZEM_RX` | Input | 3.3V UART1 RX | PZEM-004T Pin 2 (TXD) | Receives metering frames (optocoupler isolated) |
| **GPIO 15** | `PZEM_TX` | Output | 3.3V UART1 TX | PZEM-004T Pin 3 (RXD) | Sends metering query commands (optocoupler isolated) |
| **GPIO 36 (VP)**| `CT_ANALOG_IN` | Input | ADC1_CH0 | SCT-013 secondary via 1.65V DC bias | Fallback analog CT current waveform sampling |
| **GPIO 35** | `VT_ANALOG_IN` | Input | ADC1_CH7 | ZMPT101B AC voltage module output | Fallback analog AC voltage waveform sampling |
| **GPIO 25** | `PWR_SENS_EN` | Output | 3.3V Digital | P-MOSFET gate (SI2301) | Powers PZEM-004T 5V isolated rail |
| **GPIO 26** | `PWR_MODEM_EN`| Output | 3.3V Digital | Buck converter EN | Powers 4G/GSM modem buck converter |
| **GPIO 4** | `MODEM_PWRKEY` | Output | Open Drain | A7672S PWRKEY | Power toggle pulse |
| **GPIO 16, 17**| `GSM_UART` | I/O | UART2 (3.3V) | A7672S UART | Cellular AT commands and MQTT telemetry |
| **GPIO 18,19,23**|`VSPI_BUS` | Output/Input| SPI (3.3V) | SX1276 SPI bus | LoRaWAN telemetry backhaul |
| **GPIO 5,14,32**| `LORA_CTRL` | Out/Out/In | Digital/IRQ | SX1276 CS, RST, DIO0 | LoRaWAN state control |
| **GPIO 39** | `BATT_SENSE` | Input | ADC1_CH3 | Battery voltage divider | Lithium battery SOC monitoring |
| **GPIO 34** | `SOLAR_SENSE`| Input | ADC1_CH6 | Solar panel divider | Solar panel health & insolation monitoring |
| **GPIO 2** | `LED_STATUS` | Output | Digital | Status Blue LED | Blink patterns: network search, send, error |

---

### 2.2 Node N2 — Elevated Storage Reservoir (ESR) Node
* **Function**: Overhead tank water height (`level_cm`) and distribution feeder outlet flow rate (`flow_lpm`).
* **Contract Output**: 
  * `type: "esr_level"`, `values: { "level_cm": float }`
  * `type: "flow"`, `values: { "flow_lpm": float }`
* **Sensors**: A02YYUW / JSN-SR04T waterproof ultrasonic probe + YF-DN15/YF-DN20 Hall pulse flow meter.

| Pin / GPIO | Net Name | Direction | Signal Type | Connected Component & Pin | Circuit Function |
|---|---|---|---|---|---|
| **GPIO 13** | `US_UART_RX` | Input | 3.3V UART1 RX | A02YYUW Pin 3 (TX) | Serial distance frame: `0xFF + Data_H + Data_L + Sum` |
| **GPIO 15** | `US_UART_TX` | Output | 3.3V UART1 TX | A02YYUW Pin 4 (RX) | Trigger / wake serial line |
| **GPIO 35** | `FLOW_PULSE_IN`| Input | Digital IRQ | YF-DN15 Pulse (via 10k/20k divider) | Rising edge interrupt; counts water volume pulses |
| **GPIO 21** | `I2C_SDA` | I/O | Open Drain (3.3V) | Optional RS485 Modbus / RTC SDA | Digital flow meter or external RTC |
| **GPIO 22** | `I2C_SCL` | Output | Open Drain (3.3V) | Optional RS485 Modbus / RTC SCL | Digital flow meter or external RTC |
| **GPIO 25** | `PWR_SENS_EN` | Output | 3.3V Digital | P-MOSFET gate (SI2301) | Switches 5V power to ultrasonic sensor & flow meter |
| **GPIO 26** | `PWR_MODEM_EN`| Output | 3.3V Digital | Buck converter EN | Powers 4G/GSM modem buck converter |
| **GPIO 4** | `MODEM_PWRKEY` | Output | Open Drain | A7672S PWRKEY | Power toggle pulse |
| **GPIO 16, 17**| `GSM_UART` | I/O | UART2 (3.3V) | A7672S UART | Cellular AT commands and MQTT telemetry |
| **GPIO 18,19,23**|`VSPI_BUS` | Output/Input| SPI (3.3V) | SX1276 SPI bus | LoRaWAN telemetry backhaul |
| **GPIO 5,14,32**| `LORA_CTRL` | Out/Out/In | Digital/IRQ | SX1276 CS, RST, DIO0 | LoRaWAN state control |
| **GPIO 39** | `BATT_SENSE` | Input | ADC1_CH3 | Battery voltage divider | Lithium battery SOC monitoring |
| **GPIO 34** | `SOLAR_SENSE`| Input | ADC1_CH6 | Solar panel divider | Solar panel insolation monitoring |
| **GPIO 2** | `LED_STATUS` | Output | Digital | Status Green LED | Pulse indication and network state |

---

### 2.3 Node N3 — Tail-End Pressure Monitoring Node
* **Function**: Measures residual pipeline pressure at the farthest household cluster (`pressure_kpa`) + optional household tap flow meter (`flow_lpm`).
* **Contract Output**: `type: "pressure"`, `values: { "pressure_kpa": float }` (and optional flow).
* **Sensors**: 0.5–4.5V ratiometric piezoresistive pressure transmitter + optional YF-S201 tap pulse flow meter.

| Pin / GPIO | Net Name | Direction | Signal Type | Connected Component & Pin | Circuit Function |
|---|---|---|---|---|---|
| **GPIO 36 (VP)**| `PRESSURE_IN` | Input | ADC1_CH0 | Pressure transducer via 20k/33k divider | Attenuated analog signal ($0.31\text{V}–2.80\text{V}$) |
| **GPIO 35** | `TAP_FLOW_PULSE`| Input | Digital IRQ | Household flow pulse via 10k/20k divider | Optional FHTC tap flow meter interrupt |
| **GPIO 25** | `PWR_SENS_EN` | Output | 3.3V Digital | P-MOSFET gate (SI2301) | Powers pressure transducer 5V boost converter |
| **GPIO 26** | `PWR_MODEM_EN`| Output | 3.3V Digital | Buck converter EN | Powers 4G/GSM modem buck converter |
| **GPIO 4** | `MODEM_PWRKEY` | Output | Open Drain | A7672S PWRKEY | Power toggle pulse |
| **GPIO 16, 17**| `GSM_UART` | I/O | UART2 (3.3V) | A7672S UART | Cellular AT commands and MQTT telemetry |
| **GPIO 18,19,23**|`VSPI_BUS` | Output/Input| SPI (3.3V) | SX1276 SPI bus | LoRaWAN telemetry backhaul |
| **GPIO 5,14,32**| `LORA_CTRL` | Out/Out/In | Digital/IRQ | SX1276 CS, RST, DIO0 | LoRaWAN state control |
| **GPIO 39** | `BATT_SENSE` | Input | ADC1_CH3 | Battery voltage divider | Lithium battery SOC monitoring |
| **GPIO 34** | `SOLAR_SENSE`| Input | ADC1_CH6 | Solar panel divider | Solar panel insolation monitoring |
| **GPIO 2** | `LED_STATUS` | Output | Digital | Status Yellow LED | Blink indication on pressure sample |

---

### 2.4 Node N4 — Water Quality Monitoring Node (Modular / Optional)
* **Function**: Measures water cloudiness / turbidity in Nephelometric Turbidity Units (`turbidity_ntu`). Residual chlorine is recorded manually in the Field Test Kit (FTK) mobile app.
* **Contract Output**: `type: "quality"`, `values: { "turbidity_ntu": float }`.
* **Sensors**: Optical turbidity sensor (TSW-20M / DFRobot analog turbidity probe).

| Pin / GPIO | Net Name | Direction | Signal Type | Connected Component & Pin | Circuit Function |
|---|---|---|---|---|---|
| **GPIO 36 (VP)**| `TURBIDITY_IN` | Input | ADC1_CH0 | Turbidity sensor via 10k/20k divider | Analog phototransistor voltage ($0–3.0\text{V}$) |
| **GPIO 25** | `PWR_SENS_EN` | Output | 3.3V Digital | P-MOSFET gate (SI2301) | Turns on 5V supply to optical emitter only during sample |
| **GPIO 26** | `PWR_MODEM_EN`| Output | 3.3V Digital | Buck converter EN | Powers 4G/GSM modem buck converter |
| **GPIO 4** | `MODEM_PWRKEY` | Output | Open Drain | A7672S PWRKEY | Power toggle pulse |
| **GPIO 16, 17**| `GSM_UART` | I/O | UART2 (3.3V) | A7672S UART | Cellular AT commands and MQTT telemetry |
| **GPIO 18,19,23**|`VSPI_BUS` | Output/Input| SPI (3.3V) | SX1276 SPI bus | LoRaWAN telemetry backhaul |
| **GPIO 5,14,32**| `LORA_CTRL` | Out/Out/In | Digital/IRQ | SX1276 CS, RST, DIO0 | LoRaWAN state control |
| **GPIO 39** | `BATT_SENSE` | Input | ADC1_CH3 | Battery voltage divider | Lithium battery SOC monitoring |
| **GPIO 34** | `SOLAR_SENSE`| Input | ADC1_CH6 | Solar panel divider | Solar panel insolation monitoring |
| **GPIO 2** | `LED_STATUS` | Output | Digital | Status Red/Green LED | Quality alert warning indication |

---

## 3. Netlist Cross-Reference Guarantee

Every signal net named above is physically defined in the schematic files and SKiDL netlist scripts located in `hardware/schematics/skidl/` and `hardware/schematics/netlists/`.
* Zero unassigned pins on sensitive inputs.
* Internal pull-up/pull-down restrictions honored on all pins.
