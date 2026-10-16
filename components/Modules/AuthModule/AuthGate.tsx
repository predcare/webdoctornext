'use client';

import ProjectThemeLoader from '@/components/commons/BackdropLoader/ProjectThemeLoader';
import { _isPolicyAccepted, _isUserRole } from '@/configs/keys.constants';
import {
  useDoctorClinics,
  useProfile,
} from '@/hooks/react-query/profile/profile.hooks';
import { getAuthToken } from '@/lib/commons/authToken';
import { setCookieClient } from '@/lib/functions/_storage.lib';
import { projectRoutes } from '@/routes';
import { useAuthHydration, useAuthStore } from '@/zustand/stores/useAuthStore';
import { useClinicStore } from '@/zustand/stores/useClinicStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const AUTH_GATE_MIN_LOADER_MS = 1000;
const AUTH_GATE_LOADER_MESSAGE = 'Loading your workspace...';

type AuthGateProps = {
  children: React.ReactNode;
};

const AuthGate = ({ children }: AuthGateProps) => {
  const router = useRouter();
  const hasHydrated = useAuthHydration();
  const token = getAuthToken() || null;
  const setUserData = useAuthStore((state) => state.setUserData);
  const setClinics = useClinicStore((state) => state.setClinics);
  const setActiveClinic = useClinicStore((state) => state.setActiveClinic);
  const [ready, setReady] = useState(false);
  const [minLoaderElapsed, setMinLoaderElapsed] = useState(false);

  const queriesEnabled = hasHydrated && !!token;
  const profileQuery = useProfile({
    enabled: queriesEnabled,
    refetchOnMount: false,
  });
  const clinicsQuery = useDoctorClinics({
    enabled: queriesEnabled,
    refetchOnMount: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  useEffect(() => {
    if (!hasHydrated) {
      setReady(false);
      setMinLoaderElapsed(false);
      return;
    }

    if (!token) {
      setReady(false);
      setMinLoaderElapsed(false);
      router.replace(projectRoutes.doctorLogin);
      return;
    }

    setReady(false);
    setMinLoaderElapsed(false);

    const timeoutId = window.setTimeout(() => {
      setMinLoaderElapsed(true);
    }, AUTH_GATE_MIN_LOADER_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [hasHydrated, token, router]);

  useEffect(() => {
    if (!hasHydrated || !token) {
      return;
    }

    if (profileQuery.isError || clinicsQuery.isError) {
      setReady(false);
      return;
    }

    if (!profileQuery.isSuccess || !clinicsQuery.isSuccess) {
      setReady(false);
      return;
    }

    const profile = profileQuery.data;
    if (profile) {
      setUserData(profile);
      setCookieClient(
        _isPolicyAccepted,
        `${profile.has_accepted_policies}`,
        '7d',
      );
      setCookieClient(_isUserRole, `${profile.user_type}`, '7d');

      if (profile.has_accepted_policies === false) {
        setReady(false);
        router.replace(projectRoutes.policyAcceptance);
        return;
      }
    }

    const list = clinicsQuery.data ?? [];
    setClinics(list);

    const profileClinicId = profile?.clinic_id;

    const matchedClinic = list.find(
      (clinic) => String(clinic.id) === String(profileClinicId),
    );

    if (matchedClinic) {
      setActiveClinic(matchedClinic?.id.toString());
    } else {
      setActiveClinic(null);
    }

    if (!minLoaderElapsed) {
      return;
    }

    setReady(true);
  }, [
    hasHydrated,
    token,
    minLoaderElapsed,
    profileQuery.isError,
    profileQuery.isSuccess,
    profileQuery.data,
    clinicsQuery.isError,
    clinicsQuery.isSuccess,
    clinicsQuery.data,
    router,
    setUserData,
    setClinics,
    setActiveClinic,
  ]);

  return (
    <>
      <ProjectThemeLoader isOpen={!ready} message={AUTH_GATE_LOADER_MESSAGE} />
      <div
        style={{ display: ready ? 'contents' : 'none' }}
        aria-hidden={!ready}
        inert={!ready}
      >
        {children}
      </div>
    </>
  );
};

export default AuthGate;
