'use client';

import { getAuthToken } from '@/lib/commons/authToken';
import { projectRoutes } from '@/routes';
import {
  useAuthStore,
  useAuthStoreHydration,
} from '@/zustand/stores/useAuthStore';
import { Box, CircularProgress } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type AuthGateMode = 'dashboard' | 'policy' | 'login';

type AuthGateProps = {
  mode: AuthGateMode;
  children: React.ReactNode;
};

const AuthGate = ({ mode, children }: AuthGateProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const hydrated = useAuthStoreHydration();
  const { isLoggedIn, userData } = useAuthStore((state) => state);
  const [ready, setReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!hydrated) return;

    const cookieToken = getAuthToken();
    const hasSession = Boolean(cookieToken) && isLoggedIn;

    if (mode === 'dashboard') {
      if (!hasSession) {
        router.replace(projectRoutes.doctorLogin);
        return;
      }
      if (userData && userData.has_accepted_policies === false) {
        router.replace(projectRoutes.policyAcceptance);
        return;
      }
      setReady(true);
      return;
    }

    if (mode === 'policy') {
      if (!hasSession) {
        router.replace(projectRoutes.doctorLogin);
        return;
      }
      if (userData?.has_accepted_policies === true) {
        router.replace(projectRoutes.dashboard);
        return;
      }
      setReady(true);
      return;
    }

    if (hasSession) {
      if (userData?.has_accepted_policies === false) {
        router.replace(projectRoutes.policyAcceptance);
        return;
      }
      if (userData?.has_accepted_policies === true) {
        router.replace(projectRoutes.dashboard);
        return;
      }
      if (!isLoading) {
        setReady(true);
      }
      return;
    }

    setReady(true);
  }, [
    hydrated,
    mode,
    isLoggedIn,
    userData,
    pathname,
    router,
    isLoading,
  ]);

  if (!hydrated || !ready) {
    return (
      <Box
        sx={{
          minHeight: 240,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress size={28} />
      </Box>
    );
  }

  return <>{children}</>;
};

export default AuthGate;
