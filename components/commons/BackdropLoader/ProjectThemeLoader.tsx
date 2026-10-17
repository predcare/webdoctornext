'use client';

import { Box, CircularProgress, Fade, Typography } from '@mui/material';
import { alpha, keyframes, useTheme } from '@mui/material/styles';
import Image from 'next/image';

type ProjectThemeLoaderProps = {
  isOpen?: boolean;
  message?: string;
};

const pulse = keyframes`
  0%, 100% {
    transform: scale(0.96);
    opacity: 0.55;
  }
  50% {
    transform: scale(1.06);
    opacity: 1;
  }
`;

const ProjectThemeLoader = ({
  isOpen = true,
  message = 'Preparing your workspace...',
}: ProjectThemeLoaderProps) => {
  const theme = useTheme();

  const {
    brandTeal,
    brandTealLight,
    brandTealGlow,
    pageBg,
    textSecondary,
  } = theme.palette.customColors;

  return (
    <Fade in={isOpen} timeout={200} unmountOnExit>
      <Box
        role="status"
        aria-live="polite"
        aria-busy={isOpen}
        sx={{
          position: 'fixed',
          inset: 0,
          zIndex: 1400,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: alpha(pageBg, 0.52),
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            maxWidth: 280,
            px: 3,
            gap: 2.5,
          }}
        >
          {/* Brand */}
          <Box
            sx={{
              position: 'relative',
              width: 76,
              height: 76,
              display: 'grid',
              placeItems: 'center',
              borderRadius: '24px',
              bgcolor: alpha(brandTealLight, 0.16),
              border: `1px solid ${alpha(brandTeal, 0.12)}`,
              boxShadow: `0 8px 32px ${alpha(brandTeal, 0.08)}`,
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                inset: -8,
                borderRadius: '28px',
                background: `radial-gradient(circle, ${brandTealGlow} 0%, transparent 72%)`,
                animation: `${pulse} 2.4s ease-in-out infinite`,
                '@media (prefers-reduced-motion: reduce)': {
                  animation: 'none',
                },
              }}
            />

            <Image
              src="/assets/images/logo.png"
              alt=""
              width={52}
              height={52}
              priority
              style={{
                position: 'relative',
                zIndex: 1,
                objectFit: 'contain',
              }}
            />
          </Box>

          {/* Progress */}
          <Box
            sx={{
              position: 'relative',
              display: 'grid',
              placeItems: 'center',
              width: 30,
              height: 30,
            }}
          >
            <CircularProgress
              variant="determinate"
              value={100}
              size={30}
              thickness={3}
              sx={{
                position: 'absolute',
                color: alpha(brandTeal, 0.12),
              }}
            />
            <CircularProgress
              size={30}
              thickness={3}
              sx={{
                color: brandTeal,
                '& .MuiCircularProgress-circle': {
                  strokeLinecap: 'round',
                },
              }}
              aria-label="Loading"
            />
          </Box>

          {/* Status message */}
          <Box sx={{ textAlign: 'center', mt: -0.5 }}>
            <Typography
              variant="body2"
              sx={{
                color: textSecondary,
                fontWeight: 500,
                lineHeight: 1.7,
                letterSpacing: '0.01em',
                overflowWrap: 'anywhere',
              }}
            >
              {message || 'Preparing your workspace...'}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Fade>
  );
};

export default ProjectThemeLoader;
