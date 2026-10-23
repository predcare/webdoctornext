import { ISpecializationData } from '@/typescripts/interfaces/common.interfaces';
import dayjs from 'dayjs';
import { parseCookies } from 'nookies';

export const CALL_NEAR_END_SECONDS = 4;

export const getCookieVal = (key: string, fallback = ''): string => {
  const cookies = parseCookies();
  return cookies?.[key] ?? fallback;
};

export const formatDate = (
  date: Date | string | null | undefined,
  format = 'DD MMM YYYY',
): string => {
  if (!date) return '';
  return dayjs(date).format(format);
};

export function parseDuration(duration?: string): number | undefined {
  if (!duration) return undefined;

  const match = duration.match(/^(\d+)([smhdwy])$/);
  if (!match) return undefined;

  const value = parseInt(match[1]!, 10); // match[1] is guaranteed here
  const unit = match[2] as 's' | 'm' | 'h' | 'd' | 'w' | 'y';

  switch (unit) {
    case 's': // seconds
      return value;
    case 'm': // minutes
      return value * 60;
    case 'h': // hours
      return value * 60 * 60;
    case 'd': // days
      return value * 60 * 60 * 24;
    case 'w': // weeks
      return value * 60 * 60 * 24 * 7;
    case 'y': // years (approx 365 days)
      return value * 60 * 60 * 24 * 365;
    default:
      return undefined;
  }
}

export const navigateTo = (route: string, replace: boolean = false): void => {
  if (typeof window !== 'undefined') {
    if (replace) {
      window.location.replace(route);
    } else {
      window.location.href = route;
    }
  }
};

export const appendIfDefined = (
  formData: FormData,
  key: string,
  value?: string | File | null,
): void => {
  if (value instanceof File) {
    formData.append(key, value);
    return;
  }

  if (typeof value === 'string' && value.trim() !== '') {
    formData.append(key, value.trim());
  }
};

export function getInitials(name: string): string {
  if (!name) return 'D';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0][0].toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export const getAvatarColor = (
  name = '',
  colors: string[] = ['#00897B', '#00796B'],
): string => {
  const hash = [...name].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
};

export const formatTimeAgo = (date: string): string => {
  const d = dayjs(date);
  const minutes = dayjs().diff(d, 'minute');

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;

  const hours = dayjs().diff(d, 'hour');
  if (hours < 24) return d.format('hh:mm A');

  const days = dayjs().diff(d, 'day');
  if (days < 7) return `${days}d ago`;

  return d.format('MMM D');
};

export const getAge = (
  dob: string,
  options?: {
    large?: boolean;
  },
): string => {
  if (!dob) return '';
  const b = new Date(dob);
  const t = new Date();
  let age = t.getFullYear() - b.getFullYear();
  const m = t.getMonth() - b.getMonth();
  if (m < 0 || (m === 0 && t.getDate() < b.getDate())) age--;
  if (age <= 0) {
    return options?.large ? '< 1 year' : '< 1yrs';
  }
  return options?.large ? `${age} ${age === 1 ? 'year' : 'years'}` : `${age}y`;
};

export const formatDateToYYYYMMDD = (d: Date): string => {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

export const capitalize = (value: string): string => {
  if (!value) return '';
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};

export const maskValue = (value: string) => {
  if (!value) return '';
  if (value.length <= 2) return value;
  return value.slice(0, 2) + '*'.repeat(value.length - 2);
};

export const formatStatus = (status?: string): string => {
  if (!status) return '';
  const s = status.trim().toLowerCase();
  if (s === 'in_progress' || s === 'in-progress' || s === 'inprogress') {
    return 'In Progress';
  }
  if (s === 'completed') return 'Completed';
  if (s === 'cancelled' || s === 'canceled') return 'Cancelled';
  if (s === 'pending') return 'Pending';
  if (s === 'confirmed') return 'Confirmed';

  return s.replace(/[_-]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
};

export const getPayStatus = (statusStr: string) => {
  const s = (statusStr || '').toLowerCase().trim();
  if (s === 'paid') return { bg: '#D1FAE5', txt: '#065F46', label: 'PAID' };
  if (s === 'overdue' || s === 'cancelled')
    return { bg: '#FEE2E2', txt: '#B91C1C', label: s.toUpperCase() };
  if (s === 'unpaid') return { bg: '#FEE2E2', txt: '#B91C1C', label: 'UNPAID' };
  return { bg: '#FEF3C7', txt: '#B45309', label: 'PENDING' };
};

export const getAppointmentTypeColors = (
  type?: string,
): { bg: string; txt: string } => {
  switch (type?.toLowerCase().trim()) {
    case 'video':
    case 'telehealth':
      return { bg: '#DBEAFE', txt: '#2563EB' };
    case 'in-person':
    case 'in_person':
    case 'inperson':
      return { bg: '#D1FAE5', txt: '#16A34A' };
    case 'instant':
      return { bg: '#FEF3C7', txt: '#D97706' };
    case 'both':
      return { bg: '#E0F2FE', txt: '#0284C7' };
    default:
      return { bg: '#F1F5F9', txt: '#64748B' };
  }
};

export const getAppointmentStatusColors = (
  status?: string,
): { bg: string; txt: string } => {
  switch (status?.toLowerCase().trim()) {
    case 'completed':
      return { bg: '#D1FAE5', txt: '#16A34A' };
    case 'cancelled':
      return { bg: '#FEE2E2', txt: '#DC2626' };
    case 'pending':
      return { bg: '#FEF3C7', txt: '#D97706' };
    case 'in-progress':
    case 'in_progress':
    case 'inprogress':
      return { bg: '#E0F2FE', txt: '#0284C7' };
    default:
      return { bg: '#DBEAFE', txt: '#64748B' };
  }
};

export const _toTitleCase = (value: string): string => {
  if (!value?.trim()) return '';
  return value
    .replace(/[_-]+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export const _formatDoctorName = (name: string, salutation?: string): string =>
  `${salutation?.trim() || 'Dr.'} ${name.trim()}`;

export const formatSpecialization = ({
  specialization,
  sub_specializations = {},
}: ISpecializationData): string => {
  const specializations = Array.isArray(specialization)
    ? specialization
    : (specialization?.split(',') ?? []);

  return specializations
    .map((item) => {
      const name = item.trim();
      if (!name) return '';

      const subSpecializations = sub_specializations[name] ?? [];

      return subSpecializations.length
        ? `${name} (${subSpecializations.join(', ')})`
        : name;
    })
    .filter(Boolean)
    .join(', ');
};

export const formatTimeSlot = (startTime?: string, endTime?: string) => {
  if (!startTime) return 'Flexible';

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);

    if (isNaN(hours) || isNaN(minutes)) return time;

    const period = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12;

    return `${hour12}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  const start = formatTime(startTime);
  const end = endTime ? formatTime(endTime) : '';

  return end ? `${start} - ${end}` : start;
};

export const stripHtmlTags = (html: string): string => {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
};

export const downloadFromUrl = (url: string) => {
  return new Promise<void>((resolve) => {
    if (typeof window !== 'undefined') {
      window.open(url, '_blank');
    }
    resolve();
  });
};

export function truncateText(
  text: string | undefined | null,
  maxChars: number,
): string {
  if (!text) return '';
  return text.length > maxChars ? `${text.slice(0, maxChars)}...` : text;
}

export const openInNewTab = (url: string) => {
  const origin = window.location.origin;
  const validUrl = url.startsWith('http')
    ? url
    : `${origin}${url.startsWith('/') ? url : `/${url}`}`;
  window.open(validUrl, '_blank', 'noopener,noreferrer');
};

export const formatReviewText = (items: number, text: string): string => {
  if (items === 0) {
    return `Not rated yet!`;
  } else if (items === 1) {
    return `1 ${text}`;
  } else {
    return `${items} ${text}s`;
  }
};

export const _formatShortNum = (num: number | string): string => {
  const numVal = Number(num);

  if (numVal === null || numVal === undefined || isNaN(numVal)) return '0';

  const absNum = Math.abs(numVal);

  if (absNum >= 1_000_000_000_000) {
    return (numVal / 1_000_000_000_000).toFixed(1).replace(/\.0$/, '') + 'T';
  } else if (absNum >= 1_000_000_000) {
    return (numVal / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
  } else if (absNum >= 1_000_000) {
    return (numVal / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  } else if (absNum >= 1_000) {
    return (numVal / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  } else {
    return num.toString();
  }
};

export const isPastDate = (date: string | Date | dayjs.Dayjs): boolean => {
  if (!date) return false;

  const today = dayjs().startOf('day');
  const selectedDate = dayjs(date, 'DD-MM-YYYY').startOf('day');

  return selectedDate.isBefore(today);
};

export function getFullCurrentUrl(): string | null {
  if (typeof window === 'undefined') return null;
  return window.location.href;
}

export const _PromiseSettled = <T>(
  result: PromiseSettledResult<T>,
  fallback: T,
): T => {
  return result.status === 'fulfilled' && result.value != null
    ? result.value
    : fallback;
};

export const isInProgressStatus = (status?: string) => {
  const value = (status || '').toLowerCase();
  return (
    value === 'in-progress' || value === 'in_progress' || value === 'inprogress'
  );
};

/** appointment_duration is minutes. 3 minutes => 180 seconds. */
export const getAllowedCallSeconds = (
  appointmentDurationMinutes?: number | null,
) => {
  const minutes = Number(appointmentDurationMinutes || 0);
  if (!Number.isFinite(minutes) || minutes <= 0) return 0;
  return Math.floor(minutes * 60);
};

export const getSlotDurationMinutes = (
  startTime?: string | null,
  endTime?: string | null,
) => {
  if (
    !startTime ||
    !endTime ||
    !startTime.includes(':') ||
    !endTime.includes(':')
  )
    return 0;
  const toMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return (hours || 0) * 60 + (minutes || 0);
  };
  let duration = toMinutes(endTime) - toMinutes(startTime);
  if (duration <= 0) duration += 1440;
  return duration;
};

export const resolveAppointmentDurationMinutes = (
  appointmentDuration?: number | null,
  slotDurationMinutes?: number | null,
  startTime?: string | null,
  endTime?: string | null,
) => {
  const explicit = Number(appointmentDuration || 0);
  if (Number.isFinite(explicit) && explicit > 0) return explicit;
  const slot = Number(slotDurationMinutes || 0);
  if (Number.isFinite(slot) && slot > 0) return slot;
  return getSlotDurationMinutes(startTime, endTime);
};

export const shouldHideJoinForCallDuration = ({
  status,
  appointmentDurationMinutes,
  callDurationSeconds,
}: {
  status?: string;
  appointmentDurationMinutes?: number | null;
  callDurationSeconds?: number | null;
}) => {
  if (!isInProgressStatus(status)) return false;
  const allowed = getAllowedCallSeconds(appointmentDurationMinutes);
  if (allowed <= 0) return false;
  const used = Math.max(0, Number(callDurationSeconds || 0));
  return used >= allowed - CALL_NEAR_END_SECONDS;
};

export const _cleanParams = <T extends object>(params: T): Partial<T> =>
  Object.fromEntries(
    Object.entries(params).filter(([, value]) => value != null && value !== ''),
  ) as Partial<T>;
