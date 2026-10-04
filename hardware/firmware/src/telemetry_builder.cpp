#include "telemetry_builder.h"

TelemetryBuilder::TelemetryBuilder(const char* node_id, const char* lgd_gp_code, const char* scheme_id)
    : m_node_id(node_id), m_lgd_gp_code(lgd_gp_code), m_scheme_id(scheme_id), m_seq(1) {}

String TelemetryBuilder::buildPumpTelemetry(float current_a, float voltage_v, float battery_v, int rssi_dbm, const char* iso_ts) {
    JsonDocument doc;
    doc["schema_version"] = NEERSYNC_SCHEMA_VERSION;
    doc["node_id"] = m_node_id;
    doc["lgd_gp_code"] = m_lgd_gp_code;
    doc["scheme_id"] = m_scheme_id;
    doc["ts"] = iso_ts;
    doc["seq"] = getNextSequence();
    doc["type"] = "pump";

    JsonObject values = doc["values"].to<JsonObject>();
    values["current_a"] = roundf(current_a * 10.0f) / 10.0f;
    values["voltage_v"] = roundf(voltage_v * 10.0f) / 10.0f;

    doc["battery_v"] = roundf(battery_v * 100.0f) / 100.0f;
    doc["rssi_dbm"] = rssi_dbm;
    doc["fw"] = NEERSYNC_FIRMWARE_VERSION;

    String output;
    serializeJson(doc, output);
    return output;
}

String TelemetryBuilder::buildEsrLevelTelemetry(float level_cm, float battery_v, int rssi_dbm, const char* iso_ts) {
    JsonDocument doc;
    doc["schema_version"] = NEERSYNC_SCHEMA_VERSION;
    doc["node_id"] = m_node_id;
    doc["lgd_gp_code"] = m_lgd_gp_code;
    doc["scheme_id"] = m_scheme_id;
    doc["ts"] = iso_ts;
    doc["seq"] = getNextSequence();
    doc["type"] = "esr_level";

    JsonObject values = doc["values"].to<JsonObject>();
    values["level_cm"] = roundf(level_cm * 10.0f) / 10.0f;

    doc["battery_v"] = roundf(battery_v * 100.0f) / 100.0f;
    doc["rssi_dbm"] = rssi_dbm;
    doc["fw"] = NEERSYNC_FIRMWARE_VERSION;

    String output;
    serializeJson(doc, output);
    return output;
}

String TelemetryBuilder::buildFlowTelemetry(float flow_lpm, float battery_v, int rssi_dbm, const char* iso_ts) {
    JsonDocument doc;
    doc["schema_version"] = NEERSYNC_SCHEMA_VERSION;
    doc["node_id"] = m_node_id;
    doc["lgd_gp_code"] = m_lgd_gp_code;
    doc["scheme_id"] = m_scheme_id;
    doc["ts"] = iso_ts;
    doc["seq"] = getNextSequence();
    doc["type"] = "flow";

    JsonObject values = doc["values"].to<JsonObject>();
    values["flow_lpm"] = roundf(flow_lpm * 10.0f) / 10.0f;

    doc["battery_v"] = roundf(battery_v * 100.0f) / 100.0f;
    doc["rssi_dbm"] = rssi_dbm;
    doc["fw"] = NEERSYNC_FIRMWARE_VERSION;

    String output;
    serializeJson(doc, output);
    return output;
}

String TelemetryBuilder::buildPressureTelemetry(float pressure_kpa, float battery_v, int rssi_dbm, const char* iso_ts) {
    JsonDocument doc;
    doc["schema_version"] = NEERSYNC_SCHEMA_VERSION;
    doc["node_id"] = m_node_id;
    doc["lgd_gp_code"] = m_lgd_gp_code;
    doc["scheme_id"] = m_scheme_id;
    doc["ts"] = iso_ts;
    doc["seq"] = getNextSequence();
    doc["type"] = "pressure";

    JsonObject values = doc["values"].to<JsonObject>();
    values["pressure_kpa"] = roundf(pressure_kpa * 10.0f) / 10.0f;

    doc["battery_v"] = roundf(battery_v * 100.0f) / 100.0f;
    doc["rssi_dbm"] = rssi_dbm;
    doc["fw"] = NEERSYNC_FIRMWARE_VERSION;

    String output;
    serializeJson(doc, output);
    return output;
}

String TelemetryBuilder::buildTurbidityTelemetry(float turbidity_ntu, float chlorine_mgl, float battery_v, int rssi_dbm, const char* iso_ts) {
    JsonDocument doc;
    doc["schema_version"] = NEERSYNC_SCHEMA_VERSION;
    doc["node_id"] = m_node_id;
    doc["lgd_gp_code"] = m_lgd_gp_code;
    doc["scheme_id"] = m_scheme_id;
    doc["ts"] = iso_ts;
    doc["seq"] = getNextSequence();
    doc["type"] = "quality";

    JsonObject values = doc["values"].to<JsonObject>();
    values["turbidity_ntu"] = roundf(turbidity_ntu * 100.0f) / 100.0f;
    values["chlorine_mgl"] = roundf(chlorine_mgl * 100.0f) / 100.0f;

    doc["battery_v"] = roundf(battery_v * 100.0f) / 100.0f;
    doc["rssi_dbm"] = rssi_dbm;
    doc["fw"] = NEERSYNC_FIRMWARE_VERSION;

    String output;
    serializeJson(doc, output);
    return output;
}

String TelemetryBuilder::buildStatusPayload(const char* status, unsigned long uptime_s, float battery_v, int rssi_dbm, const char* iso_ts, const char* reason) {
    JsonDocument doc;
    doc["node_id"] = m_node_id;
    doc["lgd_gp_code"] = m_lgd_gp_code;
    doc["scheme_id"] = m_scheme_id;
    doc["status"] = status; // "online", "offline", "degraded"
    doc["uptime_s"] = uptime_s;
    doc["battery_v"] = roundf(battery_v * 100.0f) / 100.0f;
    doc["rssi_dbm"] = rssi_dbm;
    doc["fw"] = NEERSYNC_FIRMWARE_VERSION;
    doc["last_seen_ts"] = iso_ts;

    if (reason && strlen(reason) > 0) {
        doc["reason"] = reason;
    }

    String output;
    serializeJson(doc, output);
    return output;
}
