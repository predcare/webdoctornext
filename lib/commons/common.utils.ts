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
