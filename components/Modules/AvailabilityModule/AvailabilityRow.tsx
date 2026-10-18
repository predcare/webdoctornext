'use client';

import { CustomActionMenuTrigger } from '@/components/ui/CustomActionMenu/CustomActionMenu';
import {
  CalendarIcon,
  InPersonIcon,
  VideoIcon,
} from '@/components/ui/Icons/appointments';
import InfoTooltip from '@/components/ui/InfoTooltip/InfoTooltip';
import { formatAvailabilityDate } from '@/resources/mock/availability';
import { Box, TableCell, TableRow } from '@mui/material';
import { memo } from 'react';

const modeLabel: Record<string, string> = {
  specific: 'Specific Dates',
  recurring: 'Recurring Days',
  leave: 'Leave',
};

const visibleChipCount = 2;

const formatFee = (fee: number) =>
  fee.toLocaleString('en-IN', { minimumFractionDigits: 2 });

type AvailabilityRowProps = {
  id: string;
  onOpenMenu: (anchor: HTMLElement, id: string) => void;
  availabilityMode: string;
  dates: string[];
  TimeSlot: string;
  durationMinutes: number;
  inPersonFee: number;
  videoFee: number;
  consultationType: string;
};

function AvailabilityRow({
  id,
  onOpenMenu,
  availabilityMode,
  dates,
  TimeSlot,
  durationMinutes,
  inPersonFee,
  videoFee,
  consultationType,
}: AvailabilityRowProps) {
  const labels = dates.map((date) => formatAvailabilityDate(date));
  const visibleLabels = labels.slice(0, visibleChipCount);
  const hiddenCount = Math.max(labels.length - visibleChipCount, 0);
  const showInPerson =
    consultationType === 'in-person' || consultationType === 'both';
  const showVideo = consultationType === 'video' || consultationType === 'both';

  return (
    <TableRow>
      <TableCell>
        <Box className={`mode-chip mode-${availabilityMode}`}>
          <CalendarIcon size={14} />
          {modeLabel[availabilityMode] ?? availabilityMode}
        </Box>
      </TableCell>
      <TableCell>
        <Box className="chip-row">
          {visibleLabels.map((label) => (
            <Box key={label} className="date-chip">
              {label}
            </Box>
          ))}
          {hiddenCount > 0 ? (
            <InfoTooltip
              className="more-chip"
              ariaLabel={`Show all ${labels.length} ${availabilityMode === 'recurring' ? 'days' : 'dates'}`}
              icon={<>+{hiddenCount} more</>}
              maxWidth={320}
              content={
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                  {labels.map((label) => (
                    <Box
                      key={label}
                      component="span"
                      sx={{
                        px: 1,
                        py: 0.25,
                        borderRadius: '6px',
                        fontSize: 12,
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                        bgcolor: 'customColors.cardBg',
                        color: 'customColors.heading',
                      }}
                    >
                      {label}
                    </Box>
                  ))}
                </Box>
              }
            />
          ) : null}
        </Box>
      </TableCell>
      <TableCell>
        <Box className="time-text">{TimeSlot}</Box>
      </TableCell>
      <TableCell>
        <Box className="duration-text">
          {durationMinutes > 1
            ? `${durationMinutes} Minutes`
            : `${durationMinutes} Minute`}
        </Box>
      </TableCell>
      <TableCell>
        <Box className="chip-row">
          {showInPerson ? (
            <Box className="fee-chip fee-in-person">
              <InPersonIcon size={14} />
              In-Person
              <span className="fee-amount">₹{formatFee(inPersonFee)}</span>
            </Box>
          ) : null}
          {showVideo ? (
            <Box className="fee-chip fee-video">
              <VideoIcon size={14} />
              Video
              <span className="fee-amount">₹{formatFee(videoFee)}</span>
            </Box>
          ) : null}
        </Box>
      </TableCell>
      <TableCell align="right">
        <CustomActionMenuTrigger
          aria-label="Availability actions"
          onClick={(event) => onOpenMenu(event.currentTarget, id)}
        />
      </TableCell>
    </TableRow>
  );
}

export default memo(AvailabilityRow);
