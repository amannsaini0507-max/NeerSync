#ifndef NEERSYNC_SENSORS_H
#define NEERSYNC_SENSORS_H

#include <Arduino.h>
#include "config.h"

// Initialize GPIOs, ADCs, and interrupts
void initSensors();

// Control sensor power rail via SI2301 P-MOSFET (Low = ON, High = OFF)
void powerSensors(bool enable);

// System supply voltage telemetry
float readBatteryVoltage();
float readSolarVoltage();

// Median filter algorithm for outlier elimination
float computeMedian(float* buffer, int size);

// Node N1: Pump AC Current (A) and Voltage (V) via PZEM-004T or analog CT
bool readPumpMetrics(float& current_a, float& voltage_v);

// Node N2: Overhead Reservoir Level (cm) via A02YYUW ultrasonic
bool readEsrLevel(float& level_cm);

// Node N2 / N3: Instantaneous Flow Rate (L/min) via pulse count
bool readFlowRate(float& flow_lpm);

// Node N3: Tail-End Water Pressure (kPa) via 0.5-4.5V transducer
bool readPressure(float& pressure_kpa);

// Node N4: Water Turbidity (NTU) via optical probe
bool readTurbidity(float& turbidity_ntu);

#endif // NEERSYNC_SENSORS_H
