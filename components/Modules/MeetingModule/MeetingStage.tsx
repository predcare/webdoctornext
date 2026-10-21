'use client';

import { useMeetingCountdown } from '@/hooks/commons/meeting/useMeetingCountdown';
import { useMeetingStore } from '@/zustand/stores/useMeetingStore';
import { useNetworkStore } from '@/zustand/stores/useNetworkStore';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import HdIcon from '@mui/icons-material/Hd';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import LocalVideoTile from './LocalVideoTile';
import MeetingControlBar from './MeetingControlBar';
import RemoteStage from './RemoteStage';

export default function MeetingStage() {
  const [networkLabel, setNetworkLabel] = useState<string>('GOOD');

  const patientInfo = useMeetingStore((state) => state.patientInfo);
  const remoteParticipantId = useMeetingStore(
    (state) => state.remoteParticipantId,
  );
  const isOffline = useNetworkStore((state) => state.isOffline);
  const { formattedTime, isWarning, isUrgent } = useMeetingCountdown();

  const patientDisplayName = patientInfo?.name || 'Patient';
  const networkStatusLabel = isOffline ? 'OFFLINE' : networkLabel;

  return (
    <Box className="stage">
      <Box className="remote-feed">
        {/* Remote participant video stream or waiting/cam-off view */}
        <RemoteStage
          participantId={remoteParticipantId}
          patientName={patientDisplayName}
          onNetworkQualityChange={setNetworkLabel}
        />

        {/* Top Status Indicators */}
        <Box className="status-row">
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
          <Box className="status-pill encrypted">
            <LockOutlinedIcon />
            <span>ENCRYPTED</span>
          </Box>
        </Box>

        {/* Remote Patient Name Pill */}
        <Typography className="remote-name" component="p">
          {patientDisplayName}
        </Typography>
        <MeetingControlBar />
      </Box>

      {/* Doctor's Local Camera Preview */}
      <LocalVideoTile />
    </Box>
  );
}
