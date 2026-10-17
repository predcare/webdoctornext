'use client';

import CustomCalendarModal from '@/components/ui/CustomCalendarModal/CustomCalendarModal';
import { getRelativeDayLabel } from '@/lib/commons/availability.utils';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, Button, IconButton, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { DATE_WINDOW } from '../contants/bookAppointment.constants';
import DateStripSkeleton from './Skeletons/DateStripSkeleton';

type DateSelectCardProps = {
  dates: string[];
  loading?: boolean;
  error?: boolean;
  onRetry?: () => void;
  selectedDate: string;
  onSelect: (date: string) => void;
  disabled?: boolean;
  disabledHint?: string;
};

const getWindowStartFor = (index: number) =>
  Math.floor(Math.max(index, 0) / DATE_WINDOW) * DATE_WINDOW;

const getMonthLabel = (visible: string[]) => {
  if (visible.length === 0) return dayjs().format('MMMM YYYY');
  const first = dayjs(visible[0]);
  const last = dayjs(visible[visible.length - 1]);
  if (first.isSame(last, 'month')) return first.format('MMMM YYYY');
  if (first.isSame(last, 'year')) {
    return `${first.format('MMM')} - ${last.format('MMM YYYY')}`;
  }
  return `${first.format('MMM YYYY')} - ${last.format('MMM YYYY')}`;
};

export default function DateSelectCard({
  dates,
  loading = false,
  error = false,
  onRetry,
  selectedDate,
  onSelect,
  disabled = false,
  disabledHint = 'Select a patient to choose a date',
}: DateSelectCardProps) {
  const [windowStart, setWindowStart] = useState(() =>
    getWindowStartFor(dates.indexOf(selectedDate)),
  );
  const [calendarOpen, setCalendarOpen] = useState(false);

  const safeStart = Math.min(
    windowStart,
    getWindowStartFor(Math.max(dates.length - 1, 0)),
  );
  const visibleDates = useMemo(
    () => dates.slice(safeStart, safeStart + DATE_WINDOW),
    [dates, safeStart],
  );

  const hasDates = dates.length > 0;
  const canGoPrev = safeStart > 0;
  const canGoNext = safeStart + DATE_WINDOW < dates.length;
  const controlsDisabled = disabled || loading || !hasDates;

  const handleSelect = (date: string) => {
    if (disabled) return;
    onSelect(date);
  };

  const handleCalendarSelect = (date: string) => {
    setWindowStart(getWindowStartFor(dates.indexOf(date)));
    handleSelect(date);
  };

  const renderBody = () => {
    if (loading) return <DateStripSkeleton />;

    if (error) {
      return (
        <Box className="empty-hint">
          <Typography component="p">Unable to load available dates.</Typography>
          {onRetry ? (
            <Button variant="text" className="card-link" onClick={onRetry}>
              Retry
            </Button>
          ) : null}
        </Box>
      );
    }

    if (!hasDates) {
      return (
        <Box className="empty-hint">
          <Typography component="p">
            No available dates for this consultation type.
          </Typography>
        </Box>
      );
    }

    return (
      <Box className="date-row" role="listbox" aria-label="Available dates">
        {visibleDates.map((date) => {
          const d = dayjs(date);
          const isActive = date === selectedDate;
          const relative = getRelativeDayLabel(date);
          return (
            <Button
              key={date}
              type="button"
              role="option"
              aria-selected={isActive}
              disabled={disabled}
              onClick={() => handleSelect(date)}
              className={[
                'date-card',
                isActive ? 'active' : '',
                disabled ? 'disabled' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <Typography component="span" className="weekday">
                {d.format('ddd')}
              </Typography>
              <Typography component="span" className="day-num">
                {d.format('DD')}
              </Typography>
              <Typography component="span" className="month">
                {d.format('MMM')}
              </Typography>
              {relative === 'Today' || relative === 'Tomorrow' ? (
                <Typography component="span" className="slot-pill">
                  {relative}
                </Typography>
              ) : null}
            </Button>
          );
        })}
      </Box>
    );
  };

  return (
    <Box className="book-card">
      <Box className="card-head">
        <Box className="date-heading">
          <Typography component="h3" className="card-title required">
            Select Date
          </Typography>
          <Typography component="p" className="date-month">
            {getMonthLabel(visibleDates)}
          </Typography>
        </Box>
        <Box className="date-nav">
          <IconButton
            className="calendar-btn"
            aria-label="Open calendar"
            disabled={controlsDisabled}
            onClick={() => setCalendarOpen(true)}
          >
            <CalendarMonthOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton
            className="nav-btn"
            aria-label="Previous dates"
            disabled={loading || !canGoPrev}
            onClick={() => setWindowStart(Math.max(safeStart - DATE_WINDOW, 0))}
          >
            <ChevronLeftIcon fontSize="small" />
          </IconButton>
          <IconButton
            className="nav-btn"
            aria-label="Next dates"
            disabled={loading || !canGoNext}
            onClick={() => setWindowStart(safeStart + DATE_WINDOW)}
          >
            <ChevronRightIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {disabled && !loading && hasDates ? (
        <Typography component="p" className="date-lock-hint">
          {disabledHint}
        </Typography>
      ) : null}

      {renderBody()}

      <CustomCalendarModal
        open={calendarOpen}
        onClose={() => setCalendarOpen(false)}
        value={selectedDate || null}
        onSelect={handleCalendarSelect}
        availableDates={dates}
        heading="Select Appointment Date"
        subheading="Only highlighted dates are available"
      />
    </Box>
  );
}
