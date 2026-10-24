import EditInvoicePage from '@/components/Modules/InvoicesModule/EditInvoice/EditInvoicePage';
import { decodeUrlParam } from '@/lib/functions/_urlParams.lib';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Edit Invoice | PredCare Doctor Portal',
};

type RouteProps = {
  params: Promise<{ id: string }>;
};

async function EditInvoiceContent({ params }: RouteProps) {
  const { id } = await params;
  const decodedId = decodeUrlParam(id) || 'INV-2627-02';

  return <EditInvoicePage invoiceId={decodedId} />;
}

export default function EditInvoiceRoute({ params }: RouteProps) {
  return (
    <Suspense fallback={null}>
      <EditInvoiceContent params={params} />
    </Suspense>
  );
}
