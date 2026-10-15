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
import CustomButton from '@/components/ui/CustomButton/CustomButton';
import CustomTable from '@/components/ui/CustomTable/CustomTable';
import { dashboardAppointments } from '@/resources/mock';
import { projectRoutes } from '@/routes';
import { AppointmentListWrapper } from '@/styles/CustomStyled/AppointmentListWrapper';
import { Menu, MenuItem } from '@mui/material';
import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';

const headList = [
  'Patient details',
  'Modality',
  'Schedule',
  'Specialist',
  'Status',
  'Actions',
];

const breadcrumbItems = [
  { label: 'Dashboard', href: projectRoutes.dashboard },
  { label: 'Appointment List' },
];

const addAppointmentAction = (
  <CustomButton
    className="page-action"
    text="+ Add Appointment"
    action={projectRoutes.bookAppointment()}
  />
);

export default function AppointmentListPage() {
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
        emptyDescription={
          filtersActive
            ? 'Change the filters or clear them to see appointments.'
            : undefined
        }
      >
        {appointments.map((row) => (
          <AppointmentRow key={row.id} row={row} onOpenMenu={handleOpenMenu} />
        ))}
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
