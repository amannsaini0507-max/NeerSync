# NeerSync (नीर सिंक) 💧

> **Smart Water Monitoring, Distribution & Management System**  
> An integrated IoT and analytics platform for real-time water infrastructure monitoring, automated distribution control, leakage detection, and water quality assurance.

---

## 🏗️ Repository Architecture & Directory Structure

```
neersync/
├── .github/
│   └── workflows/          # CI/CD pipelines and automated schema/code validation
├── contracts/              # Single source of truth: JSON Schemas, MQTT topics, and ID specs
│   ├── ids.md              # Canonical identifiers for zones, nodes, and sensors
│   ├── mqtt_topics.md      # Topic taxonomy, QoS, retain, and LWT specifications
│   ├── telemetry.schema.json
│   ├── command.schema.json
│   ├── ack.schema.json
│   ├── alert.schema.json
│   ├── heartbeat.schema.json
│   └── config.schema.json
├── simulation/             # IoT digital twin & hardware simulator for testing
├── webapp/
│   ├── backend/            # Ingestion microservices, REST/WebSocket APIs, database models
│   └── frontend/           # Modern operator dashboard, GIS maps, real-time telemetry charts
├── hardware/
│   ├── schematics/         # Circuit schematics (KiCad / EasyEDA / PDF)
│   ├── firmware/           # Microcontroller code (ESP32 / Arduino / FreeRTOS)
│   ├── bom/                # Bill of Materials and hardware component specs
│   └── docs/               # Pinout diagrams, assembly manuals, and wiring guides
├── docs/                   # System design, presentation decks, and architecture docs
├── .gitignore              # Python, Node.js, and hardware build ignores
├── LICENSE                 # MIT License
└── README.md
```

---

## ⚡ Quick Start & Development Workflow

### 1. Interfaces & Contracts
All communication between firmware, simulation, backend, and frontend is strictly governed by the contracts in [`contracts/`](./contracts/). Before implementing any feature, consult [`contracts/ids.md`](./contracts/ids.md) and [`contracts/mqtt_topics.md`](./contracts/mqtt_topics.md).

### 2. Simulation Engine
Test end-to-end functionality without physical hardware using the simulation scripts in [`simulation/`](./simulation/).

### 3. Web Platform
- **Backend**: API server and MQTT subscriber in [`webapp/backend/`](./webapp/backend/).
- **Frontend**: Real-time management interface in [`webapp/frontend/`](./webapp/frontend/).

---

## 🛡️ Git Workflow & Contribution Guidelines

1. **Feature Branches**: Branch off from `main` using standard naming: `feature/<feature-name>`, `fix/<bug-name>`, or `docs/<doc-name>`.
2. **Pull Requests**: Pull requests are required before merging into `main`. All schema validation tests must pass.
3. **Commit Messages**: Follow conventional commits (e.g., `feat:`, `fix:`, `chore:`, `docs:`).

---

## 📄 License
This project is licensed under the [MIT License](./LICENSE).
