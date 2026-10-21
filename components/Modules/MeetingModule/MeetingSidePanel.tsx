'use client';

import CustomInput from '@/components/ui/CustomInput/CustomInput';
import { _toTitleCase, getAge, getInitials } from '@/lib/commons/common.utils';
import { showErrorToast } from '@/lib/commons/toast';
import { projectRoutes } from '@/routes';
import { IMyPatientDoc } from '@/typescripts/interfaces/patients.interfaces';
import { useMeetingStore } from '@/zustand/stores/useMeetingStore';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import { Avatar, Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { memo, useCallback, useMemo } from 'react';

type MeetingSidePanelProps = {
  patient?: IMyPatientDoc | null;
};

function MeetingSidePanel({ patient }: MeetingSidePanelProps) {
  const router = useRouter();
  const doctorNotes = useMeetingStore((state) => state.doctorNotes);
  const appointmentId = useMeetingStore((state) => state.appointmentId);
  const setDoctorNotes = useMeetingStore((state) => state.setDoctorNotes);

  const patientName = patient?.name || 'Patient';
  const patientId = patient?.patient_id || patient?.id || 'N/A';
  const age = useMemo(() => {
    if (patient?.date_of_birth) return `${getAge(patient.date_of_birth, { large: true })}`;
    return 'N/A';
  }, [patient?.date_of_birth]);
  const gender = _toTitleCase(patient?.gender || 'N/A');
  const complaint = patient?.medical_history || 'Not specified';

  const handleUploadRecords = useCallback(() => {
    if (patient?.user_id) {
      router.push(projectRoutes.patientDetails(patient.user_id));
    }
  }, [patient?.user_id, router]);

  const handleWritePrescription = useCallback(() => {
    if (!appointmentId) return showErrorToast("Appointment ID is required")
    router.push(projectRoutes.managePrescription({
      patientId: patient?.user_id || '',
      tab: 'prescriptions',
      appointmentId: appointmentId
    }));
  }, [patient?.user_id, router]);

  const handleNotesChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setDoctorNotes(e.target.value);
    },
    [setDoctorNotes]
  );

  return (
    <Box className="side-panel">
      <Box className="panel-card profile-block">
        <Box className="panel-head">
          <Typography className="section-title" component="h2">
            <PersonOutlineOutlinedIcon />
            Patient Profile
          </Typography>
        </Box>

        <Box className="identity">
          <Avatar
            className="avatar"
            src={
              typeof patient?.profile_image === 'string'
                ? patient.profile_image
                : undefined
            }
            alt={patientName}
          >
            {getInitials(patientName)}
          </Avatar>
          <Box className="identity-copy">
            <Typography className="patient-name" component="p">
              {patientName}
            </Typography>
            <Typography className="patient-id" component="p">
              ID: {patientId}
            </Typography>
          </Box>
        </Box>

        <Box className="meta-row">
          <Box className="meta-card">
            <Typography className="meta-label" component="span">
              Age
            </Typography>
            <Typography className="meta-value" component="span">
              {age}
            </Typography>
          </Box>
          <Box className="meta-card">
            <Typography className="meta-label" component="span">
              Gender
            </Typography>
            <Typography className="meta-value" component="span">
              {gender}
            </Typography>
          </Box>
        </Box>

        <Box className="complaint">
          <Typography className="meta-label" component="span">
            Medical History
          </Typography>
          <Box className="complaint-box">{complaint}</Box>
        </Box>

        <Button
          className="panel-action"
          variant="contained"
          color="primary"
          type="button"
          onClick={handleUploadRecords}
          startIcon={<FileUploadOutlinedIcon />}
        >
          Upload Records
        </Button>
        <Button
          className="panel-action prescription-btn"
          variant="outlined"
          color="inherit"
          type="button"
          onClick={handleWritePrescription}
          startIcon={<DescriptionOutlinedIcon />}
        >
          Write Prescription
        </Button>
      </Box>

      <Box className="panel-card notes-block">
        <Typography className="section-title" component="h2">
          <StickyNote2OutlinedIcon />
          Doctor Notes
        </Typography>
        <CustomInput
          className="notes-field"
          placeholder="Write your notes here..."
          multiline
          minRows={3}
          fullWidth
          value={doctorNotes}
          onChange={handleNotesChange}
        />
      </Box>
    </Box>
  );
}

export default memo(MeetingSidePanel);