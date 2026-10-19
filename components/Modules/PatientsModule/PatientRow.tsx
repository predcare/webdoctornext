'use client';

import StatusChip from '@/components/commons/StatusChip/StatusChip';
import { CustomActionMenuTrigger } from '@/components/ui/CustomActionMenu/CustomActionMenu';
import { getInitials } from '@/lib/commons/common.utils';
import { projectRoutes } from '@/routes';
import { avatarTone } from '@/utils/avatarTone';
import { Avatar, Box, TableCell, TableRow, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { memo } from 'react';

type PatientRowProps = {
  patientId: string;
  name: string;
  profileImage?: string;
  patientCode: string;
  phone: string;
  email: string;
  city: string;
  lastVisit: string;
  userStatus: string;
  onOpenMenu: (anchor: HTMLElement, id: string) => void;
};

function PatientRow({
  name,
  profileImage,
  patientCode,
  phone,
  email,
  city,
  lastVisit,
  userStatus,
  patientId,
  onOpenMenu,
}: PatientRowProps) {
  const navigate = useRouter();
  const handleView = () => {
    navigate.push(projectRoutes.patientDetails(patientCode));
  };
  return (
    <TableRow onClick={handleView}>
      <TableCell>
        <Box className="patient-cell">
          <Avatar
            className={`patient-avatar ${avatarTone(getInitials(name))}`}
            src={profileImage || undefined}
            alt={name}
          >
            {getInitials(name)}
          </Avatar>
          <Box className="patient-copy">
            <Box className="patient-name-row">
              <Typography component="p" className="patient-name">
                {name || "Unknown Name"}
              </Typography>
            </Box>
            <Typography component="p" className="patient-code">
              {patientCode}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        <Typography component="p" className="cell-title">
          {phone}
        </Typography>
        <Typography component="p" className="cell-note">
          {email}
        </Typography>
      </TableCell>
      <TableCell>{city || "-"}</TableCell>
      <TableCell align="center">{lastVisit || "-"}</TableCell>
      <TableCell align="center">
        <StatusChip status={userStatus as 'Active' | 'Inactive'} />
      </TableCell>
      <TableCell align="center">
        <CustomActionMenuTrigger
          aria-label={`Actions for ${name}`}
          onClick={(event) => {
            event.stopPropagation();
            onOpenMenu(event.currentTarget, patientId);
          }}
        />
      </TableCell>
    </TableRow>
  );
}

export default memo(PatientRow);
