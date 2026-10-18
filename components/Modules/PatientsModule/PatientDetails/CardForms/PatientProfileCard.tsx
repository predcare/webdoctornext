'use client';

import StatusChip from '@/components/commons/StatusChip/StatusChip';
import type { PatientDetails } from '@/resources/mock';
import { projectRoutes } from '@/routes';
import { avatarTone } from '@/utils/avatarTone';
import AddIcon from '@mui/icons-material/Add';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Box, Button, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import { memo, type ReactNode } from 'react';

type InfoRow = {
  label: string;
  value: ReactNode;
};

type PatientProfileCardProps = {
  details: PatientDetails;
};

function PatientProfileCard({ details }: PatientProfileCardProps) {
  const personalRows: InfoRow[] = [
    { label: 'Gender', value: details.gender },
    { label: 'Age', value: `${details.age} years` },
    { label: 'Date of Birth', value: details.dateOfBirth },
    { label: 'Blood Type', value: <Box component="span" className="blood-chip">{details.bloodType}</Box> },
  ];

  return (
    <Box className="detail-card profile-card">
      <Box className="profile-head">
        <Box className="profile-identity">
          <Box className={`profile-avatar ${avatarTone(details.initial)}`}>
            {details.initial}
            {details.verified ? (
              <VerifiedIcon className="avatar-badge" aria-label="Verified" />
            ) : null}
          </Box>
          <Box className="profile-copy">
            <Box className="profile-title-row">
              <Typography component="h2" className="profile-title">
                {details.name}
              </Typography>
              <Box className="profile-tags">
                <Typography component="span" className="code-chip">
                  #{details.patientCode}
                </Typography>
                <StatusChip status={details.userStatus} />
              </Box>
            </Box>
            <Box className="profile-quick">
              <Typography component="span" className="quick-item">
                <PhoneOutlinedIcon fontSize="inherit" />
                {details.phone}
              </Typography>
              <Typography component="span" className="quick-item">
                <MailOutlinedIcon fontSize="inherit" />
                {details.email}
              </Typography>
              <Typography component="span" className="quick-item">
                <LocationOnOutlinedIcon fontSize="inherit" />
                {details.city}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box className="profile-actions">
          <Button
            className="profile-btn"
            variant="outlined"
            startIcon={<EditOutlinedIcon fontSize="small" />}
          >
            Edit Profile
          </Button>
          <Button
            className="profile-btn"
            variant="contained"
            component={Link}
            href={projectRoutes.bookAppointment}
            startIcon={<AddIcon fontSize="small" />}
          >
            Book Appointment
          </Button>
        </Box>
      </Box>

      <Box className="profile-info">
        <Box className="info-group">
          <Box className="info-group-head">
            <Box component="span" className="info-group-icon">
              <BadgeOutlinedIcon />
            </Box>
            <Typography component="h3" className="info-group-title">
              Personal Information
            </Typography>
          </Box>
          <Grid component="dl" container className="info-grid" spacing={2}>
            {personalRows.map((row) => (
              <Grid key={row.label} className="info-cell" size={{ xs: 6, sm: 6, md: 3 }}>
                <Typography component="dt" className="info-label">
                  {row.label}
                </Typography>
                <Typography component="dd" className="info-value">
                  {row.value}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default memo(PatientProfileCard);
