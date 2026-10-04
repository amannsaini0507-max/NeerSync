"""
JalSetu Node N4: Water Quality Monitoring Node SKiDL Schematic Script
Emits type: "quality" (turbidity_ntu)
Features optical nephelometric turbidity sensor with 10k/20k voltage divider to GPIO36 (VP)
"""

import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))

import skidl
from skidl import Circuit, Net, Part, Pin
from common_parts import (
    create_esp32, create_sx1276, create_a7672s,
    create_resistor, create_capacitor, create_pmos, create_diode, create_tvs
)

def build_n4_circuit():
    circuit = Circuit()
    
    # Power Nets
    net_3v3 = Net('3V3', circuit=circuit)
    net_gnd = Net('GND', circuit=circuit)
    net_vbat = Net('VBAT', circuit=circuit)
    net_5v_sens = Net('5V_SENS', circuit=circuit)
    net_vbat_gsm = Net('VBAT_GSM', circuit=circuit)
    
    # Core Components
    esp32 = create_esp32(circuit)
    lora = create_sx1276(circuit)
    gsm = create_a7672s(circuit)
    
    # Power
    esp32['3V3'] += net_3v3; esp32['GND1'] += net_gnd; esp32['GND2'] += net_gnd; esp32['GND3'] += net_gnd
    lora['3V3'] += net_3v3; lora['GND'] += net_gnd
    gsm['VBAT'] += net_vbat_gsm; gsm['VBAT_SEC'] += net_vbat_gsm; gsm['GND1'] += net_gnd; gsm['GND2'] += net_gnd
    
    # LoRa & GSM
    net_lora_sck = Net('LORA_SCK', circuit=circuit); net_lora_miso = Net('LORA_MISO', circuit=circuit)
    net_lora_mosi = Net('LORA_MOSI', circuit=circuit); net_lora_cs = Net('LORA_CS', circuit=circuit)
    net_lora_rst = Net('LORA_RST', circuit=circuit); net_lora_dio0 = Net('LORA_DIO0', circuit=circuit)
    
    esp32['GPIO18'] += net_lora_sck; lora['SCK'] += net_lora_sck
    esp32['GPIO19'] += net_lora_miso; lora['MISO'] += net_lora_miso
    esp32['GPIO23'] += net_lora_mosi; lora['MOSI'] += net_lora_mosi
    esp32['GPIO5'] += net_lora_cs; lora['NSS_CS'] += net_lora_cs
    esp32['GPIO14'] += net_lora_rst; lora['RST'] += net_lora_rst
    esp32['GPIO32'] += net_lora_dio0; lora['DIO0'] += net_lora_dio0
    
    net_gsm_tx = Net('GSM_TXD', circuit=circuit); net_gsm_rx = Net('GSM_RXD', circuit=circuit); net_gsm_pwr = Net('MODEM_PWRKEY', circuit=circuit)
    esp32['GPIO17'] += net_gsm_tx; gsm['RXD'] += net_gsm_tx
    esp32['GPIO16'] += net_gsm_rx; gsm['TXD'] += net_gsm_rx
    esp32['GPIO4'] += net_gsm_pwr; gsm['PWRKEY'] += net_gsm_pwr
    
    # GSM Decoupling
    c_bulk1 = create_capacitor('C_BULK1', '1000uF/10V', circuit)
    c_bulk1['1'] += net_vbat_gsm; c_bulk1['2'] += net_gnd
    
    # Sensor Power Switch
    net_sens_en = Net('PWR_SENS_EN', circuit=circuit)
    esp32['GPIO25'] += net_sens_en
    pmos_sens = create_pmos('Q1', 'SI2301', circuit)
    pmos_sens['G'] += net_sens_en; pmos_sens['S'] += net_vbat; pmos_sens['D'] += net_5v_sens
    
    # Turbidity Optical Sensor (5V VCC, 0-4.5V output)
    tb_tmpl = Part(name='TURBIDITY_SENSOR', tool=skidl.SKIDL, dest=skidl.TEMPLATE)
    tb_tmpl.add_pins(Pin(num='1', name='VCC_5V'), Pin(num='2', name='GND'), Pin(num='3', name='ANALOG_OUT'))
    turbidity_sensor = tb_tmpl(circuit=circuit)
    turbidity_sensor.ref = 'TB1'
    turbidity_sensor.value = 'TSW20M_NEPHELOMETRIC'
    turbidity_sensor['VCC_5V'] += net_5v_sens
    turbidity_sensor['GND'] += net_gnd
    
    net_tb_raw = Net('TURBIDITY_RAW', circuit=circuit)
    net_tb_adc = Net('TURBIDITY_IN', circuit=circuit)
    turbidity_sensor['ANALOG_OUT'] += net_tb_raw
    
    r_tb1 = create_resistor('R_TB1', '10k_0.1%', circuit)
    r_tb2 = create_resistor('R_TB2', '20k_0.1%', circuit)
    c_tb_filter = create_capacitor('C_TB_FILTER', '100nF', circuit)
    
    r_tb1['1'] += net_tb_raw; r_tb1['2'] += net_tb_adc
    r_tb2['1'] += net_tb_adc; r_tb2['2'] += net_gnd
    c_tb_filter['1'] += net_tb_adc; c_tb_filter['2'] += net_gnd
    esp32['VP_GPIO36'] += net_tb_adc
    
    # Battery Sense
    net_batt_sense = Net('BATT_SENSE', circuit=circuit)
    esp32['VN_GPIO39'] += net_batt_sense
    r_bat1 = create_resistor('R_BAT1', '100k', circuit); r_bat2 = create_resistor('R_BAT2', '100k', circuit)
    r_bat1['1'] += net_vbat; r_bat1['2'] += net_batt_sense
    r_bat2['1'] += net_batt_sense; r_bat2['2'] += net_gnd
    
    # Status LED
    net_led = Net('LED_STATUS', circuit=circuit)
    esp32['GPIO2'] += net_led
    r_led = create_resistor('R_LED', '1k', circuit); d_led = create_diode('D_LED', 'RED_GREEN_LED', circuit)
    r_led['1'] += net_led; r_led['2'] += d_led['A']; d_led['K'] += net_gnd
    
    return circuit

if __name__ == '__main__':
    c = build_n4_circuit()
    out_dir = Path(__file__).resolve().parent.parent / 'netlists'
    out_dir.mkdir(parents=True, exist_ok=True)
    c.generate_netlist(file_=str(out_dir / 'n4_quality.net'))
    print(f"Generated {out_dir / 'n4_quality.net'} with {len(c.parts)} parts and {len(c.nets)} nets.")
