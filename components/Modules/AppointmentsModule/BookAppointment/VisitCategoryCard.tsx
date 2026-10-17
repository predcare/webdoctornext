'use client';

import { Box, Typography } from '@mui/material';
import { visitCategories, VisitCategoryId } from '../contants/bookAppointment.constants';
import ChoiceCardGrid from './ChoiceCardGrid';

type VisitCategoryCardProps = {
  value: VisitCategoryId;
  onChange: (value: VisitCategoryId) => void;
};

export default function VisitCategoryCard({
  value,
  onChange,
}: VisitCategoryCardProps) {
  return (
    <Box className="book-card">
      <Typography component="h3" className="card-title">
        Visit Category
      </Typography>
      <ChoiceCardGrid
        options={visitCategories}
        value={value}
        onChange={onChange}
        columns={3}
        ariaLabel="Visit category"
      />
    </Box>
  );
}
