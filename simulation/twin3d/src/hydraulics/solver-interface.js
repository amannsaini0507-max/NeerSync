/**
 * NeerSync 3D Village Digital Twin - Unified Hydraulic Solver Interface
 * Presents a single unified API: solve(state, dt) -> results.
 * Manages the epanet-js Web Worker while keeping the analytical Hazen-Williams
 * tree solver instantly responsive as primary/fallback so rendering never drops frames.
 */

import { HazenWilliamsSolver } from './hazen-williams.js';

export class HydraulicEngine {
  constructor(networkModel) {
    this.model = networkModel;
    this.hwSolver = new HazenWilliamsSolver(networkModel);
    this.worker = null;
    this.workerAvailable = false;
    this.initWorker();
  }

  initWorker() {
    try {
      if (typeof window !== 'undefined' && typeof Worker !== 'undefined') {
        this.worker = new Worker(
          new URL('./epanet-worker.js', import.meta.url),
          { type: 'module' }
        );

        this.worker.onmessage = (e) => {
          if (e.data.type === 'INIT_RESULT') {
            this.workerAvailable = e.data.success;
          }
        };

        this.worker.postMessage({ type: 'INIT' });
      }
    } catch (err) {
      console.warn('[HydraulicEngine] Web Worker not available in this environment. Using Hazen-Williams engine directly.');
      this.workerAvailable = false;
    }
  }

  /**
   * Universal solve method: advances simulation by dtMinutes.
   * @param {Object} state Current simulation runtime state
   * @param {number} dtMinutes Time step increment in minutes
   * @returns {Object} Complete updated hydraulic and quality profile
   */
  step(state, dtMinutes) {
    state.simTimeMinutes += dtMinutes;

    // 1. Solve hydraulics (pressures, flows, head losses)
    const hydraulicResults = this.hwSolver.solve(state);

    // 2. Advance tank mass balance with net flow
    this.hwSolver.updateTankMassBalance(state, dtMinutes, hydraulicResults.trunkFlow);

    // 3. Update water quality mixing and decay
    this.hwSolver.updateWaterQuality(state, dtMinutes);

    // 4. Optionally post async state telemetry to worker if active
    if (this.worker && this.workerAvailable) {
      try {
        this.worker.postMessage({
          type: 'SOLVE',
          payload: {
            simTimeMinutes: state.simTimeMinutes,
            level: state.level,
            faults: state.faults,
          },
        });
      } catch (e) {
        // Safe silent catch
      }
    }

    return {
      trunkFlow: hydraulicResults.trunkFlow,
      branchFlows: hydraulicResults.branchFlows,
      isSupply: hydraulicResults.isSupply,
      tankHead: hydraulicResults.tankHead,
      tankLevel: state.level,
      pumpOn: state.pumpOn,
      pumpCurrent: state.pumpCurrent,
      cl: state.cl,
      tu: state.tu,
    };
  }

  /**
   * Helper to categorize household tap delivery status.
   * @param {Object} node Household node object
   * @returns {'ok'|'low'|'none'|'unsafe'}
   */
  static getHouseholdStatus(node) {
    if (node.P < 3.0) return 'none';
    if (node.P < 7.14) return 'low'; // JJM 70 kPa benchmark (~7.14m)
    if (node.cl < 0.20 || node.tu > 5.0) return 'unsafe';
    return 'ok';
  }
}
