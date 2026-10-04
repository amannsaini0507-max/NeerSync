"""
JalSetu Hardware - SVG Schematic Diagram Generator
Generates clean, color-coded, professional vector SVG schematics for N1, N2, N3, N4 and Power subsystem.
"""

from pathlib import Path

DIAGRAMS_DIR = Path(__file__).resolve().parent
DIAGRAMS_DIR.mkdir(parents=True, exist_ok=True)

def generate_svg_header(title, width=1200, height=800):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="100%" height="100%">
  <defs>
    <style>
      .title {{ font-family: 'Segoe UI', Arial, sans-serif; font-size: 20px; font-weight: bold; fill: #0f172a; }}
      .subtitle {{ font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; fill: #475569; }}
      .box {{ fill: #ffffff; stroke: #1e293b; stroke-width: 2; rx: 6; }}
      .box-mcu {{ fill: #eff6ff; stroke: #2563eb; stroke-width: 2.5; rx: 8; }}
      .box-iso {{ fill: #fef2f2; stroke: #dc2626; stroke-width: 2; stroke-dasharray: 6,4; rx: 6; }}
      .box-power {{ fill: #f0fdf4; stroke: #16a34a; stroke-width: 2; rx: 6; }}
      .box-sensor {{ fill: #fefce8; stroke: #ca8a04; stroke-width: 2; rx: 6; }}
      .box-comm {{ fill: #faf5ff; stroke: #9333ea; stroke-width: 2; rx: 6; }}
      .wire-pwr {{ stroke: #dc2626; stroke-width: 2.5; fill: none; }}
      .wire-gnd {{ stroke: #1e293b; stroke-width: 2.5; fill: none; }}
      .wire-sig {{ stroke: #2563eb; stroke-width: 1.8; fill: none; }}
      .wire-analog {{ stroke: #d97706; stroke-width: 1.8; fill: none; }}
      .wire-spi {{ stroke: #7c3aed; stroke-width: 1.8; fill: none; }}
      .label {{ font-family: 'Consolas', 'Courier New', monospace; font-size: 11px; fill: #1e293b; }}
      .label-pin {{ font-family: 'Consolas', 'Courier New', monospace; font-size: 10px; font-weight: bold; fill: #0284c7; }}
      .label-title {{ font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; font-weight: bold; fill: #0f172a; }}
      .warning-text {{ font-family: 'Segoe UI', Arial, sans-serif; font-size: 11px; font-weight: bold; fill: #dc2626; }}
      .border-grid {{ fill: none; stroke: #e2e8f0; stroke-width: 1; }}
    </style>
  </defs>
  <!-- Background -->
  <rect width="{width}" height="{height}" fill="#f8fafc" />
  <rect x="15" y="15" width="{width-30}" height="{height-30}" fill="none" stroke="#cbd5e1" stroke-width="1.5" />
  <text x="35" y="45" class="title">{title}</text>
'''

def generate_svg_footer(rev="1.0", author="JalSetu Hardware Team", date="2026-10-04"):
    return f'''
  <!-- Title Block Footer -->
  <rect x="850" y="730" width="335" height="55" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" />
  <text x="860" y="748" font-family="Segoe UI, sans-serif" font-size="11px" font-weight="bold" fill="#0f172a">JalSetu JJM FHTC Monitoring IoT Node</text>
  <text x="860" y="764" font-family="Segoe UI, sans-serif" font-size="10px" fill="#475569">Rev: {rev} | Date: {date} | Status: ERC UNVERIFIED</text>
  <text x="860" y="778" font-family="Segoe UI, sans-serif" font-size="10px" fill="#64748b">Branch: feature/hardware | Single Source of Truth</text>
</svg>
'''

def create_n1_svg():
    svg = generate_svg_header("JalSetu Node N1 — Tube-well / Pump Monitoring Node (Schematic)")
    svg += '''
  <text x="35" y="65" class="subtitle">Contract: type="pump" | Metrics: current_a, voltage_v | 415V/230V Optoisolated AC Measurement</text>
  
  <!-- High Voltage Safety Isolation Barrier -->
  <rect x="35" y="90" width="320" height="340" class="box-iso" />
  <rect x="45" y="100" width="300" height="25" fill="#fee2e2" rx="4" />
  <text x="55" y="117" class="warning-text">⚡ DANGER: HIGH VOLTAGE 230V/415V MAINS</text>
  
  <!-- PZEM-004T Block -->
  <rect x="55" y="140" width="280" height="150" class="box" />
  <text x="110" y="165" class="label-title">PZEM-004T v3.0 ASIC</text>
  <text x="70" y="190" class="label">Pin 5 (AC-L) &amp; Pin 6 (AC-N) -> 230V AC</text>
  <text x="70" y="210" class="label">Pin 7 &amp; 8 -> SCT-013 CT Clamp (100A:50mA)</text>
  <line x1="55" y1="230" x2="335" y2="230" stroke="#dc2626" stroke-dasharray="4,3" />
  <text x="95" y="248" font-size="10px" fill="#b91c1c" font-weight="bold">Optical Isolation Barrier (>1.5kV AC)</text>
  <text x="70" y="270" class="label">Pin 1: 5V_ISO | Pin 4: GND_ISO</text>
  <text x="70" y="285" class="label">Pin 2: TXD (Opto) | Pin 3: RXD (Opto)</text>
  
  <!-- Secondary SCT-013 & ZMPT101B fallback -->
  <rect x="55" y="310" width="280" height="105" class="box" />
  <text x="80" y="330" class="label-title">ZMPT101B &amp; SCT-013 Direct Analog</text>
  <text x="70" y="350" class="label">ZMPT101B: 4000V Galvanic Isolation PT</text>
  <text x="70" y="370" class="label">SCT-013: Split-Core CT (3500V Dielectric)</text>
  <text x="70" y="390" class="label">Outputs to GPIO35 (VT) &amp; GPIO36 (CT)</text>
  
  <!-- ESP32 Center Block -->
  <rect x="420" y="90" width="360" height="570" class="box-mcu" />
  <text x="510" y="125" font-family="Segoe UI, sans-serif" font-size="16px" font-weight="bold" fill="#1e3a8a">ESP32-WROOM-32D (38-Pin)</text>
  <text x="525" y="145" class="subtitle">240MHz Dual-Core / 4MB Flash / Deep Sleep</text>
  
  <!-- ESP32 Pin Labels Left -->
  <text x="430" y="180" class="label-pin">GPIO13 (UART1 RX)</text><text x="570" y="180" class="label">&lt;-- PZEM_TXD</text>
  <text x="430" y="210" class="label-pin">GPIO15 (UART1 TX)</text><text x="570" y="210" class="label">--&gt; PZEM_RXD</text>
  <text x="430" y="240" class="label-pin">GPIO36 (ADC1_CH0)</text><text x="570" y="240" class="label">&lt;-- CT_ANALOG_IN (1.65V ref)</text>
  <text x="430" y="270" class="label-pin">GPIO35 (ADC1_CH7)</text><text x="570" y="270" class="label">&lt;-- VT_ANALOG_IN (ZMPT)</text>
  <text x="430" y="300" class="label-pin">GPIO25 (Digital)</text><text x="570" y="300" class="label">--&gt; PWR_SENS_EN (P-MOSFET)</text>
  <text x="430" y="330" class="label-pin">GPIO26 (Digital)</text><text x="570" y="330" class="label">--&gt; PWR_MODEM_EN (Buck EN)</text>
  <text x="430" y="360" class="label-pin">GPIO4  (Digital)</text><text x="570" y="360" class="label">--&gt; MODEM_PWRKEY</text>
  <text x="430" y="390" class="label-pin">GPIO17 (UART2 TX)</text><text x="570" y="390" class="label">--&gt; GSM_RXD (A7672S)</text>
  <text x="430" y="420" class="label-pin">GPIO16 (UART2 RX)</text><text x="570" y="420" class="label">&lt;-- GSM_TXD (A7672S)</text>
  <text x="430" y="450" class="label-pin">GPIO18 (VSPI SCK)</text><text x="570" y="450" class="label">--&gt; SX1276 SCK</text>
  <text x="430" y="480" class="label-pin">GPIO19 (VSPI MISO)</text><text x="570" y="480" class="label">&lt;-- SX1276 MISO</text>
  <text x="430" y="510" class="label-pin">GPIO23 (VSPI MOSI)</text><text x="570" y="510" class="label">--&gt; SX1276 MOSI</text>
  <text x="430" y="540" class="label-pin">GPIO5  (Digital Out)</text><text x="570" y="540" class="label">--&gt; SX1276 CS (NSS)</text>
  <text x="430" y="570" class="label-pin">GPIO14 (Digital Out)</text><text x="570" y="570" class="label">--&gt; SX1276 RST</text>
  <text x="430" y="600" class="label-pin">GPIO32 (ADC1_CH4/IRQ)</text><text x="570" y="600" class="label">&lt;-- SX1276 DIO0 (IRQ)</text>
  <text x="430" y="630" class="label-pin">GPIO39 (ADC1_CH3)</text><text x="570" y="630" class="label">&lt;-- BATT_SENSE (1:2 divider)</text>
  <text x="430" y="650" class="label-pin">GPIO2  (Strapping)</text><text x="570" y="650" class="label">--&gt; STATUS_LED (Blue, 1k)</text>

  <!-- Cellular Modem Block Right -->
  <rect x="850" y="90" width="310" height="230" class="box-comm" />
  <text x="910" y="115" class="label-title">SIMCom A7672S 4G LTE Cat-1</text>
  <text x="865" y="140" class="label">VBAT: 3.8V Dedicated Rail (MP2307 Buck)</text>
  <text x="865" y="160" class="label">Reservoir: 1000uF Low-ESR + 100uF Tantalum</text>
  <text x="865" y="180" class="label">Peak Current: 2.0A RF burst absorbing</text>
  <text x="865" y="200" class="label">Bands: B1/B3/B5/B8/B40/B41 (India All-Telco)</text>
  <text x="865" y="220" class="label">SIM: Micro-SIM socket + ESD TVS (USBLC6-2)</text>
  <text x="865" y="240" class="label">Antenna: External 3dBi Omni SMA Bulkhead</text>

  <!-- LoRa SX1276 Block Right -->
  <rect x="850" y="350" width="310" height="190" class="box-comm" />
  <text x="915" y="375" class="label-title">Semtech SX1276 (RFM95W)</text>
  <text x="865" y="400" class="label">Band: IN865 (865-867 MHz WPC License-Free)</text>
  <text x="865" y="420" class="label">Tx Power: +14 dBm / +20 dBm (PA_BOOST)</text>
  <text x="865" y="440" class="label">Supply: 3.3V (28mA Rx, 120mA Tx)</text>
  <text x="865" y="460" class="label">Bus: Hardware SPI (SCK, MISO, MOSI, CS)</text>
  <text x="865" y="480" class="label">Antenna: 868MHz 1/4-Wave Spring / Fiberglass</text>

  <!-- Power Management Bottom -->
  <rect x="35" y="470" width="320" height="190" class="box-power" />
  <text x="105" y="495" class="label-title">Solar &amp; Battery Power Section</text>
  <text x="50" y="520" class="label">Solar Panel: 10W / 18V Monocrystalline</text>
  <text x="50" y="540" class="label">Charger: CN3791 MPPT / TP4056 with DW01A BMS</text>
  <text x="50" y="560" class="label">Battery: 3.7V 5200mAh (2P 18650) / 32650 LiFePO4</text>
  <text x="50" y="580" class="label">Regulators: 3.8V 3A Buck (GSM) + 3.3V 600mA LDO</text>
  <text x="50" y="600" class="label">Protection: 1.5A PTC + AO3401 P-MOS Reverse Protect</text>
  <text x="50" y="620" class="label">Autonomy: > 100 days zero-sun operation</text>
'''
    svg += generate_svg_footer()
    return svg

def create_n2_svg():
    svg = generate_svg_header("JalSetu Node N2 — Elevated Storage Reservoir (ESR) Node (Schematic)")
    svg += '''
  <text x="35" y="65" class="subtitle">Contract: type="esr_level" (level_cm) &amp; type="flow" (flow_lpm) | Ultrasonic + Hall Flow Meter</text>

  <!-- Sensor Block Left -->
  <rect x="35" y="90" width="340" height="340" class="box-sensor" />
  <text x="95" y="115" class="label-title">Waterproof Ultrasonic Level Sensor</text>
  <text x="50" y="140" class="label">Model: A02YYUW / JSN-SR04T v3.0 (IP67)</text>
  <text x="50" y="160" class="label">Range: 3 cm - 450 cm (Resolution: 1 mm)</text>
  <text x="50" y="180" class="label">Interface: UART (9600 baud, 3.3V/5V)</text>
  <text x="50" y="200" class="label">TXD -> ESP32 GPIO13 (RX) via 1k resistor</text>
  <text x="50" y="220" class="label">Power: 5V switched via SI2301 P-MOSFET</text>

  <line x1="35" y1="240" x2="375" y2="240" stroke="#ca8a04" stroke-dasharray="3,3" />
  <text x="90" y="265" class="label-title">YF-DN15 / YF-DN20 Hall Flow Sensor</text>
  <text x="50" y="290" class="label">Supply: 5V switched | Output: 5V Pulse Train</text>
  <text x="50" y="310" class="label">K-factor: 450 pulses/Litre (DN15 standard)</text>
  <text x="50" y="330" class="label">Level Shifter: 10k / 20k 1% Divider -> 3.33V</text>
  <text x="50" y="350" class="label">Clamp: BAT54S dual Schottky to 3.3V &amp; GND</text>
  <text x="50" y="370" class="label">Connects to: ESP32 GPIO35 (Rising Edge IRQ)</text>

  <!-- ESP32 Center Block -->
  <rect x="420" y="90" width="360" height="570" class="box-mcu" />
  <text x="510" y="125" font-family="Segoe UI, sans-serif" font-size="16px" font-weight="bold" fill="#1e3a8a">ESP32-WROOM-32D (38-Pin)</text>
  <text x="525" y="145" class="subtitle">ESR Level Median Filter + Flow Pulse Accumulator</text>

  <text x="430" y="180" class="label-pin">GPIO13 (UART1 RX)</text><text x="570" y="180" class="label">&lt;-- A02YYUW UART TX</text>
  <text x="430" y="210" class="label-pin">GPIO15 (UART1 TX)</text><text x="570" y="210" class="label">--&gt; A02YYUW Trigger/RX</text>
  <text x="430" y="240" class="label-pin">GPIO35 (Digital IRQ)</text><text x="570" y="240" class="label">&lt;-- Flow Pulse (3.33V clamped)</text>
  <text x="430" y="270" class="label-pin">GPIO25 (Digital Out)</text><text x="570" y="270" class="label">--&gt; PWR_SENS_EN (P-MOS Gate)</text>
  <text x="430" y="300" class="label-pin">GPIO26 (Digital Out)</text><text x="570" y="300" class="label">--&gt; PWR_MODEM_EN (Buck EN)</text>
  <text x="430" y="330" class="label-pin">GPIO4  (Digital Out)</text><text x="570" y="330" class="label">--&gt; MODEM_PWRKEY</text>
  <text x="430" y="360" class="label-pin">GPIO17 (UART2 TX)</text><text x="570" y="360" class="label">--&gt; GSM_RXD (A7672S)</text>
  <text x="430" y="390" class="label-pin">GPIO16 (UART2 RX)</text><text x="570" y="390" class="label">&lt;-- GSM_TXD (A7672S)</text>
  <text x="430" y="420" class="label-pin">GPIO18,19,23 (VSPI)</text><text x="570" y="420" class="label">&lt;-&gt; SX1276 SPI Bus</text>
  <text x="430" y="450" class="label-pin">GPIO5,14,32 (Control)</text><text x="570" y="450" class="label">&lt;-&gt; SX1276 CS, RST, DIO0</text>
  <text x="430" y="480" class="label-pin">GPIO39 (ADC1_CH3)</text><text x="570" y="480" class="label">&lt;-- Battery Voltage Divider</text>
  <text x="430" y="510" class="label-pin">GPIO34 (ADC1_CH6)</text><text x="570" y="510" class="label">&lt;-- Solar Voltage Divider</text>
  <text x="430" y="540" class="label-pin">GPIO2  (Strapping)</text><text x="570" y="540" class="label">--&gt; Status LED (Green)</text>

  <!-- Right Comms & Power Blocks -->
  <rect x="850" y="90" width="310" height="230" class="box-comm" />
  <text x="910" y="115" class="label-title">A7672S 4G LTE Cat-1 Modem</text>
  <text x="865" y="140" class="label">Primary Backhaul when LoRa Gateway out of range</text>
  <text x="865" y="160" class="label">Publishes to jalsetu/v1/{gp}/{node}/telemetry</text>
  <text x="865" y="180" class="label">Retained LWT to .../status</text>
  <text x="865" y="200" class="label">QoS 1 with offline queue drain on connect</text>

  <rect x="850" y="350" width="310" height="190" class="box-comm" />
  <text x="925" y="375" class="label-title">SX1276 LoRaWAN (IN865)</text>
  <text x="865" y="400" class="label">Zero Recurring SIM Cost Local Mesh/Star</text>
  <text x="865" y="420" class="label">Direct transmission to GP Panchayat Bhawan Gateway</text>
  <text x="865" y="440" class="label">Payload formatted < 512 bytes</text>

  <rect x="35" y="470" width="340" height="190" class="box-power" />
  <text x="110" y="495" class="label-title">Solar &amp; Battery Power Supply</text>
  <text x="50" y="520" class="label">Solar Panel: 10W Monocrystalline</text>
  <text x="50" y="540" class="label">Battery: 5200mAh 3.7V (2x 18650 parallel)</text>
  <text x="50" y="560" class="label">Buck Converter: 3.8V 3A (GSM) + 3.3V LDO</text>
  <text x="50" y="580" class="label">Zero-Sun Autonomy: > 109 Days</text>
'''
    svg += generate_svg_footer()
    return svg

def create_n3_svg():
    svg = generate_svg_header("JalSetu Node N3 — Tail-End Pressure Monitoring Node (Schematic)")
    svg += '''
  <text x="35" y="65" class="subtitle">Contract: type="pressure" (pressure_kpa) | 0.5-4.5V Transducer + Precision Divider</text>

  <!-- Transducer Block Left -->
  <rect x="35" y="90" width="340" height="340" class="box-sensor" />
  <text x="65" y="115" class="label-title">0-10 Bar (1000 kPa) Pressure Transducer</text>
  <text x="50" y="140" class="label">Excitation: 5V DC (Switched via SI2301 MOSFET)</text>
  <text x="50" y="160" class="label">Signal Output: 0.5V (0 kPa) to 4.5V (1000 kPa)</text>
  <text x="50" y="180" class="label">Thread: 1/4" NPT / G1/4 Stainless Steel Body</text>
  <line x1="35" y1="200" x2="375" y2="200" stroke="#ca8a04" stroke-dasharray="3,3" />
  <text x="75" y="225" class="label-title">Precision 20k / 33k 0.1% Voltage Divider</text>
  <text x="50" y="250" class="label">Formula: V_out = V_in * 33 / (20 + 33) = 0.6226 * V_in</text>
  <text x="50" y="270" class="label">At 0 kPa: 0.5V -> 0.311V (ADC1 linear window)</text>
  <text x="50" y="290" class="label">At 1000 kPa: 4.5V -> 2.802V (Max &lt; 3.1V ESP32 limit)</text>
  <text x="50" y="310" class="label">Filter: 100nF Ceramic Anti-Aliasing (fc = 128 Hz)</text>
  <text x="50" y="330" class="label">Surge: SMBJ6.0CA Bidirectional TVS Diode</text>
  <text x="50" y="350" class="label">Connects to: ESP32 GPIO36 (ADC1_CH0 / SENSOR_VP)</text>

  <!-- ESP32 Center Block -->
  <rect x="420" y="90" width="360" height="570" class="box-mcu" />
  <text x="510" y="125" font-family="Segoe UI, sans-serif" font-size="16px" font-weight="bold" fill="#1e3a8a">ESP32-WROOM-32D (38-Pin)</text>
  <text x="520" y="145" class="subtitle">ADC1 Multi-Sample Averaging + Calibration Curve</text>

  <text x="430" y="180" class="label-pin">GPIO36 (ADC1_CH0)</text><text x="570" y="180" class="label">&lt;-- PRESSURE_IN (0.31V - 2.80V)</text>
  <text x="430" y="210" class="label-pin">GPIO35 (Digital IRQ)</text><text x="570" y="210" class="label">&lt;-- Optional Tap Flow Pulse</text>
  <text x="430" y="240" class="label-pin">GPIO25 (Digital Out)</text><text x="570" y="240" class="label">--&gt; PWR_SENS_EN (P-MOS Gate)</text>
  <text x="430" y="270" class="label-pin">GPIO26 (Digital Out)</text><text x="570" y="270" class="label">--&gt; PWR_MODEM_EN (Buck EN)</text>
  <text x="430" y="300" class="label-pin">GPIO4  (Digital Out)</text><text x="570" y="300" class="label">--&gt; MODEM_PWRKEY</text>
  <text x="430" y="330" class="label-pin">GPIO17 (UART2 TX)</text><text x="570" y="330" class="label">--&gt; GSM_RXD (A7672S)</text>
  <text x="430" y="360" class="label-pin">GPIO16 (UART2 RX)</text><text x="570" y="360" class="label">&lt;-- GSM_TXD (A7672S)</text>
  <text x="430" y="390" class="label-pin">GPIO18,19,23 (VSPI)</text><text x="570" y="390" class="label">&lt;-&gt; SX1276 SPI Bus</text>
  <text x="430" y="420" class="label-pin">GPIO5,14,32 (Control)</text><text x="570" y="420" class="label">&lt;-&gt; SX1276 CS, RST, DIO0</text>
  <text x="430" y="450" class="label-pin">GPIO39 (ADC1_CH3)</text><text x="570" y="450" class="label">&lt;-- Battery Sense (100k/100k)</text>
  <text x="430" y="480" class="label-pin">GPIO34 (ADC1_CH6)</text><text x="570" y="480" class="label">&lt;-- Solar Sense (100k/20k)</text>
  <text x="430" y="510" class="label-pin">GPIO2  (Strapping)</text><text x="570" y="510" class="label">--&gt; Status LED (Yellow)</text>

  <!-- Right Comms & Power Blocks -->
  <rect x="850" y="90" width="310" height="230" class="box-comm" />
  <text x="910" y="115" class="label-title">A7672S 4G LTE Cat-1 Modem</text>
  <text x="865" y="140" class="label">Primary for standalone rural households</text>
  <text x="865" y="160" class="label">MQTT payload: values.pressure_kpa: 142.5</text>
  <text x="865" y="180" class="label">Low pressure alert threshold: &lt; 70.0 kPa</text>
  <text x="865" y="200" class="label">JJM Standard: 7m head pressure benchmark</text>

  <rect x="850" y="350" width="310" height="190" class="box-comm" />
  <text x="925" y="375" class="label-title">SX1276 LoRaWAN (IN865)</text>
  <text x="865" y="400" class="label">Transmits every 15 mins</text>
  <text x="865" y="420" class="label">Low power: 0.18 mAh per cycle</text>
  <text x="865" y="440" class="label">Autonomy: 240 Days without Sun</text>

  <rect x="35" y="470" width="340" height="190" class="box-power" />
  <text x="110" y="495" class="label-title">Solar &amp; Battery Power Supply</text>
  <text x="50" y="520" class="label">Solar: 10W Monocrystalline Panel</text>
  <text x="50" y="540" class="label">Battery: 5200mAh Li-ion / 6000mAh LiFePO4</text>
  <text x="50" y="560" class="label">5V Step-Up: MT3608 for pressure excitation</text>
  <text x="50" y="580" class="label">Average Current: 0.72 mA</text>
'''
    svg += generate_svg_footer()
    return svg

def create_n4_svg():
    svg = generate_svg_header("JalSetu Node N4 — Water Quality Monitoring Node (Schematic)")
    svg += '''
  <text x="35" y="65" class="subtitle">Contract: type="quality" (turbidity_ntu) | Optical Nephelometric Turbidity Sensor</text>

  <!-- Turbidity Block Left -->
  <rect x="35" y="90" width="340" height="340" class="box-sensor" />
  <text x="65" y="115" class="label-title">Optical Turbidity Probe (TSW-20M)</text>
  <text x="50" y="140" class="label">Principle: 90-degree scattered IR nephelometry</text>
  <text x="50" y="160" class="label">Range: 0 - 200 NTU (Drinking Water limit: &lt; 5 NTU)</text>
  <text x="50" y="180" class="label">Excitation: 5V (Switched via SI2301 MOSFET)</text>
  <line x1="35" y1="200" x2="375" y2="200" stroke="#ca8a04" stroke-dasharray="3,3" />
  <text x="90" y="225" class="label-title">10k / 20k Precision Divider</text>
  <text x="50" y="250" class="label">Sensor output: 0.0V to 4.5V DC</text>
  <text x="50" y="270" class="label">Divider: V_adc = V_sensor * 20 / 30 = 0.6667 * V_sensor</text>
  <text x="50" y="290" class="label">Max Voltage to ESP32: 4.5V * 0.6667 = 3.00V &lt; 3.3V</text>
  <text x="50" y="310" class="label">Filter: 100nF Ceramic Anti-Aliasing (fc = 160 Hz)</text>
  <text x="50" y="330" class="label">Connects to: ESP32 GPIO36 (ADC1_CH0)</text>
  <text x="50" y="360" class="label">Note: Chlorine handled via FTK app manual entry</text>

  <!-- ESP32 Center Block -->
  <rect x="420" y="90" width="360" height="570" class="box-mcu" />
  <text x="510" y="125" font-family="Segoe UI, sans-serif" font-size="16px" font-weight="bold" fill="#1e3a8a">ESP32-WROOM-32D (38-Pin)</text>
  <text x="530" y="145" class="subtitle">NTU Polynomial Calculation + Outlier Rejection</text>

  <text x="430" y="180" class="label-pin">GPIO36 (ADC1_CH0)</text><text x="570" y="180" class="label">&lt;-- TURBIDITY_IN (0 - 3.0V)</text>
  <text x="430" y="210" class="label-pin">GPIO25 (Digital Out)</text><text x="570" y="210" class="label">--&gt; PWR_SENS_EN (P-MOS Gate)</text>
  <text x="430" y="240" class="label-pin">GPIO26 (Digital Out)</text><text x="570" y="240" class="label">--&gt; PWR_MODEM_EN (Buck EN)</text>
  <text x="430" y="270" class="label-pin">GPIO4  (Digital Out)</text><text x="570" y="270" class="label">--&gt; MODEM_PWRKEY</text>
  <text x="430" y="300" class="label-pin">GPIO17 (UART2 TX)</text><text x="570" y="300" class="label">--&gt; GSM_RXD (A7672S)</text>
  <text x="430" y="330" class="label-pin">GPIO16 (UART2 RX)</text><text x="570" y="330" class="label">&lt;-- GSM_TXD (A7672S)</text>
  <text x="430" y="360" class="label-pin">GPIO18,19,23 (VSPI)</text><text x="570" y="360" class="label">&lt;-&gt; SX1276 SPI Bus</text>
  <text x="430" y="390" class="label-pin">GPIO5,14,32 (Control)</text><text x="570" y="390" class="label">&lt;-&gt; SX1276 CS, RST, DIO0</text>
  <text x="430" y="420" class="label-pin">GPIO39 (ADC1_CH3)</text><text x="570" y="420" class="label">&lt;-- Battery Voltage Divider</text>
  <text x="430" y="450" class="label-pin">GPIO2  (Strapping)</text><text x="570" y="450" class="label">--&gt; Status LED (Red/Green)</text>

  <!-- Right Comms & Power Blocks -->
  <rect x="850" y="90" width="310" height="230" class="box-comm" />
  <text x="910" y="115" class="label-title">A7672S 4G LTE Cat-1 Modem</text>
  <text x="865" y="140" class="label">Publishes to jalsetu/v1/{gp}/{node}/telemetry</text>
  <text x="865" y="160" class="label">Payload: values.turbidity_ntu: 1.25</text>
  <text x="865" y="180" class="label">Threshold Alarm: &gt; 5.0 NTU triggers alert</text>

  <rect x="850" y="350" width="310" height="190" class="box-comm" />
  <text x="925" y="375" class="label-title">SX1276 LoRaWAN (IN865)</text>
  <text x="865" y="400" class="label">Standard IN865 Uplink Channel</text>
  <text x="865" y="420" class="label">Confirmed packet transmission</text>

  <rect x="35" y="470" width="340" height="190" class="box-power" />
  <text x="110" y="495" class="label-title">Solar &amp; Battery Power Supply</text>
  <text x="50" y="520" class="label">Solar: 10W Monocrystalline</text>
  <text x="50" y="540" class="label">Battery: 5200mAh Li-ion</text>
  <text x="50" y="560" class="label">Autonomy: 143 Days without Sun</text>
'''
    svg += generate_svg_footer()
    return svg

def create_power_svg():
    svg = generate_svg_header("JalSetu Power Subsystem — Solar Harvesting & Battery Management (Schematic)")
    svg += '''
  <text x="35" y="65" class="subtitle">Solar MPPT Charging + Li-ion BMS + 3.8V 2A Burst Buck Regulator + 3.3V System LDO</text>

  <!-- Solar Input Block -->
  <rect x="35" y="90" width="230" height="250" class="box-power" />
  <text x="75" y="115" class="label-title">Solar Panel Input (10W)</text>
  <text x="45" y="140" class="label">Voc = 21.6V | Vmp = 18.0V</text>
  <text x="45" y="160" class="label">Imp = 0.56A (Monocrystalline)</text>
  <text x="45" y="185" class="label">Protection Stage:</text>
  <text x="45" y="205" class="label">- F1: 1.5A PTC Resettable Fuse</text>
  <text x="45" y="225" class="label">- D1: SS34 Schottky (Reverse Block)</text>
  <text x="45" y="245" class="label">- TVS1: SMAJ18A (Surge Protection)</text>
  <text x="45" y="270" class="label">To Solar Sense: 100k/20k Divider</text>

  <!-- CN3791 MPPT Charger -->
  <rect x="305" y="90" width="240" height="250" class="box" />
  <text x="345" y="115" class="label-title">CN3791 Solar MPPT Charger</text>
  <text x="315" y="140" class="label">Algorithm: Dynamic MPPT Tracking</text>
  <text x="315" y="160" class="label">Charge Current: 1.0A Constant Current</text>
  <text x="315" y="180" class="label">Float Voltage: 4.20V Constant Voltage</text>
  <text x="315" y="205" class="label">Pins:</text>
  <text x="315" y="225" class="label">- VIN &lt;-- Solar Post-Protection</text>
  <text x="315" y="245" class="label">- BAT --&gt; Battery Positive (VBAT)</text>
  <text x="315" y="265" class="label">- MPPT_SET: 18V Panel Resistor Ratio</text>

  <!-- Battery & BMS -->
  <rect x="585" y="90" width="240" height="250" class="box-power" />
  <text x="635" y="115" class="label-title">Li-ion / LiFePO4 Battery Pack</text>
  <text x="595" y="140" class="label">Config: 2P 18650 (5200mAh, 3.7V)</text>
  <text x="595" y="160" class="label">Alt: 1x 32650 LiFePO4 (6000mAh, 3.2V)</text>
  <text x="595" y="185" class="label">DW01A + FS8205A Dual-MOS BMS:</text>
  <text x="595" y="205" class="label">- Overcharge: 4.25V Cutoff</text>
  <text x="595" y="225" class="label">- Overdischarge: 2.50V Cutoff</text>
  <text x="595" y="245" class="label">- Overcurrent: 3.0A Short Cutoff</text>
  <text x="595" y="265" class="label">- Reverse Polarity: AO3401 P-MOS</text>

  <!-- Regulators Section Bottom -->
  <rect x="35" y="380" width="510" height="280" class="box" />
  <text x="140" y="405" class="label-title">Dedicated GSM Buck Converter (MP2307 / TPS5430)</text>
  <text x="50" y="435" class="label">Input: VBAT (3.2V - 4.2V) | Output: 3.80V DC (+/- 0.05V)</text>
  <text x="50" y="455" class="label">Continuous Rating: 3.0A | Peak Rating: 4.0A</text>
  <text x="50" y="475" class="label">Efficiency: 92% @ 1.5A load</text>
  <text x="50" y="505" class="label">Bulk Energy Reservoir (< 10mm from GSM module):</text>
  <text x="50" y="525" class="label">- 1x 1000uF / 10V Low-ESR Solid Electrolytic Capacitor (ESR &lt; 45 mOhm)</text>
  <text x="50" y="545" class="label">- 1x 100uF Tantalum Capacitor (high-frequency ripple suppressor)</text>
  <text x="50" y="565" class="label">- 2x 100nF X7R Ceramic Capacitors (RF decoupling at 850/1800 MHz)</text>
  <text x="50" y="595" class="label">Enable Control: Controlled by ESP32 GPIO26 via logic-level gate</text>

  <rect x="585" y="380" width="575" height="280" class="box" />
  <text x="740" y="405" class="label-title">System 3.3V LDO (AP2112K / ME6211)</text>
  <text x="605" y="435" class="label">Input: VBAT (3.2V - 4.2V) | Output: 3.30V Regulated Rail</text>
  <text x="605" y="455" class="label">Current Capability: 600 mA continuous</text>
  <text x="605" y="475" class="label">Ultra-Low Dropout: 250 mV @ 600mA</text>
  <text x="605" y="495" class="label">Ultra-Low Quiescent Current: 40 uA (essential for deep sleep efficiency)</text>
  <text x="605" y="525" class="label">Supplies:</text>
  <text x="605" y="545" class="label">- ESP32-WROOM-32D (15uA sleep, 150mA active RF peak)</text>
  <text x="605" y="565" class="label">- SX1276 LoRa SPI Transceiver (28mA Rx, 120mA Tx)</text>
  <text x="605" y="585" class="label">- Precision Analog Dividers &amp; Reference Rails</text>
  <text x="605" y="615" class="label">Output Decoupling: 1x 10uF Ceramic + 1x 100nF Ceramic</text>
'''
    svg += generate_svg_footer()
    return svg

def main():
    files = {
        'n1_pump_schematic.svg': create_n1_svg(),
        'n2_esr_schematic.svg': create_n2_svg(),
        'n3_pressure_schematic.svg': create_n3_svg(),
        'n4_quality_schematic.svg': create_n4_svg(),
        'power_harvesting_schematic.svg': create_power_svg()
    }
    for fname, content in files.items():
        out_path = DIAGRAMS_DIR / fname
        out_path.write_text(content, encoding='utf-8')
        print(f"Generated {out_path} ({len(content)} bytes)")

if __name__ == '__main__':
    main()
