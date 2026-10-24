'use client';

import { EditInvoiceWrapper } from '@/styles/CustomStyled/EditInvoiceWrapper';
import { memo } from 'react';
import EditInvoiceHeader from './EditInvoiceHeader';
import EditInvoiceItemsTable from './EditInvoiceItemsTable';
import EditInvoiceNotesSection from './EditInvoiceNotesSection';
import EditInvoicePatientCard from './EditInvoicePatientCard';
import EditInvoicePaymentForm from './EditInvoicePaymentForm';
import EditInvoiceStatusSection from './EditInvoiceStatusSection';
import EditInvoiceSummaryCard from './EditInvoiceSummaryCard';

type EditInvoicePageProps = {
  invoiceId?: string;
};

function EditInvoicePage({ invoiceId = 'INV-2627-02' }: EditInvoicePageProps) {
  return (
    <EditInvoiceWrapper>
      <EditInvoiceHeader invoiceId={invoiceId} />
      <EditInvoicePatientCard />
      <EditInvoiceItemsTable />
      <EditInvoicePaymentForm />
      <EditInvoiceNotesSection />
      <EditInvoiceStatusSection />
      <EditInvoiceSummaryCard />
    </EditInvoiceWrapper>
  );
}

export default memo(EditInvoicePage);
