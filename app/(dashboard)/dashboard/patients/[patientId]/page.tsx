import DashboardInvalidParamView from '@/components/Modules/NotFoundModule/DashboardInvalidParamView';
import PatientDetailsPage from '@/components/Modules/PatientsModule/PatientDetails/PatientDetailsPage';
import { decodeUrlParam } from '@/lib/functions/_urlParams.lib';
import { projectRoutes } from '@/routes';
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
    const decodedId = decodeUrlParam(patientId);
    if (!decodedId) {
        return (
            <DashboardInvalidParamView
                title="Invalid Patient ID"
                message="Please provide a valid patient ID."
                seconds={5}
                fallbackHref={projectRoutes.patients}
            />
        );
    }

    return <PatientDetailsPage patientId={decodedId} />;
}

export default function PatientDetailsRoute({ params }: RouteProps) {
    return (
        <Suspense fallback={null}>
            <PatientDetailsContent params={params} />
        </Suspense>
    );
}
