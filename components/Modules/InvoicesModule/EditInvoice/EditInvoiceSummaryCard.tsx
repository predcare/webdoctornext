'use client';

import { Box, Typography } from '@mui/material';
import { memo } from 'react';

function EditInvoiceSummaryCard() {
  return (
    <Box className="summary-box">
      <Typography component="h2" className="summary-title">
        Summary
      </Typography>

      <Box className="summary-row">
        <Typography component="span">Subtotal</Typography>
        <Typography component="span" className="value">
          ₹100.00
        </Typography>
      </Box>

      <Box className="summary-row">
        <Typography component="span">Discount</Typography>
        <Typography component="span" className="discount">
          -₹5.00
        </Typography>
      </Box>

      <Box className="summary-row grand-total">
        <Typography component="span">Grand Total</Typography>
        <Typography component="span" className="value">
          ₹95.00
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
          ₹95.00
        </Typography>
      </Box>
    </Box>
  );
}

export default memo(EditInvoiceSummaryCard);
