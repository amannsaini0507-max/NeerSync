"""
Unit Tests for Data Generator & 100% Contracts Compliance
"""

import pytest
from simulation.generator import DataGenerator


def test_generator_100_percent_schema_compliance():
    gen = DataGenerator(seed=42)
    # Generate 12 hours of baseline
    tel, fb = gen.generate_scenario_dataset("baseline", duration_hours=12)
    assert len(tel) > 0
    # Every record was validated during generation
    # Re-validate with validator explicitly
    for record in tel:
        gen.telemetry_validator.validate(record)
        assert record["schema_version"] == "1.0"
        assert record["node_id"].startswith("NS-UP-245123-")
        assert record["battery_v"] >= 2.0
        assert record["rssi_dbm"] <= 0

    for fb_record in fb:
        gen.feedback_validator.validate(fb_record)
        assert fb_record["fhtc_id"].startswith("FHTC-UP-245123-")
        assert fb_record["channel"] in ["app", "qr", "whatsapp", "ivr"]


def test_packet_loss_simulation():
    gen = DataGenerator(seed=42)
    tel_full, _ = gen.generate_scenario_dataset("baseline", duration_hours=6, packet_loss_rate=0.0)
    tel_loss, _ = gen.generate_scenario_dataset("baseline", duration_hours=6, packet_loss_rate=0.30)
    # Packet count with 30% loss should be significantly less than full
    assert len(tel_loss) < len(tel_full)
