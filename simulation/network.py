"""
JalSetu Virtual Village Hydraulic Network Model (WNTR)
Simulates a rural Gram Panchayat water supply scheme:
- 1 Source + Submersible Pump
- 1 Elevated Storage Reservoir (ESR)
- 3 Distribution Branches
- 60 Functional Household Tap Connections (FHTCs)
- Intermittent supply schedule & diurnal demand
"""

import math
import numpy as np
import pandas as pd
import wntr


GP_METADATA = {
    "lgd_gp_code": "245123",
    "gp_name": "Badepur",
    "district": "Meerut",
    "state": "UP",
    "scheme_id": "SCH-UP-245123",
    "scheme_name": "Badepur Multi-Ward Piped Water Scheme",
    "nodes": {
        "pump_node": "JS-UP-245123-N001",
        "esr_node": "JS-UP-245123-N002",
        "bulk_flow_node": "JS-UP-245123-N003",
        "tail_end_node": "JS-UP-245123-N004",
        "quality_node": "JS-UP-245123-N005",
    },
    "wards": ["Ward 1 (North)", "Ward 2 (Central)", "Ward 3 (South)"],
}


def create_diurnal_pattern():
    """
    24-hour rural residential drinking water demand multiplier pattern.
    Reflects morning peak (06:00-09:00) and evening peak (17:00-20:00).
    Outside supply hours, baseline demand is near zero.
    """
    multipliers = [
        0.00, 0.00, 0.00, 0.00, 0.05, 0.40,  # 00:00 - 05:00
        1.80, 2.50, 2.20, 1.20, 0.20, 0.10,  # 06:00 - 11:00 (Morning Peak)
        0.10, 0.10, 0.10, 0.20, 0.50, 1.90,  # 12:00 - 17:00
        2.40, 2.10, 1.10, 0.30, 0.05, 0.00   # 18:00 - 23:00 (Evening Peak)
    ]
    return multipliers


def build_village_network(seed: int = 42):
    """
    Builds the WNTR WaterNetworkModel for Gram Panchayat Badepur.
    Returns:
        wn: wntr.network.WaterNetworkModel
        fhtc_map: dict mapping fhtc_id to node_id, ward, and coordinates
    """
    np.random.seed(seed)
    wn = wntr.network.WaterNetworkModel()

    # Time configuration: 48-hour simulation, 1-hour hydraulic step
    wn.options.time.duration = 48 * 3600
    wn.options.time.hydraulic_timestep = 3600
    wn.options.time.report_timestep = 3600
    wn.options.hydraulic.demand_model = "PDD"  # Pressure-Dependent Demand
    wn.options.hydraulic.required_pressure = 7.0  # 7m head (~68.6 kPa, JJM benchmark)
    wn.options.hydraulic.minimum_pressure = 0.5   # 0.5m head minimum

    # 1. Source Reservoir (Tube-well groundwater aquifer)
    # Coordinates: (X=100, Y=500), Head=10m
    wn.add_reservoir("RES_SOURCE", base_head=10.0, coordinates=(100, 500))

    # 2. Pump Discharge Junction
    wn.add_junction("J_PUMP_DISCH", elevation=10.0, coordinates=(180, 500))

    # Pump head curve: 45m shutoff, 38m at 54 m3/h (~900 LPM)
    wn.add_curve("PUMP_CURVE", "HEAD", [(0.0, 45.0), (0.015, 38.0), (0.030, 25.0)])
    wn.add_pump("PUMP_01", "RES_SOURCE", "J_PUMP_DISCH", pump_type="HEAD", pump_parameter="PUMP_CURVE")

    # 4. Elevated Storage Reservoir (ESR, N002)
    # Elevation: 20m ground + 15m staging = 35m total base head
    # Dimensions: 6m dia, 4m max height, initial water level 2.5m (250 cm)
    wn.add_tank(
        "TANK_ESR",
        elevation=25.0,
        init_level=2.8,
        min_level=0.1,
        max_level=4.0,
        diameter=6.0,
        min_vol=0.0,
        coordinates=(300, 500)
    )

    # Rising Main (Pump -> ESR)
    wn.add_pipe("PIPE_RISING", "J_PUMP_DISCH", "TANK_ESR", length=120, diameter=0.15, roughness=120)

    # Pump Controls: Automatic refill when ESR level drops below 1.5m, shutoff at 3.8m
    from wntr.network.controls import ControlAction, ValueCondition, Control
    tank_obj = wn.get_node("TANK_ESR")
    pump_obj = wn.get_link("PUMP_01")
    ctrl_on = Control(ValueCondition(tank_obj, "level", "<", 1.8), ControlAction(pump_obj, "status", 1))
    ctrl_off = Control(ValueCondition(tank_obj, "level", ">", 3.8), ControlAction(pump_obj, "status", 0))
    wn.add_control("CTRL_PUMP_ON", ctrl_on)
    wn.add_control("CTRL_PUMP_OFF", ctrl_off)

    # 5. Distribution Header (Bulk Flow Meter, N003)
    wn.add_junction("J_DIST_HEADER", elevation=18.0, coordinates=(450, 500))
    wn.add_pipe("PIPE_HEADER", "TANK_ESR", "J_DIST_HEADER", length=150, diameter=0.20, roughness=120)

    # Supply Control Pattern for Gravity Outflow (Morning 06:00-09:30, Evening 17:00-20:30)
    diurnal_pattern = create_diurnal_pattern()
    wn.add_pattern("DEMAND_PAT", diurnal_pattern * 2)

    # 6. Branch Layout (3 Wards, 20 Households each = 60 FHTCs)
    fhtc_map = {}
    base_fhtc_lpm = 10.0  # 10 LPM average tap flow during peak (0.000167 m3/s)
    base_demand_m3s = base_fhtc_lpm / 60000.0

    branches = [
        {"name": "Ward_1", "angle": 0.5, "length": 350, "ward_idx": 1},   # North Branch
        {"name": "Ward_2", "angle": 0.0, "length": 420, "ward_idx": 2},   # Central Branch
        {"name": "Ward_3", "angle": -0.5, "length": 500, "ward_idx": 3},  # South Branch
    ]

    fhtc_counter = 1

    for b in branches:
        w_idx = b["ward_idx"]
        prev_node = "J_DIST_HEADER"
        branch_dx = math.cos(b["angle"])
        branch_dy = math.sin(b["angle"])

        for i in range(1, 21):
            j_name = f"J_W{w_idx}_{i:02d}"
            dist = (i / 20.0) * b["length"]
            coord_x = 450 + int(dist * branch_dx)
            coord_y = 500 + int(dist * branch_dy)

            # Modest ground elevation slope
            elev = 18.0 + (np.sin(i * 0.3) * 1.5)

            # Each junction has a household demand
            wn.add_junction(
                j_name,
                elevation=elev,
                base_demand=base_demand_m3s,
                demand_pattern="DEMAND_PAT",
                coordinates=(coord_x, coord_y)
            )

            # Pipe from previous junction
            p_name = f"P_W{w_idx}_{i:02d}"
            # Pipe diameter tapers: 100mm -> 75mm -> 50mm
            dia = 0.10 if i <= 7 else (0.075 if i <= 14 else 0.05)
            pipe_len = b["length"] / 20.0
            wn.add_pipe(p_name, prev_node, j_name, length=pipe_len, diameter=dia, roughness=110)

            # Map FHTC ID
            fhtc_id = f"FHTC-UP-245123-{fhtc_counter:04d}"
            fhtc_map[fhtc_id] = {
                "fhtc_id": fhtc_id,
                "junction_id": j_name,
                "ward": f"Ward_{w_idx}",
                "branch_name": b["name"],
                "index_in_branch": i,
                "is_tail_end": (i == 20),
                "coordinates": [coord_x, coord_y],
                "elevation": elev,
                "vulnerability_weight": 1.0 + (0.5 if i > 15 else 0.0) + (0.3 if w_idx == 3 else 0.0)
            }
            fhtc_counter += 1
            prev_node = j_name

    return wn, fhtc_map


def run_simulation(wn, duration_hours: int = 48):
    """
    Runs the hydraulic simulation and extracts node pressures, tank levels, and link flows.
    """
    wn.options.time.duration = duration_hours * 3600
    sim = wntr.sim.WNTRSimulator(wn)
    results = sim.run_sim()
    return results


if __name__ == "__main__":
    wn, fhtc_map = build_village_network()
    print(f"Network built successfully with {len(fhtc_map)} FHTCs.")
    results = run_simulation(wn, duration_hours=24)
    print("Hydraulic simulation 24h run completed successfully!")
    tank_levels = results.node["pressure"].loc[:, "TANK_ESR"]
    print(f"ESR Water Level (m) range: {tank_levels.min():.2f}m to {tank_levels.max():.2f}m")
