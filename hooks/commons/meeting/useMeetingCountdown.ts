'use client';

import { showWarningToast } from '@/lib/commons/toast';
import { useMeetingStore } from '@/zustand/stores/useMeetingStore';
import { useEffect, useMemo, useRef } from 'react';

const TWO_MINUTES_SECONDS = 120;

export const useMeetingCountdownTicker = () => {
  const remoteParticipantId = useMeetingStore(
    (state) => state.remoteParticipantId,
  );
  const setRemainingSeconds = useMeetingStore(
    (state) => state.setRemainingSeconds,
  );
  const warnedAtTwoMinRef = useRef(false);

  useEffect(() => {
    if (!remoteParticipantId) {
      return;
    }

    const notifyTwoMinPending = (seconds: number) => {
      if (
        warnedAtTwoMinRef.current ||
        seconds <= 0 ||
        seconds > TWO_MINUTES_SECONDS
      ) {
        return;
      }
      warnedAtTwoMinRef.current = true;
      showWarningToast('2 minutes remaining in this consultation slot.');
    };

    notifyTwoMinPending(useMeetingStore.getState().remainingSeconds);

    if (useMeetingStore.getState().remainingSeconds <= 0) {
      return;
    }

    const intervalId = setInterval(() => {
      const current = useMeetingStore.getState().remainingSeconds;
      if (current <= 1) {
        setRemainingSeconds(0);
        clearInterval(intervalId);
        return;
      }
      const next = current - 1;
      setRemainingSeconds(next);
      notifyTwoMinPending(next);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [remoteParticipantId, setRemainingSeconds]);
};

export const useMeetingCountdown = () => {
  const remainingSeconds = useMeetingStore((state) => state.remainingSeconds);
  const callState = useMeetingStore((state) => state.callState);

  const formattedTime = useMemo(() => {
    const mins = Math.floor(remainingSeconds / 60);
    const secs = remainingSeconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }, [remainingSeconds]);

  const isWarning = remainingSeconds <= 300 && remainingSeconds > 60;
  const isUrgent = remainingSeconds <= 60 && remainingSeconds > 0;

  return {
    remainingSeconds,
    formattedTime,
    isWarning,
    isUrgent,
    isConnected: callState === 'CONNECTED',
  };
};
