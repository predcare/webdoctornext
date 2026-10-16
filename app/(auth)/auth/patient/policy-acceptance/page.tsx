import PolicyAcceptancePage from '@/components/Modules/AuthModule/PolicyAcceptancePage';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Policy Acceptance | PredCare',
};

export default function PatientPolicyAcceptanceRoute() {
  return (
    <Suspense fallback={null}>
      <PolicyAcceptancePage />
    </Suspense>
  );
}
