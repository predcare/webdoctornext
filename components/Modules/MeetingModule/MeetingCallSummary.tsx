'use client';

import { useJoinVideoCall } from '@/hooks/commons/meeting/useJoinVideoCall';
import { useMyAppointmentInfo } from '@/hooks/react-query/appointments/appointments.hooks';
import { _toTitleCase, formatDate, formatTimeSlot, getAge } from '@/lib/commons/common.utils';
import { projectRoutes } from '@/routes';
import { MeetingWrapper } from '@/styles/CustomStyled/MeetingWrapper';
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

  const router = useRouter();
  const searchParams = useSearchParams();
  const appointmentId = searchParams.get('appointmentId') || '';

  const { data: apptInfo, isLoading } = useMyAppointmentInfo({
    id: appointmentId,
  });

  const { joinVideoCall, isJoining } = useJoinVideoCall();

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

  if (isLoading) {
    return (
      <MeetingWrapper>
        <Box className="summary-loading">
          <CircularProgress className="summary-spinner" size={40} />
          <Typography className="summary-identity-copy">
            Loading consultation summary...
          </Typography>
        </Box>
      </MeetingWrapper>
    );
  }

  const patientName = apptInfo?.patient?.name || 'Patient';
  const patientCode = apptInfo?.patient?.patient_id || 'N/A';
  const age = apptInfo?.patient?.date_of_birth
    ? `${getAge(apptInfo.patient.date_of_birth)} Years`
    : 'N/A';
  const gender = _toTitleCase(apptInfo?.patient?.gender || '') || 'N/A';

  return (
    <MeetingWrapper>
      <Box className="summary-page">
        <Card className="summary-card">
          <Box className="summary-banner">
            <CheckCircleOutlineIcon className="summary-banner-icon" />
            <Box>
              <Typography className="summary-banner-title" component="h2">
                Consultation Call Ended
              </Typography>
              <Typography className="summary-banner-copy">
                Your video consultation session has ended.
              </Typography>
            </Box>
          </Box>

          <CardContent className="summary-body">
            <Box className="summary-identity">
              <Avatar className="summary-avatar">{patientName.charAt(0).toUpperCase()}</Avatar>
              <Box>
                <Typography className="summary-name" component="h3">
                  {patientName}
                </Typography>
                <Typography className="summary-identity-copy">
                  Patient ID: {patientCode} &bull; {gender}, {age}
                </Typography>
              </Box>
            </Box>

            <Divider className="summary-divider" />

            <Grid container spacing={2}>
              <Grid size={{ xs: 6, sm: 4 }}>
                <Typography className="summary-meta-label">APPOINTMENT ID</Typography>
                <Typography className="summary-meta-value">
                  {apptInfo?.appointment_id || appointmentId || 'N/A'}
                </Typography>
              </Grid>
              <Grid size={{ xs: 6, sm: 4 }}>
                <Typography className="summary-meta-label">DATE</Typography>
                <Typography className="summary-meta-value">
                  {apptInfo?.appointment_date ? formatDate(apptInfo.appointment_date) : 'N/A'}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Typography className="summary-meta-label">TIME SLOT</Typography>
                <Typography className="summary-meta-value">
                  {formatTimeSlot(apptInfo?.start_time, apptInfo?.end_time) || 'N/A'}
                </Typography>
              </Grid>
            </Grid>

            <Divider className="summary-divider" />

            <Box className="summary-actions">
              <Button
                className="summary-action"
                variant="outlined"
                color="inherit"
                onClick={handleGoAppointments}
                startIcon={<ListAltIcon />}
              >
                Back to Appointments
              </Button>

              <Button
                className="summary-action"
                variant="outlined"
                color="primary"
                onClick={handleWritePrescription}
                startIcon={<DescriptionOutlinedIcon />}
              >
                Write Prescription
              </Button>

              {canRejoin && (
                <Button
                  className="summary-action"
                  variant="contained"
                  color="primary"
                  onClick={handleRejoin}
                  disabled={isJoining}
                  startIcon={<VideocamIcon />}
                >
                  {isJoining ? 'Rejoining...' : 'Rejoin Call'}
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </MeetingWrapper>
  );
}
