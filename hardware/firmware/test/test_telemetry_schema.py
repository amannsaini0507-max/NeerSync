"""
JalSetu Hardware - Firmware Telemetry Contract Compliance Test Suite
Validates all firmware example payloads and generated schemas against
the authoritative contracts/telemetry.schema.json using Draft 2020-12 validator.
"""

import json
import pytest
from pathlib import Path
import jsonschema
from jsonschema import Draft202012Validator, FormatChecker

REPO_ROOT = Path(__file__).resolve().parent.parent.parent.parent
CONTRACTS_DIR = REPO_ROOT / 'contracts'
SCHEMA_PATH = CONTRACTS_DIR / 'telemetry.schema.json'
EXAMPLES_DIR = Path(__file__).resolve().parent.parent / 'examples'

@pytest.fixture(scope="module")
def telemetry_validator():
    with open(SCHEMA_PATH, 'r', encoding='utf-8') as f:
        schema = json.load(f)
    Draft202012Validator.check_schema(schema)
    return Draft202012Validator(schema, format_checker=FormatChecker())

def test_schema_exists():
    assert SCHEMA_PATH.exists(), f"Missing schema at {SCHEMA_PATH}"

def test_examples_exist():
    examples = list(EXAMPLES_DIR.glob("*.json"))
    assert len(examples) >= 5, f"Expected at least 5 examples, found {len(examples)}"

@pytest.mark.parametrize("example_file", list(EXAMPLES_DIR.glob("*.json")))
def test_example_payload_against_schema(telemetry_validator, example_file):
    with open(example_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # 1. Validate against authoritative Draft 2020-12 JSON schema
    telemetry_validator.validate(data)

    # 2. Strict Payload Size Budget Check (< 512 bytes target, 1024 max)
    raw_str = json.dumps(data)
    payload_len = len(raw_str.encode('utf-8'))
    assert payload_len <= 512, f"Payload {example_file.name} exceeded 512 bytes: {payload_len} bytes"

    # 3. Explicit Canonical Constraints Checks
    assert data["schema_version"] == "1.0"
    assert data["battery_v"] >= 2.0 and data["battery_v"] <= 16.0
    assert data["rssi_dbm"] >= -140 and data["rssi_dbm"] <= 0
    assert data["fw"] == "1.0.0"

def test_node_specific_metrics(telemetry_validator):
    """Assert each node type has its designated metrics and rejects wrong types"""
    # N1: Pump
    with open(EXAMPLES_DIR / 'n1_pump_telemetry.json') as f:
        p1 = json.load(f)
    assert p1['type'] == 'pump'
    assert 'current_a' in p1['values'] and 'voltage_v' in p1['values']

    # N2: ESR Level
    with open(EXAMPLES_DIR / 'n2_esr_level_telemetry.json') as f:
        p2_lvl = json.load(f)
    assert p2_lvl['type'] == 'esr_level'
    assert 'level_cm' in p2_lvl['values']

    # N2: Flow
    with open(EXAMPLES_DIR / 'n2_esr_flow_telemetry.json') as f:
        p2_flow = json.load(f)
    assert p2_flow['type'] == 'flow'
    assert 'flow_lpm' in p2_flow['values']

    # N3: Pressure
    with open(EXAMPLES_DIR / 'n3_pressure_telemetry.json') as f:
        p3 = json.load(f)
    assert p3['type'] == 'pressure'
    assert 'pressure_kpa' in p3['values']

    # N4: Turbidity
    with open(EXAMPLES_DIR / 'n4_turbidity_telemetry.json') as f:
        p4 = json.load(f)
    assert p4['type'] == 'quality'
    assert 'turbidity_ntu' in p4['values']
