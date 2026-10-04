"""
Pytest Test Suite for NeerSync Shared Contracts v1.0
Tests JSON schemas against all valid and invalid examples,
validates regex patterns from ids.md, and verifies openapi.yaml.
"""

import pytest
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))

from contracts.validate import (
    validate_schemas,
    validate_valid_examples,
    validate_invalid_examples,
    validate_regex_patterns,
    validate_openapi_spec,
    SCHEMAS,
    REGEX_PATTERNS,
    REGEX_TEST_CASES,
    load_json,
    EXAMPLES_VALID_DIR,
    EXAMPLES_INVALID_DIR,
)
from jsonschema.exceptions import ValidationError


@pytest.fixture(scope="module")
def validators():
    return validate_schemas()


def test_meta_schemas(validators):
    assert len(validators) == 4
    for key in ["telemetry", "alert", "feedback", "status"]:
        assert key in validators


def test_all_valid_examples(validators):
    count = validate_valid_examples(validators)
    assert count >= 20


def test_all_invalid_examples(validators):
    count = validate_invalid_examples(validators)
    assert count >= 20


def test_regex_patterns():
    validate_regex_patterns()


def test_openapi_spec():
    validate_openapi_spec()


@pytest.mark.parametrize("valid_file", list(EXAMPLES_VALID_DIR.glob("*.json")))
def test_individual_valid_payload(validators, valid_file):
    prefix = valid_file.stem.split("_")[0]
    validator = validators[prefix]
    data = load_json(valid_file)
    errors = list(validator.iter_errors(data))
    assert len(errors) == 0, f"Unexpected validation error in {valid_file.name}: {errors}"


@pytest.mark.parametrize("invalid_file", list(EXAMPLES_INVALID_DIR.glob("*.json")))
def test_individual_invalid_payload(validators, invalid_file):
    prefix = invalid_file.stem.split("_")[0]
    validator = validators[prefix]
    data = load_json(invalid_file)
    errors = list(validator.iter_errors(data))
    assert len(errors) > 0, f"{invalid_file.name} unexpectedly passed validation"
