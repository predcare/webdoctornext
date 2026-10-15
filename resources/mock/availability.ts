export type AvailabilityDateMode = 'specific' | 'recurring' | 'leave';

export type AvailabilityConsultation = 'in-person' | 'video' | 'both';

export type AvailabilityDoctor = {
  id: string;
  name: string;
};

export type AvailabilityRecord = {
  id: string;
  doctorId: string;
  dateMode: AvailabilityDateMode;
  dates: string[];
  weekdays: string[];
  fromTime: string;
  toTime: string;
  durationMinutes: number;
  consultationType: AvailabilityConsultation;
  inPersonFee: string | null;
  videoFee: string | null;
};

export const availabilityDoctors: AvailabilityDoctor[] = [
  { id: 'anusri', name: 'Dr. Anusri Predsolution' },
  { id: 'mehra', name: 'Dr. Rahul Mehra' },
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const formatAvailabilityDate = (iso: string) => {
  const [, month, day] = iso.split('-');
  const monthIndex = Number(month) - 1;
  if (!day || monthIndex < 0 || monthIndex > 11) return iso;
  return `${Number(day)} ${MONTHS[monthIndex]}`;
};

export const availabilitySlots: AvailabilityRecord[] = [
  {
    id: 'avail-specific',
    doctorId: 'anusri',
    dateMode: 'specific',
    dates: [
      '2026-10-12',
      '2026-10-13',
      '2026-10-14',
      '2026-10-15',
      '2026-10-16',
      '2026-10-17',
      '2026-10-18',
      '2026-10-19',
      '2026-10-20',
      '2026-10-21',
      '2026-10-22',
      '2026-10-23',
      '2026-10-24',
    ],
    weekdays: [],
    fromTime: '9:00 AM',
    toTime: '5:00 PM',
    durationMinutes: 5,
    consultationType: 'both',
    inPersonFee: '500.00',
    videoFee: '1,000.00',
  },
  {
    id: 'avail-recurring',
    doctorId: 'anusri',
    dateMode: 'recurring',
    dates: [],
    weekdays: ['Mon', 'Wed', 'Fri'],
    fromTime: '10:00 AM',
    toTime: '1:00 PM',
    durationMinutes: 15,
    consultationType: 'in-person',
    inPersonFee: '700.00',
    videoFee: null,
  },
  {
    id: 'avail-leave',
    doctorId: 'anusri',
    dateMode: 'leave',
    dates: ['2026-10-26', '2026-10-27'],
    weekdays: [],
    fromTime: '9:00 AM',
    toTime: '6:00 PM',
    durationMinutes: 10,
    consultationType: 'video',
    inPersonFee: null,
    videoFee: '800.00',
  },
  {
    id: 'avail-mehra',
    doctorId: 'mehra',
    dateMode: 'specific',
    dates: ['2026-10-18', '2026-10-19'],
    weekdays: [],
    fromTime: '2:00 PM',
    toTime: '6:00 PM',
    durationMinutes: 20,
    consultationType: 'in-person',
    inPersonFee: '600.00',
    videoFee: null,
  },
];
