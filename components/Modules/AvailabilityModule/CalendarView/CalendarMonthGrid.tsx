'use client';

import CalendarDayCell from '@/components/Modules/AvailabilityModule/CalendarView/CalendarDayCell';
import type { CalendarDay } from '@/resources/mock';
import { Box, Typography } from '@mui/material';
import { memo } from 'react';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

type CalendarMonthGridProps = {
  days: CalendarDay[];
  todayIso: string;
};

function CalendarMonthGrid({ days, todayIso }: CalendarMonthGridProps) {
  return (
    <Box>
      <Box className="weekday-row">
        {WEEKDAYS.map((weekday) => (
          <Typography key={weekday} component="span" className="weekday-label">
            {weekday}
          </Typography>
        ))}
      </Box>
      <Box className="day-grid">
        {days.map((day) => (
          <CalendarDayCell
            key={day.iso}
            day={day}
            isToday={day.iso === todayIso}
          />
        ))}
      </Box>
    </Box>
  );
}

export default memo(CalendarMonthGrid);
