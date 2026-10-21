'use client';

import { useJoinVideoCall } from '@/hooks/commons/meeting/useJoinVideoCall';
import { useMyAppointmentInfo } from '@/hooks/react-query/appointments/appointments.hooks';
import {
  _toTitleCase,
  formatDate,
  formatTimeSlot,
  getAge,
  getInitials,
  isInProgressStatus,
  resolveAppointmentDurationMinutes,
  shouldHideJoinForCallDuration,
} from '@/lib/commons/common.utils';
import { projectRoutes } from '@/routes';
import { MeetingWrapper } from '@/styles/CustomStyled/MeetingWrapper';
import { useMeetingStore } from '@/zustand/stores/useMeetingStore';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import VideocamIcon from '@mui/icons-material/Videocam';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import MeetingSummarySkeleton from './MeetingSummarySkeleton';

export default function MeetingCallSummary() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const appointmentId = searchParams.get('appointmentId') || '';

  const { data: apptInfo, isFetching: apptInfoLoading } = useMyAppointmentInfo({
    id: appointmentId,
  });

  const { joinVideoCall, isJoining } = useJoinVideoCall();

  const isVideo = apptInfo?.consultation_type?.toLowerCase() === 'video';

  const durationMinutes = useMemo(() => {
    return resolveAppointmentDurationMinutes(
      Number(apptInfo?.appointment_duration),
      apptInfo?.slot_duration_minutes,
      apptInfo?.start_time,
      apptInfo?.end_time,
    );
  }, [
    apptInfo?.appointment_duration,
    apptInfo?.slot_duration_minutes,
    apptInfo?.start_time,
    apptInfo?.end_time,
  ]);

  const hideJoin = shouldHideJoinForCallDuration({
    status: apptInfo?.appointment_status,
    appointmentDurationMinutes: durationMinutes,
    callDurationSeconds: Number(apptInfo?.call_duration_seconds || 0),
  });

  const canJoin = isVideo && !hideJoin;

  const joinLabel =
    isInProgressStatus(apptInfo?.appointment_status) ||
      Number(apptInfo?.call_duration_seconds || 0) > 0
      ? 'Rejoin Call'
      : 'Join Call';

  const clinicInfo = [apptInfo?.clinic?.name, apptInfo?.clinic?.city]
    .filter(Boolean)
    .join(' • ');

  const paymentDetails =
    [
      _toTitleCase(apptInfo?.payment_status || ''),
      _toTitleCase(apptInfo?.payment_type || ''),
    ]
      .filter(Boolean)
      .join(' • ') || 'N/A';

  const patientLocation = [apptInfo?.patient?.city, apptInfo?.patient?.state]
    .filter(Boolean)
    .join(', ');

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
    router.replace(projectRoutes.appointments);
  };

  const handleWritePrescription = () => {
    const patientId = apptInfo?.patient?.id || apptInfo?.patient_id;
    if (patientId) {
      router.push(
        projectRoutes.managePrescription({ patientId: String(patientId) }),
      );
    } else {
      router.push(projectRoutes.managePrescriptions);
    }
  };

  useEffect(() => {
    useMeetingStore.getState().resetMeetingStore();
  }, []);

  if (apptInfoLoading) {
    return <MeetingSummarySkeleton />;
  }

  return (
    <MeetingWrapper>
      <Box className="summary-page">
        <Card className="summary-card">
          <Box className="summary-banner">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
            <Chip
              label={_toTitleCase(apptInfo?.appointment_status || '')}
              color="success"
              size="small"
              sx={{ fontWeight: 700, textTransform: 'capitalize' }}
            />
          </Box>

          <CardContent className="summary-body">
            <Box className="summary-identity">
              <Avatar
                className="summary-avatar"
                src={apptInfo?.patient?.profile_image || undefined}
                sx={{ width: 64, height: 64, fontSize: 24, fontWeight: 700 }}
              >
                {getInitials(apptInfo?.patient?.name || '-')}
              </Avatar>
              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    flexWrap: 'wrap',
                  }}
                >
                  <Typography className="summary-name" component="h3">
                    {apptInfo?.patient?.name}
                  </Typography>
                  {apptInfo?.patient?.patient_id && (
                    <Chip
                      label={`ID: ${apptInfo.patient.patient_id}`}
                      size="small"
                      variant="outlined"
                      sx={{ fontWeight: 600, height: 22 }}
                    />
                  )}
                </Box>
                <Typography className="summary-identity-copy">
                  {_toTitleCase(apptInfo?.patient?.gender || '') || 'Gender N/A'}
                  {apptInfo?.patient?.date_of_birth
                    ? `, ${getAge(apptInfo.patient.date_of_birth)} Years`
                    : ''}
                </Typography>
                <Box className="summary-contact-row">
                  {apptInfo?.patient?.phone_number && (
                    <span className="summary-contact-item">
                      <PhoneOutlinedIcon />
                      {apptInfo?.patient?.phone_number}
                    </span>
                  )}
                  {apptInfo?.patient?.email && (
                    <span className="summary-contact-item">
                      <EmailOutlinedIcon />
                      {apptInfo?.patient?.email}
                    </span>
                  )}
                  {patientLocation && (
                    <span className="summary-contact-item">
                      <LocationOnOutlinedIcon />
                      {patientLocation}
                    </span>
                  )}
                </Box>
              </Box>
            </Box>

            <Divider className="summary-divider" />
            <Typography className="summary-section-heading">
              Appointment Details
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Box className="summary-meta-card">
                  <Typography className="summary-meta-label">
                    <CalendarTodayIcon /> APPOINTMENT ID
                  </Typography>
                  <Typography className="summary-meta-value">
                    {apptInfo?.appointment_id || 'N/A'}
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Box className="summary-meta-card">
                  <Typography className="summary-meta-label">
                    <CalendarTodayIcon /> DATE
                  </Typography>
                  <Typography className="summary-meta-value">
                    {formatDate(apptInfo?.appointment_date)}
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Box className="summary-meta-card">
                  <Typography className="summary-meta-label">
                    <AccessTimeIcon /> TIME SLOT
                  </Typography>
                  <Typography className="summary-meta-value">
                    {formatTimeSlot(apptInfo?.start_time, apptInfo?.end_time)}
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Box className="summary-meta-card">
                  <Typography className="summary-meta-label">
                    <AccessTimeIcon /> DURATION
                  </Typography>
                  <Typography className="summary-meta-value">
                    {durationMinutes ? `${durationMinutes} Mins` : 'N/A'}
                  </Typography>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Box className="summary-meta-card">
                  <Typography className="summary-meta-label">
                    VISIT TYPE
                  </Typography>
                  <Typography className="summary-meta-value">
                    {_toTitleCase(
                      apptInfo?.appointment_type?.replace(/_/g, ' ') || '',
                    ) || 'Consultation'}
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Box className="summary-meta-card">
                  <Typography className="summary-meta-label">
                    <PaymentOutlinedIcon /> CONSULTATION FEE
                  </Typography>
                  <Typography className="summary-meta-value">
                    {apptInfo?.appointment_fee != null
                      ? `₹${apptInfo.appointment_fee}`
                      : 'N/A'}
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Box className="summary-meta-card">
                  <Typography className="summary-meta-label">
                    <PaymentOutlinedIcon /> PAYMENT
                  </Typography>
                  <Typography className="summary-meta-value">
                    {paymentDetails}
                  </Typography>
                </Box>
              </Grid>
              {clinicInfo && (
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Box className="summary-meta-card">
                    <Typography className="summary-meta-label">
                      <LocalHospitalOutlinedIcon /> CLINIC
                    </Typography>
                    <Typography
                      className="summary-meta-value"
                      noWrap
                      title={clinicInfo}
                    >
                      {clinicInfo}
                    </Typography>
                  </Box>
                </Grid>
              )}
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

              {['in_progress', 'in-progress'].includes(
                apptInfo?.appointment_status?.trim() as string,
              ) && (
                  <Button
                    className="summary-action"
                    variant="outlined"
                    color="primary"
                    onClick={handleWritePrescription}
                    startIcon={<DescriptionOutlinedIcon />}
                  >
                    Write Prescription
                  </Button>
                )}

              {canJoin && (
                <Button
                  className="summary-action"
                  variant="contained"
                  color="primary"
                  onClick={handleRejoin}
                  disabled={isJoining}
                  startIcon={<VideocamIcon />}
                >
                  {isJoining ? 'Joining...' : joinLabel}
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </MeetingWrapper>
  );
}
