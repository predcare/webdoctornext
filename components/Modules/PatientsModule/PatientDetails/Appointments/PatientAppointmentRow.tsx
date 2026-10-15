'use client';

import AppointmentStatusBadge from '@/components/commons/AppointmentStatusBadge/AppointmentStatusBadge';
import { InPersonIcon, VideoIcon } from '@/components/ui/Icons/appointments';
import { appointmentToday, type DashboardAppointment } from '@/resources/mock';
import { projectRoutes } from '@/routes';
import { formatClock } from '@/utils/formatClock';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Box, Button, TableCell, TableRow, Typography } from '@mui/material';
import Link from 'next/link';
import { memo } from 'react';

const scheduleLabel = (row: DashboardAppointment) => {
  const day = row.dateValue === appointmentToday ? 'Today' : row.date;
  return `${day}, ${formatClock(row.startTime)}`;
};

type PatientAppointmentRowProps = {
  row: DashboardAppointment;
};

function PatientAppointmentRow({ row }: PatientAppointmentRowProps) {
  const isVideo = row.visitType === 'video';

  return (
    <TableRow>
      <TableCell className="col-fit">
        <Box className="stack-cell">
          <Box className="title-row">
            <Typography component="p" className="cell-title">
              #{row.appointmentId}
            </Typography>
            {row.instant ? (
              <Typography component="span" className="instant-chip">
                Instant
              </Typography>
            ) : null}
          </Box>
          <Typography component="p" className="cell-note">
            {row.reason}
          </Typography>
        </Box>
      </TableCell>
      <TableCell className="col-fit">
        <Box className={`modality-pill ${isVideo ? 'video' : 'in-person'}`}>
          {isVideo ? <VideoIcon size={14} /> : <InPersonIcon size={14} />}
          {isVideo ? 'Telehealth' : 'In-Person'}
        </Box>
      </TableCell>
      <TableCell>
        <Box className="stack-cell">
          <Typography component="p" className="cell-title">
            {scheduleLabel(row)}
          </Typography>
          <Typography component="p" className="cell-note">
            {row.scheduleNote}
          </Typography>
        </Box>
      </TableCell>
      <TableCell>
        <Box className="stack-cell">
          <Typography component="p" className="cell-title">
            {row.specialist}
          </Typography>
          <Typography component="p" className="cell-note">
            {row.specialty}
          </Typography>
        </Box>
      </TableCell>
      <TableCell>
        <AppointmentStatusBadge status={row.status} />
      </TableCell>
      <TableCell align="right">
        <Button
          className="row-view"
          size="small"
          variant="outlined"
          component={Link}
          href={projectRoutes.appointmentDetails(row.id)}
          startIcon={<VisibilityOutlinedIcon fontSize="inherit" />}
        >
          View
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default memo(PatientAppointmentRow);
