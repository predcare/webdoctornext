'use client';

import StatCard from '@/components/ui/StatCard/StatCard';
import useStatIcons from '@/components/ui/StatCard/useStatIcons';
import { dashboardStats } from '@/resources/mock';
import { DashboardStatsGrid } from '@/styles/CustomStyled/StatCardWrapper';

export default function DashboardModulePage() {
    const statIcons = useStatIcons();

    return (
        <DashboardStatsGrid>
            {dashboardStats.map((stat) => (
                <StatCard
                    key={stat.id}
                    title={stat.title}
                    value={stat.value}
                    period={stat.period}
                    tone={stat.tone}
                    icon={statIcons[stat.icon]}
                />
            ))}
        </DashboardStatsGrid>
    );
}
