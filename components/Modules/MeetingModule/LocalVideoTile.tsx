'use client';

import { useMeetingStore } from '@/zustand/stores/useMeetingStore';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import { Box, Tooltip } from '@mui/material';
import { useMeeting, useParticipant } from '@videosdk.live/react-sdk';
import { useEffect, useRef } from 'react';

export default function LocalVideoTile() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const { localParticipant, localWebcamOn, localMicOn } = useMeeting();
  const participantData = useParticipant(localParticipant?.id || '');
  const { webcamStream } = participantData || {};

  const isCameraOn = useMeetingStore((state) => state.isCameraOn);
  const isMicOn = useMeetingStore((state) => state.isMicOn);

  const isVideoActive = (localWebcamOn ?? isCameraOn) && webcamStream?.track;
  const isAudioMuted = !(localMicOn ?? isMicOn);

  useEffect(() => {
    if (videoRef.current && isVideoActive && webcamStream?.track) {
      const mediaStream = new MediaStream([webcamStream.track]);
      videoRef.current.srcObject = mediaStream;
      videoRef.current.play().catch((e) => console.warn('Local preview interrupted:', e));
    } else if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, [webcamStream, isVideoActive]);

  return (
    <Box className="local-tile">
      {isVideoActive ? (
        <video
          ref={videoRef}
          className="local-video"
          autoPlay
          playsInline
          muted
        />
      ) : (
        <Box className="local-camera-off">
          <VideocamOffIcon fontSize="small" />
        </Box>
      )}

      {isAudioMuted && (
        <Tooltip title="Microphone muted" placement="top">
          <Box className="local-mute">
            <MicOffIcon />
          </Box>
        </Tooltip>
      )}
    </Box>
  );
}
