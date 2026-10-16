import {
  _isPolicyAccepted,
  _isUserRole,
  _projectToken,
} from '@/configs/keys.constants';
import { getCookieVal } from '@/lib/commons/common.utils';
import {
  deleteCookieClient,
  setCookieClient,
} from '@/lib/functions/_storage.lib';

const AuthTokenDuration = '7d';

export const getAuthToken = (): string => getCookieVal(_projectToken);

export const setAuthToken = (token: string): void => {
  setCookieClient(_projectToken, token, AuthTokenDuration);
};

export const clearAuthToken = (): void => {
  deleteCookieClient(_projectToken);
  deleteCookieClient(_isPolicyAccepted);
  deleteCookieClient(_isUserRole);
};
