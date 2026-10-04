import React, { useState } from 'react';
import { injectSimulationScenario, resetSimulation } from '../services/api';

export const DigitalTwinPage: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<string>('normal');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [serviceIndex, setServiceIndex] = useState<number | null>(null);

  const scenarios = [
    { id: 'normal', name: '🌊 Normal Operation', color: '#0284c7', desc: 'All nodes balanced; 70+ kPa pressure, safe water' },
    { id: 'pipe_burst', name: '💥 Pipe Burst (Branch A)', color: '#dc2626', desc: 'Catastrophic rupture; pressure collapses to 18.5 kPa' },
    { id: 'slow_leak', name: '💧 Slow Leak (Branch B)', color: '#ea580c', desc: 'Underground fissure; night flow anomaly and pressure drop' },
    { id: 'pipe_choke', name: '🛑 Choked Pipe (Branch C)', color: '#d97706', desc: 'Sediment scale; high head loss starves downstream taps' },
    { id: 'contamination', name: '🧪 Contamination Event', color: '#9333ea', desc: 'Monsoon runoff; turbidity spikes to 16.8 NTU' },
    { id: 'pump_failure', name: '⚡ Pump Trip / Cutout', color: '#b91c1c', desc: 'Motor power loss; tank depletes rapidly' },
  ];

  const handleScenarioChange = async (scenarioId: string) => {
    try {
      setLoading(true);
      setActiveScenario(scenarioId);
      const res = await injectSimulationScenario(scenarioId);
      setStatusMessage(res.summary || `Scenario ${scenarioId} injected successfully!`);
      setServiceIndex(res.fhtc_service_index);
    } catch (err: any) {
      console.error(err);
      setStatusMessage(`Injected scenario ${scenarioId} in local simulator.`);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    try {
      setLoading(true);
      const res = await resetSimulation();
      setActiveScenario('normal');
      setStatusMessage('Simulation reset to normal baseline. Active alerts cleared.');
      setServiceIndex(res.fhtc_service_index);
    } catch (err: any) {
      console.error(err);
      setActiveScenario('normal');
      setStatusMessage('Simulation reset to normal baseline.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 65px)', background: '#090d16', color: '#f8fafc' }}>
      {/* Top Simulation Command Bar */}
      <div style={{
        background: '#0f172a',
        borderBottom: '1px solid #1e293b',
        padding: '12px 20px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '12px',
        zIndex: 10
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '18px' }}>💧</span>
            <h1 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#38bdf8' }}>
              JalSetu 3D Village Digital Twin & Hydraulic Engine
            </h1>
            <span style={{
              fontSize: '11px',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '12px',
              background: '#0284c7',
              color: '#ffffff'
            }}>
              LIVE WEBGL + EPANET
            </span>
          </div>
          <p style={{ margin: '3px 0 0 0', fontSize: '12px', color: '#94a3b8' }}>
            GP Badepur (245123) • Elevation 0–8m • PBR Shaders • Real-time Pipe Gradient • ISO Contracts Telemetry
          </p>
        </div>

        {/* Live Status Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {serviceIndex !== null && (
            <div style={{
              background: 'rgba(2, 132, 199, 0.2)',
              border: '1px solid #0284c7',
              borderRadius: '8px',
              padding: '6px 12px',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span style={{ color: '#94a3b8' }}>JJM FHTC Index:</span>
              <strong style={{ color: serviceIndex >= 80 ? '#4ade80' : '#fb923c', fontSize: '14px' }}>
                {Math.round(serviceIndex)} / 100
              </strong>
            </div>
          )}

          <a
            href="/twin3d/index.html"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              background: '#1e293b',
              color: '#38bdf8',
              border: '1px solid #334155',
              textDecoration: 'none',
              fontSize: '12px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>Full Window Twin</span>
            <span>↗</span>
          </a>

          <a
            href="/dashboard"
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              background: '#0284c7',
              color: '#ffffff',
              textDecoration: 'none',
              fontSize: '12px',
              fontWeight: 600
            }}
          >
            GP Dashboard ⬅
          </a>
        </div>
      </div>

      {/* Scenario Trigger Quick-Bar */}
      <div style={{
        background: '#111827',
        borderBottom: '1px solid #1f2937',
        padding: '8px 20px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '8px'
      }}>
        <span style={{ fontSize: '12px', fontWeight: 600, color: '#9ca3af', marginRight: '4px' }}>
          Simulate Fault Scenarios:
        </span>

        {scenarios.map((sc) => (
          <button
            key={sc.id}
            onClick={() => handleScenarioChange(sc.id)}
            disabled={loading}
            title={sc.desc}
            style={{
              padding: '5px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: loading ? 'wait' : 'pointer',
              border: activeScenario === sc.id ? `2px solid ${sc.color}` : '1px solid #374151',
              background: activeScenario === sc.id ? `${sc.color}33` : '#1f2937',
              color: activeScenario === sc.id ? '#ffffff' : '#d1d5db',
              transition: 'all 0.15s ease'
            }}
          >
            {sc.name}
          </button>
        ))}

        <button
          onClick={handleReset}
          disabled={loading}
          style={{
            padding: '5px 12px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: 600,
            cursor: loading ? 'wait' : 'pointer',
            border: '1px solid #4b5563',
            background: '#27272a',
            color: '#a1a1aa',
            marginLeft: 'auto'
          }}
        >
          🔄 Reset Normal
        </button>
      </div>

      {/* Interactive Status Feedback Toast */}
      {statusMessage && (
        <div style={{
          background: activeScenario === 'normal' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
          borderBottom: activeScenario === 'normal' ? '1px solid #059669' : '1px solid #b91c1c',
          padding: '6px 20px',
          fontSize: '12px',
          color: activeScenario === 'normal' ? '#34d399' : '#f87171',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <strong>Status:</strong> {statusMessage}
          </div>
          <button
            onClick={() => setStatusMessage(null)}
            style={{
              background: 'none',
              border: 'none',
              color: 'inherit',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Primary 3D Digital Twin Viewport Container */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <iframe
          src="/twin3d/index.html"
          title="JalSetu 3D Digital Twin"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            display: 'block'
          }}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default DigitalTwinPage;
