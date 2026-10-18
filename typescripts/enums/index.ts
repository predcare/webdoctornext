export enum AppScreen {
  Splash = 'splash',
  Login = 'login',
  Dashboard = 'dashboard',
}

export enum NetworkRoot {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  ERR_NETWORK = 'ERR_NETWORK',
}
export enum ConsultType {
  VIDEO = 'video',
  IN_PERSON = 'in-person',
  CLINIC = 'clinic',
  INSTANT = 'instant',
}

export enum ConsultStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  NO_SHOW = 'no_show',
  IN_PROGRESS = 'in_progress',
  RESCHEDULED = 'rescheduled',
  NOT_RESCHEDULED = 'not_rescheduled',
}

export enum UserRoles {
  DOCTOR = 'doctor',
  PATIENT = 'patient',
}

export const AllProjectRoles = [UserRoles.DOCTOR, UserRoles.PATIENT] as const;

export enum DevMode {
  Production = 'production',
  Development = 'development',
}

export enum ThemeMode {
  Light = 'light',
  Dark = 'dark',
}

export type TLoginMode = 'mobile' | 'email';

export enum AvailabilityMode {
  Specific = 'specific',
  Recurring = 'recurring',
  Leave = 'leave',
}
