'use client';

import CustomInput from '@/components/ui/CustomInput/CustomInput';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import { Box, Button, Typography } from '@mui/material';
import { memo } from 'react';

function MeetingSidePanel() {
  return (
    <Box className="side-panel">
      <Box className="panel-card profile-block">
        <Box className="panel-head">
          <Typography className="section-title" component="h2">
            <PersonOutlineOutlinedIcon />
            Patient Profile
          </Typography>
        </Box>

        <Box className="identity">
          <Box className="avatar" aria-hidden>
            B
          </Box>
          <Box className="identity-copy">
            <Typography className="patient-name" component="p">
              Bina Pani Rani Sudha Roy Chowdhury
            </Typography>
            <Typography className="patient-id" component="p">
              ID: PT0019
            </Typography>
          </Box>
        </Box>

        <Box className="meta-row">
          <Box className="meta-card">
            <Typography className="meta-label" component="span">
              Age
            </Typography>
            <Typography className="meta-value" component="span">
              14 Years
            </Typography>
          </Box>
          <Box className="meta-card">
            <Typography className="meta-label" component="span">
              Gender
            </Typography>
            <Typography className="meta-value" component="span">
              Female
            </Typography>
          </Box>
        </Box>

        <Box className="complaint">
          <Typography className="meta-label" component="span">
            Primary complaint
          </Typography>
          <Box className="complaint-box">Not specified</Box>
        </Box>

        <Button
          className="panel-action"
          variant="contained"
          color="primary"
          type="button"
          startIcon={<FileUploadOutlinedIcon />}
        >
          Upload Records
        </Button>
        <Button
          className="panel-action prescription-btn"
          variant="outlined"
          color="inherit"
          type="button"
          startIcon={<DescriptionOutlinedIcon />}
        >
          Write Prescription
        </Button>
      </Box>

      <Box className="panel-card notes-block">
        <Typography className="section-title" component="h2">
          <StickyNote2OutlinedIcon />
          Doctor Notes
        </Typography>
        <CustomInput
          className="notes-field"
          placeholder="Write your notes here..."
          multiline
          minRows={3}
          fullWidth
        />
      </Box>
    </Box>
  );
}

export default memo(MeetingSidePanel);