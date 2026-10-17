'use client';

import DetailField from '@/components/commons/DetailField/DetailField';
import type { AppointmentDetails } from '@/resources/mock';
import { avatarTone } from '@/utils/avatarTone';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import { Box, Button, Grid, Typography } from '@mui/material';
import { memo } from 'react';

type PatientSummaryCardProps = {
  details: AppointmentDetails;
  patientName: string;
  patientCode: string;
  gender: string;
  age: string;
  phone: string;
  email: string;
  city: string;
  bloodType: string;
  onProfileView?: () => void;
};

function PatientSummaryCard({ details, patientName, patientCode, gender, age, phone, email, bloodType, city, onProfileView }: PatientSummaryCardProps) {
  const metaFields = [
    { label: 'Blood Type', value: bloodType },
    { label: 'City', value: city },
  ];

  return (
    <Box className="detail-card">
      <Box className="card-body">
        <Box className="patient-head">
          <Box className={`patient-avatar ${avatarTone(details.initial)}`}>{details.initial}</Box>
          <Box className="patient-head-copy">
            <Box className="patient-title-row">
              <Typography component="h2" className="patient-title">
                {patientName}
              </Typography>
              <Typography component="span" className="code-chip">
                #{patientCode}
              </Typography>
            </Box>
            <Box className="patient-contact">
              <Typography component="span" className="contact-pill">
                <PersonOutlinedIcon fontSize="inherit" />
                {gender}, {age}
              </Typography>
              <Typography component="span" className="contact-pill">
                <PhoneOutlinedIcon fontSize="inherit" />
                {phone}
              </Typography>
              <Typography component="span" className="contact-pill">
                <MailOutlinedIcon fontSize="inherit" />
                {email}
              </Typography>
            </Box>
          </Box>
          <Button
            className="head-action"
            variant="outlined"
            size="small"
            startIcon={<OpenInNewIcon fontSize="inherit" />}
            onClick={onProfileView}
            type='button'
          >
            View Profile
          </Button>
        </Box>

        <Box className="meta-strip">
          <Grid container rowSpacing={2} columnSpacing={2}>
            {metaFields.map((field) => (
              <Grid key={field.label} className="meta-item" size={{ xs: 6, sm: 3 }}>
                <DetailField label={field.label} caps>
                  {field.value}
                </DetailField>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default memo(PatientSummaryCard);
