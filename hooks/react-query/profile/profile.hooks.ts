import { useQuery } from '@tanstack/react-query';
import { ProfileQueryKeys } from '../query.keys';
import { getDoctorClinics, getProfile } from './profile.funcs';

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
