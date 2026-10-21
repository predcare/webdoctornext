'use client';

import { refreshNetworkState } from '@/hooks/commons/useNetworkStatus';
import { projectRoutes } from '@/routes';
import { NetworkStatusWrapper } from '@/styles/CustomStyled/NetworkStatusWrapper';
import { useMeetingStore } from '@/zustand/stores/useMeetingStore';
import { useNetworkStore } from '@/zustand/stores/useNetworkStore';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function GlobalNoInternetBlocker() {
  const [isRetrying, setIsRetrying] = useState(false);
  const router = useRouter();
  const isOffline = useNetworkStore((state) => state.isOffline);
  const meetingToken = useMeetingStore((state) => state.token);
  const resetMeetingStore = useMeetingStore((state) => state.resetMeetingStore);

  const handleRetry = async () => {
    if (isRetrying) return;
    setIsRetrying(true);
    try {
      await refreshNetworkState();
    } finally {
      setIsRetrying(false);
    }
  };

  const handleLeaveMeeting = () => {
    resetMeetingStore();
    router.push(projectRoutes.appointments);
  };

  if (!isOffline) return null;

  return (
    <NetworkStatusWrapper>
      <div className="network-blocker" role="alertdialog" aria-labelledby="offline-title">
        <div className="blocker-card">
          <div className="blocker-icon" aria-hidden>
            <WifiOffIcon />
          </div>
          <span className="blocker-badge">Offline Mode</span>
          <h2 className="blocker-title" id="offline-title">
            No Internet Connection
          </h2>
          <p className="blocker-description">
            PredCare requires an active connection to synchronize patient records,
            consultations, and appointments.
          </p>
        </div>
        <div className="blocker-actions">
          <button
            className="retry-button"
            type="button"
            onClick={handleRetry}
            disabled={isRetrying}
          >
            {isRetrying ? 'Checking...' : 'Retry Connection'}
          </button>
          {meetingToken ? (
            <button className="leave-button" type="button" onClick={handleLeaveMeeting}>
              Exit Ongoing Consultation
            </button>
          ) : null}
        </div>
      </div>
    </NetworkStatusWrapper>
  );
}
