# JalSetu Virtual Village Simulation & AI/ML Platform (`/simulation`)

This directory houses the reproducible simulation engine, WNTR hydraulic model, fault injection framework, schema-compliant data generator, explainable AI/ML models, Streamlit demonstration, and FastAPI inference server.

---

## 🚀 Quickstart

From a clean repository clone, execute:

### Using Make (Linux / macOS / Git Bash):
```bash
# 1. Install pinned dependencies
make setup

# 2. Run test suite (24 unit tests)
make test

# 3. Launch interactive Streamlit demo
make demo
```

### Using Python Cross-Platform CLI (Windows PowerShell / cmd / all platforms):
```bash
# 1. Install pinned dependencies
python simulation/run.py setup

# 2. Run unit tests
python simulation/run.py test

# 3. Launch Streamlit demo
python simulation/run.py demo

# 4. Start FastAPI inference service on port 8000
python simulation/run.py serve

# 5. Run full scenario evaluation and generate figures
python simulation/run.py evaluate
```

---

## 📁 Module Organization

| File / Folder | Role |
|---|---|
| [`requirements.txt`](./requirements.txt) | Pinned dependencies (`wntr==1.5.0`, `scikit-learn==1.6.1`, `pandas==3.0.2`, `numpy==2.3.4`, etc.). |
| [`network.py`](./network.py) | WNTR hydraulic network model: 1 Source, 1 ESR, 3 Branches, 60 FHTCs. |
| [`scenarios.yaml`](./scenarios.yaml) | Declarative definitions for 9 realistic fault scenarios. |
| [`faults.py`](./faults.py) | Fault injection logic into hydraulic state and sensor metrics. |
| [`generator.py`](./generator.py) | Data generator producing 100% schema-compliant telemetry and citizen feedback. |
| [`mqtt_publisher.py`](./mqtt_publisher.py) | Optional streaming client publishing telemetry to MQTT broker. |
| [`analytics/`](./analytics/) | Explainable AI/ML: Rules baseline, Isolation Forest, MNF leak detection, Bayesian household inference, Priority scoring. |
| [`evaluate.py`](./evaluate.py) | Evaluation metrics runner (latency, precision, recall, accuracy) and figure generator. |
| [`demo.py`](./demo.py) | Streamlit dashboard with village map, time slider, fault injection buttons, and before/after views. |
| [`api.py`](./api.py) | FastAPI service exposing `POST /predict` matching `contracts/openapi.yaml`. |
| [`simulation_report.md`](./simulation_report.md) | Technical pitch report with figures and honest synthetic attribution. |
| [`tests/`](./tests/) | Pytest test suite covering network, generator, all 9 fault scenarios, analytics, and API. |
| [`samples/`](./samples/) | Pre-generated sample CSV, Parquet, and JSON datasets for Webapp (B) and Hardware (C). |
| [`reports/figures/`](./reports/figures/) | Generated evaluation plots and village network topology diagram. |
