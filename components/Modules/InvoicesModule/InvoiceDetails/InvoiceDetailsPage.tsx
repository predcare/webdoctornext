'use client';

import { InvoiceDetailsWrapper } from '@/styles/CustomStyled/InvoiceDetailsWrapper';
import { memo } from 'react';
import InvoiceDetailsHeader from './InvoiceDetailsHeader';
import InvoiceItemsViewTable from './InvoiceItemsViewTable';
import InvoicePatientCard from './InvoicePatientCard';
import InvoiceSummarySection from './InvoiceSummarySection';

type InvoiceDetailsPageProps = {
  invoiceId?: string;
};

function InvoiceDetailsPage({ invoiceId = 'INV-2627-01' }: InvoiceDetailsPageProps) {
  return (
    <InvoiceDetailsWrapper>
      <InvoiceDetailsHeader invoiceId={invoiceId} />
      <InvoicePatientCard />
      <InvoiceItemsViewTable />
      <InvoiceSummarySection />
    </InvoiceDetailsWrapper>
  );
}

export default memo(InvoiceDetailsPage);
