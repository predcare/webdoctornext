'use client';

import { Box, Skeleton } from '@mui/material';

export default function PrescriptionSettingsSkeleton() {
  return (
    <Box className="form-card" aria-label="Loading prescription settings">
      <Box className="mode-block">
        <Skeleton variant="text" width={170} height={26} />
        <Skeleton
          variant="rounded"
          width="100%"
          height={42}
          sx={{ borderRadius: '8px' }}
        />
        <Skeleton
          variant="rounded"
          width="100%"
          height={56}
          sx={{ borderRadius: '8px' }}
        />
      </Box>

      <Box className="mode-block">
        <Skeleton variant="text" width={160} height={26} />
        <Skeleton
          variant="rounded"
          width="100%"
          height={42}
          sx={{ borderRadius: '8px' }}
        />
        <Skeleton
          variant="rounded"
          width="100%"
          height={56}
          sx={{ borderRadius: '8px' }}
        />
      </Box>

      <Box className="signature-block">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Skeleton variant="text" width={180} height={26} />
          <Skeleton variant="text" width="60%" height={18} />
        </Box>
        <Skeleton
          variant="rounded"
          width="100%"
          height={42}
          sx={{ borderRadius: '8px' }}
        />
        <Skeleton variant="text" width="75%" height={16} />
        <Skeleton
          variant="rounded"
          width="100%"
          height={130}
          sx={{ borderRadius: '12px' }}
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 1 }}>
        <Skeleton
          variant="rounded"
          width={140}
          height={42}
          sx={{ borderRadius: '8px' }}
        />
      </Box>
    </Box>
  );
}
