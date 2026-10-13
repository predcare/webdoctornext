'use client';

import {
  AppointmentsIcon,
  BillingIcon,
  PatientsIcon,
  ReportsIcon,
} from '@/components/ui/Icons/dashboard';
import type { DashboardStatIcon } from '@/resources/mock';
import { useMemo, type ReactNode } from 'react';

const useStatIcons = () => {
  return useMemo<Record<DashboardStatIcon, ReactNode>>(
    () => ({
      patients: <PatientsIcon size={20} />,
      appointments: <AppointmentsIcon size={20} />,
      consultations: <ReportsIcon size={20} />,
      billing: <BillingIcon size={20} />,
    }),
    [],
  );
};

export default useStatIcons;
