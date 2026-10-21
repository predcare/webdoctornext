import MeetingPageClient from '@/components/Modules/MeetingModule/MeetingPageClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Meeting | PredCare',
};

export default function MeetingRoute() {
  return <MeetingPageClient />;
}
