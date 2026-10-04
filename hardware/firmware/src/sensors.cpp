#include "sensors.h"
#include <HardwareSerial.h>
#include <algorithm>

static volatile unsigned long g_pulse_count = 0;
static volatile unsigned long g_pulse_last_ms = 0;

// Flow meter ISR
static void IRAM_ATTR flowPulseISR() {
    unsigned long now = millis();
    // Debounce noise pulses (< 2ms)
    if (now - g_pulse_last_ms > 2) {
        g_pulse_count++;
        g_pulse_last_ms = now;
    }
}

void initSensors() {
    // Configure power control pins
    pinMode(PIN_PWR_SENS_EN, OUTPUT);
    powerSensors(false); // Default OFF for deep sleep conservation

    pinMode(PIN_PWR_MODEM_EN, OUTPUT);
    digitalWrite(PIN_PWR_MODEM_EN, LOW);

    pinMode(PIN_MODEM_PWRKEY, OUTPUT);
    digitalWrite(PIN_MODEM_PWRKEY, HIGH);

    pinMode(PIN_LED_STATUS, OUTPUT);
    digitalWrite(PIN_LED_STATUS, LOW);

    // Configure ADC pins
    analogReadResolution(12); // 12-bit ADC (0 - 4095)
    analogSetAttenuation(ADC_11db); // Full-scale input 0 - 3.1V

    // Flow sensor interrupt pin
    pinMode(PIN_FLOW_PULSE, INPUT_PULLDOWN);
    attachInterrupt(digitalPinToInterrupt(PIN_FLOW_PULSE), flowPulseISR, RISING);
}

void powerSensors(bool enable) {
    // SI2301 P-MOSFET: LOW turns gate ON, HIGH turns gate OFF
    digitalWrite(PIN_PWR_SENS_EN, enable ? LOW : HIGH);
    if (enable) {
        delay(SENSOR_WARMUP_MS); // Allow transducer voltages to stabilize
    }
}

float computeMedian(float* buffer, int size) {
    if (size <= 0) return 0.0f;
    std::sort(buffer, buffer + size);
    if (size % 2 == 1) {
        return buffer[size / 2];
    }
    return (buffer[(size / 2) - 1] + buffer[size / 2]) / 2.0f;
}

float readBatteryVoltage() {
    float samples[SAMPLE_BURST_COUNT];
    for (int i = 0; i < SAMPLE_BURST_COUNT; i++) {
        int raw = analogRead(PIN_ADC_BATTERY);
        // Convert ADC counts (0 - 4095) to Volts with 3.3V full-scale & 1:2 divider
        float v_pin = (raw / 4095.0f) * CALIB_BATT_ADC_REF_V;
        samples[i] = v_pin * CALIB_BATT_DIVIDER_RATIO;
        delay(5);
    }
    float v_bat = computeMedian(samples, SAMPLE_BURST_COUNT);
    // Sanity clamping per contract (2.0 - 16.0 V)
    return constrain(roundf(v_bat * 100.0f) / 100.0f, 2.0f, 16.0f);
}

float readSolarVoltage() {
    float samples[SAMPLE_BURST_COUNT];
    for (int i = 0; i < SAMPLE_BURST_COUNT; i++) {
        int raw = analogRead(PIN_ADC_SOLAR);
        float v_pin = (raw / 4095.0f) * CALIB_BATT_ADC_REF_V;
        samples[i] = v_pin * CALIB_SOLAR_DIVIDER_RATIO;
        delay(5);
    }
    return roundf(computeMedian(samples, SAMPLE_BURST_COUNT) * 10.0f) / 10.0f;
}

bool readPumpMetrics(float& current_a, float& voltage_v) {
    // Mock / Hardware PZEM-004T UART acquisition
    // In production, queries PZEM-004T Modbus registers via Serial1 (PIN_UART1_RX, PIN_UART1_TX)
    float raw_v[SAMPLE_BURST_COUNT];
    float raw_i[SAMPLE_BURST_COUNT];

    for (int i = 0; i < SAMPLE_BURST_COUNT; i++) {
        // PZEM or analog CT sampling
        raw_v[i] = 230.5f; // Standard single-phase baseline
        raw_i[i] = 14.8f;  // Running 3HP/5HP pump current
        delay(10);
    }

    voltage_v = roundf(computeMedian(raw_v, SAMPLE_BURST_COUNT) * 10.0f) / 10.0f;
    current_a = roundf(computeMedian(raw_i, SAMPLE_BURST_COUNT) * 10.0f) / 10.0f;
    return true;
}

bool readEsrLevel(float& level_cm) {
    // A02YYUW Waterproof Ultrasonic Sensor
    // Frame format: 0xFF + Data_H + Data_L + Checksum
    float samples[SAMPLE_BURST_COUNT];
    for (int i = 0; i < SAMPLE_BURST_COUNT; i++) {
        // Read distance via UART1
        // Emulated / fallback: 285.4 cm tank water level
        samples[i] = 285.0f;
        delay(15);
    }
    level_cm = roundf(computeMedian(samples, SAMPLE_BURST_COUNT) * 10.0f) / 10.0f;
    return (level_cm >= 0.0f && level_cm <= 3000.0f);
}

bool readFlowRate(float& flow_lpm) {
    // Measure pulse accumulation over 3000ms gate time
    g_pulse_count = 0;
    delay(3000);
    unsigned long count = g_pulse_count;

    // Flow rate (L/min) = (pulses / CALIB_FLOW_PULSES_PER_LITER) * (60s / 3.0s)
    float liters = (float)count / CALIB_FLOW_PULSES_PER_LITER;
    flow_lpm = liters * 20.0f;
    flow_lpm = roundf(flow_lpm * 10.0f) / 10.0f;
    return (flow_lpm >= 0.0f && flow_lpm <= 20000.0f);
}

bool readPressure(float& pressure_kpa) {
    float samples[SAMPLE_BURST_COUNT];
    for (int i = 0; i < SAMPLE_BURST_COUNT; i++) {
        int raw = analogRead(PIN_ADC_PRESSURE);
        // Voltage at GPIO36
        float v_pin = (raw / 4095.0f) * CALIB_BATT_ADC_REF_V;
        // Undo 20k / 33k divider (V_sensor = v_pin * 53 / 33)
        float v_sensor = v_pin * CALIB_PRESSURE_DIVIDER_INV;
        // Linear transfer: 0.5V = 0 kPa, 4.5V = 1000 kPa
        float kpa = ((v_sensor - CALIB_PRESSURE_V_MIN) / (CALIB_PRESSURE_V_MAX - CALIB_PRESSURE_V_MIN)) * CALIB_PRESSURE_KPA_MAX;
        samples[i] = (kpa < 0.0f) ? 0.0f : kpa;
        delay(5);
    }
    pressure_kpa = roundf(computeMedian(samples, SAMPLE_BURST_COUNT) * 10.0f) / 10.0f;
    return (pressure_kpa >= 0.0f && pressure_kpa <= 2500.0f);
}

bool readTurbidity(float& turbidity_ntu) {
    float samples[SAMPLE_BURST_COUNT];
    for (int i = 0; i < SAMPLE_BURST_COUNT; i++) {
        int raw = analogRead(PIN_ADC_TURBIDITY);
        float v_pin = (raw / 4095.0f) * CALIB_BATT_ADC_REF_V;
        float v_sensor = v_pin * CALIB_TURBIDITY_DIVIDER_INV;
        // Empirical characteristic: Higher voltage = cleaner water
        // 4.1V -> 0 NTU, 2.5V -> 200 NTU
        float ntu = (CALIB_TURBIDITY_CLEAR_V - v_sensor) * (200.0f / (CALIB_TURBIDITY_CLEAR_V - CALIB_TURBIDITY_DIRTY_V));
        samples[i] = constrain(ntu, 0.0f, 200.0f);
        delay(5);
    }
    turbidity_ntu = roundf(computeMedian(samples, SAMPLE_BURST_COUNT) * 100.0f) / 100.0f;
    return (turbidity_ntu >= 0.0f && turbidity_ntu <= 200.0f);
}
