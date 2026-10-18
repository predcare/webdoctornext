'use client';

import { formatAvailabilityDate } from '@/lib/commons/availability.utils';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, Chip, IconButton, Typography } from '@mui/material';
import { memo, useState, useSyncExternalStore } from 'react';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export type CalendarMode = 'specific' | 'leave';

type AvailabilityCalendarProps = {
  mode: CalendarMode;
  selectedDates: string[];
  leaveDates: string[];
  error?: string;
  disablePastDates?: boolean;
  onToggleDate: (iso: string) => void;
};

const toIso = (year: number, month: number, day: number) => {
  const monthValue = String(month + 1).padStart(2, '0');
  const dayValue = String(day).padStart(2, '0');
  return `${year}-${monthValue}-${dayValue}`;
};

const monthOf = (iso?: string) => {
  if (!iso) return null;
  const [year, month] = iso.split('-').map(Number);
  return year && month ? new Date(year, month - 1, 1) : null;
};

const subscribeToNothing = () => () => {};
const getTodayIso = () => {
  const today = new Date();
  return toIso(today.getFullYear(), today.getMonth(), today.getDate());
};
const getServerTodayIso = () => '';

const monthCells = (visibleMonth: Date) => {
  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();
  const startPad = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: Array<{ iso: string; day: number } | null> = [
    ...Array.from({ length: startPad }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => {
      const day = index + 1;
      return { iso: toIso(year, month, day), day };
    }),
  ];
  return cells;
};

function AvailabilityCalendar({
  mode,
  selectedDates,
  leaveDates,
  error,
  disablePastDates = false,
  onToggleDate,
}: AvailabilityCalendarProps) {
  const [monthOverride, setMonthOverride] = useState<Date | null>(null);
  const todayIso = useSyncExternalStore(
    subscribeToNothing,
    getTodayIso,
    getServerTodayIso,
  );
  const isPast = (iso: string) =>
    disablePastDates && Boolean(todayIso) && iso < todayIso;
  const firstDate = [...selectedDates, ...leaveDates]
    .filter((iso) => Boolean(iso) && !isPast(iso))
    .sort()[0];
  const visibleMonth =
    monthOverride ?? monthOf(firstDate) ?? monthOf(todayIso) ?? new Date();

  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();
  const currentMonth = monthOf(todayIso);
  const canGoPrev =
    !disablePastDates || !currentMonth || visibleMonth > currentMonth;
  const monthLabel = visibleMonth.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
  const activeDates = [
    ...(mode === 'leave' ? leaveDates : selectedDates),
  ].sort();

  return (
    <Box>
      <Box className="calendar-shell">
        <Box className="calendar-head">
          <IconButton
            className="nav-btn"
            aria-label="Previous month"
            disabled={!canGoPrev}
            onClick={() => setMonthOverride(new Date(year, month - 1, 1))}
          >
            <ChevronLeftIcon fontSize="small" />
          </IconButton>
          <Typography component="p" className="month-label">
            {monthLabel}
          </Typography>
          <IconButton
            className="nav-btn"
            aria-label="Next month"
            onClick={() => setMonthOverride(new Date(year, month + 1, 1))}
          >
            <ChevronRightIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box className="calendar-grid">
          {WEEKDAYS.map((weekday) => (
            <Typography
              key={weekday}
              component="span"
              className="weekday-label"
            >
              {weekday}
            </Typography>
          ))}
          {monthCells(visibleMonth).map((cell, index) => {
            if (!cell) return <Box key={`empty-${index}`} />;
            const past = isPast(cell.iso);
            return (
              <Box
                key={cell.iso}
                component="button"
                type="button"
                disabled={past}
                className={[
                  'day-cell',
                  cell.iso === todayIso ? 'is-today' : '',
                  selectedDates.includes(cell.iso) ? 'is-selected' : '',
                  leaveDates.includes(cell.iso) ? 'is-leave' : '',
                  past ? 'is-past' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                aria-pressed={
                  mode === 'leave'
                    ? leaveDates.includes(cell.iso)
                    : selectedDates.includes(cell.iso)
                }
                onClick={() => {
                  if (!past) onToggleDate(cell.iso);
                }}
              >
                {cell.day}
              </Box>
            );
          })}
        </Box>

        <Box className="legend">
          <span className="legend-item">
            <i className="swatch selected" /> Selected
          </span>
          <span className="legend-item">
            <i className="swatch leave" /> Leave
          </span>
          <span className="legend-item">
            <i className="swatch today" /> Today
          </span>
        </Box>
      </Box>

      <Box className="selected-panel">
        <Typography component="p" className="card-title">
          Selected Dates
        </Typography>
        <Box className="selected-box">
          {activeDates.length === 0 ? (
            <Typography component="p" className="empty-copy">
              No dates selected
            </Typography>
          ) : (
            activeDates.map((iso) => (
              <Chip
                key={iso}
                className="date-chip"
                label={formatAvailabilityDate(iso)}
                onDelete={() => onToggleDate(iso)}
              />
            ))
          )}
        </Box>
        {error ? (
          <Typography component="p" className="field-error">
            {error}
          </Typography>
        ) : null}
      </Box>
    </Box>
  );
}

export default memo(AvailabilityCalendar);
