'use client';

import { queryClient } from '@/components/Providers/ReactQueryProvider';
import { useChangeAppointmentStatus } from '@/hooks/react-query/appointments/appointments.hooks';
import { MyAppointmentsQueryKeys } from '@/hooks/react-query/query.keys';
import {
  _toTitleCase,
  getAppointmentStatusColors,
} from '@/lib/commons/common.utils';
import { showSuccessToast } from '@/lib/commons/toast';
import type { AppointmentStatus } from '@/resources/mock';
import { useAlertStore } from '@/zustand/stores/useAlertStore';
import { useLoadingStore } from '@/zustand/stores/useLoadingStore';
import CheckIcon from '@mui/icons-material/Check';
import EditNoteIcon from '@mui/icons-material/EditNote';
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { memo, useState } from 'react';

const statusOptions: AppointmentStatus[] = [
  'Confirmed',
  'In Progress',
  'Completed',
  'No Show',
  'Cancelled',
];

type UpdateStatusCardProps = {
  status: string | null;
  appointmentId: string;
};

function UpdateStatusCard({ status, appointmentId }: UpdateStatusCardProps) {
  const [nextStatus, setNextStatus] = useState<AppointmentStatus | ''>('');
  const { showLoader, hideLoader } = useLoadingStore((state) => state);
  const showConfirm = useAlertStore((state) => state.showConfirm);
  const statusColors = getAppointmentStatusColors(status || '');
  const { mutate: changeStatus } = useChangeAppointmentStatus();

  const updateStatus = () => {
    showLoader('Updating appointment status...');
    const payload = {
      appointmentId: appointmentId,
      status: nextStatus?.toLowerCase(),
      call_end_reason: 'Call ended and Booking Completed by Doctor',
    };
    changeStatus(payload, {
      onSuccess: async (res) => {
        hideLoader();
        if (!res?.success) return;
        showSuccessToast('Appointment status updated successfully');
        setNextStatus('');
        await Promise.all([
          queryClient.invalidateQueries({
            queryKey: [MyAppointmentsQueryKeys.MyAppointments],
          }),
          queryClient.invalidateQueries({
            queryKey: [MyAppointmentsQueryKeys.MyAppointmentsInfo],
          }),
        ]);
      },
      onError: () => {
        hideLoader();
      },
    });
  };

  const handleSubmit = () => {
    if (!nextStatus) return;
    showConfirm({
      title: 'Update Appointment Status',
      message: `Change the status${status ? ` from "${_toTitleCase(status)}"` : ''} to "${nextStatus}"?\nThe patient will be notified of this change.`,
      buttonText: 'Yes, Update',
      cancelText: 'Cancel',
      onConfirm: updateStatus,
    });
  };
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
          <Typography
            component="span"
            className="info-pill"
            style={{ color: statusColors.txt, backgroundColor: statusColors.bg }}
          >
            {_toTitleCase(status || '') || 'N/A'}
          </Typography>
        </Box>

        <Box className="status-field">
          <Typography
            component="label"
            htmlFor="change-status"
            className="field-label"
          >
            Change Status To
          </Typography>
          <FormControl fullWidth size="small">
            <Select
              id="change-status"
              className="status-select"
              displayEmpty
              value={nextStatus}
              onChange={(event) =>
                setNextStatus(event.target.value as AppointmentStatus | '')
              }
              renderValue={(value) => (value ? value : 'Select status')}
            >
              {statusOptions.map((option) => (
                <MenuItem
                  key={option}
                  value={option}
                  disabled={option === status}
                >
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
          type="button"
          onClick={handleSubmit}
          startIcon={<CheckIcon fontSize="small" />}
        >
          Update Status
        </Button>
      </Box>
    </Box>
  );
}

export default memo(UpdateStatusCard);
