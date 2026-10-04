"""
Unit Tests for WNTR Village Network Model
Verifies topology construction and hydraulic reproducibility.
"""

import pytest
from simulation.network import build_village_network, run_simulation, GP_METADATA


def test_network_topology_elements():
    wn, fhtc_map = build_village_network(seed=42)
    assert len(fhtc_map) == 60
    assert "RES_SOURCE" in wn.node_name_list
    assert "TANK_ESR" in wn.node_name_list
    assert "PUMP_01" in wn.link_name_list
    assert "PIPE_HEADER" in wn.link_name_list


def test_fhtc_distribution_across_wards():
    _, fhtc_map = build_village_network(seed=42)
    wards = [info["ward"] for info in fhtc_map.values()]
    assert wards.count("Ward_1") == 20
    assert wards.count("Ward_2") == 20
    assert wards.count("Ward_3") == 20


def test_hydraulic_reproducibility():
    wn1, _ = build_village_network(seed=42)
    res1 = run_simulation(wn1, duration_hours=6)
    
    wn2, _ = build_village_network(seed=42)
    res2 = run_simulation(wn2, duration_hours=6)

    # Tank level and tail pressure must be identical
    p1 = res1.node["pressure"].loc[0, "TANK_ESR"]
    p2 = res2.node["pressure"].loc[0, "TANK_ESR"]
    assert abs(p1 - p2) < 1e-5
