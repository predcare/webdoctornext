import { saveOrOpenFile } from '@/lib/commons/file.utils';
import axiosInstance from '../../../services/api/apiClient';
import { endpoints } from '../../../services/api/endpoints';
import {
  ICommonRoot,
  IRootResponse,
} from '../../../typescripts/interfaces/common.interfaces';
import {
  IPatientPrescriptionDoc,
  TPrescriptionSettingRoot,
} from '../../../typescripts/interfaces/prescriptions.interfaces';
import {
  ICreatePrescriptionPayload,
  IGetDoctorPrescriptionsParams,
  IUpdatePrescriptionPayload,
} from './payload.interfaces';

export const createPrescription = async (
  payload: ICreatePrescriptionPayload,
) => {
  const res = await axiosInstance.post<IRootResponse<{ id: number }>>(
    endpoints.prescritions.create,
    payload,
  );
  return res.data;
};

export const updatePrescription = async ({
  id,
  payload,
}: {
  id: number | string;
  payload: IUpdatePrescriptionPayload;
}) => {
  const res = await axiosInstance.put<ICommonRoot>(
    endpoints.prescritions.update(id),
    payload,
  );
  return res.data;
};

export const getPrescriptionDetails = async (id: string | number) => {
  const res = await axiosInstance.get<IRootResponse<IPatientPrescriptionDoc>>(
    endpoints.prescritions.get(id),
  );
  return res.data;
};

export const resendPrescriptionEmail = async (id: string | number) => {
  const res = await axiosInstance.post<ICommonRoot>(
    endpoints.prescritions.sendAgain(id),
  );
  return res.data;
};

export const downloadPrescriptionPdf = async ({
  id,
  action = 'save',
  onProgress,
}: {
  id: string | number;
  action?: 'open' | 'save';
  onProgress?: (progressPercentage: number) => void;
}): Promise<string | null> => {
  const filename = `Prescription_RX${String(id).padStart(6, '0')}.pdf`;

  const response = await axiosInstance.get(
    endpoints.prescritions.downloadPrescription(id),
    {
      responseType: 'arraybuffer',
      onDownloadProgress: (e) => {
        if (e.total && onProgress) {
          onProgress(Math.round((e.loaded / e.total) * 100));
        }
      },
    },
  );

  return saveOrOpenFile({
    data: response.data as ArrayBuffer,
    filename,
    action,
    successMessage:
      action === 'open'
        ? 'Opening prescription PDF...'
        : `${filename} downloaded`,
  });
};

export const getAllPrescriptionsForDoctor = async (
  params?: IGetDoctorPrescriptionsParams,
) => {
  const res = await axiosInstance.get<IRootResponse<IPatientPrescriptionDoc[]>>(
    endpoints.prescritions.getAll,
    {
      params: {
        page: 1,
        limit: 100,
        ...params,
      },
    },
  );
  return res.data;
};

export const getPrescriptionByApptID = async (
  appointmentId: string | number,
) => {
  const res = await axiosInstance.get<IRootResponse<IPatientPrescriptionDoc[]>>(
    endpoints.prescritions.getPrescriptionsByAppointment(appointmentId),
  );
  return res.data;
};

// Get Presciption Settings
export const getPrescriptionSettings = async () => {
  const res = await axiosInstance.get<TPrescriptionSettingRoot>(
    endpoints.prescritions.prescriptionSettings,
  );
  return res.data;
};

// Update Presciption Settings
export const updatePrescriptionSettings = async (body: FormData) => {
  const res = await axiosInstance.put<ICommonRoot>(
    endpoints.prescritions.prescriptionSettings,
    body,
  );
  return res.data;
};
