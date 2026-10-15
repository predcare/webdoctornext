'use client';

import PageBreadcrumb from '@/components/commons/PageBreadcrumb/PageBreadcrumb';
import AvailabilityRow from '@/components/Modules/AvailabilityModule/AvailabilityRow';
import AvailabilityToolbar, {
  AvailabilityActiveFilters,
} from '@/components/Modules/AvailabilityModule/AvailabilityToolbar';
import {
  defaultAvailabilityFilters,
  filterAvailability,
  hasActiveAvailabilityFilters,
  type AvailabilityFilterState,
} from '@/components/Modules/AvailabilityModule/availabilityFilters';
import CustomTable from '@/components/ui/CustomTable/CustomTable';
import { availabilitySlots } from '@/resources/mock';
import { projectRoutes } from '@/routes';
import { AvailabilityListWrapper } from '@/styles/CustomStyled/AvailabilityListWrapper';
import { Menu, MenuItem } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';

const headList = ['Date Mode', 'Dates/Days', 'Time Slot', 'Duration', 'Consultation Type & Fee', ''];

const breadcrumbItems = [
  { label: 'Dashboard', href: projectRoutes.dashboard },
  { label: 'Availability List' },
];

export default function AvailabilityListPage() {
  const [rows, setRows] = useState(availabilitySlots);
  const [filters, setFilters] = useState<AvailabilityFilterState>(defaultAvailabilityFilters);
  const [actionAnchor, setActionAnchor] = useState<HTMLElement | null>(null);
  const [actionRowId, setActionRowId] = useState<string | null>(null);

  const visibleRows = useMemo(() => filterAvailability(rows, filters), [rows, filters]);
  const filtersActive = useMemo(() => hasActiveAvailabilityFilters(filters), [filters]);

  const handleFilterChange = useCallback((patch: Partial<AvailabilityFilterState>) => {
    setFilters((current) => ({ ...current, ...patch }));
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters((current) => ({
      ...defaultAvailabilityFilters,
      doctorId: current.doctorId,
    }));
  }, []);

  const handleOpenMenu = useCallback((anchor: HTMLElement, id: string) => {
    setActionAnchor(anchor);
    setActionRowId(id);
  }, []);

  const handleDelete = () => {
    if (actionRowId) {
      setRows((current) => current.filter((row) => row.id !== actionRowId));
    }
    setActionAnchor(null);
    setActionRowId(null);
  };

  return (
    <AvailabilityListWrapper>
      <PageBreadcrumb
        items={breadcrumbItems}
        action={
          <AvailabilityToolbar filters={filters} onChange={handleFilterChange} onClear={handleClearFilters} />
        }
      />
      {filtersActive ? (
        <AvailabilityActiveFilters filters={filters} onChange={handleFilterChange} onClear={handleClearFilters} />
      ) : null}

      <CustomTable
        className="availability-table"
        headList={headList}
        page={1}
        totalPages={1}
        zebraStriping={false}
        isEmpty={visibleRows.length === 0}
        emptyText="No availability found"
        emptyDescription={
          filtersActive ? 'Change the filters or clear them to see availability.' : undefined
        }
      >
        {visibleRows.map((row) => (
          <AvailabilityRow key={row.id} row={row} onOpenMenu={handleOpenMenu} />
        ))}
      </CustomTable>

      <Menu
        anchorEl={actionAnchor}
        open={Boolean(actionAnchor)}
        onClose={() => setActionAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </AvailabilityListWrapper>
  );
}
