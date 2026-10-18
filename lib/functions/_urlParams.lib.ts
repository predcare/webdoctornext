import { _storageEncryptedKey } from '@/configs/keys.constants';
import CryptoJS from 'crypto-js';

const SALT_HEX_LENGTH = 16;
const BLOCK_HEX_LENGTH = 32;
const HEX_PATTERN = /^[0-9a-f]+$/i;

/* AES encrypt a value into a hex-only token (salt + ciphertext) */
export const encodeUrlParam = (value: string | number): string => {
  const cipher = CryptoJS.AES.encrypt(String(value), _storageEncryptedKey);
  return (
    cipher.salt.toString(CryptoJS.enc.Hex) +
    cipher.ciphertext.toString(CryptoJS.enc.Hex)
  );
};

/* Decrypt a token from encodeUrlParam; null when missing or tampered */
export const decodeUrlParam = (value?: string | null): string | null => {
  if (
    !value ||
    !HEX_PATTERN.test(value) ||
    value.length < SALT_HEX_LENGTH + BLOCK_HEX_LENGTH ||
    (value.length - SALT_HEX_LENGTH) % BLOCK_HEX_LENGTH !== 0
  ) {
    return null;
  }
  try {
    const params = CryptoJS.lib.CipherParams.create({
      salt: CryptoJS.enc.Hex.parse(value.slice(0, SALT_HEX_LENGTH)),
      ciphertext: CryptoJS.enc.Hex.parse(value.slice(SALT_HEX_LENGTH)),
    });
    const decrypted = CryptoJS.AES.decrypt(
      params,
      _storageEncryptedKey,
    ).toString(CryptoJS.enc.Utf8);
    return decrypted || null;
  } catch {
    return null;
  }
};
