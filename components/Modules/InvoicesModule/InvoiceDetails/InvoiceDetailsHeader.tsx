'use client';

import { projectRoutes } from '@/routes';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutlined';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { memo } from 'react';

type InvoiceDetailsHeaderProps = {
  invoiceId?: string;
};

function InvoiceDetailsHeader({ invoiceId = 'INV-2627-01' }: InvoiceDetailsHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    router.push(projectRoutes.invoices);
  };

  const handleEdit = () => {
    router.push(projectRoutes.editInvoice(invoiceId));
  };

  return (
    <Box className="top-header">
      <Box className="header-left">
        <button type="button" className="back-nav" onClick={handleBack}>
          <ArrowBackIcon sx={{ fontSize: 16 }} /> Invoice
        </button>
        <Box className="invoice-title-row">
          <Typography component="h1" className="invoice-id">
            {invoiceId}
          </Typography>
          <Box component="span" className="badge-doctor">
            Doctor Created
          </Box>
          <Typography component="span" className="invoice-timestamp">
            24 Oct 2026, 04:17 AM
          </Typography>
        </Box>
      </Box>

      <Box className="header-actions">
        <Button
          variant="outlined"
          className="btn-action btn-edit"
          startIcon={<EditOutlinedIcon sx={{ fontSize: 15 }} />}
          onClick={handleEdit}
        >
          Edit Payments
        </Button>
        <Button
          variant="contained"
          className="btn-action btn-download"
          startIcon={<FileDownloadOutlinedIcon sx={{ fontSize: 15 }} />}
        >
          Download PDF
        </Button>
        <Button
          variant="outlined"
          className="btn-action btn-outline"
          startIcon={<PrintOutlinedIcon sx={{ fontSize: 15 }} />}
        >
          Print Invoice
        </Button>
        <Button
          variant="outlined"
          className="btn-action btn-outline"
          startIcon={<MailOutlineIcon sx={{ fontSize: 15 }} />}
        >
          Send Invoice
        </Button>
        <Button
          variant="outlined"
          className="btn-action btn-outline"
          startIcon={<ArrowBackIcon sx={{ fontSize: 15 }} />}
          onClick={handleBack}
        >
          Back to List
        </Button>
      </Box>
    </Box>
  );
}

export default memo(InvoiceDetailsHeader);
