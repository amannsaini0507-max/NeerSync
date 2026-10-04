/**
 * NeerSync 3D Village Digital Twin - Schema Validator Unit Tests
 * Validates 100% compliance with /contracts schemas.
 */

import { describe, it, expect } from 'vitest';
import { ContractsValidator } from '../src/telemetry/validator.js';
import { IoTTelemetryManager } from '../src/telemetry/nodes.js';
import { SENSOR_NODES } from '../src/config.js';
import { createNetworkModel } from '../src/hydraulics/network-model.js';
import { HazenWilliamsSolver } from '../src/hydraulics/hazen-williams.js';
import { AlertEngine } from '../src/alerts/rules.js';

describe('Contracts Schema Validator', () => {
  const validator = new ContractsValidator();
  const telemetryMgr = new IoTTelemetryManager();

  it('validates 100% of live generated IoT telemetry packets across all 5 nodes', () => {
    const model = createNetworkModel();
    const solver = new HazenWilliamsSolver(model);
    const state = {
      level: 2.8,
      pumpCmd: true,
      pumpOn: true,
      pumpCurrent: 4.25,
      simTimeMinutes: 420,
      cl: 0.45,
      tu: 1.15,
      nodes: model.nodes,
      faults: { pump: 0, leak: 0, burst: 0, choke: 0, rain: 0 },
    };

    const hydraulicResults = solver.solve(state);
    const packets = telemetryMgr.emitLiveTelemetry(state, hydraulicResults);

    expect(packets.length).toBe(5);

    packets.forEach((packet) => {
      const res = validator.validateTelemetry(packet);
      if (!res.valid) {
        console.error('Validation errors for', packet.node_id, res.errors);
      }
      expect(res.valid).toBe(true);
      expect(res.errors.length).toBe(0);
    });
  });

  it('rejects invalid telemetry packets with malformed properties', () => {
    const badNodeIdPacket = {
      schema_version: '1.0',
      node_id: 'INVALID-NODE-NAME', // fails regex
      lgd_gp_code: '245123',
      scheme_id: 'SCH-UP-245123',
      ts: new Date().toISOString(),
      seq: 1,
      type: 'pressure',
      values: { pressure_kpa: 120.0 },
      battery_v: 3.8,
      rssi_dbm: -75,
      fw: '1.0.0',
    };
    expect(validator.validateTelemetry(badNodeIdPacket).valid).toBe(false);

    const badUnitsPacket = {
      schema_version: '1.0',
      node_id: SENSOR_NODES.TAIL_PRESSURE.node_id,
      lgd_gp_code: '245123',
      scheme_id: 'SCH-UP-245123',
      ts: new Date().toISOString(),
      seq: 2,
      type: 'pressure',
      values: { pressure_psi: 15.0 }, // unauthorized unit
      battery_v: 3.8,
      rssi_dbm: -75,
      fw: '1.0.0',
    };
    expect(validator.validateTelemetry(badUnitsPacket).valid).toBe(false);
  });

  it('validates generated alerts against alert.schema.json', () => {
    const model = createNetworkModel();
    const solver = new HazenWilliamsSolver(model);
    const alertEngine = new AlertEngine(model);

    const state = {
      level: 0.3, // ESR empty failure
      simTimeMinutes: 400,
      cl: 0.12, // Quality failure
      tu: 7.5,
      pumpCmd: false,
      pumpOn: false,
      pumpCurrent: 0.0,
      nodes: model.nodes,
      faults: { pump: 0, leak: 0, burst: 0, choke: 0, rain: 1 },
    };

    const hydraulicRes = solver.solve(state);
    const { active } = alertEngine.evaluate(state, hydraulicRes);

    expect(active.length).toBeGreaterThan(0);

    active.forEach((alert) => {
      const res = validator.validateAlert(alert);
      if (!res.valid) {
        console.error('Alert validation error:', res.errors);
      }
      expect(res.valid).toBe(true);
      expect(alert.reason).toBeDefined();
      expect(alert.reason.length).toBeGreaterThan(10);
    });
  });

  it('validates citizen feedback records against feedback.schema.json', () => {
    const validFeedback = {
      feedback_id: 'FB-20261004-0012',
      fhtc_id: 'FHTC-UP-245123-0004',
      channel: 'whatsapp',
      category: 'no_water',
      lang: 'hi',
      ts: new Date().toISOString(),
      text: 'Nal se paani nahi aa raha hai subah se.',
      lat: 29.0832,
      lon: 77.7121,
    };

    const res = validator.validateFeedback(validFeedback);
    expect(res.valid).toBe(true);
  });
});
