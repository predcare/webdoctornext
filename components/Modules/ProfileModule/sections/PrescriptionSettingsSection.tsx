'use client';

import { Box } from '@mui/material';
import type { FormEvent } from 'react';
import BannerModeField from '../parts/BannerModeField';
import FormActions from '../parts/FormActions';
import SignatureUploadField from '../parts/SignatureUploadField';

const preventSubmit = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
};

export default function PrescriptionSettingsSection() {
  return (
    <Box component="form" className="form-card" noValidate onSubmit={preventSubmit}>
      <BannerModeField
        name="prescription-header"
        title="Prescription Header"
        defaultNote="The default clinic banner (clinic name, address, contact info, doctor info) will be used."
      />
      <BannerModeField
        name="prescription-footer"
        title="Prescription Footer"
        defaultNote="The default footer (prescription code, clinic info, signature line) will be used."
      />
      <SignatureUploadField
        name="prescription-signature"
        title="Doctor Signature"
        description="Choose how the signature area appears on every prescription PDF."
        hint="JPEG, PNG, GIF — max 2 MB. Use a transparent PNG for best results. Recommended size 300 × 80 px — the signature is displayed at max 200 × 60 px on the PDF."
      />
      <FormActions saveLabel="Save Settings" showCheck />
    </Box>
  );
}
