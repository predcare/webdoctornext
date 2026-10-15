'use client';

import { CancelledIcon, CompletedIcon, ConfirmedIcon } from '@/components/ui/Icons/appointments';
import { AppointmentsIcon } from '@/components/ui/Icons/dashboard';
import StatCard from '@/components/ui/StatCard/StatCard';
import { DashboardStatsGrid } from '@/styles/CustomStyled/StatCardWrapper';
import { memo } from 'react';

function PatientAppointmentStatsCards() {
  return (
    <DashboardStatsGrid className="fit-row">
      <StatCard compact title="Total" value="10" period="Appointments" tone="info" icon={<AppointmentsIcon size={20} />} />
      <StatCard compact title="Today" value="5" period="Appointments" tone="teal" icon={<AppointmentsIcon size={20} />} />
      <StatCard compact title="Upcoming" value="3" tone="teal" icon={<ConfirmedIcon size={20} />} />
      <StatCard compact title="Completed" value="2" tone="success" icon={<CompletedIcon size={20} />} />
      <StatCard compact title="Cancelled" value="1" tone="warning" icon={<CancelledIcon size={20} />} />
    </DashboardStatsGrid>
  );
}

export default memo(PatientAppointmentStatsCards);
