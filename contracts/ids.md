# NeerSync System Identifiers & Mapping Specification (`ids.md`)

**Version**: `1.0`  
**Governing Standard**: Jal Jeevan Mission (JJM) / Ministry of Jal Shakti National Database Architecture

---

## 1. Canonical Identifier Taxonomy

All assets, physical IoT nodes, administrative units, and telemetry data in NeerSync utilize strict standardized identifiers. Every identifier format is enforced by regular expressions across firmware, APIs, and database constraints.

| Entity | ID Format Name | Canonical Format String | Regular Expression Pattern | Concrete Example |
|---|---|---|---|---|
| **IoT Node** | `node_id` | `NS-<STATE2>-<LGD>-N<3 digits>` | `^NS-[A-Z]{2}-[0-9]+-N[0-9]{3}$` | `NS-UP-245123-N001` |
| **Gram Panchayat** | `lgd_gp_code` | 6-digit numeric LGD code | `^[0-9]{6}$` | `245123` |
| **Water Scheme** | `scheme_id` | `SCH-<STATE2>-<IDENTIFIER>` | `^SCH-[A-Z]{2}-[0-9A-Z_]+$` | `SCH-UP-245123` |
| **Habitation** | `habitation_id` | `HAB-<LGD>-<3 digits>` | `^HAB-[0-9]+-[0-9]{3}$` | `HAB-245123-001` |
| **Household Tap** | `fhtc_id` | `FHTC-<STATE2>-<LGD>-<4+ digits>` | `^FHTC-[A-Z]{2}-[0-9]+-[0-9]{4,}$` | `FHTC-UP-245123-0042` |
| **Alert Incident** | `alert_id` | `ALT-<TIMESTAMP>-<INDEX>` | `^ALT-[A-Za-z0-9_-]+$` | `ALT-20261004-001` |
| **Citizen Grievance** | `feedback_id` | `FB-<TIMESTAMP>-<INDEX>` | `^FB-[A-Za-z0-9_-]+$` | `FB-20261004-0012` |

---

## 2. Fixed Engineering Units

In accordance with the NeerSync Shared Contract, all engineering metrics use fixed, non-negotiable unit names and data types. No conversions or alternative units are permitted within raw contracts.

| Metric Key | Physical Quantity | Fixed Unit | Allowed Range | Precision |
|---|---|---|---|---|
| `pressure_kpa` | Pipeline water pressure | Kilopascals (`kPa`) | 0.0 – 2500.0 kPa | 1 decimal (e.g. 140.2) |
| `flow_lpm` | Instantaneous water flow rate | Liters per minute (`L/min`) | 0.0 – 20000.0 L/min | 1 decimal (e.g. 45.6) |
| `level_cm` | Elevated Reservoir water height | Centimeters (`cm`) | 0.0 – 3000.0 cm | 1 decimal (e.g. 275.0) |
| `turbidity_ntu` | Water cloudiness / turbidity | Nephelometric Turbidity Units (`NTU`) | 0.0 – 200.0 NTU | 2 decimals (e.g. 1.25) |
| `chlorine_mgl` | Residual free disinfectant chlorine | Milligrams per liter (`mg/L`) | 0.0 – 15.0 mg/L | 2 decimals (e.g. 0.40) |
| `current_a` | Motor pump running current | Amperes (`A`) | 0.0 – 200.0 A | 1 decimal (e.g. 14.5) |
| `voltage_v` | Pump power supply voltage | Volts (`V`) | 0.0 – 600.0 V | 1 decimal (e.g. 415.0) |
| `battery_v` | Node operating battery voltage | Volts (`V`) | 2.0 – 16.0 V | 2 decimals (e.g. 3.85) |
| `rssi_dbm` | Signal power level | Decibel-milliwatts (`dBm`) | -140 to 0 dBm | Integer (e.g. -78) |
| `ts` / `created_ts` | System timestamp | UTC ISO-8601 | RFC 3339 string | e.g. `2026-10-04T12:00:00Z` |

---

## 3. LGD and IMIS Hierarchy & Mapping Rules

### 3.1 Administrative Hierarchy (Local Government Directory - LGD)
India's Ministry of Panchayati Raj maintains unique persistent codes for administrative tiers:
```
State (e.g., 09 - Uttar Pradesh)
  └─ District (e.g., 142 - Meerut)
      └─ Sub-district / Block (e.g., 00812 - Daurala)
          └─ Gram Panchayat (LGD GP Code, e.g., 245123 - Badepur)
              └─ Village / Habitation (Census/Habitation Code, e.g., HAB-245123-001)
                  └─ FHTC (Household tap connection, e.g., FHTC-UP-245123-0042)
```

### 3.2 JJM Scheme Mapping (IMIS)
Under Jal Jeevan Mission, drinking water infrastructure is organized into Schemes tracked in the national Integrated Management Information System (IMIS):
- **Single Village Schemes (SVS)**: Serve one Gram Panchayat. The `scheme_id` directly correlates 1:1 with the `lgd_gp_code` (e.g., `SCH-UP-245123`).
- **Multi-Village Schemes (MVS)**: A centralized water treatment plant or surface intake supplies multiple Gram Panchayats. In an MVS, multiple `lgd_gp_code` values reference the same parent `scheme_id`.
- **Node to Asset Mapping**:
  - `N001`: Source / Tube-well / Pump motor monitoring node (`type: pump`).
  - `N002`: Elevated Storage Reservoir (ESR / OHT) level sensor node (`type: esr_level`).
  - `N003`: Distribution feeder main bulk flow meter node (`type: flow`).
  - `N004`: Tail-end pressure monitoring node installed at the farthest household cluster (`type: pressure`).
  - `N005`: In-line water quality testing node (`type: quality`).

### 3.3 FHTC Service Health Correlation
Every citizen household tap connection (`fhtc_id`) belongs to a specific `habitation_id` and pipeline branch. When a tail-end pressure sensor (`type: pressure`) reports `pressure_kpa < 70.0 kPa` (below JJM benchmark of 7m head pressure) or an ESR level drops to 0, all downstream FHTCs are automatically marked with risk of non-functionality.
