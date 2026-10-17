'use client';

import { Box, Skeleton } from '@mui/material';
import DateStripSkeleton from './DateStripSkeleton';
import TimeSlotsSkeleton from './TimeSlotsSkeleton';

function CardTitleSkeleton({ width = 140 }: { width?: number }) {
  return (
    <Skeleton
      animation="wave"
      width={width}
      height={22}
      className="card-title-skeleton"
    />
  );
}

function ChoiceGridSkeleton({ count }: { count: 2 | 3 }) {
  return (
    <Box className={count === 3 ? 'choice-grid three' : 'choice-grid'}>
      {Array.from({ length: count }, (_, index) => (
        <Skeleton key={index} animation="wave" variant="rounded" height={76} />
      ))}
    </Box>
  );
}

export default function BookAppointmentSkeleton() {
  return (
    <Box
      className="book-form"
      aria-busy="true"
      aria-label="Loading book appointment"
    >
      <Box className="book-card">
        <CardTitleSkeleton width={120} />
        <Skeleton animation="wave" variant="rounded" height={44} />
        <Box className="patient-search-foot">
          <Skeleton animation="wave" width={120} height={18} />
        </Box>
      </Box>

      <Box className="book-card">
        <CardTitleSkeleton width={150} />
        <ChoiceGridSkeleton count={2} />
      </Box>

      <Box className="book-card">
        <Box className="card-head">
          <Box className="date-heading">
            <Skeleton animation="wave" width={110} height={22} />
            <Skeleton animation="wave" width={90} height={16} />
          </Box>
          <Box className="date-nav">
            {[0, 1, 2].map((index) => (
              <Skeleton
                key={index}
                animation="wave"
                variant="rounded"
                width={32}
                height={32}
              />
            ))}
          </Box>
        </Box>
        <DateStripSkeleton />
      </Box>

      <Box className="book-card">
        <CardTitleSkeleton width={140} />
        <TimeSlotsSkeleton groups={2} />
      </Box>

      <Box className="book-card">
        <CardTitleSkeleton width={120} />
        <ChoiceGridSkeleton count={3} />
      </Box>

      <Box className="book-card">
        <CardTitleSkeleton width={120} />
        <Skeleton animation="wave" variant="rounded" height={96} />
      </Box>

      <Box className="summary-card">
        <Box className="summary-head">
          <Skeleton animation="wave" width={150} height={22} />
        </Box>
        <Box className="summary-grid">
          {Array.from({ length: 5 }, (_, index) => (
            <Box key={index} className="summary-item">
              <Skeleton
                animation="wave"
                variant="rounded"
                width={30}
                height={30}
              />
              <Box className="summary-copy">
                <Skeleton animation="wave" width={70} height={14} />
                <Skeleton animation="wave" width={120} height={18} />
              </Box>
            </Box>
          ))}
        </Box>
        <Skeleton
          animation="wave"
          variant="rounded"
          height={56}
          className="summary-total-skeleton"
        />
      </Box>

      <Box className="confirm-wrap">
        <Skeleton animation="wave" variant="rounded" width={200} height={44} />
      </Box>
    </Box>
  );
}
