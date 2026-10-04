"""
NeerSync Hardware - SKiDL Common Component Definitions
Provides standalone Part templates without requiring KiCad symbol installations.
"""

import skidl
from skidl import Part, Pin, Net, Circuit

def create_resistor(ref, value, circuit):
    tmpl = Part(name='R', tool=skidl.SKIDL, dest=skidl.TEMPLATE)
    tmpl.add_pins(Pin(num='1', name='1'), Pin(num='2', name='2'))
    part = tmpl(circuit=circuit)
    part.ref = ref
    part.value = value
    return part

def create_capacitor(ref, value, circuit):
    tmpl = Part(name='C', tool=skidl.SKIDL, dest=skidl.TEMPLATE)
    tmpl.add_pins(Pin(num='1', name='1'), Pin(num='2', name='2'))
    part = tmpl(circuit=circuit)
    part.ref = ref
    part.value = value
    return part

def create_diode(ref, value, circuit):
    tmpl = Part(name='D', tool=skidl.SKIDL, dest=skidl.TEMPLATE)
    tmpl.add_pins(Pin(num='1', name='A'), Pin(num='2', name='K'))
    part = tmpl(circuit=circuit)
    part.ref = ref
    part.value = value
    return part

def create_tvs(ref, value, circuit):
    tmpl = Part(name='TVS', tool=skidl.SKIDL, dest=skidl.TEMPLATE)
    tmpl.add_pins(Pin(num='1', name='1'), Pin(num='2', name='2'))
    part = tmpl(circuit=circuit)
    part.ref = ref
    part.value = value
    return part

def create_pmos(ref, value, circuit):
    tmpl = Part(name='Q_PMOS', tool=skidl.SKIDL, dest=skidl.TEMPLATE)
    tmpl.add_pins(Pin(num='1', name='G'), Pin(num='2', name='S'), Pin(num='3', name='D'))
    part = tmpl(circuit=circuit)
    part.ref = ref
    part.value = value
    return part

def create_esp32(circuit):
    """ESP32-WROOM-32D 38-Pin Module Template"""
    tmpl = Part(name='ESP32-WROOM-32D', tool=skidl.SKIDL, dest=skidl.TEMPLATE)
    pins = [
        Pin(num='1', name='3V3'), Pin(num='2', name='EN'), Pin(num='3', name='VP_GPIO36'),
        Pin(num='4', name='VN_GPIO39'), Pin(num='5', name='GPIO34'), Pin(num='6', name='GPIO35'),
        Pin(num='7', name='GPIO32'), Pin(num='8', name='GPIO33'), Pin(num='9', name='GPIO25'),
        Pin(num='10', name='GPIO26'), Pin(num='11', name='GPIO27'), Pin(num='12', name='GPIO14'),
        Pin(num='13', name='GPIO12'), Pin(num='14', name='GND1'), Pin(num='15', name='GPIO13'),
        Pin(num='16', name='GPIO9'), Pin(num='17', name='GPIO10'), Pin(num='18', name='GPIO11'),
        Pin(num='19', name='VIN'), Pin(num='20', name='GPIO6'), Pin(num='21', name='GPIO7'),
        Pin(num='22', name='GPIO8'), Pin(num='23', name='GPIO15'), Pin(num='24', name='GPIO2'),
        Pin(num='25', name='GPIO0'), Pin(num='26', name='GPIO4'), Pin(num='27', name='GPIO16'),
        Pin(num='28', name='GPIO17'), Pin(num='29', name='GPIO5'), Pin(num='30', name='GPIO18'),
        Pin(num='31', name='GPIO19'), Pin(num='32', name='GND2'), Pin(num='33', name='GPIO21'),
        Pin(num='34', name='GPIO3'), Pin(num='35', name='GPIO1'), Pin(num='36', name='GPIO22'),
        Pin(num='37', name='GPIO23'), Pin(num='38', name='GND3')
    ]
    tmpl.add_pins(*pins)
    part = tmpl(circuit=circuit)
    part.ref = 'U1'
    part.value = 'ESP32-WROOM-32D'
    return part

def create_sx1276(circuit):
    """SX1276 LoRa SPI Module"""
    tmpl = Part(name='SX1276_RFM95W', tool=skidl.SKIDL, dest=skidl.TEMPLATE)
    pins = [
        Pin(num='1', name='GND'), Pin(num='2', name='3V3'), Pin(num='3', name='RST'),
        Pin(num='4', name='DIO0'), Pin(num='5', name='DIO1'), Pin(num='6', name='DIO2'),
        Pin(num='7', name='SCK'), Pin(num='8', name='MISO'), Pin(num='9', name='MOSI'),
        Pin(num='10', name='NSS_CS'), Pin(num='11', name='ANT')
    ]
    tmpl.add_pins(*pins)
    part = tmpl(circuit=circuit)
    part.ref = 'U2'
    part.value = 'SX1276-IN865'
    return part

def create_a7672s(circuit):
    """SIMCom A7672S 4G LTE Cat-1 Module"""
    tmpl = Part(name='A7672S_GSM', tool=skidl.SKIDL, dest=skidl.TEMPLATE)
    pins = [
        Pin(num='1', name='VBAT'), Pin(num='2', name='VBAT_SEC'), Pin(num='3', name='GND1'),
        Pin(num='4', name='GND2'), Pin(num='5', name='TXD'), Pin(num='6', name='RXD'),
        Pin(num='7', name='PWRKEY'), Pin(num='8', name='STATUS'), Pin(num='9', name='ANT_LTE')
    ]
    tmpl.add_pins(*pins)
    part = tmpl(circuit=circuit)
    part.ref = 'U3'
    part.value = 'A7672S-LTE-CAT1'
    return part
