import DoctorLoginPage from '@/components/Modules/AuthModule/DoctorLoginPage';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Doctor Login | PredCare',
};

export default function DoctorLoginRoute() {
  return (
    <Suspense fallback={null}>
      <DoctorLoginPage />
    </Suspense>
  );
}
