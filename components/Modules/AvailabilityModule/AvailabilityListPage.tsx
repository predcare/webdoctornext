'use client';

import PageBreadcrumb from '@/components/commons/PageBreadcrumb/PageBreadcrumb';
import {
  defaultAvailabilityFilters,
  hasActiveAvailabilityFilters,
  type AvailabilityFilterState,
} from '@/components/Modules/AvailabilityModule/availabilityFilters';
import AvailabilityRow from '@/components/Modules/AvailabilityModule/AvailabilityRow';
import AvailabilityToolbar, {
  AvailabilityActiveFilters,
} from '@/components/Modules/AvailabilityModule/AvailabilityToolbar';
import CustomActionMenu from '@/components/ui/CustomActionMenu/CustomActionMenu';
import CustomTable from '@/components/ui/CustomTable/CustomTable';
import EditIcon from '@/components/ui/Icons/EditIcon';
import { useActionMenu } from '@/hooks/commons/useActionMenu';
import {
  useAvailablityList,
  useDeleteAvailability,
} from '@/hooks/react-query/availability/availablity.hooks';
import { formatTimeSlot } from '@/lib/commons/common.utils';
import { showInDevelopment, showSuccessToast } from '@/lib/commons/toast';
import { projectRoutes } from '@/routes';
import { AvailabilityListWrapper } from '@/styles/CustomStyled/AvailabilityListWrapper';
import { AvailabilityMode } from '@/typescripts/enums';
import { useAlertStore } from '@/zustand/stores/useAlertStore';
import { useLoadingStore } from '@/zustand/stores/useLoadingStore';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useCallback, useMemo, useState } from 'react';

const headList = [
  'Date Mode',
  'Dates/Days',
  'Time Slot',
  'Duration',
  'Consultation Type & Fee',
  'Actions',
];

const breadcrumbItems = [
  { label: 'Dashboard', href: projectRoutes.dashboard },
  { label: 'Availability List' },
];

export default function AvailabilityListPage() {
  const [filters, setFilters] = useState<AvailabilityFilterState>(
    defaultAvailabilityFilters,
  );
  const actionMenu = useActionMenu();

  const {
    data: availablityList,
    isPending: isLoadingAvailablityList,
    refetch: avialRefetch,
  } = useAvailablityList();

  const { mutate: deleteAvailabilityMutation } = useDeleteAvailability();
  const { showConfirm } = useAlertStore((state) => state);
  const { hideLoader, showLoader } = useLoadingStore((state) => state);

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
    if (rowId) handleDeleteSlot(rowId);
  };

  const handleDeleteSlot = (id: number | string) => {
    showConfirm({
      title: 'Delete Availability Slot',
      message: 'Are you sure you want to delete this availability slot?',
      buttonText: 'Delete',
      cancelText: 'Cancel',
      onConfirm: () => {
        showLoader('Deleting availability slot...');
        deleteAvailabilityMutation(id, {
          onSuccess: async (res) => {
            hideLoader();
            if (res?.success) {
              showSuccessToast(
                res?.message ||
                'Availability slot has been deleted successfully.',
              );
              await avialRefetch();
              hideLoader();
            } else {
              hideLoader();
            }
          },
          onError: () => {
            hideLoader();
          },
        });
      },
    });
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
        isLoading={isLoadingAvailablityList}
        isEmpty={
          !availablityList ||
          (Array.isArray(availablityList) && availablityList?.length === 0)
        }
        emptyText="No availability found"
        emptyDescription={
          filtersActive
            ? 'Change the filters or clear them to see availability.'
            : undefined
        }
      >
        {Array.isArray(availablityList) &&
          availablityList?.map((row) => (
            <AvailabilityRow
              key={row.id}
              id={String(row.id)}
              onOpenMenu={actionMenu.open}
              availabilityMode={row.date_selection_mode}
              dates={
                row.date_selection_mode === AvailabilityMode.Recurring
                  ? (row.recurring_days ?? [])
                  : (row.selected_dates ?? [])
              }
              TimeSlot={`${formatTimeSlot(row.from_time, row.to_time)}`}
              durationMinutes={Number(row.slot_duration) || 0}
              inPersonFee={Number(row.in_person_fee) || 0}
              videoFee={Number(row.video_fee) || 0}
              consultationType={row.consultation_type}
            />
          ))}
      </CustomTable>

      <CustomActionMenu
        anchorEl={actionMenu.anchorEl}
        onClose={actionMenu.close}
        items={[
          {
            key: 'edit',
            label: 'Edit',
            icon: <EditIcon />,
            tone: 'default',
            onClick: () => showInDevelopment(),
          },
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
