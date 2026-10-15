'use client';

import CustomAutocomplete from '@/components/ui/CustomAutocomplete/CustomAutocomplete';
import CustomInput from '@/components/ui/CustomInput/CustomInput';
import {
  registerCities,
  registerMedicalCouncils,
  registerOptionLabel,
  registerSpecializations,
  sameRegisterOption,
  type RegisterSelectOption,
} from '@/resources/mock';
import { projectRoutes } from '@/routes';
import { AuthRegisterWrapper } from '@/styles/CustomStyled/AuthRegisterWrapper';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import { Box, Button, Grid, Link, Typography } from '@mui/material';
import NextLink from 'next/link';
import { FormEvent } from 'react';

const preventSubmit = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
};

const DoctorRegisterPage = () => {
  return (
    <AuthRegisterWrapper elevation={0}>
      <Box className="login-header">
        <Box className="register-avatar">
          <PersonOutlinedIcon />
        </Box>
        <Typography className="login-title">Doctor Enquiry Form</Typography>
        <Typography className="login-subtitle">
          Start your 14-day free trial. No credit card required.
        </Typography>
      </Box>

      <form className="form-panel" noValidate onSubmit={preventSubmit}>
        <Grid container spacing={2} className="register-fields">
          <Grid size={{ xs: 12, sm: 6 }}>
            <CustomInput
              name="clinicName"
              inputLabelName="Clinic / Hospital Name (Optional)"
              placeholder="Enter clinic or hospital name"
              autoComplete="off"
              startAdornment={<LocalHospitalOutlinedIcon />}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }} className="is-required">
            <CustomAutocomplete<RegisterSelectOption>
              name="city"
              inputLabelName="City"
              placeholder="Select City"
              options={registerCities}
              getOptionLabel={registerOptionLabel}
              isOptionEqualToValue={sameRegisterOption}
              startAdornment={<PlaceOutlinedIcon />}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }} className="is-required">
            <CustomInput
              name="doctorName"
              inputLabelName="Doctor Name"
              placeholder="Enter doctor name"
              defaultValue="Dr. Pradeep Kumar"
              autoComplete="off"
              startAdornment={<AccountCircleOutlinedIcon />}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }} className="is-required">
            <CustomAutocomplete<RegisterSelectOption>
              name="specialization"
              inputLabelName="Specialization"
              placeholder="Select Specialization"
              options={registerSpecializations}
              getOptionLabel={registerOptionLabel}
              isOptionEqualToValue={sameRegisterOption}
              startAdornment={<MedicalServicesOutlinedIcon />}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }} className="is-required">
            <CustomAutocomplete<RegisterSelectOption>
              name="medicalCouncil"
              inputLabelName="Medical Council Name"
              placeholder="Select Medical Council"
              options={registerMedicalCouncils}
              getOptionLabel={registerOptionLabel}
              isOptionEqualToValue={sameRegisterOption}
              startAdornment={<AccountBalanceOutlinedIcon />}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <CustomInput
              name="licenseNumber"
              inputLabelName="Medical License Number"
              placeholder="Enter medical license number"
              autoComplete="off"
              startAdornment={<BadgeOutlinedIcon />}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }} className="is-required">
            <CustomInput
              name="phone"
              inputLabelName="Phone Number"
              placeholder="Enter phone number"
              type="tel"
              defaultValue="+91 9876543210"
              autoComplete="off"
              startAdornment={<PhoneOutlinedIcon />}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }} className="is-required">
            <CustomInput
              name="email"
              inputLabelName="Email Address"
              placeholder="Enter email address"
              type="email"
              defaultValue="doctor@example.com"
              autoComplete="off"
              startAdornment={<EmailOutlinedIcon />}
            />
          </Grid>
        </Grid>

        <Button type="submit" variant="contained" className="submit-btn">
          Submit
        </Button>
      </form>

      <Box className="login-footer">
        <Typography className="footer-copy">
          Already have an account?{' '}
          <Link
            component={NextLink}
            href={projectRoutes.doctorLogin}
            className="register-link"
          >
            Login Here
          </Link>
        </Typography>
        <Link
          component={NextLink}
          href={projectRoutes.home}
          className="back-home-link"
        >
          <ArrowBackIcon />
          Back to Home
        </Link>
      </Box>
    </AuthRegisterWrapper>
  );
};

export default DoctorRegisterPage;
