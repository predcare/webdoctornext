import { useMutation, useQuery } from '@tanstack/react-query';
import {
  ICreateDoctorEducationPayload,
  ICreateDoctorExperiencePayload,
  TUpdateDoctorEducationPayload,
  TUpdateDoctorExperiencePayload,
} from '../../../typescripts/interfaces/profile.interfaces';
import { ProfileQueryKeys } from '../query.keys';
import {
  createDoctorEducation,
  createDoctorExperience,
  deleteDoctorEducation,
  deleteDoctorExperience,
  getDoctorClinics,
  getDoctorEducationById,
  getDoctorEducations,
  getDoctorExperienceById,
  getDoctorExperiences,
  getProfile,
  updateDocProfile,
  updateDoctorEducation,
  updateDoctorExperience,
  updateProfile,
} from './profile.funcs';

type TQueryEnabled = {
  enabled?: boolean;
  refetchOnMount?: boolean | 'always';
  staleTime?: number;
};

export const useProfile = (options?: TQueryEnabled) =>
  useQuery({
    queryKey: [ProfileQueryKeys.Profile],
    queryFn: () => getProfile(),
    select: (v) => v.data,
    enabled: options?.enabled ?? true,
    refetchOnMount: options?.refetchOnMount,
  });

export const useDoctorClinics = (options?: TQueryEnabled) =>
  useQuery({
    queryKey: [ProfileQueryKeys.DoctorClinics],
    queryFn: () => getDoctorClinics(),
    select: (v) => v.data,
    staleTime: options?.staleTime ?? 5 * 60 * 1000, // 5 minutes
    enabled: options?.enabled ?? true,
    refetchOnMount: options?.refetchOnMount,
  });

export const useUpdateProfile = () =>
  useMutation({
    mutationFn: updateProfile,
  });

export const useUpdateDocProfile = () =>
  useMutation({
    mutationFn: updateDocProfile,
  });

export const useDoctorEducationList = (options?: TQueryEnabled) =>
  useQuery({
    queryKey: [ProfileQueryKeys.DoctorEducation],
    queryFn: () => getDoctorEducations(),
    select: (v: any) => {
      if (Array.isArray(v)) return v;
      if (Array.isArray(v?.data)) return v.data;
      return [];
    },
    enabled: options?.enabled ?? true,
    refetchOnMount: options?.refetchOnMount,
    staleTime: options?.staleTime,
  });

export const useDoctorEducationById = (
  id?: number | string,
  options?: TQueryEnabled,
) =>
  useQuery({
    queryKey: [ProfileQueryKeys.DoctorEducationDetail, id],
    queryFn: () => getDoctorEducationById(id!),
    select: (v: any) => v?.data ?? v,
    enabled: !!id && (options?.enabled ?? true),
    refetchOnMount: options?.refetchOnMount,
    staleTime: options?.staleTime,
  });

export const useCreateDoctorEducation = () => {
  return useMutation({
    mutationKey: [ProfileQueryKeys.DoctorEducation, 'create'],
    mutationFn: (payload: ICreateDoctorEducationPayload) =>
      createDoctorEducation(payload),
  });
};

export const useUpdateDoctorEducation = () => {
  return useMutation({
    mutationKey: [ProfileQueryKeys.DoctorEducation, 'update'],
    mutationFn: ({
      id,
      payload,
    }: {
      id: number | string;
      payload: TUpdateDoctorEducationPayload;
    }) => updateDoctorEducation({ id, payload }),
  });
};

export const useDeleteDoctorEducation = () => {
  return useMutation({
    mutationKey: [ProfileQueryKeys.DoctorEducation, 'delete'],
    mutationFn: (id: number | string) => deleteDoctorEducation(id),
  });
};

export const useDoctorExperienceList = (options?: TQueryEnabled) =>
  useQuery({
    queryKey: [ProfileQueryKeys.DoctorExperience],
    queryFn: () => getDoctorExperiences(),
    select: (v: any) => {
      if (Array.isArray(v)) return v;
      if (Array.isArray(v?.data)) return v.data;
      return [];
    },
    enabled: options?.enabled ?? true,
    refetchOnMount: options?.refetchOnMount,
    staleTime: options?.staleTime,
  });

export const useDoctorExperienceById = (
  id?: number | string,
  options?: TQueryEnabled,
) =>
  useQuery({
    queryKey: [ProfileQueryKeys.DoctorExperienceDetail, id],
    queryFn: () => getDoctorExperienceById(id!),
    select: (v: any) => v?.data ?? v,
    enabled: !!id && (options?.enabled ?? true),
    refetchOnMount: options?.refetchOnMount,
    staleTime: options?.staleTime,
  });

export const useCreateDoctorExperience = () => {
  return useMutation({
    mutationKey: [ProfileQueryKeys.DoctorExperience, 'create'],
    mutationFn: (payload: ICreateDoctorExperiencePayload) =>
      createDoctorExperience(payload),
  });
};

export const useUpdateDoctorExperience = () => {
  return useMutation({
    mutationKey: [ProfileQueryKeys.DoctorExperience, 'update'],
    mutationFn: ({
      id,
      payload,
    }: {
      id: number | string;
      payload: TUpdateDoctorExperiencePayload;
    }) => updateDoctorExperience({ id, payload }),
  });
};

export const useDeleteDoctorExperience = () => {
  return useMutation({
    mutationKey: [ProfileQueryKeys.DoctorExperience, 'delete'],
    mutationFn: (id: number | string) => deleteDoctorExperience(id),
  });
};
