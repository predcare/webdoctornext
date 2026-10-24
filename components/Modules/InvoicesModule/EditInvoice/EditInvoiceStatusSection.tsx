'use client';

import CustomSelect from '@/components/ui/CustomSelect/CustomSelect';
import { Box, Button, Typography } from '@mui/material';
import { memo } from 'react';

const statusOptions = [
  { label: 'Unpaid', value: 'unpaid' },
  { label: 'Paid', value: 'paid' },
];

function EditInvoiceStatusSection() {
  return (
    <Box className="form-section-card">
      <Typography component="h2" className="section-title">
        Payment Status
      </Typography>

      <Box className="payment-status-row">
        <Box className="select-wrap">
          <CustomSelect
            options={statusOptions}
            value="unpaid"
          />
        </Box>
        <Button variant="contained" className="update-btn">
          Update Status
        </Button>
      </Box>
    </Box>
  );
}

export default memo(EditInvoiceStatusSection);
