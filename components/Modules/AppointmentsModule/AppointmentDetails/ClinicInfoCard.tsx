'use client';

import DetailField from '@/components/commons/DetailField/DetailField';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import { Box, Grid, Typography } from '@mui/material';
import { memo } from 'react';

type ClinicInfoCardProps = {
  clinicName: string;
  clinicAddress: string;
  clinicContact: string;
  gstNumber: string;
  clinicEmail: string;
  clinicRegistrationNumber: string;
};

function ClinicInfoCard({
  clinicName,
  clinicAddress,
  clinicContact,
  gstNumber = 'N/A',
  clinicEmail = 'N/A',
  clinicRegistrationNumber = 'N/A',
}: ClinicInfoCardProps) {
  return (
    <Box className="detail-card">
      <Box className="card-head">
        <Box className="card-head-title">
          <Box component="span" className="card-icon">
            <LocalHospitalOutlinedIcon />
          </Box>
          <Box className="card-title-copy">
            <Typography component="h3" className="card-title">
              Clinic Information
            </Typography>
            <Typography component="p" className="card-subtitle">
              Where this appointment takes place
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box className="card-body">
        <Grid container rowSpacing={2} columnSpacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <DetailField
              variant="tile"
              label="Clinic Name"
              icon={<LocalHospitalOutlinedIcon fontSize="inherit" />}
            >
              {clinicName}
            </DetailField>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <DetailField
              variant="tile"
              label="Address"
              icon={<LocationOnOutlinedIcon fontSize="inherit" />}
            >
              {clinicAddress}
            </DetailField>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <DetailField
              variant="tile"
              label="Contact"
              icon={<PhoneOutlinedIcon fontSize="inherit" />}
            >
              {clinicContact}
            </DetailField>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <DetailField
              variant="tile"
              label="GST Number"
              icon={<ReceiptLongOutlinedIcon fontSize="inherit" />}
            >
              {gstNumber}
            </DetailField>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <DetailField
              variant="tile"
              label="Email"
              icon={<MailOutlinedIcon fontSize="inherit" />}
            >
              {clinicEmail}
            </DetailField>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <DetailField
              variant="tile"
              label="Website"
              icon={<LanguageOutlinedIcon fontSize="inherit" />}
            >
              {clinicRegistrationNumber}
            </DetailField>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default memo(ClinicInfoCard);
