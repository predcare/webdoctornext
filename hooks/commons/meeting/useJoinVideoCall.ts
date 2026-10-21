'use client';

import { useGetTokenMutation } from '@/hooks/react-query/appointments/appointments.hooks';
import { showErrorToast } from '@/lib/commons/toast';
import { projectRoutes } from '@/routes';
import { useLoadingStore } from '@/zustand/stores/useLoadingStore';
import { useMeetingStore } from '@/zustand/stores/useMeetingStore';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

type TJoinVideoCallParams = {
  appointmentId: number | string;
  patientId?: number | string;
  patientName?: string;
  appointmentGeneratedId?: string;
};

export const useJoinVideoCall = () => {
  const [isJoining, setIsJoining] = useState(false);

  const router = useRouter();
  const showLoader = useLoadingStore((state) => state.showLoader);
  const hideLoader = useLoadingStore((state) => state.hideLoader);
  const { mutateAsync: getTokenMutation } = useGetTokenMutation();
  const currentMeetingId = useMeetingStore((state) => state.meetingId);
  const currentApptId = useMeetingStore((state) => state.appointmentId);
  const setMeetingSession = useMeetingStore((state) => state.setMeetingSession);

  const joinVideoCall = useCallback(
    async ({
      appointmentId,
      patientId,
      patientName,
      appointmentGeneratedId,
    }: TJoinVideoCallParams) => {
      if (!patientId) {
        showErrorToast('Patient is required to start this video call.');
        return;
      }

      if (currentMeetingId && String(currentApptId) === String(appointmentId)) {
        router.push(projectRoutes.meetingCall(patientId, appointmentId));
        return;
      }

      setIsJoining(true);
      showLoader('Joining video consultation...');

      try {
        // Request device permissions early
        if (
          typeof navigator !== 'undefined' &&
          navigator.mediaDevices &&
          navigator.mediaDevices.getUserMedia
        ) {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({
              audio: true,
              video: true,
            });
            // Stop tracks immediately after permission check
            stream.getTracks().forEach((track) => track.stop());
          } catch (mediaErr: any) {
            console.warn('Media permission denied or partial:', mediaErr);
            showErrorToast(
              'Please allow camera and microphone access to join the video call.',
            );
            hideLoader();
            setIsJoining(false);
            return;
          }
        }

        const res = await getTokenMutation(appointmentId);
        if (!res?.data?.token || !res?.data?.meeting_id) {
          throw new Error('Failed to retrieve video session token');
        }

        const {
          token,
          meeting_id,
          appointment,
          patient: apiPatient,
        } = res.data;

        setMeetingSession({
          token,
          meetingId: meeting_id,
          appointmentId,
          appointmentGeneratedId:
            appointment?.appointment_id || appointmentGeneratedId,
          patient: {
            id: String(apiPatient?.id || patientId || ''),
            userId: apiPatient?.user_id,
            name: apiPatient?.name || patientName || 'Patient',
            gender: apiPatient?.gender,
            dateOfBirth: apiPatient?.date_of_birth,
            phone: apiPatient?.phone_number,
            email: apiPatient?.email,
          },
          startTime: appointment?.start_time,
          endTime: appointment?.end_time,
          slotDurationMinutes:
            appointment?.appointment_duration ||
            appointment?.slot_duration ||
            30,
          callElapsedSeconds: appointment?.call_elapsed_seconds || 0,
        });

        setIsJoining(false);

        router.push(projectRoutes.meetingCall(patientId, appointmentId));
      } catch (err: any) {
        hideLoader();
        setIsJoining(false);
        showErrorToast(
          err?.message || 'Failed to start video call. Please try again.',
        );
      }
    },
    [
      currentMeetingId,
      currentApptId,
      getTokenMutation,
      setMeetingSession,
      showLoader,
      hideLoader,
      router,
    ],
  );

  return {
    joinVideoCall,
    isJoining,
  };
};
