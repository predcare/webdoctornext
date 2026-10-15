import BookAppointmentPage from '@/components/Modules/AppointmentsModule/BookAppointment/BookAppointmentPage';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Book Appointment | PredCare',
};

type RouteProps = {
  searchParams: Promise<{ patientId?: string }>;
};

async function BookAppointmentContent({ searchParams }: RouteProps) {
  const { patientId } = await searchParams;

  return <BookAppointmentPage patientId={patientId} />;
}

export default function BookAppointmentRoute({ searchParams }: RouteProps) {
  return (
    <Suspense fallback={null}>
      <BookAppointmentContent searchParams={searchParams} />
    </Suspense>
  );
}
