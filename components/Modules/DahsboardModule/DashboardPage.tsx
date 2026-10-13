'use client';

import CustomTable from '@/components/ui/CustomTable/CustomTable';
import { AppointmentsIcon } from '@/components/ui/Icons/dashboard';
import StatCard from '@/components/ui/StatCard/StatCard';
import useStatIcons from '@/components/ui/StatCard/useStatIcons';
import {
    dashboardAppointments,
    dashboardStats,
    type AppointmentStatus,
} from '@/resources/mock';
import { DashboardStatsGrid } from '@/styles/CustomStyled/StatCardWrapper';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
    Box,
    Button,
    Chip,
    IconButton,
    Menu,
    MenuItem,
    TableCell,
    TableRow,
    Typography,
} from '@mui/material';
import { useMemo, useState } from 'react';

const statusColor: Record<AppointmentStatus, 'info' | 'success' | 'error'> = {
    Scheduled: 'info',
    Completed: 'success',
    Cancelled: 'error',
};

const headList = [
    'Patient',
    'Appointment ID',
    'Date',
    'Time',
    'Status',
    'Actions',
];

export default function DashboardModulePage() {
    const statIcons = useStatIcons();
    const [actionAnchor, setActionAnchor] = useState<HTMLElement | null>(null);
    const [search, setSearch] = useState('');
    const appointments = useMemo(() => {
        const query = search.trim().toLowerCase();
        if (!query) return dashboardAppointments;

        return dashboardAppointments.filter((row) =>
            [
                row.name,
                row.appointmentId,
                row.date,
                row.status,
                `${row.startTime} to ${row.endTime}`,
                `${row.age}`,
            ]
                .join(' ')
                .toLowerCase()
                .includes(query),
        );
    }, [search]);

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
                    />
                ))}
            </DashboardStatsGrid>

            <CustomTable
                headList={headList}
                customHeader={
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '12px',
                            flexWrap: 'wrap',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                minWidth: 0,
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'inline-flex',
                                    color: (theme) => theme.palette.customColors.brandTeal,
                                }}
                            >
                                <AppointmentsIcon size={20} />
                            </Box>
                            <Typography
                                component="h2"
                                sx={{
                                    margin: 0,
                                    fontSize: 16,
                                    fontWeight: 700,
                                    lineHeight: '22px',
                                    color: (theme) => theme.palette.customColors.heading,
                                }}
                            >
                                Today&apos;s Appointments
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                flexShrink: 0,
                            }}
                        >
                            <Button
                                variant="contained"
                                disableElevation
                                sx={{
                                    height: 36,
                                    px: 1.75,
                                    borderRadius: '8px',
                                    textTransform: 'none',
                                    fontSize: 13,
                                    fontWeight: 600,
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                + Add Appointment
                            </Button>
                            <Button
                                variant="text"
                                sx={{
                                    minWidth: 0,
                                    px: 1,
                                    textTransform: 'none',
                                    fontSize: 14,
                                    fontWeight: 600,
                                    whiteSpace: 'nowrap',
                                    color: (theme) => theme.palette.customColors.brandTeal,
                                }}
                            >
                                View All
                            </Button>
                        </Box>
                    </Box>
                }
                page={1}
                totalPages={2}
                onPageChange={() => { }}
                onClear={() => setSearch('')}
                isEmpty={appointments.length === 0}
                emptyText="No appointments found"
                emptyDescription={
                    search.trim()
                        ? 'Change the search or clear it to see appointments.'
                        : undefined
                }
            >
                {appointments.map((row) => (
                    <TableRow key={row.id}>
                        <TableCell>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    minWidth: 0,
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 36,
                                        height: 36,
                                        borderRadius: '50%',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                        background: (theme) => theme.palette.customColors.brandTeal,
                                        color: '#ffffff',
                                        fontSize: 14,
                                        fontWeight: 700,
                                    }}
                                >
                                    {row.initial}
                                </Box>
                                <Box sx={{ minWidth: 0 }}>
                                    <Typography
                                        component="p"
                                        sx={{
                                            margin: 0,
                                            fontSize: 13,
                                            fontWeight: 600,
                                            lineHeight: '18px',
                                            color: (theme) => theme.palette.customColors.heading,
                                        }}
                                    >
                                        {row.name}
                                    </Typography>
                                    <Typography
                                        component="p"
                                        sx={{
                                            margin: 0,
                                            fontSize: 12,
                                            fontWeight: 400,
                                            lineHeight: '16px',
                                            color: (theme) => theme.palette.customColors.textMuted,
                                        }}
                                    >
                                        {row.age} yrs
                                    </Typography>
                                </Box>
                            </Box>
                        </TableCell>
                        <TableCell>{row.appointmentId}</TableCell>
                        <TableCell>{row.date}</TableCell>
                        <TableCell>
                            {row.startTime} to {row.endTime}
                        </TableCell>
                        <TableCell>
                            <Chip
                                label={row.status}
                                size="small"
                                color={statusColor[row.status]}
                            />
                        </TableCell>
                        <TableCell>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexWrap: 'nowrap',
                                    gap: '8px',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                <Button
                                    size="small"
                                    variant="contained"
                                    disableElevation
                                    sx={{
                                        flexShrink: 0,
                                        textTransform: 'none',
                                        whiteSpace: 'nowrap',
                                        fontSize: 12,
                                        fontWeight: 600,
                                        height: 32,
                                        px: 1.25,
                                    }}
                                >
                                    Start Consultation
                                </Button>
                                <IconButton
                                    size="small"
                                    aria-label={`Actions for ${row.name}`}
                                    onClick={(event) => setActionAnchor(event.currentTarget)}
                                >
                                    <MoreVertIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        </TableCell>
                    </TableRow>
                ))}
            </CustomTable>

            <Menu
                anchorEl={actionAnchor}
                open={Boolean(actionAnchor)}
                onClose={() => setActionAnchor(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <MenuItem onClick={() => setActionAnchor(null)}>View</MenuItem>
            </Menu>
        </Box>
    );
}
