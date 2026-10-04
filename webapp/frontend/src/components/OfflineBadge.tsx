import React, { useState, useEffect } from 'react';
import { offlineStore } from '../services/offlineStore';
import { api } from '../services/api';

export const OfflineBadge: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingCount, setPendingCount] = useState(0);

  const updateStatus = () => {
    setIsOnline(navigator.onLine);
    const queue = offlineStore.getQueuedSubmissions();
    setPendingCount(queue.length);
  };

  useEffect(() => {
    updateStatus();
    window.addEventListener('online', async () => {
      setIsOnline(true);
      const synced = await offlineStore.syncPending(api);
      if (synced > 0) {
        alert(`Network restored! ${synced} offline report(s) synchronized to JalSetu.`);
      }
      updateStatus();
    });
    window.addEventListener('offline', () => setIsOnline(false));

    const timer = setInterval(updateStatus, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 10px',
          borderRadius: '999px',
          fontSize: '12px',
          fontWeight: 600,
          backgroundColor: isOnline ? '#dcfce7' : '#fee2e2',
          color: isOnline ? '#166534' : '#991b1b',
        }}
      >
        <span
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: isOnline ? '#22c55e' : '#ef4444',
          }}
        />
        {isOnline ? 'Online' : 'Offline Mode'}
      </span>
      {pendingCount > 0 && (
        <span
          style={{
            padding: '4px 8px',
            borderRadius: '6px',
            fontSize: '11px',
            fontWeight: 700,
            backgroundColor: '#fef3c7',
            color: '#b45309',
          }}
        >
          {pendingCount} Pending Sync
        </span>
      )}
    </div>
  );
};
