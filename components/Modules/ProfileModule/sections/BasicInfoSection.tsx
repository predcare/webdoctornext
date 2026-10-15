'use client';

import CustomInput from '@/components/ui/CustomInput/CustomInput';
import { Box, Chip, Grid, Typography } from '@mui/material';
import type { FormEvent } from 'react';

const preventSubmit = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
};

const readOnlySlot = {
  htmlInput: { readOnly: true },
};

const pair = { xs: 12, md: 6 };

export default function BasicInfoSection() {
  return (
    <Box
      component="form"
      className="form-card"
      noValidate
      onSubmit={preventSubmit}
    >
      <Box className="section-head">
        <Typography component="h2" className="card-title">
          Basic Information
        </Typography>
        <Typography component="p" className="readonly-note">
          Read only — contact admin to update
        </Typography>
      </Box>

      <Box className="avatar-field">
        <Typography component="p" className="field-label">
          Profile Image
        </Typography>
        <span className="profile-avatar">A</span>
      </Box>

      <Grid container spacing={2}>
        <Grid size={pair}>
          <CustomInput
            name="salutation"
            inputLabelName="Salutation"
            defaultValue="Dr."
            slotProps={readOnlySlot}
          />
        </Grid>
        <Grid size={pair}>
          <CustomInput
            name="fullName"
            inputLabelName="Full Name"
            defaultValue="Anusri Predsolution"
            slotProps={readOnlySlot}
          />
        </Grid>
        <Grid size={pair}>
          <CustomInput
            name="dateOfBirth"
            inputLabelName="Date of Birth"
            type="date"
            defaultValue="2026-10-01"
            slotProps={readOnlySlot}
          />
        </Grid>
        <Grid size={pair}>
          <CustomInput
            name="phone"
            inputLabelName="Phone Number"
            defaultValue="6283385429"
            slotProps={readOnlySlot}
          />
        </Grid>
        <Grid size={pair}>
          <CustomInput
            name="alternatePhone"
            inputLabelName="Alternate Number"
            defaultValue="6283385429"
            slotProps={readOnlySlot}
          />
        </Grid>
        <Grid size={pair}>
          <CustomInput
            name="whatsapp"
            inputLabelName="WhatsApp Number"
            defaultValue="6283385429"
            slotProps={readOnlySlot}
          />
        </Grid>
        <Grid size={pair}>
          <CustomInput
            name="email"
            inputLabelName="Email"
            defaultValue="anusri@predsolutions.com"
            slotProps={readOnlySlot}
          />
          <Typography component="p" className="field-hint">
            Contact admin to change email
          </Typography>
        </Grid>
        <Grid size={12}>
          <Typography component="p" className="field-label">
            Specialization
          </Typography>
          <Box className="static-box">
            <Chip className="muted-chip" label="Anesthesiology" size="small" />
          </Box>
        </Grid>
        <Grid size={12}>
          <Typography component="p" className="field-label">
            Sub Specialization
          </Typography>
          <Box className="static-box">
            <Box className="chip-row">
              <Chip
                className="muted-chip"
                label="Anesthesiology"
                size="small"
              />
              <Chip
                className="muted-chip"
                label="Cardiac Anesthesia"
                size="small"
              />
            </Box>
            <Typography component="p" className="chip-meta">
              1 selected
            </Typography>
          </Box>
        </Grid>
        <Grid size={12}>
          <Typography component="p" className="field-label">
            Languages Spoken
          </Typography>
          <Box className="static-box">
            <Chip className="muted-chip" label="Bengali" size="small" />
          </Box>
        </Grid>
        <Grid size={pair}>
          <CustomInput
            name="yearsOfExperience"
            inputLabelName="Years of Experience"
            defaultValue="14"
            slotProps={readOnlySlot}
          />
        </Grid>
        <Grid size={pair}>
          <CustomInput
            name="licenseNumber"
            inputLabelName="License Number"
            defaultValue="k112"
            slotProps={readOnlySlot}
          />
        </Grid>
        <Grid size={pair}>
          <CustomInput
            name="qualifications"
            inputLabelName="Qualifications"
            defaultValue="dfd"
            slotProps={readOnlySlot}
          />
        </Grid>
        <Grid size={12}>
          <CustomInput
            multiline
            minRows={3}
            name="bio"
            inputLabelName="Bio"
            defaultValue="dfd"
            slotProps={readOnlySlot}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
