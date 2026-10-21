'use client';

import StatusChip from '@/components/commons/StatusChip/StatusChip';
import { getInitials } from '@/lib/commons/common.utils';
import { avatarTone } from '@/utils/avatarTone';
import AddIcon from '@mui/icons-material/Add';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';
import { memo, useMemo, type ReactNode } from 'react';

type InfoRow = {
  label: string;
  value: ReactNode;
};

type PatientProfileCardProps = {
  gender: string;
  age: string;
  dateOfBirth: string;
  bloodType: string;
  patientCode: string;
  ptStatus: string;
  phone: string;
  profileImg?: string;
  email: string;
  city: string;
  name: string;
  onProfileEdit?: () => void;
  onAppointmentBook?: () => void;
};

function PatientProfileCard({
  gender,
  age,
  dateOfBirth,
  bloodType,
  patientCode,
  ptStatus,
  phone,
  profileImg,
  email,
  city,
  name,
  onAppointmentBook,
}: PatientProfileCardProps) {
  const isVerified = useMemo(() => {
    return ptStatus === 'active' ? true : false;
  }, [ptStatus]);

  const personalRows: InfoRow[] = useMemo(
    () => [
      { label: 'Gender', value: gender },
      { label: 'Age', value: age },
      { label: 'Date of Birth', value: dateOfBirth },
      {
        label: 'Blood Type',
        value: (
          <Box component="span" className="blood-chip">
            {bloodType}
          </Box>
        ),
      },
    ],
    [gender, age, dateOfBirth, bloodType]
  );

  return (
    <Box className="detail-card profile-card">
      <Box className="profile-head">
        <Box className="profile-identity">
          <Box sx={{ position: 'relative', display: 'inline-flex', flexShrink: 0 }}>
            <Avatar
              className={`profile-avatar ${avatarTone(getInitials(name))}`}
              src={profileImg || undefined}
              alt={name}
            >
              {getInitials(name)}
            </Avatar>
            {isVerified ? (
              <VerifiedIcon className="avatar-badge" aria-label="Verified" />
            ) : null}
          </Box>
          <Box className="profile-copy">
            <Box className="profile-title-row">
              <Typography component="h2" className="profile-title">
                {name}
              </Typography>
              <Box className="profile-tags">
                <Typography component="span" className="code-chip">
                  {patientCode}
                </Typography>
                <StatusChip status={ptStatus} />
              </Box>
            </Box>
            <Box className="profile-quick">
              <Typography component="span" className="quick-item">
                <PhoneOutlinedIcon fontSize="inherit" />
                {phone}
              </Typography>
              <Typography component="span" className="quick-item">
                <MailOutlinedIcon fontSize="inherit" />
                {email}
              </Typography>
              <Typography component="span" className="quick-item">
                <LocationOnOutlinedIcon fontSize="inherit" />
                {city}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box className="profile-actions">
          <Button
            className="profile-btn"
            variant="contained"
            type="button"
            startIcon={<AddIcon fontSize="small" />}
            onClick={onAppointmentBook}
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
              <Grid
                key={row.label}
                className="info-cell"
                size={{ xs: 6, sm: 6, md: 3 }}
              >
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
