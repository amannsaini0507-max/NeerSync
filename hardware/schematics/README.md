# JalSetu Circuit Schematics & Hardware Architecture

This folder contains the complete circuit schematics, pin mapping, power analysis, and netlists for the JalSetu IoT edge node family under Jal Jeevan Mission (JJM) FHTC monitoring.

---

## 📁 Directory Structure

| File / Subfolder | Description |
|---|---|
| [`design_checks.md`](./design_checks.md) | **Mandatory design checks** (GPIO <= 3.3V calculations, ADC1 restrictions, GSM 2A peak capacitor sizing, surge protection, mains safety). |
| [`pin_mapping.md`](./pin_mapping.md) | **Comprehensive pin table** for all nodes (N1 Pump, N2 ESR, N3 Pressure, N4 Quality). |
| [`power_budget.md`](./power_budget.md) | **Power budget & solar sizing** (current profiles, battery autonomy, monsoon solar sizing). |
| [`erc_report.md`](./erc_report.md) | **Electrical Rules Check report** (formally marked `ERC not run: UNVERIFIED (KiCad CLI not available)`). |
| [`diagrams/`](./diagrams/) | **High-resolution vector schematics (SVG)**: |
| ├─ `n1_pump_schematic.svg` | N1 Tube-well / Pump node schematic with optoisolated AC metering. |
| ├─ `n2_esr_schematic.svg` | N2 Elevated Storage Reservoir level + bulk flow schematic. |
| ├─ `n3_pressure_schematic.svg` | N3 Tail-end pressure transducer & precision divider schematic. |
| ├─ `n4_quality_schematic.svg` | N4 Water turbidity sensor schematic. |
| └─ `power_harvesting_schematic.svg` | Solar MPPT + BMS + 3.8V GSM Buck + 3.3V LDO schematic. |
| [`skidl/`](./skidl/) | **SKiDL (Python) programmatic netlist generation scripts**: |
| ├─ `common_parts.py` | Standalone part templates (ESP32, SX1276, A7672S, passives). |
| ├─ `n1_pump.py` | N1 circuit model. |
| ├─ `n2_esr.py` | N2 circuit model. |
| ├─ `n3_pressure.py` | N3 circuit model. |
| ├─ `n4_quality.py` | N4 circuit model. |
| ├─ `power_subsystem.py` | Power subsystem circuit model. |
| └─ `generate_all_netlists.py`| Master runner generating all `.net` files. |
| [`netlists/`](./netlists/) | **Generated KiCad netlists** (`n1_pump.net`, `n2_esr.net`, `n3_pressure.net`, `n4_quality.net`, `power_subsystem.net`). |

---

## ⚡ How to Regenerate Netlists & Diagrams

```bash
# 1. Regenerate all KiCad netlists via SKiDL
python hardware/schematics/skidl/generate_all_netlists.py

# 2. Regenerate all SVG schematic diagrams
python hardware/schematics/diagrams/generate_diagrams.py
```
