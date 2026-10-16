'use client';

import {
  _formatDoctorName,
  _toTitleCase,
  formatSpecialization,
  getInitials,
} from '@/lib/commons/common.utils';
import { useAuthStore } from '@/zustand/stores/useAuthStore';
import CheckIcon from '@mui/icons-material/Check';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Avatar, Box, Chip, Typography } from '@mui/material';
import { useMemo } from 'react';

export default function DoctorIdentityCard() {
  const { userData } = useAuthStore((state) => state);

  const { clinicName, clinicStatus, doctorAvatar, doctorName, doctorSpecialization, doctorCurrentRole } = useMemo(() => {
    return {
      clinicName: userData?.clinic?.name || "N/A",
      clinicStatus: userData?.clinic?.status === "active" ? true : false,
      doctorAvatar: userData?.profile_image || "",
      doctorName: _formatDoctorName(userData?.name || '', userData?.salutation),
      doctorSpecialization: _toTitleCase(userData?.specialization || 'User'),
      doctorCurrentRole: _toTitleCase(userData?.currentRole || 'User'),
    }
  }, [
    userData?.clinic?.name,
    userData?.clinic?.status,
    userData?.profile_image,
    userData?.name,
    userData?.salutation,
    userData?.specialization,
    userData?.currentRole,
  ]);

  return (
    <Box className="form-card identity-card">
      <Avatar
        className="identity-avatar"
        src={doctorAvatar || undefined}
        alt={doctorName}
      >
        {getInitials(userData?.name || '')}
      </Avatar>
      <Box className="identity-copy">
        <Box className="identity-name-row">
          <Typography component="h2" className="identity-name">
            {doctorName}
          </Typography>
          <Chip className="spec-chip" label={doctorCurrentRole} size="small" />
        </Box>
        <Typography component="p" className="identity-role">
          {formatSpecialization({ specialization: doctorSpecialization, sub_specializations: userData?.sub_specializations || {} })}
        </Typography>
        <Box className="clinic-line">
          <LocationOnOutlinedIcon />
          <span>Clinic : {clinicName}</span>
          {clinicStatus && <span className="verified-pill">
            <CheckIcon />
            verified
          </span>}
        </Box>
      </Box>
    </Box>
  );
}
