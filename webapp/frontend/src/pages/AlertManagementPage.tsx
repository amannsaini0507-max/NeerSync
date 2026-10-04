import React, { useState, useEffect } from 'react';
import { getAlerts, updateAlertStatus, runAlertEscalations } from '../services/api';

export const AlertManagementPage: React.FC = () => {
  const [gpCode, setGpCode] = useState('245123');
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionMsg, setActionMsg] = useState<string | null>(null);

  // Modal / action state for repair or confirmation
  const [selectedAlert, setSelectedAlert] = useState<any | null>(null);
  const [repairPhoto, setRepairPhoto] = useState<string>('');
  const [repairNotes, setRepairNotes] = useState<string>('');
  const [actionType, setActionType] = useState<'repair' | 'confirm' | null>(null);

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const res = await getAlerts(gpCode);
      setAlerts(res || []);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, [gpCode]);

  const handleRunEscalations = async () => {
    try {
      const res = await runAlertEscalations();
      setActionMsg(`Escalation check completed: ${res.escalated_count} alerts escalated.`);
      fetchAlerts();
      setTimeout(() => setActionMsg(null), 5000);
    } catch (err: any) {
      setActionMsg('Failed to run escalations: ' + err.message);
    }
  };

  const handleOpenRepair = (alert: any) => {
    setSelectedAlert(alert);
    setActionType('repair');
    setRepairPhoto('https://storage.neersync.gov.in/repairs/valve_replaced_782.jpg');
    setRepairNotes('Replaced air valve and tightened flange at branch junction.');
  };

  const handleOpenConfirm = (alert: any) => {
    setSelectedAlert(alert);
    setActionType('confirm');
  };

  const handleSubmitRepair = async () => {
    if (!selectedAlert) return;
    try {
      await updateAlertStatus(selectedAlert.alert_id, {
        status: 'repaired',
        repair_photo_url: repairPhoto,
        repair_notes: repairNotes
      });
      setActionMsg(`Alert ${selectedAlert.alert_id.substring(0, 8)} marked repaired. Awaiting citizen confirmation.`);
      setSelectedAlert(null);
      setActionType(null);
      fetchAlerts();
    } catch (e: any) {
      alert('Error updating alert: ' + e.message);
    }
  };

  const handleCitizenConfirmation = async (confirmed: boolean) => {
    if (!selectedAlert) return;
    try {
      await updateAlertStatus(selectedAlert.alert_id, {
        status: confirmed ? 'closed' : 'open',
        citizen_confirmed: confirmed,
        repair_notes: confirmed ? 'Citizen verified water flow restored at tap.' : 'Citizen reported tap still dry; alert reopened.'
      });
      setActionMsg(confirmed ? 'Alert closed with citizen confirmation!' : 'Alert reopened for re-inspection.');
      setSelectedAlert(null);
      setActionType(null);
      fetchAlerts();
    } catch (e: any) {
      alert('Error: ' + e.message);
    }
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '16px' }}>
      {/* Top Controls */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#ffffff',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        marginBottom: '20px'
      }}>
        <div>
          <h1 style={{ margin: '0 0 4px 0', fontSize: '22px', color: '#0f172a' }}>
            Alert Engine & Escalation Matrix
          </h1>
          <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
            Multi-tier SLA routing: Jal Mitra (T0) → VWSC (+4h) → Junior Engineer (+24h) → Executive Engineer (+48h)
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            id="btn-run-escalation"
            onClick={handleRunEscalations}
            style={{
              padding: '10px 16px',
              borderRadius: '8px',
              background: '#f97316',
              color: '#ffffff',
              border: 'none',
              fontWeight: 600,
              fontSize: '13px',
              cursor: 'pointer'
            }}
          >
            ⚡ Run Escalation Check
          </button>
          <button
            onClick={fetchAlerts}
            style={{
              padding: '10px 16px',
              borderRadius: '8px',
              background: '#f1f5f9',
              border: '1px solid #cbd5e1',
              fontWeight: 600,
              fontSize: '13px',
              cursor: 'pointer'
            }}
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      {actionMsg && (
        <div style={{
          padding: '12px 16px',
          borderRadius: '8px',
          background: '#eff6ff',
          border: '1px solid #93c5fd',
          color: '#1d4ed8',
          fontWeight: 600,
          marginBottom: '20px'
        }}>
          {actionMsg}
        </div>
      )}

      {/* Escalation Matrix Diagram */}
      <div style={{
        background: '#ffffff',
        padding: '16px 20px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        fontSize: '13px',
        fontWeight: 600,
        color: '#475569'
      }}>
        <div style={{ textAlign: 'center' }}>
          <span style={{ display: 'block', fontSize: '20px' }}>🔧</span>
          <strong>Jal Mitra</strong>
          <span style={{ display: 'block', fontSize: '11px', color: '#16a34a' }}>Immediate (T0)</span>
        </div>
        <span>➡️</span>
        <div style={{ textAlign: 'center' }}>
          <span style={{ display: 'block', fontSize: '20px' }}>🏛️</span>
          <strong>VWSC Committee</strong>
          <span style={{ display: 'block', fontSize: '11px', color: '#ea580c' }}>+ 4 Hours</span>
        </div>
        <span>➡️</span>
        <div style={{ textAlign: 'center' }}>
          <span style={{ display: 'block', fontSize: '20px' }}>👷</span>
          <strong>Junior Engineer (JE)</strong>
          <span style={{ display: 'block', fontSize: '11px', color: '#dc2626' }}>+ 24 Hours</span>
        </div>
        <span>➡️</span>
        <div style={{ textAlign: 'center' }}>
          <span style={{ display: 'block', fontSize: '20px' }}>👔</span>
          <strong>Executive Engineer (EE)</strong>
          <span style={{ display: 'block', fontSize: '11px', color: '#991b1b' }}>+ 48 Hours</span>
        </div>
      </div>

      {/* Alerts Table */}
      <div style={{
        background: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        overflow: 'hidden'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
              <th style={{ padding: '12px 16px' }}>Severity / Type</th>
              <th style={{ padding: '12px 16px' }}>Reason & Location</th>
              <th style={{ padding: '12px 16px' }}>Current SLA Level</th>
              <th style={{ padding: '12px 16px' }}>Status</th>
              <th style={{ padding: '12px 16px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {alerts.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '24px', textAlign: 'center', color: '#64748b' }}>
                  No active incidents recorded for GP {gpCode}.
                </td>
              </tr>
            ) : (
              alerts.map(a => (
                <tr key={a.alert_id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontWeight: 700,
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      background: a.severity === 'high' ? '#fee2e2' : a.severity === 'medium' ? '#fef3c7' : '#f1f5f9',
                      color: a.severity === 'high' ? '#991b1b' : a.severity === 'medium' ? '#92400e' : '#475569'
                    }}>
                      {a.severity}
                    </span>
                    <div style={{ fontWeight: 600, marginTop: '4px', color: '#0f172a' }}>{a.type}</div>
                  </td>
                  <td style={{ padding: '12px 16px', maxWidth: '300px' }}>
                    <div style={{ fontWeight: 500, color: '#1e293b' }}>{a.reason}</div>
                    <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>
                      Scope: {a.scope?.branch || 'General'} • ID: <code>{a.alert_id.substring(0, 10)}...</code>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      background: '#eff6ff',
                      color: '#1d4ed8',
                      fontWeight: 600,
                      padding: '4px 8px',
                      borderRadius: '4px'
                    }}>
                      {a.current_escalation_level || 'Jal Mitra'}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '12px',
                      fontWeight: 600,
                      fontSize: '12px',
                      background: a.status === 'closed' ? '#dcfce7' : a.status === 'repaired' ? '#e0e7ff' : '#fef2f2',
                      color: a.status === 'closed' ? '#166534' : a.status === 'repaired' ? '#4338ca' : '#991b1b'
                    }}>
                      {a.status?.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    {a.status === 'open' && (
                      <button
                        onClick={() => handleOpenRepair(a)}
                        style={{
                          padding: '6px 12px',
                          background: '#0284c7',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontWeight: 600,
                          fontSize: '12px'
                        }}
                      >
                        Submit Repair 📷
                      </button>
                    )}
                    {a.status === 'repaired' && (
                      <button
                        onClick={() => handleOpenConfirm(a)}
                        style={{
                          padding: '6px 12px',
                          background: '#16a34a',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontWeight: 600,
                          fontSize: '12px'
                        }}
                      >
                        Citizen Confirm ✓
                      </button>
                    )}
                    {a.status === 'closed' && (
                      <span style={{ color: '#16a34a', fontWeight: 600, fontSize: '12px' }}>
                        ✓ Resolved
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Technician Repair Upload */}
      {selectedAlert && actionType === 'repair' && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{ background: '#ffffff', borderRadius: '12px', padding: '24px', width: '480px', maxWidth: '90%' }}>
            <h3 style={{ margin: '0 0 12px 0' }}>Technician Repair Submission</h3>
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
              Repair loop requires photo proof and notes before citizen confirmation.
            </p>

            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                Photo Proof URL / Geotagged Photo:
              </label>
              <input
                type="text"
                value={repairPhoto}
                onChange={e => setRepairPhoto(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                Repair Work Details:
              </label>
              <textarea
                rows={3}
                value={repairNotes}
                onChange={e => setRepairNotes(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button
                onClick={() => setActionType(null)}
                style={{ padding: '8px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                id="btn-confirm-repair-submit"
                onClick={handleSubmitRepair}
                style={{ padding: '8px 14px', borderRadius: '6px', border: 'none', background: '#0284c7', color: '#fff', fontWeight: 600, cursor: 'pointer' }}
              >
                Submit Repair Proof
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Citizen Confirmation Loop */}
      {selectedAlert && actionType === 'confirm' && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{ background: '#ffffff', borderRadius: '12px', padding: '24px', width: '480px', maxWidth: '90%' }}>
            <h3 style={{ margin: '0 0 12px 0' }}>Citizen Confirmation Loop</h3>
            <p style={{ fontSize: '13px', color: '#475569', marginBottom: '16px' }}>
              Technician has marked this repaired. Did water flow properly restore at your tap?
            </p>

            <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '13px' }}>
              <div><strong>Technician Note:</strong> {selectedAlert.repair_notes || 'Repaired'}</div>
              {selectedAlert.repair_photo_url && (
                <div style={{ marginTop: '4px' }}>
                  <a href={selectedAlert.repair_photo_url} target="_blank" rel="noreferrer" style={{ color: '#0284c7' }}>
                    View Work Photo ↗
                  </a>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                id="btn-citizen-reject"
                onClick={() => handleCitizenConfirmation(false)}
                style={{
                  padding: '10px 14px',
                  borderRadius: '6px',
                  border: '1px solid #dc2626',
                  background: '#fef2f2',
                  color: '#dc2626',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                ❌ Still Dry (Reopen)
              </button>
              <button
                id="btn-citizen-confirm"
                onClick={() => handleCitizenConfirmation(true)}
                style={{
                  padding: '10px 14px',
                  borderRadius: '6px',
                  border: 'none',
                  background: '#16a34a',
                  color: '#fff',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                ✅ Yes, Water Flowing (Close)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertManagementPage;
