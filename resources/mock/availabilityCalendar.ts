import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { availabilitySlots, type AvailabilityRecord } from './availability';

dayjs.extend(customParseFormat);

export type CalendarSlot = {
  id: string;
  label: string;
  status: 'open' | 'booked';
  video: boolean;
  inPerson: boolean;
};

export type CalendarDay = {
  iso: string;
  day: number;
  inMonth: boolean;
  isLeave: boolean;
  slots: CalendarSlot[];
};

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const bookedKeys = new Set([
  '2026-10-16|9:00 AM',
  '2026-10-16|9:05 AM',
  '2026-10-16|9:10 AM',
  '2026-10-16|9:20 AM',
  '2026-10-18|9:15 AM',
  '2026-10-20|10:00 AM',
  '2026-10-22|9:30 AM',
  '2026-10-23|11:00 AM',
  '2026-10-24|9:00 AM',
  '2026-10-24|9:05 AM',
  '2026-10-12|2:00 PM',
]);

const toMinutes = (label: string) => {
  const parsed = dayjs(label, 'h:mm A');
  return parsed.hour() * 60 + parsed.minute();
};

const toLabel = (minutes: number) => dayjs().startOf('day').add(minutes, 'minute').format('h:mm A');

const buildSlots = (record: AvailabilityRecord, iso: string): CalendarSlot[] => {
  const start = toMinutes(record.fromTime);
  const end = toMinutes(record.toTime);
  const slots: CalendarSlot[] = [];
  for (let cursor = start; cursor + record.durationMinutes <= end; cursor += record.durationMinutes) {
    const label = toLabel(cursor);
    slots.push({
      id: `${iso}-${label}`,
      label: `${label} - ${toLabel(cursor + record.durationMinutes)}`,
      status: bookedKeys.has(`${iso}|${label}`) ? 'booked' : 'open',
      video: record.consultationType !== 'in-person',
      inPerson: record.consultationType !== 'video',
    });
  }
  return slots;
};

export const buildCalendarMonth = (month: Date, doctorId: string): CalendarDay[] => {
  const records = availabilitySlots.filter((row) => row.doctorId === doctorId);
  const start = dayjs(month).startOf('month');
  const gridStart = start.subtract(start.day(), 'day');
  return Array.from({ length: 42 }, (_, index) => {
    const date = gridStart.add(index, 'day');
    const iso = date.format('YYYY-MM-DD');
    const leave = records.some((row) => row.dateMode === 'leave' && row.dates.includes(iso));
    const specific = records.find((row) => row.dateMode === 'specific' && row.dates.includes(iso));
    const recurring = records.find(
      (row) => row.dateMode === 'recurring' && row.weekdays.includes(WEEKDAYS[date.day()]),
    );
    const source = specific ?? recurring;
    return {
      iso,
      day: date.date(),
      inMonth: date.month() === start.month(),
      isLeave: leave,
      slots: leave || !source ? [] : buildSlots(source, iso),
    };
  });
};
