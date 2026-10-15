import AvailabilityCalendarPage from '@/components/Modules/AvailabilityModule/CalendarView/AvailabilityCalendarPage';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Calendar View | PredCare',
};

export default function AvailabilityCalendarRoute() {
  return (
    <Suspense fallback={null}>
      <AvailabilityCalendarPage />
    </Suspense>
  );
}
