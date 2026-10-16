'use client';

import { _isPolicyAccepted, _isUserRole } from '@/configs/keys.constants';
import { getAuthToken } from '@/lib/commons/authToken';
import { navigateTo } from '@/lib/commons/common.utils';
import { setCookieClient } from '@/lib/functions/_storage.lib';
import { projectRoutes } from '@/routes';
import { UserRoles } from '@/typescripts/enums';
import { useAuthStore } from '@/zustand/stores/useAuthStore';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { getProfile } from '../profile/profile.funcs';
import { ProfileQueryKeys } from '../query.keys';

const useAuthProfile = () => {
  const pathName = usePathname();
  const isPolicyPage = pathName.includes('/policy-acceptance');
  const token = getAuthToken() || null;
  const { setUserData } = useAuthStore((state) => state);

  const profileDetails = useQuery({
    queryKey: [ProfileQueryKeys.Profile],
    queryFn: () => getProfile(),
    enabled: !!token,
  });

  useEffect(() => {
    if (token && profileDetails.isSuccess && profileDetails?.data?.data) {
      setUserData(profileDetails?.data?.data);
      setCookieClient(
        _isPolicyAccepted,
        `${profileDetails?.data?.data?.has_accepted_policies}`,
        '7d',
      );
      setCookieClient(_isUserRole, `${profileDetails?.data?.data?.user_type}`, '7d');
      if (
        profileDetails?.data?.data?.user_type === UserRoles.DOCTOR &&
        !profileDetails?.data?.data?.has_accepted_policies && !isPolicyPage
      ) {
        navigateTo(projectRoutes.policyAcceptance);
      } else if (
        profileDetails?.data?.data?.user_type === UserRoles.PATIENT &&
        !profileDetails?.data?.data?.has_accepted_policies && !isPolicyPage
      ) {
        navigateTo(projectRoutes.patientPolicyAcceptance);
      }
    }
  }, [
    profileDetails.isSuccess,
    profileDetails.isError,
    profileDetails?.data,
    profileDetails.error,
  ]);
};

export default useAuthProfile;
