/**
 * JalSetu 3D Village Digital Twin - IoT Sensor Node Telemetry Emulation
 * Emits telemetry strictly conforming to /contracts/telemetry.schema.json.
 */

import { SENSOR_NODES, VILLAGE_CONFIG } from '../config.js';

export class IoTTelemetryManager {
  constructor() {
    this.seqCounters = {
      [SENSOR_NODES.PUMP.node_id]: 100,
      [SENSOR_NODES.ESR.node_id]: 100,
      [SENSOR_NODES.FLOW.node_id]: 100,
      [SENSOR_NODES.TAIL_PRESSURE.node_id]: 100,
      [SENSOR_NODES.QUALITY.node_id]: 100,
    };

    // Configurable network simulation parameters
    this.packetLossEnabled = false;
    this.packetLossRate = 0.025; // 2.5% packet loss
    this.sensorDriftEnabled = false;
    this.driftAccumulatorKpa = 0.0;
  }

  /**
   * Generates a contract-compliant telemetry payload for a specific sensor node.
   * @param {Object} nodeConfig Configuration from SENSOR_NODES
   * @param {Object} values Measurement dictionary matching node type
   * @param {string} isoTimestamp UTC ISO-8601 acquisition time
   * @returns {Object|null} Telemetry packet or null if dropped by packet loss
   */
  createPacket(nodeConfig, values, isoTimestamp) {
    if (this.packetLossEnabled && Math.random() < this.packetLossRate) {
      // Packet dropped by network transmission failure
      return null;
    }

    const seq = this.seqCounters[nodeConfig.node_id]++;

    // Base IoT hardware operating stats
    const battery_v = Number((3.85 + 0.1 * Math.sin(seq / 20.0)).toFixed(2));
    const rssi_dbm = Math.round(-78 + 4 * Math.sin(seq / 15.0));

    return {
      schema_version: '1.0',
      node_id: nodeConfig.node_id,
      lgd_gp_code: VILLAGE_CONFIG.lgd_gp_code,
      scheme_id: VILLAGE_CONFIG.scheme_id,
      ts: isoTimestamp,
      seq,
      type: nodeConfig.type,
      values,
      battery_v,
      rssi_dbm,
      fw: '2.4.1',
    };
  }

  /**
   * Emits live telemetry packets for all 5 monitoring nodes from current physical state.
   * @param {Object} state Current simulation runtime state
   * @param {Object} hydraulicResults Solver outputs
   * @returns {Array} List of emitted packets
   */
  emitLiveTelemetry(state, hydraulicResults) {
    const isoTimestamp = new Date(Date.UTC(2026, 9, 4, 0, Math.floor(state.simTimeMinutes))).toISOString();
    const packets = [];

    // 1. Pump Node (N001)
    const pumpPacket = this.createPacket(
      SENSOR_NODES.PUMP,
      {
        state: state.pumpOn ? 1 : 0,
        current_a: Number(state.pumpCurrent.toFixed(1)),
        voltage_v: state.pumpOn ? 415.0 : 0.0,
      },
      isoTimestamp
    );
    if (pumpPacket) packets.push(pumpPacket);

    // 2. Elevated Storage Reservoir Node (N002)
    // Level in cm (0.0 to 400.0 cm)
    const level_cm = Number((state.level * 100.0).toFixed(1));
    const esrPacket = this.createPacket(
      SENSOR_NODES.ESR,
      {
        level_cm,
      },
      isoTimestamp
    );
    if (esrPacket) packets.push(esrPacket);

    // 3. Bulk Transmission Flow Node (N003)
    const flow_lpm = Number(hydraulicResults.trunkFlow.toFixed(1));
    const flowPacket = this.createPacket(
      SENSOR_NODES.FLOW,
      {
        flow_lpm,
      },
      isoTimestamp
    );
    if (flowPacket) packets.push(flowPacket);

    // 4. Tail-End Pressure Node (N004)
    // Tail node of Branch B (House B5 on the high ridge)
    let tailPressureKpa = Number((state.nodes[1][4].P_kpa).toFixed(1));
    if (this.sensorDriftEnabled) {
      this.driftAccumulatorKpa += 0.02; // Slow calibration drift
      tailPressureKpa = Number((tailPressureKpa + this.driftAccumulatorKpa).toFixed(1));
    }
    const pressurePacket = this.createPacket(
      SENSOR_NODES.TAIL_PRESSURE,
      {
        pressure_kpa: tailPressureKpa,
      },
      isoTimestamp
    );
    if (pressurePacket) packets.push(pressurePacket);

    // 5. Water Quality Node (N005)
    const qualityPacket = this.createPacket(
      SENSOR_NODES.QUALITY,
      {
        turbidity_ntu: Number(state.tu.toFixed(2)),
        chlorine_mgl: Number(state.cl.toFixed(2)),
        ph: Number((7.2 + 0.1 * Math.sin(state.simTimeMinutes / 100.0)).toFixed(2)),
        tds_ppm: 210.0,
      },
      isoTimestamp
    );
    if (qualityPacket) packets.push(qualityPacket);

    return packets;
  }
}
