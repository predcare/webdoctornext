'use client';

import { Box, Grid, Skeleton } from '@mui/material';

const tileSize = { xs: 12, sm: 6, xl: 4 };

type SkeletonCardProps = {
  tiles?: number;
  fullWidthTiles?: number;
  lines?: number;
};

function SkeletonCard({ tiles = 0, fullWidthTiles = 0, lines = 0 }: SkeletonCardProps) {
  return (
    <Box className="detail-card fill">
      <Box className="card-head">
        <Box className="card-head-title">
          <Skeleton animation="wave" variant="rounded" width={32} height={32} />
          <Skeleton animation="wave" width={160} height={22} />
        </Box>
      </Box>
      <Box className="card-body">
        {tiles > 0 || fullWidthTiles > 0 ? (
          <Grid container rowSpacing={2} columnSpacing={2}>
            {Array.from({ length: tiles }, (_, index) => (
              <Grid key={`tile-${index}`} size={tileSize}>
                <Box className="skeleton-tile">
                  <Skeleton animation="wave" width="45%" height={14} />
                  <Skeleton animation="wave" variant="rounded" height={36} />
                </Box>
              </Grid>
            ))}
            {Array.from({ length: fullWidthTiles }, (_, index) => (
              <Grid key={`full-${index}`} size={12}>
                <Box className="skeleton-tile">
                  <Skeleton animation="wave" width="25%" height={14} />
                  <Skeleton animation="wave" variant="rounded" height={56} />
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : null}
        {lines > 0 ? (
          <Box className="skeleton-stack">
            {Array.from({ length: lines }, (_, index) => (
              <Skeleton
                key={`line-${index}`}
                animation="wave"
                width={index === lines - 1 ? '60%' : '100%'}
                height={18}
              />
            ))}
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}

export default function AppointmentDetailsSkeleton() {
  return (
    <Grid
      container
      spacing={{ xs: 2, sm: 2.5, lg: 3 }}
      aria-busy="true"
      aria-label="Loading appointment details"
    >
      <Grid size={12}>
        <Box className="detail-card">
          <Box className="card-body">
            <Box className="patient-head">
              <Skeleton animation="wave" variant="circular" width={64} height={64} />
              <Box className="skeleton-stack">
                <Skeleton animation="wave" width={220} height={26} />
                <Box className="skeleton-row">
                  {[0, 1, 2].map((index) => (
                    <Skeleton
                      key={index}
                      animation="wave"
                      variant="rounded"
                      width={140}
                      height={26}
                    />
                  ))}
                </Box>
              </Box>
              <Skeleton animation="wave" variant="rounded" width={120} height={32} />
            </Box>
            <Box className="meta-strip">
              <Grid container rowSpacing={2} columnSpacing={2}>
                {[0, 1].map((index) => (
                  <Grid key={index} size={{ xs: 6, sm: 3 }}>
                    <Skeleton animation="wave" width="60%" height={14} />
                    <Skeleton animation="wave" width="40%" height={20} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid size={{ xs: 12, lg: 8 }}>
        <SkeletonCard tiles={9} fullWidthTiles={1} />
      </Grid>
      <Grid size={{ xs: 12, lg: 4 }}>
        <SkeletonCard lines={4} />
      </Grid>
      <Grid size={12}>
        <SkeletonCard lines={3} />
      </Grid>
      <Grid size={12}>
        <SkeletonCard tiles={6} />
      </Grid>
    </Grid>
  );
}
