'use client';

import {
  getBrowserConnection,
  readBrowserNetwork,
} from '@/hooks/commons/useNetworkStatus';
import { useEffect } from 'react';

export default function NetworkEventListener() {
  useEffect(() => {
    const handleChange = () => {
      readBrowserNetwork();
    };

    handleChange();
    window.addEventListener('online', handleChange);
    window.addEventListener('offline', handleChange);

    const connection = getBrowserConnection();
    connection?.addEventListener('change', handleChange);

    return () => {
      window.removeEventListener('online', handleChange);
      window.removeEventListener('offline', handleChange);
      connection?.removeEventListener('change', handleChange);
    };
  }, []);

  return null;
}
