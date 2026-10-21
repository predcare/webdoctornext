'use client';

import { queryClient } from '@/components/Providers/ReactQueryProvider';
import { SocketEvents } from '@/configs/socket.constants';
import {
  resetMeetingAndGetSummaryPath,
  triggerMeetingLeave,
} from '@/hooks/commons/meeting/meetingSessionLeave';
import { MyAppointmentsQueryKeys } from '@/hooks/react-query/query.keys';
import { showInfoToast } from '@/lib/commons/toast';
import { normalizePathname, projectRoutes } from '@/routes';
import { useAlertStore } from '@/zustand/stores/useAlertStore';
import { useIncomingCallStore } from '@/zustand/stores/useIncomingCallStore';
import { useLoadingStore } from '@/zustand/stores/useLoadingStore';
import { useMeetingStore } from '@/zustand/stores/useMeetingStore';
import { useSocketStore } from '@/zustand/stores/useSocketStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const isPrescriptionRoute = () =>
  normalizePathname(window.location.pathname) === projectRoutes.managePrescriptions;

export default function SocketListeners() {
  const router = useRouter();
  const socket = useSocketStore((state) => state.socket);

  useEffect(() => {
    if (!socket) return;

    const handleHeartbeat = (payload: unknown) => {
      console.log('[Socket] HEARTBEAT received:', payload);
    };

    const handleIncomingCall = (payload: {
      appointmentId: string;
      name: string;
      meetingId: string;
      callType: string;
    }) => {
      const activeMeetingId = useMeetingStore.getState().meetingId;
      if (activeMeetingId && payload.meetingId) {
        return;
      }
      if (payload?.appointmentId) {
        useIncomingCallStore.getState().showCallBanner({
          appointmentId: payload.appointmentId,
          callType: payload?.callType,
          patientName: payload?.name,
          meetingId: payload?.meetingId,
        });
      }
    };

    const handleCallCancelled = (payload: { appointmentId: string }) => {
      if (!payload?.appointmentId) return;

      const incomingState = useIncomingCallStore.getState();
      if (String(payload.appointmentId) === String(incomingState.appointmentId)) {
        incomingState.hideCallBanner();
      }
    };

    const handleCallConnected = (payload: { appointmentId: string }) => {
      if (!payload?.appointmentId) return;

      const incomingState = useIncomingCallStore.getState();
      if (String(payload.appointmentId) === String(incomingState.appointmentId)) {
        incomingState.hideCallBanner();
      }
    };

    const handleTimeUpVideoCallEnded = async (payload: {
      appointmentId: string | number;
    }) => {
      const incomingApptId = payload?.appointmentId;
      if (!incomingApptId) return;

      const incomingState = useIncomingCallStore.getState();
      if (String(incomingApptId) === String(incomingState.appointmentId)) {
        incomingState.hideCallBanner();
      }

      const meetingState = useMeetingStore.getState();
      const isCallActiveForThisAppt =
        String(incomingApptId) === String(meetingState.appointmentId);
      const isCreatePrescription = isPrescriptionRoute();

      if (!isCallActiveForThisAppt) return;

      try {
        await triggerMeetingLeave();
      } catch (error) {
        console.warn('Error ending the call after time up:', error);
        if (isCreatePrescription) {
          useMeetingStore.getState().resetMeetingStore();
        } else {
          router.replace(resetMeetingAndGetSummaryPath());
        }
      }

      useLoadingStore.getState().hideLoader();

      await queryClient.invalidateQueries({
        queryKey: [MyAppointmentsQueryKeys.MyAppointments],
      });
      await queryClient.invalidateQueries({
        queryKey: [MyAppointmentsQueryKeys.MyAppointmentsInfo],
      });

      if (isCreatePrescription) {
        useAlertStore.getState().showInfo(
          'The consultation time is over. The call has ended.',
          'Time Up',
        );
        return;
      }

      showInfoToast('Consultation time has ended. The call has ended.');
    };

    socket.on(SocketEvents.HEARTBEAT, handleHeartbeat);
    socket.on(SocketEvents.INCOMING_CALL, handleIncomingCall);
    socket.on(SocketEvents.INCOMING_CALL_CANCELLED, handleCallCancelled);
    socket.on(SocketEvents.TIME_UP_VIDEO_CALL_ENDED, handleTimeUpVideoCallEnded);
    socket.on(SocketEvents.CALL_CONNECTED, handleCallConnected);

    return () => {
      socket.off(SocketEvents.HEARTBEAT, handleHeartbeat);
      socket.off(SocketEvents.INCOMING_CALL, handleIncomingCall);
      socket.off(SocketEvents.INCOMING_CALL_CANCELLED, handleCallCancelled);
      socket.off(SocketEvents.TIME_UP_VIDEO_CALL_ENDED, handleTimeUpVideoCallEnded);
      socket.off(SocketEvents.CALL_CONNECTED, handleCallConnected);
    };
  }, [socket, router]);

  return null;
}
