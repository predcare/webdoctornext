'use client';

import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { Box, Typography } from '@mui/material';
import type { FormEvent } from 'react';
import FormActions from '../parts/FormActions';

const preventSubmit = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
};

export default function CertificatesSection() {
  return (
    <Box component="form" className="form-card" noValidate onSubmit={preventSubmit}>
      <Typography component="h2" className="card-title">
        Certificates
      </Typography>
      <Box className="upload-banner">
        <CloudUploadOutlinedIcon />
        <span>Upload New Certificates</span>
      </Box>
      <input
        className="native-file"
        type="file"
        name="certificates"
        accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
        multiple
      />
      <Typography component="p" className="format-note">
        Accepted formats: PDF, JPG, PNG (maximum 5MB each)
      </Typography>
      <FormActions saveLabel="Save Changes" showCancel />
    </Box>
  );
}
