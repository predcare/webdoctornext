'use client';

import { ConsultationTabId } from '@/components/Modules/PrescriptionsModule/ManagePrescription/constants';
import { Box, Grid, Skeleton } from '@mui/material';

export function ConsultationPatientHeaderSkeleton() {
  return (
    <Box className="patient-head" aria-busy="true" aria-label="Loading patient info">
      <Box className="patient-identity">
        <Skeleton
          animation="wave"
          variant="circular"
          width={56}
          height={56}
          sx={{ flexShrink: 0 }}
        />
        <Box className="patient-copy" sx={{ width: '100%', maxWidth: 450 }}>
          <Box className="patient-title-row">
            <Skeleton animation="wave" width={180} height={26} />
            <Skeleton
              animation="wave"
              variant="rounded"
              width={70}
              height={22}
              sx={{ borderRadius: '999px' }}
            />
          </Box>
          <Box
            className="patient-meta"
            sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}
          >
            <Skeleton animation="wave" width={110} height={18} />
            <Skeleton animation="wave" width={130} height={18} />
            <Skeleton animation="wave" width={150} height={18} />
            <Skeleton animation="wave" width={90} height={18} />
          </Box>
        </Box>
      </Box>

      <Grid container spacing={0} className="patient-stats">
        {[1, 2, 3, 4].map((i) => (
          <Grid key={i} size={{ xs: 6, md: 3 }} className="stat-cell">
            <Skeleton animation="wave" width={70} height={14} sx={{ mb: 0.5 }} />
            <Skeleton animation="wave" width={110} height={20} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export function ConsultationWorkspaceTabsSkeleton() {
  return (
    <Box className="workspace-nav" aria-hidden="true">
      <Box
        className="tabs-head"
        sx={{
          py: 1.5,
          px: 2,
          display: 'flex',
          gap: 3,
          overflow: 'hidden',
        }}
      >
        {[130, 140, 150, 160, 120].map((w, idx) => (
          <Skeleton
            key={idx}
            animation="wave"
            variant="rounded"
            width={w}
            height={30}
            sx={{ borderRadius: '6px', flexShrink: 0 }}
          />
        ))}
      </Box>
      <Box className="sub-tabs-row" sx={{ p: '12px 16px' }}>
        <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
          {[1, 2, 3, 4].map((i) => (
            <Skeleton
              key={i}
              animation="wave"
              variant="rounded"
              width="25%"
              height={38}
              sx={{ borderRadius: '9px' }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export function ConsultationActionsBarSkeleton() {
  return (
    <Box
      className="actions-bar"
      aria-hidden="true"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 2,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
        <Skeleton animation="wave" width={160} height={20} />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Skeleton animation="wave" width={90} height={16} />
          <Skeleton animation="wave" width={130} height={16} />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
        <Skeleton
          animation="wave"
          variant="rounded"
          width={150}
          height={40}
          sx={{ borderRadius: '8px' }}
        />
        <Skeleton
          animation="wave"
          variant="rounded"
          width={110}
          height={40}
          sx={{ borderRadius: '8px' }}
        />
        <Skeleton
          animation="wave"
          variant="rounded"
          width={175}
          height={40}
          sx={{ borderRadius: '8px' }}
        />
      </Box>
    </Box>
  );
}

type ManagePrescriptionSkeletonProps = {
  tab?: ConsultationTabId;
};

export default function ManagePrescriptionSkeleton({
  tab = 'prescription',
}: ManagePrescriptionSkeletonProps) {
  const showFullForm = tab === 'prescription';

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}
      aria-busy="true"
      aria-label="Loading consultation details"
    >
      {/* Patient Header */}
      <ConsultationPatientHeaderSkeleton />

      {/* Tabs */}
      <ConsultationWorkspaceTabsSkeleton />

      {/* Allergies & Conditions */}
      {showFullForm || tab === 'clinical-notes' ? (
        <Box className="section-card">
          <Box className="card-head">
            <Box className="card-title-wrap">
              <Skeleton
                animation="wave"
                variant="rounded"
                width={28}
                height={28}
                sx={{ borderRadius: '8px' }}
              />
              <Skeleton animation="wave" width={220} height={22} />
            </Box>
          </Box>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Skeleton
                animation="wave"
                width={120}
                height={16}
                sx={{ mb: 1 }}
              />
              <Skeleton
                animation="wave"
                variant="rounded"
                height={46}
                sx={{ borderRadius: '8px' }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Skeleton
                animation="wave"
                width={140}
                height={16}
                sx={{ mb: 1 }}
              />
              <Skeleton
                animation="wave"
                variant="rounded"
                height={46}
                sx={{ borderRadius: '8px' }}
              />
            </Grid>
          </Grid>
        </Box>
      ) : null}

      {/* Vitals */}
      {showFullForm || tab === 'clinical-notes' ? (
        <Box className="section-card">
          <Box className="card-head">
            <Box className="card-title-wrap">
              <Skeleton
                animation="wave"
                variant="rounded"
                width={28}
                height={28}
                sx={{ borderRadius: '8px' }}
              />
              <Skeleton animation="wave" width={140} height={22} />
            </Box>
          </Box>
          <Grid container spacing={2}>
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <Grid key={i} size={{ xs: 6, sm: 4, md: 3, lg: 1.71 }}>
                <Skeleton
                  animation="wave"
                  width={70}
                  height={16}
                  sx={{ mb: 1 }}
                />
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  height={44}
                  sx={{ borderRadius: '8px' }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : null}

      {/* Clinical Notes & Diagnosis */}
      <Box className="section-card">
        <Box className="card-head">
          <Box className="card-title-wrap">
            <Skeleton
              animation="wave"
              variant="rounded"
              width={28}
              height={28}
              sx={{ borderRadius: '8px' }}
            />
            <Skeleton animation="wave" width={180} height={22} />
          </Box>
        </Box>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Skeleton
              animation="wave"
              width={130}
              height={16}
              sx={{ mb: 1 }}
            />
            <Skeleton
              animation="wave"
              variant="rounded"
              height={96}
              sx={{ borderRadius: '8px' }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Skeleton
              animation="wave"
              width={140}
              height={16}
              sx={{ mb: 1 }}
            />
            <Skeleton
              animation="wave"
              variant="rounded"
              height={96}
              sx={{ borderRadius: '8px' }}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Medications */}
      {showFullForm ? (
        <Box className="section-card">
          <Box className="card-head">
            <Box className="card-title-wrap">
              <Skeleton
                animation="wave"
                variant="rounded"
                width={28}
                height={28}
                sx={{ borderRadius: '8px' }}
              />
              <Skeleton animation="wave" width={160} height={22} />
            </Box>
            <Skeleton
              animation="wave"
              variant="rounded"
              width={120}
              height={36}
              sx={{ borderRadius: '8px' }}
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {[1, 2].map((i) => (
              <Skeleton
                key={i}
                animation="wave"
                variant="rounded"
                height={54}
                sx={{ borderRadius: '10px' }}
              />
            ))}
          </Box>
        </Box>
      ) : null}

      {/* Actions Bar */}
      <ConsultationActionsBarSkeleton />
    </Box>
  );
}
