'use client';

import DetailField from '@/components/commons/DetailField/DetailField';
import { CalendarIcon, InPersonIcon, VideoIcon } from '@/components/ui/Icons/appointments';
import {
  _toTitleCase,
  getAppointmentStatusColors,
  getAppointmentTypeColors,
  getPayStatus,
} from '@/lib/commons/common.utils';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { Box, Grid, Typography } from '@mui/material';
import { memo } from 'react';

const fieldSize = { xs: 12, sm: 6, xl: 4 };

type AppointmentInfoCardProps = {
  appointmentId: string;
  appointmentStatus: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentType: string;
  consultationType: string;
  specialization?: string;
  consultationFee?: number | string;
  feeType?: string;
  paymentStatus?: string;
  paymentType?: string;
  reasonForVisit?: string;
  doctorNote?: string;
};


function AppointmentInfoCard({
  appointmentId,
  appointmentStatus,
  appointmentDate,
  appointmentTime,
  appointmentType,
  consultationType,
  specialization,
  consultationFee,
  feeType,
  paymentStatus,
  paymentType,
  reasonForVisit,
  doctorNote,
}: AppointmentInfoCardProps) {
  const isVideo = consultationType?.toLowerCase().trim() === 'video';
  const statusColors = getAppointmentStatusColors(appointmentStatus);
  const typeColors = getAppointmentTypeColors(consultationType);
  const payColors = getPayStatus(paymentStatus || '');

  return (
    <Box className="detail-card fill">
      <Box className="card-head">
        <Box className="card-head-title">
          <Box component="span" className="card-icon">
            <EventNoteIcon />
          </Box>
          <Box className="card-title-copy">
            <Typography component="h3" className="card-title">
              Appointment Information
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box className="card-body">
        <Grid container rowSpacing={2} columnSpacing={2}>
          <Grid size={fieldSize}>
            <DetailField variant="tile" label="Appointment ID">
              {appointmentId}
            </DetailField>
          </Grid>
          <Grid size={fieldSize}>
            <DetailField variant="tile" label="Status">
              <Typography
                component="span"
                className="info-pill"
                style={{ color: statusColors.txt, backgroundColor: statusColors.bg }}
              >
                {_toTitleCase(appointmentStatus || '') || 'N/A'}
              </Typography>
            </DetailField>
          </Grid>
          <Grid size={fieldSize}>
            <DetailField
              variant="tile"
              label="Appointment Date"
              icon={<CalendarIcon size={16} />}
            >
              {appointmentDate}
            </DetailField>
          </Grid>
          <Grid size={fieldSize}>
            <DetailField variant="tile" label="Time Slot">
              <Typography component="span" className="time-pill">
                <AccessTimeIcon fontSize="inherit" />
                {appointmentTime || "N/A"}
              </Typography>
            </DetailField>
          </Grid>
          <Grid size={fieldSize}>
            <DetailField variant="tile" label="Appointment Type">
              <Typography component="span" className="info-pill neutral">
                {_toTitleCase(appointmentType || '') || 'N/A'}
              </Typography>
            </DetailField>
          </Grid>
          <Grid size={fieldSize}>
            <DetailField variant="tile" label="Consultation Type">
              <Typography
                component="span"
                className="info-pill"
                style={{ color: typeColors.txt, backgroundColor: typeColors.bg }}
              >
                {isVideo ? <VideoIcon size={14} /> : <InPersonIcon size={14} />}
                {_toTitleCase(consultationType || '') || 'N/A'}
              </Typography>
            </DetailField>
          </Grid>
          <Grid size={fieldSize}>
            <DetailField
              variant="tile"
              label="Consultation Fee"
              icon={<CurrencyRupeeIcon fontSize="inherit" />}
            >
              {consultationFee || "N/A"}
            </DetailField>
          </Grid>
          <Grid size={fieldSize}>
            <DetailField variant="tile" label="Payment Status">
              <Typography
                component="span"
                className="info-pill"
                style={{ color: payColors.txt, backgroundColor: payColors.bg }}
              >
                {payColors.label}
              </Typography>
            </DetailField>
          </Grid>
          <Grid size={fieldSize}>
            <DetailField variant="tile" label="Payment Type">
              {_toTitleCase(paymentType || '') || 'N/A'}
            </DetailField>
          </Grid>
          <Grid size={12}>
            <DetailField variant="tile" label="Reason for Visit">
              {reasonForVisit || "N/A"}
            </DetailField>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default memo(AppointmentInfoCard);
