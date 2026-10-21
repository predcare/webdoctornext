'use client';

import { MeetingWrapper } from '@/styles/CustomStyled/MeetingWrapper';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Skeleton,
} from '@mui/material';

export default function MeetingSummarySkeleton() {
  return (
    <MeetingWrapper>
      <Box className="summary-page">
        <Card
          className="summary-card"
          aria-busy="true"
          aria-label="Loading consultation summary"
        >
          {/* Banner Skeleton */}
          <Box className="summary-banner">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Skeleton
                variant="circular"
                width={40}
                height={40}
                animation="wave"
              />
              <Box>
                <Skeleton
                  variant="text"
                  width={240}
                  height={28}
                  animation="wave"
                />
                <Skeleton
                  variant="text"
                  width={300}
                  height={18}
                  animation="wave"
                />
              </Box>
            </Box>
            <Skeleton
              variant="rounded"
              width={96}
              height={26}
              sx={{ borderRadius: '999px' }}
              animation="wave"
            />
          </Box>

          <CardContent className="summary-body">
            {/* Patient Identity Skeleton */}
            <Box className="summary-identity">
              <Skeleton
                variant="circular"
                width={64}
                height={64}
                animation="wave"
              />
              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    mb: 0.5,
                  }}
                >
                  <Skeleton
                    variant="text"
                    width={180}
                    height={32}
                    animation="wave"
                  />
                  <Skeleton
                    variant="rounded"
                    width={88}
                    height={22}
                    sx={{ borderRadius: '999px' }}
                    animation="wave"
                  />
                </Box>
                <Skeleton
                  variant="text"
                  width={140}
                  height={20}
                  animation="wave"
                />
                <Box className="summary-contact-row">
                  <Skeleton
                    variant="rounded"
                    width={140}
                    height={22}
                    animation="wave"
                  />
                  <Skeleton
                    variant="rounded"
                    width={200}
                    height={22}
                    animation="wave"
                  />
                  <Skeleton
                    variant="rounded"
                    width={150}
                    height={22}
                    animation="wave"
                  />
                </Box>
              </Box>
            </Box>

            <Divider className="summary-divider" />

            {/* Appointment Details Grid Skeleton */}
            <Skeleton
              variant="text"
              width={160}
              height={22}
              sx={{ mb: 2 }}
              animation="wave"
            />
            <Grid container spacing={2.5}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <Grid key={item} size={{ xs: 6, sm: 3 }}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: '12px',
                      border: '1px solid rgba(0, 0, 0, 0.06)',
                    }}
                  >
                    <Skeleton
                      variant="text"
                      width={90}
                      height={16}
                      animation="wave"
                    />
                    <Skeleton
                      variant="text"
                      width={130}
                      height={24}
                      animation="wave"
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>

            <Divider className="summary-divider" />

            {/* Action Buttons Skeleton */}
            <Box className="summary-actions">
              <Skeleton
                variant="rounded"
                width={190}
                height={42}
                sx={{ borderRadius: '10px' }}
                animation="wave"
              />
              <Skeleton
                variant="rounded"
                width={180}
                height={42}
                sx={{ borderRadius: '10px' }}
                animation="wave"
              />
              <Skeleton
                variant="rounded"
                width={140}
                height={42}
                sx={{ borderRadius: '10px' }}
                animation="wave"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </MeetingWrapper>
  );
}
