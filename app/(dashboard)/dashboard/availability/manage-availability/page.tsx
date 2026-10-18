import ManageAvailabilityPage from '@/components/Modules/AvailabilityModule/ManageAvailability/ManageAvailabilityPage';
import type { Metadata } from 'next';
import { Suspense } from 'react';

type RouteProps = {
  searchParams: Promise<{ availabilityId?: string }>;
};

export async function generateMetadata({
  searchParams,
}: RouteProps): Promise<Metadata> {
  const { availabilityId } = await searchParams;
  return {
    title: availabilityId
      ? 'Edit Availability | PredCare'
      : 'Add Availability | PredCare',
  };
}

async function ManageAvailabilityContent({ searchParams }: RouteProps) {
  const { availabilityId } = await searchParams;

  return <ManageAvailabilityPage availabilityId={availabilityId} />;
}

export default function ManageAvailabilityRoute({ searchParams }: RouteProps) {
  return (
    <Suspense fallback={null}>
      <ManageAvailabilityContent searchParams={searchParams} />
    </Suspense>
  );
}
