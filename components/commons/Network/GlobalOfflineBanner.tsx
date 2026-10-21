'use client';

import { NetworkStatusWrapper } from '@/styles/CustomStyled/NetworkStatusWrapper';
import { useNetworkStore } from '@/zustand/stores/useNetworkStore';
import { useEffect } from 'react';

export default function GlobalOfflineBanner() {
  const isOffline = useNetworkStore((state) => state.isOffline);
  const wasOffline = useNetworkStore((state) => state.wasOffline);
  const dismissWasOffline = useNetworkStore((state) => state.dismissWasOffline);
  const isVisible = wasOffline && !isOffline;

  useEffect(() => {
    if (!isVisible) return;

    const timerId = setTimeout(() => {
      dismissWasOffline();
    }, 2500);

    return () => clearTimeout(timerId);
  }, [isVisible, dismissWasOffline]);

  if (!isVisible) return null;

  return (
    <NetworkStatusWrapper>
      <div className="network-banner is-online" role="status">
        <div className="banner-copy">
          <span className="banner-title">Back Online</span>
          <span className="banner-subtitle">Connection restored. Resyncing data...</span>
        </div>
      </div>
    </NetworkStatusWrapper>
  );
}
