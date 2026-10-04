#ifndef JALSETU_CONFIG_H
#define JALSETU_CONFIG_H

#include <Arduino.h>

// =============================================================================
// JalSetu Shared Contract v1.0 Standards & Constants
// =============================================================================
#define JALSETU_SCHEMA_VERSION      "1.0"
#define JALSETU_FIRMWARE_VERSION    "1.0.0"

#ifndef LGD_GP_CODE_DEFAULT
#define LGD_GP_CODE_DEFAULT         "245123"
#endif

#ifndef SCHEME_ID_DEFAULT
#define SCHEME_ID_DEFAULT           "SCH-UP-245123"
#endif

#ifndef NODE_ID_DEFAULT
#define NODE_ID_DEFAULT             "JS-UP-245123-N001"
#endif

// =============================================================================
// Timing and Sampling Parameters
// =============================================================================
#define TELEMETRY_INTERVAL_SEC      900     // Standard periodic cycle: 15 minutes (900s)
#define HEARTBEAT_INTERVAL_SEC      3600    // Heartbeat status report: 1 hour
#define SAMPLE_BURST_COUNT          7       // Number of raw readings for median filter
#define WATCHDOG_TIMEOUT_SEC        30      // Task Watchdog Timer timeout: 30s
#define SENSOR_WARMUP_MS            250     // Stabilization delay after powering sensors

// =============================================================================
// Hardware Pin Mapping (Aligned 1:1 with pin_mapping.md)
// =============================================================================
// Power Control Pins
#define PIN_PWR_SENS_EN             25      // High-side P-MOSFET gate (Low = Power ON)
#define PIN_PWR_MODEM_EN            26      // GSM Buck converter EN (High = Buck ON)
#define PIN_MODEM_PWRKEY            4       // Cellular modem PWRKEY pulse

// Cellular UART (UART2)
#define PIN_GSM_TX                  17      // ESP32 TX -> Modem RX
#define PIN_GSM_RX                  16      // ESP32 RX -> Modem TX

// LoRa SPI Bus (VSPI)
#define PIN_LORA_SCK                18
#define PIN_LORA_MISO               19
#define PIN_LORA_MOSI               23
#define PIN_LORA_CS                 5
#define PIN_LORA_RST                14
#define PIN_LORA_DIO0               32

// Metering & Sensor Serial (UART1)
#define PIN_UART1_RX                13      // PZEM-004T TX / A02YYUW TX
#define PIN_UART1_TX                15      // PZEM-004T RX / A02YYUW Trigger

// Analog ADC1 Inputs (Avoids ADC2 RF conflict)
#define PIN_ADC_PRESSURE            36      // GPIO36 / SENSOR_VP (ADC1_CH0)
#define PIN_ADC_TURBIDITY           36      // GPIO36 / SENSOR_VP (ADC1_CH0)
#define PIN_ADC_BATTERY             39      // GPIO39 / SENSOR_VN (ADC1_CH3)
#define PIN_ADC_SOLAR               34      // GPIO34 (ADC1_CH6)

// Digital & Interrupt Inputs
#define PIN_FLOW_PULSE              35      // GPIO35 (Rising edge pulse counter)
#define PIN_BTN_WAKE                27      // GPIO27 (RTC Wakeup button)
#define PIN_LED_STATUS              2       // GPIO2 (Status indication LED)

// =============================================================================
// Sensor Calibration Constants & Physics Formulations
// =============================================================================
// Battery Voltage Divider: 100k / 100k (Ratio = 2.0), ADC 11dB attenuation (3.1V max)
#define CALIB_BATT_DIVIDER_RATIO    2.000f
#define CALIB_BATT_ADC_REF_V        3.300f

// Solar Voltage Divider: 100k / 20k (Ratio = 6.0)
#define CALIB_SOLAR_DIVIDER_RATIO   6.000f

// N3 Pressure Transducer: 0-10 bar (1000 kPa), 0.5V - 4.5V output
// Scaled via 20k / 33k divider: V_adc = V_sensor * (33 / 53) = 0.62264 * V_sensor
// At 0 kPa: V_adc = 0.5 * 0.62264 = 0.3113V
// At 1000 kPa: V_adc = 4.5 * 0.62264 = 2.8019V
// Slope: 1000 kPa / (2.8019 - 0.3113) = 401.51 kPa / Volt
#define CALIB_PRESSURE_DIVIDER_INV  1.60606f   // 53.0 / 33.0
#define CALIB_PRESSURE_V_MIN        0.500f     // Transducer output at 0 kPa
#define CALIB_PRESSURE_V_MAX        4.500f     // Transducer output at 1000 kPa
#define CALIB_PRESSURE_KPA_MAX      1000.0f    // 10 bar = 1000 kPa

// N2 Flow Sensor: YF-DN15 standard pulse factor
#define CALIB_FLOW_PULSES_PER_LITER 450.0f     // 7.5 Hz = 1 L/min -> 450 pulses/L

// N4 Turbidity Sensor (TSW-20M): Optical Nephelometric Characteristic
// Scaled via 10k / 20k divider: V_adc = V_sensor * (20 / 30) = 0.6667 * V_sensor
#define CALIB_TURBIDITY_DIVIDER_INV 1.500f     // 30.0 / 20.0
#define CALIB_TURBIDITY_CLEAR_V     4.100f     // Voltage at 0 NTU
#define CALIB_TURBIDITY_DIRTY_V     2.500f     // Voltage at 200 NTU

// LoRa Frequency & Radio Settings
#define LORA_FREQUENCY_MHZ          865.0625f  // IN865 standard uplink channel 0
#define LORA_BANDWIDTH_KHZ          125.0f
#define LORA_SPREADING_FACTOR       7
#define LORA_CODING_RATE            5
#define LORA_SYNC_WORD              0x12       // Private network sync word (or 0x34 LoRaWAN)
#define LORA_TX_POWER_DBM           14

// Maximum JSON Buffer Size (Budget: < 512 bytes target, 1024 bytes max)
#define MAX_PAYLOAD_SIZE            512

#endif // JALSETU_CONFIG_H
