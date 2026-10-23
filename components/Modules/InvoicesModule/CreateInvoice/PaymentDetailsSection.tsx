'use client';

import CustomInput from '@/components/ui/CustomInput/CustomInput';
import CustomSelect, {
  TSelectOption,
} from '@/components/ui/CustomSelect/CustomSelect';
import { _formatShortNum } from '@/lib/commons/common.utils';
import { TCreateInvoiceSchemaType } from '@/lib/schemas/createInvoice.schema';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import {
  Box,
  Button,
  IconButton,
  Typography,
} from '@mui/material';
import { memo, useMemo, useState } from 'react';
import { Control, useFieldArray, UseFormWatch } from 'react-hook-form';

type PaymentMethodType = 'Cash' | 'Card' | 'UPI' | 'Online' | 'Bank Transfer';

const PAYMENT_METHOD_OPTIONS: TSelectOption[] = [
  { label: 'Cash', value: 'Cash' },
  { label: 'Card', value: 'Card' },
  { label: 'UPI', value: 'UPI' },
  { label: 'Online', value: 'Online' },
  { label: 'Bank Transfer', value: 'Bank Transfer' },
];

interface PaymentDetailsSectionProps {
  control: Control<TCreateInvoiceSchemaType>;
  watch: UseFormWatch<TCreateInvoiceSchemaType>;
  grandTotal: number;
}

function PaymentDetailsSection({
  control,
  watch,
  grandTotal,
}: PaymentDetailsSectionProps) {
  const [method, setMethod] = useState<'Cash' | 'Card' | 'UPI' | 'Online' | 'Bank Transfer'>('Cash');
  const [paymentDate, setPaymentDate] = useState(() => {
    return new Date().toISOString().split('T')[0];
  });
  const [amount, setAmount] = useState('');
  const [details, setDetails] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'payments',
  });

  const watchedPayments = watch('payments') || [];

  const totalPaid = useMemo(() => {
    return watchedPayments.reduce((acc, curr) => {
      return acc + (parseFloat(curr?.amount || '0') || 0);
    }, 0);
  }, [watchedPayments]);

  const pendingAmount = useMemo(() => {
    return Math.max(0, grandTotal - totalPaid);
  }, [grandTotal, totalPaid]);

  const handleAddPayment = () => {
    const parsedAmount = parseFloat(amount);
    if (!amount || isNaN(parsedAmount) || parsedAmount <= 0) {
      setErrorMsg('Please enter a valid amount');
      return;
    }
    if (parsedAmount > pendingAmount && pendingAmount > 0) {
      setErrorMsg(`Amount cannot exceed pending balance (₹${_formatShortNum(pendingAmount)})`);
      return;
    }

    append({
      payment_method: method,
      payment_date: paymentDate,
      amount: String(parsedAmount),
      payment_details: details.trim(),
    });

    setAmount('');
    setDetails('');
    setErrorMsg('');
  };

  return (
    <Box className="invoice-card">
      <Box className="card-header-row">
        <Typography component="h3" className="card-title">
          Payment Details
        </Typography>

        <Box className="payment-stats-header">
          <span>
            Invoice: <strong className="stat-badge">₹{_formatShortNum(grandTotal)}</strong>
          </span>
          <span>
            Amount Paid: <strong className="stat-badge">₹{_formatShortNum(totalPaid)}</strong>
          </span>
          <span>
            Pending: <strong className="stat-badge">₹{_formatShortNum(pendingAmount)}</strong>
          </span>
        </Box>
      </Box>

      <Box className="payment-input-row">
        <Box>
          <Typography sx={{ fontSize: '12px', fontWeight: 500, mb: 0.5 }}>
            Payment Method <span style={{ color: '#ef4444' }}>*</span>
          </Typography>
          <CustomSelect
            options={PAYMENT_METHOD_OPTIONS}
            value={method}
            onChange={(val) => setMethod(val as PaymentMethodType)}
          />
        </Box>

        <Box>
          <Typography sx={{ fontSize: '12px', fontWeight: 500, mb: 0.5 }}>
            Payment Date <span style={{ color: '#ef4444' }}>*</span>
          </Typography>
          <CustomInput
            type="date"
            value={paymentDate}
            onChange={(e) => setPaymentDate(e.target.value)}
            size="small"
            fullWidth
          />
        </Box>

        <Box>
          <Typography sx={{ fontSize: '12px', fontWeight: 500, mb: 0.5 }}>
            Amount <span style={{ color: '#ef4444' }}>*</span>
          </Typography>
          <CustomInput
            type="number"
            placeholder={`Max ${_formatShortNum(pendingAmount)}`}
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              if (errorMsg) setErrorMsg('');
            }}
            size="small"
            fullWidth
            slotProps={{
              htmlInput: { min: 0, step: 'any' },
            }}
          />
        </Box>

        <Box>
          <Typography sx={{ fontSize: '12px', fontWeight: 500, mb: 0.5 }}>
            Payment Details (optional)
          </Typography>
          <CustomInput
            placeholder="Txn ID, cheque no...."
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            size="small"
            fullWidth
          />
        </Box>

        <Box>
          <Button
            type="button"
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleAddPayment}
            sx={{
              borderColor: '#0f766e',
              color: '#0f766e',
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '13px',
              height: 40,
              px: 2.5,
              borderRadius: '6px',
              '&:hover': {
                borderColor: '#0f766e',
                background: 'rgba(15, 118, 110, 0.05)',
              },
            }}
          >
            Add
          </Button>
        </Box>
      </Box>

      {errorMsg ? (
        <Typography sx={{ color: 'error.main', fontSize: '12px', mt: 1 }}>
          {errorMsg}
        </Typography>
      ) : null}

      {fields.length > 0 ? (
        <table className="payments-table">
          <thead>
            <tr>
              <th>Method</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Details</th>
              <th style={{ width: 40 }}></th>
            </tr>
          </thead>
          <tbody>
            {fields.map((p, idx) => (
              <tr key={p.id}>
                <td>{watchedPayments[idx]?.payment_method}</td>
                <td>{watchedPayments[idx]?.payment_date}</td>
                <td style={{ fontWeight: 600 }}>
                  ₹{_formatShortNum(watchedPayments[idx]?.amount)}
                </td>
                <td>{watchedPayments[idx]?.payment_details || '—'}</td>
                <td>
                  <IconButton
                    size="small"
                    onClick={() => remove(idx)}
                    sx={{ color: '#ef4444' }}
                    title="Remove Payment"
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </Box>
  );
}

export default memo(PaymentDetailsSection);
