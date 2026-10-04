/**
 * JalSetu 3D Village Digital Twin - Hazen-Williams Hydraulic Engine
 * Rigorous tree solver incorporating physical elevation heads, C=130 roughness,
 * pressure-dependent demands, emitter leaks, tank mass balance, and water quality decay.
 */

import { PIPE_SPECS, SUPPLY_WINDOWS } from '../config.js';

/**
 * Calculates Hazen-Williams friction head loss in metres.
 * @param {number} L Length in metres
 * @param {number} D_mm Diameter in millimetres
 * @param {number} q_lpm Flow rate in Litres per minute
 * @param {number} C Hazen-Williams roughness coefficient (default 130)
 * @returns {number} Head loss h_f in metres
 */
export function hazenWilliamsHeadLoss(L, D_mm, q_lpm, C = PIPE_SPECS.C_FACTOR) {
  if (q_lpm <= 0) return 0;
  const Q_m3s = q_lpm / 60000;
  const D_m = D_mm / 1000;
  // h_f = 10.67 * L * Q^1.852 / (C^1.852 * D^4.87)
  const num = 10.67 * L * Math.pow(Q_m3s, 1.852);
  const den = Math.pow(C, 1.852) * Math.pow(D_m, 4.87);
  return num / den;
}

export class HazenWilliamsSolver {
  constructor(networkModel) {
    this.model = networkModel;
    this.nodes = networkModel.nodes;
    this.DIA = PIPE_SPECS.BRANCH_DIAS_MM;
    this.SEG = PIPE_SPECS.BRANCH_LENS_M;
    this.Q0 = PIPE_SPECS.TAP_NOMINAL_DEMAND_LPM;
    this.TANK_BASE_STAGE = 15.0; // 15m elevation tower structure
  }

  isSupplyOpen(simTimeMinutes) {
    const hour = (simTimeMinutes / 60) % 24;
    return SUPPLY_WINDOWS.some(w => hour >= w.start_h && hour < w.end_h);
  }

  /**
   * Executes one hydraulic simulation iteration.
   * @param {Object} state Current simulation runtime state
   * @returns {Object} Updated hydraulic metrics
   */
  solve(state) {
    const { level, faults, simTimeMinutes } = state;
    const isSupply = this.isSupplyOpen(simTimeMinutes);

    // Apply active fault parameters to nodes
    // Slow leak: Branch B, Node index 2 (House B3)
    this.nodes[1][2].cd = faults.leak ? 14.0 : 0.0;
    // Pipe burst: Branch A, Node index 1 (House A2)
    this.nodes[0][1].cd = faults.burst ? 90.0 : 0.0;
    // Choke: Branch C, Node index 0 (Branch main inlet) - severe silt/scale occlusion
    this.nodes[2][0].res = faults.choke ? 1200.0 : 1.0;

    // Total hydraulic head at Elevated Storage Reservoir
    // ESR ground level + 15m staging + current water level
    const H_tank = this.model.ESR_GROUND_Z + this.TANK_BASE_STAGE + level;

    let trunkFlow = 0;
    let branchFlows = [[], [], []];

    // Iterative convergence for pressure-dependent demands and friction
    for (let iter = 0; iter < 24; iter++) {
      trunkFlow = 0;

      // 1. Backwards accumulation: compute required branch flows from demands + leaks
      branchFlows = this.nodes.map((branch) => {
        let cumulativeFlow = 0;
        const segmentFlows = new Array(5);

        for (let i = 4; i >= 0; i--) {
          const n = branch[i];
          const P = Math.max(n.P, 0);

          // Pressure-dependent tap discharge with smooth damping
          const targetDemand = isSupply ? this.Q0 * Math.min(1.0, Math.sqrt(P / 10.0)) : 0.0;
          n.q = 0.6 * n.q + 0.4 * targetDemand;

          // Emitter leak flow: q_leak = cd * sqrt(P)
          n.leak = n.cd * Math.sqrt(P);

          cumulativeFlow += (n.q + n.leak);
          segmentFlows[i] = cumulativeFlow;
        }

        trunkFlow += segmentFlows[0];
        return segmentFlows;
      });

      // 2. Trunk main head loss from ESR to Junction J0
      const trunkHf = hazenWilliamsHeadLoss(PIPE_SPECS.TRUNK_LEN_M, PIPE_SPECS.TRUNK_DIA_MM, trunkFlow);
      const H_J0 = H_tank - trunkHf;
      state.PJ_head = Math.max(0, H_J0 - this.model.JUNCTION_J0_Z);

      // 3. Forwards propagation: calculate pressure head at each node considering ground elevation
      this.nodes.forEach((branch, bIdx) => {
        let currentHead = H_J0;

        branch.forEach((n, i) => {
          const flow = branchFlows[bIdx][i];
          const pipeHf = hazenWilliamsHeadLoss(this.SEG[i], this.DIA[i], flow) * n.res;
          currentHead = currentHead - pipeHf;

          // Physical gauge pressure head = Total Hydraulic Head minus Physical Ground Elevation
          const calculatedP = Math.max(0, currentHead - n.elevation);

          // Under-relaxation for numerical stability
          n.P = 0.6 * n.P + 0.4 * calculatedP;
          n.P_kpa = Number((n.P * 9.80665).toFixed(1));
        });
      });
    }

    return {
      trunkFlow,
      branchFlows,
      isSupply,
      tankHead: H_tank,
    };
  }

  /**
   * Updates water quality dynamics across the network.
   * @param {Object} state Current simulation runtime state
   * @param {number} dtMinutes Elapsed simulation delta in minutes
   */
  updateWaterQuality(state, dtMinutes) {
    const { faults } = state;
    // Source inflow quality (contaminated if rain fault active)
    const targetTankCl = faults.rain ? 0.04 : 0.48; // Chlorine depletion
    const targetTankTu = faults.rain ? 14.5 : 0.95; // Turbidity surge

    // 1st order CSTR mixing inside tank
    const mixRate = 1 - Math.exp(-dtMinutes / 20.0);
    state.cl += (targetTankCl - state.cl) * mixRate;
    state.tu += (targetTankTu - state.tu) * mixRate;

    // Disinfectant decay and turbidity transport down each branch
    this.nodes.forEach((branch) => {
      branch.forEach((n, i) => {
        // Transport lag increases with node distance
        const lagRate = 1 - Math.exp(-dtMinutes / (8.0 + 6.0 * i));
        // Chlorine decays exponentially along pipe distance (wall reaction)
        const decayedCl = state.cl * Math.exp(-0.045 * (i + 1));

        n.cl += (decayedCl - n.cl) * lagRate;
        n.tu += (state.tu - n.tu) * lagRate;
      });
    });
  }

  /**
   * Advances the Elevated Storage Reservoir level.
   * @param {Object} state Current simulation runtime state
   * @param {number} dtMinutes Elapsed simulation delta in minutes
   * @param {number} trunkFlow Inflow demand drawn from ESR (L/min)
   */
  updateTankMassBalance(state, dtMinutes, trunkFlow) {
    // Pump control hysteresis
    if (state.level < 1.2) {
      state.pumpCmd = true;
    } else if (state.level > 3.8) {
      state.pumpCmd = false;
    }

    // Pump execution state
    state.pumpOn = state.pumpCmd && !state.faults.pump;
    state.pumpCurrent = state.pumpOn ? 4.2 + 0.15 * Math.sin(state.simTimeMinutes / 10.0) : 0.0;
    state.pumpFlow = state.pumpOn ? PIPE_SPECS.PUMP_RATED_FLOW_LPM : 0.0;

    // Mass balance: dLevel = (Inflow - Outflow) * dt / TankArea
    // 1 m³ = 1000 Litres, Tank Area = 2.0 m² -> 2000 Litres per metre depth
    const netInflowLpm = state.pumpFlow - trunkFlow;
    const deltaLevel = (netInflowLpm * dtMinutes) / (PIPE_SPECS.TANK_AREA_M2 * 1000);

    state.level = Math.max(0.0, Math.min(PIPE_SPECS.TANK_MAX_RANGE_M, state.level + deltaLevel));
  }
}
