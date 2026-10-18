import ManageAvailabilityPage from '@/components/Modules/AvailabilityModule/ManageAvailability/ManageAvailabilityPage';
import DashboardInvalidParamView from '@/components/Modules/NotFoundModule/DashboardInvalidParamView';
import { decodeUrlParam } from '@/lib/functions/_urlParams.lib';
import { projectRoutes } from '@/routes';
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
  const id = decodeUrlParam(availabilityId);

  if (availabilityId && !id) {
    return <DashboardInvalidParamView fallbackHref={projectRoutes.availability} seconds={5} />;
  }

  return <ManageAvailabilityPage availabilityId={id ?? undefined} />;
}

export default function ManageAvailabilityRoute({ searchParams }: RouteProps) {
  return (
    <Suspense fallback={null}>
      <ManageAvailabilityContent searchParams={searchParams} />
    </Suspense>
  );
}
