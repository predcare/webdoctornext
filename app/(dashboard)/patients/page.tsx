import PatientListPage from '@/components/Modules/PatientsModule/PatientListPage';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Patients | PredCare',
};

export default function PatientsPage() {
  return (
    <Suspense fallback={null}>
      <PatientListPage />
    </Suspense>
  );
}
