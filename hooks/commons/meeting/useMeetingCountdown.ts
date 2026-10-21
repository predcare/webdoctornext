'use client';

import { showWarningToast } from '@/lib/commons/toast';
import { useMeetingStore } from '@/zustand/stores/useMeetingStore';
import { useEffect, useMemo, useRef } from 'react';

export const useMeetingCountdown = () => {
  // 1. States & Refs
  const warnedAtTwoMinRef = useRef(false);

  // 2. Hooks
  const remainingSeconds = useMeetingStore((state) => state.remainingSeconds);
  const callState = useMeetingStore((state) => state.callState);
  const decrementRemainingSeconds = useMeetingStore(
    (state) => state.decrementRemainingSeconds,
  );

  // 3. useMemo & Functions
  const formattedTime = useMemo(() => {
    const mins = Math.floor(remainingSeconds / 60);
    const secs = remainingSeconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }, [remainingSeconds]);

  const isWarning = remainingSeconds <= 300 && remainingSeconds > 60;
  const isUrgent = remainingSeconds <= 60 && remainingSeconds > 0;

  // 4. useEffects
  useEffect(() => {
    // Only countdown while call is actively connected with patient
    if (callState !== 'CONNECTED' || remainingSeconds <= 0) {
      return;
    }

    const intervalId = setInterval(() => {
      decrementRemainingSeconds();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [callState, remainingSeconds, decrementRemainingSeconds]);

  useEffect(() => {
    if (remainingSeconds === 120 && !warnedAtTwoMinRef.current) {
      warnedAtTwoMinRef.current = true;
      showWarningToast('2 minutes remaining in this consultation slot.');
    }
  }, [remainingSeconds]);

  // 5. Render Guards & Return
  return {
    remainingSeconds,
    formattedTime,
    isWarning,
    isUrgent,
    isConnected: callState === 'CONNECTED',
  };
};
