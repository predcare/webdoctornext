'use client';

import AppointmentRow from '@/components/Modules/AppointmentsModule/AppointmentRow';
import {
    todayAppointmentsHeadList,
    todayAppointmentsQueryParams,
} from '@/components/Modules/DahsboardModule/constants/dashboard.constants';
import TodayAppointmentsHeader from '@/components/Modules/DahsboardModule/TodayAppointments/TodayAppointmentsHeader';
import { queryClient } from '@/components/Providers/ReactQueryProvider';
import CustomActionMenu from '@/components/ui/CustomActionMenu/CustomActionMenu';
import CustomTable from '@/components/ui/CustomTable/CustomTable';
import { useJoinVideoCall } from '@/hooks/commons/meeting/useJoinVideoCall';
import { useActionMenu } from '@/hooks/commons/useActionMenu';
import { useChangeAppointmentStatus } from '@/hooks/react-query/appointments/appointments.hooks';
import { useHomeUpcomingAppts } from '@/hooks/react-query/home/home.hooks';
import {
    DoctorStatsQueryKeys,
    HomeApiQuery,
    MyAppointmentsQueryKeys,
} from '@/hooks/react-query/query.keys';
import {
    _toTitleCase,
    formatDate,
    formatTimeSlot,
    getAge,
} from '@/lib/commons/common.utils';
import { showErrorToast, showSuccessToast } from '@/lib/commons/toast';
import { projectRoutes } from '@/routes';
import { AppointmentListWrapper } from '@/styles/CustomStyled/AppointmentListWrapper';
import { IMyAppointmentDoc } from '@/typescripts/interfaces/appointments.interfaces';
import { useAlertStore } from '@/zustand/stores/useAlertStore';
import { useLoadingStore } from '@/zustand/stores/useLoadingStore';
import { useMeetingStore } from '@/zustand/stores/useMeetingStore';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import EventRepeatOutlinedIcon from '@mui/icons-material/EventRepeatOutlined';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useRouter } from 'next/navigation';
import { memo, useCallback, useMemo } from 'react';

function TodayAppointmentsTable() {
    const router = useRouter();
    const actionMenu = useActionMenu();
    const { joinVideoCall } = useJoinVideoCall();
    const showConfirm = useAlertStore((state) => state.showConfirm);
    const { showLoader, hideLoader } = useLoadingStore((state) => state);
    const { setInPersonAppointment } = useMeetingStore((state) => state);

    const { data: upcomingAppts, isPending: upcomingApptsPending } =
        useHomeUpcomingAppts(todayAppointmentsQueryParams);
    const { mutate: changeStatus } = useChangeAppointmentStatus();

    const activeAppointment = useMemo(() => {
        if (!actionMenu.activeId) return null;
        return (
            upcomingAppts?.data?.find(
                (item) => String(item.id) === String(actionMenu.activeId),
            ) ?? null
        );
    }, [actionMenu.activeId, upcomingAppts?.data]);

    const invalidateDashboardQueries = useCallback(async () => {
        await Promise.all([
            queryClient.invalidateQueries({
                queryKey: [HomeApiQuery.UPCOMING_APPOITMENTS],
            }),
            queryClient.invalidateQueries({
                queryKey: [DoctorStatsQueryKeys.DOCTOR_STATS],
            }),
            queryClient.invalidateQueries({
                queryKey: [MyAppointmentsQueryKeys.MyAppointments],
            }),
            queryClient.invalidateQueries({
                queryKey: [MyAppointmentsQueryKeys.MyAppointmentsStats],
            }),
        ]);
    }, []);

    const handleJoinCall = useCallback(
        (apptInfo: IMyAppointmentDoc) => {
            const patientId = apptInfo.patient_id || '';
            joinVideoCall({
                appointmentId: apptInfo.id,
                patientId,
                patientName: apptInfo.patientInfo?.name,
                appointmentGeneratedId: apptInfo.appointment_id,
            });
        },
        [joinVideoCall],
    );

    const handleStartConsultation = useCallback(
        (
            appointmentId: number | string,
            patientId: number | string,
            patientName: string,
            status: string,
        ) => {
            const normalizedStatus = status?.toLowerCase()?.trim();
            if (normalizedStatus === 'confirmed') {
                showLoader('Starting consultation...');
                changeStatus(
                    { appointmentId, status: 'in_progress' },
                    {
                        onSuccess: async () => {
                            await invalidateDashboardQueries();
                            hideLoader();
                            setInPersonAppointment({
                                apptIdforInPerson: String(appointmentId),
                                patientIdforInPerson: String(patientId),
                                patientNameforInPerson: String(patientName),
                                statusforInPerson: 'in_progress',
                            });
                            router.push(
                                projectRoutes.managePrescription({
                                    patientId: String(patientId),
                                }),
                            );
                        },
                        onError: () => {
                            hideLoader();
                            showErrorToast('Failed to start consultation');
                        },
                    },
                );
            } else {
                setInPersonAppointment({
                    apptIdforInPerson: String(appointmentId),
                    patientIdforInPerson: String(patientId),
                    patientNameforInPerson: String(patientName),
                    statusforInPerson: String(status),
                });
                router.push(
                    projectRoutes.managePrescription({
                        patientId: String(patientId),
                    }),
                );
            }
        },
        [
            changeStatus,
            hideLoader,
            invalidateDashboardQueries,
            router,
            setInPersonAppointment,
            showLoader,
        ],
    );

    const handleMarkCompleted = useCallback(
        (appointmentId: number | string) => {
            showConfirm({
                title: 'Complete Appointment',
                message: 'Are you sure you want to mark this appointment as completed?',
                buttonText: 'Yes, Complete',
                cancelText: 'Cancel',
                onConfirm: () => {
                    showLoader('Marking appointment as completed...');
                    changeStatus(
                        {
                            appointmentId,
                            status: 'completed',
                            call_end_reason: 'Call ended and Booking Completed by Doctor',
                        },
                        {
                            onSuccess: async (res) => {
                                hideLoader();
                                if (res?.success) {
                                    showSuccessToast(
                                        res?.message ||
                                        'Appointment marked as completed successfully',
                                    );
                                    await invalidateDashboardQueries();
                                }
                            },
                            onError: () => {
                                hideLoader();
                                showErrorToast('Failed to mark appointment as completed');
                            },
                        },
                    );
                },
            });
        },
        [
            changeStatus,
            hideLoader,
            invalidateDashboardQueries,
            showConfirm,
            showLoader,
        ],
    );

    const handleCancelAppointment = useCallback(
        (appointmentId: number | string) => {
            showConfirm({
                title: 'Cancel Appointment',
                message: 'Are you sure you want to cancel this appointment?',
                buttonText: 'Yes, Cancel',
                cancelText: 'Cancel',
                onConfirm: () => {
                    showLoader('Cancelling appointment...');
                    changeStatus(
                        {
                            appointmentId: String(appointmentId),
                            status: 'cancelled',
                            call_end_reason: 'Cancelled by doctor',
                        },
                        {
                            onSuccess: async (res) => {
                                hideLoader();
                                if (res?.success) {
                                    showSuccessToast(
                                        res?.message || 'Appointment cancelled successfully',
                                    );
                                    await invalidateDashboardQueries();
                                }
                            },
                            onError: () => {
                                hideLoader();
                                showErrorToast('Failed to cancel appointment');
                            },
                        },
                    );
                },
            });
        },
        [
            changeStatus,
            hideLoader,
            invalidateDashboardQueries,
            showConfirm,
            showLoader,
        ],
    );

    const handleReschedule = useCallback(
        (item: IMyAppointmentDoc) => {
            const patientId = item.patientInfo?.patientId || item.patient_id;
            const params = new URLSearchParams();
            if (patientId) params.set('patientId', String(patientId));
            if (item.id) params.set('rescheduleId', String(item.id));
            router.push(`${projectRoutes.bookAppointment}?${params.toString()}`);
        },
        [router],
    );

    return (
        <AppointmentListWrapper>
            <CustomTable
                className="appointment-table"
                headList={todayAppointmentsHeadList}
                customHeader={<TodayAppointmentsHeader />}
                isLoading={upcomingApptsPending}
                skeletonRows={2}
                isEmpty={!upcomingApptsPending && upcomingAppts?.data?.length === 0}
                emptyText="No appointments for today"
            >
                {upcomingAppts?.data?.map((apptInfo) => (
                    <AppointmentRow
                        key={apptInfo.id}
                        onOpenMenu={(anchor) =>
                            actionMenu.open(
                                anchor,
                                String(apptInfo.id),
                                apptInfo.appointment_status,
                            )
                        }
                        patientName={apptInfo.patientInfo?.name || ''}
                        patientImage={apptInfo.patientInfo?.profileImage || ''}
                        patientCode={apptInfo.patientInfo?.displayPatientId || ''}
                        gender={_toTitleCase(apptInfo.patientInfo?.gender || '')}
                        age={getAge(apptInfo.patientInfo?.dateOfBirth || '')}
                        appointmentId={apptInfo.appointment_id}
                        appointmentDate={formatDate(apptInfo.appointment_date)}
                        appointmentTime={formatTimeSlot(
                            apptInfo.start_time,
                            apptInfo.end_time,
                        )}
                        appointmentStatus={apptInfo.appointment_status}
                        appointmentType={apptInfo.consultation_type}
                        onJoinCall={() => handleJoinCall(apptInfo)}
                        onStartConsultation={() =>
                            handleStartConsultation(
                                apptInfo.id,
                                apptInfo.patientInfo?.patientId || apptInfo.patient_id || '',
                                apptInfo.patientInfo?.name || '',
                                apptInfo.appointment_status,
                            )
                        }
                    />
                ))}
            </CustomTable>

            <CustomActionMenu
                anchorEl={actionMenu.anchorEl}
                onClose={actionMenu.close}
                items={[
                    {
                        key: 'view',
                        label: 'View Details',
                        icon: <VisibilityOutlinedIcon />,
                        href: actionMenu.activeId
                            ? projectRoutes.appointmentDetails(actionMenu.activeId)
                            : undefined,
                        hidden: !actionMenu.activeId,
                        showChevron: true,
                    },
                    {
                        key: 'start-consultation',
                        label: ['in_progress', 'in-progress'].includes(
                            actionMenu.activeStatus?.toLowerCase() || '',
                        )
                            ? 'Continue Consultation'
                            : 'Start Consultation',
                        icon: <MedicalServicesOutlinedIcon />,
                        hidden:
                            !actionMenu.activeId ||
                            !activeAppointment ||
                            activeAppointment.consultation_type?.toLowerCase() === 'video' ||
                            !['confirmed', 'in_progress', 'in-progress'].includes(
                                actionMenu.activeStatus?.toLowerCase() || '',
                            ),
                        onClick: () => {
                            if (activeAppointment) {
                                handleStartConsultation(
                                    activeAppointment.id,
                                    activeAppointment.patientInfo?.patientId ||
                                    activeAppointment.patient_id ||
                                    '',
                                    activeAppointment.patientInfo?.name || '',
                                    activeAppointment.appointment_status,
                                );
                            }
                        },
                    },
                    {
                        key: 'complete',
                        label: 'Mark as Completed',
                        icon: <CheckCircleOutlinedIcon />,
                        hidden:
                            !actionMenu.activeId ||
                            !['confirmed', 'in_progress', 'in-progress'].includes(
                                actionMenu.activeStatus?.toLowerCase() || '',
                            ),
                        onClick: () => {
                            if (actionMenu.activeId) {
                                handleMarkCompleted(actionMenu.activeId);
                            }
                        },
                    },
                    {
                        key: 'reschedule',
                        label: 'Reschedule',
                        icon: <EventRepeatOutlinedIcon />,
                        hidden:
                            !actionMenu.activeId ||
                            actionMenu.activeStatus?.toLowerCase() !== 'confirmed',
                        onClick: () => {
                            if (activeAppointment) {
                                handleReschedule(activeAppointment);
                            }
                        },
                    },
                    {
                        key: 'cancel',
                        label: 'Cancel Appointment',
                        icon: <CancelOutlinedIcon />,
                        tone: 'danger',
                        dividerBefore: true,
                        hidden:
                            !actionMenu.activeId ||
                            !['confirmed', 'in_progress', 'in-progress'].includes(
                                actionMenu.activeStatus?.toLowerCase() || '',
                            ),
                        onClick: () => {
                            if (actionMenu.activeId) {
                                handleCancelAppointment(actionMenu.activeId);
                            }
                        },
                    },
                ]}
            />
        </AppointmentListWrapper>
    );
}

export default memo(TodayAppointmentsTable);
