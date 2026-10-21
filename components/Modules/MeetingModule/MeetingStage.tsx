'use client';

import { useMeetingCountdown } from '@/hooks/commons/meeting/useMeetingCountdown';
import { useMeetingStore } from '@/zustand/stores/useMeetingStore';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import HdIcon from '@mui/icons-material/Hd';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import LocalVideoTile from './LocalVideoTile';
import MeetingControlBar from './MeetingControlBar';
import RemoteStage from './RemoteStage';

export default function MeetingStage() {
  // 1. States & Refs
  const [networkLabel, setNetworkLabel] = useState<string>('GOOD');

  // 2. Hooks
  const patientInfo = useMeetingStore((state) => state.patientInfo);
  const remoteParticipantId = useMeetingStore((state) => state.remoteParticipantId);
  const { formattedTime, isWarning, isUrgent } = useMeetingCountdown();

  // 3. useMemo & Functions
  const patientDisplayName = patientInfo?.name || 'Patient';

  // 4. useEffects
  // (none)

  // 5. Render Guards & JSX
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
            className={`status-pill timer ${isUrgent ? 'urgent' : isWarning ? 'warning' : ''}`}
            sx={{
              backgroundColor: isUrgent
                ? '#dc2626 !important'
                : isWarning
                  ? '#d97706 !important'
                  : undefined,
            }}
          >
            <AccessTimeIcon />
            <span>{formattedTime}</span>
          </Box>
          <Box className="status-pill hd">
            <HdIcon />
            <span>HD</span>
          </Box>
          <Box className="status-pill net">
            <SignalCellularAltIcon />
            <span>NET: {networkLabel}</span>
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

        {/* Controls: Mute, Camera, Camera switch, End Call */}
        <MeetingControlBar />
      </Box>

      {/* Doctor's Local Camera Preview */}
      <LocalVideoTile />
    </Box>
  );
}
