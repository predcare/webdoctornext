'use client';

import PredDatePickerModal from '@/components/commons/PredDatePickerModal/PredDatePickerModal';
import {
  dateRangeOptions,
  statusOptions,
  type FilterStates,
  type TBookingMode,
} from '@/components/Modules/AppointmentsModule/appointmentFilterStates';
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
import { AppointmentFiltersWrapper } from '@/styles/CustomStyled/AppointmentFiltersWrapper';
import { ConsultStatus, ConsultType } from '@/typescripts/enums';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  InputAdornment,
  TextField
} from '@mui/material';
import { memo, type ReactNode } from 'react';

const visitOptions: { id: TBookingMode; label: string; icon: ReactNode }[] = [
  { id: null, label: 'All', icon: <AllIcon /> },
  { id: ConsultType.VIDEO, label: 'Video', icon: <VideoIcon /> },
  { id: ConsultType.IN_PERSON, label: 'In-Person', icon: <InPersonIcon /> },
];

const statusIcons: Partial<Record<ConsultStatus, ReactNode>> = {
  [ConsultStatus.CONFIRMED]: <ConfirmedIcon />,
  [ConsultStatus.IN_PROGRESS]: <InProgressIcon />,
  [ConsultStatus.COMPLETED]: <CompletedIcon />,
  [ConsultStatus.NO_SHOW]: <NoShowIcon />,
  [ConsultStatus.CANCELLED]: <CancelledIcon />,
};

const formatPredDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${day}-${month}-${date.getFullYear()}`;
};

type AppointmentFiltersProps = {
  filterStates: FilterStates;
  updateFilterState: (updates: Partial<FilterStates>) => void;
  onReset: () => void;
};

function AppointmentFilters({
  filterStates,
  updateFilterState,
  onReset,
}: AppointmentFiltersProps) {
  const {
    activeTarget,
    bookingMode,
    dateRange,
    fromDate,
    includeInstant,
    search,
    statuses,
    toDate,
  } = filterStates;
  const selectedDate = activeTarget === 'to' ? toDate : fromDate;

  const toggleStatus = (status: ConsultStatus) => {
    updateFilterState({
      statuses: statuses.includes(status)
        ? statuses.filter((item) => item !== status)
        : [...statuses, status],
    });
  };

  return (
    <AppointmentFiltersWrapper>
      <Box className="filter-row">
        <Box className="chip-group">
          {visitOptions.map((option) => {
            const active = bookingMode === option.id;
            return (
              <Button
                key={option.label}
                className={active ? 'visit-chip active' : 'visit-chip'}
                aria-pressed={active}
                startIcon={option.icon}
                disableElevation
                onClick={() => updateFilterState({ bookingMode: option.id })}
              >
                {option.label}
              </Button>
            );
          })}
        </Box>
        <Divider className="row-divider" orientation="vertical" flexItem />
        <FormControlLabel
          className="instant-check"
          control={
            <Checkbox
              size="small"
              checked={includeInstant}
              onChange={(event) =>
                updateFilterState({ includeInstant: event.target.checked })
              }
            />
          }
          label="Include Instant Appointments"
        />
        <Box className="timeline">
          <Box className="period-group">
            {dateRangeOptions.map((option) => {
              const active = dateRange === option.id;
              return (
                <Button
                  key={option.id}
                  className={active ? 'period-chip active' : 'period-chip'}
                  aria-pressed={active}
                  disableElevation
                  onClick={() =>
                    updateFilterState({
                      dateRange: option.id,
                      activeTarget: null,
                      ...(option.id !== 'all'
                        ? { fromDate: null, toDate: null }
                        : {}),
                    })
                  }
                >
                  {option.label}
                </Button>
              );
            })}
          </Box>
        </Box>
      </Box>

      <Box className="filter-row status-row">
        <Box className="status-group">
          {statusOptions.map((option) => {
            const active = statuses.includes(option.id);
            return (
              <Button
                key={option.id}
                className={active ? 'status-chip active' : 'status-chip'}
                aria-pressed={active}
                startIcon={statusIcons[option.id] ?? <CalendarIcon />}
                disableElevation
                onClick={() => toggleStatus(option.id)}
              >
                {option.label}
              </Button>
            );
          })}
          <Button
            className={
              statuses.length === 0 ? 'status-chip active' : 'status-chip'
            }
            aria-pressed={statuses.length === 0}
            startIcon={<AllIcon size={14} />}
            disableElevation
            onClick={() => updateFilterState({ statuses: [] })}
          >
            All
          </Button>
        </Box>
        <Button
          className="reset-filters"
          variant="outlined"
          disableElevation
          onClick={onReset}
        >
          Reset Filters
        </Button>
      </Box>

      <Box className="filter-row">
        <TextField
          className="search-field"
          value={search}
          placeholder="Search by name, ID, email or phone..."
          onChange={(event) => updateFilterState({ search: event.target.value })}
          onKeyDown={(event) => {
            if (event.key === 'Escape') updateFilterState({ search: '' });
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
        />
        <Button
          className={fromDate ? 'date-field' : 'date-field empty'}
          variant="outlined"
          endIcon={<CalendarIcon />}
          onClick={() => updateFilterState({ activeTarget: 'from' })}
        >
          {fromDate ? formatPredDate(fromDate) : 'DD-MM-YYYY'}
        </Button>
        <Button
          className={toDate ? 'date-field' : 'date-field empty'}
          variant="outlined"
          endIcon={<CalendarIcon />}
          onClick={() => updateFilterState({ activeTarget: 'to' })}
        >
          {toDate ? formatPredDate(toDate) : 'DD-MM-YYYY'}
        </Button>
      </Box>

      {activeTarget ? (
        <PredDatePickerModal
          visible
          value={selectedDate ?? undefined}
          title={activeTarget === 'to' ? 'To date' : 'From date'}
          onCancel={() => updateFilterState({ activeTarget: null })}
          onConfirm={(date) =>
            updateFilterState({
              ...(activeTarget === 'to' ? { toDate: date } : { fromDate: date }),
              dateRange: 'all',
              activeTarget: null,
            })
          }
        />
      ) : null}
    </AppointmentFiltersWrapper>
  );
}

export default memo(AppointmentFilters);
