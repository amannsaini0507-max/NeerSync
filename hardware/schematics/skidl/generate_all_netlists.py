"""
JalSetu Hardware - Run all SKiDL netlist generators
Outputs KiCad netlist files into hardware/schematics/netlists/
"""

import subprocess
import sys
from pathlib import Path

SKIDL_DIR = Path(__file__).resolve().parent
NETLISTS_DIR = SKIDL_DIR.parent / 'netlists'
NETLISTS_DIR.mkdir(parents=True, exist_ok=True)

SCRIPTS = [
    'n1_pump.py',
    'n2_esr.py',
    'n3_pressure.py',
    'n4_quality.py',
    'power_subsystem.py'
]

def main():
    print("=" * 60)
    print(" Generating JalSetu Hardware Netlists via SKiDL")
    print("=" * 60)
    
    success_count = 0
    for script_name in SCRIPTS:
        script_path = SKIDL_DIR / script_name
        print(f"[*] Running {script_name}...")
        res = subprocess.run([sys.executable, str(script_path)], capture_output=True, text=True)
        if res.returncode == 0:
            print(f"  [SUCCESS] {script_name}")
            success_count += 1
        else:
            print(f"  [ERROR] {script_name}:")
            print(res.stderr)
            
    print("-" * 60)
    print(f"Generated {success_count}/{len(SCRIPTS)} netlists successfully in {NETLISTS_DIR}")
    print("=" * 60)
    return 0 if success_count == len(SCRIPTS) else 1

if __name__ == '__main__':
    sys.exit(main())
