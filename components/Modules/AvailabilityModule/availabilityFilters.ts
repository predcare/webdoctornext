import {
  AvailabilityConsultation,
  AvailabilityDateMode,
  AvailabilityRecord,
} from '@/resources/mock/availability';

export type DateModeFilter = 'all' | AvailabilityDateMode;
export type ConsultationFilter = 'all' | AvailabilityConsultation;

export type AvailabilityFilterState = {
  doctorId: string;
  dateMode: DateModeFilter;
  consultation: ConsultationFilter;
};

export const defaultAvailabilityFilters: AvailabilityFilterState = {
  doctorId: 'anusri',
  dateMode: 'all',
  consultation: 'all',
};

export const dateModeOptions: { value: DateModeFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'specific', label: 'Specific Dates' },
  { value: 'recurring', label: 'Recurring Days' },
  { value: 'leave', label: 'Leave' },
];

export const consultationOptions: {
  value: ConsultationFilter;
  label: string;
}[] = [
  { value: 'all', label: 'All' },
  { value: 'in-person', label: 'In-Person' },
  { value: 'video', label: 'Video' },
  { value: 'both', label: 'Both' },
];

export const hasActiveAvailabilityFilters = (
  filters: AvailabilityFilterState,
) =>
  filters.dateMode !== defaultAvailabilityFilters.dateMode ||
  filters.consultation !== defaultAvailabilityFilters.consultation;

export const activeAvailabilityFilterCount = (
  filters: AvailabilityFilterState,
) =>
  Number(filters.dateMode !== 'all') + Number(filters.consultation !== 'all');

export const filterAvailability = (
  rows: AvailabilityRecord[],
  filters: AvailabilityFilterState,
) =>
  rows.filter((row) => {
    if (filters.doctorId !== 'all' && row.doctorId !== filters.doctorId)
      return false;
    if (filters.dateMode !== 'all' && row.dateMode !== filters.dateMode)
      return false;
    if (
      filters.consultation !== 'all' &&
      row.consultationType !== filters.consultation
    )
      return false;
    return true;
  });
