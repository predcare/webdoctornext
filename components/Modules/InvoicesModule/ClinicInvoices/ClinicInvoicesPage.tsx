'use client';

import { ClinicInvoicesWrapper } from '@/styles/CustomStyled/ClinicInvoicesWrapper';
import { Typography } from '@mui/material';
import { memo } from 'react';
import ClinicInvoicesFilters from './ClinicInvoicesFilters';
import ClinicInvoicesStats from './ClinicInvoicesStats';
import ClinicInvoicesTable from './ClinicInvoicesTable';

function ClinicInvoicesPage() {
  return (
    <ClinicInvoicesWrapper>
      <Typography component="h1" className="page-title">
        Clinic Invoices
      </Typography>

      <ClinicInvoicesStats />
      <ClinicInvoicesFilters />
      <ClinicInvoicesTable />
    </ClinicInvoicesWrapper>
  );
}

export default memo(ClinicInvoicesPage);
