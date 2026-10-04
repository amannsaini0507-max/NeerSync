import React from 'react';
import { OfflineBadge } from './OfflineBadge';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  lang: string;
  onChangeLang: (l: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab, lang, onChangeLang }) => {
  return (
    <header
      style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            backgroundColor: '#0284c7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '22px',
          }}
        >
          💧
        </div>
        <div>
          <h1 style={{ fontSize: '18px', fontWeight: 800, color: '#0369a1', lineHeight: '1.2' }}>
            NeerSync (नीर सिंक)
          </h1>
          <p style={{ fontSize: '11px', color: '#64748b' }}>Jal Jeevan Mission • FHTC Platform</p>
        </div>
      </div>

      <nav style={{ display: 'flex', gap: '8px' }}>
        {[
          { id: 'dashboard', label: lang === 'hi' ? '📊 ग्राम पंचायत' : '📊 GP Dashboard' },
          { id: 'qr', label: lang === 'hi' ? '🏷️ क्यूआर नल जल' : '🏷️ QR Tap Page' },
          { id: 'grievance', label: lang === 'hi' ? '📝 शिकायत दर्ज' : '📝 File Grievance' },
          { id: 'alerts', label: lang === 'hi' ? '⚠️ अलार्म व एस्केलेशन' : '⚠️ Alert Lifecycle' },
          { id: 'sync', label: lang === 'hi' ? '🔄 IMIS सिंक' : '🔄 IMIS Sync' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: currentTab === tab.id ? '#0284c7' : 'transparent',
              color: currentTab === tab.id ? '#ffffff' : '#334155',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <OfflineBadge />
        <select
          value={lang}
          onChange={(e) => onChangeLang(e.target.value)}
          style={{
            padding: '6px 10px',
            borderRadius: '8px',
            border: '1px solid #cbd5e1',
            fontSize: '13px',
            fontWeight: 600,
            backgroundColor: '#f8fafc',
            color: '#1e293b',
            cursor: 'pointer',
          }}
        >
          <option value="en">English</option>
          <option value="hi">हिंदी (Hindi)</option>
          <option value="mr">मराठी (Marathi)</option>
        </select>
      </div>
    </header>
  );
};
