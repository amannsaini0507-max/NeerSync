"""
NeerSync Synthetic Data Generator
Generates realistic, noise-perturbed, contract-compliant sensor telemetry
and citizen grievance feedback from hydraulic simulation runs.

Guarantees 100% schema compliance by validating EVERY packet against /contracts.
"""

import json
import sys
from pathlib import Path
from datetime import datetime, timezone, timedelta
import numpy as np
import pandas as pd
from jsonschema import Draft202012Validator

REPO_ROOT = Path(__file__).resolve().parent.parent
if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))

from simulation.network import build_village_network, run_simulation, GP_METADATA
from simulation.faults import apply_fault, load_scenarios

CONTRACTS_DIR = Path(__file__).resolve().parent.parent / "contracts"
TELEMETRY_SCHEMA_PATH = CONTRACTS_DIR / "telemetry.schema.json"
FEEDBACK_SCHEMA_PATH = CONTRACTS_DIR / "feedback.schema.json"


def load_validator(schema_path: Path):
    with open(schema_path, "r", encoding="utf-8") as f:
        schema = json.load(f)
    Draft202012Validator.check_schema(schema)
    return Draft202012Validator(schema, format_checker=Draft202012Validator.FORMAT_CHECKER)


class DataGenerator:
    def __init__(self, seed: int = 42):
        self.seed = seed
        self.rng = np.random.default_rng(seed)
        self.telemetry_validator = load_validator(TELEMETRY_SCHEMA_PATH)
        self.feedback_validator = load_validator(FEEDBACK_SCHEMA_PATH)
        self.wn, self.fhtc_map = build_village_network(seed=seed)

    def generate_scenario_dataset(
        self,
        scenario_id: str = "baseline",
        duration_hours: int = 48,
        packet_loss_rate: float = 0.025,
        base_datetime: datetime = None
    ):
        """
        Runs hydraulic simulation with faults and generates validated telemetry & feedback.
        """
        if base_datetime is None:
            base_datetime = datetime(2026, 10, 4, 0, 0, 0, tzinfo=timezone.utc)

        wn, _ = build_village_network(seed=self.seed)
        sim_results = run_simulation(wn, duration_hours=duration_hours)
        pressures = sim_results.node["pressure"]
        flows = sim_results.link["flowrate"]

        telemetry_records = []
        feedback_records = []
        packet_seq = 1000
        feedback_seq = 1

        total_liters = 50000.0

        for step_idx in range(duration_hours):
            t_sec = step_idx * 3600
            t_hour = float(step_idx)
            current_dt = base_datetime + timedelta(hours=t_hour)
            ts_str = current_dt.strftime("%Y-%m-%dT%H:%M:%SZ")

            # Extract base hydraulic parameters
            esr_head_m = float(pressures.loc[t_sec, "TANK_ESR"])
            esr_level_cm = max(10.0, esr_head_m * 100.0)

            # Tail-end pressure at junction J_W1_20 (in m head, convert to kPa: 1m ~= 9.80665 kPa)
            tail_head_m = float(pressures.loc[t_sec, "J_W1_20"])
            tail_pressure_kpa = max(10.0, tail_head_m * 9.80665)

            # Bulk flow from header pipe (in m3/s, convert to L/min: 1 m3/s = 60,000 LPM)
            flow_m3s = abs(float(flows.loc[t_sec, "PIPE_HEADER"]))
            flow_lpm = flow_m3s * 60000.0

            # Base pump state (runs during scheduled refill hours)
            hour_of_day = step_idx % 24
            is_pump_scheduled = (5 <= hour_of_day <= 8) or (16 <= hour_of_day <= 19)
            pump_curr = 14.5 if is_pump_scheduled else 0.0
            pump_state = 1 if is_pump_scheduled else 0

            # Base clean water quality
            base_metrics = {
                "pump": {
                    "current_a": pump_curr,
                    "voltage_v": 415.0,
                    "state": pump_state,
                    "frequency_hz": 50.0
                },
                "esr": {
                    "level_cm": round(esr_level_cm, 1),
                    "level_pct": round(min(100.0, (esr_level_cm / 400.0) * 100.0), 1)
                },
                "flow": {
                    "flow_lpm": round(flow_lpm, 1),
                    "totalizer_l": round(total_liters, 1)
                },
                "pressure": {
                    "pressure_kpa": round(tail_pressure_kpa, 1)
                },
                "quality": {
                    "turbidity_ntu": round(float(self.rng.normal(1.2, 0.1)), 2),
                    "chlorine_mgl": round(float(self.rng.normal(0.45, 0.03)), 2),
                    "ph": round(float(self.rng.normal(7.35, 0.05)), 1),
                    "tds_ppm": round(float(self.rng.normal(240.0, 5.0)), 1)
                },
                "status_n004": {
                    "status": "online",
                    "battery_v": round(float(self.rng.normal(3.95, 0.05)), 2),
                    "rssi_dbm": int(self.rng.normal(-75, 4)),
                    "is_offline": False
                }
            }

            # Inject fault dynamics
            m = apply_fault(scenario_id, t_hour, base_metrics)

            # Cumulative flow
            total_liters += m["flow"]["flow_lpm"] * 60.0
            m["flow"]["totalizer_l"] = round(total_liters, 1)

            # Add Gaussian noise
            m["pressure"]["pressure_kpa"] = max(5.0, round(m["pressure"]["pressure_kpa"] + self.rng.normal(0, 0.8), 1))
            m["flow"]["flow_lpm"] = max(0.0, round(m["flow"]["flow_lpm"] + self.rng.normal(0, 1.2), 1))
            m["esr"]["level_cm"] = max(0.0, round(m["esr"]["level_cm"] + self.rng.normal(0, 0.5), 1))

            # --- NODE N001: PUMP ---
            if self.rng.random() > packet_loss_rate:
                p1 = {
                    "schema_version": "1.0",
                    "node_id": GP_METADATA["nodes"]["pump_node"],
                    "lgd_gp_code": GP_METADATA["lgd_gp_code"],
                    "scheme_id": GP_METADATA["scheme_id"],
                    "ts": ts_str,
                    "seq": packet_seq,
                    "type": "pump",
                    "values": m["pump"],
                    "battery_v": round(float(self.rng.normal(4.10, 0.05)), 2),
                    "rssi_dbm": int(self.rng.normal(-70, 3)),
                    "fw": "1.0.0"
                }
                self.telemetry_validator.validate(p1)
                telemetry_records.append(p1)
                packet_seq += 1

            # --- NODE N002: ESR LEVEL ---
            if self.rng.random() > packet_loss_rate:
                p2 = {
                    "schema_version": "1.0",
                    "node_id": GP_METADATA["nodes"]["esr_node"],
                    "lgd_gp_code": GP_METADATA["lgd_gp_code"],
                    "scheme_id": GP_METADATA["scheme_id"],
                    "ts": ts_str,
                    "seq": packet_seq,
                    "type": "esr_level",
                    "values": m["esr"],
                    "battery_v": round(float(self.rng.normal(4.05, 0.05)), 2),
                    "rssi_dbm": int(self.rng.normal(-68, 4)),
                    "fw": "1.0.0"
                }
                self.telemetry_validator.validate(p2)
                telemetry_records.append(p2)
                packet_seq += 1

            # --- NODE N003: BULK FLOW ---
            if self.rng.random() > packet_loss_rate:
                p3 = {
                    "schema_version": "1.0",
                    "node_id": GP_METADATA["nodes"]["bulk_flow_node"],
                    "lgd_gp_code": GP_METADATA["lgd_gp_code"],
                    "scheme_id": GP_METADATA["scheme_id"],
                    "ts": ts_str,
                    "seq": packet_seq,
                    "type": "flow",
                    "values": m["flow"],
                    "battery_v": round(float(self.rng.normal(3.88, 0.05)), 2),
                    "rssi_dbm": int(self.rng.normal(-74, 3)),
                    "fw": "1.0.0"
                }
                self.telemetry_validator.validate(p3)
                telemetry_records.append(p3)
                packet_seq += 1

            # --- NODE N004: TAIL-END PRESSURE (Omit if node_offline) ---
            if not m.get("status_n004", {}).get("is_offline", False):
                if self.rng.random() > packet_loss_rate:
                    p4 = {
                        "schema_version": "1.0",
                        "node_id": GP_METADATA["nodes"]["tail_end_node"],
                        "lgd_gp_code": GP_METADATA["lgd_gp_code"],
                        "scheme_id": GP_METADATA["scheme_id"],
                        "ts": ts_str,
                        "seq": packet_seq,
                        "type": "pressure",
                        "values": m["pressure"],
                        "battery_v": m["status_n004"]["battery_v"],
                        "rssi_dbm": m["status_n004"]["rssi_dbm"],
                        "fw": "1.0.0"
                    }
                    self.telemetry_validator.validate(p4)
                    telemetry_records.append(p4)
                    packet_seq += 1

            # --- NODE N005: WATER QUALITY ---
            if self.rng.random() > packet_loss_rate:
                p5 = {
                    "schema_version": "1.0",
                    "node_id": GP_METADATA["nodes"]["quality_node"],
                    "lgd_gp_code": GP_METADATA["lgd_gp_code"],
                    "scheme_id": GP_METADATA["scheme_id"],
                    "ts": ts_str,
                    "seq": packet_seq,
                    "type": "quality",
                    "values": m["quality"],
                    "battery_v": round(float(self.rng.normal(4.15, 0.04)), 2),
                    "rssi_dbm": int(self.rng.normal(-65, 3)),
                    "fw": "1.0.0"
                }
                self.telemetry_validator.validate(p5)
                telemetry_records.append(p5)
                packet_seq += 1

            # --- CITIZEN GRIEVANCE GENERATION ---
            # Trigger realistic feedback when water condition is poor
            generate_grievances = []
            if m["pressure"]["pressure_kpa"] < 65.0:
                generate_grievances.append(("low_pressure", "Low pressure at tap standpost", "FHTC-UP-245123-0020"))
            if m["esr"]["level_cm"] < 20.0 or m["flow"]["flow_lpm"] < 5.0 and is_pump_scheduled:
                generate_grievances.append(("no_water", "No water supply today morning", "FHTC-UP-245123-0015"))
            if m["quality"]["turbidity_ntu"] > 5.0 or m["quality"]["chlorine_mgl"] < 0.1:
                generate_grievances.append(("dirty_water", "Water looks turbid and smells stagnant", "FHTC-UP-245123-0005"))
            if scenario_id == "fake_noisy_complaints" and m.get("has_fake_complaints", False):
                generate_grievances.append(("no_water", "Spurious unverified claim: No water in Ward 3", "FHTC-UP-245123-0045"))

            for cat, text, fhtc_id in generate_grievances:
                # Stochastic citizen reporting rate
                if self.rng.random() < 0.70:
                    ch = self.rng.choice(["whatsapp", "app", "qr", "ivr"])
                    lang = self.rng.choice(["hi", "en"])
                    fb = {
                        "feedback_id": f"FB-{current_dt.strftime('%Y%m%d')}-{feedback_seq:04d}",
                        "fhtc_id": fhtc_id,
                        "channel": ch,
                        "category": cat,
                        "text": text,
                        "lang": lang,
                        "lat": 28.9845 + float(self.rng.normal(0, 0.002)),
                        "lon": 77.7064 + float(self.rng.normal(0, 0.002)),
                        "ts": ts_str
                    }
                    self.feedback_validator.validate(fb)
                    feedback_records.append(fb)
                    feedback_seq += 1

        return telemetry_records, feedback_records


def export_dataset(telemetry_records, feedback_records, output_dir: Path):
    """
    Exports generated records to Parquet and CSV files.
    """
    output_dir.mkdir(parents=True, exist_ok=True)

    # Flatten telemetry records for tabular storage
    flat_telemetry = []
    for r in telemetry_records:
        row = {
            "schema_version": r["schema_version"],
            "node_id": r["node_id"],
            "lgd_gp_code": str(r["lgd_gp_code"]),
            "scheme_id": r["scheme_id"],
            "ts": r["ts"],
            "seq": r["seq"],
            "type": r["type"],
            "battery_v": r["battery_v"],
            "rssi_dbm": r["rssi_dbm"],
            "fw": r["fw"],
        }
        for k, v in r["values"].items():
            row[f"val_{k}"] = v
        flat_telemetry.append(row)

    df_tel = pd.DataFrame(flat_telemetry)
    df_fb = pd.DataFrame(feedback_records)

    # Export Telemetry
    df_tel.to_csv(output_dir / "telemetry.csv", index=False)
    df_tel.to_parquet(output_dir / "telemetry.parquet", index=False)

    # Export Feedback
    if not df_fb.empty:
        df_fb.to_csv(output_dir / "feedback.csv", index=False)
        df_fb.to_parquet(output_dir / "feedback.parquet", index=False)

    return df_tel, df_fb


if __name__ == "__main__":
    gen = DataGenerator(seed=42)
    print("Generating baseline dataset (48h)...")
    tel, fb = gen.generate_scenario_dataset("baseline", duration_hours=48)
    print(f"Generated {len(tel)} telemetry packets and {len(fb)} citizen feedback records.")
    print("All records validated 100% against JSON Schemas!")
    
    out_path = Path(__file__).resolve().parent / "samples"
    df_tel, df_fb = export_dataset(tel, fb, out_path)
    print(f"Sample dataset exported to {out_path}")
