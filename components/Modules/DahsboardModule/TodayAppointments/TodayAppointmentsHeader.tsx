'use client';

import { AppointmentsIcon } from '@/components/ui/Icons/dashboard';
import { projectRoutes } from '@/routes';
import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { memo } from 'react';

function TodayAppointmentsHeader() {
    const router = useRouter();

    return (
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
                    type="button"
                    onClick={() => router.push(projectRoutes.bookAppointment)}
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
                    type="button"
                    onClick={() => router.push(projectRoutes.appointments)}
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
    );
}

export default memo(TodayAppointmentsHeader);
