'use client';

import AppointmentStatusBadge from '@/components/commons/AppointmentStatusBadge/AppointmentStatusBadge';
import type { AppointmentStatus } from '@/resources/mock';
import CheckIcon from '@mui/icons-material/Check';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Box, Button, FormControl, MenuItem, Select, Typography } from '@mui/material';
import { memo, useState } from 'react';

const statusOptions: AppointmentStatus[] = ['Confirmed', 'In Progress', 'Completed', 'No Show', 'Cancelled'];

type UpdateStatusCardProps = {
  status: AppointmentStatus;
};

function UpdateStatusCard({ status }: UpdateStatusCardProps) {
  const [nextStatus, setNextStatus] = useState<AppointmentStatus | ''>('');

  return (
    <Box className="detail-card fill">
      <Box className="card-head">
        <Box className="card-head-title">
          <Box component="span" className="card-icon">
            <EditNoteIcon />
          </Box>
          <Box className="card-title-copy">
            <Typography component="h3" className="card-title">
              Update Status
            </Typography>
            <Typography component="p" className="card-subtitle">
              Change the appointment progress
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box className="card-body status-body">
        <Box className="current-status">
          <Typography component="span" className="current-status-label">
            Current Status:
          </Typography>
          <AppointmentStatusBadge status={status} />
        </Box>

        <Box className="status-field">
          <Typography component="label" htmlFor="change-status" className="field-label">
            Change Status To
          </Typography>
          <FormControl fullWidth size="small">
            <Select
              id="change-status"
              className="status-select"
              displayEmpty
              value={nextStatus}
              onChange={(event) => setNextStatus(event.target.value as AppointmentStatus | '')}
              renderValue={(value) => (value ? value : 'Select status')}
            >
              {statusOptions.map((option) => (
                <MenuItem key={option} value={option} disabled={option === status}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography component="p" className="field-helper">
            The patient will be notified of the change.
          </Typography>
        </Box>

        <Button
          className="update-status"
          variant="contained"
          disableElevation
          fullWidth
          disabled={!nextStatus}
          startIcon={<CheckIcon fontSize="small" />}
        >
          Update Status
        </Button>
      </Box>
    </Box>
  );
}

export default memo(UpdateStatusCard);
