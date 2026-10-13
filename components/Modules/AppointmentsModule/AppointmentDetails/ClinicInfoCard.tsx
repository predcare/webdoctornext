'use client';

import DetailField from '@/components/commons/DetailField/DetailField';
import type { AppointmentClinic } from '@/resources/mock';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import { Box, Grid, Typography } from '@mui/material';
import { memo } from 'react';

type ClinicInfoCardProps = {
  clinic: AppointmentClinic;
};

function ClinicInfoCard({ clinic }: ClinicInfoCardProps) {
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
            <DetailField variant="tile" label="Clinic Name" icon={<LocalHospitalOutlinedIcon fontSize="inherit" />}>
              {clinic.name}
            </DetailField>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <DetailField variant="tile" label="Address" icon={<LocationOnOutlinedIcon fontSize="inherit" />}>
              {clinic.address}
            </DetailField>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <DetailField variant="tile" label="Contact" icon={<PhoneOutlinedIcon fontSize="inherit" />}>
              {clinic.contact}
            </DetailField>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default memo(ClinicInfoCard);
