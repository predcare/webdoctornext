import AvailabilityListPage from '@/components/Modules/AvailabilityModule/AvailabilityListPage';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Availability | PredCare',
};

export default function AvailabilityPage() {
  return (
    <Suspense fallback={null}>
      <AvailabilityListPage />
    </Suspense>
  );
}
