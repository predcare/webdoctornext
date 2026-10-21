'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const MeetingPage = dynamic(() => import('./MeetingPage'), {
  ssr: false,
});

type MeetingPageClientProps = {
  patientId: string;
  appointmentId: string;
};

export default function MeetingPageClient({
  patientId,
  appointmentId,
}: MeetingPageClientProps) {
  return (
    <Suspense fallback={null}>
      <MeetingPage patientId={patientId} appointmentId={appointmentId} />
    </Suspense>
  );
}
