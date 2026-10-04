/**
 * NeerSync 3D Village Digital Twin - Citizen Grievance Simulation
 * Generates citizen reports complying 100% with /contracts/feedback.schema.json.
 */

import { HydraulicEngine } from '../hydraulics/solver-interface.js';

const CHANNELS = ['qr', 'whatsapp', 'ivr', 'app'];
const CATEGORY_MAP = {
  none: 'no_water',
  low: 'low_pressure',
  unsafe: 'dirty_water',
};

const TEXT_TEMPLATES = {
  no_water: [
    'Subah se nal me paani bilkul nahi aa raha hai.',
    'No water supply received during scheduled morning hours.',
    'Tap is completely dry since today morning.',
  ],
  low_pressure: [
    'Nal se paani bahut dheeme beh raha hai, dhaar bahut patli hai.',
    'Very low water pressure at the tap standpost, bucket taking 20 mins.',
    'Pressure is too weak to fill household storage buckets.',
  ],
  dirty_water: [
    'Paani mitti jaisa peela aur badbudaar aa raha hai.',
    'Turbid muddy water coming out from tap after rainfall.',
    'Water quality is unsafe and smells unchlorinated.',
  ],
};

export class CitizenGrievanceSimulator {
  constructor(networkModel) {
    this.model = networkModel;
    this.households = networkModel.households;
    this.feedbackLog = [];
    this.ticketCounter = 1;
  }

  /**
   * Evaluates citizen reporting probabilities based on physical service delivery status.
   * @param {Object} state Current simulation runtime state
   * @param {number} dtMinutes Elapsed minutes
   * @returns {Array} Newly submitted grievance records
   */
  step(state, dtMinutes) {
    const hour = (state.simTimeMinutes / 60) % 24;
    const newRecords = [];

    // Citizens typically notice and report between 06:00 and 22:00
    if (hour < 6 || hour > 22) return newRecords;

    this.households.forEach((node) => {
      const status = HydraulicEngine.getHouseholdStatus(node);

      if (status === 'ok') {
        node.reported = false;
      } else if (!node.reported) {
        // Probability of submitting a grievance per minute of non-functional service
        const reportProb = 0.05 * dtMinutes;
        if (Math.random() < reportProb) {
          node.reported = true;

          const channel = CHANNELS[Math.floor(Math.random() * CHANNELS.length)];
          const category = CATEGORY_MAP[status] || 'other';
          const texts = TEXT_TEMPLATES[category] || ['Problem reported by citizen.'];
          const text = texts[Math.floor(Math.random() * texts.length)];
          const lang = Math.random() > 0.4 ? 'hi' : 'en';

          const ticketId = `FB-20261004-${String(this.ticketCounter++).padStart(4, '0')}`;
          const isoTimestamp = new Date(Date.UTC(2026, 9, 4, 0, Math.floor(state.simTimeMinutes))).toISOString();

          // Approximate Gram Panchayat GPS center coordinates (Meerut region)
          const baseLat = 29.0832;
          const baseLon = 77.7121;
          const lat = Number((baseLat + (node.housePos[2] * 0.0001)).toFixed(6));
          const lon = Number((baseLon + (node.housePos[0] * 0.0001)).toFixed(6));

          const grievance = {
            feedback_id: ticketId,
            fhtc_id: node.fhtc_id,
            channel,
            category,
            lang,
            ts: isoTimestamp,
            text,
            lat,
            lon,
            nodeId: node.id,
            displayTime: this.formatTime(state.simTimeMinutes),
          };

          this.feedbackLog.unshift(grievance);
          newRecords.push(grievance);

          if (this.feedbackLog.length > 20) {
            this.feedbackLog.pop();
          }
        }
      }
    });

    return newRecords;
  }

  formatTime(simMinutes) {
    const totalMinutes = Math.floor(simMinutes % 1440);
    const h = String(Math.floor(totalMinutes / 60)).padStart(2, '0');
    const m = String(totalMinutes % 60).padStart(2, '0');
    return `${h}:${m}`;
  }
}
