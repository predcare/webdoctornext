'use client';

import { CustomActionMenuTrigger } from '@/components/ui/CustomActionMenu/CustomActionMenu';
import { InPersonIcon, VideoIcon } from '@/components/ui/Icons/appointments';
import InfoTooltip from '@/components/ui/InfoTooltip/InfoTooltip';
import {
  _toTitleCase,
  getAppointmentStatusColors,
  getAppointmentTypeColors,
  getInitials,
} from '@/lib/commons/common.utils';
import { avatarTone } from '@/utils/avatarTone';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import { Avatar, Box, TableCell, TableRow, Typography } from '@mui/material';
import { memo, useMemo } from 'react';

const IN_PROGRESS_STATUSES = ['in_progress', 'in-progress', 'inprogress'];

type AppointmentRowProps = {
  onOpenMenu: (anchor: HTMLElement) => void;
  onJoinCall?: () => void;
  onStartConsultation?: () => void;
  patientName: string;
  patientImage?: string;
  patientCode: string;
  gender: string;
  age: string;
  appointmentId: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentStatus: string;
  appointmentType: string;
};

function AppointmentRow({
  onOpenMenu,
  onJoinCall,
  onStartConsultation,
  patientName,
  patientImage,
  patientCode,
  gender,
  age,
  appointmentId,
  appointmentDate,
  appointmentTime,
  appointmentStatus,
  appointmentType,
}: AppointmentRowProps) {
  const { isVideo, patientInitial } = useMemo(() => {
    const isVideo = appointmentType?.toLowerCase().trim() === 'video';
    const patientInitial = getInitials(patientName);
    return {
      isVideo,
      patientInitial,
    };
  }, [appointmentType, patientName]);
  const typeColors = getAppointmentTypeColors(appointmentType);
  const statusColors = getAppointmentStatusColors(appointmentStatus);
  const normalizedStatus = appointmentStatus?.toLowerCase().trim() ?? '';
  const isInProgress = IN_PROGRESS_STATUSES.includes(normalizedStatus);
  const canStart = isInProgress || normalizedStatus === 'confirmed';

  return (
    <TableRow>
      <TableCell className="col-fit">
        <Box className="patient-cell">
          <Avatar
            src={patientImage || undefined}
            alt={patientName}
            className={`patient-avatar ${avatarTone(patientInitial)}`}
          >
            {patientInitial}
          </Avatar>
          <Box className="patient-copy">
            <Box className="patient-name-row">
              <Typography
                component="p"
                className="patient-name"
                title={patientName}
              >
                {patientName}
              </Typography>
            </Box>
            <Typography component="p" className="patient-meta">
              {gender}, {age} · #{patientCode}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell className="col-fit">
        <Box
          className="modality-pill"
          style={{ color: typeColors.txt, backgroundColor: typeColors.bg }}
        >
          {isVideo ? <VideoIcon size={14} /> : <InPersonIcon size={14} />}
          {_toTitleCase(appointmentType || '')}
        </Box>
      </TableCell>
      <TableCell>
        <Box className="stack-cell">
          <Typography component="p" className="cell-title">
            {appointmentId}
          </Typography>
        </Box>
      </TableCell>
      <TableCell>
        <Box className="stack-cell">
          <Typography component="p" className="cell-title">
            {appointmentDate}
          </Typography>
        </Box>
      </TableCell>
      <TableCell>
        <Box className="stack-cell">
          <Typography component="p" className="cell-title">
            {appointmentTime}
          </Typography>
        </Box>
      </TableCell>
      <TableCell>
        <Box
          className="status-pill"
          style={{ color: statusColors.txt, backgroundColor: statusColors.bg }}
        >
          {_toTitleCase(appointmentStatus || '')}
        </Box>
      </TableCell>
      <TableCell className="col-fit">
        <Box className="row-actions">
          {canStart && isVideo && (
            <InfoTooltip
              content={isInProgress ? 'Rejoin Call' : 'Join Video Call'}
              ariaLabel={`${isInProgress ? 'Rejoin call' : 'Join video call'} with ${patientName}`}
              className={`action-icon ${isInProgress ? 'rejoin' : 'join'}`}
              onClick={onJoinCall}
              icon={<VideocamOutlinedIcon />}
            />
          )}
          {canStart && !isVideo && (
            <InfoTooltip
              content={
                isInProgress ? 'Continue Consultation' : 'Start Consultation'
              }
              ariaLabel={`${isInProgress ? 'Continue' : 'Start'} consultation with ${patientName}`}
              className={`action-icon consult ${isInProgress ? 'live' : ''}`}
              onClick={onStartConsultation}
              icon={<MedicalServicesOutlinedIcon />}
            />
          )}
          <CustomActionMenuTrigger
            aria-label={`More actions for ${patientName}`}
            onClick={(event) => onOpenMenu(event.currentTarget)}
          />
        </Box>
      </TableCell>
    </TableRow>
  );
}

export default memo(AppointmentRow);
