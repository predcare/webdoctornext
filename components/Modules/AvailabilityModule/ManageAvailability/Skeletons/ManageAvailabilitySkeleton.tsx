'use client';

import { Box, Skeleton } from '@mui/material';

function TitleSkeleton({ width = 140 }: { width?: number }) {
  return (
    <Skeleton
      animation="wave"
      width={width}
      height={22}
      sx={{ marginBottom: '12px' }}
    />
  );
}

function TimePicksSkeleton() {
  return (
    <Box className="time-picks">
      {[0, 1, 2].map((index) => (
        <Skeleton
          key={index}
          animation="wave"
          variant="rounded"
          width={80}
          height={40}
        />
      ))}
    </Box>
  );
}

export default function ManageAvailabilitySkeleton() {
  return (
    <Box aria-busy="true" aria-label="Loading availability">
      <Box className="form-card">
        <TitleSkeleton width={130} />
        <Box className="mode-switch">
          {[0, 1, 2].map((index) => (
            <Skeleton
              key={index}
              animation="wave"
              variant="rounded"
              width={120}
              height={38}
            />
          ))}
        </Box>
        <Box className="calendar-shell">
          <Box className="calendar-head">
            <Skeleton animation="wave" variant="circular" width={32} height={32} />
            <Skeleton animation="wave" width={130} height={24} />
            <Skeleton animation="wave" variant="circular" width={32} height={32} />
          </Box>
          <Skeleton animation="wave" variant="rounded" height={260} />
        </Box>
        <Box className="selected-panel">
          <TitleSkeleton width={120} />
          <Skeleton animation="wave" variant="rounded" height={56} />
        </Box>
      </Box>

      <Box className="form-card">
        <Box className="section-block">
          <TitleSkeleton width={110} />
          <Box className="time-grid">
            <Box>
              <Skeleton animation="wave" width={50} height={18} />
              <TimePicksSkeleton />
            </Box>
            <Box>
              <Skeleton animation="wave" width={50} height={18} />
              <TimePicksSkeleton />
            </Box>
          </Box>
        </Box>
        <Box className="section-block">
          <TitleSkeleton width={150} />
          <Box className="consult-options">
            {[0, 1, 2].map((index) => (
              <Skeleton key={index} animation="wave" width={130} height={28} />
            ))}
          </Box>
        </Box>
        <Box className="section-block">
          <TitleSkeleton width={150} />
          <Skeleton animation="wave" variant="rounded" height={44} />
        </Box>
      </Box>

      <Box className="form-card">
        <TitleSkeleton width={170} />
        <Skeleton animation="wave" width={130} height={18} />
        <Skeleton animation="wave" variant="rounded" height={44} />
        <Box className="check-list">
          <Skeleton animation="wave" width={220} height={24} />
          <Skeleton animation="wave" width={360} height={24} />
        </Box>
      </Box>

      <Box className="form-footer">
        <Skeleton animation="wave" variant="rounded" width={110} height={42} />
        <Skeleton animation="wave" variant="rounded" width={110} height={42} />
      </Box>
    </Box>
  );
}
