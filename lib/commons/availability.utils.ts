import dayjs from 'dayjs';
import {
  IDocBookingAvailRoot,
  IDocBookingAvailSlot,
  IMyAvailabilityDoc,
  ITimeSlotsDoc,
} from '../../typescripts/interfaces/availability.interfaces';
import type { TAvailabilityFormValues } from '../schemas/availability.schema';

export type TimeValue = {
  hour: string;
  minute: string;
  period: 'AM' | 'PM';
};

export const DAYS_OF_WEEK = [
  { key: 'monday', label: 'Mon' },
  { key: 'tuesday', label: 'Tue' },
  { key: 'wednesday', label: 'Wed' },
  { key: 'thursday', label: 'Thu' },
  { key: 'friday', label: 'Fri' },
  { key: 'saturday', label: 'Sat' },
  { key: 'sunday', label: 'Sun' },
];

const MONTH_LABELS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const formatAvailabilityDate = (iso: string) => {
  const [, month, day] = iso.split('-');
  const monthIndex = Number(month) - 1;
  if (!day || monthIndex < 0 || monthIndex > 11) return iso;
  return `${Number(day)} ${MONTH_LABELS[monthIndex]}`;
};

export const parseTimeStringToTimeValue = (
  timeStr?: string | null,
): TimeValue => {
  if (!timeStr) return { hour: '09', minute: '00', period: 'AM' };
  const trimmed = timeStr.trim();
  const parts = trimmed.split(':');
  let h = parseInt(parts[0], 10) || 9;
  const m = parts[1] || '00';
  const period: 'AM' | 'PM' = h >= 12 ? 'PM' : 'AM';
  if (h === 0) h = 12;
  else if (h > 12) h -= 12;
  const hourStr = String(h).padStart(2, '0');
  return { hour: hourStr, minute: m, period };
};

export const formatTimeValueToHHMM = (tv: TimeValue): string => {
  if (!tv) return '09:00';
  let h = parseInt(tv.hour, 10) || 9;
  if (tv.period === 'PM' && h < 12) h += 12;
  if (tv.period === 'AM' && h === 12) h = 0;
  const hh = String(h).padStart(2, '0');
  const mm = String(tv.minute || '00').padStart(2, '0');
  return `${hh}:${mm}`;
};

export const defaultAvailabilityFormValues: TAvailabilityFormValues = {
  editorTab: 'specific',
  selectedDates: [],
  recurringDays: [],
  startDate: null,
  endDate: null,
  leaveDates: [],
  fromTime: { hour: '09', minute: '00', period: 'AM' },
  toTime: { hour: '05', minute: '00', period: 'PM' },
  consultationType: 'in-person',
  slotDuration: 30,
  inPersonFee: '',
  videoFee: '',
  hideFee: false,
  requirePayment: false,
};

export const mapAvailabilityToFormValues = (
  doc: IMyAvailabilityDoc,
): TAvailabilityFormValues => ({
  editorTab:
    doc.date_selection_mode === 'recurring' ||
    doc.date_selection_mode === 'leave' ||
    doc.date_selection_mode === 'specific'
      ? doc.date_selection_mode
      : 'specific',
  selectedDates: doc.selected_dates || [],
  recurringDays: doc.recurring_days || [],
  startDate: doc.recurring_start_date
    ? dayjs(doc.recurring_start_date).format('YYYY-MM-DD')
    : null,
  endDate: doc.recurring_end_date
    ? dayjs(doc.recurring_end_date).format('YYYY-MM-DD')
    : null,
  leaveDates: doc.leave_dates || [],
  fromTime: parseTimeStringToTimeValue(doc.from_time),
  toTime: parseTimeStringToTimeValue(doc.to_time),
  consultationType:
    doc.consultation_type === 'video' ||
    doc.consultation_type === 'both' ||
    doc.consultation_type === 'in-person'
      ? doc.consultation_type
      : 'in-person',
  slotDuration: doc.slot_duration || 30,
  inPersonFee: doc.in_person_fee ? String(doc.in_person_fee) : '',
  videoFee: doc.video_fee ? String(doc.video_fee) : '',
  hideFee: Boolean(doc.hide_fee),
  requirePayment: Boolean(doc.require_payment),
});

export const buildAvailabilityPayload = (
  data: TAvailabilityFormValues,
  {
    clinicId,
    editingSlot,
  }: { clinicId?: number | string; editingSlot?: IMyAvailabilityDoc | null },
) => {
  let inPersonFee = 0;
  let videoFee = 0;

  if (data.consultationType === 'in-person') {
    inPersonFee = parseFloat(data.inPersonFee) || 0;
  } else if (data.consultationType === 'video') {
    videoFee = parseFloat(data.videoFee) || 0;
  } else if (data.consultationType === 'both') {
    inPersonFee = parseFloat(data.inPersonFee) || 0;
    videoFee = parseFloat(data.videoFee) || 0;
  }

  const targetMode =
    data.editorTab === 'leave'
      ? (editingSlot?.date_selection_mode as string) ||
        (data.recurringDays && data.recurringDays.length > 0
          ? 'recurring'
          : 'specific')
      : data.editorTab;

  return {
    clinic_id: clinicId || '',
    date_selection_mode: targetMode,
    selected_dates: data.selectedDates || [],
    recurring_days: data.recurringDays || [],
    recurring_start_date:
      data.startDate && data.startDate.trim() !== '' ? data.startDate : null,
    recurring_end_date:
      data.endDate && data.endDate.trim() !== '' ? data.endDate : null,
    leave_dates: data.leaveDates || [],
    slot_duration: Number(data.slotDuration),
    from_time: formatTimeValueToHHMM(data.fromTime),
    to_time: formatTimeValueToHHMM(data.toTime),
    consultation_type: data.consultationType,
    in_person_fee: inPersonFee,
    video_fee: videoFee,
    hide_fee: Boolean(data.hideFee),
    require_payment: Boolean(data.requirePayment),
    status: true,
  };
};

export interface ParsedAvailableDate {
  date: string;
  formattedDate: string;
  relativeLabel: string;
  in_person_fee: number;
  video_fee: number;
  consultation_type: string;
  clinic_id: number | string;
  availability_id?: number | string;
}

export type SlotPeriod = 'MORNING' | 'AFTERNOON' | 'EVENING' | 'NIGHT';

export const PERIOD_ORDER: SlotPeriod[] = [
  'MORNING',
  'AFTERNOON',
  'EVENING',
  'NIGHT',
];

export interface ISlotItem {
  start: string;
  end: string;
  displayTime: string;
  period: SlotPeriod;
  booked: boolean;
  availability_id?: string | number;
}

export function formatTime12h(timeStr: string): string {
  if (!timeStr) return '';
  const parts = timeStr.split(':');
  const hour = parseInt(parts[0], 10);
  const minutes = parts[1] || '00';
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
}

export function getSlotPeriod(startTimeStr: string): SlotPeriod {
  if (!startTimeStr) return 'MORNING';
  const hour = parseInt(startTimeStr.split(':')[0], 10);
  if (hour < 12) return 'MORNING';
  if (hour < 16) return 'AFTERNOON';
  if (hour < 20) return 'EVENING';
  return 'NIGHT';
}

export function groupSlotsByPeriod(
  timeSlots: { start: string; end: string }[] = [],
  bookedSlotsMap: Record<string, string[]> = {},
  selectedDate: string = '',
): Record<SlotPeriod, ISlotItem[]> {
  const result: Record<SlotPeriod, ISlotItem[]> = {
    MORNING: [],
    AFTERNOON: [],
    EVENING: [],
    NIGHT: [],
  };

  if (!timeSlots || timeSlots.length === 0) {
    return result;
  }

  const bookedList = (selectedDate && bookedSlotsMap[selectedDate]) || [];
  const bookedSet = new Set(bookedList);
  const now = dayjs();

  timeSlots.forEach((slot) => {
    if (selectedDate) {
      const slotTimeStr = slot.start.includes('T')
        ? slot.start
        : `${selectedDate}T${slot.start}`;
      const slotTime = dayjs(slotTimeStr);

      if (slotTime.isValid() && slotTime.isBefore(now)) {
        return;
      }
    }

    const period = getSlotPeriod(slot.start);
    const isBooked = bookedSet.has(slot.start);
    const startFormatted = formatTime12h(slot.start);
    const endFormatted = formatTime12h(slot.end);

    result[period].push({
      start: slot.start,
      end: slot.end,
      displayTime: `${startFormatted} - ${endFormatted}`,
      period,
      booked: isBooked,
    });
  });

  return result;
}

export function parseDoctorAvailableDates(
  availability?: IMyAvailabilityDoc | null,
  referenceDateStr?: string,
): ParsedAvailableDate[] {
  if (!availability) return [];

  const isRecurring = availability.date_selection_mode === 'recurring';
  const rawDates: string[] = isRecurring
    ? availability.recurring_dates || []
    : availability.selected_dates || [];

  const leaveSet = new Set(availability.leave_dates || []);

  const ref = referenceDateStr ? dayjs(referenceDateStr) : dayjs();
  const today = ref.startOf('day');

  const validDates = rawDates.filter((d) => {
    if (!d || leaveSet.has(d)) return false;
    const dateObj = dayjs(d).startOf('day');
    return !dateObj.isBefore(today);
  });

  const inPersonFee = parseFloat(String(availability.in_person_fee || 0)) || 0;
  const videoFee = parseFloat(String(availability.video_fee || 0)) || 0;

  return validDates.map((dateStr) => {
    const d = dayjs(dateStr).startOf('day');

    const formattedDate = d.format('ddd, MMM DD');

    const diffDays = d.diff(today, 'day');
    let relativeLabel = '';
    if (diffDays === 0) {
      relativeLabel = 'Today';
    } else if (diffDays === 1) {
      relativeLabel = 'Tomorrow';
    } else if (diffDays === 2) {
      relativeLabel = 'In 2 days';
    } else {
      relativeLabel = `In ${diffDays} days`;
    }

    return {
      date: dateStr,
      formattedDate,
      relativeLabel,
      in_person_fee: inPersonFee,
      video_fee: videoFee,
      consultation_type: availability.consultation_type || 'both',
      clinic_id: availability.clinic_id,
      availability_id: availability.id,
    };
  });
}

export function parseBookingAvailableDates(
  bookingAvail?: IDocBookingAvailRoot | null,
  referenceDateStr?: string,
): ParsedAvailableDate[] {
  if (!bookingAvail || !bookingAvail.dates || bookingAvail.dates.length === 0)
    return [];

  const ref = referenceDateStr ? dayjs(referenceDateStr) : dayjs();
  const today = ref.startOf('day');

  return bookingAvail.dates
    .filter((item) => item && item.date)
    .map((item) => {
      const d = dayjs(item.date).startOf('day');
      const formattedDate = d.format('ddd, MMM DD');
      const diffDays = d.diff(today, 'day');
      let relativeLabel = '';
      if (diffDays === 0) {
        relativeLabel = 'Today';
      } else if (diffDays === 1) {
        relativeLabel = 'Tomorrow';
      } else if (diffDays === 2) {
        relativeLabel = 'In 2 days';
      } else if (diffDays > 2) {
        relativeLabel = `In ${diffDays} days`;
      }

      const firstSlot =
        item.slots && item.slots.length > 0 ? item.slots[0] : null;
      const inPersonFee = firstSlot
        ? parseFloat(String(firstSlot.in_person_fee || 0)) || 0
        : 0;
      const videoFee = firstSlot
        ? parseFloat(String(firstSlot.video_fee || 0)) || 0
        : 0;
      const consultationType = firstSlot?.consultation_type || 'both';

      return {
        date: item.date,
        formattedDate,
        relativeLabel,
        in_person_fee: inPersonFee,
        video_fee: videoFee,
        consultation_type: consultationType,
        clinic_id: bookingAvail.clinic_id,
        availability_id: firstSlot?.availability_id,
      };
    });
}

export function groupBookingSlotsByPeriod(
  slots: IDocBookingAvailSlot[] = [],
  selectedDate: string = '',
): Record<SlotPeriod, ISlotItem[]> {
  const result: Record<SlotPeriod, ISlotItem[]> = {
    MORNING: [],
    AFTERNOON: [],
    EVENING: [],
    NIGHT: [],
  };

  if (!slots || slots.length === 0) {
    return result;
  }

  const now = dayjs();

  slots.forEach((slot) => {
    if (selectedDate) {
      const slotTimeStr = slot.start.includes('T')
        ? slot.start
        : `${selectedDate}T${slot.start}`;
      const slotTime = dayjs(slotTimeStr);

      if (slotTime.isValid() && slotTime.isBefore(now)) {
        return;
      }
    }

    const period = getSlotPeriod(slot.start);
    const startFormatted = formatTime12h(slot.start);
    const endFormatted = formatTime12h(slot.end);

    result[period].push({
      start: slot.start,
      end: slot.end,
      displayTime: `${startFormatted} - ${endFormatted}`,
      period,
      booked: !!slot.booked,
    });
  });

  return result;
}

export function groupTimingSlotsByPeriod(
  slots: ITimeSlotsDoc[] = [],
): Record<SlotPeriod, ISlotItem[]> {
  const result: Record<SlotPeriod, ISlotItem[]> = {
    MORNING: [],
    AFTERNOON: [],
    EVENING: [],
    NIGHT: [],
  };

  slots.forEach((slot) => {
    const period = getSlotPeriod(slot.from);
    const booked =
      slot.is_available === false ||
      slot.is_past === true ||
      (!!slot.status && slot.status.toLowerCase() !== 'available');

    result[period].push({
      start: slot.from,
      end: slot.to,
      displayTime: `${formatTime12h(slot.from)} - ${formatTime12h(slot.to)}`,
      period,
      booked,
      availability_id: slot.availability_id,
    });
  });

  return result;
}

export const normalizeAvailableDates = (dates: string[] = []): string[] => {
  const today = dayjs().startOf('day');
  return [...new Set(dates)]
    .filter((d) => {
      const parsed = dayjs(d);
      return parsed.isValid() && !parsed.startOf('day').isBefore(today);
    })
    .sort();
};

export const getRelativeDayLabel = (date: string): string => {
  const diffDays = dayjs(date)
    .startOf('day')
    .diff(dayjs().startOf('day'), 'day');
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays === -1) return 'Yesterday';
  if (diffDays > 1) return `In ${diffDays} days`;
  return `${Math.abs(diffDays)} days ago`;
};

export const normalizeApiTime = (time?: string | null): string => {
  if (!time) return '';
  const s = String(time).trim();
  return s.length === 5 ? `${s}:00` : s;
};

export const areSlotsConsecutive = (slots: ISlotItem[]): boolean => {
  if (slots.length <= 1) return true;
  const sorted = [...slots].sort((a, b) => a.start.localeCompare(b.start));
  for (let i = 0; i < sorted.length - 1; i++) {
    if (sorted[i].end !== sorted[i + 1].start) {
      return false;
    }
  }
  return true;
};
