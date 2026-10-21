'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const MeetingPage = dynamic(() => import('./MeetingPage'), {
  ssr: false,
});

export default function MeetingPageClient() {
  return (
    <Suspense fallback={null}>
      <MeetingPage />
    </Suspense>
  );
}
