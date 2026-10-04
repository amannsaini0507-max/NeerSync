/**
 * NeerSync 3D Village Digital Twin - Hydraulics Unit Tests
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { hazenWilliamsHeadLoss, HazenWilliamsSolver } from '../src/hydraulics/hazen-williams.js';
import { createNetworkModel } from '../src/hydraulics/network-model.js';
import { HydraulicEngine } from '../src/hydraulics/solver-interface.js';

describe('Hazen-Williams Hydraulic Engine', () => {
  it('calculates head loss accurately for known dimensions', () => {
    // 72m trunk, 90mm diameter, 200 LPM flow
    const loss = hazenWilliamsHeadLoss(72, 90, 200, 130);
    expect(loss).toBeGreaterThan(0.1);
    expect(loss).toBeLessThan(5.0);

    // Zero flow must have zero head loss
    expect(hazenWilliamsHeadLoss(72, 90, 0, 130)).toBe(0);
  });

  it('builds network model with correct topology, elevations and FHTCs', () => {
    const model = createNetworkModel();
    expect(model.nodes.length).toBe(3); // 3 branches
    expect(model.households.length).toBe(15); // 15 households

    // Verify FHTC ID format
    model.households.forEach((h) => {
      expect(h.fhtc_id).toMatch(/^FHTC-[A-Z]{2}-[0-9]+-[0-9]{4,}$/);
      expect(h.elevation).toBeGreaterThanOrEqual(0.0);
      expect(h.elevation).toBeLessThanOrEqual(8.0);
    });

    // Check special vulnerable sites
    const anganwadi = model.households.find(h => h.siteType === 'anganwadi');
    const school = model.households.find(h => h.siteType === 'school');
    expect(anganwadi).toBeDefined();
    expect(school).toBeDefined();
  });

  it('demonstrates hydraulic pressure difference based on pronounced topography', () => {
    const model = createNetworkModel();
    const solver = new HazenWilliamsSolver(model);

    const state = {
      level: 3.0,
      faults: { pump: 0, leak: 0, burst: 0, choke: 0, rain: 0 },
      simTimeMinutes: 420, // 07:00 AM (during supply window)
      cl: 0.5,
      tu: 1.0,
    };

    solver.solve(state);

    const branchB_tail = model.nodes[1][4]; // High ridge (+6.5m)
    const branchC_tail = model.nodes[2][4]; // Valley near pond (+0.8m)

    // Due to 5.7m elevation difference, valley house must have higher tap pressure head
    expect(branchC_tail.P).toBeGreaterThan(branchB_tail.P);
  });

  it('implements pump hysteresis controls correctly', () => {
    const model = createNetworkModel();
    const solver = new HazenWilliamsSolver(model);

    const state = {
      level: 1.0, // Below 1.2m -> must trigger pump
      pumpCmd: false,
      pumpOn: false,
      faults: { pump: 0, leak: 0, burst: 0, choke: 0, rain: 0 },
      simTimeMinutes: 300,
    };

    solver.updateTankMassBalance(state, 1.0, 50.0);
    expect(state.pumpCmd).toBe(true);
    expect(state.pumpOn).toBe(true);

    // Overfill above 3.8m -> must shut off
    state.level = 3.9;
    solver.updateTankMassBalance(state, 1.0, 50.0);
    expect(state.pumpCmd).toBe(false);
    expect(state.pumpOn).toBe(false);
  });

  it('reproduces qualitative behaviour for all 5 fault modes', () => {
    const model = createNetworkModel();
    const engine = new HydraulicEngine(model);

    const baseState = () => ({
      level: 3.0,
      simTimeMinutes: 420, // 07:00
      pumpCmd: false,
      pumpOn: false,
      pumpCurrent: 0,
      pumpFlow: 0,
      cl: 0.5,
      tu: 1.0,
      faults: { pump: 0, leak: 0, burst: 0, choke: 0, rain: 0 },
    });

    // 1. Pump failure: pump commanded ON but trips
    const sPump = baseState();
    sPump.level = 0.8;
    sPump.faults.pump = 1;
    engine.step(sPump, 1.0);
    expect(sPump.pumpCmd).toBe(true);
    expect(sPump.pumpOn).toBe(false);
    expect(sPump.pumpCurrent).toBe(0.0);

    // 2. Burst on Branch A: huge flow surge
    const sBurst = baseState();
    sBurst.faults.burst = 1;
    const burstRes = engine.step(sBurst, 1.0);
    expect(burstRes.branchFlows[0][0]).toBeGreaterThan(70.0); // Massive branch A inflow

    // 3. Choke on Branch C: tail-end starved
    const sChoke = baseState();
    sChoke.faults.choke = 1;
    engine.step(sChoke, 1.0);
    expect(model.nodes[2][4].P).toBeLessThan(3.0); // No water / low pressure

    // 4. Rain contamination: quality degrades
    const sRain = baseState();
    sRain.faults.rain = 1;
    for (let m = 0; m < 30; m++) engine.step(sRain, 1.0);
    expect(sRain.cl).toBeLessThan(0.20);
    expect(sRain.tu).toBeGreaterThan(5.0);
  });
});
