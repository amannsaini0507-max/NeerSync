#!/usr/bin/env python3
"""
NeerSync Contracts Validator
Validates Draft 2020-12 JSON Schemas, valid/invalid sample payloads,
regex patterns from ids.md, and openapi.yaml.

Usage:
    python contracts/validate.py
"""

import sys
import json
import re
from pathlib import Path
import yaml
from jsonschema import Draft202012Validator
from jsonschema.exceptions import ValidationError, SchemaError

CONTRACTS_DIR = Path(__file__).resolve().parent
REPO_ROOT = CONTRACTS_DIR.parent
EXAMPLES_VALID_DIR = CONTRACTS_DIR / "examples" / "valid"
EXAMPLES_INVALID_DIR = CONTRACTS_DIR / "examples" / "invalid"

SCHEMAS = {
    "telemetry": CONTRACTS_DIR / "telemetry.schema.json",
    "alert": CONTRACTS_DIR / "alert.schema.json",
    "feedback": CONTRACTS_DIR / "feedback.schema.json",
    "status": CONTRACTS_DIR / "status.schema.json",
}

# Regex patterns specified in ids.md
REGEX_PATTERNS = {
    "node_id": re.compile(r"^NS-[A-Z]{2}-[0-9]+-N[0-9]{3}$"),
    "lgd_gp_code": re.compile(r"^[0-9]{6}$"),
    "scheme_id": re.compile(r"^SCH-[A-Z]{2}-[0-9A-Z_]+$"),
    "habitation_id": re.compile(r"^HAB-[0-9]+-[0-9]{3}$"),
    "fhtc_id": re.compile(r"^FHTC-[A-Z]{2}-[0-9]+-[0-9]{4,}$"),
    "alert_id": re.compile(r"^ALT-[A-Za-z0-9_-]+$"),
    "feedback_id": re.compile(r"^FB-[A-Za-z0-9_-]+$"),
}

REGEX_TEST_CASES = {
    "node_id": {
        "valid": ["NS-UP-245123-N001", "NS-MH-109283-N099", "NS-DL-999-N005"],
        "invalid": ["NODE_01", "NS-U-245123-N001", "NS-UP-245123-N1", "ns-up-245123-n001", "NS-UP-245123"]
    },
    "lgd_gp_code": {
        "valid": ["245123", "109283", "999999"],
        "invalid": ["24512", "2451234", "ABCDEF", "245 123", "-245123"]
    },
    "scheme_id": {
        "valid": ["SCH-UP-245123", "SCH-MH-SCHEME_01", "SCH-RJ-990011"],
        "invalid": ["SCHEME_UP_1", "SCH-U-123", "sch-up-123", "SCH-123456"]
    },
    "habitation_id": {
        "valid": ["HAB-245123-001", "HAB-109283-099"],
        "invalid": ["HAB-245123-1", "HABITATION-01", "HAB-UP-001"]
    },
    "fhtc_id": {
        "valid": ["FHTC-UP-245123-0042", "FHTC-MH-109283-0001", "FHTC-RJ-990011-12345"],
        "invalid": ["FHTC-001", "FHTC-U-245123-0042", "FHTC-UP-245123-42", "TAP-UP-001"]
    },
    "alert_id": {
        "valid": ["ALT-20261004-001", "ALT-NODE_OFFLINE-99", "ALT-c8f565b9"],
        "invalid": ["ALERT 001", "alt/2026/01", ""]
    },
    "feedback_id": {
        "valid": ["FB-20261004-0012", "FB-GRIEVANCE-99", "FB-whatsapp-101"],
        "invalid": ["FEEDBACK 001", "fb/001", ""]
    }
}


def load_json(path: Path):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def validate_schemas():
    print("[1/5] Validating JSON Schemas Draft 2020-12 Meta-schemas...")
    validators = {}
    for name, path in SCHEMAS.items():
        if not path.exists():
            raise FileNotFoundError(f"Missing schema file: {path}")
        schema_data = load_json(path)
        try:
            Draft202012Validator.check_schema(schema_data)
            validator = Draft202012Validator(
                schema_data,
                format_checker=Draft202012Validator.FORMAT_CHECKER
            )
            validators[name] = validator
            print(f"  [OK] {path.name} is a valid Draft 2020-12 schema")
        except SchemaError as e:
            print(f"  [FAIL] {path.name} schema definition error: {e.message}")
            raise
    return validators


def validate_valid_examples(validators):
    print("\n[2/5] Validating Valid Example Payloads (MUST PASS)...")
    valid_files = list(EXAMPLES_VALID_DIR.glob("*.json"))
    if not valid_files:
        raise ValueError("No valid example files found!")

    passed = 0
    for file in sorted(valid_files):
        prefix = file.stem.split("_")[0]
        if prefix not in validators:
            raise KeyError(f"No schema validator mapped for prefix '{prefix}' in {file.name}")
        
        data = load_json(file)
        validator = validators[prefix]
        errors = list(validator.iter_errors(data))
        if errors:
            print(f"  [FAIL] {file.name} failed validation unexpectedly:")
            for err in errors:
                print(f"      - {err.json_path}: {err.message}")
            raise ValidationError(f"{file.name} failed validation")
        print(f"  [PASS] {file.name}")
        passed += 1

    print(f"  All {passed} valid sample payloads passed successfully.")
    return passed


def validate_invalid_examples(validators):
    print("\n[3/5] Validating Invalid Example Payloads (MUST FAIL)...")
    invalid_files = list(EXAMPLES_INVALID_DIR.glob("*.json"))
    if not invalid_files:
        raise ValueError("No invalid example files found!")

    failed_as_expected = 0
    for file in sorted(invalid_files):
        prefix = file.stem.split("_")[0]
        if prefix not in validators:
            raise KeyError(f"No schema validator mapped for prefix '{prefix}' in {file.name}")
        
        data = load_json(file)
        validator = validators[prefix]
        errors = list(validator.iter_errors(data))
        if not errors:
            print(f"  [FAIL] {file.name} passed validation but was expected to FAIL!")
            raise AssertionError(f"{file.name} unexpectedly passed schema validation")
        print(f"  [REJECTED AS EXPECTED] {file.name} -> {errors[0].message}")
        failed_as_expected += 1

    print(f"  All {failed_as_expected} invalid sample payloads correctly rejected.")
    return failed_as_expected


def validate_regex_patterns():
    print("\n[4/5] Testing Identifier Regex Patterns from ids.md...")
    for entity, pattern in REGEX_PATTERNS.items():
        test_data = REGEX_TEST_CASES.get(entity)
        if not test_data:
            raise KeyError(f"No test cases defined for regex entity '{entity}'")
        
        for val in test_data["valid"]:
            if not pattern.match(val):
                raise AssertionError(f"Pattern for {entity} failed to match valid input '{val}'")
        
        for val in test_data["invalid"]:
            if pattern.match(val):
                raise AssertionError(f"Pattern for {entity} matched invalid input '{val}'")
        
        print(f"  [PASS] Regex for {entity}: {pattern.pattern}")
    print("  All identifier regex patterns verified against test vectors.")


def validate_openapi_spec():
    print("\n[5/5] Validating openapi.yaml Specification...")
    openapi_path = CONTRACTS_DIR / "openapi.yaml"
    if not openapi_path.exists():
        raise FileNotFoundError(f"Missing openapi.yaml at {openapi_path}")

    with open(openapi_path, "r", encoding="utf-8") as f:
        spec = yaml.safe_load(f)

    required_keys = ["openapi", "info", "paths", "components"]
    for key in required_keys:
        if key not in spec:
            raise AssertionError(f"Missing top-level key '{key}' in openapi.yaml")

    required_endpoints = [
        "/api/v1/telemetry/ingest",
        "/api/v1/status/ingest",
        "/api/v1/alerts",
        "/api/v1/feedback",
        "/api/v1/master/gps/{lgd_gp_code}",
        "/api/v1/analytics/predict/supply",
        "/api/v1/sync/imis",
        "/api/v1/sync/sujal-gaon",
    ]
    for ep in required_endpoints:
        if ep not in spec["paths"]:
            raise AssertionError(f"Missing required endpoint '{ep}' in openapi.yaml")

    # Verify IMIS and Sujal Gaon are marked UNVERIFIED/configurable
    imis_desc = spec["paths"]["/api/v1/sync/imis"]["post"]["description"]
    sujal_desc = spec["paths"]["/api/v1/sync/sujal-gaon"]["post"]["description"]

    if "UNVERIFIED" not in imis_desc:
        raise AssertionError("IMIS sync endpoint description missing required 'UNVERIFIED' mark")
    if "UNVERIFIED" not in sujal_desc:
        raise AssertionError("Sujal Gaon sync endpoint description missing required 'UNVERIFIED' mark")

    print(f"  [PASS] openapi.yaml parsed successfully with {len(spec['paths'])} endpoints.")
    print("  [PASS] IMIS and Sujal Gaon endpoints verified as marked UNVERIFIED/configurable.")


def main():
    print("==================================================")
    print("      NeerSync Shared Contracts v1.0 Validator     ")
    print("==================================================")
    try:
        validators = validate_schemas()
        valid_count = validate_valid_examples(validators)
        invalid_count = validate_invalid_examples(validators)
        validate_regex_patterns()
        validate_openapi_spec()
        print("\n==================================================")
        print(f" SUCCESS: All contract checks passed!             ")
        print(f"  - 4 Draft 2020-12 Schemas Verified              ")
        print(f"  - {valid_count} Valid Examples Passed                       ")
        print(f"  - {invalid_count} Invalid Examples Rejected                 ")
        print(f"  - 7 Canonical Regex Patterns Verified           ")
        print(f"  - OpenAPI v1 Specification Verified             ")
        print("==================================================")
        return 0
    except Exception as exc:
        print(f"\n[FATAL ERROR]: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    sys.exit(main())
