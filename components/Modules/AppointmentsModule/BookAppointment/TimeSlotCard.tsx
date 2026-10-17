'use client';

import {
  ISlotItem,
  PERIOD_ORDER,
  SlotPeriod,
} from '@/lib/commons/availability.utils';
import { Box, Button, Typography } from '@mui/material';
import { PERIOD_META } from '../contants/bookAppointment.constants';
import TimeSlotsSkeleton from './Skeletons/TimeSlotsSkeleton';

type TimeSlotCardProps = {
  periodSlots: Record<SlotPeriod, ISlotItem[]> | null;
  loading?: boolean;
  error?: boolean;
  onRetry?: () => void;
  selectedDate: string;
  selectedSlots: ISlotItem[] | null;
  onSlotPress: (slot: ISlotItem) => void;
};

export default function TimeSlotCard({
  periodSlots,
  loading = false,
  error = false,
  onRetry,
  selectedDate,
  selectedSlots,
  onSlotPress,
}: TimeSlotCardProps) {
  const selectedStarts = new Set(
    (selectedSlots ?? []).map((slot) => slot.start),
  );
  const periods = PERIOD_ORDER.filter(
    (period) => (periodSlots?.[period]?.length ?? 0) > 0,
  );

  const renderBody = () => {
    if (!selectedDate) {
      return (
        <Box className="empty-hint">
          <Typography component="p">
            Select a date to view available time slots.
          </Typography>
        </Box>
      );
    }

    if (loading) return <TimeSlotsSkeleton />;

    if (error) {
      return (
        <Box className="empty-hint">
          <Typography component="p">Unable to load time slots.</Typography>
          {onRetry ? (
            <Button variant="text" className="card-link" onClick={onRetry}>
              Retry
            </Button>
          ) : null}
        </Box>
      );
    }

    if (!periodSlots || periods.length === 0) {
      return (
        <Box className="empty-hint">
          <Typography component="p">No slots available on this date.</Typography>
        </Box>
      );
    }

    return periods.map((period) => {
      const slots = periodSlots[period];
      const availableCount = slots.filter((slot) => !slot.booked).length;
      return (
        <Box key={period} className="slot-group">
          <Box className="slot-group-head">
            <Typography component="p" className="slot-label">
              {PERIOD_META[period].label}
            </Typography>
            <Typography component="span" className="slot-count">
              {availableCount}/{slots.length} available
            </Typography>
          </Box>
          <Box className="slot-list">
            {slots.map((slot) => {
              const isActive = selectedStarts.has(slot.start);
              return (
                <Box
                  key={`${slot.start}-${slot.end}`}
                  component="button"
                  type="button"
                  disabled={slot.booked}
                  aria-pressed={isActive}
                  onClick={() => onSlotPress(slot)}
                  className={[
                    'slot-chip',
                    isActive ? 'active' : '',
                    slot.booked ? 'booked' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {slot.displayTime}
                </Box>
              );
            })}
          </Box>
        </Box>
      );
    });
  };

  return (
    <Box className="book-card">
      <Typography component="h3" className="card-title required">
        Select Time Slot
      </Typography>
      {renderBody()}
    </Box>
  );
}
