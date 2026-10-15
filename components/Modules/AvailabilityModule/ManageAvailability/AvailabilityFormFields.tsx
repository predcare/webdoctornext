'use client';

import CustomInput from '@/components/ui/CustomInput/CustomInput';
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

export type Meridiem = 'AM' | 'PM';
export type ConsultationChoice = 'in-person' | 'video' | 'both';

const hours = Array.from({ length: 12 }, (_, index) =>
  String(index + 1).padStart(2, '0'),
);
const minutes = Array.from({ length: 12 }, (_, index) =>
  String(index * 5).padStart(2, '0'),
);
const meridiemOptions: Meridiem[] = ['AM', 'PM'];

const durationOptions = [
  { value: '5', label: '5 minutes' },
  { value: '10', label: '10 minutes' },
  { value: '15', label: '15 minutes' },
  { value: '20', label: '20 minutes' },
  { value: '30', label: '30 minutes' },
  { value: '60', label: '60 minutes' },
];

type TimeParts = {
  hour: string;
  minute: string;
  meridiem: Meridiem;
};

type AvailabilityFormFieldsProps = {
  from: TimeParts;
  to: TimeParts;
  consultationType: ConsultationChoice;
  duration: string;
  inPersonFee: string;
  videoFee: string;
  hideFee: boolean;
  requirePayment: boolean;
  timeError?: string;
  inPersonFeeError?: string;
  videoFeeError?: string;
  onFromChange: (patch: Partial<TimeParts>) => void;
  onToChange: (patch: Partial<TimeParts>) => void;
  onConsultationChange: (value: ConsultationChoice) => void;
  onDurationChange: (value: string) => void;
  onInPersonFeeChange: (value: string) => void;
  onVideoFeeChange: (value: string) => void;
  onHideFeeChange: (value: boolean) => void;
  onRequirePaymentChange: (value: boolean) => void;
};

function TimeSelects({
  value,
  onChange,
}: {
  value: TimeParts;
  onChange: (patch: Partial<TimeParts>) => void;
}) {
  return (
    <Box className="time-picks">
      <Select
        className="time-select"
        size="small"
        value={value.hour}
        onChange={(event) => onChange({ hour: event.target.value })}
      >
        {hours.map((hour) => (
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
        {minutes.map((minute) => (
          <MenuItem key={minute} value={minute}>
            {minute}
          </MenuItem>
        ))}
      </Select>
      <Select
        className="time-select"
        size="small"
        value={value.meridiem}
        onChange={(event) =>
          onChange({ meridiem: event.target.value as Meridiem })
        }
      >
        {meridiemOptions.map((meridiem) => (
          <MenuItem key={meridiem} value={meridiem}>
            {meridiem}
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
            onChange={(event) => onDurationChange(event.target.value)}
          >
            {durationOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
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
