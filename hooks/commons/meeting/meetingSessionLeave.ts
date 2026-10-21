type TLeaveHandler = () => Promise<void> | void;

let leaveHandler: TLeaveHandler | null = null;

export const registerLeaveHandler = (handler: TLeaveHandler | null) => {
  leaveHandler = handler;
};

export const triggerMeetingLeave = async () => {
  if (leaveHandler) {
    await leaveHandler();
  }
};
