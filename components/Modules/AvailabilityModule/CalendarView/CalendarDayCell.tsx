'use client';

import type { CalendarDay } from '@/resources/mock';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, IconButton } from '@mui/material';
import { memo, useRef } from 'react';

type CalendarDayCellProps = {
  day: CalendarDay;
  isToday: boolean;
};

function CalendarDayCell({ day, isToday }: CalendarDayCellProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const openCount = day.slots.filter((slot) => slot.status === 'open').length;
  const overflow = day.slots.length > 4;

  if (!day.inMonth) {
    return (
      <Box className="day-cell is-outside">
        <span className="day-number">{day.day}</span>
      </Box>
    );
  }

  return (
    <Box className={`day-cell${isToday ? ' is-today' : ''}`}>
      <Box className="day-head">
        <span className="day-number">{day.day}</span>
        {day.slots.length > 0 ? (
          <span className="open-count">
            {openCount}/{day.slots.length} open
          </span>
        ) : null}
      </Box>

      {day.isLeave ? <span className="leave-label">Leave</span> : null}
      {!day.isLeave && day.slots.length === 0 ? <span className="no-slots">No slots</span> : null}

      {day.slots.length > 0 ? (
        <Box className="slot-list" ref={listRef}>
          {day.slots.map((slot) => (
            <Box key={slot.id} className={`slot-chip${slot.status === 'booked' ? ' is-booked' : ''}`}>
              {slot.video ? <VideocamOutlinedIcon className="slot-icon" /> : null}
              {slot.inPerson ? <PersonOutlineIcon className="slot-icon" /> : null}
              <span className="slot-label">{slot.label}</span>
            </Box>
          ))}
        </Box>
      ) : null}

      {overflow ? (
        <IconButton
          className="more-btn"
          aria-label="Show more slots"
          onClick={() => listRef.current?.scrollBy({ top: 36, behavior: 'smooth' })}
        >
          <KeyboardArrowDownIcon fontSize="small" />
        </IconButton>
      ) : null}
    </Box>
  );
}

export default memo(CalendarDayCell);
