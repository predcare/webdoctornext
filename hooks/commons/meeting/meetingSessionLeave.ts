import { projectRoutes } from '@/routes';
import { useMeetingStore } from '@/zustand/stores/useMeetingStore';

type TLeaveHandler = () => Promise<void> | void;

let leaveHandler: TLeaveHandler | null = null;

export const registerLeaveHandler = (handler: TLeaveHandler | null) => {
  leaveHandler = handler;
};

export const triggerMeetingLeave = async () => {
  if (!leaveHandler) {
    throw new Error('No active meeting session');
  }
  await leaveHandler();
};

export const meetingSummaryPath = (appointmentId: string | number | null) => {
  if (!appointmentId) {
    return projectRoutes.appointments;
  }
  return `/dashboard/meeting/summary?appointmentId=${appointmentId}`;
};

export const resetMeetingAndGetSummaryPath = () => {
  const appointmentId = useMeetingStore.getState().appointmentId;
  useMeetingStore.getState().resetMeetingStore();
  return meetingSummaryPath(appointmentId);
};
