#include "network_manager.h"
#include <SPI.h>

NetworkManager::NetworkManager(const char* node_id, const char* lgd_gp_code)
    : m_node_id(node_id), m_lgd_gp_code(lgd_gp_code), m_last_rssi(-75) {
    // Topic formats strictly adhere to contracts/mqtt_topics.md:
    // neersync/v1/{lgd_gp_code}/{node_id}/{channel}
    m_telemetry_topic = "neersync/v1/" + String(m_lgd_gp_code) + "/" + String(m_node_id) + "/telemetry";
    m_status_topic = "neersync/v1/" + String(m_lgd_gp_code) + "/" + String(m_node_id) + "/status";
}

void NetworkManager::begin() {
    // Initialize SPI for SX1276 LoRa
    SPI.begin(PIN_LORA_SCK, PIN_LORA_MISO, PIN_LORA_MOSI, PIN_LORA_CS);
    pinMode(PIN_LORA_CS, OUTPUT);
    pinMode(PIN_LORA_RST, OUTPUT);
    digitalWrite(PIN_LORA_CS, HIGH);

    // Initialize GSM Modem control pins
    pinMode(PIN_PWR_MODEM_EN, OUTPUT);
    pinMode(PIN_MODEM_PWRKEY, OUTPUT);
    powerGsmModem(false); // Kept in ultra-low-power off state until required
}

void NetworkManager::powerGsmModem(bool enable) {
    if (enable) {
        digitalWrite(PIN_PWR_MODEM_EN, HIGH); // Enable MP2307 buck 3.8V rail
        delay(100);
        // Pulse PWRKEY low for 1.0s to initiate boot
        digitalWrite(PIN_MODEM_PWRKEY, LOW);
        delay(1000);
        digitalWrite(PIN_MODEM_PWRKEY, HIGH);
        delay(3000); // Wait for SIM registration and network attach
    } else {
        digitalWrite(PIN_PWR_MODEM_EN, LOW); // Cut modem buck power completely
    }
}

bool NetworkManager::transmitLoRa(const String& payload) {
    // Emulated / RadioLib SX1276 IN865 uplink transmission
    // Payload length budget check: < 512 bytes target, 1024 max
    if (payload.length() > 1024) return false;
    
    // In production, invokes state = radio.transmit(payload.c_str());
    // Simulate successful LoRa packet uplink in coverage area
    m_last_rssi = -72; // Typical IN865 RSSI in village
    return true;
}

bool NetworkManager::transmitMqttGsm(const String& topic, const String& payload, bool retain) {
    if (payload.length() > 1024) return false;

    // Power on GSM modem
    powerGsmModem(true);

    // In production, invokes TinyGSM ClientSecure / PubSubClient:
    // mqttClient.publish(topic.c_str(), payload.c_str(), retain);
    m_last_rssi = -68; // 4G LTE Cat-1 signal in dBm

    // Power down modem after transmission to conserve battery
    powerGsmModem(false);
    return true;
}

bool NetworkManager::transmitTelemetry(const String& payload, OfflineQueue& queue) {
    // Priority 1: Transmit via LoRaWAN (Zero recurring SIM cost)
    bool sent = transmitLoRa(payload);

    // Priority 2: Fallback to Cellular GSM MQTT if LoRa fails
    if (!sent) {
        sent = transmitMqttGsm(m_telemetry_topic, payload, false); // Telemetry is NEVER retained
    }

    // Priority 3: If both networks are unreachable, store in flash queue
    if (!sent) {
        queue.push(payload);
        return false;
    }

    // Once successfully connected, drain any previously queued offline packets
    processOfflineQueue(queue);
    return true;
}

bool NetworkManager::publishStatus(const String& statusPayload) {
    // Status / LWT is published with Retain = TRUE to .../status
    return transmitMqttGsm(m_status_topic, statusPayload, true);
}

void NetworkManager::processOfflineQueue(OfflineQueue& queue) {
    size_t pending = queue.count();
    if (pending == 0) return;

    // Drain up to 10 stored messages per cycle
    size_t batch = (pending > 10) ? 10 : pending;
    for (size_t i = 0; i < batch; i++) {
        String msg;
        if (queue.pop(msg)) {
            // Replay over cellular MQTT
            transmitMqttGsm(m_telemetry_topic, msg, false);
            delay(100);
        }
    }
}
