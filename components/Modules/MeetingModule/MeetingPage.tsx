'use client';

import { useMyAppointmentInfo } from '@/hooks/react-query/appointments/appointments.hooks';
import { useMyPatientInfo } from '@/hooks/react-query/patients/patients.hooks';
import { projectRoutes } from '@/routes';
import { MeetingWrapper } from '@/styles/CustomStyled/MeetingWrapper';
import { useMeetingStore } from '@/zustand/stores/useMeetingStore';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import MeetingCallSkeleton from './MeetingCallSkeleton';
import MeetingSidePanel from './MeetingSidePanel';
import MeetingStage from './MeetingStage';

type MeetingPageProps = {
  patientId: string;
  appointmentId: string;
};

export default function MeetingPage({
  patientId,
  appointmentId,
}: MeetingPageProps) {
  const router = useRouter();
  const token = useMeetingStore((state) => state.token);
  const meetingId = useMeetingStore((state) => state.meetingId);
  const setPatientInfo = useMeetingStore((state) => state.setPatientInfo);

  const { data: patient, isFetching: pendingPatient } = useMyPatientInfo({
    patientId,
  });
  const { isFetching: pendingAppointment } = useMyAppointmentInfo({
    id: appointmentId,
  });

  const isCallDataLoading = pendingPatient || pendingAppointment;

  const handleBackToAppointments = () => {
    router.replace(projectRoutes.appointments);
  };

  useEffect(() => {
    if (!patient) return;

    setPatientInfo({
      id: String(patient.id || patientId),
      userId: patient.user_id,
      name: patient.name,
      alphanumericId: patient.patient_id,
      age: patient.age_display,
      dateOfBirth: patient.date_of_birth,
      gender: patient.gender_display || patient.gender,
      bloodType: patient.blood_type,
      phone: patient.phone_number,
      email: patient.email,
      complaint: patient.medical_history,
      profileImage:
        typeof patient.profile_image === 'string'
          ? patient.profile_image
          : undefined,
    });
  }, [patient, patientId, setPatientInfo]);

  useEffect(() => {
    if (!token) return;

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [token]);

  if (isCallDataLoading) {
    return (
      <MeetingWrapper>
        <MeetingCallSkeleton />
      </MeetingWrapper>
    );
  }

  if (!token || !meetingId) {
    return (
      <MeetingWrapper>
        <Box className="session-empty">
          <VideocamOffIcon className="session-empty-icon" />
          <Typography className="session-empty-title" component="h2">
            No Active Video Call Session
          </Typography>
          <Typography className="session-empty-copy">
            Please start or join your consultation directly from the
            Appointments list.
          </Typography>
          <Button
            className="session-empty-action"
            variant="contained"
            color="primary"
            onClick={handleBackToAppointments}
          >
            View Appointments
          </Button>
        </Box>
      </MeetingWrapper>
    );
  }

  return (
    <MeetingWrapper>
      <MeetingStage />
      <MeetingSidePanel patient={patient} />
    </MeetingWrapper>
  );
}
