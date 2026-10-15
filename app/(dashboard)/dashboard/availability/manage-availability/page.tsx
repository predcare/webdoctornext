import ManageAvailabilityPage from '@/components/Modules/AvailabilityModule/ManageAvailability/ManageAvailabilityPage';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Add Availability | PredCare',
};

export default function ManageAvailabilityRoute() {
  return (
    <Suspense fallback={null}>
      <ManageAvailabilityPage />
    </Suspense>
  );
}
