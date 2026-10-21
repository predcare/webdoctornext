'use client';

import { useMeetingCountdown } from '@/hooks/commons/meeting/useMeetingCountdown';
import { useMeetingMedia } from '@/hooks/commons/meeting/useMeetingMedia';
import { useMeetingStore } from '@/zustand/stores/useMeetingStore';
import { useMeeting, useParticipant } from '@videosdk.live/react-sdk';
import CallEndIcon from '@mui/icons-material/CallEnd';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import { Avatar, Box, IconButton, Tooltip, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef } from 'react';

export default function MeetingMiniPlayer() {
  // 1. States & Refs
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // 2. Hooks
  const router = useRouter();
  const { leave } = useMeeting();
  const appointmentId = useMeetingStore((state) => state.appointmentId);
  const patientInfo = useMeetingStore((state) => state.patientInfo);
  const remoteParticipantId = useMeetingStore((state) => state.remoteParticipantId);
  const resetMeetingStore = useMeetingStore((state) => state.resetMeetingStore);

  const participantData = useParticipant(remoteParticipantId || '');
  const { webcamStream, webcamOn } = participantData || {};

  const { isMicOn, isCameraOn, toggleMic, toggleCamera } = useMeetingMedia();
  const { formattedTime } = useMeetingCountdown();

  // 3. useMemo & Functions
  const handleReturnToMeeting = () => {
    router.push(
      appointmentId
        ? `/dashboard/meeting?appointmentId=${appointmentId}${
            patientInfo?.id ? `&patientId=${patientInfo.id}` : ''
          }`
        : '/dashboard/meeting'
    );
  };

  const handleEndCall = async () => {
    try {
      await leave();
    } catch (e) {
      console.warn('Error during mini player leave:', e);
    }
    const currentId = appointmentId;
    resetMeetingStore();
    router.push(
      currentId
        ? `/dashboard/meeting/summary?appointmentId=${currentId}`
        : '/dashboard/appointments'
    );
  };

  // 4. useEffects
  useEffect(() => {
    if (videoRef.current && webcamOn && webcamStream?.track) {
      const mediaStream = new MediaStream([webcamStream.track]);
      videoRef.current.srcObject = mediaStream;
      videoRef.current.play().catch((e) => console.warn('Mini video play error:', e));
    } else if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, [webcamStream, webcamOn]);

  // 5. Render Guards & JSX
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 1400,
        width: 260,
        height: 160,
        borderRadius: '16px',
        overflow: 'hidden',
        backgroundColor: '#0f172a',
        boxShadow: '0 12px 36px rgba(0,0,0,0.4)',
        border: '2px solid rgba(255,255,255,0.15)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top Header bar inside mini-player */}
      <Box
        sx={{
          position: 'absolute',
          top: 8,
          left: 8,
          right: 8,
          zIndex: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            px: 1,
            py: 0.25,
            borderRadius: '999px',
            backgroundColor: 'rgba(0,0,0,0.6)',
            color: '#ffffff',
            fontSize: 11,
            fontWeight: 700,
          }}
        >
          {formattedTime}
        </Box>
        <Tooltip title="Maximize to Stage">
          <IconButton
            size="small"
            onClick={handleReturnToMeeting}
            sx={{
              backgroundColor: 'rgba(0,0,0,0.6)',
              color: '#ffffff',
              '&:hover': { backgroundColor: 'rgba(0,0,0,0.85)' },
            }}
          >
            <FullscreenIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Video Content */}
      <Box
        sx={{
          flex: 1,
          width: '100%',
          height: '100%',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1e293b',
        }}
      >
        {webcamOn && webcamStream?.track ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <Avatar
            sx={{
              width: 48,
              height: 48,
              bgcolor: '#0d9488',
              fontSize: '1.25rem',
              fontWeight: 700,
            }}
          >
            {(patientInfo?.name || 'P').charAt(0).toUpperCase()}
          </Avatar>
        )}
      </Box>

      {/* Bottom Mini Control Bar */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 6,
          left: 0,
          right: 0,
          zIndex: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
        }}
      >
        <IconButton
          size="small"
          onClick={toggleMic}
          sx={{
            width: 28,
            height: 28,
            backgroundColor: isMicOn ? '#ffffff' : '#ef4444',
            color: isMicOn ? '#0f172a' : '#ffffff',
            '&:hover': { opacity: 0.9 },
          }}
        >
          {isMicOn ? <MicIcon sx={{ fontSize: 16 }} /> : <MicOffIcon sx={{ fontSize: 16 }} />}
        </IconButton>

        <IconButton
          size="small"
          onClick={toggleCamera}
          sx={{
            width: 28,
            height: 28,
            backgroundColor: isCameraOn ? '#ffffff' : '#ef4444',
            color: isCameraOn ? '#0f172a' : '#ffffff',
            '&:hover': { opacity: 0.9 },
          }}
        >
          {isCameraOn ? (
            <VideocamIcon sx={{ fontSize: 16 }} />
          ) : (
            <VideocamOffIcon sx={{ fontSize: 16 }} />
          )}
        </IconButton>

        <IconButton
          size="small"
          onClick={handleEndCall}
          sx={{
            width: 28,
            height: 28,
            backgroundColor: '#ef4444',
            color: '#ffffff',
            '&:hover': { backgroundColor: '#dc2626' },
          }}
        >
          <CallEndIcon sx={{ fontSize: 16 }} />
        </IconButton>
      </Box>
    </Box>
  );
}
