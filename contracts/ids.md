# JalSetu System Identifiers Specification (`ids.md`)

This document defines the canonical identifier scheme and naming standards across the JalSetu ecosystem (IoT edge nodes, firmware, MQTT broker, backend microservices, time-series storage, and frontend webapp).

---

## 1. Hierarchy Overview

All telemetry, state, and command topics are organized under a strict geographic and functional hierarchy:

```
[System] -> [Region/State] -> [Zone/District] -> [Node/Station] -> [Subsystem/Device]
```

- **Prefix**: `JS` (JalSetu)
- **Format**: All IDs use alphanumeric characters with hyphens `-` or underscores `_`. No spaces or special characters are permitted.

---

## 2. Zone Identifiers (`zone_id`)

Format: `JS-<REGION>-<ZONE_CODE>`

| Field | Description | Example |
|---|---|---|
| System Prefix | Always `JS` | `JS` |
| Region Code | 2-letter geographical or state code | `DL` (Delhi), `UP` (Uttar Pradesh), `MH` (Maharashtra), `NZ` (North Zone) |
| Zone Code | `Z` followed by 2-3 digits representing ward, sector, or administrative block | `Z01`, `Z02`, `SECT15` |

**Examples:**
- `JS-DL-Z01` : JalSetu, Delhi, Zone 1
- `JS-UP-Z04` : JalSetu, Uttar Pradesh, Zone 4

---

## 3. Node Identifiers (`node_id`)

Format: `JS-<REGION>-<ZONE>-<NODE_TYPE>-<INDEX>`

### Standard Node Types:

| Node Type Code | Type Name | Description | Key Sensors / Actuators |
|---|---|---|---|
| `OHT` | Overhead Water Tank | High-elevation distribution reservoir | Level sensor, inlet valve, outlet flow meter |
| `BW` | Borewell Station | Groundwater extraction node | Pump motor relay, depth sensor, energy meter |
| `SUMP` | Sump / Ground Reservoir | Primary intake and buffer storage | Level sensor, transfer pumps, intake flow meter |
| `DIST` | Distribution / DMA Node | District Metered Area monitoring | Pressure sensor, bi-directional flow, throttle valve |
| `WQ` | Water Quality Station | In-line or sampling water health station | pH, Turbidity, TDS, Temp, Dissolved Oxygen |
| `WTP` | Water Treatment Plant | Filtration and chemical dosing node | Chlorination dosing pump, multi-parameter probes |
| `GW` | IoT Edge Gateway | LoRaWAN / Cellular aggregation gateway | System health, battery, backhaul metrics |

**Examples:**
- `JS-DL-Z01-OHT-01` : Overhead Tank #1 in Zone 1, Delhi
- `JS-DL-Z01-BW-02` : Borewell Station #2 in Zone 1, Delhi
- `JS-DL-Z01-DIST-03` : Distribution DMA node #3 in Zone 1, Delhi
- `JS-DL-Z01-WQ-01` : Water Quality Monitoring Station #1 in Zone 1, Delhi

---

## 4. Sensor Identifiers (`sensor_id`)

Sensors report measurements under a node using standardized sensor tag names:

| Tag Code | Physical Measurement | Standard Unit | Typical Range |
|---|---|---|---|
| `LVL_01` | Water Level (Ultrasonic / Hydrostatic) | `meters` (`m`) or `%` | 0.0 - 25.0 m / 0 - 100% |
| `FLW_RATE_01` | Instantaneous Flow Rate | `L/min` or `m3/h` | 0.0 - 5000.0 L/min |
| `FLW_TOT_01` | Cumulative Totalizer Flow | `liters` (`L`) or `m3` | Monotonically increasing |
| `PRS_01` | Water Line Pressure | `bar` | 0.0 - 16.0 bar |
| `PH_01` | Water Acidity / Alkalinity (pH) | `pH` | 0.0 - 14.0 pH (Ideal: 6.5 - 8.5) |
| `TDS_01` | Total Dissolved Solids | `ppm` (mg/L) | 0 - 2000 ppm (Ideal: < 500 ppm) |
| `TRB_01` | Turbidity | `NTU` | 0.0 - 100.0 NTU (Ideal: < 5 NTU) |
| `TMP_01` | Water Temperature | `celsius` (`°C`) | 0.0 - 60.0 °C |
| `CL_01` | Residual Chlorine | `mg/L` | 0.0 - 5.0 mg/L (Ideal: 0.2 - 0.5 mg/L) |
| `PWR_V` | Motor AC Voltage | `volts` (`V`) | 0 - 500 V |
| `PWR_I` | Motor AC Current | `amperes` (`A`) | 0 - 100 A |
| `PWR_KW` | Active Motor Power | `kilowatts` (`kW`) | 0 - 50 kW |

---

## 5. Actuator Identifiers (`actuator_id`)

Control commands address specific actuators using standardized IDs:

| Tag Code | Description | Control States |
|---|---|---|
| `PMP_01` | Primary Pump Contactor / Relay | `START`, `STOP` |
| `PMP_02` | Auxiliary / Backup Pump | `START`, `STOP` |
| `VLV_INLET` | Inlet Motorized Sluice / Solenoid Valve | `OPEN`, `CLOSE`, `SET_PERCENT` (0-100%) |
| `VLV_OUTLET` | Outlet Distribution Valve | `OPEN`, `CLOSE`, `SET_PERCENT` (0-100%) |
| `VLV_BYPASS` | Emergency Bypass Pressure Relief Valve | `OPEN`, `CLOSE` |
| `DOSE_CHL` | Chlorination Chemical Dosing Pump | `START`, `STOP`, `SET_RATE` (mL/min) |

---

## 6. Alert & Status Codes

### Severity Levels:
- `INFO` : Informational notifications (e.g., scheduled pump started).
- `WARNING` : Pre-threshold alerts (e.g., low reservoir level < 25%).
- `CRITICAL` : Action required (e.g., pump dry-run risk, contamination detected).
- `EMERGENCY` : Immediate hazard / shutdown triggered (e.g., pipe burst, toxic chemical spike).

### Standard Alert Codes:
| Alert Code | Meaning |
|---|---|
| `ERR_DRY_RUN` | Borewell or pump running without water intake detected |
| `ERR_OVERFLOW` | Tank water level exceeding upper critical threshold |
| `ERR_LEAK_BURST` | Sudden abnormal pressure drop or flow imbalance (DMA leak) |
| `ERR_CONTAMINATION_PH` | Water pH outside safe drinking guidelines (<6.5 or >8.5) |
| `ERR_CONTAMINATION_TURB` | Water turbidity exceeds safe limit (>5 NTU) |
| `ERR_HIGH_TDS` | High total dissolved solids |
| `ERR_POWER_PHASE_LOSS` | Three-phase power failure on pump station |
| `ERR_SENSOR_FAULT` | Open circuit, short circuit, or erratic sensor readings |
| `ERR_VALVE_TIMEOUT` | Valve failed to reach requested position within timeout |
