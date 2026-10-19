'use client';

import { getInitials } from '@/lib/commons/common.utils';
import { Avatar, Box, TableCell, TableRow, Typography } from '@mui/material';
import { memo } from 'react';

type FamilyMemberRowProps = {
  patientId: string;
  name: string;
  relation: string;
  profileImage: string;
  email: string;
  phone: string;
  alternateNumber: string;
  address: string;
  dateOfBirth: string;
  age: string;
  gender: string;
  bloodGroup: string;
};

function FamilyMemberRow({
  patientId,
  name,
  relation,
  profileImage,
  email,
  phone,
  alternateNumber,
  address,
  dateOfBirth,
  age,
  gender,
  bloodGroup,
}: FamilyMemberRowProps) {
  const memberMeta = [patientId !== '-' ? `#${patientId}` : '', relation]
    .filter(Boolean)
    .join(' · ');

  return (
    <TableRow>
      <TableCell>
        <Box className="member-cell">
          <Avatar src={profileImage || undefined} alt={name} className="member-avatar">
            {getInitials(name)}
          </Avatar>
          <Box className="stack-cell">
            <Typography component="p" className="cell-title ellipsis" title={name}>
              {name || '—'}
            </Typography>
            {memberMeta ? (
              <Typography component="p" className="cell-note ellipsis" title={memberMeta}>
                {memberMeta}
              </Typography>
            ) : null}
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        <Box className="stack-cell">
          <Typography component="p" className="cell-title ellipsis" title={email}>
            {email || '—'}
          </Typography>
          <Typography component="p" className="cell-note ellipsis">
            {[phone, alternateNumber].filter(Boolean).join(' / ') || 'No phone'}
          </Typography>
        </Box>
      </TableCell>
      <TableCell>
        <Box className="stack-cell">
          <Typography component="p" className="cell-title">
            {age || '—'}
          </Typography>
          {dateOfBirth ? (
            <Typography component="p" className="cell-note">
              {dateOfBirth}
            </Typography>
          ) : null}
        </Box>
      </TableCell>
      <TableCell>
        <Typography component="p" className="cell-title">
          {gender || '—'}
        </Typography>
      </TableCell>
      <TableCell>
        {bloodGroup ? (
          <Box component="span" className="tag danger">
            {bloodGroup}
          </Box>
        ) : (
          <Typography component="p" className="cell-note">
            Not set
          </Typography>
        )}
      </TableCell>
      <TableCell>
        <Typography component="p" className="cell-note ellipsis" title={address}>
          {address || '—'}
        </Typography>
      </TableCell>
    </TableRow>
  );
}

export default memo(FamilyMemberRow);
