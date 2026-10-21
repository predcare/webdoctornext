'use client';

import { resetMeetingAndGetSummaryPath } from '@/hooks/commons/meeting/meetingSessionLeave';
import { useMeetingMedia } from '@/hooks/commons/meeting/useMeetingMedia';
import { useMeeting } from '@videosdk.live/react-sdk';
import CallEndIcon from '@mui/icons-material/CallEnd';
import CameraswitchIcon from '@mui/icons-material/Cameraswitch';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Button,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';

export default function MeetingControlBar() {
  // 1. States & Refs
  const [cameraAnchorEl, setCameraAnchorEl] = useState<null | HTMLElement>(null);
  const [isEndModalOpen, setIsEndModalOpen] = useState(false);

  // 2. Hooks
  const router = useRouter();
  const { leave } = useMeeting();
  const {
    isMicOn,
    isCameraOn,
    toggleMic,
    toggleCamera,
    webcams,
    hasMultipleCameras,
    selectedVideoDeviceId,
    switchCamera,
  } = useMeetingMedia();

  // 3. useMemo & Functions
  const handleOpenEndModal = useCallback(() => {
    setIsEndModalOpen(true);
  }, []);

  const handleCloseEndModal = useCallback(() => {
    setIsEndModalOpen(false);
  }, []);

  const handleConfirmEndCall = useCallback(async () => {
    setIsEndModalOpen(false);
    try {
      await leave();
    } catch (error) {
      console.warn('Error during leave:', error);
      router.replace(resetMeetingAndGetSummaryPath());
    }
  }, [leave, router]);

  const handleCameraMenuOpen = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setCameraAnchorEl(event.currentTarget);
    },
    []
  );

  const handleCameraMenuClose = useCallback(() => {
    setCameraAnchorEl(null);
  }, []);

  const handleSelectCamera = useCallback(
    (deviceId: string) => {
      switchCamera(deviceId);
      handleCameraMenuClose();
    },
    [switchCamera, handleCameraMenuClose]
  );

  // 4. useEffects
  // (none)

  // 5. Render Guards & JSX
  return (
    <>
      <Box className="control-bar">
        {/* Microphone Toggle */}
        <Tooltip title={isMicOn ? 'Mute Microphone' : 'Unmute Microphone'}>
          <IconButton
            className="control-btn"
            onClick={toggleMic}
            aria-label={isMicOn ? 'Mute Microphone' : 'Unmute Microphone'}
            sx={{
              backgroundColor: isMicOn ? '#ffffff' : '#fef2f2 !important',
              color: isMicOn ? '#334155' : '#ef4444 !important',
              borderColor: isMicOn ? 'rgba(15, 23, 42, 0.06)' : '#fca5a5 !important',
            }}
          >
            {isMicOn ? <MicIcon /> : <MicOffIcon />}
          </IconButton>
        </Tooltip>

        {/* Camera Toggle */}
        <Tooltip title={isCameraOn ? 'Turn Camera Off' : 'Turn Camera On'}>
          <IconButton
            className="control-btn"
            onClick={toggleCamera}
            aria-label={isCameraOn ? 'Turn Camera Off' : 'Turn Camera On'}
            sx={{
              backgroundColor: isCameraOn ? '#ffffff' : '#fef2f2 !important',
              color: isCameraOn ? '#334155' : '#ef4444 !important',
              borderColor: isCameraOn ? 'rgba(15, 23, 42, 0.06)' : '#fca5a5 !important',
            }}
          >
            {isCameraOn ? <VideocamIcon /> : <VideocamOffIcon />}
          </IconButton>
        </Tooltip>

        {/* Camera Switch (only rendered if multiple cameras exist) */}
        {hasMultipleCameras && (
          <>
            <Tooltip title="Switch Camera">
              <IconButton
                className="control-btn"
                onClick={handleCameraMenuOpen}
                aria-label="Switch Camera"
              >
                <CameraswitchIcon />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={cameraAnchorEl}
              open={Boolean(cameraAnchorEl)}
              onClose={handleCameraMenuClose}
            >
              {webcams.map((cam) => (
                <MenuItem
                  key={cam.deviceId}
                  selected={cam.deviceId === selectedVideoDeviceId}
                  onClick={() => handleSelectCamera(cam.deviceId)}
                >
                  {cam.label || `Camera ${cam.deviceId.slice(0, 5)}...`}
                </MenuItem>
              ))}
            </Menu>
          </>
        )}

        {/* End Call Button */}
        <Tooltip title="End Call">
          <IconButton
            className="control-btn end-call"
            onClick={handleOpenEndModal}
            aria-label="End call"
          >
            <CallEndIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* End Call Confirmation Dialog */}
      <Dialog
        open={isEndModalOpen}
        onClose={handleCloseEndModal}
        aria-labelledby="end-call-dialog-title"
      >
        <DialogTitle id="end-call-dialog-title">End Consultation Call?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to end this video session? You will be directed to
            the post-consultation summary.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ pb: 2, px: 3 }}>
          <Button onClick={handleCloseEndModal} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmEndCall}
            color="error"
            variant="contained"
            autoFocus
          >
            Yes, End Call
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
