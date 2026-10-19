'use client';

import { Box, Grid, Skeleton } from '@mui/material';

export default function PatientDetailsSkeleton() {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
      aria-busy="true"
      aria-label="Loading patient details"
    >
      {/* Profile Header Card Skeleton */}
      <Box className="detail-card profile-card">
        <Box className="profile-head">
          <Box className="profile-identity">
            <Skeleton
              animation="wave"
              variant="circular"
              width={72}
              height={72}
              sx={{ flexShrink: 0 }}
            />
            <Box className="profile-copy" sx={{ width: '100%', maxWidth: 420 }}>
              <Box className="profile-title-row">
                <Skeleton animation="wave" width={220} height={28} />
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  width={70}
                  height={22}
                  sx={{ borderRadius: '999px' }}
                />
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  width={60}
                  height={22}
                  sx={{ borderRadius: '999px' }}
                />
              </Box>
              <Box className="profile-quick" sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Skeleton animation="wave" width={120} height={18} />
                <Skeleton animation="wave" width={160} height={18} />
                <Skeleton animation="wave" width={100} height={18} />
              </Box>
            </Box>
          </Box>

          <Box className="profile-actions">
            <Skeleton
              animation="wave"
              variant="rounded"
              width={160}
              height={40}
              sx={{ borderRadius: '8px' }}
            />
          </Box>
        </Box>

        <Box className="profile-info">
          <Box className="info-group">
            <Box className="info-group-head" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Skeleton animation="wave" variant="rounded" width={24} height={24} />
              <Skeleton animation="wave" width={160} height={20} />
            </Box>
            <Grid container className="info-grid" spacing={2} sx={{ mt: 1 }}>
              {Array.from({ length: 4 }).map((_, index) => (
                <Grid key={index} size={{ xs: 6, sm: 6, md: 3 }}>
                  <Skeleton animation="wave" width="40%" height={14} sx={{ mb: 0.5 }} />
                  <Skeleton animation="wave" width="70%" height={22} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>

      {/* Tabs Bar Skeleton */}
      <Box
        sx={{
          display: 'flex',
          gap: 1.5,
          p: 1,
          borderRadius: '12px',
          border: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
          overflow: 'hidden',
        }}
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton
            key={index}
            animation="wave"
            variant="rounded"
            width={index === 0 ? 130 : 110}
            height={38}
            sx={{ borderRadius: '8px', flexShrink: 0 }}
          />
        ))}
      </Box>

      {/* Tab Content Body Skeleton */}
      <Grid container spacing={2.5}>
        {Array.from({ length: 4 }).map((_, index) => (
          <Grid key={index} size={{ xs: 12, lg: 6 }}>
            <Box
              className="detail-card fill"
              sx={{
                p: 3,
                borderRadius: '16px',
                border: '1px solid',
                borderColor: 'divider',
                bgcolor: 'background.paper',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <Skeleton animation="wave" variant="rounded" width={32} height={32} />
                <Box sx={{ flex: 1 }}>
                  <Skeleton animation="wave" width="45%" height={20} />
                  <Skeleton animation="wave" width="30%" height={14} />
                </Box>
              </Box>
              <Grid container spacing={1.5}>
                {Array.from({ length: 4 }).map((_, tileIndex) => (
                  <Grid key={tileIndex} size={tileIndex === 0 ? 12 : { xs: 12, sm: 6 }}>
                    <Skeleton
                      animation="wave"
                      variant="rounded"
                      height={58}
                      sx={{ borderRadius: '8px' }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
