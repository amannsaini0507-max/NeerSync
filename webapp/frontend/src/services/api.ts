// NeerSync REST API Client Service

export interface GPMaster {
  lgd_gp_code: string;
  name: string;
  district: string;
  state: string;
  total_fhtc: number;
  schemes: string[];
}

export interface FHTCDetails {
  fhtc_id: string;
  habitation_id: string;
  lgd_gp_code: string;
  consumer_name_masked: string;
  phone_masked: string;
  status: string;
  branch: string;
  lat?: number;
  lon?: number;
}

export interface Alert {
  alert_id: string;
  type: string;
  severity: string;
  scope: {
    gp: string;
    branch: string;
    fhtc_id?: string;
  };
  reason: string;
  created_ts: string;
  status: string;
  escalation_level: string;
  technician_photo_url?: string;
  citizen_confirmed?: boolean;
}

export interface FHTCIndexData {
  lgd_gp_code: string;
  fhtc_service_index: number;
  regularity_score: number;
  adequacy_score: number;
  quality_score: number;
  pressure_score: number;
  grievance_score: number;
  status_category: string;
}

export interface SimulationScenarioResult {
  status: string;
  scenario: string;
  injected_packets: number;
  alerts_triggered: any[];
  fhtc_service_index: number;
  summary: string;
}

const BASE_URL = '/api/v1';

export const api = {
  async getGPMaster(gpCode: string = '245123'): Promise<GPMaster> {
    const res = await fetch(`${BASE_URL}/master/gps/${gpCode}`);
    if (!res.ok) throw new Error('Failed to load GP master');
    return res.json();
  },

  async getFHTC(fhtcId: string): Promise<FHTCDetails> {
    const res = await fetch(`${BASE_URL}/master/fhtcs/${fhtcId}`);
    if (!res.ok) throw new Error('Failed to load FHTC details');
    return res.json();
  },

  async submitQRFeedback(fhtcId: string, waterCame: boolean, note?: string): Promise<any> {
    const res = await fetch(`${BASE_URL}/feedback/qr`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fhtc_id: fhtcId, water_came: waterCame, note })
    });
    return res.json();
  },

  async submitFullFeedback(feedbackData: any): Promise<any> {
    const res = await fetch(`${BASE_URL}/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(feedbackData)
    });
    return res.json();
  },

  async getAlerts(gpCode: string = '245123'): Promise<Alert[]> {
    const res = await fetch(`${BASE_URL}/alerts?lgd_gp_code=${gpCode}`);
    if (!res.ok) return [];
    return res.json();
  },

  async updateAlertStatus(alertId: string, statusOrData: any, notes?: string, photoUrl?: string, confirmed?: boolean): Promise<Alert> {
    const body = typeof statusOrData === 'object'
      ? statusOrData
      : {
          status: statusOrData,
          resolution_notes: notes,
          technician_photo_url: photoUrl,
          citizen_confirmed: confirmed
        };

    const res = await fetch(`${BASE_URL}/alerts/${alertId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    return res.json();
  },

  async runAlertEscalations(): Promise<any> {
    const res = await fetch(`${BASE_URL}/alerts/escalate`, { method: 'POST' });
    return res.json();
  },

  async getFHTCIndex(gpCode: string = '245123'): Promise<FHTCIndexData> {
    const res = await fetch(`${BASE_URL}/analytics/fhtc-index?lgd_gp_code=${gpCode}`);
    if (!res.ok) throw new Error('Failed to load FHTC index');
    return res.json();
  },

  async getSyncAudits(gpCode: string = '245123'): Promise<any[]> {
    const res = await fetch(`${BASE_URL}/sync/audit-logs?lgd_gp_code=${gpCode}`);
    if (!res.ok) return [];
    return res.json();
  },

  async triggerIMISPush(reportingDate: string, gpCode: string, functionalCount: number, supplyLiters: number): Promise<any> {
    const res = await fetch(`${BASE_URL}/sync/imis`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        reporting_date: reportingDate,
        lgd_gp_code: gpCode,
        functional_fhtc_count: functionalCount,
        total_supply_liters: supplyLiters
      })
    });
    return res.json();
  },

  async triggerSujalGaonSync(gpCode: string = '245123'): Promise<any> {
    const res = await fetch(`${BASE_URL}/sync/sujal-gaon`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lgd_gp_code: gpCode })
    });
    return res.json();
  },

  async injectSimulationScenario(scenario: string, gpCode: string = '245123'): Promise<SimulationScenarioResult> {
    const res = await fetch(`${BASE_URL}/simulation/scenario`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scenario, lgd_gp_code: gpCode })
    });
    return res.json();
  },

  async resetSimulation(gpCode: string = '245123'): Promise<SimulationScenarioResult> {
    const res = await fetch(`${BASE_URL}/simulation/reset?lgd_gp_code=${gpCode}`, {
      method: 'POST'
    });
    return res.json();
  }
};

// Top-Level Named Convenience Exports expected by frontend pages
export const getAlerts = (gpCode: string = '245123') => api.getAlerts(gpCode);
export const updateAlertStatus = (alertId: string, statusOrData: any, notes?: string, photoUrl?: string, confirmed?: boolean) =>
  api.updateAlertStatus(alertId, statusOrData, notes, photoUrl, confirmed);
export const runAlertEscalations = () => api.runAlertEscalations();

export const submitCitizenFeedback = (feedbackData: any) => api.submitFullFeedback(feedbackData);
export const getFHTCStatus = (fhtcId: string) => api.getFHTC(fhtcId);

export const getGPServiceIndex = (gpCode: string = '245123') => api.getFHTCIndex(gpCode);
export const getGPHierarchy = (gpCode: string = '245123') => api.getGPMaster(gpCode);

export const triggerIMISSync = (gpCode: string = '245123') => {
  const today = new Date().toISOString().split('T')[0];
  return api.triggerIMISPush(today, gpCode, 46, 250000);
};
export const triggerSujalGaonSync = (gpCode: string = '245123') => api.triggerSujalGaonSync(gpCode);
export const getSyncAuditLogs = (gpCode: string = '245123') => api.getSyncAudits(gpCode);

export const injectSimulationScenario = (scenario: string, gpCode: string = '245123') =>
  api.injectSimulationScenario(scenario, gpCode);
export const resetSimulation = (gpCode: string = '245123') => api.resetSimulation(gpCode);
