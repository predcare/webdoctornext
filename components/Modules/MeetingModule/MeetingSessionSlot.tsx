'use client';

import { normalizePathname, projectRoutes } from '@/routes';
import { useLoadingStore } from '@/zustand/stores/useLoadingStore';
import { usePathname } from 'next/navigation';
import { ComponentType, ReactNode, useEffect, useState } from 'react';

type MeetingSessionSlotProps = {
  children: ReactNode;
};

type MeetingSessionHostComponent = ComponentType<MeetingSessionSlotProps>;

export default function MeetingSessionSlot({ children }: MeetingSessionSlotProps) {
  const [MeetingSessionHost, setMeetingSessionHost] =
    useState<MeetingSessionHostComponent | null>(null);

  const pathname = normalizePathname(usePathname() || '');
  const isLoading = useLoadingStore((state) => state.isLoading);
  const loaderMessage = useLoadingStore((state) => state.message);
  const hideLoader = useLoadingStore((state) => state.hideLoader);

  useEffect(() => {
    let isMounted = true;

    import('./MeetingSessionHost').then((module) => {
      if (isMounted) {
        setMeetingSessionHost(() => module.default);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (
      pathname === projectRoutes.meeting &&
      isLoading &&
      loaderMessage.toLowerCase().includes('joining')
    ) {
      hideLoader();
    }
  }, [pathname, isLoading, loaderMessage, hideLoader]);

  if (!MeetingSessionHost) {
    return children;
  }

  return <MeetingSessionHost>{children}</MeetingSessionHost>;
}
