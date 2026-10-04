# JalSetu Shared Contracts v1.0 (`/contracts`)

This folder contains the **authoritative single source of truth** for all communication protocols, telemetry schemas, and API definitions across the JalSetu ecosystem.

All three engineering teams validate against these contracts:
- **Team A (Simulation Engine)**: Generates synthetic digital-twin telemetry adhering strictly to `telemetry.schema.json`.
- **Team B (Webapp & Backend)**: Validates incoming MQTT/HTTP payloads and citizen feedback against these schemas.
- **Team C (Hardware & Firmware)**: Formats ESP32 / LoRaWAN packets to match payload size limits and fixed unit conventions.

---

## 📁 Directory Structure & Deliverables

| File / Folder | Purpose |
|---|---|
| [`telemetry.schema.json`](./telemetry.schema.json) | Draft 2020-12 schema for periodic telemetry (`pump`, `esr_level`, `flow`, `pressure`, `quality`). |
| [`alert.schema.json`](./alert.schema.json) | Draft 2020-12 schema for edge alarms and system anomaly events. |
| [`feedback.schema.json`](./feedback.schema.json) | Draft 2020-12 schema for citizen grievance reports (App, QR, WhatsApp, IVR). |
| [`status.schema.json`](./status.schema.json) | Draft 2020-12 schema for node heartbeat, availability, and MQTT LWT offline status. |
| [`mqtt_topics.md`](./mqtt_topics.md) | Topic taxonomy, QoS policies, retain rules, and payload size budget (<512 B target, 1024 B max). |
| [`ids.md`](./ids.md) | Canonical identifier definitions, regex patterns, engineering units, and LGD/IMIS mapping rules. |
| [`openapi.yaml`](./openapi.yaml) | OpenAPI 3.0.3 REST API skeleton. IMIS/Sujal Gaon endpoints marked `UNVERIFIED/configurable`. |
| [`examples/valid/`](./examples/valid/) | 20 valid sample JSON payloads (5 per schema). |
| [`examples/invalid/`](./examples/invalid/) | 20 invalid sample JSON payloads asserting strict failure on bad units, regexes, and types. |
| [`validate.py`](./validate.py) | Standalone Python validation CLI. Run with `python contracts/validate.py`. |
| [`test_contracts.py`](./test_contracts.py) | Pytest test suite with 45 unit tests. Run with `pytest contracts/test_contracts.py -v`. |
| [`CHANGELOG.md`](./CHANGELOG.md) | Contract version history. |

---

## ⚡ How to Run Contract Validation

Before pushing any changes or merging pull requests, run:

```bash
# 1. Run standalone validator
python contracts/validate.py

# 2. Run full pytest suite
pytest contracts/test_contracts.py -v
```

All 20 valid examples must pass, all 20 invalid examples must be rejected with schema violations, all regex patterns must match, and OpenAPI must be structurally sound.

---

## 🔒 How to Request a Contract Change (RFC Process)

> [!CAUTION]
> **STRICT REPO SAFETY RULE**:
> Developers working on `feature/simulation`, `feature/webapp`, or `feature/hardware` **MUST NEVER EDIT FILES INSIDE `/contracts` DIRECTLY**.
> Modifying contracts without cross-team consensus will break downstream builds and edge firmware parsers.

If your subsystem requires a schema modification, new telemetry metric, or topic change, follow this **4-Step Contract Change Protocol**:

### Step 1: Open a Written Change Request (CR)
Open a GitHub Issue or submit a proposal in your PR notes using this template:

```markdown
### Contract Change Request (CR-XXX)
- **Requested By**: [Your Name / Module, e.g., Team B Webapp]
- **Target Schema / Document**: [e.g., contracts/telemetry.schema.json]
- **Proposed Change**: [Describe the exact field, type, or topic addition]
- **Rationale**: [Why is this required? e.g., adding solar panel voltage metric for off-grid pump stations]
- **Impact Assessment**:
  - Impact on Hardware (ESP32 payload size): [e.g., +12 bytes, within 512B budget]
  - Impact on Simulation: [e.g., generate synthetic solar voltage]
  - Impact on Webapp (DB migration needed?): [e.g., add solar_v column to TimescaleDB]
```

### Step 2: Tri-Party Review & Consensus
The **Contracts Owner** together with representatives from Simulation, Webapp, and Hardware will review the proposal. All three must approve before the contract is modified.

### Step 3: Implement in `feature/contracts`
Only the Contracts Owner edits files in `/contracts`:
1. Update the JSON Schema (with Draft 2020-12 metaschema compliance).
2. Update `ids.md` / `mqtt_topics.md` / `openapi.yaml` accordingly.
3. Add valid and invalid test payload vectors in `contracts/examples/`.
4. Update `contracts/CHANGELOG.md`.
5. Verify `python contracts/validate.py` passes 100%.

### Step 4: Pull Request & Merge
Create a PR from `feature/contracts` to `main`. Once `.github/workflows/contracts.yml` passes and 1 approval is granted, merge into `main`. All teams then rebase or pull `main` to align with the new contract.
