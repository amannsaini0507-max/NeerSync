// JalSetu Platform Client Bundle (Jal Jeevan Mission Har Ghar Jal)
(function () {
  'use strict';

  // --- I18N DICTIONARIES ---
  const I18N = {
    en: {
      dashboard: "GP Dashboard",
      alerts: "Alerts & Escalation",
      qr: "1-Tap QR Tap",
      feedback: "Citizen Grievance",
      sync: "IMIS Sync",
      online: "● Online",
      offline: "○ Offline (Outbox Active)",
      water_came: "Water Came",
      water_came_sub: "Water supplied successfully",
      water_not_came: "No Water",
      water_not_came_sub: "Water did not arrive today",
      voice_input: "🎙️ Speak Note",
      listening: "Listening...",
      submit: "Submit Grievance",
      refresh: "Refresh Data",
      run_escalation: "⚡ Run Escalation Check",
      push_imis: "🚀 Push Telemetry to IMIS",
      sync_sujal: "⭐ Sync Sujal Gaon Certification"
    },
    hi: {
      dashboard: "ग्राम पंचायत डैशबोर्ड",
      alerts: "अलर्ट और समाधान",
      qr: "क्यूआर त्वरित पुष्टि",
      feedback: "नागरिक शिकायत",
      sync: "IMIS सिंक",
      online: "● ऑनलाइन",
      offline: "○ ऑफलाइन (आउटबॉक्स सक्रिय)",
      water_came: "पानी आया",
      water_came_sub: "जल की आपूर्ति सुचारू रूप से हुई",
      water_not_came: "पानी नहीं आया",
      water_not_came_sub: "आज नल में जल नहीं आया",
      voice_input: "🎙️ बोलकर बताएं",
      listening: "सुन रहे हैं...",
      submit: "शिकायत दर्ज करें",
      refresh: "डेटा ताज़ा करें",
      run_escalation: "⚡ एस्केलेशन जांच चलाएं",
      push_imis: "🚀 IMIS में डेटा भेजें",
      sync_sujal: "⭐ सुजल गांव रेटिंग सिंक करें"
    },
    mr: {
      dashboard: "ग्रामपंचायत डॅशबोर्ड",
      alerts: "इशारे आणि निवारण",
      qr: "क्यूआर त्वरित नोंद",
      feedback: "नागरिक तक्रार",
      sync: "IMIS समक्रमण",
      online: "● ऑनलाइन",
      offline: "○ ऑफलाइन (आऊटबॉक्स कार्यरत)",
      water_came: "पाणी आले",
      water_came_sub: "पाणी पुरवठा सुरळीत झाला",
      water_not_came: "पाणी नाही आले",
      water_not_came_sub: "आज पाणी पुरवठा झाला नाही",
      voice_input: "🎙️ बोलून सांगा",
      listening: "ऐकत आहे...",
      submit: "तक्रार नोंदवा",
      refresh: "माहिती ताजी करा",
      run_escalation: "⚡ एस्केलेशन तपासा",
      push_imis: "🚀 IMIS मध्ये पाठवा",
      sync_sujal: "⭐ सुजल गाव रेटिंग सिंक करा"
    }
  };

  let currentLang = localStorage.getItem('jalsetu_lang') || 'en';
  let currentPage = 'dashboard';
  let mapInstance = null;

  function t(key) {
    return (I18N[currentLang] && I18N[currentLang][key]) || (I18N.en[key] || key);
  }

  // --- OFFLINE OUTBOX SYSTEM ---
  function getOutbox() {
    try {
      return JSON.parse(localStorage.getItem('jalsetu_outbox') || '[]');
    } catch (e) {
      return [];
    }
  }

  function saveOutbox(items) {
    localStorage.setItem('jalsetu_outbox', JSON.stringify(items));
    updateOfflineStatus();
  }

  function queueOffline(url, method, body) {
    const outbox = getOutbox();
    outbox.push({ id: Date.now(), url, method, body, ts: new Date().toISOString() });
    saveOutbox(outbox);
    showNotification('Saved to offline outbox. Will sync automatically when connected.', 'warning');
  }

  async function flushOutbox() {
    if (!navigator.onLine) return;
    const outbox = getOutbox();
    if (outbox.length === 0) return;

    let remaining = [];
    for (const item of outbox) {
      try {
        await fetch(item.url, {
          method: item.method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item.body)
        });
      } catch (err) {
        remaining.push(item);
      }
    }
    saveOutbox(remaining);
    if (remaining.length < outbox.length) {
      showNotification(`Synced ${outbox.length - remaining.length} offline records to server!`, 'success');
    }
  }

  function updateOfflineStatus() {
    const badge = document.getElementById('offline-badge');
    if (!badge) return;
    const outbox = getOutbox();
    if (navigator.onLine) {
      badge.className = 'offline-pill online';
      badge.textContent = outbox.length > 0 ? `● Online (${outbox.length} pending sync)` : t('online');
    } else {
      badge.className = 'offline-pill offline';
      badge.textContent = `${t('offline')} (${outbox.length})`;
    }
  }

  window.addEventListener('online', () => {
    updateOfflineStatus();
    flushOutbox();
  });
  window.addEventListener('offline', updateOfflineStatus);

  function showNotification(text, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.style.position = 'fixed';
    alertDiv.style.bottom = '20px';
    alertDiv.style.right = '20px';
    alertDiv.style.padding = '12px 20px';
    alertDiv.style.borderRadius = '8px';
    alertDiv.style.color = '#fff';
    alertDiv.style.fontWeight = '600';
    alertDiv.style.fontSize = '14px';
    alertDiv.style.zIndex = '9999';
    alertDiv.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    alertDiv.style.background = type === 'success' ? '#16a34a' : type === 'warning' ? '#d97706' : type === 'error' ? '#dc2626' : '#0284c7';
    alertDiv.textContent = text;
    document.body.appendChild(alertDiv);
    setTimeout(() => alertDiv.remove(), 4000);
  }

  // --- API HELPER ---
  async function apiCall(endpoint, method = 'GET', body = null) {
    if (!navigator.onLine && method !== 'GET') {
      queueOffline(endpoint, method, body);
      return { offline: true };
    }
    const opts = {
      method,
      headers: { 'Content-Type': 'application/json' }
    };
    if (body) opts.body = JSON.stringify(body);

    const res = await fetch(endpoint, opts);
    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: res.statusText }));
      throw new Error(err.detail || 'API Error');
    }
    return res.json();
  }

  // --- VOICE INPUT HELPER ---
  function startVoiceRecognition(onResult, btnElement) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      // Simulated voice recognition for environments without Speech API
      const samples = currentLang === 'hi'
        ? ["नल में 2 दिन से पानी नहीं आया है", "पानी बहुत गंदा और मटमैला आ रहा है", "पाइपलाइन में बड़ा लीकेज है"]
        : ["No water for 2 days", "Dirty turbid water from tap", "Pipeline leaking near school"];
      const randomText = samples[Math.floor(Math.random() * samples.length)];
      onResult(randomText);
      showNotification('Voice simulated: "' + randomText + '"', 'info');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = currentLang === 'hi' ? 'hi-IN' : currentLang === 'mr' ? 'mr-IN' : 'en-IN';
    recognition.interimResults = false;

    if (btnElement) {
      btnElement.textContent = t('listening');
      btnElement.style.background = '#fee2e2';
      btnElement.style.color = '#991b1b';
    }

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };

    recognition.onend = () => {
      if (btnElement) {
        btnElement.textContent = t('voice_input');
        btnElement.style.background = '#f1f5f9';
        btnElement.style.color = '#334155';
      }
    };

    recognition.onerror = () => {
      recognition.onend();
    };

    recognition.start();
  }

  // --- PAGE RENDERERS ---

  // 1. GP Dashboard
  async function renderDashboard() {
    const main = document.getElementById('main-content');
    main.innerHTML = `
      <div class="card" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <div>
          <span style="font-size: 11px; font-weight: 700; color: #0284c7; text-transform: uppercase;">Gram Panchayat Water Security Dashboard</span>
          <h1 style="margin: 4px 0 0 0; font-size: 24px; color: #0f172a;">GP Badepur (LGD: 245123)</h1>
          <p style="margin: 4px 0 0 0; color: #64748b; font-size: 13px;">Meerut District • Uttar Pradesh | Jal Jeevan Mission Har Ghar Jal</p>
        </div>
        <div style="display: flex; gap: 10px;">
          <button id="btn-refresh-dashboard" class="btn btn-secondary">🔄 ${t('refresh')}</button>
          <button id="btn-goto-sync" class="btn btn-primary">IMIS Gateway ↗</button>
        </div>
      </div>

      <!-- KPI Grid -->
      <div class="grid-kpi">
        <!-- Service Index -->
        <div class="card" style="background: linear-gradient(135deg, #0284c7, #0369a1); color: #fff;">
          <div style="font-size: 12px; text-transform: uppercase; opacity: 0.9; font-weight: 600;">FHTC Service Index (0-100)</div>
          <div style="display: flex; align-items: baseline; gap: 6px; margin: 10px 0;">
            <span id="kpi-service-index" style="font-size: 44px; font-weight: 800;">85</span>
            <span style="font-size: 18px; opacity: 0.8;">/ 100</span>
          </div>
          <div style="font-size: 12px; background: rgba(255,255,255,0.2); padding: 4px 8px; borderRadius: 4px; display: inline-block;">
            ⭐ Fully Functional Village
          </div>
        </div>

        <!-- ESR Level -->
        <div class="card">
          <div style="font-size: 12px; color: #64748b; font-weight: 600;">OVERHEAD TANK (ESR)</div>
          <div style="margin: 8px 0;"><span style="font-size: 32px; font-weight: 700; color: #0f172a;">342</span> <span style="color:#64748b; font-size:14px;">cm</span></div>
          <div style="width: 100%; background: #e2e8f0; height: 8px; border-radius: 4px; overflow: hidden;">
            <div style="width: 85%; background: #0284c7; height: 100%;"></div>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 11px; margin-top: 6px; color: #64748b;">
            <span>Cap: 50,000 L</span>
            <span style="color: #16a34a; font-weight: 600;">85% Full</span>
          </div>
        </div>

        <!-- Tail-End Pressure -->
        <div class="card">
          <div style="font-size: 12px; color: #64748b; font-weight: 600;">TAIL-END PRESSURE</div>
          <div style="margin: 8px 0;"><span style="font-size: 32px; font-weight: 700; color: #16a34a;">88.5</span> <span style="color:#64748b; font-size:14px;">kPa</span></div>
          <div style="font-size: 11px; color: #166534; font-weight: 500;">Target: ≥ 70 kPa • Adequate Flow</div>
        </div>

        <!-- Quality -->
        <div class="card">
          <div style="font-size: 12px; color: #64748b; font-weight: 600;">POTABILITY (IS 10500)</div>
          <div style="margin: 8px 0; font-size: 13px;">
            <div>Turbidity: <strong>1.8 NTU</strong> <span style="color: #16a34a;">✓</span></div>
            <div>Chlorine: <strong>0.35 mg/L</strong> <span style="color: #16a34a;">✓</span></div>
          </div>
          <div style="font-size: 11px; color: #166534; font-weight: 600;">Safe Drinking Water</div>
        </div>
      </div>

      <!-- GIS Map & Outages Grid -->
      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 20px; margin-bottom: 24px;">
        <div class="card" style="padding: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <h2 style="font-size: 16px; margin: 0; color: #0f172a;">🗺️ GP Badepur GIS Network Map</h2>
            <span style="font-size: 12px; color: #64748b;">50 FHTCs • 4 Habitations • 5 IoT Nodes</span>
          </div>
          <div id="gis-map-container" style="height: 400px; width: 100%; border-radius: 8px; background: #e2e8f0;"></div>
        </div>

        <div class="card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <h2 style="font-size: 16px; margin: 0; color: #0f172a;">🚨 Active Alerts</h2>
            <button id="btn-view-all-alerts" style="background: none; border: none; color: #0284c7; font-weight: 600; font-size: 12px; cursor: pointer;">View All ↗</button>
          </div>
          <div id="dashboard-alerts-list">
            <div style="text-align: center; padding: 24px; color: #64748b; font-size: 13px;">Loading alerts...</div>
          </div>
        </div>
      </div>

      <!-- Service Index Formula Breakdown -->
      <div class="card">
        <h3 style="font-size: 15px; margin: 0 0 16px 0; color: #1e293b;">JJM FHTC Service Index Component Weights</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px;">
          <div style="border-left: 4px solid #0284c7; padding-left: 10px;">
            <div style="font-size: 11px; color: #64748b;">Regularity (30%)</div>
            <div id="kpi-reg" style="font-size: 18px; font-weight: 700; color: #0f172a;">90%</div>
            <div style="font-size: 11px; color: #16a34a;">Daily scheduled supply</div>
          </div>
          <div style="border-left: 4px solid #10b981; padding-left: 10px;">
            <div style="font-size: 11px; color: #64748b;">Adequacy (20%)</div>
            <div id="kpi-ade" style="font-size: 18px; font-weight: 700; color: #0f172a;">82%</div>
            <div style="font-size: 11px; color: #16a34a;">55 LPCD per capita</div>
          </div>
          <div style="border-left: 4px solid #8b5cf6; padding-left: 10px;">
            <div style="font-size: 11px; color: #64748b;">Quality (20%)</div>
            <div id="kpi-qua" style="font-size: 18px; font-weight: 700; color: #0f172a;">88%</div>
            <div style="font-size: 11px; color: #16a34a;">IS 10500 Potable</div>
          </div>
          <div style="border-left: 4px solid #f59e0b; padding-left: 10px;">
            <div style="font-size: 11px; color: #64748b;">Pressure (15%)</div>
            <div id="kpi-prs" style="font-size: 18px; font-weight: 700; color: #0f172a;">76%</div>
            <div style="font-size: 11px; color: #d97706;">≥ 70 kPa at tail end</div>
          </div>
          <div style="border-left: 4px solid #ec4899; padding-left: 10px;">
            <div style="font-size: 11px; color: #64748b;">Grievance (15%)</div>
            <div id="kpi-grv" style="font-size: 18px; font-weight: 700; color: #0f172a;">85%</div>
            <div style="font-size: 11px; color: #16a34a;">SLA &lt; 24h resolution</div>
          </div>
        </div>
      </div>
    `;

    // Initialize Leaflet Map
    if (typeof L !== 'undefined') {
      try {
        if (mapInstance) {
          mapInstance.remove();
        }
        mapInstance = L.map('gis-map-container').setView([28.9845, 77.7080], 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors | JalSetu GIS'
        }).addTo(mapInstance);

        // ESR Tank
        L.circleMarker([28.9860, 77.7082], { radius: 10, color: '#0284c7', fillColor: '#38bdf8', fillOpacity: 0.9 })
          .bindPopup('<b>Overhead Tank (ESR)</b><br>Level: 342 cm (85% full)')
          .addTo(mapInstance);

        // Solar Pump
        L.circleMarker([28.9845, 77.7064], { radius: 9, color: '#16a34a', fillColor: '#4ade80', fillOpacity: 0.9 })
          .bindPopup('<b>Pumping Station Node</b><br>Current: 14.2 A (Running)')
          .addTo(mapInstance);

        // Tail End Pressure Node
        L.circleMarker([28.9820, 77.7120], { radius: 8, color: '#d97706', fillColor: '#fbbf24', fillOpacity: 0.9 })
          .bindPopup('<b>Tail-End Pressure Node</b><br>Pressure: 88.5 kPa')
          .addTo(mapInstance);

        // FHTC Clusters
        const clusters = [
          { name: "Badepur Khas (15 Taps)", coords: [28.9870, 77.7050] },
          { name: "Harijan Basti (12 Taps)", coords: [28.9835, 77.7095] },
          { name: "Patti Chuhar (13 Taps)", coords: [28.9810, 77.7040] },
          { name: "Nai Basti (10 Taps)", coords: [28.9855, 77.7130] }
        ];
        clusters.forEach(c => {
          L.circleMarker(c.coords, { radius: 6, color: '#16a34a', fillColor: '#86efac', fillOpacity: 0.7 })
            .bindPopup(`<b>${c.name}</b><br>Status: Functional`)
            .addTo(mapInstance);
        });
      } catch (err) {
        console.warn('Map initialization failed:', err);
      }
    }

    // Attach Event Handlers
    document.getElementById('btn-refresh-dashboard').onclick = renderDashboard;
    document.getElementById('btn-goto-sync').onclick = () => navigateTo('sync');
    document.getElementById('btn-view-all-alerts').onclick = () => navigateTo('alerts');

    // Fetch live service index & alerts
    try {
      const idxRes = await apiCall('/api/v1/analytics/fhtc-index?lgd_gp_code=245123');
      if (idxRes && idxRes.fhtc_service_index !== undefined) {
        document.getElementById('kpi-service-index').textContent = Math.round(idxRes.fhtc_service_index);
        document.getElementById('kpi-reg').textContent = Math.round(idxRes.regularity_score) + '%';
        document.getElementById('kpi-ade').textContent = Math.round(idxRes.adequacy_score) + '%';
        document.getElementById('kpi-qua').textContent = Math.round(idxRes.quality_score) + '%';
        document.getElementById('kpi-prs').textContent = Math.round(idxRes.pressure_score) + '%';
        document.getElementById('kpi-grv').textContent = Math.round(idxRes.grievance_score) + '%';
      }
    } catch (e) {
      console.warn('Using default demo metrics');
    }

    try {
      const alerts = await apiCall('/api/v1/alerts?lgd_gp_code=245123');
      const listDiv = document.getElementById('dashboard-alerts-list');
      const active = alerts.filter(a => a.status !== 'resolved' && a.status !== 'closed');
      if (active.length === 0) {
        listDiv.innerHTML = `
          <div style="text-align: center; padding: 24px; color: #64748b;">
            <div style="font-size: 28px;">✅</div>
            <div style="font-weight: 600; margin-top: 4px;">No Active Outages</div>
            <div style="font-size: 11px;">All village zones operating normally.</div>
          </div>
        `;
      } else {
        listDiv.innerHTML = active.map(a => `
          <div style="padding: 10px; border-radius: 6px; background: #fef2f2; border: 1px solid #fee2e2; margin-bottom: 8px;">
            <div style="display: flex; justify-content: space-between; font-size: 11px;">
              <span class="badge badge-danger">${a.severity} • ${a.type}</span>
              <span style="color: #64748b;">${a.escalation_level || 'Jal Mitra'}</span>
            </div>
            <div style="font-size: 12px; font-weight: 600; color: #991b1b; margin-top: 4px;">${a.reason}</div>
          </div>
        `).join('');
      }
    } catch (e) {
      // Ignore
    }
  }

  // 2. Alerts & Escalation View
  async function renderAlerts() {
    const main = document.getElementById('main-content');
    main.innerHTML = `
      <div class="card" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <div>
          <h1 style="margin: 0; font-size: 22px; color: #0f172a;">🚨 Alert Engine & Escalation Matrix</h1>
          <p style="margin: 4px 0 0 0; font-size: 13px; color: #64748b;">SLA matrix: Jal Mitra (T0) → VWSC (+4h) → Junior Engineer (+24h) → Executive Engineer (+48h)</p>
        </div>
        <div style="display: flex; gap: 10px;">
          <button id="btn-trigger-esc-run" class="btn btn-primary">${t('run_escalation')}</button>
          <button id="btn-refresh-alerts" class="btn btn-secondary">🔄 ${t('refresh')}</button>
        </div>
      </div>

      <!-- SLA Matrix Banner -->
      <div class="card" style="display: flex; justify-content: space-around; align-items: center; text-align: center; padding: 14px;">
        <div>
          <div style="font-size: 20px;">🔧</div>
          <div style="font-size: 13px; font-weight: 700;">Jal Mitra</div>
          <div style="font-size: 11px; color: #16a34a;">Immediate (T0)</div>
        </div>
        <div>➡️</div>
        <div>
          <div style="font-size: 20px;">🏛️</div>
          <div style="font-size: 13px; font-weight: 700;">VWSC Committee</div>
          <div style="font-size: 11px; color: #ea580c;">+4 Hours</div>
        </div>
        <div>➡️</div>
        <div>
          <div style="font-size: 20px;">👷</div>
          <div style="font-size: 13px; font-weight: 700;">Junior Engineer</div>
          <div style="font-size: 11px; color: #dc2626;">+24 Hours</div>
        </div>
        <div>➡️</div>
        <div>
          <div style="font-size: 20px;">👔</div>
          <div style="font-size: 13px; font-weight: 700;">Executive Engineer</div>
          <div style="font-size: 11px; color: #991b1b;">+48 Hours</div>
        </div>
      </div>

      <!-- Alerts Table -->
      <div class="card" style="padding: 0; overflow: hidden;">
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Severity / Type</th>
                <th>Reason & Location</th>
                <th>Current Escalation</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="alerts-tbody">
              <tr><td colspan="5" style="text-align: center; padding: 24px; color: #64748b;">Loading alerts...</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    `;

    document.getElementById('btn-refresh-alerts').onclick = renderAlerts;
    document.getElementById('btn-trigger-esc-run').onclick = async () => {
      try {
        const res = await apiCall('/api/v1/alerts/run-escalations', 'POST');
        showNotification(`Escalation cycle ran: ${res.escalated_alerts || 0} alerts evaluated.`, 'success');
        renderAlerts();
      } catch (e) {
        showNotification('Escalation error: ' + e.message, 'error');
      }
    };

    try {
      const alerts = await apiCall('/api/v1/alerts?lgd_gp_code=245123');
      const tbody = document.getElementById('alerts-tbody');
      if (alerts.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 24px; color: #64748b;">No active incidents recorded.</td></tr>`;
        return;
      }
      tbody.innerHTML = alerts.map(a => {
        const isPending = a.status === 'pending_citizen_confirmation';
        const isResolved = a.status === 'resolved' || a.status === 'closed';
        return `
          <tr>
            <td>
              <span class="badge ${a.severity === 'high' ? 'badge-danger' : a.severity === 'medium' ? 'badge-warning' : 'badge-info'}">
                ${a.severity}
              </span>
              <div style="font-weight: 700; margin-top: 4px; color: #0f172a;">${a.type}</div>
            </td>
            <td>
              <div style="font-weight: 500;">${a.reason}</div>
              <div style="font-size: 11px; color: #64748b; margin-top: 2px;">Zone: ${a.scope?.branch || 'Village Zone'}</div>
            </td>
            <td>
              <span class="badge badge-info">${a.escalation_level || 'Jal Mitra'}</span>
            </td>
            <td>
              <span class="badge ${isResolved ? 'badge-success' : isPending ? 'badge-warning' : 'badge-danger'}">
                ${a.status}
              </span>
            </td>
            <td>
              ${!isResolved && !isPending ? `
                <button class="btn btn-primary" style="padding: 6px 10px; font-size: 11px;" onclick="window.submitRepair('${a.alert_id}')">
                  📷 Technician Repair
                </button>
              ` : ''}
              ${isPending ? `
                <div style="display: flex; gap: 6px;">
                  <button class="btn btn-success" style="padding: 6px 10px; font-size: 11px;" onclick="window.citizenConfirm('${a.alert_id}', true)">
                    ✓ Confirm (Citizen)
                  </button>
                  <button class="btn btn-danger" style="padding: 6px 10px; font-size: 11px;" onclick="window.citizenConfirm('${a.alert_id}', false)">
                    ✕ Reopen
                  </button>
                </div>
              ` : ''}
              ${isResolved ? `<span style="color: #16a34a; font-weight: 600; font-size: 12px;">✓ Closed</span>` : ''}
            </td>
          </tr>
        `;
      }).join('');
    } catch (e) {
      document.getElementById('alerts-tbody').innerHTML = `<tr><td colspan="5" style="text-align: center; color: #dc2626;">Error: ${e.message}</td></tr>`;
    }
  }

  window.submitRepair = async function (alertId) {
    try {
      await apiCall(`/api/v1/alerts/${alertId}`, 'PATCH', {
        status: 'pending_citizen_confirmation',
        technician_photo_url: 'https://storage.jalsetu.gov.in/repairs/valve_fixed.jpg',
        resolution_notes: 'Technician replaced leaking joint. Awaiting citizen tap test.'
      });
      showNotification('Repair proof submitted! Alert moved to citizen confirmation loop.', 'success');
      renderAlerts();
    } catch (e) {
      showNotification(e.message, 'error');
    }
  };

  window.citizenConfirm = async function (alertId, confirmed) {
    try {
      await apiCall(`/api/v1/alerts/${alertId}`, 'PATCH', {
        status: confirmed ? 'resolved' : 'active',
        citizen_confirmed: confirmed,
        resolution_notes: confirmed ? 'Citizen verified water flowing at full pressure.' : 'Citizen reported tap is still dry; reopened for inspection.'
      });
      showNotification(confirmed ? 'Citizen confirmed water restored! Alert closed.' : 'Citizen reported tap still dry. Alert reopened.', confirmed ? 'success' : 'warning');
      renderAlerts();
    } catch (e) {
      showNotification(e.message, 'error');
    }
  };

  // 3. Citizen 1-Tap QR View (/f/{fhtc_id})
  function renderQR(fhtcId = 'FHTC-UP-245123-0042') {
    const main = document.getElementById('main-content');
    main.innerHTML = `
      <div style="max-width: 580px; margin: 0 auto;">
        <!-- Household Card -->
        <div class="card" style="border-left: 6px solid #0284c7;">
          <span style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">Jal Jeevan Mission • Har Ghar Jal</span>
          <h2 style="margin: 4px 0 0 0; font-size: 20px; color: #0f172a;">Ramesh Sharma</h2>
          <p style="margin: 4px 0 0 0; color: #475569; font-size: 13px;">
            📍 Badepur Khas • Tap ID: <code style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px;">${fhtcId}</code>
          </p>
        </div>

        <!-- 1-Tap Question -->
        <div class="card" style="text-align: center; padding: 28px 20px;">
          <h3 style="margin: 0 0 20px 0; font-size: 20px; color: #1e293b;">
            ${currentLang === 'hi' ? 'क्या आज आपके नल में जल आया?' : currentLang === 'mr' ? 'आज तुमच्या नळाला पाणी आले का?' : 'Did water arrive in your tap today?'}
          </h3>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px;">
            <button id="btn-water-came" class="btn btn-success" style="padding: 24px 16px; font-size: 18px; flex-direction: column;">
              <span style="font-size: 36px;">💧</span>
              <span>${t('water_came')}</span>
              <span style="font-size: 12px; opacity: 0.9;">${t('water_came_sub')}</span>
            </button>

            <button id="btn-water-not-came" class="btn btn-danger" style="padding: 24px 16px; font-size: 18px; flex-direction: column;">
              <span style="font-size: 36px;">❌</span>
              <span>${t('water_not_came')}</span>
              <span style="font-size: 12px; opacity: 0.9;">${t('water_not_came_sub')}</span>
            </button>
          </div>

          <!-- Voice / Text Note -->
          <div style="text-align: left;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <label style="font-size: 12px; font-weight: 600; color: #475569;">Optional Note / बोलकर बताएं:</label>
              <button id="btn-voice-qr" class="btn btn-secondary" style="padding: 4px 8px; font-size: 11px;">
                ${t('voice_input')}
              </button>
            </div>
            <input type="text" id="qr-note-input" placeholder="Type or click voice note..." style="width: 100%; padding: 10px; border-radius: 6px; border: 1px solid #cbd5e1; font-size: 13px;">
          </div>
        </div>

        <div style="text-align: center; font-size: 13px; color: #64748b;">
          <p>Need to report dirty water, leakage, or low pressure? <a href="#" id="link-goto-feedback">Submit Detailed Grievance</a></p>
          <p style="font-size: 11px; margin-top: 4px;">Jal Mitra Helpline: 1800-180-1551 (Toll Free) • GP Badepur</p>
        </div>
      </div>
    `;

    document.getElementById('link-goto-feedback').onclick = (e) => {
      e.preventDefault();
      navigateTo('feedback');
    };

    const noteInput = document.getElementById('qr-note-input');
    const voiceBtn = document.getElementById('btn-voice-qr');
    voiceBtn.onclick = () => {
      startVoiceRecognition((text) => {
        noteInput.value = noteInput.value ? noteInput.value + ' ' + text : text;
      }, voiceBtn);
    };

    const handleTap = async (waterCame) => {
      const note = noteInput.value;
      try {
        const res = await apiCall('/api/v1/feedback/qr', 'POST', {
          fhtc_id: fhtcId,
          water_came: waterCame,
          note: note,
          lang: currentLang
        });
        if (res.offline) {
          showNotification('Response stored in offline outbox. Will sync automatically.', 'warning');
        } else {
          showNotification(waterCame ? 'Thank you! Water supply confirmation recorded.' : 'Alert registered! Assigned to Jal Mitra & VWSC.', 'success');
        }
        noteInput.value = '';
      } catch (err) {
        showNotification(err.message, 'error');
      }
    };

    document.getElementById('btn-water-came').onclick = () => handleTap(true);
    document.getElementById('btn-water-not-came').onclick = () => handleTap(false);
  }

  // 4. Citizen Grievance Form View
  function renderFeedback() {
    const main = document.getElementById('main-content');
    main.innerHTML = `
      <div style="max-width: 600px; margin: 0 auto;">
        <div class="card">
          <h2 style="margin: 0 0 4px 0; font-size: 20px; color: #0f172a;">📝 ${t('feedback')}</h2>
          <p style="margin: 0; color: #64748b; font-size: 13px;">Gram Panchayat Badepur (245123) • Auto-clustered within 200m</p>
        </div>

        <form id="grievance-form" class="card">
          <div style="margin-bottom: 14px;">
            <label style="display: block; font-size: 12px; font-weight: 600; margin-bottom: 4px;">Household Tap ID (FHTC ID):</label>
            <input type="text" id="g-fhtc-id" value="FHTC-UP-245123-0042" required style="width: 100%; padding: 8px 12px; border-radius: 6px; border: 1px solid #cbd5e1; font-size: 13px;">
          </div>

          <div style="margin-bottom: 14px;">
            <label style="display: block; font-size: 12px; font-weight: 600; margin-bottom: 6px;">Select Issue Category / समस्या प्रकार:</label>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 8px;" id="cat-group">
              <button type="button" class="btn btn-secondary active-cat" data-cat="dirty_water" style="flex-direction: column; padding: 10px; font-size: 11px;">
                <span style="font-size: 22px;">🟤</span> Dirty Water
              </button>
              <button type="button" class="btn btn-secondary" data-cat="no_water" style="flex-direction: column; padding: 10px; font-size: 11px;">
                <span style="font-size: 22px;">🚫</span> No Supply
              </button>
              <button type="button" class="btn btn-secondary" data-cat="low_pressure" style="flex-direction: column; padding: 10px; font-size: 11px;">
                <span style="font-size: 22px;">📉</span> Low Pressure
              </button>
              <button type="button" class="btn btn-secondary" data-cat="leakage" style="flex-direction: column; padding: 10px; font-size: 11px;">
                <span style="font-size: 22px;">💦</span> Pipe Leak
              </button>
            </div>
          </div>

          <div style="margin-bottom: 14px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <label style="font-size: 12px; font-weight: 600;">Description / विवरण:</label>
              <button type="button" id="btn-voice-g" class="btn btn-secondary" style="padding: 4px 8px; font-size: 11px;">
                ${t('voice_input')}
              </button>
            </div>
            <textarea id="g-desc" rows="3" placeholder="Speak or type issue details..." style="width: 100%; padding: 8px 12px; border-radius: 6px; border: 1px solid #cbd5e1; font-size: 13px;"></textarea>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px;">
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px 12px;">
              <span style="font-size: 11px; font-weight: 600; color: #475569; display: block;">📍 GPS Location</span>
              <span id="g-gps-status" style="font-size: 11px; color: #166534;">28.9845°N, 77.7064°E (Acquired)</span>
            </div>
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px 12px;">
              <span style="font-size: 11px; font-weight: 600; color: #475569; display: block;">📷 Attach Photo</span>
              <input type="file" accept="image/*" style="font-size: 11px; width: 100%;">
            </div>
          </div>

          <button type="submit" class="btn btn-primary" style="width: 100%; padding: 12px; font-size: 15px;">
            ${t('submit')}
          </button>
        </form>
      </div>

      <!-- Live Grievance Tracking & Clusters -->
      <div class="card" style="max-width: 620px; margin: 24px auto 0 auto; padding: 0; overflow: hidden;">
        <div style="padding: 14px 16px; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;">
          <h3 style="margin: 0; font-size: 15px; color: #0f172a;">📋 Track Submitted Grievances</h3>
          <span style="font-size: 11px; color: #64748b;">GP Badepur (245123)</span>
        </div>
        <div id="grievance-list" style="padding: 12px 16px;">
          <div style="text-align: center; color: #64748b; font-size: 12px; padding: 12px;">Loading recent grievances...</div>
        </div>
      </div>
    `;

    const loadRecentGrievances = async () => {
      const container = document.getElementById('grievance-list');
      if (!container) return;
      try {
        const feedbacks = await apiCall('/api/v1/feedback?lgd_gp_code=245123');
        if (!feedbacks || feedbacks.length === 0) {
          container.innerHTML = '<div style="text-align: center; color: #64748b; font-size: 12px; padding: 12px;">No active grievances in this Gram Panchayat.</div>';
          return;
        }
        const catIcons = {
          dirty_water: '🟤 Dirty Water',
          no_water: '🚫 No Supply',
          low_pressure: '📉 Low Pressure',
          leakage: '💦 Pipe Leak',
          other: '⚠️ Issue'
        };
        container.innerHTML = feedbacks.slice(0, 5).map(f => `
          <div style="padding: 10px 12px; border-radius: 6px; background: #f8fafc; border: 1px solid #e2e8f0; margin-bottom: 8px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <span style="font-size: 12px; font-weight: 700; color: #0f172a;">${catIcons[f.category] || f.category}</span>
              <span class="badge badge-info" style="font-size: 10px;">${f.status || 'queued_for_verification'}</span>
            </div>
            <div style="font-size: 13px; color: #334155; margin-bottom: 4px;">"${f.text || 'Grievance registered'}"</div>
            <div style="display: flex; justify-content: space-between; font-size: 11px; color: #64748b;">
              <span>Ticket: <code>${f.feedback_id}</code></span>
              <span>Tap: <code>${f.fhtc_id}</code></span>
            </div>
          </div>
        `).join('');
      } catch (err) {
        container.innerHTML = '<div style="color: #dc2626; font-size: 12px;">Could not load recent grievances.</div>';
      }
    };

    let selectedCat = 'dirty_water';
    const catButtons = document.querySelectorAll('#cat-group button');
    catButtons.forEach(btn => {
      btn.onclick = () => {
        catButtons.forEach(b => b.style.borderColor = '#cbd5e1');
        btn.style.borderColor = '#0284c7';
        btn.style.background = '#f0f9ff';
        selectedCat = btn.getAttribute('data-cat');
      };
    });

    const descInput = document.getElementById('g-desc');
    const voiceBtn = document.getElementById('btn-voice-g');
    voiceBtn.onclick = () => {
      startVoiceRecognition((text) => {
        descInput.value = descInput.value ? descInput.value + ' ' + text : text;
      }, voiceBtn);
    };

    document.getElementById('grievance-form').onsubmit = async (e) => {
      e.preventDefault();
      const payload = {
        feedback_id: 'FB-' + Date.now(),
        fhtc_id: document.getElementById('g-fhtc-id').value,
        channel: 'app',
        category: selectedCat,
        text: descInput.value || `${selectedCat} reported`,
        lat: 28.9845,
        lon: 77.7064,
        lang: currentLang,
        ts: new Date().toISOString()
      };

      try {
        const res = await apiCall('/api/v1/feedback', 'POST', payload);
        if (res.offline) {
          showNotification('Saved to offline outbox. Will auto-sync when online.', 'warning');
        } else {
          showNotification(`Grievance registered! Ticket: ${payload.feedback_id} (Cluster: ${res.cluster_id || 'Assigned'})`, 'success');
        }
        descInput.value = '';
        loadRecentGrievances();
      } catch (err) {
        showNotification(err.message, 'error');
      }
    };

    loadRecentGrievances();
  }

  // 5. IMIS & Sujal Gaon Sync View
  async function renderSync() {
    const main = document.getElementById('main-content');
    main.innerHTML = `
      <div class="card" style="background: #fffbeb; border: 1px solid #fde68a; color: #92400e; font-size: 13px;">
        <strong>⚠️ UNVERIFIED MOCK MODE:</strong> Real JJM IMIS and Sujal Gaon endpoints are marked as <code>UNVERIFIED</code> and configurable via <code>IMIS_BASE_URL</code>. In compliance with project guidelines, this module uses the built-in deterministic mock server with exponential backoff and CSV batch fallback.
      </div>

      <div class="card" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
        <div>
          <h2 style="margin: 0; font-size: 20px; color: #0f172a;">JJM IMIS & Sujal Gaon Sync Gateway</h2>
          <p style="margin: 4px 0 0 0; font-size: 13px; color: #64748b;">Target GP: Badepur (LGD: 245123) • Protocol: REST / JSON with HMAC-SHA256 Auth</p>
        </div>
        <div style="display: flex; gap: 10px;">
          <button id="btn-sync-imis" class="btn btn-primary">${t('push_imis')}</button>
          <button id="btn-sync-sujal" class="btn btn-success">${t('sync_sujal')}</button>
        </div>
      </div>

      <!-- Sync Audit Log Table -->
      <div class="card" style="padding: 0; overflow: hidden;">
        <div style="padding: 14px 16px; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;">
          <h3 style="margin: 0; font-size: 15px; color: #0f172a;">Transmission Audit Log</h3>
          <span style="font-size: 11px; color: #64748b;">DPDP & IMIS Compliance Trail</span>
        </div>
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Batch ID</th>
                <th>Target / Mode</th>
                <th>Date</th>
                <th>FHTCs</th>
                <th>Supply (L)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody id="audit-tbody">
              <tr><td colspan="7" style="text-align: center; padding: 24px; color: #64748b;">Loading audit logs...</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    `;

    const loadLogs = async () => {
      try {
        const logs = await apiCall('/api/v1/sync/audit-logs?lgd_gp_code=245123');
        const tbody = document.getElementById('audit-tbody');
        if (!logs || logs.length === 0) {
          tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 24px; color: #64748b;">No transmission logs yet. Click buttons above to initiate sync.</td></tr>`;
          return;
        }
        tbody.innerHTML = logs.map(l => `
          <tr>
            <td style="color: #64748b;">${l.sync_ts ? new Date(l.sync_ts).toLocaleTimeString() : 'Recent'}</td>
            <td style="font-weight: 700;"><code>${l.sync_batch_id || 'BATCH-1'}</code></td>
            <td><span class="badge badge-info">${l.adapter_mode || 'UNVERIFIED_MOCK (IMIS)'}</span></td>
            <td>${l.reporting_date || 'Today'}</td>
            <td><strong>${l.functional_fhtc_count || 50}</strong> / 50</td>
            <td>${Number(l.total_supply_liters || 0).toLocaleString()} L</td>
            <td><span class="badge ${l.sync_status && l.sync_status.includes('FAIL') ? 'badge-danger' : 'badge-success'}">${l.sync_status}</span></td>
          </tr>
        `).join('');
      } catch (err) {
        // Fallback
      }
    };

    document.getElementById('btn-sync-imis').onclick = async () => {
      try {
        const res = await apiCall('/api/v1/sync/imis', 'POST', {
          lgd_gp_code: "245123",
          reporting_date: new Date().toISOString().split('T')[0],
          functional_fhtc_count: 50,
          total_supply_liters: 125000.0
        });
        showNotification(`IMIS Sync initiated! Batch: ${res.batch_id || 'MOCK-1'} (Status: ${res.sync_status})`, 'success');
        loadLogs();
      } catch (e) {
        showNotification('IMIS error: ' + e.message, 'error');
      }
    };

    document.getElementById('btn-sync-sujal').onclick = async () => {
      try {
        const res = await apiCall('/api/v1/sync/sujal-gaon', 'POST', {
          lgd_gp_code: "245123"
        });
        showNotification(`Sujal Gaon rating synchronized! Status: ${res.certified_status}`, 'success');
        loadLogs();
      } catch (e) {
        showNotification('Sujal Gaon error: ' + e.message, 'error');
      }
    };

    loadLogs();
  }

  // --- NAVIGATION CONTROLLER ---
  function navigateTo(page, param = null) {
    currentPage = page;
    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-page') === page);
    });

    if (page === 'dashboard') renderDashboard();
    else if (page === 'alerts') renderAlerts();
    else if (page === 'qr') renderQR(param || 'FHTC-UP-245123-0042');
    else if (page === 'feedback') renderFeedback();
    else if (page === 'sync') renderSync();
  }

  // Initialize App
  document.addEventListener('DOMContentLoaded', () => {
    // Navigation items
    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.onclick = () => navigateTo(btn.getAttribute('data-page'));
    });

    // Language picker
    const langPicker = document.getElementById('lang-picker');
    if (langPicker) {
      langPicker.value = currentLang;
      langPicker.onchange = (e) => {
        currentLang = e.target.value;
        localStorage.setItem('jalsetu_lang', currentLang);
        updateOfflineStatus();
        navigateTo(currentPage);
      };
    }

    // Handle deep link paths
    const path = window.location.pathname;
    if (path.startsWith('/f/')) {
      const fhtcId = path.split('/')[2];
      navigateTo('qr', fhtcId);
    } else if (path.startsWith('/alerts')) {
      navigateTo('alerts');
    } else if (path.startsWith('/sync')) {
      navigateTo('sync');
    } else if (path.startsWith('/feedback') || path.startsWith('/grievance')) {
      navigateTo('feedback');
    } else if (path.startsWith('/qr')) {
      navigateTo('qr');
    } else {
      navigateTo('dashboard');
    }

    updateOfflineStatus();
    flushOutbox();
  });

})();
