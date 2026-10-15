import AddPatientPage from '@/components/Modules/PatientsModule/AddPatient/AddPatientPage';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Add Patient | PredCare',
};

export default function AddPatientRoute() {
  return (
    <Suspense fallback={null}>
      <AddPatientPage />
    </Suspense>
  );
}
