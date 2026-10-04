import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { submitCitizenFeedback } from '../services/api';
import VoiceInputButton from '../components/VoiceInputButton';
import OfflineBadge from '../components/OfflineBadge';

interface Props {
  lang: string;
  translations: Record<string, string>;
}

const CATEGORIES = [
  { key: 'no_water', labelEn: 'No Water Supply', labelHi: 'पानी नहीं आया', icon: '🚫' },
  { key: 'low_pressure', labelEn: 'Low Pressure / Trickle', labelHi: 'कम दबाव / धीमा पानी', icon: '📉' },
  { key: 'dirty_water', labelEn: 'Dirty / Turbid Water', labelHi: 'गंदा / मटमैला पानी', icon: '🟤' },
  { key: 'leakage', labelEn: 'Pipeline Leakage', labelHi: 'पाइपलाइन लीकेज', icon: '💦' },
  { key: 'other', labelEn: 'Broken Tap / Meter / Other', labelHi: 'अन्य समस्या', icon: '🔧' }
];

export const CitizenGrievancePage: React.FC<Props> = ({ lang, translations }) => {
  const [searchParams] = useSearchParams();
  const [fhtcId, setFhtcId] = useState(searchParams.get('fhtc') || 'FHTC-UP-245123-0042');
  const [category, setCategory] = useState<string>('dirty_water');
  const [description, setDescription] = useState<string>('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [gpsStatus, setGpsStatus] = useState<string>('idle');
  const [submitting, setSubmitting] = useState(false);
  const [resultMsg, setResultMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Request GPS coordinates
  const captureGps = () => {
    if (!navigator.geolocation) {
      setGpsStatus('Geolocation not supported, using GP centroid default');
      setCoords({ lat: 28.9845, lon: 77.7064 });
      return;
    }
    setGpsStatus('Acquiring high-accuracy GPS...');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        setGpsStatus(`GPS Acquired: ±${Math.round(pos.coords.accuracy)}m`);
      },
      (err) => {
        setGpsStatus('GPS permission denied or timeout; using GP approximate location');
        setCoords({ lat: 28.9845, lon: 77.7064 });
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  };

  useEffect(() => {
    captureGps();
  }, []);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setResultMsg(null);

    try {
      const payload: any = {
        fhtc_id: fhtcId,
        channel: 'app',
        category: category,
        text: description || `${category.replace('_', ' ')} reported via NeerSync Citizen App`,
        lang: lang,
        ts: new Date().toISOString()
      };
      if (coords) {
        payload.lat = coords.lat;
        payload.lon = coords.lon;
      }
      if (photoPreview) {
        payload.photo_url = 'https://storage.neersync.gov.in/photos/grievance_' + Date.now() + '.jpg';
      }

      await submitCitizenFeedback(payload);
      setResultMsg({
        text: translations['complaint_submitted_success'] || 'Complaint registered successfully! Assigned to Jal Mitra & VWSC with SLA 24h.',
        type: 'success'
      });
      setDescription('');
      setPhotoPreview(null);
    } catch (err: any) {
      setResultMsg({
        text: err.message || 'Saved to offline outbox. Will auto-sync when network returns.',
        type: 'error'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto', padding: '16px' }}>
      <OfflineBadge />

      <div style={{
        background: '#ffffff',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
        marginBottom: '20px'
      }}>
        <h2 style={{ margin: '0 0 8px 0', color: '#0f172a' }}>
          {translations['register_grievance'] || 'Lodge Water Quality / Supply Grievance'}
        </h2>
        <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>
          Gram Panchayat Badepur (245123) • Instant escalation to Jal Mitra and VWSC
        </p>
      </div>

      {resultMsg && (
        <div style={{
          padding: '14px',
          borderRadius: '8px',
          marginBottom: '20px',
          background: resultMsg.type === 'success' ? '#f0fdf4' : '#fef2f2',
          border: `1px solid ${resultMsg.type === 'success' ? '#86efac' : '#fca5a5'}`,
          color: resultMsg.type === 'success' ? '#166534' : '#991b1b',
          fontWeight: 600
        }}>
          {resultMsg.text}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{
        background: '#ffffff',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
      }}>
        {/* FHTC ID Input */}
        <div style={{ marginBottom: '18px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
            Household Tap ID (FHTC ID):
          </label>
          <input
            type="text"
            required
            value={fhtcId}
            onChange={(e) => setFhtcId(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              fontSize: '14px'
            }}
          />
        </div>

        {/* Category Selection - Big Icons */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '8px' }}>
            Select Issue Type / समस्या का प्रकार:
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '8px' }}>
            {CATEGORIES.map(cat => {
              const isSelected = category === cat.key;
              return (
                <button
                  type="button"
                  key={cat.key}
                  onClick={() => setCategory(cat.key)}
                  style={{
                    background: isSelected ? '#eff6ff' : '#f8fafc',
                    border: `2px solid ${isSelected ? '#0284c7' : '#e2e8f0'}`,
                    borderRadius: '10px',
                    padding: '12px 8px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span style={{ fontSize: '24px' }}>{cat.icon}</span>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: isSelected ? '#0369a1' : '#475569', textAlign: 'center' }}>
                    {lang === 'hi' ? cat.labelHi : cat.labelEn}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Voice or Text Description */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>
              Describe the problem / विवरण:
            </label>
            <VoiceInputButton
              lang={lang}
              onTranscript={(text) => setDescription(prev => prev ? `${prev} ${text}` : text)}
            />
          </div>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Type or click microphone above to speak in Hindi or English..."
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              fontSize: '14px',
              resize: 'vertical'
            }}
          />
        </div>

        {/* Geotag & Photo Upload */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
          {/* Geotag */}
          <div style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '12px'
          }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>
              📍 Geo-Tag Status
            </span>
            <div style={{ fontSize: '12px', color: coords ? '#166534' : '#991b1b', fontWeight: 500 }}>
              {coords ? `${coords.lat.toFixed(4)}°N, ${coords.lon.toFixed(4)}°E` : 'Acquiring...'}
            </div>
            <button
              type="button"
              onClick={captureGps}
              style={{
                marginTop: '6px',
                background: '#e2e8f0',
                border: 'none',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '11px',
                cursor: 'pointer'
              }}
            >
              Refresh GPS
            </button>
          </div>

          {/* Photo */}
          <div style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '12px'
          }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>
              📷 Attach Photo
            </span>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handlePhotoUpload}
              style={{ fontSize: '11px', width: '100%' }}
            />
            {photoPreview && (
              <img
                src={photoPreview}
                alt="Uploaded issue"
                style={{ width: '100%', height: '50px', objectFit: 'cover', borderRadius: '4px', marginTop: '6px' }}
              />
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          id="btn-submit-grievance"
          type="submit"
          disabled={submitting}
          style={{
            width: '100%',
            background: '#0284c7',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            padding: '14px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: submitting ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 10px rgba(2, 132, 199, 0.3)'
          }}
        >
          {submitting ? 'Submitting...' : 'Submit Grievance / शिकायत दर्ज करें'}
        </button>
      </form>
    </div>
  );
};

export default CitizenGrievancePage;
