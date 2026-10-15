'use client';

import CustomAutocomplete from '@/components/ui/CustomAutocomplete/CustomAutocomplete';
import CustomInput from '@/components/ui/CustomInput/CustomInput';
import { Box, Grid, Typography } from '@mui/material';
import type { FormEvent } from 'react';
import {
  defaultProfileCity,
  defaultProfileCountry,
  defaultProfileState,
  profileCities,
  profileCountries,
  profileStates,
  sameLocation,
  type LocationOption,
} from '../locationOptions';
import AboutSummaryCard from '../parts/AboutSummaryCard';
import DoctorIdentityCard from '../parts/DoctorIdentityCard';
import FormActions from '../parts/FormActions';

const preventSubmit = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
};

const locationLabel = (option: LocationOption) => option.name;

export default function AboutSection() {
  return (
    <>
      <Box className="form-card profile-overview">
        <DoctorIdentityCard />
        <AboutSummaryCard />
      </Box>
      <form className="section-stack" noValidate onSubmit={preventSubmit}>
        <Box className="form-card">
          <Typography component="h2" className="card-title">
            Address
          </Typography>
          <Grid container spacing={2}>
            <Grid size={12} className="is-required">
              <CustomInput
                multiline
                minRows={2}
                name="street"
                inputLabelName="Street Address"
                defaultValue="street"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, xl: 3 }}>
              <CustomAutocomplete<LocationOption>
                name="country"
                inputLabelName="Country"
                placeholder="Select Country"
                options={profileCountries}
                value={defaultProfileCountry}
                disableClearable
                getOptionLabel={locationLabel}
                isOptionEqualToValue={sameLocation}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, xl: 3 }}>
              <CustomAutocomplete<LocationOption>
                name="state"
                inputLabelName="State"
                placeholder="Select State"
                options={profileStates}
                value={defaultProfileState}
                disableClearable
                getOptionLabel={locationLabel}
                isOptionEqualToValue={sameLocation}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, xl: 3 }}>
              <CustomAutocomplete<LocationOption>
                name="city"
                inputLabelName="City"
                placeholder="Select City"
                options={profileCities}
                value={defaultProfileCity}
                disableClearable
                getOptionLabel={locationLabel}
                isOptionEqualToValue={sameLocation}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, xl: 3 }}>
              <CustomInput
                name="postalCode"
                inputLabelName="Postal Code"
                defaultValue="123456"
              />
            </Grid>
          </Grid>
          <FormActions saveLabel="Save Address" />
        </Box>

        <Box className="form-card">
          <Typography component="h2" className="card-title">
            About Me
          </Typography>
          <CustomInput
            multiline
            minRows={3}
            name="aboutMe"
            defaultValue="test"
          />
        </Box>

        <Box className="form-card">
          <Typography component="h2" className="card-title">
            Education Information
          </Typography>
          <Typography component="p" className="empty-copy">
            No education information available.
          </Typography>
        </Box>
      </form>
    </>
  );
}
