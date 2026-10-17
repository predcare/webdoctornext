'use client';

import {
  CompletedIcon,
  ConfirmedIcon,
  InProgressIcon,
} from '@/components/ui/Icons/appointments';
import { AppointmentsIcon } from '@/components/ui/Icons/dashboard';
import StatCard, { type StatCardTone } from '@/components/ui/StatCard/StatCard';
import { useMyAppointmentStats } from '@/hooks/react-query/appointments/appointments.hooks';
import { DashboardStatsGrid } from '@/styles/CustomStyled/StatCardWrapper';
import type { IMyApptStatus } from '@/typescripts/interfaces/appointments.interfaces';
import { memo, type ReactNode } from 'react';

type TStatKey = Exclude<keyof IMyApptStatus, 'date'>;

const statCards: {
  key: TStatKey;
  title: string;
  period?: string;
  tone: StatCardTone;
  icon: ReactNode;
}[] = [
    {
      key: 'today_count',
      title: 'Today',
      period: 'Appointments',
      tone: 'teal',
      icon: <AppointmentsIcon size={20} />,
    },
    {
      key: 'total_appointments',
      title: 'Total',
      tone: 'info',
      icon: <AppointmentsIcon size={20} />,
    },
    {
      key: 'confirmed_count',
      title: 'Confirmed',
      tone: 'teal',
      icon: <ConfirmedIcon size={20} />,
    },
    {
      key: 'in_progress_count',
      title: 'In Progress',
      tone: 'info',
      icon: <InProgressIcon size={20} />,
    },
    {
      key: 'completed_count',
      title: 'Completed',
      tone: 'success',
      icon: <CompletedIcon size={20} />,
    },
  ];

function AppointmentSummaryCards() {
  const { data: apptStats } = useMyAppointmentStats();

  if (!apptStats) return null;

  const visibleCards = statCards.filter(
    (card) => typeof apptStats[card.key] === 'number',
  );

  if (visibleCards.length === 0) return null;

  return (
    <DashboardStatsGrid className="fit-row">
      {visibleCards.map((card) => (
        <StatCard
          key={card.key}
          compact
          title={card.title}
          value={String(apptStats[card.key])}
          period={card.period}
          tone={card.tone}
          icon={card.icon}
        />
      ))}
    </DashboardStatsGrid>
  );
}

export default memo(AppointmentSummaryCards);
