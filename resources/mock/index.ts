export { getAppointmentDetails } from './appointmentDetails';
export type {
  AppointmentClinic,
  AppointmentDetails,
  AppointmentPrescription,
  PaymentStatus,
} from './appointmentDetails';
export { appointmentToday, dashboardAppointments } from './appointments';
export type {
  AppointmentStatus,
  AppointmentVisitType,
  DashboardAppointment,
} from './appointments';

export { buildCalendarMonth } from './availabilityCalendar';
export type { CalendarDay, CalendarSlot } from './availabilityCalendar';
export { clinics } from './clinics';
export type { Clinic } from './clinics';
export { dashboardStats } from './dashboardStats';
export type {
  DashboardStat,
  DashboardStatIcon,
  DashboardStatTone,
} from './dashboardStats';
export { cities, countries, getCities, getStates, states } from './locations';
export type { City, Country, State } from './locations';
export { notifications } from './notifications';
export type { NotificationItem } from './notifications';
export { getPatientAppointments, getPatientDetails } from './patientDetails';
export type { PatientDetails } from './patientDetails';
export { patients } from './patients';
export type { Patient, PatientGender, PatientStatus } from './patients';
