import { showErrorToast, showSuccessToast } from './toast';

export type FileAction = 'open' | 'save';

export interface SaveOrOpenFileParams {
  /** Raw file data as ArrayBuffer, Uint8Array, Blob, or base64 string */
  data: ArrayBuffer | Uint8Array | Blob | string;
  /** Desired filename e.g. "Invoice_INV_1001.pdf" */
  filename: string;
  /** Action: "open" to preview in new browser tab, "save" to download to device storage */
  action: FileAction;
  /** Optional custom success message */
  successMessage?: string;
  /** Optional custom error toast title */
  errorTitle?: string;
  /** Optional MIME type, default application/pdf */
  mimeType?: string;
}

const BASE64_CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

/**
 * Safely converts an ArrayBuffer, Uint8Array, or base64 string into a base64 string.
 */
export const arrayBufferToBase64 = (
  data: ArrayBuffer | Uint8Array | string,
): string => {
  if (typeof data === 'string') return data;
  const bytes = data instanceof Uint8Array ? data : new Uint8Array(data);
  let base64 = '';
  const len = bytes.length;
  for (let i = 0; i < len; i += 3) {
    const b1 = bytes[i];
    const b2 = i + 1 < len ? bytes[i + 1] : 0;
    const b3 = i + 2 < len ? bytes[i + 2] : 0;

    const c1 = b1 >> 2;
    const c2 = ((b1 & 3) << 4) | (b2 >> 4);
    const c3 = ((b2 & 15) << 2) | (b3 >> 6);
    const c4 = b3 & 63;

    base64 += BASE64_CHARS[c1] + BASE64_CHARS[c2];
    base64 += i + 1 < len ? BASE64_CHARS[c3] : '=';
    base64 += i + 2 < len ? BASE64_CHARS[c4] : '=';
  }
  return base64;
};

/**
 * Converts base64 string to a Uint8Array byte buffer.
 */
export const base64ToUint8Array = (base64: string): Uint8Array => {
  const binaryString =
    typeof window !== 'undefined'
      ? window.atob(base64)
      : Buffer.from(base64, 'base64').toString('binary');
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

/**
 * Creates a Blob from an ArrayBuffer, Uint8Array, Blob, or base64 string.
 */
export const toBlob = (
  data: ArrayBuffer | Uint8Array | Blob | string,
  mimeType = 'application/pdf',
): Blob => {
  if (data instanceof Blob) return data;
  if (typeof data === 'string') {
    // Check if it's a data URL or raw base64
    const base64Index = data.indexOf(';base64,');
    const rawBase64 =
      base64Index !== -1 ? data.substring(base64Index + 8) : data;
    const uint8 = base64ToUint8Array(rawBase64);
    return new Blob([uint8 as unknown as BlobPart], { type: mimeType });
  }
  return new Blob([data as unknown as BlobPart], { type: mimeType });
};

export const sanitizeFilename = (
  filename: string,
  defaultName = 'Document.pdf',
): string => {
  if (!filename) return defaultName;
  const lastDot = filename.lastIndexOf('.');
  let name = filename;
  let ext = '';
  if (lastDot !== -1) {
    name = filename.substring(0, lastDot);
    ext = filename.substring(lastDot);
  }
  const safeName = name.replace(/[^A-Za-z0-9_-]/g, '_');
  return `${safeName}${ext || '.pdf'}`;
};

/**
 * Triggers a browser file download.
 */
export const triggerBrowserDownload = (blob: Blob, filename: string): void => {
  if (typeof window === 'undefined') return;
  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.style.display = 'none';
  document.body.appendChild(anchor);
  anchor.click();
  setTimeout(() => {
    document.body.removeChild(anchor);
    window.URL.revokeObjectURL(url);
  }, 100);
};

/**
 * Opens a blob in a new browser tab.
 */
export const openBlobInNewTab = (blob: Blob): string | null => {
  if (typeof window === 'undefined') return null;
  const url = window.URL.createObjectURL(blob);
  window.open(url, '_blank');
  return url;
};

/**
 * Web-compatible saveOrOpenFile implementation.
 */
export const saveOrOpenFile = async ({
  data,
  filename,
  action,
  successMessage,
  errorTitle = 'Failed',
  mimeType = 'application/pdf',
}: SaveOrOpenFileParams): Promise<string | null> => {
  try {
    const cleanFilename = sanitizeFilename(filename);
    const blob = toBlob(data, mimeType);

    if (action === 'open') {
      const url = openBlobInNewTab(blob);
      if (successMessage) showSuccessToast(successMessage);
      return url;
    } else {
      triggerBrowserDownload(blob, cleanFilename);
      showSuccessToast(successMessage || `${cleanFilename} downloaded`);
      return cleanFilename;
    }
  } catch (error: any) {
    console.error('file.utils error:', error?.message);
    showErrorToast(error?.message || 'Could not process file', { description: errorTitle });
    return null;
  }
};

export const handleInvoicePdfAction = async (
  inv: { id: number | string; invoice_number?: string },
  action: FileAction,
  pdfData: ArrayBuffer | Uint8Array | Blob | string,
): Promise<string | null> => {
  const safeName = (inv.invoice_number || `INV-${inv.id}`).replace(
    /[^A-Za-z0-9_-]/g,
    '_',
  );
  const filename = `Invoice_${safeName}.pdf`;

  return saveOrOpenFile({
    data: pdfData,
    filename,
    action,
  });
};
