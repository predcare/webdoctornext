'use client';

import { projectRoutes } from '@/routes';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { memo } from 'react';

type EditInvoiceHeaderProps = {
  invoiceId?: string;
};

function EditInvoiceHeader({ invoiceId = 'INV-2627-02' }: EditInvoiceHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    router.push(projectRoutes.invoices);
  };

  return (
    <Box className="top-header">
      <Box className="header-left">
        <button type="button" className="back-nav" onClick={handleBack}>
          <ArrowBackIcon fontSize="small" /> Edit Invoice
        </button>
        <Box className="invoice-title-row">
          <Typography component="h1" className="invoice-id">
            {invoiceId}
          </Typography>
          <Box component="span" className="badge-doctor">
            Doctor Created
          </Box>
          <Box component="span" className="badge-notice">
            Doctor Extra Charging/Invoice is billable only
          </Box>
          <Typography component="span" className="invoice-timestamp">
            24 Oct 2026, 04:12 AM
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default memo(EditInvoiceHeader);
