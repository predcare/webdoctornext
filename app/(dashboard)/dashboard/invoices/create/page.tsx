import CreateInvoicePage from '@/components/Modules/InvoicesModule/CreateInvoice/CreateInvoicePage';
import DashboardInvalidParamView from '@/components/Modules/NotFoundModule/DashboardInvalidParamView';
import { decodeUrlParam } from '@/lib/functions/_urlParams.lib';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Create Invoice | PredCare Doctor Portal',
};

type RouteProps = {
  searchParams: Promise<{ patientId?: string }>;
};

async function CreateInvoicePageContent({ searchParams }: RouteProps) {
  const { patientId } = await searchParams;
  const decodedPatientId = decodeUrlParam(patientId);
  if (patientId && !decodedPatientId) {
    return (
      <DashboardInvalidParamView
        fallbackHref=""
        message=""
        seconds={5}
        title=""
      />
    );
  }

  return <CreateInvoicePage patientId={decodedPatientId || ''} />;
}

export default function CreateInvoiceRoute({ searchParams }: RouteProps) {
  return (
    <Suspense fallback={null}>
      <CreateInvoicePageContent searchParams={searchParams} />
    </Suspense>
  );
}
