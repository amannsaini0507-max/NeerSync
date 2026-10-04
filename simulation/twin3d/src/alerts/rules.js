/**
 * JalSetu 3D Village Digital Twin - Explainable Alert Rules & Escalation Engine
 * Conforms 100% to /contracts/alert.schema.json.
 * Features 5-minute auto-closure, human-readable reason strings, and time-based administrative escalation.
 */

import { VILLAGE_CONFIG, SENSOR_NODES } from '../config.js';

export class AlertEngine {
  constructor(networkModel) {
    this.model = networkModel;
    this.nodes = networkModel.nodes;
    this.activeAlerts = {};
    this.closedAlerts = [];
    this.alertCounter = 1;
  }

  /**
   * Evaluates network state against JJM operational safety criteria.
   * @param {Object} state Current simulation runtime state
   * @param {Object} hydraulicResults Inflows and pressure metrics
   */
  evaluate(state, hydraulicResults) {
    const rawAlerts = {};

    const addAlert = (key, type, severity, branchScope, fhtcId, reason) => {
      rawAlerts[key] = {
        alert_id: `ALT-20261004-${String(this.alertCounter++).padStart(4, '0')}`,
        type,
        severity,
        scope: {
          gp: VILLAGE_CONFIG.lgd_gp_code,
          branch: branchScope,
          ...(fhtcId ? { fhtc_id: fhtcId } : {})
        },
        reason,
        created_ts: new Date(Date.UTC(2026, 9, 4, 0, Math.floor(state.simTimeMinutes))).toISOString(),
        status: 'active',
        branchKey: branchScope,
      };
    };

    // 1. Pump Trip Outage: Commanded ON but current is 0A for >= 8 minutes
    state.pfm = (state.pumpCmd && !state.pumpOn) ? (state.pfm || 0) + 1 : 0;
    if (state.pfm >= 8) {
      addAlert(
        'pump',
        'no_supply',
        'high',
        'Pump House Headworks',
        null,
        `Pump is commanded ON but motor current is ${state.pumpCurrent.toFixed(1)} A for ${state.pfm} min. Tank level is ${state.level.toFixed(1)} m and falling.`
      );
    }

    // 2. Reservoir Depletion (ESR empty)
    const dryHouseholds = this.model.households.filter(n => n.P < 3.0).length;
    if (state.level < 0.5) {
      addAlert(
        'esr',
        'no_supply',
        'high',
        'Elevated Storage Reservoir',
        null,
        `Tank level is ${state.level.toFixed(1)} m. ${dryHouseholds} of ${VILLAGE_CONFIG.total_households} households have no water.`
      );
    }

    // 3. Branch Discrepancies: Pipe burst, Incipient Leak, and Tail-End Choke
    this.nodes.forEach((branch, bIdx) => {
      const branchId = this.model.nodes[bIdx][0].branchId;
      const measInflow = hydraulicResults.branchFlows[bIdx][0];
      const expectedDemand = hydraulicResults.isSupply ? (5 * 15.0) : 0.0;
      const excessLoss = measInflow - expectedDemand;
      const reportedCount = branch.filter(n => n.reported).length;
      const tailNode = branch[4];
      const tailHead = tailNode.P;

      // Leak or Burst detection via mass balance discrepancy
      if (excessLoss > 8.0) {
        // Find node with highest emitter loss
        let bestLeakNodeIdx = 0;
        branch.forEach((n, i) => {
          if (n.leak > branch[bestLeakNodeIdx].leak) bestLeakNodeIdx = i;
        });

        const isBurst = excessLoss > 60.0;
        addAlert(
          `leak_${branchId}`,
          'leakage',
          isBurst ? 'high' : 'medium',
          `Branch ${branchId}`,
          branch[bestLeakNodeIdx].fhtc_id,
          `Branch ${branchId} inflow is ${Math.round(measInflow)} lpm but its houses need about ${Math.round(expectedDemand)} lpm, so ${Math.round(excessLoss)} lpm is lost. Likely near ${branch[bestLeakNodeIdx].id}. ${reportedCount} of 5 households have reported.`
        );
      } else if (hydraulicResults.isSupply && tailHead < 7.14 && state.level >= 0.5) {
        // Low pressure / choked pipeline
        addAlert(
          `lp_${branchId}`,
          'low_pressure',
          'medium',
          `Branch ${branchId}`,
          tailNode.fhtc_id,
          `Tail-end sensor on Branch ${branchId} reads ${tailHead.toFixed(1)} m (${tailNode.P_kpa} kPa, benchmark is 70 kPa) while the tank has water. Inflow is only ${Math.round(measInflow)} lpm, so the pipe is probably choked.`
        );
      }
    });

    // 4. Water Quality Anomaly
    if (state.cl < 0.20 || state.tu > 5.0) {
      addAlert(
        'wq',
        'quality',
        'high',
        'Tank Gravity Outlet Staging',
        null,
        `Chlorine is ${state.cl.toFixed(2)} mg/L (minimum 0.20) and turbidity is ${state.tu.toFixed(1)} NTU (maximum 5.0) at the tank outlet. Likely runoff after heavy rain.`
      );
    }

    // Merge active alerts and track duration
    Object.keys(rawAlerts).forEach((k) => {
      if (this.activeAlerts[k]) {
        // Update existing alert
        Object.assign(this.activeAlerts[k], rawAlerts[k]);
        this.activeAlerts[k].miss = 0;
      } else {
        // New incident
        this.activeAlerts[k] = {
          ...rawAlerts[k],
          t0: state.simTimeMinutes,
          miss: 0,
        };
      }
    });

    // Check for cleared incidents (5-minute auto-closure rule)
    Object.keys(this.activeAlerts).forEach((k) => {
      if (!rawAlerts[k]) {
        this.activeAlerts[k].miss += 1;
        if (this.activeAlerts[k].miss >= 5) {
          const closed = this.activeAlerts[k];
          this.closedAlerts.unshift({
            ...closed,
            status: 'resolved',
            closed_ts: new Date(Date.UTC(2026, 9, 4, 0, Math.floor(state.simTimeMinutes))).toISOString(),
            message: `${this.formatTime(state.simTimeMinutes)} ${closed.type.replace('_', ' ').toUpperCase()} on ${closed.scope.branch} closed automatically (system normal for 5 min)`,
          });
          if (this.closedAlerts.length > 5) this.closedAlerts.pop();
          delete this.activeAlerts[k];
        }
      }
    });

    return {
      active: Object.values(this.activeAlerts),
      closed: this.closedAlerts,
    };
  }

  /**
   * Computes JJM administrative escalation tier by open duration.
   * @param {Object} alert Alert incident
   * @param {number} currentTimeMinutes Current simulation time in minutes
   * @returns {string} Human-readable escalation tier
   */
  static getEscalation(alert, currentTimeMinutes) {
    const ageMinutes = currentTimeMinutes - alert.t0;
    if (ageMinutes < 30) return 'Jal Mitra notified';
    if (ageMinutes < 120) return 'Escalated to Village Water & Sanitation Committee (VWSC)';
    if (ageMinutes < 360) return 'Escalated to Junior Engineer (JE)';
    return 'Escalated to Executive Engineer (EE)';
  }

  formatTime(simMinutes) {
    const totalMinutes = Math.floor(simMinutes % 1440);
    const h = String(Math.floor(totalMinutes / 60)).padStart(2, '0');
    const m = String(totalMinutes % 60).padStart(2, '0');
    return `${h}:${m}`;
  }
}
