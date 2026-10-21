import DashboardInvalidParamView from '@/components/Modules/NotFoundModule/DashboardInvalidParamView';
import ManagePrescriptionPage from '@/components/Modules/PrescriptionsModule/ManagePrescription/ManagePrescriptionPage';
import { resolveConsultationTab } from '@/components/Modules/PrescriptionsModule/ManagePrescription/constants';
import { decodeUrlParam } from '@/lib/functions/_urlParams.lib';
import { projectRoutes } from '@/routes';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Manage Prescription | PredCare',
};

type RouteProps = {
  searchParams: Promise<{
    tab?: string;
    patientId?: string;
    prescriptionId?: string;
  }>;
};

async function ManagePrescriptionContent({ searchParams }: RouteProps) {
  const { tab, patientId, prescriptionId } = await searchParams;
  const decodedPatientId = decodeUrlParam(patientId);
  const decodedPrescriptionId = decodeUrlParam(prescriptionId);

  if (!decodedPatientId)
    return (
      <DashboardInvalidParamView
        title="Invalid Patient ID"
        message="Please provide a valid patient ID."
        seconds={5}
        fallbackHref={projectRoutes.patients}
      />
    );

  return (
    <ManagePrescriptionPage
      tab={resolveConsultationTab(tab)}
      patientId={decodedPatientId}
      prescriptionId={decodedPrescriptionId ?? undefined}
    />
  );
}

export default function ManagePrescriptionRoute({ searchParams }: RouteProps) {
  return (
    <Suspense fallback={null}>
      <ManagePrescriptionContent searchParams={searchParams} />
    </Suspense>
  );
}
