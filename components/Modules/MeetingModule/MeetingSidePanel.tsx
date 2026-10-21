'use client';

import CustomInput from '@/components/ui/CustomInput/CustomInput';
import { getAge } from '@/lib/commons/common.utils';
import { projectRoutes } from '@/routes';
import { useMeetingStore } from '@/zustand/stores/useMeetingStore';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { memo, useCallback, useMemo } from 'react';

function MeetingSidePanel() {

  const router = useRouter();
  const patientInfo = useMeetingStore((state) => state.patientInfo);
  const doctorNotes = useMeetingStore((state) => state.doctorNotes);
  const setDoctorNotes = useMeetingStore((state) => state.setDoctorNotes);

  const patientName = patientInfo?.name || 'Patient';
  const patientId = patientInfo?.alphanumericId || patientInfo?.id || 'N/A';
  const age = useMemo(() => {
    if (patientInfo?.age) return `${patientInfo.age} Years`;
    if (patientInfo?.dateOfBirth) return `${getAge(patientInfo.dateOfBirth)} Years`;
    return 'N/A';
  }, [patientInfo?.age, patientInfo?.dateOfBirth]);
  const gender = patientInfo?.gender || 'N/A';
  const complaint = patientInfo?.complaint || 'Not specified';

  const handleUploadRecords = useCallback(() => {
    if (patientInfo?.id) {
      router.push(`/dashboard/patients/${patientInfo.id}`);
    } else {
      router.push(projectRoutes.patients);
    }
  }, [patientInfo?.id, router]);

  const handleWritePrescription = useCallback(() => {
    router.push(projectRoutes.managePrescriptions);
  }, [router]);

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
          <Box className="avatar" aria-hidden>
            {patientName.charAt(0).toUpperCase()}
          </Box>
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
            Primary complaint
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