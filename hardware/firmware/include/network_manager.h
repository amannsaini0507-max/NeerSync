#ifndef JALSETU_NETWORK_MANAGER_H
#define JALSETU_NETWORK_MANAGER_H

#include <Arduino.h>
#include "config.h"
#include "offline_queue.h"

class NetworkManager {
public:
    NetworkManager(const char* node_id, const char* lgd_gp_code);

    void begin();

    // Transmit telemetry: Tries LoRaWAN first; if unconfirmed, powers GSM & publishes via MQTT.
    // If both fail, queues payload into offline flash.
    bool transmitTelemetry(const String& payload, OfflineQueue& queue);

    // Publish node status / heartbeat / LWT
    bool publishStatus(const String& statusPayload);

    // Process background queue drain
    void processOfflineQueue(OfflineQueue& queue);

    int getRssiDbm() const { return m_last_rssi; }

private:
    const char* m_node_id;
    const char* m_lgd_gp_code;
    int m_last_rssi;
    String m_telemetry_topic;
    String m_status_topic;

    bool transmitLoRa(const String& payload);
    bool transmitMqttGsm(const String& topic, const String& payload, bool retain = false);
    void powerGsmModem(bool enable);
};

#endif // JALSETU_NETWORK_MANAGER_H
