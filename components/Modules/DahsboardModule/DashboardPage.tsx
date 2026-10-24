'use client';

import type { DashboardStat } from '@/components/Modules/DahsboardModule/constants/dashboardStats';
import TodayAppointmentsTable from '@/components/Modules/DahsboardModule/TodayAppointments/TodayAppointmentsTable';
import StatCard from '@/components/ui/StatCard/StatCard';
import useStatIcons from '@/components/ui/StatCard/useStatIcons';
import { useDoctorStats } from '@/hooks/react-query/stats/stats.hooks';
import { _formatShortNum } from '@/lib/commons/common.utils';
import { DashboardStatsGrid } from '@/styles/CustomStyled/StatCardWrapper';
import { useAuthStore } from '@/zustand/stores/useAuthStore';
import { Box } from '@mui/material';
import { useMemo } from 'react';

export default function DashboardModulePage() {
    const statIcons = useStatIcons();

    const { userData } = useAuthStore((state) => state);

    const { data: statsInfo, isPending: statsPending } = useDoctorStats({
        clinic_id: Number(userData?.clinic?.id) || 0,
    });

    const dashboardStats = useMemo<DashboardStat[]>(
        () => [
            {
                id: 'patients',
                title: 'Total Patients',
                value: `${statsInfo?.total_patients ?? 0}`,
                icon: 'patients',
                tone: 'info',
            },
            {
                id: 'appointments',
                title: 'Total Appointments',
                value: `${statsInfo?.upcoming_appointments ?? 0}`,
                period: 'Today',
                icon: 'appointments',
                tone: 'teal',
            },
            {
                id: 'consultations',
                title: 'Total Consultations',
                value: `${statsInfo?.week_appointments ?? 0}`,
                period: 'This month',
                icon: 'consultations',
                tone: 'warning',
            },
            {
                id: 'billed',
                title: 'Billed Amount',
                value: _formatShortNum(statsInfo?.earnings || 0),
                period: 'Monthly',
                icon: 'billing',
                tone: 'success',
            },
        ],
        [statsInfo],
    );

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <DashboardStatsGrid>
                {dashboardStats.map((stat) => (
                    <StatCard
                        key={stat.id}
                        title={stat.title}
                        value={stat.value}
                        period={stat.period}
                        tone={stat.tone}
                        icon={statIcons[stat.icon]}
                        loading={statsPending}
                    />
                ))}
            </DashboardStatsGrid>
            <TodayAppointmentsTable />
        </Box>
    );
}
