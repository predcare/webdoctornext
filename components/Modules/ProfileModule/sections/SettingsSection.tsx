'use client';

import CustomInput from '@/components/ui/CustomInput/CustomInput';
import CustomRadioGroup from '@/components/ui/CustomRadio/CustomRadio';
import { dashboardClinic } from '@/configs/dashboardNav';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Box, MenuItem, Typography } from '@mui/material';
import type { FormEvent } from 'react';
import FormActions from '../parts/FormActions';

const preventSubmit = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
};

export default function SettingsSection() {
  return (
    <Box component="form" className="form-card" noValidate onSubmit={preventSubmit}>
      <Box className="section-head">
        <Box>
          <Typography component="h2" className="card-title">
            <SettingsOutlinedIcon />
            Settings
          </Typography>
          <Typography component="p" className="card-subtitle">
            Manage your appointment and profile settings.
          </Typography>
        </Box>
      </Box>

      <Box className="setting-block">
        <Box>
          <Typography component="h3" className="block-title">
            <EventAvailableOutlinedIcon />
            Approval Required for Appointments
          </Typography>
          <Typography component="p" className="block-copy">
            When enabled, all upcoming appointments will require your approval before being
            confirmed.
          </Typography>
        </Box>
        <CustomRadioGroup
          name="approvalRequired"
          ariaLabel="Approval Required for Appointments"
          defaultValue="no"
          options={[
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ]}
        />
      </Box>

      <Box className="setting-block">
        <Box>
          <Typography component="h3" className="block-title">
            <ApartmentOutlinedIcon />
            Default clinic
          </Typography>
          <Typography component="p" className="block-copy">
            This clinic will load automatically every time you log in. Switching clinics from the
            header only lasts for the current session.
          </Typography>
        </Box>
        <CustomInput select name="defaultClinic" defaultValue="primary">
          <MenuItem value="primary">Use primary clinic</MenuItem>
          <MenuItem value="anusri">{dashboardClinic.name}</MenuItem>
        </CustomInput>
      </Box>

      <Box className="setting-block">
        <Box>
          <Typography component="h3" className="block-title">
            <PersonOutlineOutlinedIcon />
            Show me as patient
          </Typography>
          <Typography component="p" className="block-copy">
            When enabled, this account also gets a patient profile and patient role so you can book
            and use the patient app with the same login.
          </Typography>
        </Box>
        <CustomRadioGroup
          name="showAsPatient"
          ariaLabel="Show me as patient"
          defaultValue="doctor-only"
          disabled
          options={[{ value: 'doctor-only', label: 'Disabled — doctor only' }]}
        />
      </Box>

      <FormActions saveLabel="Save Settings" showCheck />
    </Box>
  );
}
