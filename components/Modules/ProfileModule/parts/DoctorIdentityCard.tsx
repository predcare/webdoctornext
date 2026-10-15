'use client';

import { dashboardClinic, dashboardDoctor } from '@/configs/dashboardNav';
import CheckIcon from '@mui/icons-material/Check';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Box, Chip, Typography } from '@mui/material';

export default function DoctorIdentityCard() {
  return (
    <Box className="form-card identity-card">
      <span className="identity-avatar">{dashboardDoctor.avatar}</span>
      <Box className="identity-copy">
        <Box className="identity-name-row">
          <Typography component="h2" className="identity-name">
            {dashboardDoctor.name}
          </Typography>
          <Chip className="spec-chip" label="Anesthesiology" size="small" />
        </Box>
        <Typography component="p" className="identity-role">
          Medical Professional
        </Typography>
        <Box className="clinic-line">
          <LocationOnOutlinedIcon />
          <span>Clinic : {dashboardClinic.name}</span>
          <span className="verified-pill">
            <CheckIcon />
            verified
          </span>
        </Box>
      </Box>
    </Box>
  );
}
