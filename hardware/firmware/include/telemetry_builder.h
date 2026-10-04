#ifndef NEERSYNC_TELEMETRY_BUILDER_H
#define NEERSYNC_TELEMETRY_BUILDER_H

#include <Arduino.h>
#include <ArduinoJson.h>
#include "config.h"

class TelemetryBuilder {
public:
    TelemetryBuilder(const char* node_id, const char* lgd_gp_code, const char* scheme_id);

    // Build Node N1 Pump Telemetry
    String buildPumpTelemetry(float current_a, float voltage_v, float battery_v, int rssi_dbm, const char* iso_ts);

    // Build Node N2 ESR Level Telemetry
    String buildEsrLevelTelemetry(float level_cm, float battery_v, int rssi_dbm, const char* iso_ts);

    // Build Node N2 Flow Telemetry
    String buildFlowTelemetry(float flow_lpm, float battery_v, int rssi_dbm, const char* iso_ts);

    // Build Node N3 Pressure Telemetry
    String buildPressureTelemetry(float pressure_kpa, float battery_v, int rssi_dbm, const char* iso_ts);

    // Build Node N4 Quality Telemetry (Turbidity + FTK Chlorine)
    String buildTurbidityTelemetry(float turbidity_ntu, float chlorine_mgl, float battery_v, int rssi_dbm, const char* iso_ts);

    // Build Node Status / LWT Heartbeat Payload
    String buildStatusPayload(const char* status, unsigned long uptime_s, float battery_v, int rssi_dbm, const char* iso_ts, const char* reason = nullptr);

    // Increment packet sequence counter
    uint32_t getNextSequence() { return m_seq++; }

private:
    const char* m_node_id;
    const char* m_lgd_gp_code;
    const char* m_scheme_id;
    uint32_t m_seq;
};

#endif // NEERSYNC_TELEMETRY_BUILDER_H
