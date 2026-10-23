'use client';

import CustomInput from '@/components/ui/CustomInput/CustomInput';
import { _formatShortNum } from '@/lib/commons/common.utils';
import { TCreateInvoiceSchemaType } from '@/lib/schemas/createInvoice.schema';
import CheckIcon from '@mui/icons-material/Check';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { memo } from 'react';
import { Control, Controller } from 'react-hook-form';

interface InvoiceSummarySectionProps {
  control: Control<TCreateInvoiceSchemaType>;
  subtotal: number;
  totalDiscount: number;
  grandTotal: number;
  isSubmitting?: boolean;
}

function InvoiceSummarySection({
  control,
  subtotal,
  totalDiscount,
  grandTotal,
  isSubmitting = false,
}: InvoiceSummarySectionProps) {
  return (
    <Box className="bottom-grid">
      <Box className="invoice-card">
        <Typography component="h3" className="card-title" sx={{ mb: 2 }}>
          Notes / Remarks
        </Typography>
        <Controller
          name="notes"
          control={control}
          render={({ field }) => (
            <CustomInput
              {...field}
              multiline
              rows={4}
              placeholder="Enter any notes or remarks..."
              fullWidth
            />
          )}
        />
      </Box>

      <Box className="invoice-card" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box>
          <Typography component="h3" className="card-title">
            Summary
          </Typography>

          <Box className="summary-rows">
            <Box className="summary-line">
              <span>Subtotal</span>
              <strong>₹{_formatShortNum(subtotal)}</strong>
            </Box>

            {totalDiscount > 0 ? (
              <Box className="summary-line">
                <span>Discount</span>
                <span style={{ color: '#0f766e', fontWeight: 600 }}>
                  - ₹{_formatShortNum(totalDiscount)}
                </span>
              </Box>
            ) : null}

            <Box className="summary-line grand-total">
              <span>Grand Total</span>
              <span>₹{_formatShortNum(grandTotal)}</span>
            </Box>
          </Box>
        </Box>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          className="save-invoice-btn"
          disabled={isSubmitting}
          startIcon={
            isSubmitting ? (
              <CircularProgress size={18} sx={{ color: '#fff' }} />
            ) : (
              <CheckIcon />
            )
          }
        >
          {isSubmitting ? 'Saving Invoice...' : 'Save Invoice'}
        </Button>
      </Box>
    </Box>
  );
}

export default memo(InvoiceSummarySection);
