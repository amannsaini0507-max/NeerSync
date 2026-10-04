/**
 * JalSetu 3D Village Digital Twin - Right Operational Panel
 * Displays live sensor telemetry cards, explainable alert incidents with "Focus" buttons,
 * citizen grievance log, and MQTT streaming export.
 */

import { AlertEngine } from '../alerts/rules.js';

export class PanelRight {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.onFocusAlert = options.onFocusAlert || (() => {});
    this.onDownloadBundle = options.onDownloadBundle || (() => {});
    this.mqttStatus = 'Offline Mock Mode';

    this.renderSkeleton();
  }

  renderSkeleton() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="sensor-card">
        <h2>Live IoT Sensors</h2>
        <div id="tank-gauge-slot"></div>
        <div id="pump-quality-slot" style="font-size:12px; margin:8px 0; color:var(--muted);"></div>
        <table class="sensor-table">
          <thead>
            <tr>
              <th>Branch</th>
              <th>Inflow</th>
              <th>Tail P</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody id="branch-table-body"></tbody>
        </table>
      </div>

      <div class="section-card">
        <h2>
          Active Incident Alerts
          <span id="alert-count-badge" class="inspector-status-badge" style="background:var(--ok-bg); color:var(--ok);">0 Active</span>
        </h2>
        <div id="alerts-list">
          <p style="font-size:12px; color:var(--muted); margin:4px 0;">No active alerts. All systems normal.</p>
        </div>
      </div>

      <div class="section-card">
        <h2>Citizen Grievances</h2>
        <div id="grievance-feed" style="max-height:160px; overflow-y:auto; font-size:12px; color:var(--muted);">
          <p style="margin:4px 0;">No complaints reported today.</p>
        </div>
      </div>

      <div class="section-card" style="padding:10px;">
        <div style="display:flex; justify-content:space-between; align-items:center; font-size:11px; color:var(--muted); margin-bottom:8px;">
          <span>MQTT WebSocket:</span>
          <b id="mqtt-status-tag" style="color:var(--ok);">${this.mqttStatus}</b>
        </div>
        <button class="btn-block btn-sm" id="btn-export-bundle">
          Download Contracts JSON Bundle
        </button>
      </div>
    `;

    const exportBtn = this.container.querySelector('#btn-export-bundle');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => this.onDownloadBundle());
    }
  }

  updateSensors(state, hydraulicResults, networkModel) {
    const tankSlot = this.container.querySelector('#tank-gauge-slot');
    const pqSlot = this.container.querySelector('#pump-quality-slot');
    const tbody = this.container.querySelector('#branch-table-body');

    if (tankSlot) {
      const pct = Math.min(100, Math.round((state.level / 4.0) * 100));
      tankSlot.innerHTML = `
        <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px;">
          <span>Elevated Tank Level: <b>${state.level.toFixed(1)} m</b> (50k L)</span>
          <b>${pct}%</b>
        </div>
        <div class="tank-gauge-bar">
          <div class="tank-gauge-fill" style="width:${pct}%;"></div>
        </div>
      `;
    }

    if (pqSlot) {
      const pumpStateText = state.pumpOn
        ? `<b style="color:var(--ok);">Running (${state.pumpCurrent.toFixed(1)} A)</b>`
        : state.pumpCmd
        ? `<b style="color:var(--bad);">FAULT (Tripped)</b>`
        : `<span>Off (Idle)</span>`;

      pqSlot.innerHTML = `
        <div>Pump: ${pumpStateText} | Inflow: <b>${Math.round(hydraulicResults.trunkFlow)} lpm</b></div>
        <div style="margin-top:2px;">Chlorine: <b>${state.cl.toFixed(2)} mg/L</b> | Turbidity: <b>${state.tu.toFixed(1)} NTU</b></div>
      `;
    }

    if (tbody) {
      const rows = networkModel.nodes.map((branch, bi) => {
        const branchId = branch[0].branchId;
        const inflow = Math.round(hydraulicResults.branchFlows[bi][0]);
        const tailHead = branch[4].P.toFixed(1);
        const tailKpa = branch[4].P_kpa;
        const okCount = branch.filter(n => n.P >= 7.14).length;

        return `
          <tr>
            <td><b>${branchId}</b></td>
            <td>${inflow} lpm</td>
            <td>${tailHead}m (${tailKpa}k)</td>
            <td>${okCount}/5 OK</td>
          </tr>
        `;
      }).join('');
      tbody.innerHTML = rows;
    }
  }

  updateAlerts(alertsList, currentTimeMinutes) {
    const alertsContainer = this.container.querySelector('#alerts-list');
    const countBadge = this.container.querySelector('#alert-count-badge');
    if (!alertsContainer) return;

    if (countBadge) {
      countBadge.textContent = `${alertsList.length} Active`;
      countBadge.style.backgroundColor = alertsList.length > 0 ? 'var(--bad-bg)' : 'var(--ok-bg)';
      countBadge.style.color = alertsList.length > 0 ? 'var(--bad)' : 'var(--ok)';
    }

    if (alertsList.length === 0) {
      alertsContainer.innerHTML = '<p style="font-size:12px; color:var(--muted); margin:4px 0;">No active alerts. All systems normal.</p>';
      return;
    }

    // Sort by severity (high first)
    const sorted = [...alertsList].sort((a, b) => (a.severity === 'high' ? 0 : 1) - (b.severity === 'high' ? 0 : 1));

    alertsContainer.innerHTML = sorted.map((al) => {
      const escalationText = AlertEngine.getEscalation(al, currentTimeMinutes);
      const openMins = Math.round(currentTimeMinutes - al.t0);

      return `
        <div class="alert-card ${al.severity}">
          <div class="alert-card-header">
            <span class="alert-type">${al.type.replace('_', ' ').toUpperCase()}</span>
            <span class="alert-scope">${al.scope.branch}</span>
          </div>
          <p class="alert-reason">${al.reason}</p>
          <div class="alert-footer">
            <span>${escalationText} (${openMins}m open)</span>
            <button class="btn-focus" data-focus-scope="${al.scope.branch}">Focus 🎯</button>
          </div>
        </div>
      `;
    }).join('');

    // Attach click listeners to Focus buttons
    alertsContainer.querySelectorAll('[data-focus-scope]').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.onFocusAlert(btn.dataset.focusScope);
      });
    });
  }

  updateGrievances(feed) {
    const container = this.container.querySelector('#grievance-feed');
    if (!container) return;

    if (!feed || feed.length === 0) {
      container.innerHTML = '<p style="margin:4px 0;">No complaints reported today.</p>';
      return;
    }

    container.innerHTML = feed.slice(0, 6).map(item => `
      <div style="border-bottom:1px solid var(--line); padding:4px 0;">
        <div style="display:flex; justify-content:space-between; font-weight:600; font-size:11px;">
          <span>${item.displayTime} ${item.nodeId} (${item.channel.toUpperCase()})</span>
          <span style="color:var(--bad);">${item.category.replace('_', ' ')}</span>
        </div>
        <div style="color:var(--ink); font-style:italic;">"${item.text}"</div>
      </div>
    `).join('');
  }

  setMqttStatus(statusText, isConnected) {
    this.mqttStatus = statusText;
    const tag = this.container?.querySelector('#mqtt-status-tag');
    if (tag) {
      tag.textContent = statusText;
      tag.style.color = isConnected ? 'var(--ok)' : 'var(--warn)';
    }
  }
}
