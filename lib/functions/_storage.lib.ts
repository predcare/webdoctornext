import { _storageEncryptedKey } from '@/configs/keys.constants';
import CryptoJS from 'crypto-js';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { parseDuration } from '../commons/common.utils';

export interface IStoredFileData {
  name: string;
  type: string;
  size: number;
  base64: string;
}

export enum StorageScope {
  LOCAL = 'localStorage',
  SESSION = 'sessionStorage',
}

/* AES Encrypt & Decrypt */
export const encryptValue = (data: unknown): string =>
  CryptoJS.AES.encrypt(JSON.stringify(data), _storageEncryptedKey).toString();

export const decryptValue = (ciphertext: string): unknown | null => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, _storageEncryptedKey);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted ? JSON.parse(decrypted) : null;
  } catch {
    return null;
  }
};

/* File helpers */
export const fileToBase64 = (file: File): Promise<IStoredFileData> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () =>
      resolve({
        name: file.name,
        type: file.type,
        size: file.size,
        base64: reader.result as string,
      });
    reader.onerror = (error) => reject(error);
  });

export const base64ToFile = (storedFile: IStoredFileData): File => {
  const byteString = atob(storedFile.base64.split(',')[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
  return new File(
    [new Blob([ab], { type: storedFile.type })],
    storedFile.name,
    {
      type: storedFile.type,
    },
  );
};

export const convertFilesToStorableFormat = async (
  files: (File | string)[],
): Promise<(IStoredFileData | string)[]> =>
  Promise.all(
    files.map(async (file) =>
      file instanceof File ? await fileToBase64(file) : file,
    ),
  );

export const restoreFilesFromStorableFormat = (
  storedFiles: (IStoredFileData | string)[],
): (File | string)[] =>
  storedFiles.map((fileData) =>
    typeof fileData === 'string' ? fileData : base64ToFile(fileData),
  );

/* Generic storage functions */
export interface IStorageOptions<T extends Record<string, unknown>> {
  scope?: StorageScope;
  encrypt?: boolean;
  fileFields?: (keyof T)[];
}

export const saveToStorage = async <T extends Record<string, unknown>>(
  key: string,
  value: T,
  options: IStorageOptions<T> = {},
): Promise<boolean> => {
  try {
    const { scope = StorageScope.LOCAL, encrypt = true, fileFields } = options;
    const dataCopy = { ...value };

    if (fileFields?.length) {
      for (const field of fileFields) {
        if (Array.isArray(dataCopy[field])) {
          dataCopy[field] = (await convertFilesToStorableFormat(
            dataCopy[field] as (File | string)[],
          )) as T[keyof T];
        }
      }
    }

    const dataToStore = encrypt
      ? encryptValue(dataCopy)
      : JSON.stringify(dataCopy);

    if (scope === StorageScope.LOCAL) localStorage.setItem(key, dataToStore);
    else sessionStorage.setItem(key, dataToStore);

    return true;
  } catch (error) {
    console.error('Error saving data to storage:', error);
    return false;
  }
};

export const loadFromStorage = <T extends Record<string, unknown>>(
  key: string,
  options: IStorageOptions<T> = {},
): T | null => {
  try {
    const { scope = StorageScope.LOCAL, encrypt = true, fileFields } = options;
    const storedData =
      scope === StorageScope.LOCAL
        ? localStorage.getItem(key)
        : sessionStorage.getItem(key);
    if (!storedData) return null;

    const parsedData = (
      encrypt ? decryptValue(storedData) : JSON.parse(storedData)
    ) as T;

    if (fileFields?.length) {
      for (const field of fileFields) {
        if (Array.isArray(parsedData[field])) {
          parsedData[field] = restoreFilesFromStorableFormat(
            parsedData[field] as (IStoredFileData | string)[],
          ) as T[keyof T];
        }
      }
    }

    return parsedData;
  } catch (error) {
    console.error('Error loading data from storage:', error);
    return null;
  }
};

export const removeFromStorage = (
  key: string,
  scope: StorageScope = StorageScope.LOCAL,
): boolean => {
  try {
    if (scope === StorageScope.LOCAL) localStorage.removeItem(key);
    else sessionStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing data from storage:', error);
    return false;
  }
};

// Cookies
/* Set Values to the Cookies */
export function setCookieClient(
  key: string,
  value: string,
  durationTime?: string,
) {
  const maxAge = parseDuration(durationTime);
  setCookie(null, key, value, {
    path: '/',
    ...(maxAge !== undefined ? { maxAge } : {}),
  });
}
/* Get Values to the Cookies */
export function getCookieClient(key: string): unknown | null {
  const cookies = parseCookies();
  const encrypted = cookies[key];
  if (!encrypted) return null;
  return decryptValue(encrypted);
}

/* Delete Values From the Cookies */
export function deleteCookieClient(key: string) {
  destroyCookie(null, key, { path: '/' });
}
