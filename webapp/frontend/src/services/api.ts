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

  async updateAlertStatus(alertId: string, status: string, notes?: string, photoUrl?: string, confirmed?: boolean): Promise<Alert> {
    const res = await fetch(`${BASE_URL}/alerts/${alertId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status,
        resolution_notes: notes,
        technician_photo_url: photoUrl,
        citizen_confirmed: confirmed
      })
    });
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
  }
};
