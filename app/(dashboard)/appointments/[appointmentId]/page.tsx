import AppointmentDetailsPage from '@/components/Modules/AppointmentsModule/AppointmentDetails/AppointmentDetailsPage';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Appointment Details | PredCare',
};

type RouteProps = {
  params: Promise<{ appointmentId: string }>;
};

async function AppointmentDetailsContent({ params }: RouteProps) {
  const { appointmentId } = await params;

  return <AppointmentDetailsPage appointmentId={appointmentId} />;
}

export default function AppointmentDetailsRoute({ params }: RouteProps) {
  return (
    <Suspense fallback={null}>
      <AppointmentDetailsContent params={params} />
    </Suspense>
  );
}
