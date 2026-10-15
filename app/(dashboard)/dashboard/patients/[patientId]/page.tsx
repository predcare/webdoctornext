import PatientDetailsPage from '@/components/Modules/PatientsModule/PatientDetails/PatientDetailsPage';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: 'Patient Details | PredCare',
};

type RouteProps = {
    params: Promise<{ patientId: string }>;
};

async function PatientDetailsContent({ params }: RouteProps) {
    const { patientId } = await params;

    return <PatientDetailsPage patientId={patientId} />;
}

export default function PatientDetailsRoute({ params }: RouteProps) {
    return (
        <Suspense fallback={null}>
            <PatientDetailsContent params={params} />
        </Suspense>
    );
}
