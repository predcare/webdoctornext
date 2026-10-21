'use client';

import { useMeetingStore } from '@/zustand/stores/useMeetingStore';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import { Box, Tooltip } from '@mui/material';
import { useMeeting, useParticipant } from '@videosdk.live/react-sdk';
import { useEffect, useRef } from 'react';

export default function LocalVideoTile() {
  // 1. States & Refs
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // 2. Hooks
  const { localParticipant, localWebcamOn, localMicOn } = useMeeting();
  const participantData = useParticipant(localParticipant?.id || '');
  const { webcamStream } = participantData || {};

  const isCameraOn = useMeetingStore((state) => state.isCameraOn);
  const isMicOn = useMeetingStore((state) => state.isMicOn);

  // 3. useMemo & Functions
  const isVideoActive = (localWebcamOn ?? isCameraOn) && webcamStream?.track;
  const isAudioMuted = !(localMicOn ?? isMicOn);

  // 4. useEffects
  useEffect(() => {
    if (videoRef.current && isVideoActive && webcamStream?.track) {
      const mediaStream = new MediaStream([webcamStream.track]);
      videoRef.current.srcObject = mediaStream;
      videoRef.current.play().catch((e) => console.warn('Local preview interrupted:', e));
    } else if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, [webcamStream, isVideoActive]);

  // 5. Render Guards & JSX
  return (
    <Box
      className="local-tile"
      sx={{
        position: 'absolute',
        right: { xs: 12, sm: 16, lg: 20 },
        bottom: { xs: 68, sm: 76, lg: 84 },
        zIndex: 4,
        width: { xs: 120, sm: 156, lg: 176 },
        height: { xs: 78, sm: 100, lg: 112 },
        borderRadius: '12px',
        border: '2px solid #ffffff',
        overflow: 'hidden',
        backgroundColor: '#1e293b',
        boxShadow: '0 8px 24px rgba(15, 23, 42, 0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {isVideoActive ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: 'scaleX(-1)', // Mirrored selfie view
          }}
        />
      ) : (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: '#334155',
            color: '#94a3b8',
          }}
        >
          <VideocamOffIcon fontSize="small" />
        </Box>
      )}

      {/* Muted Indicator Badge */}
      {isAudioMuted && (
        <Tooltip title="Microphone muted" placement="top">
          <Box
            sx={{
              position: 'absolute',
              bottom: 6,
              left: 6,
              width: 22,
              height: 22,
              borderRadius: '50%',
              backgroundColor: '#ef4444',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            <MicOffIcon sx={{ fontSize: 13 }} />
          </Box>
        </Tooltip>
      )}
    </Box>
  );
}
