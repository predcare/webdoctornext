'use client';

import CustomInput from '@/components/ui/CustomInput/CustomInput';
import type { TimeValue } from '@/lib/commons/availability.utils';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import {
  Box,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from '@mui/material';
import { memo } from 'react';

export type ConsultationChoice = 'in-person' | 'video' | 'both';

const hours = Array.from({ length: 12 }, (_, index) =>
  String(index + 1).padStart(2, '0'),
);
const minutes = Array.from({ length: 12 }, (_, index) =>
  String(index * 5).padStart(2, '0'),
);
const periodOptions: TimeValue['period'][] = ['AM', 'PM'];

const durationOptions = [5, 10, 15, 20, 30, 60];

const withValue = (options: string[], value: string) =>
  value && !options.includes(value) ? [...options, value].sort() : options;

type AvailabilityFormFieldsProps = {
  from: TimeValue;
  to: TimeValue;
  consultationType: ConsultationChoice;
  duration: number;
  inPersonFee: string;
  videoFee: string;
  hideFee: boolean;
  requirePayment: boolean;
  timeError?: string;
  durationError?: string;
  inPersonFeeError?: string;
  videoFeeError?: string;
  onFromChange: (patch: Partial<TimeValue>) => void;
  onToChange: (patch: Partial<TimeValue>) => void;
  onConsultationChange: (value: ConsultationChoice) => void;
  onDurationChange: (value: number) => void;
  onInPersonFeeChange: (value: string) => void;
  onVideoFeeChange: (value: string) => void;
  onHideFeeChange: (value: boolean) => void;
  onRequirePaymentChange: (value: boolean) => void;
};

function TimeSelects({
  value,
  onChange,
}: {
  value: TimeValue;
  onChange: (patch: Partial<TimeValue>) => void;
}) {
  return (
    <Box className="time-picks">
      <Select
        className="time-select"
        size="small"
        value={value.hour}
        onChange={(event) => onChange({ hour: event.target.value })}
      >
        {withValue(hours, value.hour).map((hour) => (
          <MenuItem key={hour} value={hour}>
            {hour}
          </MenuItem>
        ))}
      </Select>
      <Select
        className="time-select"
        size="small"
        value={value.minute}
        onChange={(event) => onChange({ minute: event.target.value })}
      >
        {withValue(minutes, value.minute).map((minute) => (
          <MenuItem key={minute} value={minute}>
            {minute}
          </MenuItem>
        ))}
      </Select>
      <Select
        className="time-select"
        size="small"
        value={value.period}
        onChange={(event) =>
          onChange({ period: event.target.value as TimeValue['period'] })
        }
      >
        {periodOptions.map((period) => (
          <MenuItem key={period} value={period}>
            {period}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}

function AvailabilityFormFields({
  from,
  to,
  consultationType,
  duration,
  inPersonFee,
  videoFee,
  hideFee,
  requirePayment,
  timeError,
  durationError,
  inPersonFeeError,
  videoFeeError,
  onFromChange,
  onToChange,
  onConsultationChange,
  onDurationChange,
  onInPersonFeeChange,
  onVideoFeeChange,
  onHideFeeChange,
  onRequirePaymentChange,
}: AvailabilityFormFieldsProps) {
  const showInPerson =
    consultationType === 'in-person' || consultationType === 'both';
  const showVideo = consultationType === 'video' || consultationType === 'both';
  const durations = durationOptions.includes(duration)
    ? durationOptions
    : [...durationOptions, duration].sort((a, b) => a - b);

  return (
    <>
      <Box className="form-card">
        <Box className="section-block">
          <Typography component="p" className="card-title">
            Time Range
          </Typography>
          <Box className="time-grid">
            <Box>
              <Typography component="p" className="field-label">
                From
              </Typography>
              <TimeSelects value={from} onChange={onFromChange} />
            </Box>
            <Box>
              <Typography component="p" className="field-label">
                To
              </Typography>
              <TimeSelects value={to} onChange={onToChange} />
              <Typography component="p" className="time-hint">
                Night 12 (midnight) = 12:00 AM · Noon = 12:00 PM
              </Typography>
            </Box>
          </Box>
          {timeError ? (
            <Typography component="p" className="field-error">
              {timeError}
            </Typography>
          ) : null}
        </Box>

        <Box className="section-block">
          <Typography component="p" className="card-title">
            Consultation Type
          </Typography>
          <RadioGroup
            className="consult-options"
            row
            value={consultationType}
            onChange={(event) =>
              onConsultationChange(event.target.value as ConsultationChoice)
            }
          >
            <FormControlLabel
              value="in-person"
              control={<Radio />}
              label="In-Person"
            />
            <FormControlLabel
              value="video"
              control={<Radio />}
              label="Video Consultation"
            />
            <FormControlLabel value="both" control={<Radio />} label="Both" />
          </RadioGroup>
        </Box>

        <Box className="section-block">
          <Typography component="p" className="card-title">
            Time Slot Duration
          </Typography>
          <Select
            className="field-select"
            fullWidth
            value={duration}
            onChange={(event) => onDurationChange(Number(event.target.value))}
          >
            {durations.map((option) => (
              <MenuItem key={option} value={option}>
                {option} minutes
              </MenuItem>
            ))}
          </Select>
          {durationError ? (
            <Typography component="p" className="field-error">
              {durationError}
            </Typography>
          ) : null}
        </Box>
      </Box>

      <Box className="form-card">
        <Typography component="p" className="card-title fees-title">
          <CurrencyRupeeIcon className="fees-icon" fontSize="small" />
          Consultation Fees
        </Typography>

        {showInPerson ? (
          <CustomInput
            inputLabelName="In-Person Fee (INR)"
            placeholder="Enter in-person consultation fee"
            value={inPersonFee}
            onChange={(event) => onInPersonFeeChange(event.target.value)}
            error={Boolean(inPersonFeeError)}
            helperText={inPersonFeeError}
          />
        ) : null}

        {showVideo ? (
          <Box sx={{ marginTop: showInPerson ? '16px' : 0 }}>
            <CustomInput
              inputLabelName="Video Fee (INR)"
              placeholder="Enter video consultation fee"
              value={videoFee}
              onChange={(event) => onVideoFeeChange(event.target.value)}
              error={Boolean(videoFeeError)}
              helperText={videoFeeError}
            />
          </Box>
        ) : null}

        <Box className="check-list">
          <FormControlLabel
            className="check-row"
            control={
              <Checkbox
                checked={hideFee}
                onChange={(event) => onHideFeeChange(event.target.checked)}
              />
            }
            label="Do not show fee to patient"
          />
          <FormControlLabel
            className="check-row"
            control={
              <Checkbox
                checked={requirePayment}
                onChange={(event) =>
                  onRequirePaymentChange(event.target.checked)
                }
              />
            }
            label="Require online payment (appointment not booked without payment)"
          />
        </Box>
      </Box>
    </>
  );
}

export default memo(AvailabilityFormFields);
