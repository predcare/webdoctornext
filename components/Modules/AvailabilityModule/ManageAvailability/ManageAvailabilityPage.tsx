'use client';

import PageBreadcrumb from '@/components/commons/PageBreadcrumb/PageBreadcrumb';
import AvailabilityCalendar from '@/components/Modules/AvailabilityModule/ManageAvailability/AvailabilityCalendar';
import AvailabilityFormFields, {
  type ConsultationChoice,
  type Meridiem,
} from '@/components/Modules/AvailabilityModule/ManageAvailability/AvailabilityFormFields';
import RecurringDaysFields from '@/components/Modules/AvailabilityModule/ManageAvailability/RecurringDaysFields';
import { availabilityDoctors } from '@/resources/mock/availability';
import { projectRoutes } from '@/routes';
import { ManageAvailabilityWrapper } from '@/styles/CustomStyled/ManageAvailabilityWrapper';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, MenuItem, Select, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type SlotMode = 'specific' | 'recurring' | 'leave';

type FormValues = {
  doctorId: string;
  mode: SlotMode;
  selectedDates: string[];
  leaveDates: string[];
  weekdays: string[];
  recurringStart: string;
  recurringEnd: string;
  fromHour: string;
  fromMinute: string;
  fromMeridiem: Meridiem;
  toHour: string;
  toMinute: string;
  toMeridiem: Meridiem;
  consultationType: ConsultationChoice;
  duration: string;
  inPersonFee: string;
  videoFee: string;
  hideFee: boolean;
  requirePayment: boolean;
};

type FormErrors = Partial<
  Record<
    | 'doctorId'
    | 'dates'
    | 'weekdays'
    | 'dateRange'
    | 'time'
    | 'inPersonFee'
    | 'videoFee',
    string
  >
>;

const initialValues: FormValues = {
  doctorId: 'anusri',
  mode: 'specific',
  selectedDates: [],
  leaveDates: [],
  weekdays: [],
  recurringStart: '',
  recurringEnd: '',
  fromHour: '09',
  fromMinute: '00',
  fromMeridiem: 'AM',
  toHour: '05',
  toMinute: '00',
  toMeridiem: 'PM',
  consultationType: 'in-person',
  duration: '10',
  inPersonFee: '',
  videoFee: '',
  hideFee: false,
  requirePayment: false,
};

const modes: { id: SlotMode; label: string }[] = [
  { id: 'specific', label: 'Specific Date' },
  { id: 'recurring', label: 'Recurring Days' },
  { id: 'leave', label: 'Leave' },
];

const breadcrumbItems = [
  { label: 'Dashboard', href: projectRoutes.dashboard },
  { label: 'Availability List', href: projectRoutes.availability },
  { label: 'Add Availability' },
];

const backAction = (
  <Button
    className="page-action"
    variant="outlined"
    component={Link}
    href={projectRoutes.availability}
    startIcon={<ArrowBackIcon fontSize="small" />}
  >
    Back to List
  </Button>
);

const toIsoDate = (date: Date) => {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
};

const toMinutes = (hour: string, minute: string, meridiem: Meridiem) => {
  let value = Number(hour) % 12;
  if (meridiem === 'PM') value += 12;
  return value * 60 + Number(minute);
};

const feeOk = (value: string) => {
  const amount = Number(value.replace(/,/g, '').trim());
  return value.trim() !== '' && Number.isFinite(amount) && amount > 0;
};

const validate = (values: FormValues): FormErrors => {
  const errors: FormErrors = {};

  if (!values.doctorId) errors.doctorId = 'Select a doctor.';
  if (values.mode === 'specific' && values.selectedDates.length === 0) {
    errors.dates = 'Select at least one date.';
  }
  if (values.mode === 'leave' && values.leaveDates.length === 0) {
    errors.dates = 'Select at least one leave date.';
  }
  if (values.mode === 'recurring' && values.weekdays.length === 0) {
    errors.weekdays = 'Select at least one day.';
  }
  if (
    values.mode === 'recurring' &&
    values.recurringStart &&
    values.recurringEnd &&
    values.recurringEnd < values.recurringStart
  ) {
    errors.dateRange = 'End date must be on or after the start date.';
  }

  const start = toMinutes(
    values.fromHour,
    values.fromMinute,
    values.fromMeridiem,
  );
  const end = toMinutes(values.toHour, values.toMinute, values.toMeridiem);
  if (end <= start) errors.time = 'End time must be after the start time.';

  if (
    (values.consultationType === 'in-person' ||
      values.consultationType === 'both') &&
    !feeOk(values.inPersonFee)
  ) {
    errors.inPersonFee = 'Enter the in-person consultation fee.';
  }
  if (
    (values.consultationType === 'video' ||
      values.consultationType === 'both') &&
    !feeOk(values.videoFee)
  ) {
    errors.videoFee = 'Enter the video consultation fee.';
  }

  return errors;
};

const toggleValue = (items: string[], value: string) =>
  items.includes(value)
    ? items.filter((item) => item !== value)
    : [...items, value];

export default function ManageAvailabilityPage() {
  const router = useRouter();
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [visibleMonth, setVisibleMonth] = useState(() => new Date(2026, 9, 1));
  const [todayIso, setTodayIso] = useState('');

  useEffect(() => {
    setTodayIso(toIsoDate(new Date()));
  }, []);

  const patch = (partial: Partial<FormValues>) => {
    setValues((current) => ({ ...current, ...partial }));
    setErrors({});
  };

  const goBack = () => router.push(projectRoutes.availability);

  const handleSave = () => {
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    goBack();
  };

  const handleToggleDate = (iso: string) => {
    if (values.mode === 'leave') {
      patch({ leaveDates: toggleValue(values.leaveDates, iso) });
      return;
    }
    patch({ selectedDates: toggleValue(values.selectedDates, iso) });
  };

  return (
    <ManageAvailabilityWrapper>
      <PageBreadcrumb items={breadcrumbItems} action={backAction} />

      <Box className="form-card">
        <Typography component="p" className="card-title">
          Select Doctor
        </Typography>
        <Select
          className="field-select"
          fullWidth
          displayEmpty
          value={values.doctorId}
          onChange={(event) => patch({ doctorId: event.target.value })}
        >
          <MenuItem value="">Select doctor</MenuItem>
          {availabilityDoctors.map((doctor) => (
            <MenuItem key={doctor.id} value={doctor.id}>
              {doctor.name}
            </MenuItem>
          ))}
        </Select>
        {errors.doctorId ? (
          <Typography component="p" className="field-error">
            {errors.doctorId}
          </Typography>
        ) : null}
      </Box>

      <Box className="form-card">
        <Typography component="p" className="card-title">
          Availability Slot
        </Typography>
        <Box
          className="mode-switch"
          role="tablist"
          aria-label="Availability slot mode"
        >
          {modes.map((mode) => (
            <Box
              key={mode.id}
              component="button"
              type="button"
              role="tab"
              aria-selected={values.mode === mode.id}
              className={`mode-btn${values.mode === mode.id ? ' active' : ''}`}
              onClick={() => patch({ mode: mode.id })}
            >
              {mode.label}
            </Box>
          ))}
        </Box>

        {values.mode === 'recurring' ? (
          <RecurringDaysFields
            weekdays={values.weekdays}
            startDate={values.recurringStart}
            endDate={values.recurringEnd}
            dayError={errors.weekdays}
            rangeError={errors.dateRange}
            onToggleDay={(day) =>
              patch({ weekdays: toggleValue(values.weekdays, day) })
            }
            onStartChange={(recurringStart) => patch({ recurringStart })}
            onEndChange={(recurringEnd) => patch({ recurringEnd })}
          />
        ) : (
          <AvailabilityCalendar
            mode={values.mode}
            visibleMonth={visibleMonth}
            selectedDates={values.selectedDates}
            leaveDates={values.leaveDates}
            todayIso={todayIso}
            error={errors.dates}
            onMonthChange={setVisibleMonth}
            onToggleDate={handleToggleDate}
          />
        )}
      </Box>

      <AvailabilityFormFields
        from={{
          hour: values.fromHour,
          minute: values.fromMinute,
          meridiem: values.fromMeridiem,
        }}
        to={{
          hour: values.toHour,
          minute: values.toMinute,
          meridiem: values.toMeridiem,
        }}
        consultationType={values.consultationType}
        duration={values.duration}
        inPersonFee={values.inPersonFee}
        videoFee={values.videoFee}
        hideFee={values.hideFee}
        requirePayment={values.requirePayment}
        timeError={errors.time}
        inPersonFeeError={errors.inPersonFee}
        videoFeeError={errors.videoFee}
        onFromChange={(next) =>
          patch({
            fromHour: next.hour ?? values.fromHour,
            fromMinute: next.minute ?? values.fromMinute,
            fromMeridiem: next.meridiem ?? values.fromMeridiem,
          })
        }
        onToChange={(next) =>
          patch({
            toHour: next.hour ?? values.toHour,
            toMinute: next.minute ?? values.toMinute,
            toMeridiem: next.meridiem ?? values.toMeridiem,
          })
        }
        onConsultationChange={(consultationType) => patch({ consultationType })}
        onDurationChange={(duration) => patch({ duration })}
        onInPersonFeeChange={(inPersonFee) => patch({ inPersonFee })}
        onVideoFeeChange={(videoFee) => patch({ videoFee })}
        onHideFeeChange={(hideFee) => patch({ hideFee })}
        onRequirePaymentChange={(requirePayment) => patch({ requirePayment })}
      />

      <Box className="form-footer">
        <Button className="footer-btn" variant="outlined" onClick={goBack}>
          Cancel
        </Button>
        <Button
          className="footer-btn save-btn"
          variant="contained"
          disableElevation
          onClick={handleSave}
        >
          Save
        </Button>
      </Box>
    </ManageAvailabilityWrapper>
  );
}
