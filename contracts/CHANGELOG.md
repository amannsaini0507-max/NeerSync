# JalSetu Contracts Changelog

All notable changes to the JalSetu Shared Contracts, Schemas, and Topic Taxonomies will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-10-04

### Added
- **Draft 2020-12 JSON Schemas**:
  - `telemetry.schema.json`: Strict per-type validation for `pump`, `esr_level`, `flow`, `pressure`, and `quality` subsystems with conditional schema validation and fixed engineering units.
  - `alert.schema.json`: System anomaly and alert specification (`no_supply`, `low_pressure`, `leakage`, `quality`, `node_offline`, `chronic_nonfunctional`).
  - `feedback.schema.json`: Citizen grievance ingestion contract supporting App, QR, WhatsApp, and IVR channels.
  - `status.schema.json`: Node connection state, heartbeat, and MQTT Last Will & Testament (LWT) contract.
- **Specifications**:
  - `ids.md`: Canonical identifier patterns for `node_id`, `lgd_gp_code`, `scheme_id`, `habitation_id`, `fhtc_id`, and administrative hierarchy mapping rules.
  - `mqtt_topics.md`: MQTT topic taxonomy (`jalsetu/v1/{lgd_gp_code}/{node_id}/{telemetry|status|cmd}`), QoS policies, retain rules, and payload size budget (<512 bytes target, 1024 bytes maximum).
- **REST API**:
  - `openapi.yaml`: OpenAPI 3.0.3 specification covering ingestion, alerts, citizen feedback, master data, ML predictions, and marked mock sync adapters for IMIS and Sujal Gaon.
- **Validation & Test Suite**:
  - `validate.py`: Automated CLI validator verifying Draft 2020-12 metaschemas, regex vectors, and OpenAPI syntax.
  - `test_contracts.py`: Comprehensive Pytest test suite with 45 unit tests.
  - `examples/valid/`: 20 valid sample payload fixtures covering all schema types.
  - `examples/invalid/`: 20 invalid sample payload fixtures asserting rejection of illegal units, bad regexes, and missing fields.
- **CI Pipeline**:
  - `.github/workflows/contracts.yml`: Automated GitHub Actions workflow executing validator and test suite on every PR and push.
