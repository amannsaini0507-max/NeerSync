/*
 * JalSetu Node N1: Tube-well / Pump Monitoring Wokwi Virtual Test Sketch
 * Simulates CT current clamp sampling and emits contract-compliant JSON.
 * Note: High-voltage AC mains is NOT simulated physically in browser (UNVERIFIED).
 */

#define PIN_LED 2
#define PIN_CT_ADC 36

static uint32_t seq = 1;

void setup() {
  Serial.begin(115200);
  pinMode(PIN_LED, OUTPUT);
  analogReadResolution(12);
  Serial.println(F("--- JalSetu Node N1 (Pump) Wokwi Simulation Started ---"));
}

void loop() {
  digitalWrite(PIN_LED, HIGH);
  
  // Read simulated CT potentiometer
  int raw = analogRead(PIN_CT_ADC);
  float current_a = (raw / 4095.0f) * 50.0f; // Scale 0-50A
  current_a = roundf(current_a * 10.0f) / 10.0f;
  float voltage_v = (current_a > 1.0f) ? 231.2f : 0.0f; // 230V if running
  float battery_v = 4.10f;
  int rssi = -68;

  // Emit strictly valid contracts JSON
  Serial.print(F("{\"schema_version\":\"1.0\",\"node_id\":\"JS-UP-245123-N001\",\"lgd_gp_code\":\"245123\",\"scheme_id\":\"SCH-UP-245123\",\"ts\":\"2026-10-04T12:00:00Z\",\"seq\":"));
  Serial.print(seq++);
  Serial.print(F(",\"type\":\"pump\",\"values\":{\"current_a\":"));
  Serial.print(current_a, 1);
  Serial.print(F(",\"voltage_v\":"));
  Serial.print(voltage_v, 1);
  Serial.print(F("},\"battery_v\":"));
  Serial.print(battery_v, 2);
  Serial.print(F(",\"rssi_dbm\":"));
  Serial.print(rssi);
  Serial.println(F(",\"fw\":\"1.0.0\"}"));

  digitalWrite(PIN_LED, LOW);
  delay(5000); // 5-second simulation step
}
