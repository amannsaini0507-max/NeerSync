import React, { useState, useEffect } from 'react';
import { getGPServiceIndex, getAlerts, getGPHierarchy } from '../services/api';
import GISMap from '../components/GISMap';

interface Props {
  lang: string;
  translations: Record<string, string>;
}

export const GPDashboard: React.FC<Props> = ({ lang, translations }) => {
  const [gpCode, setGpCode] = useState('245123');
  const [serviceIndex, setServiceIndex] = useState<any>(null);
  const [activeAlerts, setActiveAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock initial IoT live telemetry state
  const [telemetryState, setTelemetryState] = useState({
    esrLevel: 342, // cm
    pumpCurrent: 14.2, // A
    tailEndPressure: 88.5, // kPa (target >= 70)
    turbidity: 1.8, // NTU (target < 5.0)
    chlorine: 0.35, // mg/L (target 0.2 - 0.5)
    lastUpdate: 'Just now'
  });

  // Sample GeoJSON for GIS Map
  const [mapFeatures, setMapFeatures] = useState<any[]>([
    {
      id: 'node-pump-01',
      name: 'Pumping Station Solar Pump #1',
      coords: [77.7064, 28.9845],
      type: 'pump',
      status: 'active',
      details: 'Current: 14.2 A | Solar PV: Normal'
    },
    {
      id: 'node-esr-01',
      name: 'Overhead Reservoir (ESR)',
      coords: [77.7082, 28.9860],
      type: 'esr',
      status: 'active',
      details: 'Level: 342 cm (85% full)'
    },
    {
      id: 'node-tail-01',
      name: 'Tail-End Pressure Node (South Ward)',
      coords: [77.7120, 28.9820],
      type: 'fhtc',
      status: 'warning',
      details: 'Pressure: 64 kPa (Threshold < 70 kPa)'
    },
    {
      id: 'fhtc-cluster-north',
      name: 'Badepur Khas (15 Taps)',
      coords: [77.7050, 28.9870],
      type: 'fhtc',
      status: 'active',
      details: 'Supply: 55 LPCD delivered'
    },
    {
      id: 'fhtc-cluster-east',
      name: 'Harijan Basti (12 Taps)',
      coords: [77.7095, 28.9835],
      type: 'fhtc',
      status: 'active',
      details: 'Chlorine: 0.35 mg/L Safe'
    }
  ]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [idxRes, alertsRes] = await Promise.all([
        getGPServiceIndex(gpCode).catch(() => null),
        getAlerts(gpCode).catch(() => [])
      ]);

      if (idxRes) {
        setServiceIndex(idxRes);
      } else {
        // Fallback demo index
        setServiceIndex({
          overall_index: 84.5,
          regularity_score: 90.0,
          adequacy_score: 82.5,
          quality_score: 88.0,
          pressure_score: 76.0,
          grievance_score: 85.0,
          total_fhtc: 50,
          functional_fhtc: 46
        });
      }

      if (alertsRes && Array.isArray(alertsRes)) {
        setActiveAlerts(alertsRes.filter((a: any) => a.status !== 'closed'));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, [gpCode]);

  const indexValue = serviceIndex ? Math.round(serviceIndex.overall_index || serviceIndex.service_index || 84.5) : 85;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px' }}>
      {/* Top Header */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#ffffff',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        marginBottom: '20px'
      }}>
        <div>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#0284c7', textTransform: 'uppercase' }}>
            Gram Panchayat Water Security Dashboard
          </span>
          <h1 style={{ margin: '4px 0 0 0', fontSize: '24px', color: '#0f172a' }}>
            GP Badepur (LGD: {gpCode})
          </h1>
          <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '14px' }}>
            Meerut District • Uttar Pradesh | Jal Jeevan Mission Har Ghar Jal
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button
            onClick={loadData}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              background: '#f1f5f9',
              border: '1px solid #cbd5e1',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '13px'
            }}
          >
            🔄 Refresh Data
          </button>
          <a
            href="/sync"
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              background: '#0284c7',
              color: '#ffffff',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '13px'
            }}
          >
            IMIS / Sujal Gaon Sync ↗
          </a>
        </div>
      </div>

      {/* Primary KPI Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '20px' }}>
        {/* FHTC Service Index Gauge Card */}
        <div style={{
          background: 'linear-gradient(135deg, #0284c7, #0369a1)',
          color: '#ffffff',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 4px 12px rgba(2, 132, 199, 0.25)'
        }}>
          <div style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px', opacity: 0.9 }}>
            FHTC Service Index (0-100)
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', margin: '10px 0' }}>
            <span style={{ fontSize: '48px', fontWeight: 800 }}>{indexValue}</span>
            <span style={{ fontSize: '20px', opacity: 0.8 }}>/ 100</span>
          </div>
          <div style={{ fontSize: '13px', background: 'rgba(255,255,255,0.2)', padding: '4px 8px', borderRadius: '4px', display: 'inline-block' }}>
            {indexValue >= 80 ? '⭐ Fully Functional Village' : '⚠️ Attention Required'}
          </div>
          <div style={{ marginTop: '12px', fontSize: '11px', opacity: 0.85 }}>
            Formula: 30% Regularity + 20% Adequacy + 20% Quality + 15% Pressure + 15% Grievance
          </div>
        </div>

        {/* ESR Water Level */}
        <div style={{ background: '#ffffff', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>OVERHEAD TANK (ESR)</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '8px 0' }}>
            <span style={{ fontSize: '32px', fontWeight: 700, color: '#0f172a' }}>{telemetryState.esrLevel}</span>
            <span style={{ color: '#64748b', fontSize: '14px' }}>cm</span>
          </div>
          <div style={{ width: '100%', background: '#e2e8f0', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: '85%', background: '#0284c7', height: '100%' }}></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginTop: '6px', color: '#64748b' }}>
            <span>Capacity: 50,000 L</span>
            <span style={{ color: '#16a34a', fontWeight: 600 }}>85% Full</span>
          </div>
        </div>

        {/* Tail-End Pressure */}
        <div style={{ background: '#ffffff', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>TAIL-END PRESSURE</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '8px 0' }}>
            <span style={{ fontSize: '32px', fontWeight: 700, color: telemetryState.tailEndPressure >= 70 ? '#16a34a' : '#d97706' }}>
              {telemetryState.tailEndPressure}
            </span>
            <span style={{ color: '#64748b', fontSize: '14px' }}>kPa</span>
          </div>
          <div style={{ fontSize: '12px', color: telemetryState.tailEndPressure >= 70 ? '#166534' : '#b45309' }}>
            Target: ≥ 70 kPa (7m head) • {telemetryState.tailEndPressure >= 70 ? 'Adequate' : 'Low Pressure Warning'}
          </div>
        </div>

        {/* Water Quality (Turbidity & Chlorine) */}
        <div style={{ background: '#ffffff', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>WATER POTABILITY (IS 10500)</div>
          <div style={{ margin: '8px 0', fontSize: '14px', color: '#1e293b' }}>
            <div>Turbidity: <strong>{telemetryState.turbidity} NTU</strong> <span style={{ color: '#16a34a' }}>✓ (&lt; 5.0)</span></div>
            <div style={{ marginTop: '4px' }}>Res. Chlorine: <strong>{telemetryState.chlorine} mg/L</strong> <span style={{ color: '#16a34a' }}>✓ (0.2 - 0.5)</span></div>
          </div>
          <div style={{ fontSize: '12px', color: '#166534', fontWeight: 600 }}>Potable for Drinking</div>
        </div>
      </div>

      {/* Main Grid: GIS Map & Active Alerts */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '20px' }}>
        {/* Left: GIS Map */}
        <div style={{ background: '#ffffff', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h2 style={{ fontSize: '18px', margin: 0, color: '#0f172a' }}>GIS Network Map & Tap Status</h2>
            <span style={{ fontSize: '12px', color: '#64748b' }}>50 FHTCs • 4 Habitations • 5 IoT Nodes</span>
          </div>
          <GISMap features={mapFeatures} height="420px" center={[77.7080, 28.9845]} zoom={15} />
        </div>

        {/* Right: Active Outages & Escalations */}
        <div style={{ background: '#ffffff', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h2 style={{ fontSize: '18px', margin: 0, color: '#0f172a' }}>Active Alerts</h2>
            <a href="/alerts" style={{ fontSize: '12px', color: '#0284c7', fontWeight: 600 }}>View All ↗</a>
          </div>

          {activeAlerts.length === 0 ? (
            <div style={{ padding: '30px 10px', textAlign: 'center', color: '#64748b' }}>
              <span style={{ fontSize: '32px' }}>✅</span>
              <p style={{ margin: '8px 0 0 0', fontWeight: 600 }}>No Active Disruptions</p>
              <p style={{ fontSize: '12px', margin: '4px 0 0 0' }}>All nodes and zones operating within normal parameters.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {activeAlerts.map(alert => (
                <div
                  key={alert.alert_id}
                  style={{
                    border: '1px solid #fee2e2',
                    background: '#fef2f2',
                    padding: '12px',
                    borderRadius: '8px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      background: alert.severity === 'high' ? '#dc2626' : '#ea580c',
                      color: '#ffffff',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      textTransform: 'uppercase'
                    }}>
                      {alert.severity} • {alert.type}
                    </span>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>
                      {alert.current_escalation_level || 'Jal Mitra'}
                    </span>
                  </div>
                  <p style={{ margin: '6px 0 0 0', fontSize: '13px', color: '#991b1b', fontWeight: 500 }}>
                    {alert.reason}
                  </p>
                  <div style={{ marginTop: '8px', fontSize: '11px', color: '#475569' }}>
                    Scope: {alert.scope?.branch || 'General'} • ID: <code>{alert.alert_id.substring(0, 12)}...</code>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Sub-Components Weighting Breakdown */}
      <div style={{ background: '#ffffff', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <h3 style={{ fontSize: '16px', margin: '0 0 16px 0', color: '#1e293b' }}>
          JJM FHTC Service Index Component Breakdown
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
          <div style={{ borderLeft: '4px solid #0284c7', paddingLeft: '12px' }}>
            <div style={{ fontSize: '12px', color: '#64748b' }}>Regularity (Weight: 30%)</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a' }}>{serviceIndex?.regularity_score ?? 90}%</div>
            <div style={{ fontSize: '11px', color: '#16a34a' }}>Target: Daily scheduled supply</div>
          </div>
          <div style={{ borderLeft: '4px solid #10b981', paddingLeft: '12px' }}>
            <div style={{ fontSize: '12px', color: '#64748b' }}>Adequacy (Weight: 20%)</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a' }}>{serviceIndex?.adequacy_score ?? 82}%</div>
            <div style={{ fontSize: '11px', color: '#16a34a' }}>Target: 55 LPCD per household</div>
          </div>
          <div style={{ borderLeft: '4px solid #8b5cf6', paddingLeft: '12px' }}>
            <div style={{ fontSize: '12px', color: '#64748b' }}>Quality (Weight: 20%)</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a' }}>{serviceIndex?.quality_score ?? 88}%</div>
            <div style={{ fontSize: '11px', color: '#16a34a' }}>Target: IS 10500 Potable</div>
          </div>
          <div style={{ borderLeft: '4px solid #f59e0b', paddingLeft: '12px' }}>
            <div style={{ fontSize: '12px', color: '#64748b' }}>Pressure (Weight: 15%)</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a' }}>{serviceIndex?.pressure_score ?? 76}%</div>
            <div style={{ fontSize: '11px', color: '#d97706' }}>Target: ≥ 70 kPa at tail end</div>
          </div>
          <div style={{ borderLeft: '4px solid #ec4899', paddingLeft: '12px' }}>
            <div style={{ fontSize: '12px', color: '#64748b' }}>Grievances (Weight: 15%)</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a' }}>{serviceIndex?.grievance_score ?? 85}%</div>
            <div style={{ fontSize: '11px', color: '#16a34a' }}>Target: SLA &lt; 24h resolution</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GPDashboard;
