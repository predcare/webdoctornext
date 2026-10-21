'use client';

import PageBreadcrumb from '@/components/commons/PageBreadcrumb/PageBreadcrumb';
import AppointmentFilters from '@/components/Modules/AppointmentsModule/AppointmentFilters';
import {
  buildAppointmentQueryParams,
  defaultAppointmentFilterStates,
  hasActiveAppointmentFilters,
  type FilterStates,
} from '@/components/Modules/AppointmentsModule/appointmentFilterStates';
import AppointmentRow from '@/components/Modules/AppointmentsModule/AppointmentRow';
import AppointmentSummaryCards from '@/components/Modules/AppointmentsModule/AppointmentSummaryCards';
import { queryClient } from '@/components/Providers/ReactQueryProvider';
import CustomActionMenu from '@/components/ui/CustomActionMenu/CustomActionMenu';
import CustomTable from '@/components/ui/CustomTable/CustomTable';
import { useJoinVideoCall } from '@/hooks/commons/meeting/useJoinVideoCall';
import { useActionMenu } from '@/hooks/commons/useActionMenu';
import { useDebounce } from '@/hooks/commons/useDebounce';
import {
  useChangeAppointmentStatus,
  useMyAppointments,
} from '@/hooks/react-query/appointments/appointments.hooks';
import { MyAppointmentsQueryKeys } from '@/hooks/react-query/query.keys';
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
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';

const headList = [
  'Patient details',
  'Consult Type',
  'Appointment ID',
  'Date',
  'Time',
  'Status',
  'Actions',
];

const breadcrumbItems = [
  { label: 'Dashboard', href: projectRoutes.dashboard },
  { label: 'Appointment List' },
];

export default function AppointmentListPage() {
  const [filterStates, setFilterStates] = useState<FilterStates>(
    defaultAppointmentFilterStates,
  );
  const [page, setPage] = useState(1);

  const router = useRouter();
  const actionMenu = useActionMenu();
  const debounceSearch = useDebounce(filterStates.search.trim(), 500);
  const { joinVideoCall } = useJoinVideoCall();
  const showConfirm = useAlertStore((state) => state.showConfirm);
  const { showLoader, hideLoader } = useLoadingStore((state) => state);
  const { setInPersonAppointment } = useMeetingStore((state) => state);

  const queryParams = useMemo(
    () => buildAppointmentQueryParams(filterStates, debounceSearch, page),
    [filterStates, debounceSearch, page],
  );

  const { data: appointmentList, isPending: isLoadingAppointments } =
    useMyAppointments(queryParams);
  const { mutate: changeStatus } = useChangeAppointmentStatus();

  const filtersActive = useMemo(
    () => hasActiveAppointmentFilters(filterStates),
    [filterStates],
  );

  const activeAppointment = useMemo(() => {
    if (!actionMenu.activeId) return null;
    return (
      appointmentList?.data?.find(
        (item) => String(item.id) === String(actionMenu.activeId),
      ) ?? null
    );
  }, [actionMenu.activeId, appointmentList?.data]);

  const updateFilterState = useCallback((updates: Partial<FilterStates>) => {
    setFilterStates((prev) => ({
      ...prev,
      ...updates,
    }));
    setPage(1);
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilterStates(defaultAppointmentFilterStates);
    setPage(1);
  }, []);

  const handleJoinCall = useCallback(
    (apptInfo: IMyAppointmentDoc) => {
      const patientId =
        apptInfo.patient_id || apptInfo.patientInfo?.patientId || '';
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
      const isConfirmed = normalizedStatus === 'confirmed';

      showConfirm({
        title: isConfirmed ? 'Start Consultation' : 'Continue Consultation',
        message: isConfirmed
          ? 'Are you sure you want to start this consultation?'
          : 'Do you want to continue this consultation?',
        buttonText: isConfirmed ? 'Yes, Start' : 'Yes, Continue',
        cancelText: 'Cancel',
        onConfirm: () => {
          if (isConfirmed) {
            showLoader('Starting consultation...');

            changeStatus(
              { appointmentId, status: 'in_progress' },
              {
                onSuccess: async () => {
                  try {
                    await queryClient.invalidateQueries({
                      queryKey: [MyAppointmentsQueryKeys.MyAppointments],
                    });

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
                  } finally {
                    hideLoader();
                  }
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
      });
    },
    [
      changeStatus,
      hideLoader,
      router,
      setInPersonAppointment,
      showConfirm,
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
                  await Promise.all([
                    queryClient.invalidateQueries({
                      queryKey: [MyAppointmentsQueryKeys.MyAppointments],
                    }),
                    queryClient.invalidateQueries({
                      queryKey: [MyAppointmentsQueryKeys.MyAppointmentsStats],
                    }),
                  ]);
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
    [changeStatus, hideLoader, showConfirm, showLoader],
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
                  await Promise.all([
                    queryClient.invalidateQueries({
                      queryKey: [MyAppointmentsQueryKeys.MyAppointments],
                    }),
                    queryClient.invalidateQueries({
                      queryKey: [MyAppointmentsQueryKeys.MyAppointmentsStats],
                    }),
                  ]);
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
    [changeStatus, hideLoader, showConfirm, showLoader],
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
      <PageBreadcrumb
        items={breadcrumbItems}
        action={
          <Button
            className="page-action"
            type="button"
            variant="contained"
            onClick={() => router.push(projectRoutes.bookAppointment)}
          >
            + Add Appointment
          </Button>
        }
      />
      <AppointmentSummaryCards />
      <AppointmentFilters
        filterStates={filterStates}
        updateFilterState={updateFilterState}
        onReset={handleResetFilters}
      />

      <CustomTable
        className="appointment-table"
        headList={headList}
        page={page}
        totalPages={appointmentList?.meta?.totalPages ?? 1}
        totalResults={appointmentList?.meta?.total ?? 0}
        onPageChange={setPage}
        isLoading={isLoadingAppointments}
        isEmpty={
          !isLoadingAppointments && (appointmentList?.data?.length ?? 0) === 0
        }
        emptyText="No appointments found"
        emptyDescription={
          filtersActive
            ? 'Change the filters or clear them to see appointments.'
            : undefined
        }
      >
        {appointmentList?.data?.map((apptInfo) => {
          return (
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
          );
        })}
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
