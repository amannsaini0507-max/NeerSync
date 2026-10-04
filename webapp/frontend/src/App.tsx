import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import GPDashboard from './pages/GPDashboard';
import CitizenQRPage from './pages/CitizenQRPage';
import CitizenGrievancePage from './pages/CitizenGrievancePage';
import AlertManagementPage from './pages/AlertManagementPage';
import IMISSyncPage from './pages/IMISSyncPage';
import DigitalTwinPage from './pages/DigitalTwinPage';

import en from './i18n/en.json';
import hi from './i18n/hi.json';
import mr from './i18n/mr.json';

const translationsMap: Record<string, Record<string, string>> = {
  en,
  hi,
  mr
};

export const App: React.FC = () => {
  const [lang, setLang] = useState<string>(() => localStorage.getItem('jalsetu_lang') || 'en');

  const handleLangChange = (newLang: string) => {
    setLang(newLang);
    localStorage.setItem('jalsetu_lang', newLang);
  };

  const t = translationsMap[lang] || en;

  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#1e293b', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <Navbar
          currentLang={lang}
          onLanguageChange={handleLangChange}
          translations={t}
        />

        <main style={{ paddingBottom: '40px' }}>
          <Routes>
            <Route path="/" element={<GPDashboard lang={lang} translations={t} />} />
            <Route path="/dashboard" element={<GPDashboard lang={lang} translations={t} />} />
            <Route path="/f/:fhtcId" element={<CitizenQRPage lang={lang} translations={t} />} />
            <Route path="/feedback" element={<CitizenGrievancePage lang={lang} translations={t} />} />
            <Route path="/alerts" element={<AlertManagementPage />} />
            <Route path="/sync" element={<IMISSyncPage />} />
            <Route path="/twin" element={<DigitalTwinPage />} />
            <Route path="/simulation" element={<DigitalTwinPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
