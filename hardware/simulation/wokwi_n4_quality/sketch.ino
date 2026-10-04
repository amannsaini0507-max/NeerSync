/*
 * NeerSync Node N4: Water Turbidity Monitoring Wokwi Virtual Test
 * Simulates nephelometric optical sensor with FTK app chlorine baseline.
 */

#define PIN_TURB_ADC 36
#define PIN_LED 2

static uint32_t seq = 1;

void setup() {
  Serial.begin(115200);
  pinMode(PIN_LED, OUTPUT);
  analogReadResolution(12);
  Serial.println(F("--- NeerSync Node N4 (Turbidity Quality) Wokwi Simulation Started ---"));
}

void loop() {
  digitalWrite(PIN_LED, HIGH);

  int raw = analogRead(PIN_TURB_ADC);
  // Scale 0 - 200 NTU
  float turbidity_ntu = (raw / 4095.0f) * 20.0f; // Scale 0-20 NTU in simulation
  turbidity_ntu = roundf(turbidity_ntu * 100.0f) / 100.0f;
  float chlorine_mgl = 0.45f; // Standard JJM baseline from FTK kit
  float battery_v = 4.05f;
  int rssi = -74;

  Serial.print(F("{\"schema_version\":\"1.0\",\"node_id\":\"NS-UP-245123-N004\",\"lgd_gp_code\":\"245123\",\"scheme_id\":\"SCH-UP-245123\",\"ts\":\"2026-10-04T12:00:00Z\",\"seq\":"));
  Serial.print(seq++);
  Serial.print(F(",\"type\":\"quality\",\"values\":{\"turbidity_ntu\":"));
  Serial.print(turbidity_ntu, 2);
  Serial.print(F(",\"chlorine_mgl\":"));
  Serial.print(chlorine_mgl, 2);
  Serial.print(F("},\"battery_v\":"));
  Serial.print(battery_v, 2);
  Serial.print(F(",\"rssi_dbm\":"));
  Serial.print(rssi);
  Serial.println(F(",\"fw\":\"1.0.0\"}"));

  digitalWrite(PIN_LED, LOW);
  delay(5000);
}
