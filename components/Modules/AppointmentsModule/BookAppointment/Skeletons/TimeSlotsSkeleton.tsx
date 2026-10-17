'use client';

import { Box, Skeleton } from '@mui/material';

type TimeSlotsSkeletonProps = {
  groups?: number;
  chips?: number;
};

export default function TimeSlotsSkeleton({
  groups = 3,
  chips = 8,
}: TimeSlotsSkeletonProps) {
  return (
    <Box aria-busy="true" aria-label="Loading time slots">
      {Array.from({ length: groups }, (_, groupIndex) => (
        <Box key={groupIndex} className="slot-group">
          <Skeleton
            animation="wave"
            variant="rounded"
            height={36}
            className="slot-group-skeleton"
          />
          <Box className="slot-list">
            {Array.from({ length: chips }, (_, chipIndex) => (
              <Skeleton
                key={chipIndex}
                animation="wave"
                variant="rounded"
                height={36}
              />
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
}
