/**
 * JalSetu 3D Village Digital Twin - Data Exporter
 * Generates downloadable JSON payloads for telemetry, alerts, and feedback.
 */

export function triggerJsonDownload(filename, data) {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportContractsBundle({ telemetryHistory = [], alertsHistory = [], feedbackLog = [] }) {
  const bundle = {
    export_metadata: {
      exported_at: new Date().toISOString(),
      scheme_id: 'SCH-UP-245123',
      village: 'Gram Panchayat Badepur',
      counts: {
        telemetry: telemetryHistory.length,
        alerts: alertsHistory.length,
        feedback: feedbackLog.length,
      },
    },
    telemetry: telemetryHistory,
    alerts: alertsHistory,
    feedback: feedbackLog,
  };

  triggerJsonDownload(`jalsetu_contracts_bundle_${Date.now()}.json`, bundle);
}
