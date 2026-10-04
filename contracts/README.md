# JalSetu Interface Contracts (`/contracts`)

This folder contains the authoritative interface specifications, topic taxonomy, and JSON schemas for JalSetu. All components in this monorepo must adhere to these contracts:

- **IoT Firmware** (`/hardware/firmware`) publishes telemetry and listens for commands matching these schemas.
- **Hardware Simulation Engine** (`/simulation`) generates synthetic sensor packets adhering to `telemetry.schema.json`.
- **Backend Services** (`/webapp/backend`) validate incoming MQTT and REST payloads against these schemas.
- **Frontend Dashboard** (`/webapp/frontend`) renders real-time state and sends actuation commands matching `command.schema.json`.

---

## Files in this Directory

| File | Type | Description |
|---|---|---|
| [`ids.md`](./ids.md) | Specification | Canonical naming schema for zones, nodes, sensors, actuators, and alert codes. |
| [`mqtt_topics.md`](./mqtt_topics.md) | Specification | MQTT broker topic hierarchy, QoS policies, and retain flags. |
| [`telemetry.schema.json`](./telemetry.schema.json) | JSON Schema | Schema for periodic water level, flow, quality, and pressure metrics. |
| [`command.schema.json`](./command.schema.json) | JSON Schema | Schema for remote actuator control (pumps, motorized valves). |
| [`ack.schema.json`](./ack.schema.json) | JSON Schema | Schema for device execution acknowledgments. |
| [`alert.schema.json`](./alert.schema.json) | JSON Schema | Schema for real-time edge alarms (overflow, leak, dry-run, contamination). |
| [`heartbeat.schema.json`](./heartbeat.schema.json) | JSON Schema | Schema for node status, uptime, and MQTT Last Will & Testament (LWT). |
| [`config.schema.json`](./config.schema.json) | JSON Schema | Schema for over-the-air device configuration parameters. |
