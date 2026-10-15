import ManagePrescriptionPage from '@/components/Modules/PrescriptionsModule/ManagePrescription/ManagePrescriptionPage';
import { resolveConsultationTab } from '@/components/Modules/PrescriptionsModule/ManagePrescription/constants';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Manage Prescription | PredCare',
};

type RouteProps = {
  searchParams: Promise<{ tab?: string }>;
};

async function ManagePrescriptionContent({ searchParams }: RouteProps) {
  const { tab } = await searchParams;
  return <ManagePrescriptionPage tab={resolveConsultationTab(tab)} />;
}

export default function ManagePrescriptionRoute({ searchParams }: RouteProps) {
  return (
    <Suspense fallback={null}>
      <ManagePrescriptionContent searchParams={searchParams} />
    </Suspense>
  );
}
