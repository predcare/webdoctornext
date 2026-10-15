import ProfilePage from '@/components/Modules/ProfileModule/ProfilePage';
import { resolveProfileTab } from '@/components/Modules/ProfileModule/profileTabs';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Doctor Profile | PredCare',
};

type RouteProps = {
  searchParams: Promise<{ tab?: string }>;
};

async function ProfileContent({ searchParams }: RouteProps) {
  const { tab } = await searchParams;
  return <ProfilePage tab={resolveProfileTab(tab)} />;
}

export default function ProfileRoute({ searchParams }: RouteProps) {
  return (
    <Suspense fallback={null}>
      <ProfileContent searchParams={searchParams} />
    </Suspense>
  );
}
