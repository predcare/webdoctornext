'use client';

import PageBreadcrumb from '@/components/commons/PageBreadcrumb/PageBreadcrumb';
import CustomAutocomplete from '@/components/ui/CustomAutocomplete/CustomAutocomplete';
import CustomInput from '@/components/ui/CustomInput/CustomInput';
import {
  cities,
  countries,
  states,
  type City,
  type Country,
  type State,
} from '@/resources/mock';
import { projectRoutes } from '@/routes';
import { AddPatientWrapper } from '@/styles/CustomStyled/AddPatientWrapper';
import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
import SearchIcon from '@mui/icons-material/Search';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import Link from 'next/link';
const doctorOptions = [
  { id: 'dr-anusri', label: 'Anusri Predsolution (anusri@predsolutions.com)' },
];
const genderOptions = ['Male', 'Female', 'Other'];
const bloodTypeOptions = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

type ExistingUser = { id: string; name: string; email: string };

const existingUsers: ExistingUser[] = [
  { id: 'usr-test', name: 'Test Patient', email: 'test@predcare.com' },
  {
    id: 'usr-sahil',
    name: 'Sahil Mallick',
    email: 'sahil.mallick@predcare.com',
  },
  {
    id: 'usr-bina',
    name: 'Bina Pani Rani Sudha Roy Chowdhury',
    email: 'bina.roy@predcare.com',
  },
  { id: 'usr-rohan', name: 'Rohan Das', email: 'rohan.das@predcare.com' },
  { id: 'usr-priya', name: 'Priya Sen', email: 'priya.sen@predcare.com' },
];

const breadcrumbItems = [
  { label: 'Dashboard', href: projectRoutes.dashboard },
  { label: 'Patients', href: projectRoutes.patients },
  { label: 'Add Patient' },
];

const fieldSize = { xs: 12, sm: 6, md: 4 };

const selectSlotProps = (
  placeholder: string,
  getLabel: (value: string) => string = (value) => value,
) => ({
  select: {
    displayEmpty: true,
    renderValue: (value: unknown) =>
      value ? (
        getLabel(String(value))
      ) : (
        <Typography component="span" className="select-placeholder">
          {placeholder}
        </Typography>
      ),
  },
});

const doctorLabel = (value: string) =>
  doctorOptions.find((doctor) => doctor.id === value)?.label ?? value;
const sameId = (option: { id: string }, value: { id: string }) =>
  option.id === value.id;
export default function AddPatientPage() {
  return (
    <AddPatientWrapper>
      <PageBreadcrumb items={breadcrumbItems} />

      <form className="add-patient-form" noValidate>
        <Box className="form-card">
          <Grid container spacing={2.5}>
            <Grid size={12} className="is-required">
              <CustomInput
                select
                name="doctor"
                inputLabelName="Assign Doctor"
                defaultValue={doctorOptions[0].id}
                slotProps={selectSlotProps('Select doctor', doctorLabel)}
              >
                {doctorOptions.map((doctor) => (
                  <MenuItem key={doctor.id} value={doctor.id}>
                    {doctor.label}
                  </MenuItem>
                ))}
              </CustomInput>
            </Grid>

            <Grid size={12}>
              <Typography component="p" className="field-label">
                Patient Selection Mode
              </Typography>
              <RadioGroup
                row
                className="radio-group"
                name="mode"
                defaultValue="new"
              >
                <FormControlLabel
                  value="new"
                  control={<Radio size="small" />}
                  label="Create New Patient"
                />
                <FormControlLabel
                  value="existing"
                  control={<Radio size="small" />}
                  label="Select Existing User"
                />
              </RadioGroup>
            </Grid>

            <Grid size={12} className="existing-only is-required">
              <CustomAutocomplete<ExistingUser>
                name="user"
                inputLabelName="Select User"
                placeholder="Search users..."
                options={existingUsers}
                startAdornment={<SearchIcon />}
                getOptionLabel={(option) => `${option.name} (${option.email})`}
                isOptionEqualToValue={sameId}
                noOptionsText="No users found"
                renderOption={(option) => (
                  <Box className="option-copy">
                    <Typography component="span" className="option-title">
                      {option.name}
                    </Typography>
                    <Typography component="span" className="option-subtitle">
                      {option.email}
                    </Typography>
                  </Box>
                )}
              />
              <Box className="selected-user">
                <Box className="selected-user-copy">
                  <Typography component="p" className="selected-user-name">
                    <strong>Selected:</strong> Test Patient
                  </Typography>
                  <Typography component="p" className="selected-user-email">
                    test@predcare.com
                  </Typography>
                </Box>
                <Button
                  type="button"
                  className="clear-btn"
                  variant="outlined"
                  size="small"
                  startIcon={<CloseIcon />}
                >
                  Clear
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box className="form-card new-only">
          <Box className="card-header">
            <Typography component="h2" className="card-title">
              Patient information
            </Typography>
            <Typography component="p" className="card-subtitle">
              Contact details are used for appointment reminders and sharing
              prescriptions.
            </Typography>
          </Box>

          <Box className="photo-row">
            <IconButton
              component="label"
              className="photo-picker"
              aria-label="Upload profile photo"
            >
              <PhotoCameraOutlinedIcon />
              <input
                hidden
                type="file"
                name="photo"
                accept="image/png, image/jpeg"
              />
            </IconButton>
            <Box className="photo-copy">
              <Typography component="p" className="photo-title">
                Profile photo
              </Typography>
              <Typography component="p" className="photo-hint">
                Optional · JPG or PNG
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={2.5}>
            <Grid size={fieldSize} className="is-required">
              <CustomInput
                name="fullName"
                inputLabelName="Full Name"
                placeholder="John Doe"
              />
            </Grid>
            <Grid size={fieldSize} className="is-required">
              <CustomInput
                name="email"
                type="email"
                inputLabelName="Email Address"
                placeholder="example@email.com"
              />
            </Grid>
            <Grid size={fieldSize} className="is-required">
              <CustomInput
                name="phone"
                type="tel"
                inputLabelName="Phone Number"
                placeholder="1234567890"
              />
            </Grid>

            <Grid size={fieldSize}>
              <CustomInput
                name="alternatePhone"
                type="tel"
                inputLabelName="Alternate Phone Number"
                placeholder="Optional alternate number"
              />
            </Grid>
            <Grid size={fieldSize} className="is-required">
              <CustomInput name="dob" type="date" inputLabelName="DOB" />
            </Grid>
            <Grid size={fieldSize} className="is-required">
              <CustomInput
                select
                name="gender"
                inputLabelName="Gender"
                defaultValue=""
                slotProps={selectSlotProps('Select')}
              >
                {genderOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </CustomInput>
            </Grid>

            <Grid size={fieldSize} className="is-required">
              <Typography component="p" className="field-label">
                Status
              </Typography>
              <RadioGroup
                row
                className="radio-group"
                name="status"
                defaultValue="Active"
              >
                <FormControlLabel
                  value="Active"
                  control={<Radio size="small" />}
                  label="Active"
                />
                <FormControlLabel
                  value="Inactive"
                  control={<Radio size="small" />}
                  label="Inactive"
                />
              </RadioGroup>
            </Grid>
            <Grid size={fieldSize}>
              <CustomInput
                select
                name="bloodType"
                inputLabelName="Blood Type"
                defaultValue=""
                slotProps={selectSlotProps('Select Blood Type')}
              >
                {bloodTypeOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </CustomInput>
            </Grid>

            <Grid size={12}>
              <CustomInput
                multiline
                minRows={3}
                name="medicalHistory"
                inputLabelName="Medical History"
                placeholder="Any known medical conditions..."
              />
            </Grid>
            <Grid size={12}>
              <CustomInput
                multiline
                minRows={3}
                name="notes"
                inputLabelName="Additional Notes (Not visible to patient)"
                placeholder="Any additional notes about this patient assignment..."
              />
            </Grid>
          </Grid>
        </Box>

        <Box className="form-card new-only">
          <Box className="card-header">
            <Typography component="h2" className="card-title">
              Address Information
            </Typography>
          </Box>

          <Grid container spacing={2.5}>
            <Grid size={12}>
              <CustomInput
                name="street"
                inputLabelName="Street Address"
                placeholder="Enter street address"
              />
            </Grid>
            <Grid size={fieldSize}>
              <CustomAutocomplete<Country>
                name="country"
                inputLabelName="Country"
                placeholder="Select Country"
                options={countries}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={sameId}
              />
            </Grid>
            <Grid size={fieldSize}>
              <CustomAutocomplete<State>
                name="state"
                inputLabelName="State"
                placeholder="Select State"
                options={states}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={sameId}
              />
            </Grid>
            <Grid size={fieldSize}>
              <CustomAutocomplete<City>
                name="city"
                inputLabelName="City"
                placeholder="Select City"
                options={cities}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={sameId}
              />
            </Grid>
            <Grid size={fieldSize}>
              <CustomInput
                name="postalCode"
                inputLabelName="Postal Code"
                placeholder="Enter postal code"
              />
            </Grid>
          </Grid>
        </Box>

        <Box className="form-note info new-only">
          <InfoOutlinedIcon />
          <Typography component="p">
            <strong>Note:</strong> A secure password will be generated
            automatically and emailed to the patient.
          </Typography>
        </Box>

        <Box className="form-note warning existing-only">
          <WarningAmberIcon />
          <Typography component="p">
            <strong>Note:</strong> This will assign the selected user as a
            patient to the chosen clinic and doctor. They will receive an email
            notification.
          </Typography>
        </Box>

        <Box className="form-footer">
          <Button
            component={Link}
            href={projectRoutes.patients}
            className="footer-btn cancel-btn"
            variant="text"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="footer-btn submit-btn new-only"
            variant="contained"
            disableElevation
          >
            Add New Patient
          </Button>
          <Button
            type="submit"
            className="footer-btn submit-btn existing-only"
            variant="contained"
            disableElevation
          >
            Assign as Patient
          </Button>
        </Box>
      </form>
    </AddPatientWrapper>
  );
}
