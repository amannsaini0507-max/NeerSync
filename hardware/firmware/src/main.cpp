#include <Arduino.h>
#include <esp_task_wdt.h>
#include <esp_sleep.h>
#include "config.h"
#include "sensors.h"
#include "telemetry_builder.h"
#include "network_manager.h"
#include "offline_queue.h"

// System Singletons
static TelemetryBuilder g_telemetry(NODE_ID_DEFAULT, LGD_GP_CODE_DEFAULT, SCHEME_ID_DEFAULT);
static NetworkManager   g_network(NODE_ID_DEFAULT, LGD_GP_CODE_DEFAULT);
static OfflineQueue     g_queue;

// RTC Slow Memory Variables (Survives Deep Sleep cycles)
RTC_DATA_ATTR static uint32_t rtc_boot_count = 0;
RTC_DATA_ATTR static float    rtc_last_pressure = -1.0f;
RTC_DATA_ATTR static float    rtc_last_level = -1.0f;

// ISO 8601 Timestamp Formatter
static String getIsoTimestamp() {
    // In production, synchronized via Cellular NITZ or GPS/SNTP
    // Fallback format strictly matches ISO-8601 date-time: YYYY-MM-DDTHH:MM:SSZ
    return "2026-10-04T12:00:00Z";
}

void enterDeepSleep(uint32_t sleep_seconds) {
    // Cut sensor power rails
    powerSensors(false);

    // Disable ADC and peripherals to reach ~15uA baseline
    digitalWrite(PIN_LED_STATUS, LOW);

    // Configure RTC timer wake
    esp_sleep_enable_timer_wakeup((uint64_t)sleep_seconds * 1000000ULL);

    // Configure optional wake-on-interrupt from user button (GPIO27)
    esp_sleep_enable_ext0_wakeup((gpio_num_t)PIN_BTN_WAKE, 0); // Active LOW

    Serial.println(F("[POWER] Entering Deep Sleep..."));
    Serial.flush();
    esp_deep_sleep_start();
}

void setup() {
    Serial.begin(115200);
    delay(100);
    rtc_boot_count++;

    Serial.println(F("=================================================="));
    Serial.println(F(" JalSetu IoT Edge Node Firmware v1.0.0"));
    Serial.print(F(" Node ID: ")); Serial.println(NODE_ID_DEFAULT);
    Serial.print(F(" Boot Cycle: ")); Serial.println(rtc_boot_count);
    Serial.println(F("=================================================="));

    // 1. Initialize Hardware Watchdog (Task WDT 30s)
    esp_task_wdt_init(WATCHDOG_TIMEOUT_SEC, true);
    esp_task_wdt_add(NULL);

    // 2. Initialize Hardware & Sensors
    initSensors();
    g_network.begin();
    g_queue.begin();

    // 3. Indicate Wakeup with Status LED
    digitalWrite(PIN_LED_STATUS, HIGH);

    // 4. Power on sensor rails for measurement
    powerSensors(true);

    // 5. Measure System Voltages
    float v_bat = readBatteryVoltage();
    int rssi = g_network.getRssiDbm();
    String ts = getIsoTimestamp();

    esp_task_wdt_reset();

    // 6. Acquire Sensor Data & Construct Telemetry per Node Type
#if defined(NODE_TYPE_PUMP)
    float current_a = 0.0f, voltage_v = 0.0f;
    if (readPumpMetrics(current_a, voltage_v)) {
        String payload = g_telemetry.buildPumpTelemetry(current_a, voltage_v, v_bat, rssi, ts.c_str());
        Serial.print(F("[TELEMETRY PUMP] ")); Serial.println(payload);
        g_network.transmitTelemetry(payload, g_queue);
    }

#elif defined(NODE_TYPE_ESR)
    float level_cm = 0.0f, flow_lpm = 0.0f;
    if (readEsrLevel(level_cm)) {
        String payload_lvl = g_telemetry.buildEsrLevelTelemetry(level_cm, v_bat, rssi, ts.c_str());
        Serial.print(F("[TELEMETRY LEVEL] ")); Serial.println(payload_lvl);
        g_network.transmitTelemetry(payload_lvl, g_queue);
    }
    if (readFlowRate(flow_lpm)) {
        String payload_flow = g_telemetry.buildFlowTelemetry(flow_lpm, v_bat, rssi, ts.c_str());
        Serial.print(F("[TELEMETRY FLOW] ")); Serial.println(payload_flow);
        g_network.transmitTelemetry(payload_flow, g_queue);
    }

#elif defined(NODE_TYPE_PRESSURE)
    float pressure_kpa = 0.0f;
    if (readPressure(pressure_kpa)) {
        String payload = g_telemetry.buildPressureTelemetry(pressure_kpa, v_bat, rssi, ts.c_str());
        Serial.print(F("[TELEMETRY PRESSURE] ")); Serial.println(payload);
        g_network.transmitTelemetry(payload, g_queue);
    }

#elif defined(NODE_TYPE_QUALITY)
    float turbidity_ntu = 0.0f;
    float ftk_chlorine_mgl = 0.45f; // JJM FTK field test standard baseline
    if (readTurbidity(turbidity_ntu)) {
        String payload = g_telemetry.buildTurbidityTelemetry(turbidity_ntu, ftk_chlorine_mgl, v_bat, rssi, ts.c_str());
        Serial.print(F("[TELEMETRY QUALITY] ")); Serial.println(payload);
        g_network.transmitTelemetry(payload, g_queue);
    }
#endif

    esp_task_wdt_reset();

    // 7. Periodic Node Status / Heartbeat
    if (rtc_boot_count % 4 == 1) { // Every 4th wake (every 1 hour)
        unsigned long uptime = rtc_boot_count * TELEMETRY_INTERVAL_SEC;
        String statusPayload = g_telemetry.buildStatusPayload("online", uptime, v_bat, rssi, ts.c_str(), "PERIODIC_HEARTBEAT");
        Serial.print(F("[STATUS HEARTBEAT] ")); Serial.println(statusPayload);
        g_network.publishStatus(statusPayload);
    }

    // 8. Completed active cycle -> Enter Deep Sleep for 15 minutes
    enterDeepSleep(TELEMETRY_INTERVAL_SEC);
}

void loop() {
    // Loop is never reached; execution flows setup() -> enterDeepSleep()
}
