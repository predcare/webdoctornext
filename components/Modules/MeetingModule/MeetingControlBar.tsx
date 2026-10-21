'use client';

import { resetMeetingAndGetSummaryPath } from '@/hooks/commons/meeting/meetingSessionLeave';
import { useMeetingMedia } from '@/hooks/commons/meeting/useMeetingMedia';
import { EndCallDialog, MeetingParticipantsPopover } from '@/styles/CustomStyled/MeetingWrapper';
import CallEndIcon from '@mui/icons-material/CallEnd';
import CameraswitchIcon from '@mui/icons-material/Cameraswitch';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import {
  Badge,
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import { useMeeting } from '@videosdk.live/react-sdk';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo, useState } from 'react';

export default function MeetingControlBar() {
  const [cameraAnchorEl, setCameraAnchorEl] = useState<null | HTMLElement>(null);
  const [participantsAnchorEl, setParticipantsAnchorEl] = useState<null | HTMLElement>(null);
  const [isEndModalOpen, setIsEndModalOpen] = useState(false);

  const router = useRouter();
  const { leave, participants, localParticipant } = useMeeting();
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

  const participantList = useMemo(
    () => Array.from(participants?.values?.() ?? []),
    [participants],
  );
  const participantCount = participants?.size ?? participantList.length;

  const handleOpenParticipants = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setParticipantsAnchorEl(event.currentTarget);
    },
    [],
  );

  const handleCloseParticipants = useCallback(() => {
    setParticipantsAnchorEl(null);
  }, []);

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

  return (
    <>
      <Box className="control-bar">
        {/* Microphone Toggle */}
        <Tooltip title={isMicOn ? 'Mute Microphone' : 'Unmute Microphone'}>
          <IconButton
            className={`control-btn${isMicOn ? '' : ' is-off'}`}
            onClick={toggleMic}
            aria-label={isMicOn ? 'Mute Microphone' : 'Unmute Microphone'}
          >
            {isMicOn ? <MicIcon /> : <MicOffIcon />}
          </IconButton>
        </Tooltip>

        {/* Camera Toggle */}
        <Tooltip title={isCameraOn ? 'Turn Camera Off' : 'Turn Camera On'}>
          <IconButton
            className={`control-btn${isCameraOn ? '' : ' is-off'}`}
            onClick={toggleCamera}
            aria-label={isCameraOn ? 'Turn Camera Off' : 'Turn Camera On'}
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

        <Tooltip title="Participants">
          <IconButton
            className="control-btn"
            onClick={handleOpenParticipants}
            aria-label={`Participants, ${participantCount} joined`}
          >
            <Badge
              className="participants-badge"
              badgeContent={participantCount}
              color="primary"
              overlap="circular"
            >
              <PeopleAltOutlinedIcon />
            </Badge>
          </IconButton>
        </Tooltip>
        <MeetingParticipantsPopover
          open={Boolean(participantsAnchorEl)}
          anchorEl={participantsAnchorEl}
          onClose={handleCloseParticipants}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Typography className="participants-title">
            Participants ({participantCount})
          </Typography>
          {participantList.length === 0 ? (
            <Typography className="participants-empty">No one has joined yet.</Typography>
          ) : (
            participantList.map((participant) => {
              const isLocal = participant.id === localParticipant?.id;
              return (
                <Box className="participant-row" key={participant.id}>
                  <Typography className="participant-name" noWrap>
                    {participant.displayName || 'Participant'}
                    {isLocal ? ' (You)' : ''}
                  </Typography>
                  <Box className="participant-media">
                    {participant.micOn ? (
                      <MicIcon />
                    ) : (
                      <MicOffIcon className="is-off" />
                    )}
                    {participant.webcamOn ? (
                      <VideocamIcon />
                    ) : (
                      <VideocamOffIcon className="is-off" />
                    )}
                  </Box>
                </Box>
              );
            })
          )}
        </MeetingParticipantsPopover>

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
      <EndCallDialog
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
        <DialogActions>
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
      </EndCallDialog>
    </>
  );
}
