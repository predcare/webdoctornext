'use client';

import AppointmentStatusBadge from '@/components/commons/AppointmentStatusBadge/AppointmentStatusBadge';
import { InPersonIcon, VideoIcon } from '@/components/ui/Icons/appointments';
import { appointmentToday, type DashboardAppointment } from '@/resources/mock';
import { avatarTone } from '@/utils/avatarTone';
import { formatClock } from '@/utils/formatClock';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Button, IconButton, TableCell, TableRow, Typography } from '@mui/material';
import { memo, type MouseEvent } from 'react';

const scheduleLabel = (row: DashboardAppointment) => {
  const day = row.dateValue === appointmentToday ? 'Today' : row.date;
  return `${day}, ${formatClock(row.startTime)}`;
};

type AppointmentRowProps = {
  row: DashboardAppointment;
  onOpenMenu: (anchor: HTMLElement, id: string) => void;
};

function AppointmentRow({ row, onOpenMenu }: AppointmentRowProps) {
  const isVideo = row.visitType === 'video';

  return (
    <TableRow>
      <TableCell className="col-fit">
        <Box className="patient-cell">
          <Box className={`patient-avatar ${avatarTone(row.initial)}`}>{row.initial}</Box>
          <Box className="patient-copy">
            <Box className="patient-name-row">
              <Typography component="p" className="patient-name">
                {row.name}
              </Typography>
              {row.instant ? (
                <Typography component="span" className="instant-chip">
                  Instant
                </Typography>
              ) : null}
            </Box>
            <Typography component="p" className="patient-meta">
              {row.gender}, {row.age} · #{row.patientCode}
            </Typography>
          </Box>
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
      <TableCell>
        <Box className="row-actions">
          <Button className="row-action join" size="small" variant="contained" disableElevation>
            Join Now
          </Button>
          <IconButton
            size="small"
            aria-label={`Actions for ${row.name}`}
            onClick={(event: MouseEvent<HTMLButtonElement>) => onOpenMenu(event.currentTarget, row.id)}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </Box>
      </TableCell>
    </TableRow>
  );
}

export default memo(AppointmentRow);
