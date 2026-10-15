'use client';

import { formatAvailabilityDate } from '@/resources/mock/availability';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, Chip, IconButton, Typography } from '@mui/material';
import { memo } from 'react';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export type CalendarMode = 'specific' | 'leave';

type AvailabilityCalendarProps = {
  mode: CalendarMode;
  visibleMonth: Date;
  selectedDates: string[];
  leaveDates: string[];
  todayIso: string;
  error?: string;
  onMonthChange: (next: Date) => void;
  onToggleDate: (iso: string) => void;
};

const toIso = (year: number, month: number, day: number) => {
  const monthValue = String(month + 1).padStart(2, '0');
  const dayValue = String(day).padStart(2, '0');
  return `${year}-${monthValue}-${dayValue}`;
};

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
  visibleMonth,
  selectedDates,
  leaveDates,
  todayIso,
  error,
  onMonthChange,
  onToggleDate,
}: AvailabilityCalendarProps) {
  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();
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
            onClick={() => onMonthChange(new Date(year, month - 1, 1))}
          >
            <ChevronLeftIcon fontSize="small" />
          </IconButton>
          <Typography component="p" className="month-label">
            {monthLabel}
          </Typography>
          <IconButton
            className="nav-btn"
            aria-label="Next month"
            onClick={() => onMonthChange(new Date(year, month + 1, 1))}
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
          {monthCells(visibleMonth).map((cell, index) =>
            cell ? (
              <Box
                key={cell.iso}
                component="button"
                type="button"
                className={[
                  'day-cell',
                  cell.iso === todayIso ? 'is-today' : '',
                  selectedDates.includes(cell.iso) ? 'is-selected' : '',
                  leaveDates.includes(cell.iso) ? 'is-leave' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                aria-pressed={
                  mode === 'leave'
                    ? leaveDates.includes(cell.iso)
                    : selectedDates.includes(cell.iso)
                }
                onClick={() => onToggleDate(cell.iso)}
              >
                {cell.day}
              </Box>
            ) : (
              <Box key={`empty-${index}`} />
            ),
          )}
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
