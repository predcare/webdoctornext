import dayjs from 'dayjs';
import { parseCookies } from 'nookies';

export const getCookieVal = (key: string, fallback = ''): string => {
  const cookies = parseCookies();
  return cookies?.[key] ?? fallback;
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

export const _toTitleCase = (value: string): string => {
  if (!value?.trim()) return '';
  return value
    .replace(/[_-]+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export const _formatDoctorName = (name: string, salutation?: string): string =>
  `${salutation?.trim() || 'Dr.'} ${name.trim()}`;
