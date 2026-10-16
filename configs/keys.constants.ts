import { DevMode } from '@/typescripts/enums';

export const _storageEncryptedKey = process.env.NEXT_PUBLIC_PERSIST_SECRET_KEY
  ? process.env.NEXT_PUBLIC_PERSIST_SECRET_KEY
  : '_predcareSecretKey123';

export const _projectToken = process.env.NEXT_PUBLIC_PROJECT_TOKEN
  ? process.env.NEXT_PUBLIC_PROJECT_TOKEN
  : '_predcare';

export const _isProduction = process.env.NODE_ENV
  ? process.env.NODE_ENV
  : DevMode.Production;

export const _isPolicyAccepted = process.env.NEXT_PUBLIC_IS_POLICY_ACCEPTED
  ? process.env.NEXT_PUBLIC_IS_POLICY_ACCEPTED
  : '_isPolicyAccepted';

export const _isUserRole = process.env.NEXT_PUBLIC_IS_USER_ROLE_DOCTOR
  ? process.env.NEXT_PUBLIC_IS_USER_ROLE_DOCTOR
  : '_isUserRole';
