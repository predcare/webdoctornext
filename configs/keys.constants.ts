import { DevMode } from '@/typescripts/enums';

export const _storageEncryptedKey = process.env.NEXT_PUBLIC_PERSIST_SECRET_KEY
  ? process.env.NEXT_PUBLIC_PERSIST_SECRET_KEY
  : 'mySecretKey123';

export const _projectToken = process.env.NEXT_PUBLIC_PROJECT_TOKEN
  ? process.env.NEXT_PUBLIC_PROJECT_TOKEN
  : '_orbitloom';

export const _isProduction = process.env.NODE_ENV
  ? process.env.NODE_ENV
  : DevMode.Production;
