export { appointmentToday, dashboardAppointments } from './appointments';
export type { AppointmentStatus, AppointmentVisitType, DashboardAppointment } from './appointments';
export { getAppointmentDetails } from './appointmentDetails';
export type {
  AppointmentClinic,
  AppointmentDetails,
  AppointmentPrescription,
  PaymentStatus,
} from './appointmentDetails';
export { patients } from './patients';
export type { Patient, PatientGender, PatientStatus } from './patients';
export { cities, countries, getCities, getStates, states } from './locations';
export type { City, Country, State } from './locations';
export { dashboardStats } from './dashboardStats';
export type { DashboardStat, DashboardStatIcon, DashboardStatTone } from './dashboardStats';
export { clinics } from './clinics';
export type { Clinic } from './clinics';
export { notifications } from './notifications';
export type { NotificationItem } from './notifications';
