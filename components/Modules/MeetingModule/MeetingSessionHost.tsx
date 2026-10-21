'use client';

import { registerLeaveHandler } from '@/hooks/commons/meeting/meetingSessionLeave';
import { useAuthStore } from '@/zustand/stores/useAuthStore';
import { useMeetingStore } from '@/zustand/stores/useMeetingStore';
import { MeetingProvider, useMeeting } from '@videosdk.live/react-sdk';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import MeetingMiniPlayer from './MeetingMiniPlayer';

function MeetingSessionController() {

  const router = useRouter();
  const pathname = usePathname();
  const appointmentId = useMeetingStore((state) => state.appointmentId);
  const setRemoteParticipantId = useMeetingStore(
    (state) => state.setRemoteParticipantId
  );
  const setCallState = useMeetingStore((state) => state.setCallState);
  const setErrorState = useMeetingStore((state) => state.setErrorState);
  const resetMeetingStore = useMeetingStore((state) => state.resetMeetingStore);

  const meeting = useMeeting({
    onMeetingJoined: () => {
      setCallState('WAITING_FOR_PATIENT');
    },
    onParticipantJoined: (participant) => {
      setRemoteParticipantId(participant.id);
    },
    onParticipantLeft: () => {
      setRemoteParticipantId(null);
    },
    onMeetingLeft: () => {
      const currentApptId = appointmentId;
      resetMeetingStore();
      router.replace(
        currentApptId
          ? `/dashboard/meeting/summary?appointmentId=${currentApptId}`
          : '/dashboard/appointments'
      );
    },
    onError: (error) => {
      setErrorState(error?.message || 'Video session encountered an error.');
    },
  });

  // 3. useMemo & Functions
  const isMeetingRoute = pathname === '/dashboard/meeting';

  // 4. useEffects
  useEffect(() => {
    registerLeaveHandler(meeting.leave);
    return () => {
      registerLeaveHandler(null);
    };
  }, [meeting.leave]);

  // 5. Render Guards & JSX
  if (!isMeetingRoute) {
    return <MeetingMiniPlayer />;
  }

  return null;
}

export default function MeetingSessionHost() {
  // 1. States & Refs
  // (none)

  // 2. Hooks
  const token = useMeetingStore((state) => state.token);
  const meetingId = useMeetingStore((state) => state.meetingId);
  const isMicOn = useMeetingStore((state) => state.isMicOn);
  const isCameraOn = useMeetingStore((state) => state.isCameraOn);
  const userData = useAuthStore((state) => state.userData);

  // 3. useMemo & Functions
  const doctorName = useMemo(() => {
    return userData?.name ? `Dr. ${userData.name}` : 'Doctor';
  }, [userData?.name]);

  const doctorParticipantId = useMemo(() => {
    return userData?.id ? `doctor_${userData.id}` : undefined;
  }, [userData?.id]);

  // 4. useEffects
  // (none)

  // 5. Render Guards & JSX
  if (!token || !meetingId) {
    return null;
  }

  return (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: isMicOn,
        webcamEnabled: isCameraOn,
        name: doctorName,
        participantId: doctorParticipantId,
        maxResolution: 'hd',
        mode: 'SEND_AND_RECV',
        debugMode: false,
      }}
      token={token}
      joinWithoutUserInteraction={true}
    >
      <MeetingSessionController />
    </MeetingProvider>
  );
}
