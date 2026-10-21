import {
  IMeetingPatientInfo,
  IMeetingSessionData,
  TCallState,
} from '@/typescripts/interfaces/meeting.interfaces';
import { create } from 'zustand';

interface IMeetingStoreState {
  token: string | null;
  meetingId: string | null;
  appointmentId: string | number | null;
  appointmentGeneratedId: string | null;
  patientInfo: IMeetingPatientInfo | null;
  startTime: string | null;
  endTime: string | null;
  remainingSeconds: number;
  totalDurationSeconds: number;
  callState: TCallState;
  errorMessage: string | null;
  isMicOn: boolean;
  isCameraOn: boolean;
  selectedVideoDeviceId: string | null;
  remoteParticipantId: string | null;
  isMiniPlayer: boolean;
  doctorNotes: string;

  // In-person appointment state
  apptIdforInPerson: string | null;
  patientIdforInPerson: string | null;
  patientNameforInPerson: string | null;
  statusforInPerson: string | null;

  // Actions
  setMeetingSession: (params: IMeetingSessionData) => void;
  setPatientInfo: (patient: IMeetingPatientInfo) => void;
  setCallState: (callState: TCallState) => void;
  setErrorState: (message?: string) => void;
  setMicState: (isMicOn: boolean) => void;
  setCameraState: (isCameraOn: boolean) => void;
  setSelectedVideoDeviceId: (deviceId: string | null) => void;
  setRemoteParticipantId: (id: string | null) => void;
  setRemainingSeconds: (seconds: number) => void;
  decrementRemainingSeconds: () => void;
  setIsMiniPlayer: (isMiniPlayer: boolean) => void;
  setDoctorNotes: (notes: string) => void;
  resetMeetingStore: () => void;
  clearInPersonAppointment: () => void;
  setInPersonAppointment: (params: {
    apptIdforInPerson?: string | null;
    patientIdforInPerson?: string | null;
    patientNameforInPerson?: string | null;
    statusforInPerson?: string | null;
  }) => void;
}

export const initialState = {
  token: null,
  meetingId: null,
  appointmentId: null,
  appointmentGeneratedId: null,
  patientInfo: null,
  startTime: null,
  endTime: null,
  remainingSeconds: 0,
  totalDurationSeconds: 0,
  callState: 'IDLE' as TCallState,
  errorMessage: null as string | null,
  isMicOn: true,
  isCameraOn: true,
  selectedVideoDeviceId: null,
  remoteParticipantId: null,
  isMiniPlayer: false,
  doctorNotes: '',
};

const initialInPersonState = {
  apptIdforInPerson: null as string | null,
  patientIdforInPerson: null as string | null,
  patientNameforInPerson: null as string | null,
  statusforInPerson: null as string | null,
};

export const useMeetingStore = create<IMeetingStoreState>((set) => ({
  ...initialState,
  ...initialInPersonState,

  setMeetingSession: ({
    token,
    meetingId,
    appointmentId,
    appointmentGeneratedId,
    patient,
    startTime,
    endTime,
    slotDurationMinutes = 30,
    callElapsedSeconds = 0,
  }) => {
    const totalSlotSeconds = (slotDurationMinutes || 30) * 60;
    const remaining = Math.max(0, totalSlotSeconds - (callElapsedSeconds || 0));

    set({
      token,
      meetingId,
      appointmentId: appointmentId ?? null,
      appointmentGeneratedId: appointmentGeneratedId ?? null,
      patientInfo: patient ?? null,
      startTime: startTime ?? null,
      endTime: endTime ?? null,
      totalDurationSeconds: totalSlotSeconds,
      remainingSeconds: remaining,
      callState: 'INITIALIZING',
      errorMessage: null,
      isMiniPlayer: false,
    });
  },

  setPatientInfo: (patientInfo) =>
    set((state) => ({
      patientInfo: {
        ...(state.patientInfo || {}),
        ...patientInfo,
      },
    })),

  setCallState: (callState) => set({ callState }),

  setErrorState: (message) =>
    set({
      callState: 'ERROR',
      errorMessage:
        message ||
        'Unable to connect to meeting. Token may be invalid or expired.',
    }),

  setMicState: (isMicOn) => set({ isMicOn }),

  setCameraState: (isCameraOn) => set({ isCameraOn }),

  setSelectedVideoDeviceId: (selectedVideoDeviceId) =>
    set({ selectedVideoDeviceId }),

  setRemoteParticipantId: (remoteParticipantId) =>
    set((state) => ({
      remoteParticipantId,
      callState:
        state.callState === 'ERROR' || state.callState === 'ENDED'
          ? state.callState
          : remoteParticipantId
            ? 'CONNECTED'
            : 'WAITING_FOR_PATIENT',
    })),

  setRemainingSeconds: (remainingSeconds) => set({ remainingSeconds }),

  decrementRemainingSeconds: () =>
    set((state) => ({
      remainingSeconds: Math.max(0, state.remainingSeconds - 1),
    })),

  setIsMiniPlayer: (isMiniPlayer) => set({ isMiniPlayer }),

  setDoctorNotes: (doctorNotes) => set({ doctorNotes }),

  resetMeetingStore: () => set({ ...initialState }),
  clearInPersonAppointment: () =>
    set({
      apptIdforInPerson: null,
      patientIdforInPerson: null,
      patientNameforInPerson: null,
      statusforInPerson: null,
    }),

  setInPersonAppointment: ({
    apptIdforInPerson,
    patientIdforInPerson,
    patientNameforInPerson,
    statusforInPerson,
  }) =>
    set({
      apptIdforInPerson: apptIdforInPerson ?? null,
      patientIdforInPerson: patientIdforInPerson ?? null,
      patientNameforInPerson: patientNameforInPerson ?? null,
      statusforInPerson: statusforInPerson ?? null,
    }),
}));
