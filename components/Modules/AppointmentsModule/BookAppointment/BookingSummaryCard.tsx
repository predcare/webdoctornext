'use client';

import { formatTime12h, ISlotItem } from '@/lib/commons/availability.utils';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
import type { ReactNode } from 'react';

type BookingSummaryCardProps = {
  patientName?: string;
  consultationLabel?: string;
  selectedDate: string;
  selectedSlots: ISlotItem[] | null;
  visitLabel?: string;
  totalAmount: number;
};

type SummaryItem = {
  label: string;
  value?: string | null;
  icon: ReactNode;
};

const getTimeRange = (slots: ISlotItem[] | null) => {
  if (!slots || slots.length === 0) return null;
  const sorted = [...slots].sort((a, b) => a.start.localeCompare(b.start));
  return `${formatTime12h(sorted[0].start)} - ${formatTime12h(
    sorted[sorted.length - 1].end,
  )}`;
};

export default function BookingSummaryCard({
  patientName,
  consultationLabel,
  selectedDate,
  selectedSlots,
  visitLabel,
  totalAmount,
}: BookingSummaryCardProps) {
  const slotCount = selectedSlots?.length ?? 0;

  const items: SummaryItem[] = [
    {
      label: 'Patient',
      value: patientName,
      icon: <PersonOutlineOutlinedIcon />,
    },
    {
      label: 'Consultation',
      value: consultationLabel,
      icon: <LocalHospitalOutlinedIcon />,
    },
    {
      label: 'Date',
      value: selectedDate
        ? dayjs(selectedDate).format('ddd, DD MMM YYYY')
        : null,
      icon: <CalendarTodayOutlinedIcon />,
    },
    {
      label: 'Time',
      value: getTimeRange(selectedSlots),
      icon: <AccessTimeOutlinedIcon />,
    },
    {
      label: 'Visit Category',
      value: visitLabel,
      icon: <AssignmentOutlinedIcon />,
    },
  ];


  return (
    <Box className="summary-card">
      <Box className="summary-head">
        <Typography component="h3" className="summary-title">
          Booking Summary
        </Typography>
      </Box>

      <Box className="summary-grid">
        {items.map((item) => (
          <Box
            key={item.label}
            className={item.value ? 'summary-item filled' : 'summary-item'}
          >
            <Box component="span" className="summary-icon">
              {item.icon}
            </Box>
            <Box className="summary-copy">
              <Typography component="p" className="summary-label">
                {item.label}
              </Typography>
              <Typography
                component="p"
                className={item.value ? 'summary-value' : 'summary-value muted'}
              >
                {item.value || 'Not selected'}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      <Box className="summary-total">
        <Box className="summary-total-copy">
          <Typography component="p" className="summary-total-label">
            Total Fee
          </Typography>
          <Typography component="p" className="summary-total-note">
            {slotCount
              ? `${slotCount} slot${slotCount > 1 ? 's' : ''} selected`
              : 'Select a time slot to see the fee'}
          </Typography>
        </Box>
        <Typography component="p" className="summary-total-amount">
          {slotCount ? `₹${totalAmount.toFixed(2)}` : '—'}
        </Typography>
      </Box>
    </Box>
  );
}
