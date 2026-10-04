# JalSetu MQTT Topics Specification (`mqtt_topics.md`)

**Version**: `1.0`  
**Governing Standard**: Jal Jeevan Mission (JJM) FHTC Monitoring Architecture

---

## 1. Topic Hierarchy Design

All communication between edge nodes (ESP32 / LoRaWAN gateways), the MQTT Broker (Eclipse Mosquitto / EMQX), and the ingestion backend adheres strictly to the canonical hierarchy:

```
jalsetu/v1/{lgd_gp_code}/{node_id}/{channel}
```

### Hierarchy Parameters:
- **`jalsetu/v1`**: Fixed protocol prefix and major API version.
- **`{lgd_gp_code}`**: Local Government Directory Gram Panchayat code (e.g. `245123`).
- **`{node_id}`**: Standard node identifier matching `JS-<STATE2>-<LGD>-N<3 digits>` (e.g. `JS-UP-245123-N001`).
- **`{channel}`**: One of `telemetry`, `status`, or `cmd`.

---

## 2. Channels, QoS, and Retain Policy

| Channel Topic Pattern | Direction | QoS | Retain Policy | Payload Schema | Description |
|---|---|---|---|---|---|
| `jalsetu/v1/{lgd_gp_code}/{node_id}/telemetry` | Node -> Cloud | **1** | **False** (Never retain) | [`telemetry.schema.json`](./telemetry.schema.json) | High-frequency telemetry (pump, ESR level, flow, pressure, quality). |
| `jalsetu/v1/{lgd_gp_code}/{node_id}/status` | Node -> Cloud | **1** | **True** (Retained) | [`status.schema.json`](./status.schema.json) | Node connection state, heartbeat, and MQTT Last Will & Testament (LWT). |
| `jalsetu/v1/{lgd_gp_code}/{node_id}/cmd` | Cloud -> Node | **1** | **False** (Never retain) | JSON actuation command | Remote control commands (valve actuation, sampling rate adjustment, node reboot). |

---

## 3. Payload Size Limits & Bandwidth Optimization

To guarantee reliable transmission across rural Indian telecom networks (2G/GPRS fallback, intermittent 4G, and LoRaWAN backhauls):

- **Target Payload Size**: **< 512 bytes** for all telemetry packets.
- **Hard Maximum Payload Limit**: **1024 bytes** (1 KB). The ingestion broker MUST reject and drop any packet exceeding 1024 bytes.
- **Rules for Edge Nodes**:
  - Do not send redundant diagnostic text in telemetry packets.
  - Round floating-point values to standard precision:
    - Pressure: 1 decimal place (`pressure_kpa: 142.5`)
    - Flow: 1 decimal place (`flow_lpm: 24.8`)
    - Level: 1 decimal place (`level_cm: 285.0`)
    - Water quality: 2 decimal places (`chlorine_mgl: 0.45`, `turbidity_ntu: 1.20`)
    - Battery voltage: 2 decimal places (`battery_v: 3.82`)
  - Use UTC ISO-8601 timestamps formatted to seconds (`YYYY-MM-DDTHH:MM:SSZ`).

---

## 4. Last Will and Testament (LWT) Configuration

Edge nodes MUST configure their MQTT client connection with an LWT message upon initiating the MQTT session:

- **LWT Topic**: `jalsetu/v1/{lgd_gp_code}/{node_id}/status`
- **LWT QoS**: `1`
- **LWT Retain**: `true`
- **LWT Payload**:
```json
{
  "node_id": "JS-UP-245123-N001",
  "lgd_gp_code": "245123",
  "scheme_id": "SCH-UP-245123",
  "status": "offline",
  "uptime_s": 0,
  "battery_v": 3.70,
  "rssi_dbm": -95,
  "fw": "1.0.0",
  "last_seen_ts": "2026-10-04T12:00:00Z",
  "reason": "CONNECTION_LOST_LWT"
}
```

When connecting successfully, nodes immediately publish a message with `status: "online"` and `reason: "BOOT_CONNECT"` to the same retained topic.

---

## 5. Concrete Publish Examples

### 5.1 CLI Publish using `mosquitto_pub`

```bash
# Publish tail-end pressure telemetry
mosquitto_pub -h mqtt.jalsetu.gov.in -p 8883 -s \
  -t "jalsetu/v1/245123/JS-UP-245123-N004/telemetry" -q 1 \
  -m '{
    "schema_version": "1.0",
    "node_id": "JS-UP-245123-N004",
    "lgd_gp_code": "245123",
    "scheme_id": "SCH-UP-245123",
    "ts": "2026-10-04T13:45:00Z",
    "seq": 1042,
    "type": "pressure",
    "values": {
      "pressure_kpa": 128.5
    },
    "battery_v": 3.95,
    "rssi_dbm": -72,
    "fw": "1.0.0"
  }'
```

### 5.2 Python Publish using `paho-mqtt`

```python
import json
import paho.mqtt.client as mqtt

client = mqtt.Client(client_id="JS-UP-245123-N002")

# Set LWT before connecting
lwt_payload = json.dumps({
    "node_id": "JS-UP-245123-N002",
    "lgd_gp_code": "245123",
    "scheme_id": "SCH-UP-245123",
    "status": "offline",
    "uptime_s": 0,
    "battery_v": 3.80,
    "rssi_dbm": -85,
    "fw": "1.0.0",
    "last_seen_ts": "2026-10-04T13:45:00Z",
    "reason": "DISCONNECT_LWT"
})
client.will_set("jalsetu/v1/245123/JS-UP-245123-N002/status", lwt_payload, qos=1, retain=True)

client.connect("mqtt.jalsetu.gov.in", 8883, 60)

# Publish ESR level telemetry
telemetry_payload = json.dumps({
    "schema_version": "1.0",
    "node_id": "JS-UP-245123-N002",
    "lgd_gp_code": "245123",
    "scheme_id": "SCH-UP-245123",
    "ts": "2026-10-04T13:45:10Z",
    "seq": 45,
    "type": "esr_level",
    "values": {
        "level_cm": 340.5,
        "level_pct": 82.5
    },
    "battery_v": 4.10,
    "rssi_dbm": -68,
    "fw": "1.0.0"
})
client.publish("jalsetu/v1/245123/JS-UP-245123-N002/telemetry", telemetry_payload, qos=1, retain=False)
```

### 5.3 ESP32 C++ Snippet (`PubSubClient`)

```cpp
#include <PubSubClient.h>

const char* topic_telemetry = "jalsetu/v1/245123/JS-UP-245123-N003/telemetry";

void sendFlowTelemetry(float flow_lpm, float totalizer_l, float batt_v, int rssi) {
  char payload[300];
  snprintf(payload, sizeof(payload),
    "{\"schema_version\":\"1.0\",\"node_id\":\"JS-UP-245123-N003\","
    "\"lgd_gp_code\":\"245123\",\"scheme_id\":\"SCH-UP-245123\","
    "\"ts\":\"2026-10-04T13:45:20Z\",\"seq\":%lu,\"type\":\"flow\","
    "\"values\":{\"flow_lpm\":%.1f,\"totalizer_l\":%.1f},"
    "\"battery_v\":%.2f,\"rssi_dbm\":%d,\"fw\":\"1.0.0\"}",
    packet_seq++, flow_lpm, totalizer_l, batt_v, rssi
  );
  mqttClient.publish(topic_telemetry, payload, false);
}
```
