/**
 * JalSetu 3D Village Digital Twin - Analytics Panel & JJM Service Index
 * Renders real-time SVG sparklines, Before/After inspection comparison,
 * and the JJM FHTC Service Index (Regularity, Adequacy, Quality, Pressure, Grievance).
 */

export class PanelAnalytics {
  constructor(containerId) {
    this.container = document.getElementById(containerId);

    // Time-series buffers for sparklines (rolling 30 points)
    this.historyLength = 30;
    this.tankLevelHistory = new Array(this.historyLength).fill(3.0);
    this.inflowHistory = new Array(this.historyLength).fill(75.0);
    this.tailPressureHistory = new Array(this.historyLength).fill(12.0);

    this.renderSkeleton();
  }

  renderSkeleton() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="sparkline-group">
        <div class="sparkline-box">
          <div class="sparkline-label">
            <span>Tank Level</span>
            <b id="val-spark-tank">3.0 m</b>
          </div>
          <svg id="svg-spark-tank" viewBox="0 0 160 28" preserveAspectRatio="none"></svg>
        </div>

        <div class="sparkline-box">
          <div class="sparkline-label">
            <span>Bulk Flow</span>
            <b id="val-spark-flow">75 LPM</b>
          </div>
          <svg id="svg-spark-flow" viewBox="0 0 160 28" preserveAspectRatio="none"></svg>
        </div>

        <div class="sparkline-box">
          <div class="sparkline-label">
            <span>Tail Pressure</span>
            <b id="val-spark-pressure">12.0 m</b>
          </div>
          <svg id="svg-spark-pressure" viewBox="0 0 160 28" preserveAspectRatio="none"></svg>
        </div>
      </div>

      <div class="service-index-widget">
        <div class="index-gauge" id="service-index-val">98.4%</div>
        <div class="index-breakdown">
          <div><b>JJM FHTC Service Index</b></div>
          <div style="font-size:10px; color:var(--muted);">0.30Reg + 0.20Adeq + 0.20Qual + 0.15Press + 0.15Griev</div>
        </div>
      </div>

      <div style="display:flex; align-items:center; gap:8px;">
        <button class="btn-sm" id="btn-show-before-after" style="font-size:11px;">
          Before / After Comparison ⚖️
        </button>
      </div>
    `;

    const beforeAfterBtn = this.container.querySelector('#btn-show-before-after');
    if (beforeAfterBtn) {
      beforeAfterBtn.addEventListener('click', () => this.showBeforeAfterModal());
    }
  }

  update(state, hydraulicResults, networkModel) {
    // 1. Shift rolling sparkline arrays
    this.tankLevelHistory.shift();
    this.tankLevelHistory.push(state.level);

    this.inflowHistory.shift();
    this.inflowHistory.push(hydraulicResults.trunkFlow);

    const tailP = networkModel.nodes[1][4].P;
    this.tailPressureHistory.shift();
    this.tailPressureHistory.push(tailP);

    // 2. Render SVG Sparklines
    this.renderSvgPolyline('svg-spark-tank', this.tankLevelHistory, 0, 4.0, '#0284c7');
    this.renderSvgPolyline('svg-spark-flow', this.inflowHistory, 0, 400.0, '#38bdf8');
    this.renderSvgPolyline('svg-spark-pressure', this.tailPressureHistory, 0, 25.0, '#22c55e');

    // Update textual badges
    const valTank = this.container.querySelector('#val-spark-tank');
    const valFlow = this.container.querySelector('#val-spark-flow');
    const valP = this.container.querySelector('#val-spark-pressure');
    if (valTank) valTank.textContent = `${state.level.toFixed(1)} m`;
    if (valFlow) valFlow.textContent = `${Math.round(hydraulicResults.trunkFlow)} LPM`;
    if (valP) valP.textContent = `${tailP.toFixed(1)} m`;

    // 3. Compute JJM FHTC Service Index
    const households = networkModel.households;
    const total = households.length;

    // Regularity (0.30): Is supply available without pump trip
    const regularity = state.pumpOn || state.level > 1.0 ? 1.0 : 0.2;

    // Adequacy (0.20): Ratio of households receiving >10 LPM during supply
    const adequateCount = households.filter(h => (hydraulicResults.isSupply ? h.q >= 10.0 : true)).length;
    const adequacy = adequateCount / total;

    // Quality (0.20): Proportion of households with safe chlorine & turbidity
    const safeQualityCount = households.filter(h => h.cl >= 0.20 && h.tu <= 5.0).length;
    const quality = safeQualityCount / total;

    // Pressure (0.15): Proportion meeting JJM 70 kPa benchmark (~7.14m)
    const goodPressureCount = households.filter(h => (hydraulicResults.isSupply ? h.P >= 7.14 : true)).length;
    const pressure = goodPressureCount / total;

    // Grievance resolution (0.15): Proportion without complaints
    const complaintsCount = households.filter(h => h.reported).length;
    const grievance = 1.0 - (complaintsCount / total);

    const serviceIndex = (
      0.30 * regularity +
      0.20 * adequacy +
      0.20 * quality +
      0.15 * pressure +
      0.15 * grievance
    ) * 100.0;

    const indexValEl = this.container.querySelector('#service-index-val');
    if (indexValEl) {
      indexValEl.textContent = `${serviceIndex.toFixed(1)}%`;
      if (serviceIndex >= 85.0) {
        indexValEl.style.color = 'var(--ok)';
      } else if (serviceIndex >= 65.0) {
        indexValEl.style.color = 'var(--warn)';
      } else {
        indexValEl.style.color = 'var(--bad)';
      }
    }
  }

  renderSvgPolyline(svgId, data, minVal, maxVal, strokeColor) {
    const svg = this.container.querySelector(`#${svgId}`);
    if (!svg) return;

    const width = 160;
    const height = 28;
    const range = maxVal - minVal || 1;

    const points = data.map((val, i) => {
      const x = (i / (data.length - 1)) * width;
      const normalized = Math.max(0, Math.min(1.0, (val - minVal) / range));
      const y = height - (normalized * (height - 6)) - 3;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');

    svg.innerHTML = `
      <polyline
        fill="none"
        stroke="${strokeColor}"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        points="${points}"
      />
    `;
  }

  showBeforeAfterModal() {
    let modal = document.getElementById('before-after-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'before-after-modal';
      modal.style.cssText = `
        position: fixed; top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0, 0, 0, 0.65); backdrop-filter: blur(8px);
        display: flex; align-items: center; justify-content: center; z-index: 100;
      `;
      modal.innerHTML = `
        <div style="background:var(--panel); border:1px solid var(--line); border-radius:12px; max-width:680px; width:90%; padding:24px; box-shadow:var(--shadow-lg);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
            <h2 style="margin:0; font-size:18px;">⚖️ Before vs After: JalSetu Impact</h2>
            <button id="btn-close-modal" style="padding:4px 8px;">✕</button>
          </div>
          <table style="width:100%; border-collapse:collapse; font-size:13px;">
            <thead>
              <tr style="border-bottom:2px solid var(--line); text-align:left;">
                <th style="padding:8px;">Metric</th>
                <th style="padding:8px; color:var(--bad);">Monthly Manual Inspection</th>
                <th style="padding:8px; color:var(--ok);">JalSetu Digital Twin</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom:1px solid var(--line);">
                <td style="padding:8px; font-weight:600;">Outage Discovery</td>
                <td style="padding:8px;">15 to 30 Days (waits for paper complaint)</td>
                <td style="padding:8px; font-weight:600; color:var(--ok);">&lt; 15 Minutes (automatic alert)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--line);">
                <td style="padding:8px; font-weight:600;">Pipe Leak Visibility</td>
                <td style="padding:8px;">Zero visibility (35% physical water lost)</td>
                <td style="padding:8px; font-weight:600; color:var(--ok);">Isolated to branch within 24h</td>
              </tr>
              <tr style="border-bottom:1px solid var(--line);">
                <td style="padding:8px; font-weight:600;">Water Contamination</td>
                <td style="padding:8px;">Grab-sample sent to lab every 3-6 months</td>
                <td style="padding:8px; font-weight:600; color:var(--ok);">Continuous in-line probe telemetry</td>
              </tr>
              <tr style="border-bottom:1px solid var(--line);">
                <td style="padding:8px; font-weight:600;">Household Visibility</td>
                <td style="padding:8px;">Village assumed 100% functional on paper</td>
                <td style="padding:8px; font-weight:600; color:var(--ok);">Granular FHTC status for all 15 houses</td>
              </tr>
              <tr>
                <td style="padding:8px; font-weight:600;">Maintenance Dispatch</td>
                <td style="padding:8px;">Subjective technician callout</td>
                <td style="padding:8px; font-weight:600; color:var(--ok);">Automated administrative escalation</td>
              </tr>
            </tbody>
          </table>
        </div>
      `;
      document.body.appendChild(modal);

      modal.querySelector('#btn-close-modal').addEventListener('click', () => {
        modal.style.display = 'none';
      });
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
      });
    }

    modal.style.display = 'flex';
  }
}
