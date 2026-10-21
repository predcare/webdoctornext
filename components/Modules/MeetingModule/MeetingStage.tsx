'use client';

import { useMeetingCountdown } from '@/hooks/commons/meeting/useMeetingCountdown';
import { useMeetingStore } from '@/zustand/stores/useMeetingStore';
import { useNetworkStore } from '@/zustand/stores/useNetworkStore';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import HdIcon from '@mui/icons-material/Hd';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import { Box, Typography } from '@mui/material';
import { useMeeting, useParticipant } from '@videosdk.live/react-sdk';
import { useState } from 'react';
import LocalVideoTile from './LocalVideoTile';
import MeetingControlBar from './MeetingControlBar';
import RemoteStage from './RemoteStage';

export default function MeetingStage() {
  const [networkLabel, setNetworkLabel] = useState<string>('GOOD');

  const patientInfo = useMeetingStore((state) => state.patientInfo);
  const appointmentGeneratedId = useMeetingStore(
    (state) => state.appointmentGeneratedId,
  );
  const appointmentId = useMeetingStore((state) => state.appointmentId);
  const remoteParticipantId = useMeetingStore(
    (state) => state.remoteParticipantId,
  );
  const isOffline = useNetworkStore((state) => state.isOffline);
  const { formattedTime, isWarning, isUrgent } = useMeetingCountdown();
  const { presenterId, localParticipant } = useMeeting();
  const { screenShareOn } = useParticipant(presenterId || '');

  const patientDisplayName = patientInfo?.name || 'Patient';
  const patientGeneratedId = patientInfo?.alphanumericId;
  const appointmentLabel =
    appointmentGeneratedId ||
    (appointmentId != null ? String(appointmentId) : '');
  const networkStatusLabel = isOffline ? 'OFFLINE' : networkLabel;
  const isSharing = Boolean(presenterId) && screenShareOn;
  const isLocalShare = isSharing && presenterId === localParticipant?.id;

  return (
    <Box className="stage">
      <Box className="remote-feed">
        <RemoteStage
          participantId={remoteParticipantId}
          presenterId={presenterId || null}
          patientName={patientDisplayName}
          onNetworkQualityChange={setNetworkLabel}
        />
        <Box className="status-row">
          {isSharing ? (
            <Box className="status-pill share-label">
              <ScreenShareIcon />
              <span>
                {isLocalShare
                  ? 'You are sharing your screen'
                  : 'Patient is sharing their screen'}
              </span>
            </Box>
          ) : null}
          <Box
            className={`status-pill timer${isUrgent ? ' urgent' : isWarning ? ' warning' : ''}`}
          >
            <AccessTimeIcon />
            <span>{formattedTime}</span>
          </Box>
          <Box className="status-pill hd">
            <HdIcon />
            <span>HD</span>
          </Box>
          <Box className={`status-pill net${isOffline ? ' offline' : ''}`}>
            <SignalCellularAltIcon />
            <span>NET: {networkStatusLabel}</span>
            <ArrowUpwardIcon className="net-arrow" />
          </Box>
          <Box
            className="status-pill encrypted"
            title={
              appointmentLabel ? `ENCRYPTED ${appointmentLabel}` : 'ENCRYPTED'
            }
          >
            <LockOutlinedIcon />
            <span>ENCRYPTED</span>
            {appointmentLabel ? (
              <span className="status-pill-id">{appointmentLabel}</span>
            ) : null}
          </Box>
          <Typography
            className="remote-name"
            component="p"
            title={
              patientGeneratedId
                ? `${patientDisplayName} ${patientGeneratedId}`
                : patientDisplayName
            }
          >
            <span className="remote-name-text">{patientDisplayName}</span>
            {patientGeneratedId ? (
              <span className="remote-name-id">{patientGeneratedId}</span>
            ) : null}
          </Typography>
        </Box>
        <MeetingControlBar />
      </Box>
      <LocalVideoTile />
    </Box>
  );
}
