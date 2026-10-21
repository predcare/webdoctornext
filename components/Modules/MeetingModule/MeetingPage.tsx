'use client';

import { MeetingWrapper } from '@/styles/CustomStyled/MeetingWrapper';
import { useMeetingStore } from '@/zustand/stores/useMeetingStore';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import MeetingSidePanel from './MeetingSidePanel';
import MeetingStage from './MeetingStage';

type MeetingPageProps = {
  appointmentId?: string;
  patientId?: string;
  initialPatient?: any;
};

export default function MeetingPage({
  initialPatient,
  patientId,
}: MeetingPageProps) {
  const router = useRouter();
  const token = useMeetingStore((state) => state.token);
  const meetingId = useMeetingStore((state) => state.meetingId);
  const setPatientInfo = useMeetingStore((state) => state.setPatientInfo);

  const handleBackToAppointments = () => {
    router.push('/dashboard/appointments');
  };

  useEffect(() => {
    if (initialPatient) {
      setPatientInfo({
        id: String(initialPatient.id || patientId || ''),
        userId: initialPatient.user_id,
        name: initialPatient.name,
        alphanumericId: initialPatient.patient_id,
        age: initialPatient.age,
        dateOfBirth: initialPatient.date_of_birth,
        gender: initialPatient.gender,
        bloodType: initialPatient.blood_type,
        phone: initialPatient.phone_number,
        email: initialPatient.email,
        complaint: initialPatient.medical_history || initialPatient.complaint,
      });
    }
  }, [initialPatient, patientId, setPatientInfo]);

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

  if (!token || !meetingId) {
    return (
      <MeetingWrapper>
        <Box className="session-empty">
          <VideocamOffIcon className="session-empty-icon" />
          <Typography className="session-empty-title" component="h2">
            No Active Video Call Session
          </Typography>
          <Typography className="session-empty-copy">
            Please start or join your consultation directly from the Appointments
            list.
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
      <MeetingSidePanel />
    </MeetingWrapper>
  );
}
