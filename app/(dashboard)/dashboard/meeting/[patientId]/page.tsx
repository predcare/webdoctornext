import MeetingPageClient from '@/components/Modules/MeetingModule/MeetingPageClient';
import DashboardInvalidParamView from '@/components/Modules/NotFoundModule/DashboardInvalidParamView';
import { decodeUrlParam } from '@/lib/functions/_urlParams.lib';
import { projectRoutes } from '@/routes';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Meeting | PredCare',
};

type RouteProps = {
  params: Promise<{ patientId: string }>;
  searchParams: Promise<{ appointmentId?: string }>;
};

async function MeetingContent({ params, searchParams }: RouteProps) {
  const { patientId } = await params;
  const { appointmentId } = await searchParams;
  const decodedPatientId = decodeUrlParam(patientId);
  const decodedAppointmentId = decodeUrlParam(appointmentId);

  if (!decodedPatientId || !decodedAppointmentId) {
    return (
      <DashboardInvalidParamView
        title="Invalid Meeting Link"
        message="Please open this consultation from the appointments list."
        seconds={5}
        fallbackHref={projectRoutes.appointments}
      />
    );
  }

  return (
    <MeetingPageClient
      patientId={decodedPatientId}
      appointmentId={decodedAppointmentId}
    />
  );
}

export default function MeetingRoute({ params, searchParams }: RouteProps) {
  return (
    <Suspense fallback={null}>
      <MeetingContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}
