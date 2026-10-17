import type { IMyApptQueryParams } from '@/hooks/react-query/appointments/payload.interafce';
import { formatDateToYYYYMMDD } from '@/lib/commons/common.utils';
import { ConsultStatus, ConsultType } from '@/typescripts/enums';

export type TDateRangeFilter =
  'today' | 'tomorrow' | 'this_week' | 'all' | null;
export type TBookingMode = ConsultType.VIDEO | ConsultType.IN_PERSON | null;

export interface FilterStates {
  dateRange: TDateRangeFilter;
  statuses: ConsultStatus[];
  fromDate: Date | null;
  toDate: Date | null;
  activeTarget: 'from' | 'to' | null;
  bookingMode: TBookingMode;
  includeInstant: boolean;
  search: string;
}

export const APPOINTMENTS_PAGE_LIMIT = 10;

export const defaultAppointmentFilterStates: FilterStates = {
  dateRange: 'today',
  statuses: [ConsultStatus.CONFIRMED],
  fromDate: null,
  toDate: null,
  activeTarget: null,
  bookingMode: null,
  includeInstant: false,
  search: '',
};

export const dateRangeOptions: {
  id: Exclude<TDateRangeFilter, null>;
  label: string;
}[] = [
  { id: 'today', label: 'Today' },
  { id: 'tomorrow', label: 'Tomorrow' },
  { id: 'this_week', label: 'This Week' },
  { id: 'all', label: 'All' },
];

export const statusOptions: { id: ConsultStatus; label: string }[] = [
  { id: ConsultStatus.PENDING, label: 'Pending' },
  { id: ConsultStatus.CONFIRMED, label: 'Confirmed' },
  { id: ConsultStatus.IN_PROGRESS, label: 'In Progress' },
  { id: ConsultStatus.COMPLETED, label: 'Completed' },
  { id: ConsultStatus.NO_SHOW, label: 'No Show' },
  { id: ConsultStatus.CANCELLED, label: 'Cancelled' },
];

export const hasActiveAppointmentFilters = (f: FilterStates) =>
  f.search.trim().length > 0 ||
  f.dateRange !== defaultAppointmentFilterStates.dateRange ||
  f.bookingMode !== null ||
  f.includeInstant ||
  f.fromDate !== null ||
  f.toDate !== null ||
  f.statuses.join(',') !== defaultAppointmentFilterStates.statuses.join(',');

const buildConsultationType = (mode: TBookingMode, includeInstant: boolean) => {
  if (!mode) {
    return includeInstant
      ? undefined
      : `${ConsultType.IN_PERSON},${ConsultType.VIDEO}`;
  }
  return includeInstant ? `${mode},${ConsultType.INSTANT}` : mode;
};

export const buildAppointmentQueryParams = (
  f: FilterStates,
  search: string,
  page: number,
): IMyApptQueryParams => {
  const params: IMyApptQueryParams = { page, limit: APPOINTMENTS_PAGE_LIMIT };

  if (search) params.search = search;
  if (f.statuses.length > 0) params.status = f.statuses.join(',');

  const consultationType = buildConsultationType(
    f.bookingMode,
    f.includeInstant,
  );
  if (consultationType) params.consultation_type = consultationType;

  if (f.dateRange === 'all') {
    if (f.fromDate) params.start_date = formatDateToYYYYMMDD(f.fromDate);
    if (f.toDate) params.end_date = formatDateToYYYYMMDD(f.toDate);
    if (!f.fromDate && !f.toDate) params.date_range = 'all';
  } else if (f.dateRange) {
    params.date_range = f.dateRange;
  }

  return params;
};
