'use client';

import { Box, Typography } from '@mui/material';
import { memo } from 'react';

function EditInvoicePatientCard() {
  return (
    <Box className="form-section-card patient-summary">
      <Typography component="h2" className="section-title">
        Patient Details
      </Typography>
      <Typography component="p" className="patient-name">
        Test Patient
      </Typography>
      <Typography component="p" className="patient-contact">
        9999999999 | test@patient.com
      </Typography>
    </Box>
  );
}

export default memo(EditInvoicePatientCard);
