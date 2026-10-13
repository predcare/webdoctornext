'use client';

import AppointmentStatusBadge from '@/components/commons/AppointmentStatusBadge/AppointmentStatusBadge';
import DetailField from '@/components/commons/DetailField/DetailField';
import { CalendarIcon, InPersonIcon, VideoIcon } from '@/components/ui/Icons/appointments';
import type { AppointmentDetails } from '@/resources/mock';
import { formatClock } from '@/utils/formatClock';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { Box, Grid, Typography } from '@mui/material';
import { memo } from 'react';

const fieldSize = { xs: 12, sm: 6, xl: 4 };

type AppointmentInfoCardProps = {
  details: AppointmentDetails;
};

function AppointmentInfoCard({ details }: AppointmentInfoCardProps) {
  const isVideo = details.visitType === 'video';

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
            <Typography component="p" className="card-subtitle">
              {details.specialist} · {details.specialty}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box className="card-body">
        <Grid container rowSpacing={2} columnSpacing={2}>
          <Grid size={fieldSize}>
            <DetailField variant="tile" label="Appointment ID">
              {details.appointmentId}
            </DetailField>
          </Grid>
          <Grid size={fieldSize}>
            <DetailField variant="tile" label="Status">
              <AppointmentStatusBadge status={details.status} />
            </DetailField>
          </Grid>
          <Grid size={fieldSize}>
            <DetailField variant="tile" label="Appointment Date" icon={<CalendarIcon size={16} />}>
              {details.date}
            </DetailField>
          </Grid>
          <Grid size={fieldSize}>
            <DetailField variant="tile" label="Time Slot">
              <Typography component="span" className="time-pill">
                <AccessTimeIcon fontSize="inherit" />
                {formatClock(details.startTime)} - {formatClock(details.endTime)}
              </Typography>
            </DetailField>
          </Grid>
          <Grid size={fieldSize}>
            <DetailField variant="tile" label="Appointment Type">
              {details.appointmentType}
            </DetailField>
          </Grid>
          <Grid size={fieldSize}>
            <DetailField
              variant="tile"
              label="Consultation Type"
              icon={isVideo ? <VideoIcon size={16} /> : <InPersonIcon size={16} />}
            >
              {isVideo ? 'Telehealth' : 'In-Person'}
            </DetailField>
          </Grid>
          <Grid size={fieldSize}>
            <DetailField variant="tile" label="Consultation Fee" icon={<CurrencyRupeeIcon fontSize="inherit" />}>
              {details.consultationFee}
            </DetailField>
          </Grid>
          <Grid size={fieldSize}>
            <DetailField variant="tile" label="Payment Status">
              <Typography component="span" className={`payment-pill ${details.paymentStatus.toLowerCase()}`}>
                {details.paymentStatus}
              </Typography>
            </DetailField>
          </Grid>
          <Grid size={12}>
            <DetailField variant="tile" label="Reason for Visit">
              {details.reasonForVisit}
            </DetailField>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default memo(AppointmentInfoCard);
