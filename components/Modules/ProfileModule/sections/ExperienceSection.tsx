'use client';

import CustomInput from '@/components/ui/CustomInput/CustomInput';
import { Box, Grid, Typography } from '@mui/material';
import type { FormEvent } from 'react';
import FormActions from '../parts/FormActions';

const preventSubmit = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
};

const pair = { xs: 12, md: 6 };

export default function ExperienceSection() {
  return (
    <Box component="form" className="form-card" noValidate onSubmit={preventSubmit}>
      <Typography component="h2" className="card-title">
        Experience Information
      </Typography>
      <Grid container spacing={2}>
        <Grid size={pair} className="is-required">
          <CustomInput
            name="position"
            inputLabelName="Position"
            placeholder="Job title/position"
          />
        </Grid>
        <Grid size={pair} className="is-required">
          <CustomInput
            name="organization"
            inputLabelName="Organization"
            placeholder="Hospital/Clinic name"
          />
        </Grid>
        <Grid size={pair} className="is-required">
          <CustomInput name="startDate" inputLabelName="Start Date" type="date" />
        </Grid>
        <Grid size={pair}>
          <CustomInput name="endDate" inputLabelName="End Date" type="date" />
          <Typography component="p" className="field-hint">
            Leave empty if current position
          </Typography>
        </Grid>
      </Grid>
      <FormActions addLabel="Add Experience" saveLabel="Save Changes" showCancel />
    </Box>
  );
}
