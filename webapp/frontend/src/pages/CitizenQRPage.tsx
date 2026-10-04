import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { submitCitizenFeedback, getFHTCStatus } from '../services/api';
import VoiceInputButton from '../components/VoiceInputButton';
import OfflineBadge from '../components/OfflineBadge';

interface Props {
  lang: string;
  translations: Record<string, string>;
}

export const CitizenQRPage: React.FC<Props> = ({ lang, translations }) => {
  const { fhtcId } = useParams<{ fhtcId: string }>();
  const id = fhtcId || 'FHTC-UP-245123-0042';

  const [householdName, setHouseholdName] = useState<string>('Ramesh Sharma');
  const [habitation, setHabitation] = useState<string>('Badepur Khas');
  const [submitting, setSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [notes, setNotes] = useState('');
  const [lastWaterStatus, setLastWaterStatus] = useState<string>('NORMAL');

  useEffect(() => {
    // Fetch household metadata
    getFHTCStatus(id).then(data => {
      if (data) {
        setHouseholdName(data.head_of_household || 'Household Tap');
        setHabitation(data.habitation_name || 'Village');
        setLastWaterStatus(data.status || 'NORMAL');
      }
    }).catch(() => {
      // Fallback defaults for demo
    });
  }, [id]);

  const handleTap = async (waterReceived: boolean) => {
    setSubmitting(true);
    setStatusMsg(null);
    try {
      const payload = {
        fhtc_id: id,
        channel: 'qr',
        category: waterReceived ? 'water_received' : 'no_water',
        text: notes || (waterReceived ? 'One-tap confirmation: Water received normally' : 'One-tap complaint: Water did not arrive today'),
        lang: lang,
        ts: new Date().toISOString()
      };
      const res = await submitCitizenFeedback(payload);
      setStatusMsg({
        text: waterReceived
          ? (translations['water_came_msg'] || 'Thank you! Your water supply confirmation has been recorded.')
          : (translations['water_not_came_msg'] || 'Alert recorded. Jal Mitra and VWSC have been notified for immediate action.'),
        type: 'success'
      });
      setNotes('');
    } catch (err: any) {
      setStatusMsg({
        text: err.message || 'Error recording response. Queued offline.',
        type: 'error'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '16px' }}>
      <OfflineBadge />

      {/* Household Card */}
      <div style={{
        background: '#ffffff',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
        marginBottom: '20px',
        borderLeft: '6px solid #0284c7'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
              Jal Jeevan Mission • Har Ghar Jal
            </span>
            <h2 style={{ margin: '4px 0 0 0', color: '#0f172a' }}>{householdName}</h2>
            <p style={{ margin: '4px 0 0 0', color: '#475569', fontSize: '14px' }}>
              📍 {habitation} | Tap ID: <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>{id}</code>
            </p>
          </div>
          <div style={{
            background: lastWaterStatus === 'NORMAL' ? '#dcfce7' : '#fee2e2',
            color: lastWaterStatus === 'NORMAL' ? '#166534' : '#991b1b',
            padding: '6px 12px',
            borderRadius: '20px',
            fontWeight: 'bold',
            fontSize: '12px'
          }}>
            {lastWaterStatus === 'NORMAL' ? 'SUPPLY ACTIVE' : 'OUTAGE RISK'}
          </div>
        </div>
      </div>

      {statusMsg && (
        <div style={{
          padding: '14px',
          borderRadius: '8px',
          marginBottom: '20px',
          background: statusMsg.type === 'success' ? '#f0fdf4' : '#fef2f2',
          border: `1px solid ${statusMsg.type === 'success' ? '#86efac' : '#fca5a5'}`,
          color: statusMsg.type === 'success' ? '#166534' : '#991b1b',
          fontWeight: 500
        }}>
          {statusMsg.text}
        </div>
      )}

      {/* Primary Action Question */}
      <div style={{
        background: '#ffffff',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
        textAlign: 'center'
      }}>
        <h3 style={{ margin: '0 0 20px 0', fontSize: '20px', color: '#1e293b' }}>
          {translations['today_water_question'] || 'Did water arrive in your tap today?'}
        </h3>

        {/* Big Tap Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
          <button
            id="btn-water-came"
            disabled={submitting}
            onClick={() => handleTap(true)}
            style={{
              background: '#16a34a',
              color: '#ffffff',
              border: 'none',
              borderRadius: '12px',
              padding: '24px 16px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: submitting ? 'not-allowed' : 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(22, 163, 74, 0.3)'
            }}
          >
            <span style={{ fontSize: '36px' }}>💧</span>
            <span>{translations['water_came'] || 'Water Came'}</span>
            <span style={{ fontSize: '13px', opacity: 0.9 }}>पानी आया</span>
          </button>

          <button
            id="btn-water-not-came"
            disabled={submitting}
            onClick={() => handleTap(false)}
            style={{
              background: '#dc2626',
              color: '#ffffff',
              border: 'none',
              borderRadius: '12px',
              padding: '24px 16px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: submitting ? 'not-allowed' : 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)'
            }}
          >
            <span style={{ fontSize: '36px' }}>❌</span>
            <span>{translations['water_not_came'] || 'No Water'}</span>
            <span style={{ fontSize: '13px', opacity: 0.9 }}>पानी नहीं आया</span>
          </button>
        </div>

        {/* Optional Notes with Voice Input */}
        <div style={{ marginTop: '20px', textAlign: 'left' }}>
          <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '6px' }}>
            {translations['additional_notes'] || 'Optional Remark or Voice Note:'}
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              placeholder={translations['voice_or_type_placeholder'] || 'Speak or type here... (e.g. low pressure)'}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={{
                flex: 1,
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '14px'
              }}
            />
            <VoiceInputButton
              lang={lang}
              onTranscript={(text) => setNotes(prev => prev ? `${prev} ${text}` : text)}
            />
          </div>
        </div>
      </div>

      {/* Helpful Links */}
      <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px', color: '#64748b' }}>
        <p>
          Need to report dirty water, leakage, or request pipe repair?{' '}
          <a href={`/feedback?fhtc=${id}`} style={{ color: '#0284c7', fontWeight: 600 }}>
            Submit Full Grievance
          </a>
        </p>
        <p style={{ fontSize: '12px' }}>
          Jal Mitra Helpline: <strong>1800-180-1551</strong> (Toll Free) • Gram Panchayat Badepur
        </p>
      </div>
    </div>
  );
};

export default CitizenQRPage;
