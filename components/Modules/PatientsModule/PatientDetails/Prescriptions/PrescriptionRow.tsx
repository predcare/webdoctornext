'use client';

import InfoTooltip from '@/components/ui/InfoTooltip/InfoTooltip';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';
import UnsubscribeOutlinedIcon from '@mui/icons-material/UnsubscribeOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Box, TableCell, TableRow, Typography } from '@mui/material';
import { memo } from 'react';

type PrescriptionRowProps = {
  prescriptionId: string;
  date: string;
  time: string;
  diagnosis: string;
  complaints: string;
  medicationNames: string[];
  labTestNames: string[];
  followUpDate: string;
  emailSentAt: string;
  onView: () => void;
  onEdit: () => void;
};

function PrescriptionRow({
  prescriptionId,
  date,
  time,
  diagnosis,
  complaints,
  medicationNames,
  labTestNames,
  followUpDate,
  emailSentAt,
  onView,
  onEdit,
}: PrescriptionRowProps) {
  const medsCount = medicationNames.length;
  const medsList = medicationNames.join(', ');
  const labsCount = labTestNames.length;
  const labsList = labTestNames.join(', ');

  return (
    <TableRow>
      <TableCell>
        <Box className="stack-cell">
          <Typography component="p" className="cell-title">
            {date || '—'}
          </Typography>
          <Typography component="p" className="cell-note ellipsis" title={prescriptionId}>
            {prescriptionId ? `#${prescriptionId}` : time}
          </Typography>
        </Box>
      </TableCell>
      <TableCell>
        <Box className="stack-cell">
          <Typography component="p" className="cell-title ellipsis" title={diagnosis}>
            {diagnosis || '—'}
          </Typography>
          {complaints ? (
            <Typography component="p" className="cell-note ellipsis" title={complaints}>
              {complaints}
            </Typography>
          ) : null}
        </Box>
      </TableCell>
      <TableCell>
        <Box className="stack-cell">
          <Box component="span" className={`tag ${medsCount ? 'info' : 'neutral'}`}>
            {medsCount} {medsCount === 1 ? 'Medication' : 'Medications'}
          </Box>
          {medsList ? (
            <Typography component="p" className="cell-note ellipsis" title={medsList}>
              {medsList}
            </Typography>
          ) : null}
        </Box>
      </TableCell>
      <TableCell>
        <Box className="stack-cell">
          <Box component="span" className={`tag ${labsCount ? 'teal' : 'neutral'}`}>
            {labsCount} {labsCount === 1 ? 'Test' : 'Tests'}
          </Box>
          {labsList ? (
            <Typography component="p" className="cell-note ellipsis" title={labsList}>
              {labsList}
            </Typography>
          ) : null}
        </Box>
      </TableCell>
      <TableCell>
        {followUpDate ? (
          <Typography component="p" className="cell-title">
            {followUpDate}
          </Typography>
        ) : (
          <Typography component="p" className="cell-note">
            No follow-up
          </Typography>
        )}
      </TableCell>
      <TableCell>
        <Box className="stack-cell">
          {emailSentAt ? (
            <Box component="span" className="tag success">
              <MarkEmailReadOutlinedIcon />
              Sent
            </Box>
          ) : (
            <Box component="span" className="tag neutral">
              <UnsubscribeOutlinedIcon />
              Not Sent
            </Box>
          )}
          {emailSentAt ? (
            <Typography component="p" className="cell-note ellipsis" title={emailSentAt}>
              {emailSentAt}
            </Typography>
          ) : null}
        </Box>
      </TableCell>
      <TableCell>
        <Box className="row-icons">
          <InfoTooltip
            content="View Prescription"
            ariaLabel={`View prescription ${prescriptionId}`}
            className="icon-action"
            onClick={onView}
            icon={<VisibilityOutlinedIcon />}
          />
          <InfoTooltip
            content="Edit Prescription"
            ariaLabel={`Edit prescription ${prescriptionId}`}
            className="icon-action"
            onClick={onEdit}
            icon={<EditOutlinedIcon />}
          />
        </Box>
      </TableCell>
    </TableRow>
  );
}

export default memo(PrescriptionRow);
