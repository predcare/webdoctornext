import { useQuery } from '@tanstack/react-query';
import { ProfileQueryKeys } from '../query.keys';
import { getDoctorClinics, getProfile } from './profile.funcs';

export const useProfile = () =>
  useQuery({
    queryKey: [ProfileQueryKeys.Profile],
    queryFn: () => getProfile(),
    select: v => v.data,
  });

export const useDoctorClinics = () =>
  useQuery({
    queryKey: [ProfileQueryKeys.DoctorClinics],
    queryFn: () => getDoctorClinics(),
    select: v => v.data,
  });