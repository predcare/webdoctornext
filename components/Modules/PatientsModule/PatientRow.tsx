'use client';

import StatusChip from '@/components/commons/StatusChip/StatusChip';
import type { Patient } from '@/resources/mock';
import { projectRoutes } from '@/routes';
import { avatarTone } from '@/utils/avatarTone';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, IconButton, TableCell, TableRow, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { memo, type MouseEvent } from 'react';

type PatientRowProps = {
  row: Patient;
  onOpenMenu: (anchor: HTMLElement, id: string) => void;
};

function PatientRow({ row, onOpenMenu }: PatientRowProps) {
  const navigate = useRouter();
  const handleView = () => {
    navigate.push(projectRoutes.patientDetails(row.id));
  };
  return (
    <TableRow onClick={handleView}>
      <TableCell>
        <Box className="patient-cell">
          <Box className={`patient-avatar ${avatarTone(row.initial)}`}>{row.initial}</Box>
          <Box className="patient-copy">
            <Box className="patient-name-row">
              <Typography component="p" className="patient-name">
                {row.name}
              </Typography>
              {row.verified ? <DoneAllIcon className="verified-icon" aria-label="Verified" /> : null}
            </Box>
            <Typography component="p" className="patient-meta">
              {row.gender} · {row.age} yrs
            </Typography>
            <Typography component="p" className="patient-code">
              {row.patientCode}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        <Typography component="p" className="cell-title">
          {row.phone}
        </Typography>
        <Typography component="p" className="cell-note">
          {row.email}
        </Typography>
      </TableCell>
      <TableCell>{row.city}</TableCell>
      <TableCell>{row.lastVisit}</TableCell>
      <TableCell>
        <StatusChip status={row.userStatus} />
      </TableCell>
      <TableCell>
        <StatusChip status={row.clinicStatus} />
      </TableCell>
      <TableCell align="right">
        <IconButton
          className="row-menu"
          size="small"
          aria-label={`Actions for ${row.name}`}
          onClick={(event: MouseEvent<HTMLButtonElement>) => onOpenMenu(event.currentTarget, row.id)}
        >
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

export default memo(PatientRow);
