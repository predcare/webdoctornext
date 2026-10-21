'use client';

import { baseUrl } from '@/services/api/endpoints';
import {
  TConnectionType,
  useNetworkStore,
} from '@/zustand/stores/useNetworkStore';
import { onlineManager } from '@tanstack/react-query';

type TNetworkInformation = EventTarget & {
  type?: string;
  effectiveType?: string;
};

const KNOWN_TYPES = new Set<TConnectionType>([
  'wifi',
  'cellular',
  'ethernet',
  'unknown',
  'none',
  'other',
]);

export const getBrowserConnection = () => {
  if (typeof navigator === 'undefined') return undefined;
  return (navigator as Navigator & { connection?: TNetworkInformation })
    .connection;
};

export const readConnectionType = (): TConnectionType => {
  if (typeof navigator === 'undefined' || !navigator.onLine) return 'none';

  const connection = getBrowserConnection();
  const rawType = connection?.type || connection?.effectiveType;
  if (rawType && KNOWN_TYPES.has(rawType as TConnectionType)) {
    return rawType as TConnectionType;
  }
  if (
    rawType === 'slow-2g' ||
    rawType === '2g' ||
    rawType === '3g' ||
    rawType === '4g'
  ) {
    return 'cellular';
  }
  if (rawType) return 'other';
  return navigator.onLine ? 'unknown' : 'none';
};

const publishNetwork = (
  isConnected: boolean,
  isInternetReachable: boolean | null,
) => {
  useNetworkStore.getState().setNetworkState({
    isConnected,
    isInternetReachable,
    connectionType: readConnectionType(),
  });
  onlineManager.setOnline(isConnected && isInternetReachable !== false);
};

export const readBrowserNetwork = () => {
  const isConnected =
    typeof navigator !== 'undefined' ? navigator.onLine : true;
  publishNetwork(isConnected, isConnected);
};

export const refreshNetworkState = async () => {
  const isConnected =
    typeof navigator !== 'undefined' ? navigator.onLine : true;
  if (!isConnected) {
    publishNetwork(false, false);
    return;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 4000);
  try {
    await fetch(baseUrl, {
      method: 'GET',
      mode: 'no-cors',
      cache: 'no-store',
      signal: controller.signal,
    });
    publishNetwork(true, true);
  } catch {
    publishNetwork(true, false);
  } finally {
    clearTimeout(timer);
  }
};

export const useNetworkStatus = () => {
  const isConnected = useNetworkStore((state) => state.isConnected);
  const isInternetReachable = useNetworkStore(
    (state) => state.isInternetReachable,
  );
  const connectionType = useNetworkStore((state) => state.connectionType);
  const isOffline = useNetworkStore((state) => state.isOffline);
  const wasOffline = useNetworkStore((state) => state.wasOffline);

  return {
    isConnected,
    isInternetReachable,
    connectionType,
    isOffline,
    wasOffline,
    checkConnectivity: refreshNetworkState,
  };
};
