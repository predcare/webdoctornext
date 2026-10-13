export type AppointmentStatus = 'Scheduled' | 'Completed' | 'Cancelled';

export type DashboardAppointment = {
  id: string;
  name: string;
  initial: string;
  age: number;
  appointmentId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
};

export const dashboardAppointments: DashboardAppointment[] = [
  {
    id: 'apt-1042',
    name: 'Rahul Sharma',
    initial: 'R',
    age: 32,
    appointmentId: 'APT-1042',
    date: '13 Oct 2026',
    startTime: '10:00',
    endTime: '12:00',
    status: 'Scheduled',
  },
  {
    id: 'apt-1043',
    name: 'Meera Iyer',
    initial: 'M',
    age: 28,
    appointmentId: 'APT-1043',
    date: '13 Oct 2026',
    startTime: '12:30',
    endTime: '13:00',
    status: 'Completed',
  },
  {
    id: 'apt-1044',
    name: 'Arjun Patel',
    initial: 'A',
    age: 45,
    appointmentId: 'APT-1044',
    date: '13 Oct 2026',
    startTime: '14:00',
    endTime: '14:30',
    status: 'Cancelled',
  },
  {
    id: 'apt-1045',
    name: 'Nisha Rao',
    initial: 'N',
    age: 36,
    appointmentId: 'APT-1045',
    date: '14 Oct 2026',
    startTime: '09:00',
    endTime: '09:30',
    status: 'Scheduled',
  },
  {
    id: 'apt-1046',
    name: 'Vikram Singh',
    initial: 'V',
    age: 51,
    appointmentId: 'APT-1046',
    date: '14 Oct 2026',
    startTime: '11:00',
    endTime: '11:45',
    status: 'Scheduled',
  },
  {
    id: 'apt-1047',
    name: 'Ananya Das',
    initial: 'A',
    age: 24,
    appointmentId: 'APT-1047',
    date: '14 Oct 2026',
    startTime: '16:00',
    endTime: '16:30',
    status: 'Completed',
  },
];
