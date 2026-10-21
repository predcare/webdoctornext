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

  // 3. useMemo & Functions
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

  // 5. Render Guards & JSX
  if (!token || !meetingId) {
    return (
      <Box
        sx={{
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          textAlign: 'center',
          p: 3,
        }}
      >
        <VideocamOffIcon sx={{ fontSize: 64, color: '#94a3b8' }} />
        <Typography variant="h5" sx={{ fontWeight: 600 }} color="text.primary">
          No Active Video Call Session
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 420 }}
        >
          Please start or join your consultation directly from the Appointments
          list.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleBackToAppointments}
          sx={{ mt: 1, borderRadius: 2 }}
        >
          View Appointments
        </Button>
      </Box>
    );
  }

  return (
    <MeetingWrapper>
      <MeetingStage />
      <MeetingSidePanel />
    </MeetingWrapper>
  );
}
