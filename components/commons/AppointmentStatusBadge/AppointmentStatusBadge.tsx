'use client';

import {
  CancelledIcon,
  CompletedIcon,
  ConfirmedIcon,
  InProgressIcon,
  NoShowIcon,
} from '@/components/ui/Icons/appointments';
import type { AppointmentStatus } from '@/resources/mock';
import { styled } from '@mui/material';
import type { ComponentType } from 'react';

type StatusIcon = ComponentType<{ size?: number }>;

const statusMeta: Record<AppointmentStatus, { className: string; Icon: StatusIcon }> = {
  Scheduled: { className: 'scheduled', Icon: ConfirmedIcon },
  Confirmed: { className: 'confirmed', Icon: ConfirmedIcon },
  'In Progress': { className: 'in-progress', Icon: InProgressIcon },
  Completed: { className: 'completed', Icon: CompletedIcon },
  'No Show': { className: 'no-show', Icon: NoShowIcon },
  Cancelled: { className: 'cancelled', Icon: CancelledIcon },
};

const StatusPill = styled('span')`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 24px;
  padding: 0 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  white-space: nowrap;

  &.scheduled,
  &.confirmed {
    color: ${({ theme }) => theme.palette.customColors.brandTeal};
    background: ${({ theme }) => theme.palette.customColors.brandTealLight};
  }

  &.in-progress {
    color: ${({ theme }) => theme.palette.customColors.info};
    background: ${({ theme }) => theme.palette.customColors.infoBg};
  }

  &.completed {
    color: ${({ theme }) => theme.palette.customColors.success};
    background: ${({ theme }) => theme.palette.customColors.successBg};
  }

  &.no-show {
    color: ${({ theme }) => theme.palette.customColors.warning};
    background: ${({ theme }) => theme.palette.customColors.warningBg};
  }

  &.cancelled {
    color: ${({ theme }) => theme.palette.customColors.error};
    background: ${({ theme }) => theme.palette.customColors.errorBg};
  }
`;

type AppointmentStatusBadgeProps = {
  status: AppointmentStatus;
};

export default function AppointmentStatusBadge({ status }: AppointmentStatusBadgeProps) {
  const meta = statusMeta[status];
  const Icon = meta.Icon;

  return (
    <StatusPill className={meta.className}>
      <Icon size={14} />
      {status}
    </StatusPill>
  );
}
