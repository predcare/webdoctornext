'use client';

import CalendarMonthGrid from '@/components/Modules/AvailabilityModule/CalendarView/CalendarMonthGrid';
import { buildCalendarMonth } from '@/resources/mock';
import { availabilityDoctors } from '@/resources/mock/availability';
import { AvailabilityCalendarWrapper } from '@/styles/CustomStyled/AvailabilityCalendarWrapper';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PersonOutlineIcon from '@mui/icons-material/PersonOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import { Box, Button, IconButton, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState, useSyncExternalStore } from 'react';

const clinicByDoctor: Record<string, string> = {
  anusri: 'Anusri Gupta Pure Cure Clinic',
};

const shiftMonth = (month: Date, amount: number) =>
  dayjs(month).add(amount, 'month').startOf('month').toDate();

const subscribeToday = () => () => {};
const readTodayIso = () => dayjs().format('YYYY-MM-DD');
const readServerTodayIso = () => '';

export default function AvailabilityCalendarPage() {
  const [visibleMonth, setVisibleMonth] = useState(() => new Date(2026, 9, 1));
  const doctorId = 'anusri';
  const todayIso = useSyncExternalStore(
    subscribeToday,
    readTodayIso,
    readServerTodayIso,
  );

  const days = useMemo(
    () => buildCalendarMonth(visibleMonth, doctorId),
    [visibleMonth, doctorId],
  );
  const inMonth = useMemo(() => days.filter((day) => day.inMonth), [days]);
  const daysWithSlots = inMonth.filter((day) => day.slots.length > 0).length;
  const totalSlots = inMonth.reduce((sum, day) => sum + day.slots.length, 0);
  const bookedSlots = inMonth.reduce(
    (sum, day) =>
      sum + day.slots.filter((slot) => slot.status === 'booked').length,
    0,
  );
  const openSlots = totalSlots - bookedSlots;

  const doctor = availabilityDoctors.find((item: any) => item.id === doctorId);
  const doctorName = doctor?.name.replace(/^Dr\.\s*/, '') ?? 'Doctor';
  const title = `${doctorName} - ${clinicByDoctor[doctorId] ?? 'Clinic'}`;
  const monthLabel = dayjs(visibleMonth).format('MMMM YYYY');

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)
      )
        return;
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setVisibleMonth((current) => shiftMonth(current, -1));
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        setVisibleMonth((current) => shiftMonth(current, 1));
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const goToday = () => {
    setVisibleMonth(dayjs().startOf('month').toDate());
  };

  return (
    <AvailabilityCalendarWrapper>
      <Box className="calendar-card">
        <Box className="calendar-top">
          <Typography component="h1" className="calendar-title">
            {title}
          </Typography>
        </Box>

        <Box className="calendar-toolbar">
          <Box className="month-controls">
            <IconButton
              className="nav-btn"
              aria-label="Previous month"
              onClick={() =>
                setVisibleMonth((current) => shiftMonth(current, -1))
              }
            >
              <ChevronLeftIcon fontSize="small" />
            </IconButton>
            <Typography component="p" className="month-label">
              {monthLabel}
            </Typography>
            <IconButton
              className="nav-btn"
              aria-label="Next month"
              onClick={() =>
                setVisibleMonth((current) => shiftMonth(current, 1))
              }
            >
              <ChevronRightIcon fontSize="small" />
            </IconButton>
            <Button className="today-btn" variant="outlined" onClick={goToday}>
              Today
            </Button>
            <Typography component="p" className="key-hint">
              Use ← → arrow keys to change month
            </Typography>
          </Box>

          <Box className="stats">
            <span className="stat">
              <span className="stat-label">Days with slots:</span>
              <span className="stat-value">{daysWithSlots}</span>
            </span>
            <span className="stat">
              <span className="stat-label">Total slots:</span>
              <span className="stat-value">{totalSlots}</span>
            </span>
            <span className="stat">
              <span className="stat-label">Open:</span>
              <span className="stat-value">{openSlots}</span>
            </span>
            <span className="stat">
              <span className="stat-label">Booked:</span>
              <span className="stat-value">{bookedSlots}</span>
            </span>
          </Box>
        </Box>

        <Box className="legend">
          <span className="legend-item">
            <i className="swatch available" /> Available
          </span>
          <span className="legend-item">
            <i className="swatch booked" /> Booked
          </span>
          <span className="legend-item">
            <VideocamOutlinedIcon className="legend-icon" /> Video
          </span>
          <span className="legend-item">
            <PersonOutlineIcon className="legend-icon" /> In-person
          </span>
          <span className="legend-item">
            <i className="swatch leave" /> Leave
          </span>
        </Box>

        <CalendarMonthGrid days={days} todayIso={todayIso} />
      </Box>
    </AvailabilityCalendarWrapper>
  );
}
