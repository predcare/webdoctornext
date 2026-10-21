'use client';

import { useMeetingStore } from '@/zustand/stores/useMeetingStore';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import { Avatar, Box, CircularProgress, Typography } from '@mui/material';
import { useParticipant } from '@videosdk.live/react-sdk';
import { useEffect, useMemo, useRef, useState } from 'react';

type RemoteStageProps = {
  participantId: string | null;
  patientName?: string;
  onNetworkQualityChange?: (quality: string) => void;
};

export default function RemoteStage({
  participantId,
  patientName,
  onNetworkQualityChange,
}: RemoteStageProps) {
  // 1. States & Refs
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [networkQuality, setNetworkQuality] = useState<'GOOD' | 'FAIR' | 'WEAK' | 'OFFLINE'>('GOOD');

  // 2. Hooks
  const participantData = useParticipant(participantId || '');
  const { webcamStream, micStream, webcamOn, micOn, getVideoStats } =
    participantData || {};

  const callState = useMeetingStore((state) => state.callState);

  // 3. useMemo & Functions
  const displayName = useMemo(() => {
    return (
      patientName ||
      participantData?.displayName ||
      'Patient'
    );
  }, [patientName, participantData?.displayName]);

  // 4. useEffects
  // Attach remote video track
  useEffect(() => {
    if (videoRef.current && webcamOn && webcamStream?.track) {
      const mediaStream = new MediaStream([webcamStream.track]);
      videoRef.current.srcObject = mediaStream;
      videoRef.current.play().catch((e) => console.warn('Video play interrupted:', e));
    } else if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, [webcamStream, webcamOn]);

  // Attach remote audio track
  useEffect(() => {
    if (audioRef.current && micOn && micStream?.track) {
      const mediaStream = new MediaStream([micStream.track]);
      audioRef.current.srcObject = mediaStream;
      audioRef.current.play().catch((e) => console.warn('Audio play interrupted:', e));
    } else if (audioRef.current) {
      audioRef.current.srcObject = null;
    }
  }, [micStream, micOn]);

  // Periodically sample network quality stats
  useEffect(() => {
    if (!participantId || !getVideoStats) return;

    const interval = setInterval(async () => {
      try {
        if (!navigator.onLine) {
          setNetworkQuality('OFFLINE');
          onNetworkQualityChange?.('OFFLINE');
          return;
        }

        const stats = await getVideoStats();
        if (stats && stats.length > 0) {
          const latest = stats[stats.length - 1];
          const packetLoss = latest?.packetsLost || 0;
          const jitter = latest?.jitter || 0;

          let q: 'GOOD' | 'FAIR' | 'WEAK' = 'GOOD';
          if (packetLoss > 10 || jitter > 100) {
            q = 'WEAK';
          } else if (packetLoss > 3 || jitter > 50) {
            q = 'FAIR';
          }
          setNetworkQuality(q);
          onNetworkQualityChange?.(q);
        }
      } catch {
        // ignore sample error
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [participantId, getVideoStats, onNetworkQualityChange]);

  // 5. Render Guards & JSX
  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0f172a',
        overflow: 'hidden',
      }}
    >
      {/* Remote Audio output (invisible) */}
      <audio ref={audioRef} autoPlay playsInline />

      {!participantId ? (
        // Waiting for patient state
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            color: '#f8fafc',
            textAlign: 'center',
            p: 3,
          }}
        >
          <CircularProgress size={48} sx={{ color: '#0d9488' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Waiting for patient to join...
          </Typography>
          <Typography variant="body2" sx={{ color: '#94a3b8', maxWidth: 360 }}>
            {displayName} has been notified and will be connected as soon as they enter the room.
          </Typography>
        </Box>
      ) : !webcamOn ? (
        // Patient camera is disabled
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            color: '#f8fafc',
            textAlign: 'center',
          }}
        >
          <Avatar
            sx={{
              width: 96,
              height: 96,
              bgcolor: '#0d9488',
              fontSize: '2.5rem',
              fontWeight: 700,
              boxShadow: '0 0 0 8px rgba(13, 148, 136, 0.2)',
            }}
          >
            {displayName.charAt(0).toUpperCase()}
          </Avatar>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#94a3b8' }}>
            <VideocamOffIcon fontSize="small" />
            <Typography variant="body2">Patient&apos;s camera is turned off</Typography>
          </Box>
        </Box>
      ) : (
        // Patient live video stream
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      )}
    </Box>
  );
}
