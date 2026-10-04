/*
 * NeerSync Node N3: Tail-End Water Pressure Monitoring Wokwi Virtual Test
 * Simulates 0.5-4.5V pressure transducer scaled to ADC1_CH0 (GPIO36).
 */

#define PIN_PRESS_ADC 36
#define PIN_LED 2

static uint32_t seq = 1;

void setup() {
  Serial.begin(115200);
  pinMode(PIN_LED, OUTPUT);
  analogReadResolution(12);
  Serial.println(F("--- NeerSync Node N3 (Tail-End Pressure) Wokwi Simulation Started ---"));
}

void loop() {
  digitalWrite(PIN_LED, HIGH);

  // Read simulated pressure ADC (0 - 4095)
  int raw = analogRead(PIN_PRESS_ADC);
  // Map ADC count to kPa: raw=0 -> 0 kPa, raw=4095 -> 1000 kPa
  float pressure_kpa = (raw / 4095.0f) * 1000.0f;
  pressure_kpa = roundf(pressure_kpa * 10.0f) / 10.0f;
  float battery_v = 3.85f;
  int rssi = -81;

  Serial.print(F("{\"schema_version\":\"1.0\",\"node_id\":\"NS-UP-245123-N003\",\"lgd_gp_code\":\"245123\",\"scheme_id\":\"SCH-UP-245123\",\"ts\":\"2026-10-04T12:00:00Z\",\"seq\":"));
  Serial.print(seq++);
  Serial.print(F(",\"type\":\"pressure\",\"values\":{\"pressure_kpa\":"));
  Serial.print(pressure_kpa, 1);
  Serial.print(F("},\"battery_v\":"));
  Serial.print(battery_v, 2);
  Serial.print(F(",\"rssi_dbm\":"));
  Serial.print(rssi);
  Serial.println(F(",\"fw\":\"1.0.0\"}"));

  digitalWrite(PIN_LED, LOW);
  delay(5000);
}
