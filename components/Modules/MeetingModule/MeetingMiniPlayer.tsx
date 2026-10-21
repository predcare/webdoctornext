'use client';

import { resetMeetingAndGetSummaryPath } from '@/hooks/commons/meeting/meetingSessionLeave';
import { useMeetingCountdown } from '@/hooks/commons/meeting/useMeetingCountdown';
import { useMeetingMedia } from '@/hooks/commons/meeting/useMeetingMedia';
import { projectRoutes } from '@/routes';
import { MeetingMiniPlayerShell } from '@/styles/CustomStyled/MeetingWrapper';
import { useMeetingStore } from '@/zustand/stores/useMeetingStore';
import CallEndIcon from '@mui/icons-material/CallEnd';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import { Avatar, IconButton, Tooltip } from '@mui/material';
import {
  useMeeting,
  useParticipant,
  VideoPlayer,
} from '@videosdk.live/react-sdk';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function MeetingMiniPlayer() {
  const router = useRouter();
  const { leave, presenterId } = useMeeting();
  const appointmentId = useMeetingStore((state) => state.appointmentId);
  const patientInfo = useMeetingStore((state) => state.patientInfo);
  const remoteParticipantId = useMeetingStore(
    (state) => state.remoteParticipantId,
  );

  const participantData = useParticipant(remoteParticipantId || '');
  const shareParticipant = useParticipant(presenterId || '');
  const { webcamStream, webcamOn, setQuality } = participantData || {};
  const { screenShareOn, setScreenShareQuality } = shareParticipant || {};
  const webcamTrackId = webcamStream?.track?.id ?? null;

  const {
    isMicOn,
    isCameraOn,
    isScreenShareOn,
    toggleMic,
    toggleCamera,
    toggleScreenShare,
  } = useMeetingMedia();
  const { formattedTime } = useMeetingCountdown();

  const handleReturnToMeeting = () => {
    if (!appointmentId || !patientInfo?.id) return;
    router.push(projectRoutes.meetingCall(patientInfo.id, appointmentId));
  };

  const handleEndCall = async () => {
    try {
      await leave();
    } catch (error) {
      console.warn('Error during mini player leave:', error);
      router.replace(resetMeetingAndGetSummaryPath());
    }
  };

  useEffect(() => {
    if (
      !presenterId ||
      !screenShareOn ||
      typeof setScreenShareQuality !== 'function'
    ) {
      return;
    }

    let cancelled = false;
    setScreenShareQuality('high').catch((error) => {
      if (!cancelled) {
        console.warn('Unable to request high screen-share quality:', error);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [presenterId, screenShareOn, setScreenShareQuality]);

  useEffect(() => {
    if (
      !remoteParticipantId ||
      !webcamOn ||
      !webcamTrackId ||
      typeof setQuality !== 'function'
    ) {
      return;
    }

    let cancelled = false;
    setQuality('high').catch((error) => {
      if (!cancelled) {
        console.warn('Unable to request high remote video quality:', error);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [remoteParticipantId, webcamOn, webcamTrackId, setQuality]);

  return (
    <MeetingMiniPlayerShell className="mini-player">
      <div className="mini-top">
        <span className="mini-timer">{formattedTime}</span>
        <Tooltip title="Maximize to Stage">
          <IconButton
            className="mini-expand"
            size="small"
            onClick={handleReturnToMeeting}
          >
            <FullscreenIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </div>

      <div className="mini-stage">
        {presenterId && screenShareOn ? (
          <VideoPlayer
            participantId={presenterId}
            type="share"
            className="mini-player-frame"
            classNameVideo="mini-player-video"
          />
        ) : webcamOn && remoteParticipantId ? (
          <VideoPlayer
            participantId={remoteParticipantId}
            type="video"
            className="mini-player-frame"
            classNameVideo="mini-player-video"
          />
        ) : (
          <Avatar className="mini-avatar">
            {(patientInfo?.name || 'P').charAt(0).toUpperCase()}
          </Avatar>
        )}
      </div>

      <div className="mini-controls">
        <IconButton
          className={`mini-btn${isMicOn ? '' : ' is-off'}`}
          size="small"
          onClick={toggleMic}
        >
          {isMicOn ? <MicIcon /> : <MicOffIcon />}
        </IconButton>

        <IconButton
          className={`mini-btn${isCameraOn ? '' : ' is-off'}`}
          size="small"
          onClick={toggleCamera}
        >
          {isCameraOn ? <VideocamIcon /> : <VideocamOffIcon />}
        </IconButton>

        <Tooltip title={isScreenShareOn ? 'Stop sharing' : 'Share screen'}>
          <IconButton
            className={`mini-btn${isScreenShareOn ? ' is-sharing' : ''}`}
            size="small"
            onClick={toggleScreenShare}
            aria-label={isScreenShareOn ? 'Stop sharing' : 'Share screen'}
          >
            {isScreenShareOn ? <StopScreenShareIcon /> : <ScreenShareIcon />}
          </IconButton>
        </Tooltip>

        <IconButton
          className="mini-btn end-call"
          size="small"
          onClick={handleEndCall}
        >
          <CallEndIcon />
        </IconButton>
      </div>
    </MeetingMiniPlayerShell>
  );
}
