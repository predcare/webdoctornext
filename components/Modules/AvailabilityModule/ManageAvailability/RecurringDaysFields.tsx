'use client';

import CustomInput from '@/components/ui/CustomInput/CustomInput';
import { Box, Chip, Typography } from '@mui/material';
import { memo } from 'react';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

type RecurringDaysFieldsProps = {
  weekdays: string[];
  startDate: string;
  endDate: string;
  dayError?: string;
  rangeError?: string;
  onToggleDay: (day: string) => void;
  onStartChange: (value: string) => void;
  onEndChange: (value: string) => void;
};

function RecurringDaysFields({
  weekdays,
  startDate,
  endDate,
  dayError,
  rangeError,
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
        {WEEKDAYS.map((day) => (
          <Box
            key={day}
            component="button"
            type="button"
            className={`weekday-btn${weekdays.includes(day) ? ' active' : ''}`}
            aria-pressed={weekdays.includes(day)}
            onClick={() => onToggleDay(day)}
          >
            {day}
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
        />
        <CustomInput
          inputLabelName="End date"
          type="date"
          value={endDate}
          onChange={(event) => onEndChange(event.target.value)}
          error={Boolean(rangeError)}
          helperText={rangeError}
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
            WEEKDAYS.filter((day) => weekdays.includes(day)).map((day) => (
              <Chip
                key={day}
                className="date-chip"
                label={day}
                onDelete={() => onToggleDay(day)}
              />
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default memo(RecurringDaysFields);
