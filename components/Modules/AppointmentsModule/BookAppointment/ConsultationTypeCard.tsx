'use client';

import { Box, Typography } from '@mui/material';
import {
  BookingConsultType,
  consultationTypes,
} from '../contants/bookAppointment.constants';
import ChoiceCardGrid from './ChoiceCardGrid';

type ConsultationTypeCardProps = {
  value: BookingConsultType;
  onChange: (value: BookingConsultType) => void;
};

export default function ConsultationTypeCard({
  value,
  onChange,
}: ConsultationTypeCardProps) {
  return (
    <Box className="book-card">
      <Typography component="h3" className="card-title required">
        Consultation Type
      </Typography>
      <ChoiceCardGrid
        options={consultationTypes}
        value={value}
        onChange={onChange}
        ariaLabel="Consultation type"
      />
    </Box>
  );
}
