'use client';

import { SocketEvents } from '@/configs/socket.constants';
import { triggerMeetingLeave } from '@/hooks/commons/meeting/meetingSessionLeave';
import { showWarningToast } from '@/lib/commons/toast';
import { useMeetingStore } from '@/zustand/stores/useMeetingStore';
import { useSocketStore } from '@/zustand/stores/useSocketStore';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';

export default function CallSocketListeners() {
  // 1. States & Refs
  // (none)

  // 2. Hooks
  const router = useRouter();
  const socket = useSocketStore((state) => state.socket);
  const appointmentId = useMeetingStore((state) => state.appointmentId);

  // 3. useMemo & Functions
  const handleTimeUp = useCallback(
    async (payload?: { appointmentId?: string | number }) => {
      const incomingApptId = String(payload?.appointmentId || '');
      const currentApptId = String(appointmentId || '');

      if (
        !currentApptId ||
        (incomingApptId && incomingApptId !== currentApptId)
      ) {
        return;
      }

      showWarningToast('The appointment slot duration has ended.');

      await triggerMeetingLeave();
      router.push(`/dashboard/meeting/summary?appointmentId=${currentApptId}`);
    },
    [appointmentId, router],
  );

  // 4. useEffects
  useEffect(() => {
    if (!socket) return;

    socket.on(SocketEvents.TIME_UP_VIDEO_CALL_ENDED, handleTimeUp);

    return () => {
      socket.off(SocketEvents.TIME_UP_VIDEO_CALL_ENDED, handleTimeUp);
    };
  }, [socket, handleTimeUp]);

  // 5. Render Guards & JSX
  return null;
}
