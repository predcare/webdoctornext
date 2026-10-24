'use client';

import { Box, Typography } from '@mui/material';
import { memo } from 'react';

function InvoiceSummarySection() {
  return (
    <Box className="bottom-grid">
      <Box className="details-card notes-card">
        <Typography component="h2" className="card-title">
          Notes
        </Typography>
        <Typography component="p" className="notes-body">
          Dummy Remark
        </Typography>
      </Box>

      <Box className="details-card summary-card">
        <Typography component="h2" className="card-title">
          Summary
        </Typography>

        <Box className="summary-row">
          <Typography component="span">Subtotal</Typography>
          <Typography component="span" className="value">
            ₹100.00
          </Typography>
        </Box>

        <Box className="divider" />

        <Box className="summary-row grand-total">
          <Typography component="span">Grand Total</Typography>
          <Typography component="span" className="value">
            ₹100.00
          </Typography>
        </Box>

        <Box className="summary-row">
          <Typography component="span">Amount Paid</Typography>
          <Typography component="span" className="value">
            ₹0.00
          </Typography>
        </Box>

        <Box className="summary-row">
          <Typography component="span">Remaining</Typography>
          <Typography component="span" className="value">
            ₹100.00
          </Typography>
        </Box>

        <Box className="divider" />

        <Box className="summary-row">
          <Typography component="span">GST Type: CGST_SGST</Typography>
          <Typography component="span" />
        </Box>

        <Box className="summary-row">
          <Typography component="span">Clinic GSTIN</Typography>
          <Typography component="span" className="value">
            GST12345
          </Typography>
        </Box>

        <Box className="summary-row">
          <Typography component="span">Reg. Number</Typography>
          <Typography component="span" className="value">
            CRN78909
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default memo(InvoiceSummarySection);
