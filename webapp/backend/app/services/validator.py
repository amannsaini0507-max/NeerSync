import json
from pathlib import Path
from typing import Dict, Any, Tuple, Optional
from jsonschema import Draft202012Validator
from jsonschema.exceptions import ValidationError
from app.config import settings

# Cache compiled validators for high throughput
_VALIDATORS: Dict[str, Draft202012Validator] = {}


def _get_validator(schema_name: str) -> Draft202012Validator:
    """Loads and compiles JSON schema validator from contracts directory."""
    if schema_name in _VALIDATORS:
        return _VALIDATORS[schema_name]

    schema_file = settings.contracts_dir / f"{schema_name}.schema.json"
    if not schema_file.exists():
        raise FileNotFoundError(f"Contract schema not found: {schema_file}")

    with open(schema_file, "r", encoding="utf-8") as f:
        schema_data = json.load(f)

    validator = Draft202012Validator(
        schema_data,
        format_checker=Draft202012Validator.FORMAT_CHECKER
    )
    _VALIDATORS[schema_name] = validator
    return validator


def validate_contract_payload(
    payload: Dict[str, Any],
    schema_name: str,
    raw_bytes: Optional[bytes] = None
) -> Tuple[bool, Optional[str]]:
    """
    Validates payload against Draft 2020-12 contract schema.
    Also enforces packet size limit (< 1024 bytes per contracts/mqtt_topics.md).
    Returns (is_valid, error_message).
    """
    if raw_bytes and len(raw_bytes) > 1024:
        return False, f"Payload size {len(raw_bytes)} bytes exceeds contract maximum of 1024 bytes"

    try:
        validator = _get_validator(schema_name)
        errors = list(validator.iter_errors(payload))
        if errors:
            err_msg = "; ".join(f"{e.json_path or 'root'}: {e.message}" for e in errors[:3])
            return False, f"Contract validation failed: {err_msg}"
        return True, None
    except FileNotFoundError as fnf:
        return False, str(fnf)
    except Exception as exc:
        return False, f"Validator error: {str(exc)}"
