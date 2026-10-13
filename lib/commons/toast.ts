import { toast } from 'sonner';

interface IToastOptions {
  description?: string;
  duration?: number;
  icon?: string;
}

export const showSuccessToast = (message: string, options?: IToastOptions) => {
  toast.success(
    options?.description ? `${message}\n${options.description}` : message,
    {
      duration: options?.duration ?? 2000,
      icon: options?.icon ?? '✅',
    },
  );
};

export const showErrorToast = (message: string, options?: IToastOptions) => {
  toast.error(
    options?.description ? `${message}\n${options.description}` : message,
    {
      duration: options?.duration ?? 2000,
      icon: options?.icon ?? '❌',
    },
  );
};

export const showInfoToast = (message: string, options?: IToastOptions) => {
  toast.info(
    options?.description ? `${message}\n${options.description}` : message,
    {
      duration: options?.duration ?? 2000,
      icon: options?.icon ?? 'ℹ️',
    },
  );
};

export const showWarningToast = (message: string, options?: IToastOptions) => {
  toast.warning(
    options?.description
      ? `⚠️ ${message}\n${options.description}`
      : `⚠️ ${message}`,
    {
      duration: options?.duration ?? 2000,
      icon: options?.icon ?? '⚠️',
    },
  );
};

export const showInDevelopment = () => {
  toast(
    "This feature is under development. We're working to make it available soon.",
    {
      duration: 2000,
      icon: '🚧',
      position: 'top-center',
    },
  );
};
