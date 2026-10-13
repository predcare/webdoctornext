'use client';

import {
  CancelledIcon,
  CompletedIcon,
  ConfirmedIcon,
} from '@/components/ui/Icons/appointments';
import { AppointmentsIcon } from '@/components/ui/Icons/dashboard';
import StatCard from '@/components/ui/StatCard/StatCard';
import { appointmentToday, type DashboardAppointment } from '@/resources/mock';
import { DashboardStatsGrid } from '@/styles/CustomStyled/StatCardWrapper';
import { memo, useMemo } from 'react';

type AppointmentSummaryCardsProps = {
  appointments: DashboardAppointment[];
};

const countSummary = (appointments: DashboardAppointment[]) => {
  const upcoming = appointments.filter(
    (row) =>
      (row.status === 'Confirmed' || row.status === 'In Progress') &&
      row.dateValue >= appointmentToday,
  ).length;

  return {
    today: appointments.filter((row) => row.dateValue === appointmentToday)
      .length,
    total: appointments.length,
    upcoming,
    completed: appointments.filter((row) => row.status === 'Completed').length,
    cancelled: appointments.filter((row) => row.status === 'Cancelled').length,
  };
};

function AppointmentSummaryCards({
  appointments,
}: AppointmentSummaryCardsProps) {
  const summary = useMemo(() => countSummary(appointments), [appointments]);
  const icons = useMemo(
    () => ({
      today: <AppointmentsIcon size={20} />,
      total: <AppointmentsIcon size={20} />,
      upcoming: <ConfirmedIcon size={20} />,
      completed: <CompletedIcon size={20} />,
      cancelled: <CancelledIcon size={20} />,
    }),
    [],
  );

  return (
    <DashboardStatsGrid className="fit-row">
      <StatCard
        compact
        title="Today"
        value={String(summary.today)}
        period="Appointments"
        tone="teal"
        icon={icons.today}
      />
      <StatCard compact title="Total" value={String(summary.total)} tone="info" icon={icons.total} />
      <StatCard compact title="Upcoming" value={String(summary.upcoming)} tone="teal" icon={icons.upcoming} />
      <StatCard compact title="Completed" value={String(summary.completed)} tone="success" icon={icons.completed} />
      <StatCard compact title="Cancelled" value={String(summary.cancelled)} tone="warning" icon={icons.cancelled} />
    </DashboardStatsGrid>
  );
}

export default memo(AppointmentSummaryCards);
