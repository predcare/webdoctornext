'use client';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CallEndIcon from '@mui/icons-material/CallEnd';
import HdIcon from '@mui/icons-material/Hd';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MicNoneIcon from '@mui/icons-material/MicNone';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ScreenShareOutlinedIcon from '@mui/icons-material/ScreenShareOutlined';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import { Box, IconButton, Typography } from '@mui/material';

const controls = [
  { label: 'Microphone', icon: <MicNoneIcon /> },
  { label: 'Camera', icon: <VideocamOutlinedIcon /> },
  { label: 'Share screen', icon: <ScreenShareOutlinedIcon /> },
  { label: 'Participants', icon: <PeopleAltOutlinedIcon /> },
];

export default function MeetingStage() {
  return (
    <Box className="stage">
      <Box className="remote-feed">
        <Box className="status-row">
          <Box className="status-pill timer">
            <AccessTimeIcon />
            <span>4:53</span>
          </Box>
          <Box className="status-pill hd">
            <HdIcon />
            <span>HD</span>
          </Box>
          <Box className="status-pill net">
            <SignalCellularAltIcon />
            <span>NET: GOOD 75.34/79.8</span>
            <ArrowUpwardIcon className="net-arrow" />
          </Box>
          <Box className="status-pill encrypted">
            <LockOutlinedIcon />
            <span>ENCRYPTED</span>
          </Box>
        </Box>

        <Typography className="remote-name" component="p">
          Bina Pani Rani Sudha Roy Chowdhury
        </Typography>

        <Box className="control-bar">
          {controls.map((control) => (
            <IconButton
              key={control.label}
              className="control-btn"
              aria-label={control.label}
              type="button"
            >
              {control.icon}
            </IconButton>
          ))}
          <IconButton
            className="control-btn end-call"
            aria-label="End call"
            type="button"
          >
            <CallEndIcon />
          </IconButton>
        </Box>
      </Box>

      <Box className="local-tile" aria-label="Local participant" />
    </Box>
  );
}
