/*
 * JalSetu Node N2: Elevated Storage Reservoir (ESR) Level & Flow Wokwi Virtual Test
 * Simulates ultrasonic echo distance and Hall pulse flow interrupts.
 */

#define PIN_TRIG 15
#define PIN_ECHO 13
#define PIN_FLOW 35
#define PIN_LED  2

static volatile unsigned long pulse_count = 0;
static uint32_t seq = 1;

void IRAM_ATTR onFlowPulse() {
  pulse_count++;
}

void setup() {
  Serial.begin(115200);
  pinMode(PIN_TRIG, OUTPUT);
  pinMode(PIN_ECHO, INPUT);
  pinMode(PIN_FLOW, INPUT_PULLDOWN);
  pinMode(PIN_LED, OUTPUT);
  attachInterrupt(digitalPinToInterrupt(PIN_FLOW), onFlowPulse, RISING);
  Serial.println(F("--- JalSetu Node N2 (ESR Level & Flow) Wokwi Simulation Started ---"));
}

void loop() {
  digitalWrite(PIN_LED, HIGH);

  // Trigger ultrasonic measurement
  digitalWrite(PIN_TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(PIN_TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(PIN_TRIG, LOW);
  long duration = pulseIn(PIN_ECHO, HIGH, 30000);
  float level_cm = (duration > 0) ? (duration * 0.0343f / 2.0f) : 285.0f;
  level_cm = constrain(roundf(level_cm * 10.0f) / 10.0f, 0.0f, 3000.0f);

  // Flow rate calculation
  unsigned long count = pulse_count;
  pulse_count = 0;
  float flow_lpm = (count > 0) ? (count * 2.5f) : 24.5f;

  // 1. Emit esr_level telemetry
  Serial.print(F("{\"schema_version\":\"1.0\",\"node_id\":\"JS-UP-245123-N002\",\"lgd_gp_code\":\"245123\",\"scheme_id\":\"SCH-UP-245123\",\"ts\":\"2026-10-04T12:00:00Z\",\"seq\":"));
  Serial.print(seq++);
  Serial.print(F(",\"type\":\"esr_level\",\"values\":{\"level_cm\":"));
  Serial.print(level_cm, 1);
  Serial.println(F("},\"battery_v\":3.98,\"rssi_dbm\":-72,\"fw\":\"1.0.0\"}"));

  // 2. Emit flow telemetry
  Serial.print(F("{\"schema_version\":\"1.0\",\"node_id\":\"JS-UP-245123-N002\",\"lgd_gp_code\":\"245123\",\"scheme_id\":\"SCH-UP-245123\",\"ts\":\"2026-10-04T12:00:00Z\",\"seq\":"));
  Serial.print(seq++);
  Serial.print(F(",\"type\":\"flow\",\"values\":{\"flow_lpm\":"));
  Serial.print(flow_lpm, 1);
  Serial.println(F("},\"battery_v\":3.98,\"rssi_dbm\":-72,\"fw\":\"1.0.0\"}"));

  digitalWrite(PIN_LED, LOW);
  delay(5000);
}
