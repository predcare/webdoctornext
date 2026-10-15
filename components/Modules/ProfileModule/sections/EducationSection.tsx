'use client';

import CustomInput from '@/components/ui/CustomInput/CustomInput';
import { Box, Grid, Typography } from '@mui/material';
import type { FormEvent } from 'react';
import FormActions from '../parts/FormActions';

const preventSubmit = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
};

const pair = { xs: 12, md: 6 };

export default function EducationSection() {
  return (
    <Box component="form" className="form-card" noValidate onSubmit={preventSubmit}>
      <Typography component="h2" className="card-title">
        Education Information
      </Typography>
      <Grid container spacing={2}>
        <Grid size={pair} className="is-required">
          <CustomInput
            name="institution"
            inputLabelName="Institution"
            placeholder="University/College name"
          />
        </Grid>
        <Grid size={pair} className="is-required">
          <CustomInput name="degree" inputLabelName="Degree" placeholder="e.g., MBBS, MD, MS" />
        </Grid>
        <Grid size={pair} className="is-required">
          <CustomInput name="startYear" inputLabelName="Start Year" defaultValue="2024" />
        </Grid>
        <Grid size={pair}>
          <CustomInput
            name="endYear"
            inputLabelName="End Year"
            placeholder="Leave empty if currently pursuing"
          />
        </Grid>
      </Grid>
      <FormActions addLabel="Add Education" saveLabel="Save Changes" showCancel />
    </Box>
  );
}
