import InvoiceDetailsPage from '@/components/Modules/InvoicesModule/InvoiceDetails/InvoiceDetailsPage';
import { decodeUrlParam } from '@/lib/functions/_urlParams.lib';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Invoice Details | PredCare Doctor Portal',
};

type RouteProps = {
  params: Promise<{ id: string }>;
};

async function InvoiceDetailsContent({ params }: RouteProps) {
  const { id } = await params;
  const decodedId = decodeUrlParam(id) || 'INV-2627-01';

  return <InvoiceDetailsPage invoiceId={decodedId} />;
}

export default function InvoiceDetailsRoute({ params }: RouteProps) {
  return (
    <Suspense fallback={null}>
      <InvoiceDetailsContent params={params} />
    </Suspense>
  );
}
