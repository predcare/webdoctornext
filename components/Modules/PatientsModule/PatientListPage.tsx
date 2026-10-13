'use client';

import PageBreadcrumb from '@/components/commons/PageBreadcrumb/PageBreadcrumb';
import PatientListToolbar from '@/components/Modules/PatientsModule/PatientListToolbar';
import PatientRow from '@/components/Modules/PatientsModule/PatientRow';
import {
  defaultPatientFilters,
  filterPatients,
  hasActivePatientFilters,
  type PatientFilterState,
} from '@/components/Modules/PatientsModule/patientFilters';
import CustomTable from '@/components/ui/CustomTable/CustomTable';
import { patients } from '@/resources/mock';
import { projectRoutes } from '@/routes';
import { Menu, MenuItem } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import { PatientListWrapper } from '@/styles/CustomStyled/PatientListWrapper';

const PAGE_SIZE = 8;

const headList = ['Patient', 'Phone / Email', 'City', 'Last Visit', 'User Status', 'Clinic Status', ''];

const breadcrumbItems = [
  { label: 'Dashboard', href: projectRoutes.dashboard },
  { label: 'Patients List' },
];

export default function PatientListPage() {
  const [filters, setFilters] = useState<PatientFilterState>(defaultPatientFilters);
  const [page, setPage] = useState(1);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  const rows = useMemo(() => filterPatients(patients, filters), [filters]);
  const totalPages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageRows = useMemo(
    () => rows.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [rows, currentPage],
  );

  const handleFilterChange = useCallback((patch: Partial<PatientFilterState>) => {
    setFilters((current) => ({ ...current, ...patch }));
    setPage(1);
  }, []);
  const handleClear = useCallback(() => {
    setFilters(defaultPatientFilters);
    setPage(1);
  }, []);
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
          <PatientListToolbar filters={filters} onChange={handleFilterChange} onClear={handleClear} />
        }
        page={currentPage}
        totalPages={totalPages}
        onPageChange={setPage}
        zebraStriping={false}
        isEmpty={rows.length === 0}
        emptyText="No patients found"
        emptyDescription={
          hasActivePatientFilters(filters) ? 'Change the search or filters to see patients.' : undefined
        }
      >
        {pageRows.map((row) => (
          <PatientRow key={row.id} row={row} onOpenMenu={handleOpenMenu} />
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
