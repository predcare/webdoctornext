export type TCallState =
  | 'IDLE'
  | 'INITIALIZING'
  | 'CONNECTING'
  | 'WAITING_FOR_PATIENT'
  | 'CONNECTED'
  | 'RECONNECTING'
  | 'DISCONNECTED'
  | 'ERROR'
  | 'ENDED';

export interface IMeetingPatientInfo {
  id: string;
  userId?: string;
  name: string;
  alphanumericId?: string;
  age?: number | string;
  gender?: string;
  profileImage?: string;
  complaint?: string;
  dateOfBirth?: string;
  bloodType?: string;
  phone?: string;
  email?: string;
}

export interface IMeetingSessionData {
  token: string;
  meetingId: string;
  appointmentId: string | number;
  appointmentGeneratedId?: string;
  patient: IMeetingPatientInfo;
  startTime?: string;
  endTime?: string;
  slotDurationMinutes?: number;
  callElapsedSeconds?: number;
}
