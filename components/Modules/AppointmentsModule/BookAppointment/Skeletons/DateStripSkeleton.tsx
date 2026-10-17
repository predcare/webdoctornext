'use client';

import { Box, Skeleton } from '@mui/material';

type DateStripSkeletonProps = {
  count?: number;
};

export default function DateStripSkeleton({ count = 7 }: DateStripSkeletonProps) {
  return (
    <Box className="date-row" aria-busy="true" aria-label="Loading dates">
      {Array.from({ length: count }, (_, index) => (
        <Skeleton
          key={index}
          animation="wave"
          variant="rounded"
          width={92}
          height={86}
          className="date-skeleton"
        />
      ))}
    </Box>
  );
}
