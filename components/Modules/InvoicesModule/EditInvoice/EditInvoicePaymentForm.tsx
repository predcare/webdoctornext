'use client';

import CustomInput from '@/components/ui/CustomInput/CustomInput';
import CustomSelect from '@/components/ui/CustomSelect/CustomSelect';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { Box, Button, InputAdornment, Typography } from '@mui/material';
import { memo } from 'react';

const paymentMethodOptions = [
  { label: 'Cash', value: 'cash' },
  { label: 'Card', value: 'card' },
  { label: 'UPI', value: 'upi' },
];

function EditInvoicePaymentForm() {
  return (
    <Box className="form-section-card">
      <Box className="section-header-flex">
        <Typography component="h2" className="section-title">
          Payment Details
        </Typography>
        <Box className="sub-stats">
          <Typography component="span">Subtotal: ₹95.00</Typography>
          <Typography component="span">Amount Paid: ₹0.00</Typography>
          <Typography component="span" className="pending-text">
            Pending: ₹95.00
          </Typography>
        </Box>
      </Box>

      <Box className="payment-inputs-grid">
        <Box>
          <CustomSelect
            inputLabelName="Payment Method *"
            options={paymentMethodOptions}
            value="cash"
          />
        </Box>

        <Box>
          <CustomInput
            label="Payment Date *"
            value="24-Oct-2026"
            endAdornment={
              <InputAdornment position="end">
                <CalendarTodayOutlinedIcon
                  fontSize="small"
                  sx={{ color: 'text.secondary', fontSize: 16 }}
                />
              </InputAdornment>
            }
          />
        </Box>

        <Box>
          <CustomInput
            label="Amount *"
            placeholder="Max: 95.00"
            value=""
          />
        </Box>

        <Box>
          <CustomInput
            label="Payment Details (reference)"
            placeholder="Txn ID, Cheque No..."
            value=""
          />
        </Box>

        <Button variant="contained" className="add-btn">
          + Add
        </Button>
      </Box>
    </Box>
  );
}

export default memo(EditInvoicePaymentForm);
