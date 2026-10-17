'use client';

import PageBreadcrumb from '@/components/commons/PageBreadcrumb/PageBreadcrumb';
import AppointmentFilters, {
  defaultAppointmentFilters,
  filterAppointments,
  hasActiveAppointmentFilters,
  type AppointmentFilterState,
} from '@/components/Modules/AppointmentsModule/AppointmentFilters';
import AppointmentRow from '@/components/Modules/AppointmentsModule/AppointmentRow';
import AppointmentSummaryCards from '@/components/Modules/AppointmentsModule/AppointmentSummaryCards';
import CustomTable from '@/components/ui/CustomTable/CustomTable';
import { useMyAppointments } from '@/hooks/react-query/appointments/appointments.hooks';
import { _toTitleCase, formatDate, formatTimeSlot, getAge } from '@/lib/commons/common.utils';
import { dashboardAppointments } from '@/resources/mock';
import { projectRoutes } from '@/routes';
import { AppointmentListWrapper } from '@/styles/CustomStyled/AppointmentListWrapper';
import { Button, Menu, MenuItem } from '@mui/material';
import Link from 'next/link';
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
  const [actionAnchor, setActionAnchor] = useState<HTMLElement | null>(null);
  const [actionRowId, setActionRowId] = useState<string | null>(null);
  const [filters, setFilters] = useState<AppointmentFilterState>(
    defaultAppointmentFilters,
  );
  const appointments = useMemo(
    () => filterAppointments(dashboardAppointments, filters),
    [filters],
  );
  const filtersActive = useMemo(
    () => hasActiveAppointmentFilters(filters),
    [filters],
  );
  const handleFilterChange = useCallback(
    (patch: Partial<AppointmentFilterState>) => {
      setFilters((current) => ({ ...current, ...patch }));
    },
    [],
  );
  const handleClearFilters = useCallback(() => {
    setFilters(defaultAppointmentFilters);
  }, []);
  const handleOpenMenu = useCallback((anchor: HTMLElement, id: string) => {
    setActionAnchor(anchor);
    setActionRowId(id);
  }, []);

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
    error: appointmentsError,
  } = useMyAppointments({
    page: 1,
    limit: 10,
    search: '',
  });

  console.log('appointmentList', appointmentList)

  return (
    <AppointmentListWrapper>
      <PageBreadcrumb items={breadcrumbItems} action={addAppointmentAction} />
      <AppointmentSummaryCards appointments={dashboardAppointments} />
      <AppointmentFilters
        filters={filters}
        onChange={handleFilterChange}
        onClear={handleClearFilters}
      />

      <CustomTable
        className="appointment-table"
        headList={headList}
        page={1}
        totalPages={1}
        isEmpty={appointments.length === 0}
        emptyText="No appointments found"
        isLoading={isLoadingAppointments}
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
              onOpenMenu={(anchor) => handleOpenMenu(anchor, String(apptInfo.id))}
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
            />
          )
        })}
      </CustomTable>

      <Menu
        anchorEl={actionAnchor}
        open={Boolean(actionAnchor)}
        onClose={() => setActionAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {actionRowId ? (
          <MenuItem
            component={Link}
            href={projectRoutes.appointmentDetails(actionRowId)}
            onClick={() => setActionAnchor(null)}
          >
            View
          </MenuItem>
        ) : null}
      </Menu>
    </AppointmentListWrapper>
  );
}
