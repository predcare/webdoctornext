'use client';

import CustomSelect, {
  TSelectOption,
} from '@/components/ui/CustomSelect/CustomSelect';
import { TCreateInvoiceSchemaType } from '@/lib/schemas/createInvoice.schema';
import { useAuthStore } from '@/zustand/stores/useAuthStore';
import { Box, Typography } from '@mui/material';
import { memo } from 'react';
import { Control, Controller } from 'react-hook-form';

const PAYMENT_STATUS_OPTIONS: TSelectOption[] = [
  { label: 'Unpaid', value: 'Unpaid' },
  { label: 'Paid', value: 'Paid' },
];

interface PaymentStatusCardProps {
  control: Control<TCreateInvoiceSchemaType>;
}

function PaymentStatusCard({ control }: PaymentStatusCardProps) {
  const { userData } = useAuthStore((state) => state);

  return (
    <Box className="invoice-card">
      <Box className="card-header-row">
        <Typography component="h3" className="card-title">
          Payment Status
        </Typography>
      </Box>

      <Box className="status-fields">
        <Box className="status-select-wrap">
          <Typography component="label" className="field-label">
            Payment Status
          </Typography>
          <Controller
            name="paymentStatus"
            control={control}
            render={({ field }) => (
              <CustomSelect
                options={PAYMENT_STATUS_OPTIONS}
                value={field.value || 'Unpaid'}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />
        </Box>

        <Box className="clinic-meta-row">
          <Box className="meta-item">
            <span>Clinic GSTIN</span>
            <span className="meta-val">
              {userData?.clinic?.clinic_gstin || 'N/A'}
            </span>
          </Box>
          <Box className="meta-item" sx={{ textAlign: 'right' }}>
            <span>Reg. Number</span>
            <span className="meta-val">
              {userData?.clinic?.clinic_reg_number || 'N/A'}
            </span>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default memo(PaymentStatusCard);
