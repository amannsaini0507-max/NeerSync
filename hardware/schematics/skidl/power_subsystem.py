"""
JalSetu Power Subsystem SKiDL Schematic Script
Solar MPPT / TP4056 + DW01A BMS + 3.8V GSM Buck + 3.3V System LDO
"""

import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))

import skidl
from skidl import Circuit, Net, Part, Pin
from common_parts import (
    create_resistor, create_capacitor, create_pmos, create_diode, create_tvs
)

def build_power_circuit():
    circuit = Circuit()
    
    net_solar_in = Net('SOLAR_IN', circuit=circuit)
    net_vbat = Net('VBAT', circuit=circuit)
    net_vbat_gsm = Net('VBAT_GSM', circuit=circuit)
    net_3v3 = Net('3V3', circuit=circuit)
    net_gnd = Net('GND', circuit=circuit)
    
    # Solar Input Protection
    fuse_solar = Part(name='FUSE', tool=skidl.SKIDL, dest=skidl.TEMPLATE)
    fuse_solar.add_pins(Pin(num='1', name='IN'), Pin(num='2', name='OUT'))
    f1 = fuse_solar(circuit=circuit); f1.ref = 'F1'; f1.value = 'PTC_1.5A'
    f1['IN'] += net_solar_in
    
    d_rev = create_diode('D_REV', 'SS34_SCHOTTKY', circuit)
    f1['OUT'] += d_rev['A']
    
    tvs_sol = create_tvs('TVS_SOL', 'SMAJ18A', circuit)
    d_rev['K'] += tvs_sol['1']
    tvs_sol['2'] += net_gnd
    
    # Solar Charger IC (CN3791 MPPT / TP4056)
    charger_tmpl = Part(name='CN3791_MPPT_CHARGER', tool=skidl.SKIDL, dest=skidl.TEMPLATE)
    charger_tmpl.add_pins(Pin(num='1', name='VIN'), Pin(num='2', name='BAT'), Pin(num='3', name='GND'), Pin(num='4', name='MPPT_SET'))
    charger = charger_tmpl(circuit=circuit); charger.ref = 'U_CHG'; charger.value = 'CN3791'
    charger['VIN'] += d_rev['K']
    charger['BAT'] += net_vbat
    charger['GND'] += net_gnd
    
    # Battery Protection (DW01A + FS8205A)
    bms_tmpl = Part(name='DW01A_BMS', tool=skidl.SKIDL, dest=skidl.TEMPLATE)
    bms_tmpl.add_pins(Pin(num='1', name='VDD'), Pin(num='2', name='VM'), Pin(num='3', name='GND'), Pin(num='4', name='CELL_P'), Pin(num='5', name='CELL_N'))
    bms = bms_tmpl(circuit=circuit); bms.ref = 'U_BMS'; bms.value = 'DW01A'
    bms['VDD'] += net_vbat
    bms['GND'] += net_gnd
    
    # GSM 3.8V Synchronous Buck Converter (MP2307 / TPS5430)
    buck_tmpl = Part(name='MP2307_BUCK_3V8', tool=skidl.SKIDL, dest=skidl.TEMPLATE)
    buck_tmpl.add_pins(Pin(num='1', name='IN'), Pin(num='2', name='EN'), Pin(num='3', name='SW'), Pin(num='4', name='OUT_3V8'), Pin(num='5', name='GND'))
    buck = buck_tmpl(circuit=circuit); buck.ref = 'U_BUCK'; buck.value = 'MP2307_3A'
    buck['IN'] += net_vbat
    buck['OUT_3V8'] += net_vbat_gsm
    buck['GND'] += net_gnd
    
    # 3.3V Low-Dropout Regulator (AP2112K / ME6211)
    ldo_tmpl = Part(name='AP2112K_3V3_LDO', tool=skidl.SKIDL, dest=skidl.TEMPLATE)
    ldo_tmpl.add_pins(Pin(num='1', name='VIN'), Pin(num='2', name='GND'), Pin(num='3', name='EN'), Pin(num='4', name='NC'), Pin(num='5', name='VOUT_3V3'))
    ldo = ldo_tmpl(circuit=circuit); ldo.ref = 'U_LDO'; ldo.value = 'AP2112K-3.3'
    ldo['VIN'] += net_vbat
    ldo['EN'] += net_vbat
    ldo['VOUT_3V3'] += net_3v3
    ldo['GND'] += net_gnd
    
    # Decoupling
    c_out_ldo = create_capacitor('C_LDO_OUT', '10uF', circuit)
    c_out_ldo['1'] += net_3v3; c_out_ldo['2'] += net_gnd
    
    return circuit

if __name__ == '__main__':
    c = build_power_circuit()
    out_dir = Path(__file__).resolve().parent.parent / 'netlists'
    out_dir.mkdir(parents=True, exist_ok=True)
    c.generate_netlist(file_=str(out_dir / 'power_subsystem.net'))
    print(f"Generated {out_dir / 'power_subsystem.net'} with {len(c.parts)} parts and {len(c.nets)} nets.")
