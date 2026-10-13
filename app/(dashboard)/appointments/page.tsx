import AppointmentListPage from '@/components/Modules/AppointmentsModule/AppointmentListPage';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Appointments | PredCare',
};

export default function AppointmentsPage() {
  return (
    <Suspense fallback={null}>
      <AppointmentListPage />
    </Suspense>
  );
}
