import json
import logging
import asyncio
from typing import Optional
import paho.mqtt.client as mqtt
from app.config import settings
from app.database import AsyncSessionLocal
from app.services.ingestion import ingestion_service

logger = logging.getLogger(__name__)


class MQTTIngestionSubscriber:
    """
    Subscribes to jalsetu/v1/# topics, validates payloads against contract schemas,
    and stores metrics into time-series database.
    """

    def __init__(self):
        self.client: Optional[mqtt.Client] = None
        self.is_running = False

    def start(self):
        """Starts MQTT client connection in background loop."""
        if not settings.mqtt_enabled:
            logger.info("MQTT client is disabled by configuration.")
            return

        try:
            self.client = mqtt.Client(
                client_id="jalsetu-backend-ingest-worker",
                clean_session=False,
                protocol=mqtt.MQTTv311
            )
            if settings.mqtt_username and settings.mqtt_password:
                self.client.username_pw_set(settings.mqtt_username, settings.mqtt_password)

            self.client.on_connect = self._on_connect
            self.client.on_message = self._on_message
            self.client.on_disconnect = self._on_disconnect

            logger.info("Connecting to MQTT Broker at %s:%s...", settings.mqtt_broker_host, settings.mqtt_broker_port)
            self.client.connect_async(settings.mqtt_broker_host, settings.mqtt_broker_port, 60)
            self.client.loop_start()
            self.is_running = True
        except Exception as e:
            logger.warning("Could not initiate MQTT connection: %s (Broker may be offline)", str(e))

    def stop(self):
        """Stops MQTT client loop."""
        if self.client and self.is_running:
            self.client.loop_stop()
            self.client.disconnect()
            self.is_running = False
            logger.info("MQTT subscriber stopped.")

    def _on_connect(self, client, userdata, flags, rc):
        if rc == 0:
            logger.info("Connected to MQTT Broker successfully.")
            client.subscribe(settings.mqtt_topic_subscribe, qos=1)
            logger.info("Subscribed to topic pattern: %s", settings.mqtt_topic_subscribe)
        else:
            logger.error("Failed to connect to MQTT broker, return code: %s", rc)

    def _on_disconnect(self, client, userdata, rc):
        logger.warning("Disconnected from MQTT broker (rc: %s). Auto-reconnecting...", rc)

    def _on_message(self, client, userdata, msg):
        topic = msg.topic
        payload_bytes = msg.payload
        logger.debug("Received MQTT message on %s (%d bytes)", topic, len(payload_bytes))

        # Topic format: jalsetu/v1/{lgd_gp_code}/{node_id}/{channel}
        parts = topic.split("/")
        if len(parts) < 5 or parts[0] != "jalsetu" or parts[1] != "v1":
            logger.warning("Ignored non-canonical MQTT topic: %s", topic)
            return

        channel = parts[4]
        try:
            payload = json.loads(payload_bytes.decode("utf-8"))
        except Exception as exc:
            logger.error("Failed to parse JSON payload on %s: %s", topic, str(exc))
            return

        # Run async ingestion in background event loop
        try:
            loop = asyncio.get_event_loop()
        except RuntimeError:
            loop = asyncio.new_event_loop()
            asyncio.set_event_loop(loop)

        if loop.is_running():
            asyncio.create_task(self._process_payload(channel, payload, payload_bytes))
        else:
            loop.run_until_complete(self._process_payload(channel, payload, payload_bytes))

    async def _process_payload(self, channel: str, payload: dict, raw_bytes: bytes):
        async with AsyncSessionLocal() as session:
            try:
                if channel == "telemetry":
                    success, msg, _ = await ingestion_service.ingest_telemetry(session, payload, raw_bytes=raw_bytes)
                    if not success:
                        logger.warning("Dropped invalid telemetry on MQTT: %s", msg)
                elif channel == "status":
                    success, msg, _ = await ingestion_service.ingest_status(session, payload, raw_bytes=raw_bytes)
                    if not success:
                        logger.warning("Dropped invalid status on MQTT: %s", msg)
            except Exception as e:
                logger.error("Error processing MQTT message: %s", str(e))


mqtt_subscriber = MQTTIngestionSubscriber()
