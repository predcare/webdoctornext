import RescheduleAppointmentPage from '@/components/Modules/AppointmentsModule/RescheduleAppointments/RescheduledAppointmentPage';
import DashboardInvalidParamView from '@/components/Modules/NotFoundModule/DashboardInvalidParamView';
import { decodeUrlParam } from '@/lib/functions/_urlParams.lib';
import { projectRoutes } from '@/routes';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: 'Reschedule Appointment | PredCare',
};

type RouteProps = {
    searchParams: Promise<{ appointmentId: string }>;
    params: Promise<{ appointmentId: string }>;
};

async function RescheduleAppointmentContent({ params }: RouteProps) {
    const { appointmentId } = await params;
    const decodedAppointmentId = decodeUrlParam(appointmentId);

    if (!decodedAppointmentId) {
        return (
            <DashboardInvalidParamView
                title="Invalid Appointment Details"
                message="Invalid Appointment Details"
                fallbackHref={projectRoutes.appointments}
            />
        );
    }

    return (
        <RescheduleAppointmentPage appointmentId={decodedAppointmentId || ''} />
    );
}

export default function RescheduleAppointmentRoute({
    searchParams,
    params,
}: RouteProps) {
    return (
        <Suspense fallback={null}>
            <RescheduleAppointmentContent
                searchParams={searchParams}
                params={params}
            />
        </Suspense>
    );
}
