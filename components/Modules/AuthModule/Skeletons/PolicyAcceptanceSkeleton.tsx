'use client';

import { Box, Skeleton, Stack } from '@mui/material';

const PolicyAcceptanceSkeleton = () => {
  return (
    <Box>
      <Stack spacing={1.25} sx={{ mb: 1.75 }}>
        {[1, 2, 3].map((key) => (
          <Box
            key={key}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.25,
              p: 1.5,
              borderRadius: '14px',
              border: '1px solid',
              borderColor: 'customColors.border',
              bgcolor: 'customColors.pageBg',
            }}
          >
            <Skeleton variant="rounded" width={38} height={38} />
            <Box sx={{ flex: 1 }}>
              <Skeleton width="70%" height={14} sx={{ mb: 0.75 }} />
              <Skeleton width="45%" height={12} />
            </Box>
            <Skeleton variant="rounded" width={60} height={28} />
          </Box>
        ))}
      </Stack>
      <Box
        sx={{
          p: 1.5,
          borderRadius: '12px',
          bgcolor: '#FFFBEB',
        }}
      >
        <Skeleton width="100%" height={12} sx={{ mb: 0.75, bgcolor: '#FDE68A' }} />
        <Skeleton width="60%" height={12} sx={{ bgcolor: '#FDE68A' }} />
      </Box>
    </Box>
  );
};

export default PolicyAcceptanceSkeleton;
