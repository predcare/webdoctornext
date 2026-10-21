'use client';

import {
  registerLeaveHandler,
  resetMeetingAndGetSummaryPath,
} from '@/hooks/commons/meeting/meetingSessionLeave';
import { useMeetingCountdownTicker } from '@/hooks/commons/meeting/useMeetingCountdown';
import { isMeetingCallPath, normalizePathname, projectRoutes } from '@/routes';
import { useAuthStore } from '@/zustand/stores/useAuthStore';
import { useMeetingStore } from '@/zustand/stores/useMeetingStore';
import { MeetingProvider, useMeeting } from '@videosdk.live/react-sdk';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect, useMemo, useRef } from 'react';
import MeetingMiniPlayer from './MeetingMiniPlayer';

type MeetingSessionHostProps = {
  children: ReactNode;
};

function MeetingSessionController() {
  const router = useRouter();
  const pathname = normalizePathname(usePathname() || '');
  const hasEndedRef = useRef(false);
  const previousPathRef = useRef(pathname);

  const setRemoteParticipantId = useMeetingStore(
    (state) => state.setRemoteParticipantId,
  );
  const setCallState = useMeetingStore((state) => state.setCallState);
  const setErrorState = useMeetingStore((state) => state.setErrorState);
  const isMiniPlayer = useMeetingStore((state) => state.isMiniPlayer);
  const setIsMiniPlayer = useMeetingStore((state) => state.setIsMiniPlayer);

  const meeting = useMeeting({
    onMeetingJoined: () => {
      const state = useMeetingStore.getState();
      if (state.callState === 'ERROR' || state.callState === 'ENDED') {
        return;
      }
      setCallState(
        state.remoteParticipantId ? 'CONNECTED' : 'WAITING_FOR_PATIENT',
      );
    },
    onMeetingLeft: () => {
      if (hasEndedRef.current) {
        return;
      }
      hasEndedRef.current = true;
      const currentPath = normalizePathname(window.location.pathname);
      if (currentPath === projectRoutes.managePrescriptions) {
        useMeetingStore.getState().resetMeetingStore();
        return;
      }
      const summaryPath = resetMeetingAndGetSummaryPath();
      router.replace(summaryPath);
    },
    onError: ({ message }) => {
      setErrorState(message || 'Video session encountered an error.');
    },
  });
  const { participants, localParticipant } = meeting;
  const localParticipantId = localParticipant?.id;

  useMeetingCountdownTicker();

  const isMeetingRoute = isMeetingCallPath(pathname);
  const isSummaryRoute = pathname.startsWith(`${projectRoutes.meeting}/summary`);

  useEffect(() => {
    registerLeaveHandler(meeting.leave);
    return () => {
      registerLeaveHandler(null);
    };
  }, [meeting.leave]);

  useEffect(() => {
    const previousPath = previousPathRef.current;

    if (isMeetingCallPath(pathname)) {
      if (useMeetingStore.getState().isMiniPlayer) {
        setIsMiniPlayer(false);
      }
    } else if (isMeetingCallPath(previousPath)) {
      setIsMiniPlayer(true);
    }

    previousPathRef.current = pathname;
  }, [pathname, setIsMiniPlayer]);

  useEffect(() => {
    let patientId: string | null = null;
    for (const [id] of participants) {
      if (id !== localParticipantId) {
        patientId = id;
        break;
      }
    }

    if (useMeetingStore.getState().remoteParticipantId !== patientId) {
      setRemoteParticipantId(patientId);
    }
  }, [participants, localParticipantId, setRemoteParticipantId]);

  if (isMiniPlayer && !isMeetingRoute && !isSummaryRoute) {
    return <MeetingMiniPlayer />;
  }

  return null;
}

export default function MeetingSessionHost({ children }: MeetingSessionHostProps) {
  const token = useMeetingStore((state) => state.token);
  const meetingId = useMeetingStore((state) => state.meetingId);
  const userData = useAuthStore((state) => state.userData);

  const doctorName = useMemo(() => {
    return userData?.name ? `Dr. ${userData.name}` : 'Doctor';
  }, [userData?.name]);

  const doctorParticipantId = useMemo(() => {
    return userData?.id ? `doctor_${userData.id}` : undefined;
  }, [userData?.id]);

  const initialMedia = useMemo(() => {
    const { isMicOn, isCameraOn } = useMeetingStore.getState();
    return {
      micEnabled: isMicOn,
      webcamEnabled: isCameraOn,
    };
  }, [meetingId]);

  if (!token || !meetingId) {
    return children;
  }

  return (
    <MeetingProvider
      key={meetingId}
      config={{
        meetingId,
        micEnabled: initialMedia.micEnabled,
        webcamEnabled: initialMedia.webcamEnabled,
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
      {children}
    </MeetingProvider>
  );
}
