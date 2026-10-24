'use client';

import { PredCareInvoicesWrapper } from '@/styles/CustomStyled/PredCareInvoicesWrapper';
import { Typography } from '@mui/material';
import { memo } from 'react';
import PredCareInvoicesFilters from './PredCareInvoicesFilters';
import PredCareInvoicesStats from './PredCareInvoicesStats';
import PredCareInvoicesTable from './PredCareInvoicesTable';

function PredCareInvoicesPage() {
  return (
    <PredCareInvoicesWrapper>
      <Typography component="h1" className="page-title">
        PRED Care Invoices
      </Typography>

      <PredCareInvoicesStats />
      <PredCareInvoicesFilters />
      <PredCareInvoicesTable />
    </PredCareInvoicesWrapper>
  );
}

export default memo(PredCareInvoicesPage);
