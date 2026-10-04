/**
 * NeerSync 3D Village Digital Twin - House Inspector Details Overlay
 * Displays comprehensive JJM household service delivery statistics when a user clicks a house.
 */

import { HydraulicEngine } from '../hydraulics/solver-interface.js';

export class HouseInspector {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.selectedNode = null;
  }

  show(node) {
    this.selectedNode = node;
    if (!this.container) return;

    this.container.classList.remove('hidden');
    this.render();
  }

  hide() {
    this.selectedNode = null;
    if (this.container) {
      this.container.classList.add('hidden');
    }
  }

  render() {
    if (!this.container || !this.selectedNode) return;

    const n = this.selectedNode;
    const status = HydraulicEngine.getHouseholdStatus(n);

    const statusBadge = {
      ok: `<span class="inspector-status-badge" style="background:var(--ok-bg); color:var(--ok);">Water OK</span>`,
      low: `<span class="inspector-status-badge" style="background:var(--warn-bg); color:var(--warn);">Low Pressure (&lt;70 kPa)</span>`,
      none: `<span class="inspector-status-badge" style="background:var(--bad-bg); color:var(--bad);">No Water (Dry)</span>`,
      unsafe: `<span class="inspector-status-badge" style="background:var(--unsafe-bg); color:var(--unsafe);">Unsafe Quality</span>`,
    }[status];

    this.container.innerHTML = `
      <div class="inspector-header">
        <div>
          <b>${n.siteLabel}</b>
          <div style="font-size:11px; color:var(--muted);">${n.fhtc_id}</div>
        </div>
        <div>${statusBadge}</div>
      </div>
      <div style="font-size:12px; display:grid; grid-template-columns:1fr 1fr; gap:6px; margin-bottom:8px;">
        <div>Ward: <b>${n.ward}</b></div>
        <div>Elevation: <b>${n.elevation.toFixed(1)} m</b></div>
        <div>Pressure: <b>${n.P.toFixed(1)} m (${n.P_kpa} kPa)</b></div>
        <div>Tap Flow: <b>${n.q.toFixed(1)} LPM</b></div>
        <div>Chlorine: <b>${n.cl.toFixed(2)} mg/L</b></div>
        <div>Turbidity: <b>${n.tu.toFixed(1)} NTU</b></div>
      </div>
      <div style="border-top:1px solid var(--line); padding-top:6px; font-size:11px; color:var(--muted); display:flex; justify-content:space-between; align-items:center;">
        <span>${n.reported ? '⚠️ Citizen grievance registered' : 'No citizen grievances filed'}</span>
        <button id="btn-close-inspector" style="padding:2px 8px; font-size:11px;">Close</button>
      </div>
    `;

    const closeBtn = this.container.querySelector('#btn-close-inspector');
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.hide();
      });
    }
  }
}
