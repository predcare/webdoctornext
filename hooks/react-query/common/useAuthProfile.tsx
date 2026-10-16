'use client';

import { _isPolicyAccepted, _isUserRole } from '@/configs/keys.constants';
import { getAuthToken } from '@/lib/commons/authToken';
import { navigateTo } from '@/lib/commons/common.utils';
import { setCookieClient } from '@/lib/functions/_storage.lib';
import { projectRoutes } from '@/routes';
import { UserRoles } from '@/typescripts/enums';
import { useAuthStore } from '@/zustand/stores/useAuthStore';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useProfile } from '../profile/profile.hooks';

const useAuthProfile = () => {
  const pathName = usePathname();
  const isPolicyPage = pathName.includes('/policy-acceptance');
  const token = getAuthToken() || null;
  const { setUserData } = useAuthStore((state) => state);

  const profileDetails = useProfile({
    enabled: false,
  });

  useEffect(() => {
    const profile = profileDetails.data;
    if (!token || !profile) {
      return;
    }

    setUserData(profile);
    setCookieClient(
      _isPolicyAccepted,
      `${profile.has_accepted_policies}`,
      '7d',
    );
    setCookieClient(_isUserRole, `${profile.currentRole}`, '7d');
    if (
      profile.user_type === UserRoles.DOCTOR &&
      !profile.has_accepted_policies &&
      !isPolicyPage
    ) {
      navigateTo(projectRoutes.policyAcceptance, true);
    } else if (
      profile.user_type === UserRoles.PATIENT &&
      !profile.has_accepted_policies &&
      !isPolicyPage
    ) {
      navigateTo(projectRoutes.patientPolicyAcceptance, true);
    }
  }, [token, profileDetails.data, isPolicyPage, setUserData]);
};

export default useAuthProfile;
