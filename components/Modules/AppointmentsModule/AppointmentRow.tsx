'use client';

import { InPersonIcon, VideoIcon } from '@/components/ui/Icons/appointments';
import {
  _toTitleCase,
  getAppointmentStatusColors,
  getAppointmentTypeColors,
  getInitials,
} from '@/lib/commons/common.utils';
import { avatarTone } from '@/utils/avatarTone';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { memo, useMemo, type MouseEvent } from 'react';

type AppointmentRowProps = {
  onOpenMenu: (anchor: HTMLElement) => void;
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
  }, [appointmentDate, appointmentTime]);
  const typeColors = getAppointmentTypeColors(appointmentType);
  const statusColors = getAppointmentStatusColors(appointmentStatus);

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
      <TableCell>
        <Box className="row-actions">
          {isVideo && (
            <Button
              className="row-action join"
              size="small"
              variant="contained"
              disableElevation
            >
              Join Now
            </Button>
          )}
          <IconButton
            size="small"
            aria-label={`Actions for ${patientName}`}
            onClick={(event: MouseEvent<HTMLButtonElement>) =>
              onOpenMenu(event.currentTarget)
            }
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </Box>
      </TableCell>
    </TableRow>
  );
}

export default memo(AppointmentRow);
