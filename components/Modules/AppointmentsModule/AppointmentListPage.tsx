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
import CustomActionMenu from '@/components/ui/CustomActionMenu/CustomActionMenu';
import CustomTable from '@/components/ui/CustomTable/CustomTable';
import { useActionMenu } from '@/hooks/commons/useActionMenu';
import { useDebounce } from '@/hooks/commons/useDebounce';
import { useMyAppointments } from '@/hooks/react-query/appointments/appointments.hooks';
import {
  _toTitleCase,
  formatDate,
  formatTimeSlot,
  getAge,
} from '@/lib/commons/common.utils';
import { showInDevelopment } from '@/lib/commons/toast';
import { projectRoutes } from '@/routes';
import { AppointmentListWrapper } from '@/styles/CustomStyled/AppointmentListWrapper';
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
  const router = useRouter();
  const actionMenu = useActionMenu();
  const [filterStates, setFilterStates] = useState<FilterStates>(
    defaultAppointmentFilterStates,
  );
  const [page, setPage] = useState(1);
  const debounceSearch = useDebounce(filterStates.search.trim(), 500);

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

  const queryParams = useMemo(
    () => buildAppointmentQueryParams(filterStates, debounceSearch, page),
    [filterStates, debounceSearch, page],
  );

  const filtersActive = useMemo(
    () => hasActiveAppointmentFilters(filterStates),
    [filterStates],
  );

  const addAppointmentAction = (
    <Button
      className="page-action"
      type="button"
      variant="contained"
      onClick={() => router.push(projectRoutes.bookAppointment())}
    >
      + Add Appointment
    </Button>
  );

  const {
    data: appointmentList,
    isPending: isLoadingAppointments,
  } = useMyAppointments(queryParams);

  return (
    <AppointmentListWrapper>
      <PageBreadcrumb items={breadcrumbItems} action={addAppointmentAction} />
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
                actionMenu.open(anchor, String(apptInfo.id))
              }
              patientName={apptInfo.patientInfo?.name || ''}
              patientImage={apptInfo.patientInfo?.profileImage || ''}
              patientCode={apptInfo.patientInfo?.displayPatientId || ''}
              gender={_toTitleCase(apptInfo.patientInfo?.gender || '')}
              age={getAge(apptInfo.patientInfo?.dateOfBirth || '')}
              appointmentId={apptInfo.appointment_id}
              appointmentDate={formatDate(apptInfo.appointment_date)}
              appointmentTime={formatTimeSlot(apptInfo.start_time, apptInfo.end_time)}
              appointmentStatus={apptInfo.appointment_status}
              appointmentType={apptInfo.consultation_type}
              onJoinCall={() => showInDevelopment()}
            />
          )
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
        ]}
      />
    </AppointmentListWrapper>
  );
}
