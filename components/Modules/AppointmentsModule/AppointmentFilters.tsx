'use client';

import PredDatePickerModal from '@/components/commons/PredDatePickerModal/PredDatePickerModal';
import {
  AllIcon,
  CalendarIcon,
  CancelledIcon,
  CompletedIcon,
  ConfirmedIcon,
  InPersonIcon,
  InProgressIcon,
  NoShowIcon,
  VideoIcon,
} from '@/components/ui/Icons/appointments';
import {
  appointmentToday,
  type AppointmentVisitType,
  type DashboardAppointment,
} from '@/resources/mock';
import { AppointmentFiltersWrapper } from '@/styles/CustomStyled/AppointmentFiltersWrapper';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { memo, useState, type ReactNode } from 'react';

export type VisitFilter = 'all' | AppointmentVisitType;
export type PeriodFilter = 'today' | 'week' | 'month';
export type StatusFilter = 'Confirmed' | 'In Progress' | 'Completed' | 'No Show' | 'Cancelled' | 'all';
export type SortFilter = 'nearest' | 'farthest';

export type AppointmentFilterState = {
  visit: VisitFilter;
  includeInstant: boolean;
  period: PeriodFilter;
  status: StatusFilter;
  search: string;
  fromDate: Date | null;
  toDate: Date | null;
  sort: SortFilter;
};

export const defaultAppointmentFilters: AppointmentFilterState = {
  visit: 'all',
  includeInstant: false,
  period: 'today',
  status: 'Confirmed',
  search: '',
  fromDate: null,
  toDate: null,
  sort: 'nearest',
};

const weekStart = '2026-10-12';
const weekEnd = '2026-10-18';

const visitOptions: { id: VisitFilter; label: string; icon: ReactNode }[] = [
  { id: 'all', label: 'All', icon: <AllIcon /> },
  { id: 'video', label: 'Video', icon: <VideoIcon /> },
  { id: 'in-person', label: 'In-Person', icon: <InPersonIcon /> },
];

const periodOptions: { id: PeriodFilter; label: string }[] = [
  { id: 'today', label: 'Today' },
  { id: 'week', label: 'This Week' },
  { id: 'month', label: 'This Month' },
];

const statusOptions: { id: StatusFilter; label: string; count: number; icon: ReactNode }[] = [
  { id: 'Confirmed', label: 'Confirmed', count: 19, icon: <ConfirmedIcon /> },
  { id: 'In Progress', label: 'In Progress', count: 3, icon: <InProgressIcon /> },
  { id: 'Completed', label: 'Completed', count: 4, icon: <CompletedIcon /> },
  { id: 'No Show', label: 'No Show', count: 0, icon: <NoShowIcon /> },
  { id: 'Cancelled', label: 'Cancelled', count: 2, icon: <CancelledIcon /> },
  { id: 'all', label: 'All', count: 28, icon: <AllIcon size={14} /> },
];

const toIsoDate = (date: Date) => {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
};

const formatPredDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${day}-${month}-${date.getFullYear()}`;
};

const matchesPeriod = (dateValue: string, period: PeriodFilter) => {
  if (period === 'today') return dateValue === appointmentToday;
  if (period === 'week') return dateValue >= weekStart && dateValue <= weekEnd;
  return dateValue.startsWith('2026-10');
};

export const hasActiveAppointmentFilters = (filters: AppointmentFilterState) =>
  filters.search.trim().length > 0 ||
  filters.visit !== defaultAppointmentFilters.visit ||
  filters.includeInstant !== defaultAppointmentFilters.includeInstant ||
  filters.period !== defaultAppointmentFilters.period ||
  filters.status !== defaultAppointmentFilters.status ||
  filters.fromDate !== null ||
  filters.toDate !== null ||
  filters.sort !== defaultAppointmentFilters.sort;

export const filterAppointments = (rows: DashboardAppointment[], filters: AppointmentFilterState) => {
  const query = filters.search.trim().toLowerCase();
  const fromIso = filters.fromDate ? toIsoDate(filters.fromDate) : null;
  const toIso = filters.toDate ? toIsoDate(filters.toDate) : null;

  const matched = rows.filter((row) => {
    if (filters.visit !== 'all' && row.visitType !== filters.visit) return false;
    if (!filters.includeInstant && row.instant) return false;
    if (!matchesPeriod(row.dateValue, filters.period)) return false;
    if (filters.status !== 'all' && row.status !== filters.status) return false;
    if (fromIso && row.dateValue < fromIso) return false;
    if (toIso && row.dateValue > toIso) return false;
    if (!query) return true;

    return [row.name, row.appointmentId, row.email, row.phone].join(' ').toLowerCase().includes(query);
  });

  return matched.sort((left, right) => {
    const leftKey = `${left.dateValue}T${left.startTime}`;
    const rightKey = `${right.dateValue}T${right.startTime}`;
    return filters.sort === 'nearest' ? leftKey.localeCompare(rightKey) : rightKey.localeCompare(leftKey);
  });
};

type AppointmentFiltersProps = {
  filters: AppointmentFilterState;
  onChange: (patch: Partial<AppointmentFilterState>) => void;
  onClear: () => void;
};

function AppointmentFilters({ filters, onChange, onClear }: AppointmentFiltersProps) {
  const [activeDate, setActiveDate] = useState<'from' | 'to' | null>(null);
  const selectedDate = activeDate === 'to' ? filters.toDate : filters.fromDate;

  return (
    <AppointmentFiltersWrapper>
      <Box className="filter-row">
        <Box className="chip-group">
          {visitOptions.map((option) => (
            <Button
              key={option.id}
              className={filters.visit === option.id ? 'visit-chip active' : 'visit-chip'}
              aria-pressed={filters.visit === option.id}
              startIcon={option.icon}
              disableElevation
              onClick={() => onChange({ visit: option.id })}
            >
              {option.label}
            </Button>
          ))}
        </Box>
        <Divider className="row-divider" orientation="vertical" flexItem />
        <FormControlLabel
          className="instant-check"
          control={
            <Checkbox
              size="small"
              checked={filters.includeInstant}
              onChange={(event) => onChange({ includeInstant: event.target.checked })}
            />
          }
          label="Include Instant Appointments"
        />
        <Box className="timeline">
          <Typography className="timeline-label" component="span">
            Timeline:
          </Typography>
          <Box className="period-group">
            {periodOptions.map((option) => (
              <Button
                key={option.id}
                className={filters.period === option.id ? 'period-chip active' : 'period-chip'}
                aria-pressed={filters.period === option.id}
                disableElevation
                onClick={() => onChange({ period: option.id })}
              >
                {option.label}
              </Button>
            ))}
          </Box>
        </Box>
      </Box>

      <Box className="filter-row status-row">
        <Box className="status-group">
          {statusOptions.map((option) => (
            <Button
              key={option.id}
              className={filters.status === option.id ? 'status-chip active' : 'status-chip'}
              aria-pressed={filters.status === option.id}
              startIcon={option.icon}
              disableElevation
              onClick={() => onChange({ status: option.id })}
            >
              {option.label}
              <Box component="span" className="status-count">
                {option.count}
              </Box>
            </Button>
          ))}
        </Box>
        <Button className="reset-filters" variant="outlined" disableElevation onClick={onClear}>
          Reset Filters
        </Button>
      </Box>

      <Box className="filter-row">
        <TextField
          className="search-field"
          value={filters.search}
          placeholder="Search by name, ID, email or phone..."
          onChange={(event) => onChange({ search: event.target.value })}
          onKeyDown={(event) => {
            if (event.key === 'Escape') onChange({ search: '' });
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              )
            },
          }}
        />
        <Button
          className={filters.fromDate ? 'date-field' : 'date-field empty'}
          variant="outlined"
          endIcon={<CalendarIcon />}
          onClick={() => setActiveDate('from')}
        >
          {filters.fromDate ? formatPredDate(filters.fromDate) : 'dd-mm-yyyy'}
        </Button>
        <Button
          className={filters.toDate ? 'date-field' : 'date-field empty'}
          variant="outlined"
          endIcon={<CalendarIcon />}
          onClick={() => setActiveDate('to')}
        >
          {filters.toDate ? formatPredDate(filters.toDate) : 'dd-mm-yyyy'}
        </Button>
        <Select
          className="sort-select"
          value={filters.sort}
          onChange={(event) => onChange({ sort: event.target.value as SortFilter })}
        >
          <MenuItem value="nearest">Date (Nearest First)</MenuItem>
          <MenuItem value="farthest">Date (Farthest First)</MenuItem>
        </Select>
      </Box>

      {activeDate ? (
        <PredDatePickerModal
          visible
          value={selectedDate ?? undefined}
          title={activeDate === 'to' ? 'To date' : 'From date'}
          onCancel={() => setActiveDate(null)}
          onConfirm={(date) => {
            onChange(activeDate === 'to' ? { toDate: date } : { fromDate: date });
            setActiveDate(null);
          }}
        />
      ) : null}
    </AppointmentFiltersWrapper>
  );
}

export default memo(AppointmentFilters);
