'use client';

import { Box, Skeleton } from '@mui/material';

const pillSkeleton = {
  borderRadius: '999px',
  bgcolor: 'rgba(255, 255, 255, 0.55)',
};

export default function MeetingCallSkeleton() {
  return (
    <>
      <Box className="stage" aria-busy="true" aria-label="Loading consultation">
        <Skeleton
          animation="wave"
          variant="rectangular"
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            transform: 'none',
          }}
        />
        <Box className="status-row">
          <Skeleton
            animation="wave"
            variant="rounded"
            width={72}
            height={22}
            sx={pillSkeleton}
          />
          <Skeleton
            animation="wave"
            variant="rounded"
            width={48}
            height={22}
            sx={pillSkeleton}
          />
          <Skeleton
            animation="wave"
            variant="rounded"
            width={88}
            height={22}
            sx={pillSkeleton}
          />
          <Skeleton
            animation="wave"
            variant="rounded"
            width={148}
            height={22}
            sx={pillSkeleton}
          />
          <Skeleton
            animation="wave"
            variant="rounded"
            width={148}
            height={28}
            sx={{ borderRadius: '8px', bgcolor: 'rgba(255, 255, 255, 0.72)' }}
          />
        </Box>
        <Skeleton
          className="local-tile"
          animation="wave"
          variant="rounded"
          sx={{ bgcolor: 'rgba(255, 255, 255, 0.28)' }}
        />
        <Box className="control-bar">
          {Array.from({ length: 5 }, (_, index) => (
            <Skeleton
              key={index}
              animation="wave"
              variant="circular"
              width={42}
              height={42}
              sx={{ bgcolor: 'rgba(255, 255, 255, 0.55)' }}
            />
          ))}
        </Box>
      </Box>

      <Box className="side-panel" aria-hidden>
        <Box className="panel-card profile-block">
          <Skeleton animation="wave" width={140} height={18} />
          <Box className="identity">
            <Skeleton
              animation="wave"
              variant="circular"
              width={42}
              height={42}
            />
            <Box className="identity-copy" sx={{ flex: 1 }}>
              <Skeleton animation="wave" width="70%" height={20} />
              <Skeleton
                animation="wave"
                width="46%"
                height={16}
                sx={{ mt: 0.5 }}
              />
            </Box>
          </Box>
          <Box className="meta-row">
            <Skeleton
              animation="wave"
              variant="rounded"
              height={58}
              sx={{ flex: 1, borderRadius: '12px' }}
            />
            <Skeleton
              animation="wave"
              variant="rounded"
              height={58}
              sx={{ flex: 1, borderRadius: '12px' }}
            />
          </Box>
          <Skeleton animation="wave" width={110} height={14} />
          <Skeleton
            animation="wave"
            variant="rounded"
            height={64}
            sx={{ borderRadius: '12px' }}
          />
          <Skeleton
            animation="wave"
            variant="rounded"
            height={44}
            sx={{ borderRadius: '10px' }}
          />
          <Skeleton
            animation="wave"
            variant="rounded"
            height={44}
            sx={{ borderRadius: '10px' }}
          />
        </Box>
        <Box className="panel-card notes-block">
          <Skeleton animation="wave" width={120} height={18} />
          <Skeleton
            animation="wave"
            variant="rounded"
            height={96}
            sx={{ mt: 1.5, borderRadius: '10px' }}
          />
        </Box>
      </Box>
    </>
  );
}
