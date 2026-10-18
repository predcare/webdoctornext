'use client';

import CustomInput from '@/components/ui/CustomInput/CustomInput';
import { DAYS_OF_WEEK } from '@/lib/commons/availability.utils';
import { Box, Chip, Typography } from '@mui/material';
import { memo } from 'react';

type RecurringDaysFieldsProps = {
  weekdays: string[];
  startDate: string;
  endDate: string;
  dayError?: string;
  startDateError?: string;
  endDateError?: string;
  onToggleDay: (day: string) => void;
  onStartChange: (value: string) => void;
  onEndChange: (value: string) => void;
};

function RecurringDaysFields({
  weekdays,
  startDate,
  endDate,
  dayError,
  startDateError,
  endDateError,
  onToggleDay,
  onStartChange,
  onEndChange,
}: RecurringDaysFieldsProps) {
  return (
    <Box>
      <Typography component="p" className="field-label">
        Repeat on
      </Typography>
      <Box className="weekday-row">
        {DAYS_OF_WEEK.map((day) => (
          <Box
            key={day.key}
            component="button"
            type="button"
            className={`weekday-btn${weekdays.includes(day.key) ? ' active' : ''}`}
            aria-pressed={weekdays.includes(day.key)}
            onClick={() => onToggleDay(day.key)}
          >
            {day.label}
          </Box>
        ))}
      </Box>
      {dayError ? (
        <Typography component="p" className="field-error">
          {dayError}
        </Typography>
      ) : null}

      <Box className="date-pair">
        <CustomInput
          inputLabelName="Start date"
          type="date"
          value={startDate}
          onChange={(event) => onStartChange(event.target.value)}
          error={Boolean(startDateError)}
          helperText={startDateError}
        />
        <CustomInput
          inputLabelName="End date"
          type="date"
          value={endDate}
          onChange={(event) => onEndChange(event.target.value)}
          error={Boolean(endDateError)}
          helperText={endDateError}
        />
      </Box>

      <Box className="selected-panel">
        <Typography component="p" className="card-title">
          Selected Days
        </Typography>
        <Box className="selected-box">
          {weekdays.length === 0 ? (
            <Typography component="p" className="empty-copy">
              No days selected
            </Typography>
          ) : (
            DAYS_OF_WEEK.filter((day) => weekdays.includes(day.key)).map(
              (day) => (
                <Chip
                  key={day.key}
                  className="date-chip"
                  label={day.label}
                  onDelete={() => onToggleDay(day.key)}
                />
              ),
            )
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default memo(RecurringDaysFields);
