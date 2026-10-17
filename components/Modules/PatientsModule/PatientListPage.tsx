'use client';

import PageBreadcrumb from '@/components/commons/PageBreadcrumb/PageBreadcrumb';
import {
  defaultPatientFilters,
  type PatientFilterState,
} from '@/components/Modules/PatientsModule/patientFilters';
import PatientListToolbar from '@/components/Modules/PatientsModule/PatientListToolbar';
import PatientRow from '@/components/Modules/PatientsModule/PatientRow';
import CustomTable from '@/components/ui/CustomTable/CustomTable';
import { useMyPatientList } from '@/hooks/react-query/patients/patients.hooks';
import { projectRoutes } from '@/routes';
import { PatientListWrapper } from '@/styles/CustomStyled/PatientListWrapper';
import { Menu, MenuItem } from '@mui/material';
import { useCallback, useState } from 'react';

const headList = [
  'Patient',
  'Phone / Email',
  'City',
  'Last Visit',
  'User Status',
  'Actions',
];

const breadcrumbItems = [
  { label: 'Dashboard', href: projectRoutes.dashboard },
  { label: 'Patients List' },
];

export default function PatientListPage() {
  const [filters, setFilters] = useState<PatientFilterState>(
    defaultPatientFilters,
  );
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    search: '',
  });

  const {
    data: myPatients,
    isPending: myPatientPending,
    isError: isPatientError,
  } = useMyPatientList({
    limit: pagination.limit,
    search: pagination.search,
    page: pagination.page,
  });

  const updatePagination = useCallback((patch: Partial<typeof pagination>) => {
    setPagination((current) => ({ ...current, ...patch }));
  }, []);

  const handleFilterChange = useCallback(
    (patch: Partial<PatientFilterState>) => {
      setFilters((current) => ({ ...current, ...patch }));
      if (patch.search !== undefined) {
        updatePagination({ search: patch.search, page: 1 });
      }
    },
    [updatePagination],
  );

  const handleClear = useCallback(() => {
    setFilters(defaultPatientFilters);
    updatePagination({ search: '', page: 1 });
  }, [updatePagination]);

  const handleOpenMenu = useCallback((anchor: HTMLElement) => {
    setMenuAnchor(anchor);
  }, []);

  const closeMenu = () => setMenuAnchor(null);

  return (
    <PatientListWrapper>
      <PageBreadcrumb items={breadcrumbItems} />
      <CustomTable
        className="patient-table"
        headList={headList}
        customHeader={
          <PatientListToolbar
            filters={filters}
            onChange={handleFilterChange}
            onClear={handleClear}
          />
        }
        page={pagination.page}
        totalPages={myPatients?.meta?.totalPages ?? 1}
        totalResults={myPatients?.meta?.total || 0}
        searchValue={pagination.search}
        onSearchChange={(value) => updatePagination({ search: value, page: 1 })}
        onPageChange={(nextPage) => updatePagination({ page: nextPage })}
        isLoading={myPatientPending}
        isEmpty={!myPatientPending && myPatients?.meta?.total === 0}
        emptyText={
          isPatientError ? 'Could not load patients' : 'No patients found'
        }
        emptyDescription={
          isPatientError
            ? 'Something went wrong while fetching the patient list. Please try again.'
            : pagination.search
              ? `No patients match "${pagination.search}". Try another search term.`
              : 'Your patient list is empty. Patients will appear here once they are added.'
        }
      >
        {myPatients?.data?.map((row) => (
          <PatientRow
            key={row.patient_id}
            name={row.name}
            patientCode={row.patient_id}
            phone={row.phone_number}
            email={row.email}
            city={row.city}
            lastVisit={row.last_appointment_date}
            userStatus={row.status}
            profileImage={row.profile_image}
            onOpenMenu={handleOpenMenu}
          />
        ))}
      </CustomTable>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={closeMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={closeMenu}>View</MenuItem>
        <MenuItem onClick={closeMenu}>Edit</MenuItem>
        <MenuItem onClick={closeMenu}>Deactivate</MenuItem>
      </Menu>
    </PatientListWrapper>
  );
}
