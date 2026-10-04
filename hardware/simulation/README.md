# NeerSync Virtual Testing Guide (Wokwi Projects)

This directory contains standalone virtual simulation projects for all four NeerSync IoT edge node types. These allow testing firmware logic, sensor timing, and contract JSON serialization directly in the browser using the [Wokwi ESP32 Simulator](https://wokwi.com).

---

## 📁 Wokwi Projects Summary

| Project Folder | Node Target | Simulated Peripherals | Telemetry Emitted |
|---|---|---|---|
| [`wokwi_n1_pump/`](./wokwi_n1_pump/) | **N1 Tube-well / Pump** | Potentiometer (CT current clamp), Status LED | `type: "pump"` (`current_a`, `voltage_v`) |
| [`wokwi_n2_esr/`](./wokwi_n2_esr/) | **N2 ESR Level & Flow** | Ultrasonic HC-SR04/A02YYUW, Pushbutton (Flow pulse IRQ) | `type: "esr_level"` & `type: "flow"` |
| [`wokwi_n3_pressure/`](./wokwi_n3_pressure/) | **N3 Tail-End Pressure**| Potentiometer (0.5-4.5V Transducer on ADC1_CH0) | `type: "pressure"` (`pressure_kpa`) |
| [`wokwi_n4_quality/`](./wokwi_n4_quality/) | **N4 Water Turbidity** | Potentiometer (Turbidity Nephelometric Analog) | `type: "quality"` (`turbidity_ntu`, `chlorine_mgl`) |

---

## ⚡ How to Run a Project in Wokwi

1. Open [https://wokwi.com/projects/new/esp32](https://wokwi.com/projects/new/esp32).
2. Copy and paste the contents of `sketch.ino` into the code editor.
3. Switch to the `diagram.json` tab in Wokwi and paste the contents of `diagram.json`.
4. Click the green **Play (Start Simulation)** button.
5. Watch the Serial Monitor: The node outputs valid NeerSync contract JSON payloads every 5 seconds.

---

## ⚠️ Simulation Fidelity & UNVERIFIED Notice

> [!WARNING]
> ### Simulation Limitations (Marked UNVERIFIED)
> While Wokwi accurately simulates the ESP32 CPU, GPIO interrupts, ADCs, and UART, several physical hardware layers cannot be simulated in a browser environment and are marked **UNVERIFIED**:
> 1. **Cellular 4G LTE Cat-1 Modem (SIMCom A7672S)**: AT command engine, RF burst power draw, and cellular tower network registration cannot be physically simulated in Wokwi. Marked **UNVERIFIED**.
> 2. **Semtech SX1276 LoRa RF Waveform**: 865 MHz ISM band RF propagation, antenna VSWR, and LoRaWAN gateway packet acknowledgment cannot be simulated. Marked **UNVERIFIED**.
> 3. **415V/230V AC Mains & Optocoupler Dielectric Breakdown**: High-voltage electrical phenomena are mocked using safe low-voltage DC signals. Marked **UNVERIFIED**.
> 4. **Solar MPPT Dynamic Sun Tracking**: Battery charging dynamics and diurnal solar irradiance curves are modeled in `hardware/schematics/power_budget.md` but are not simulated in real-time in Wokwi. Marked **UNVERIFIED**.
