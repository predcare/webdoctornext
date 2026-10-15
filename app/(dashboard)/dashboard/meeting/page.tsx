import MeetingPage from '@/components/Modules/MeetingModule/MeetingPage';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Meeting | PredCare',
};

export default function MeetingRoute() {
  return (
    <Suspense fallback={null}>
      <MeetingPage />
    </Suspense>
  );
}
