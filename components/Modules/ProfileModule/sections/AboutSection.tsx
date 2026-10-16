'use client';

import { Box, Typography } from '@mui/material';
import AboutSummaryCard from '../parts/AboutSummaryCard';
import DoctorIdentityCard from '../parts/DoctorIdentityCard';

export default function AboutSection() {
  return (
    <>
      <Box className="form-card profile-overview">
        <DoctorIdentityCard />
        <AboutSummaryCard />
      </Box>
      <Box className="form-card">
        <Typography component="h2" className="card-title">
          Education Information
        </Typography>
        <Typography component="p" className="empty-copy">
          No education information available.
        </Typography>
      </Box>
    </>
  );
}
