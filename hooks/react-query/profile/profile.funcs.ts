import axiosInstance from '../../../services/api/apiClient';
import { endpoints } from '../../../services/api/endpoints';
import {
  ICommonRoot,
  IRootResponse,
} from '../../../typescripts/interfaces/common.interfaces';
import {
  ICreateDoctorEducationPayload,
  ICreateDoctorExperiencePayload,
  IDoctorEducation,
  IDoctorExperience,
  IMyProfileDoc,
  TMyClinicsRoot,
  TUpdateDoctorEducationPayload,
  TUpdateDoctorExperiencePayload,
} from '../../../typescripts/interfaces/profile.interfaces';

export const getProfile = async () => {
  const res = await axiosInstance.get<IRootResponse<IMyProfileDoc>>(
    `${endpoints.profile.get}`,
  );
  return res.data;
};
export const getDoctorClinics = async () => {
  const res = await axiosInstance.get<TMyClinicsRoot>(
    `${endpoints.profile.doctorClinics}`,
  );
  return res.data;
};

export const updateProfile = async (data: FormData) => {
  const res = await axiosInstance.post<ICommonRoot>(
    `${endpoints.profile.update}`,
    data,
  );
  return res.data;
};

export const updateDocProfile = async (data: FormData) => {
  const res = await axiosInstance.put<ICommonRoot>(
    `${endpoints.profile.updateDocProfile}`,
    data,
  );
  return res.data;
};

// --- Doctor Education Functions ---

export const getDoctorEducations = async () => {
  const res = await axiosInstance.get<IRootResponse<IDoctorEducation[]>>(
    endpoints.doctorInfo.educationList,
  );
  return res.data;
};

export const getDoctorEducationById = async (id: number | string) => {
  const res = await axiosInstance.get<IRootResponse<IDoctorEducation>>(
    endpoints.doctorInfo.educationDetail(id),
  );
  return res.data;
};

export const createDoctorEducation = async (
  payload: ICreateDoctorEducationPayload,
) => {
  const res = await axiosInstance.post<ICommonRoot>(
    endpoints.doctorInfo.educationCreate,
    payload,
  );
  return res.data;
};

export const updateDoctorEducation = async ({
  id,
  payload,
}: {
  id: number | string;
  payload: TUpdateDoctorEducationPayload;
}) => {
  const res = await axiosInstance.put<ICommonRoot>(
    endpoints.doctorInfo.educationUpdate(id),
    payload,
  );
  return res.data;
};

export const deleteDoctorEducation = async (id: number | string) => {
  const res = await axiosInstance.delete<ICommonRoot>(
    endpoints.doctorInfo.educationDelete(id),
  );
  return res.data;
};

// --- Doctor Experience Functions ---

export const getDoctorExperiences = async () => {
  const res = await axiosInstance.get<IRootResponse<IDoctorExperience[]>>(
    endpoints.doctorInfo.experienceList,
  );
  return res.data;
};

export const getDoctorExperienceById = async (id: number | string) => {
  const res = await axiosInstance.get<IRootResponse<IDoctorExperience>>(
    endpoints.doctorInfo.experienceDetail(id),
  );
  return res.data;
};

export const createDoctorExperience = async (
  payload: ICreateDoctorExperiencePayload,
) => {
  const res = await axiosInstance.post<ICommonRoot>(
    endpoints.doctorInfo.experienceCreate,
    payload,
  );
  return res.data;
};

export const updateDoctorExperience = async ({
  id,
  payload,
}: {
  id: number | string;
  payload: TUpdateDoctorExperiencePayload;
}) => {
  const res = await axiosInstance.put<ICommonRoot>(
    endpoints.doctorInfo.experienceUpdate(id),
    payload,
  );
  return res.data;
};

export const deleteDoctorExperience = async (id: number | string) => {
  const res = await axiosInstance.delete<ICommonRoot>(
    endpoints.doctorInfo.experienceDelete(id),
  );
  return res.data;
};
