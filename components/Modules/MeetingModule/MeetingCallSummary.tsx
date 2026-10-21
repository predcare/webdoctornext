'use client';

import { useJoinVideoCall } from '@/hooks/commons/meeting/useJoinVideoCall';
import { useMyAppointmentInfo } from '@/hooks/react-query/appointments/appointments.hooks';
import { _toTitleCase, formatDate, formatTimeSlot, getAge } from '@/lib/commons/common.utils';
import { projectRoutes } from '@/routes';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ListAltIcon from '@mui/icons-material/ListAlt';
import VideocamIcon from '@mui/icons-material/Videocam';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export default function MeetingCallSummary() {
  // 1. States & Refs
  // (none)

  // 2. Hooks
  const router = useRouter();
  const searchParams = useSearchParams();
  const appointmentId = searchParams.get('appointmentId') || '';

  const { data: apptInfo, isLoading } = useMyAppointmentInfo({
    id: appointmentId,
  });

  const { joinVideoCall, isJoining } = useJoinVideoCall();

  // 3. useMemo & Functions
  const canRejoin = useMemo(() => {
    if (!apptInfo) return false;
    const isVideo = apptInfo.consultation_type?.toLowerCase() === 'video';
    const status = apptInfo.appointment_status?.toLowerCase();
    const isSlotNotExpired =
      apptInfo.call_end_reason !== 'slot_duration_completed';
    return isVideo && ['confirmed', 'in_progress'].includes(status) && isSlotNotExpired;
  }, [apptInfo]);

  const handleRejoin = () => {
    if (!apptInfo) return;
    joinVideoCall({
      appointmentId: apptInfo.id,
      patientId: apptInfo.patient?.id || apptInfo.patient_id,
      patientName: apptInfo.patient?.name,
      appointmentGeneratedId: apptInfo.appointment_id,
    });
  };

  const handleGoAppointments = () => {
    router.push(projectRoutes.appointments);
  };

  const handleWritePrescription = () => {
    router.push(projectRoutes.patients);
  };

  // 4. useEffects
  // (none)

  // 5. Render Guards & JSX
  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        <CircularProgress size={40} sx={{ color: '#0d9488' }} />
        <Typography variant="body2" color="text.secondary">
          Loading consultation summary...
        </Typography>
      </Box>
    );
  }

  const patientName = apptInfo?.patient?.name || 'Patient';
  const patientCode = apptInfo?.patient?.patient_id || 'N/A';
  const age = apptInfo?.patient?.date_of_birth
    ? `${getAge(apptInfo.patient.date_of_birth)} Years`
    : 'N/A';
  const gender = _toTitleCase(apptInfo?.patient?.gender || '') || 'N/A';

  return (
    <Box
      sx={{
        maxWidth: 720,
        mx: 'auto',
        py: { xs: 3, md: 5 },
        px: { xs: 2, sm: 3 },
      }}
    >
      <Card
        sx={{
          borderRadius: 4,
          boxShadow: '0 4px 20px rgba(15, 23, 42, 0.08)',
          border: '1px solid #e2e8f0',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            py: 3,
            px: 4,
            backgroundColor: '#f0fdf4',
            borderBottom: '1px solid #dcfce7',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <CheckCircleOutlineIcon sx={{ fontSize: 36, color: '#16a34a' }} />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }} color="#15803d">
              Consultation Call Ended
            </Typography>
            <Typography variant="body2" color="#166534">
              Your video consultation session has ended.
            </Typography>
          </Box>
        </Box>

        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          {/* Patient Details Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Avatar
              sx={{
                width: 56,
                height: 56,
                bgcolor: '#0d9488',
                fontSize: '1.5rem',
                fontWeight: 700,
              }}
            >
              {patientName.charAt(0).toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {patientName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Patient ID: {patientCode} &bull; {gender}, {age}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 2.5 }} />

          {/* Appointment Meta Details */}
          <Grid container spacing={2}>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                APPOINTMENT ID
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600, mt: 0.5 }}>
                {apptInfo?.appointment_id || appointmentId || 'N/A'}
              </Typography>
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                DATE
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600, mt: 0.5 }}>
                {apptInfo?.appointment_date ? formatDate(apptInfo.appointment_date) : 'N/A'}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                TIME SLOT
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600, mt: 0.5 }}>
                {formatTimeSlot(apptInfo?.start_time, apptInfo?.end_time) || 'N/A'}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Action Buttons */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              justifyContent: 'flex-end',
            }}
          >
            <Button
              variant="outlined"
              color="inherit"
              onClick={handleGoAppointments}
              startIcon={<ListAltIcon />}
              sx={{ borderRadius: 2 }}
            >
              Back to Appointments
            </Button>

            <Button
              variant="outlined"
              color="primary"
              onClick={handleWritePrescription}
              startIcon={<DescriptionOutlinedIcon />}
              sx={{ borderRadius: 2 }}
            >
              Write Prescription
            </Button>

            {canRejoin && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleRejoin}
                disabled={isJoining}
                startIcon={<VideocamIcon />}
                sx={{ borderRadius: 2 }}
              >
                {isJoining ? 'Rejoining...' : 'Rejoin Call'}
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
