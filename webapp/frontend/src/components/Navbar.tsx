import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { OfflineBadge } from './OfflineBadge';

interface NavbarProps {
  currentTab?: string;
  onSelectTab?: (tab: string) => void;
  lang?: string;
  onChangeLang?: (l: string) => void;
  currentLang?: string;
  onLanguageChange?: (l: string) => void;
  translations?: Record<string, string>;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  lang,
  onChangeLang,
  currentLang,
  onLanguageChange,
  translations
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const activeLang = currentLang || lang || 'en';
  const handleLangChange = (newLang: string) => {
    if (onLanguageChange) onLanguageChange(newLang);
    else if (onChangeLang) onChangeLang(newLang);
  };

  const navItems = [
    {
      id: 'dashboard',
      path: '/dashboard',
      label: activeLang === 'hi' ? '📊 ग्राम पंचायत' : '📊 GP Dashboard'
    },
    {
      id: 'twin',
      path: '/twin',
      label: activeLang === 'hi' ? '💧 3D डिजिटल ट्विन' : '💧 3D Digital Twin',
      badge: '3D'
    },
    {
      id: 'qr',
      path: '/f/FHTC-UP-245123-0001',
      label: activeLang === 'hi' ? '🏷️ क्यूआर नल जल' : '🏷️ QR Tap'
    },
    {
      id: 'grievance',
      path: '/feedback',
      label: activeLang === 'hi' ? '📝 शिकायत दर्ज' : '📝 Grievances'
    },
    {
      id: 'alerts',
      path: '/alerts',
      label: activeLang === 'hi' ? '⚠️ अलार्म व एस्केलेशन' : '⚠️ Alerts'
    },
    {
      id: 'sync',
      path: '/sync',
      label: activeLang === 'hi' ? '🔄 IMIS सिंक' : '🔄 IMIS Sync'
    },
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    if (onSelectTab) {
      onSelectTab(item.id);
    }
    navigate(item.path);
  };

  const isCurrentActive = (item: typeof navItems[0]) => {
    if (currentTab) return currentTab === item.id;
    if (item.path === '/dashboard') {
      return location.pathname === '/' || location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(item.path);
  };

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
      <div
        onClick={() => navigate('/dashboard')}
        style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
      >
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
          <h1 style={{ fontSize: '18px', fontWeight: 800, color: '#0369a1', lineHeight: '1.2', margin: 0 }}>
            NeerSync (नीर सिंक)
          </h1>
          <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>Jal Jeevan Mission • FHTC Platform</p>
        </div>
      </div>

      <nav style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
        {navItems.map((item) => {
          const active = isCurrentActive(item);
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item)}
              style={{
                padding: '7px 12px',
                borderRadius: '8px',
                border: active ? '1px solid #0284c7' : '1px solid transparent',
                backgroundColor: active ? '#0284c7' : 'transparent',
                color: active ? '#ffffff' : '#334155',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>{item.label}</span>
              {item.badge && (
                <span
                  style={{
                    fontSize: '10px',
                    padding: '1px 5px',
                    borderRadius: '4px',
                    backgroundColor: active ? '#ffffff' : '#0284c7',
                    color: active ? '#0284c7' : '#ffffff',
                    fontWeight: 700
                  }}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <OfflineBadge />
        <select
          value={activeLang}
          onChange={(e) => handleLangChange(e.target.value)}
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

export default Navbar;
