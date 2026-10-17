'use client';

import {
  CustomCalendarModalStyled,
  CustomCalendarModalWrapper,
} from '@/styles/CustomStyled/CustomCalendarModalWrapper';
import { Box, Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { type Dayjs } from 'dayjs';
import { useMemo, useState } from 'react';

const DATE_FORMAT = 'YYYY-MM-DD';

export type CustomCalendarModalProps = {
  open: boolean;
  onClose: () => void;
  value: string | null;
  onSelect: (date: string) => void;
  availableDates?: string[];
  shouldDisableDate?: (date: Dayjs) => boolean;
  minDate?: string;
  maxDate?: string;
  disablePast?: boolean;
  loading?: boolean;
  heading?: string;
  subheading?: string;
  closeOnSelect?: boolean;
  confirmText?: string;
  cancelText?: string;
  showLegend?: boolean;
};

const toDayjs = (date?: string | null) => {
  if (!date) return null;
  const parsed = dayjs(date);
  return parsed.isValid() ? parsed : null;
};

export default function CustomCalendarModal({
  open,
  onClose,
  value,
  onSelect,
  availableDates,
  shouldDisableDate,
  minDate,
  maxDate,
  disablePast = false,
  loading = false,
  heading = 'Select Date',
  subheading,
  closeOnSelect = true,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  showLegend = true,
}: CustomCalendarModalProps) {
  const [draft, setDraft] = useState<Dayjs | null>(toDayjs(value));
  const [wasOpen, setWasOpen] = useState(open);

  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) setDraft(toDayjs(value));
  }

  const availableSet = useMemo(
    () => (availableDates ? new Set(availableDates) : null),
    [availableDates],
  );

  const sortedAvailable = useMemo(
    () => (availableDates ? [...availableDates].sort() : []),
    [availableDates],
  );

  const resolvedMin = useMemo(() => toDayjs(minDate), [minDate]);
  const resolvedMax = useMemo(() => toDayjs(maxDate), [maxDate]);
  const referenceDate = useMemo(
    () => toDayjs(value) ?? toDayjs(sortedAvailable[0]) ?? dayjs(),
    [value, sortedAvailable],
  );
  const selectedValue = useMemo(() => toDayjs(value), [value]);

  const isDateDisabled = (date: Dayjs) => {
    if (availableSet && !availableSet.has(date.format(DATE_FORMAT))) {
      return true;
    }
    return shouldDisableDate?.(date) ?? false;
  };

  const handleChange = (next: Dayjs | null) => {
    if (!next) return;
    if (closeOnSelect) {
      onSelect(next.format(DATE_FORMAT));
      onClose();
      return;
    }
    setDraft(next);
  };

  const handleConfirm = () => {
    if (!draft) return;
    onSelect(draft.format(DATE_FORMAT));
    onClose();
  };

  return (
    <CustomCalendarModalStyled
      open={open}
      onClose={onClose}
      heading={heading}
      subheading={subheading}
      isWhiteBg
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CustomCalendarModalWrapper>
          <DateCalendar
            value={closeOnSelect ? selectedValue : draft}
            onChange={handleChange}
            referenceDate={referenceDate}
            shouldDisableDate={isDateDisabled}
            {...(resolvedMin ? { minDate: resolvedMin } : {})}
            {...(resolvedMax ? { maxDate: resolvedMax } : {})}
            disablePast={disablePast}
            loading={loading}
            renderLoading={() => <DayCalendarSkeleton />}
            views={['day']}
            slotProps={{
              day: (ownerState) => ({
                className:
                  availableSet &&
                    !ownerState.isDayDisabled &&
                    !ownerState.isDayOutsideMonth
                    ? 'is-available'
                    : undefined,
              }),
            }}
          />

          {showLegend && availableSet ? (
            <Box className="calendar-legend">
              <span>
                <span className="legend-dot" />
                Available
              </span>
              <span>
                <span className="legend-dot muted" />
                Unavailable
              </span>
            </Box>
          ) : null}

          {!closeOnSelect ? (
            <Box className="calendar-footer">
              <Button variant="text" onClick={onClose}>
                {cancelText}
              </Button>
              <Button
                variant="contained"
                disableElevation
                disabled={!draft}
                onClick={handleConfirm}
              >
                {confirmText}
              </Button>
            </Box>
          ) : null}
        </CustomCalendarModalWrapper>
      </LocalizationProvider>
    </CustomCalendarModalStyled>
  );
}
