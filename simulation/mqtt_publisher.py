"""
JalSetu MQTT Live Telemetry Publisher
Streams synthetic village telemetry to an MQTT broker following contracts/mqtt_topics.md.
"""

import sys
import json
import time
from pathlib import Path
import paho.mqtt.client as mqtt

REPO_ROOT = Path(__file__).resolve().parent.parent
if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))

from simulation.generator import DataGenerator


def stream_telemetry_to_mqtt(
    broker_host: str = "localhost",
    broker_port: int = 1883,
    scenario_id: str = "baseline",
    delay_between_packets: float = 0.5,
    max_packets: int = 50
):
    """
    Connects to an MQTT broker and publishes contract-compliant telemetry packets.
    """
    gen = DataGenerator(seed=42)
    telemetry_records, _ = gen.generate_scenario_dataset(scenario_id, duration_hours=12)

    client = mqtt.Client(client_id="jalsetu_simulator_streamer")
    try:
        client.connect(broker_host, broker_port, 60)
        client.loop_start()
        print(f"Connected to MQTT broker at {broker_host}:{broker_port}")
    except Exception as e:
        print(f"[NOTE] Could not connect to live MQTT broker ({e}). Running in dry-run simulation mode.")
        client = None

    published = 0
    for record in telemetry_records[:max_packets]:
        topic = f"jalsetu/v1/{record['lgd_gp_code']}/{record['node_id']}/telemetry"
        payload_str = json.dumps(record)

        if client:
            client.publish(topic, payload_str, qos=1, retain=False)
            print(f"[MQTT PUB] {topic} -> {len(payload_str)} bytes")
        else:
            print(f"[DRY-RUN PUB] {topic} -> {len(payload_str)} bytes")

        published += 1
        time.sleep(delay_between_packets)

    if client:
        client.loop_stop()
        client.disconnect()

    print(f"Streamed {published} telemetry packets successfully.")
    return published


if __name__ == "__main__":
    stream_telemetry_to_mqtt(max_packets=5, delay_between_packets=0.1)
