'use client';

import { CalendarIcon, InPersonIcon, VideoIcon } from '@/components/ui/Icons/appointments';
import { formatAvailabilityDate, type AvailabilityRecord } from '@/resources/mock';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, IconButton, TableCell, TableRow } from '@mui/material';
import { memo, type MouseEvent } from 'react';

const modeLabel = {
  specific: 'Specific Dates',
  recurring: 'Recurring Days',
  leave: 'Leave',
} as const;

const visibleChipCount = 2;

type AvailabilityRowProps = {
  row: AvailabilityRecord;
  onOpenMenu: (anchor: HTMLElement, id: string) => void;
};

function AvailabilityRow({ row, onOpenMenu }: AvailabilityRowProps) {
  const labels =
    row.dateMode === 'recurring' ? row.weekdays : row.dates.map((date) => formatAvailabilityDate(date));
  const visibleLabels = labels.slice(0, visibleChipCount);
  const hiddenCount = Math.max(labels.length - visibleChipCount, 0);
  const showInPerson = row.consultationType !== 'video' && row.inPersonFee;
  const showVideo = row.consultationType !== 'in-person' && row.videoFee;

  return (
    <TableRow>
      <TableCell>
        <Box className={`mode-chip mode-${row.dateMode}`}>
          <CalendarIcon size={14} />
          {modeLabel[row.dateMode]}
        </Box>
      </TableCell>
      <TableCell>
        <Box className="chip-row">
          {visibleLabels.map((label) => (
            <Box key={label} className="date-chip">
              {label}
            </Box>
          ))}
          {hiddenCount > 0 ? <Box className="more-chip">+{hiddenCount} more</Box> : null}
        </Box>
      </TableCell>
      <TableCell>
        <Box className="time-text">
          {row.fromTime} - {row.toTime}
        </Box>
      </TableCell>
      <TableCell>
        <Box className="duration-text">{row.durationMinutes} Min</Box>
      </TableCell>
      <TableCell>
        <Box className="chip-row">
          {showInPerson ? (
            <Box className="fee-chip fee-in-person">
              <InPersonIcon size={14} />
              In-Person
              <span className="fee-amount">₹{row.inPersonFee}</span>
            </Box>
          ) : null}
          {showVideo ? (
            <Box className="fee-chip fee-video">
              <VideoIcon size={14} />
              Video
              <span className="fee-amount">₹{row.videoFee}</span>
            </Box>
          ) : null}
        </Box>
      </TableCell>
      <TableCell align="right">
        <IconButton
          className="row-menu"
          size="small"
          aria-label="Availability actions"
          onClick={(event: MouseEvent<HTMLButtonElement>) => onOpenMenu(event.currentTarget, row.id)}
        >
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

export default memo(AvailabilityRow);
