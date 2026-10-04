# JalSetu MQTT Topics Specification (`mqtt_topics.md`)

This document defines the MQTT topic taxonomy, Quality of Service (QoS), Retain policy, and payload conventions for communication between JalSetu edge devices, gateways, simulators, and backend services.

---

## 1. Topic Hierarchy Design

All topics follow the canonical URI schema:

```
jalsetu/v1/{zone_id}/{node_id}/{channel}
```

- **Protocol Version**: `v1` (enables backwards compatibility for future major protocol revisions).
- **Wildcards Allowed for Subscribers**:
  - `jalsetu/v1/#` : Monitor all system traffic (Backend Ingestion Engine).
  - `jalsetu/v1/{zone_id}/#` : Monitor a specific zone.
  - `jalsetu/v1/+/{node_id}/telemetry` : Aggregate all telemetry across zones.

---

## 2. Topic Taxonomy & Quality of Service (QoS)

| Topic Pattern | Direction | QoS | Retain | Payload Contract | Description |
|---|---|---|---|---|---|
| `jalsetu/v1/{zone_id}/{node_id}/telemetry` | Node -> Cloud | 1 | False | [`telemetry.schema.json`](./telemetry.schema.json) | Periodic sensor telemetry readings |
| `jalsetu/v1/{zone_id}/{node_id}/heartbeat` | Node -> Cloud | 1 | True | [`heartbeat.schema.json`](./heartbeat.schema.json) | Keep-alive heartbeat & LWT offline notification |
| `jalsetu/v1/{zone_id}/{node_id}/cmd` | Cloud -> Node | 1 | False | [`command.schema.json`](./command.schema.json) | Control actuation commands (e.g., pump start, valve open) |
| `jalsetu/v1/{zone_id}/{node_id}/ack` | Node -> Cloud | 1 | False | [`ack.schema.json`](./ack.schema.json) | Acknowledgment & execution status of commands |
| `jalsetu/v1/{zone_id}/{node_id}/alerts` | Node -> Cloud | 2 | True | [`alert.schema.json`](./alert.schema.json) | Critical edge alarms (overflow, leak, contamination) |
| `jalsetu/v1/{zone_id}/{node_id}/config` | Cloud -> Node | 1 | True | [`config.schema.json`](./config.schema.json) | Remote configuration update (thresholds, reporting intervals) |

---

## 3. Last Will and Testament (LWT) Configuration

Edge nodes MUST configure their MQTT client connection with an LWT message to detect hardware power failure or network loss:

- **LWT Topic**: `jalsetu/v1/{zone_id}/{node_id}/heartbeat`
- **LWT QoS**: `1`
- **LWT Retain**: `true`
- **LWT Payload**:
```json
{
  "node_id": "JS-DL-Z01-OHT-01",
  "zone_id": "JS-DL-Z01",
  "status": "OFFLINE",
  "reason": "CONNECTION_LOST_LWT",
  "timestamp": "2026-10-04T12:00:00Z"
}
```

When connecting successfully, nodes immediately publish an online status to the same topic with `status: "ONLINE"`.

---

## 4. Message Channels & Example Payloads

### 4.1 Telemetry (`.../telemetry`)
Published periodically (e.g., every 10–30 seconds, or upon significant delta):

```json
{
  "message_id": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
  "timestamp": "2026-10-04T13:45:00.000Z",
  "zone_id": "JS-DL-Z01",
  "node_id": "JS-DL-Z01-OHT-01",
  "metrics": {
    "water_level_m": 4.82,
    "water_level_pct": 78.5,
    "inlet_flow_lpm": 250.0,
    "outlet_flow_lpm": 180.2,
    "line_pressure_bar": 2.45,
    "ph": 7.35,
    "turbidity_ntu": 1.8,
    "tds_ppm": 240.0,
    "water_temp_c": 24.5
  },
  "diagnostics": {
    "battery_pct": 98,
    "rssi_dbm": -68,
    "uptime_seconds": 86400
  }
}
```

### 4.2 Actuation Commands (`.../cmd`)
Published by the backend or dashboard to trigger actions:

```json
{
  "command_id": "cmd-88291a92-4112",
  "timestamp": "2026-10-04T13:45:10.000Z",
  "target_node": "JS-DL-Z01-OHT-01",
  "target_actuator": "PMP_01",
  "action": "START",
  "parameters": {
    "auto_cutoff_level_m": 5.80,
    "max_runtime_minutes": 45
  },
  "issued_by": "operator_admin_01"
}
```

### 4.3 Command Acknowledgment (`.../ack`)
Published by node upon receiving and applying a command:

```json
{
  "command_id": "cmd-88291a92-4112",
  "node_id": "JS-DL-Z01-OHT-01",
  "target_actuator": "PMP_01",
  "status": "SUCCESS",
  "executed_at": "2026-10-04T13:45:10.450Z",
  "message": "Pump contactor engaged successfully. Current draw: 12.4A."
}
```

### 4.4 Alarms & Alerts (`.../alerts`)
Published immediately when threshold limits are breached:

```json
{
  "alert_id": "alt-5590-1284",
  "timestamp": "2026-10-04T13:46:00.000Z",
  "zone_id": "JS-DL-Z01",
  "node_id": "JS-DL-Z01-OHT-01",
  "alert_code": "ERR_OVERFLOW",
  "severity": "CRITICAL",
  "metric_name": "water_level_m",
  "measured_value": 5.95,
  "threshold_value": 5.80,
  "description": "Overhead tank level exceeded safe limit (5.80m). Automated cutoff triggered."
}
```
