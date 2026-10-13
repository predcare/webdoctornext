import DashboardModulePage from '@/components/Modules/DahsboardModule/DashboardPage';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Dashboard | PredCare',
};

export default function DashboardPage() {
  return (
    <Suspense fallback={null}>
      <DashboardModulePage />
    </Suspense>
  );
}
