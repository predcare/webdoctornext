'use client';

import { Box, Skeleton } from '@mui/material';

export default function InvoiceSettingsSkeleton() {
  return (
    <Box className="form-card" aria-label="Loading invoice settings">
      <Box className="mode-block">
        <Skeleton variant="text" width={140} height={26} />
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
        <Skeleton variant="text" width={140} height={26} />
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

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Skeleton variant="text" width={160} height={22} />
          <Skeleton
            variant="rounded"
            width={56}
            height={20}
            sx={{ borderRadius: '10px' }}
          />
        </Box>
        <Skeleton
          variant="rounded"
          width="100%"
          height={88}
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

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Skeleton variant="text" width={150} height={24} />
        <Skeleton variant="text" width="45%" height={18} />
        <Skeleton
          variant="rounded"
          width="100%"
          height={48}
          sx={{ borderRadius: '8px' }}
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
