import { IBaseApiRoot } from '@/typescripts/interfaces/axios.interfaces';
import { AxiosError, AxiosResponse, isAxiosError } from 'axios';
import eventEmitter from '../services/event.emitter';
import events from '../services/events/events';

export const globalSuccess = (response: AxiosResponse<IBaseApiRoot>) => {
  let message = 'Something went wrong (Internal Server Error 502)';
  if (response?.data?.message) {
    message = response?.data.message;
  }
  eventEmitter.emit(events.showToast, {
    message,
    options: { variant: 'success' },
  });
};

export const globalWarning = (response: AxiosResponse<IBaseApiRoot>) => {
  let message = 'Something went wrong (Internal Server Error 502)';
  if (response?.data?.message) {
    message = response?.data.message;
  }
  eventEmitter.emit(events.showToast, {
    message,
    options: { variant: 'warning' },
  });
};

export const globalError = (error: AxiosError<IBaseApiRoot>) => {
  let message = 'Something went wrong (Internal Server Error 502)';
  if (error.response?.data?.message) {
    message = error.response?.data.message;
  }
  eventEmitter.emit(events.showToast, {
    message,
    options: { variant: 'error' },
  });
};

export const getApiErrorMessage = (
  error: unknown,
  fallback = 'Something went wrong. Please try again.',
): string => {
  if (isAxiosError<IBaseApiRoot>(error)) {
    if (error.response?.data?.message) return error.response.data.message;
    if (error.code === 'ERR_NETWORK') {
      return 'Network error. Check your connection and try again.';
    }
    if (error.response?.status === 404) {
      return 'The requested record was not found.';
    }
    if (error.response?.status === 403) {
      return 'You do not have access to this record.';
    }
  }
  if (error instanceof Error && error.message) return error.message;
  return fallback;
};

export const getApiErrorStatus = (error: unknown) =>
  isAxiosError(error) ? error.response?.status : undefined;

export const cleanParams = (params: Record<string, unknown>) => {
  return Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== undefined && value !== null && value !== '',
    ),
  );
};
