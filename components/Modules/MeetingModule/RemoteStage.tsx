'use client';

import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import { Avatar, Box, CircularProgress, Typography } from '@mui/material';
import { useParticipant, VideoPlayer } from '@videosdk.live/react-sdk';
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
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [networkQuality, setNetworkQuality] = useState<'GOOD' | 'FAIR' | 'WEAK' | 'OFFLINE'>('GOOD');

  const participantData = useParticipant(participantId || '');
  const { webcamStream, micStream, webcamOn, micOn, getVideoStats, setQuality } =
    participantData || {};
  const webcamTrackId = webcamStream?.track?.id ?? null;

  const displayName = useMemo(() => {
    return (
      patientName ||
      participantData?.displayName ||
      'Patient'
    );
  }, [patientName, participantData?.displayName]);

  useEffect(() => {
    if (!participantId || !webcamOn || !webcamTrackId || typeof setQuality !== 'function') {
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
  }, [participantId, webcamOn, webcamTrackId, setQuality]);

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

  return (
    <Box className="remote-video">
      <audio ref={audioRef} autoPlay playsInline />

      {!participantId ? (
        <Box className="remote-waiting">
          <CircularProgress className="remote-spinner" size={48} />
          <Typography className="remote-waiting-title" component="p">
            Waiting for patient to join...
          </Typography>
          <Typography className="remote-waiting-copy">
            {displayName} has been notified and will be connected as soon as they enter the room.
          </Typography>
        </Box>
      ) : !webcamOn ? (
        <Box className="remote-cam-off">
          <Avatar className="remote-avatar">{displayName.charAt(0).toUpperCase()}</Avatar>
          <Box className="remote-cam-note">
            <VideocamOffIcon fontSize="small" />
            <Typography component="span">Patient&apos;s camera is turned off</Typography>
          </Box>
        </Box>
      ) : (
        <VideoPlayer
          participantId={participantId}
          type="video"
          className="remote-player"
          classNameVideo="remote-player-video"
        />
      )}
    </Box>
  );
}
