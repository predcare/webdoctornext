'use client';

import PageBreadcrumb from '@/components/commons/PageBreadcrumb/PageBreadcrumb';
import {
  defaultAvailabilityFilters,
  filterAvailability,
  hasActiveAvailabilityFilters,
  type AvailabilityFilterState,
} from '@/components/Modules/AvailabilityModule/availabilityFilters';
import AvailabilityRow from '@/components/Modules/AvailabilityModule/AvailabilityRow';
import AvailabilityToolbar, {
  AvailabilityActiveFilters,
} from '@/components/Modules/AvailabilityModule/AvailabilityToolbar';
import CustomActionMenu from '@/components/ui/CustomActionMenu/CustomActionMenu';
import CustomTable from '@/components/ui/CustomTable/CustomTable';
import { useActionMenu } from '@/hooks/commons/useActionMenu';
import { availabilitySlots } from '@/resources/mock/availability';
import { projectRoutes } from '@/routes';
import { AvailabilityListWrapper } from '@/styles/CustomStyled/AvailabilityListWrapper';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useCallback, useMemo, useState } from 'react';

const headList = [
  'Date Mode',
  'Dates/Days',
  'Time Slot',
  'Duration',
  'Consultation Type & Fee',
  '',
];

const breadcrumbItems = [
  { label: 'Dashboard', href: projectRoutes.dashboard },
  { label: 'Availability List' },
];

export default function AvailabilityListPage() {
  const [rows, setRows] = useState(availabilitySlots);
  const [filters, setFilters] = useState<AvailabilityFilterState>(
    defaultAvailabilityFilters,
  );
  const actionMenu = useActionMenu();

  const visibleRows = useMemo(
    () => filterAvailability(rows, filters),
    [rows, filters],
  );
  const filtersActive = useMemo(
    () => hasActiveAvailabilityFilters(filters),
    [filters],
  );

  const handleFilterChange = useCallback(
    (patch: Partial<AvailabilityFilterState>) => {
      setFilters((current) => ({ ...current, ...patch }));
    },
    [],
  );

  const handleClearFilters = useCallback(() => {
    setFilters((current) => ({
      ...defaultAvailabilityFilters,
      doctorId: current.doctorId,
    }));
  }, []);

  const handleDelete = () => {
    const rowId = actionMenu.activeId;
    if (rowId) {
      setRows((current) => current.filter((row) => row.id !== rowId));
    }
  };

  return (
    <AvailabilityListWrapper>
      <PageBreadcrumb
        items={breadcrumbItems}
        action={
          <AvailabilityToolbar
            filters={filters}
            onChange={handleFilterChange}
            onClear={handleClearFilters}
          />
        }
      />
      {filtersActive ? (
        <AvailabilityActiveFilters
          filters={filters}
          onChange={handleFilterChange}
          onClear={handleClearFilters}
        />
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
          filtersActive
            ? 'Change the filters or clear them to see availability.'
            : undefined
        }
      >
        {visibleRows.map((row) => (
          <AvailabilityRow key={row.id} row={row} onOpenMenu={actionMenu.open} />
        ))}
      </CustomTable>

      <CustomActionMenu
        anchorEl={actionMenu.anchorEl}
        onClose={actionMenu.close}
        items={[
          {
            key: 'delete',
            label: 'Delete',
            icon: <DeleteOutlineIcon />,
            tone: 'danger',
            onClick: handleDelete,
          },
        ]}
      />
    </AvailabilityListWrapper>
  );
}
