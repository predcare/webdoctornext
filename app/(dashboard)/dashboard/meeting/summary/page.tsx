import MeetingCallSummary from '@/components/Modules/MeetingModule/MeetingCallSummary';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Consultation Summary | PredCare',
};

export default function MeetingSummaryRoute() {
  return (
    <Suspense fallback={null}>
      <MeetingCallSummary />
    </Suspense>
  );
}
