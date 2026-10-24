'use client';

import CustomInput from '@/components/ui/CustomInput/CustomInput';
import { Box, Typography } from '@mui/material';
import { memo } from 'react';

function EditInvoiceNotesSection() {
  return (
    <Box className="form-section-card">
      <Typography component="h2" className="section-title">
        Notes / Remarks
      </Typography>
      <CustomInput
        placeholder="Remarks"
        value="Dummy Remark"
      />
    </Box>
  );
}

export default memo(EditInvoiceNotesSection);
