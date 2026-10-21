export const SocketEvents = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  CONNECT_ERROR: 'connect_error',
  HEARTBEAT: 'HEARTBEAT',
  INCOMING_CALL: 'incoming_call',
  INCOMING_CALL_CANCELLED: 'incoming_call_cancelled',
  CALL_CONNECTED: 'call_connected',
  TIME_UP_VIDEO_CALL_ENDED: 'time_up_video_call_ended',
  VIDEO_CALL_ENDED: 'video_call_ended',
} as const;

export type SocketEventType = (typeof SocketEvents)[keyof typeof SocketEvents];
