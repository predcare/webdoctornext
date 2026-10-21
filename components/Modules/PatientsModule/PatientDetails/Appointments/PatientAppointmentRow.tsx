'use client';

import { InPersonIcon, VideoIcon } from '@/components/ui/Icons/appointments';
import {
  _toTitleCase,
  getAppointmentStatusColors,
  getAppointmentTypeColors,
} from '@/lib/commons/common.utils';
import { projectRoutes } from '@/routes';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Box, Button, TableCell, TableRow, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { memo } from 'react';

type PatientAppointmentRowProps = {
  id: string;
  appointmentId: string;
  consultationType: string;
  reason: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentStatus: string;
};

function PatientAppointmentRow({
  id,
  appointmentId,
  consultationType,
  reason,
  appointmentDate,
  appointmentTime,
  appointmentStatus,
}: PatientAppointmentRowProps) {
  const router = useRouter();
  const isVideo = consultationType?.toLowerCase().trim() === 'video';
  const typeColors = getAppointmentTypeColors(consultationType);
  const statusColors = getAppointmentStatusColors(appointmentStatus);

  return (
    <TableRow>
      <TableCell>
        <Box className="stack-cell">
          <Typography
            component="p"
            className="cell-title"
            title={appointmentId}
          >
            #{appointmentId}
          </Typography>
          {reason ? (
            <Typography component="p" className="cell-note" title={reason}>
              {reason}
            </Typography>
          ) : null}
        </Box>
      </TableCell>
      <TableCell>
        <Box
          className="modality-pill"
          style={{ color: typeColors.txt, backgroundColor: typeColors.bg }}
        >
          {isVideo ? <VideoIcon size={14} /> : <InPersonIcon size={14} />}
          {_toTitleCase(consultationType || '')}
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
          <Typography component="p" className="cell-note">
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
        <Box className="stack-cell">
          <Button
            className="row-view"
            size="small"
            variant="outlined"
            type="button"
            onClick={() => {
              router.push(projectRoutes.appointmentDetails(id));
            }}
            startIcon={<VisibilityOutlinedIcon fontSize="inherit" />}
          >
            View
          </Button>
        </Box>
      </TableCell>
    </TableRow>
  );
}

export default memo(PatientAppointmentRow);
