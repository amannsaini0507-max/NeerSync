/**
 * NeerSync 3D Village Digital Twin - Alert Rules & Escalation Unit Tests
 */

import { describe, it, expect } from 'vitest';
import { AlertEngine } from '../src/alerts/rules.js';
import { createNetworkModel } from '../src/hydraulics/network-model.js';
import { HazenWilliamsSolver } from '../src/hydraulics/hazen-williams.js';

describe('Alert Rules & Escalation Engine', () => {
  it('generates pump failure alert when current is 0A for >= 8 minutes', () => {
    const model = createNetworkModel();
    const solver = new HazenWilliamsSolver(model);
    const alertEngine = new AlertEngine(model);

    const state = {
      level: 1.0,
      simTimeMinutes: 420,
      cl: 0.5,
      tu: 1.0,
      pumpCmd: true,
      pumpOn: false, // Tripped
      pumpCurrent: 0.0,
      faults: { pump: 1, leak: 0, burst: 0, choke: 0, rain: 0 },
    };

    let activeAlerts = [];
    for (let m = 0; m < 9; m++) {
      const res = solver.solve(state);
      const output = alertEngine.evaluate(state, res);
      activeAlerts = output.active;
      state.simTimeMinutes++;
    }

    const pumpAlert = activeAlerts.find(a => a.type === 'no_supply' && a.scope.branch.includes('Pump'));
    expect(pumpAlert).toBeDefined();
    expect(pumpAlert.severity).toBe('high');
    expect(pumpAlert.reason).toContain('Pump is commanded ON but motor current is 0.0 A');
  });

  it('generates pipe burst alert with quantified excess loss', () => {
    const model = createNetworkModel();
    const solver = new HazenWilliamsSolver(model);
    const alertEngine = new AlertEngine(model);

    const state = {
      level: 3.0,
      simTimeMinutes: 420, // During supply
      cl: 0.5,
      tu: 1.0,
      pumpCmd: false,
      pumpOn: false,
      pumpCurrent: 0.0,
      faults: { pump: 0, leak: 0, burst: 1, choke: 0, rain: 0 },
    };

    const res = solver.solve(state);
    const output = alertEngine.evaluate(state, res);

    const burstAlert = output.active.find(a => a.type === 'leakage' && a.severity === 'high');
    expect(burstAlert).toBeDefined();
    expect(burstAlert.scope.branch).toBe('Branch A');
    expect(burstAlert.reason).toContain('is lost');
  });

  it('auto-closes alerts after 5 clear minutes and logs resolution', () => {
    const model = createNetworkModel();
    const solver = new HazenWilliamsSolver(model);
    const alertEngine = new AlertEngine(model);

    const state = {
      level: 3.0,
      simTimeMinutes: 420,
      cl: 0.15, // Contaminated
      tu: 6.5,
      pumpCmd: false,
      pumpOn: false,
      pumpCurrent: 0.0,
      faults: { pump: 0, leak: 0, burst: 0, choke: 0, rain: 1 },
    };

    // Trigger quality alert
    let res = solver.solve(state);
    alertEngine.evaluate(state, res);
    expect(alertEngine.activeAlerts['wq']).toBeDefined();

    // Clear fault (chlorine returns to 0.45, turbidity to 1.0)
    state.cl = 0.45;
    state.tu = 1.0;
    state.faults.rain = 0;

    // Advance 5 clear minutes
    for (let m = 0; m < 5; m++) {
      state.simTimeMinutes++;
      res = solver.solve(state);
      alertEngine.evaluate(state, res);
    }

    // Must be removed from active and moved to closed
    expect(alertEngine.activeAlerts['wq']).toBeUndefined();
    expect(alertEngine.closedAlerts.length).toBeGreaterThan(0);
  });

  it('escalates alerts through administrative tiers according to duration', () => {
    const alert = { t0: 100 };

    expect(AlertEngine.getEscalation(alert, 115)).toContain('Jal Mitra notified');
    expect(AlertEngine.getEscalation(alert, 160)).toContain('Village Water & Sanitation Committee');
    expect(AlertEngine.getEscalation(alert, 300)).toContain('Junior Engineer');
    expect(AlertEngine.getEscalation(alert, 600)).toContain('Executive Engineer');
  });
});
