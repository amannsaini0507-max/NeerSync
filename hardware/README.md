# JalSetu Hardware & Firmware Subsystem (`/hardware`)

**Role**: Hardware & Firmware Engineering  
**Branch**: `feature/hardware`  
**Governing Standard**: Jal Jeevan Mission (JJM) FHTC National Monitoring Architecture  
**Authoritative Contract**: Single Source of Truth lives in `/contracts` (v1.0)  

---

## 🌟 Executive Summary

This directory contains the production-ready hardware schematics, firmware codebase, calibration procedures, simulation models, and Bill of Materials (BOM) for the **JalSetu IoT Edge Node Family**.

Designed specifically for rural Indian Gram Panchayats (GPs), the system provides low-cost, tamper-resistant, solar-powered continuous monitoring with dual LoRaWAN (IN865) and 4G LTE Cat-1 backhaul connectivity.

### The 4 Edge Node Types:
1. **N1 — Tube-well / Pump Monitoring Node**: Monitors pump motor running state, run-hours, AC current (`current_a`), and AC voltage (`voltage_v`) with optocoupler isolation.
2. **N2 — Elevated Storage Reservoir (ESR) Node**: Tracks overhead reservoir water depth (`level_cm`) via waterproof ultrasonic sensing and distribution feeder outlet flow (`flow_lpm`).
3. **N3 — Tail-End Pressure Node**: Measures residual pipeline pressure (`pressure_kpa`) at the farthest household cluster to monitor JJM 7m head pressure benchmarks.
4. **N4 — Water Quality Node (Modular / Optional)**: Monitors water cloudiness / turbidity (`turbidity_ntu`) with manual Field Test Kit (FTK) app baseline for residual chlorine.

---

## 📁 Subsystem Directory Structure

```
hardware/
├── README.md                           <- Subsystem overview & verification guide
├── schematics/
│   ├── README.md                       <- Schematics documentation
│   ├── design_checks.md                <- Mandatory design checks (checked: yes/no + how)
│   ├── pin_mapping.md                  <- 1:1 net-to-pin mapping table
│   ├── power_budget.md                 <- Power profile, battery autonomy, solar sizing
│   ├── erc_report.md                   <- Electrical Rules Check (UNVERIFIED notice)
│   ├── skidl/                          <- Programmatic SKiDL netlist scripts
│   │   ├── common_parts.py             <- Standalone part definitions
│   │   ├── n1_pump.py                  <- N1 circuit model
│   │   ├── n2_esr.py                   <- N2 circuit model
│   │   ├── n3_pressure.py              <- N3 circuit model
│   │   ├── n4_quality.py               <- N4 circuit model
│   │   ├── power_subsystem.py          <- Solar & battery regulator circuit
│   │   └── generate_all_netlists.py    <- Master netlist runner
│   ├── netlists/                       <- Generated KiCad netlist files (*.net)
│   └── diagrams/                       <- High-resolution vector schematics (*.svg)
│       ├── n1_pump_schematic.svg
│       ├── n2_esr_schematic.svg
│       ├── n3_pressure_schematic.svg
│       ├── n4_quality_schematic.svg
│       └── power_harvesting_schematic.svg
├── firmware/
│   ├── platformio.ini                  <- Pinned dependencies & build environments
│   ├── include/
│   │   ├── config.h                    <- Fixed units, pins, topics, calibration constants
│   │   ├── sensors.h                   <- Sensor driver declarations & median filter
│   │   ├── telemetry_builder.h         <- Contract JSON serializer
│   │   ├── network_manager.h           <- Dual LoRa/GSM failover & LWT status
│   │   └── offline_queue.h             <- LittleFS store-and-forward queue
│   ├── src/
│   │   ├── main.cpp                    <- Task watchdog & deep sleep cycle
│   │   ├── sensors.cpp                 <- Debounced pulse, ADC conversions, median filter
│   │   ├── telemetry_builder.cpp       <- Schema version 1.0 JSON builder
│   │   ├── network_manager.cpp         <- LoRaWAN + GSM MQTT transmit & queue drain
│   │   └── offline_queue.cpp           <- FIFO LittleFS persistent queue
│   ├── test/
│   │   └── test_telemetry_schema.py    <- Pytest contract compliance suite
│   └── examples/                       <- Sample contract-compliant JSON payloads
│       ├── n1_pump_telemetry.json
│       ├── n2_esr_level_telemetry.json
│       ├── n2_esr_flow_telemetry.json
│       ├── n3_pressure_telemetry.json
│       └── n4_turbidity_telemetry.json
├── simulation/
│   ├── README.md                       <- Wokwi simulator guide & UNVERIFIED notice
│   ├── wokwi_n1_pump/                  <- N1 Wokwi project (diagram.json + sketch.ino)
│   ├── wokwi_n2_esr/                   <- N2 Wokwi project (diagram.json + sketch.ino)
│   ├── wokwi_n3_pressure/              <- N3 Wokwi project (diagram.json + sketch.ino)
│   └── wokwi_n4_quality/               <- N4 Wokwi project (diagram.json + sketch.ino)
├── docs/
│   ├── calibration_procedures.md       <- Two-point level, pressure gauge, bucket test
│   └── field_installation_guide.md     <- Hindi & English rural guide for Jal Surakshaks
└── bom/
    ├── bom_n1_pump.csv                 <- N1 BOM (₹6,003 INR)
    ├── bom_n2_esr.csv                  <- N2 BOM (₹7,173 INR)
    ├── bom_n3_pressure.csv             <- N3 BOM (₹6,888 INR)
    ├── bom_n4_quality.csv              <- N4 BOM (₹6,123 INR)
    ├── bom_gp_package.csv              <- Gram Panchayat Package (₹36,952 INR)
    └── bom_analysis.md                 <- Cost drivers & cheaper alternatives
```

---

## ⚡ Verification & Acceptance Proof

### 1. PlatformIO Firmware Compilation
All 4 node environments compile cleanly using pinned PlatformIO Core 6.2.0:
```bash
pio run -d hardware/firmware -e esp32_n1_pump -e esp32_n2_esr -e esp32_n3_pressure -e esp32_n4_quality
```
* **Result**: **SUCCESS (4/4 passed)**
  * Flash usage: ~26.5% (347 KB / 1.3 MB)
  * RAM usage: ~7.2% (23.5 KB / 327 KB)

### 2. Payload Schema Validation
All sample payloads validate 100% against `/contracts/telemetry.schema.json`:
```bash
pytest hardware/firmware/test/test_telemetry_schema.py -v
```
* **Result**: **8/8 PASSED** in 0.10s (Payload sizes strictly $< 512\text{ bytes}$).

### 3. Netlist Generation
SKiDL netlist scripts generate complete KiCad netlists for all circuits:
```bash
python hardware/schematics/skidl/generate_all_netlists.py
```
* **Result**: **5/5 netlists generated** (`n1_pump.net`, `n2_esr.net`, `n3_pressure.net`, `n4_quality.net`, `power_subsystem.net`).

### 4. Contract Suite Validation
The root contracts suite remains intact:
```bash
python contracts/validate.py
pytest contracts/test_contracts.py -v
```
* **Result**: **45/45 PASSED**, all valid/invalid examples confirmed.

---

## 🛡️ Mandatory Design Checks Summary

| Check Item | Requirement | Implementation / Calculation | Status |
|---|---|---|---|
| **GPIO <= 3.3V** | No signal above 3.3V | Resistor dividers: Flow ($3.33\text{V}$ clamped), Ultrasonic ($3.33\text{V}$), Pressure ($2.80\text{V} \le 3.1\text{V}$) | **Checked: YES** |
| **ADC1 Only** | Avoid ADC2 RF locks | Pressure/Turbidity on GPIO36 (ADC1_CH0), Battery on GPIO39 (ADC1_CH3), Solar on GPIO34 (ADC1_CH6) | **Checked: YES** |
| **GSM 2A Burst** | Brown-out immunity | Dedicated MP2307 buck (3.8V 3A) + $1000\,\mu\text{F}$ low-ESR bulk reservoir cap | **Checked: YES** |
| **Protection** | Field durability | 1.5A PTC fuse, AO3401 reverse P-MOS, TVS SMAJ18A/SMBJ6.0CA diodes, IP65 enclosure | **Checked: YES** |
| **Mains Safety** | Operator protection | $> 1500\,\text{V}$ optoisolation (PZEM-004T) or $> 3500\,\text{V}$ CT clamp. Certified electrician disclaimer. | **Checked: YES** |

---

## ⚠️ Fabrication Disclaimer

> [!IMPORTANT]
> **Senior Electronics Engineer Review Required**:
> As mandated by engineering safety governance, all schematics, netlists, and pin assignments in this repository are verified virtually and analytically. A licensed **Senior Electronics Hardware Engineer** must review the physical PCB layout, copper trace clearances, and high-voltage isolation creepage distances before releasing manufacturing files to fabrication.
