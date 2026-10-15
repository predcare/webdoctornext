'use client';

import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';

// Apple Icon SVG
const AppleIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.36c.64-.78 1.08-1.86.96-2.95-1 .04-2.19.67-2.88 1.48-.59.69-1.12 1.8-0.98 2.87 1.12.09 2.26-.62 2.9-1.4z" />
  </svg>
);

// Google Play Icon SVG
const GooglePlayIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3.609 1.814L13.793 12 3.61 22.186c-.372-.34-.61-.83-.61-1.398V3.212c0-.568.238-1.058.61-1.398zm11.255 11.257l2.254-2.254-9.356-5.346 7.102 7.6zm0 1.858l-7.102 7.6 9.356-5.346-2.254-2.254zm1.563-1.563l2.878-1.644c.915-.523.915-1.375 0-1.898l-2.878-1.644-2.33 2.593 2.33 2.593z" />
  </svg>
);

interface HeroSectionProps {
  onRegisterClick?: () => void;
}

const HeroSection = ({ onRegisterClick }: HeroSectionProps) => {
  return (
    <Box
      id="home"
      component="header"
      sx={{
        position: 'relative',
        pt: { xs: 16, sm: 18, lg: 22 },
        pb: { xs: 8, lg: 0 },
        color: '#FFFFFF',
        backgroundImage: "url('https://stage.predcare.in/images/bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10 }}>
        <Grid
          container
          spacing={{ xs: 6, lg: 4 }}
          sx={{ alignItems: 'center' }}
        >
          {/* Left Hero Content */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Box
              sx={{
                textAlign: { xs: 'center', lg: 'left' },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: {
                    xs: '2.75rem',
                    sm: '3.5rem',
                    md: '4rem',
                    lg: '4.25rem',
                  },
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  lineHeight: { xs: 1.15, lg: 1.1 },
                  mb: 3,
                  color: '#FFFFFF',
                }}
              >
                Healing People Through Technology.
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1.1rem', md: '1.2rem' },
                  color: '#DBEAFE', // blue-100
                  mb: 4,
                  lineHeight: 1.6,
                }}
              >
                Enhance Your Practice, Engage Your Patients: Doctor On-the-Go
                with Smart Solution.
              </Typography>

              {/* App Download Buttons */}
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                sx={{
                  justifyContent: { xs: 'center', lg: 'flex-start' },
                  alignItems: 'center',
                }}
              >
                {/* App Store Button */}
                <Button
                  component="a"
                  href="https://apps.apple.com/us/developer/pred-solutions/id1889453659"
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={<AppleIcon />}
                  sx={{
                    bgcolor: '#000000',
                    color: '#FFFFFF',
                    px: 3,
                    py: 1.4,
                    borderRadius: '12px',
                    border: '1px solid #374151', // gray-700
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.4)',
                    textTransform: 'none',
                    width: { xs: '100%', sm: 'auto' },
                    minWidth: 190,
                    justifyContent: 'flex-start',
                    gap: 1,
                    '&:hover': {
                      bgcolor: '#111827',
                    },
                  }}
                >
                  <Box sx={{ textAlign: 'left', lineHeight: 1 }}>
                    <Typography
                      sx={{
                        fontSize: '0.68rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: '#9CA3AF',
                      }}
                    >
                      Download on the
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '1.2rem',
                        fontWeight: 600,
                        color: '#FFFFFF',
                        mt: 0.3,
                      }}
                    >
                      App Store
                    </Typography>
                  </Box>
                </Button>

                {/* Google Play Button */}
                <Button
                  component="a"
                  href="https://play.google.com/store/apps/developer?id=PRED+CARE&hl=en_IN"
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={<GooglePlayIcon />}
                  sx={{
                    bgcolor: '#000000',
                    color: '#FFFFFF',
                    px: 3,
                    py: 1.4,
                    borderRadius: '12px',
                    border: '1px solid #374151',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.4)',
                    textTransform: 'none',
                    width: { xs: '100%', sm: 'auto' },
                    minWidth: 190,
                    justifyContent: 'flex-start',
                    gap: 1,
                    '&:hover': {
                      bgcolor: '#111827',
                    },
                  }}
                >
                  <Box sx={{ textAlign: 'left', lineHeight: 1 }}>
                    <Typography
                      sx={{
                        fontSize: '0.68rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: '#9CA3AF',
                      }}
                    >
                      Get it on
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '1.2rem',
                        fontWeight: 600,
                        color: '#FFFFFF',
                        mt: 0.3,
                      }}
                    >
                      Google Play
                    </Typography>
                  </Box>
                </Button>
              </Stack>
            </Box>
          </Grid>

          {/* Right Hero Image / Phone Mockup */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                justifyContent: { xs: 'center', lg: 'flex-end' },
                mt: { xs: 4, lg: 0 },
              }}
            >
              {/* Decorative pulsing blur background */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  right: { xs: '10%', lg: 0 },
                  transform: 'translateY(-50%)',
                  width: { xs: 260, md: 320 },
                  height: { xs: 260, md: 320 },
                  background:
                    'linear-gradient(to bottom right, #60A5FA, #A855F7)',
                  borderRadius: '50%',
                  opacity: 0.25,
                  filter: 'blur(48px)',
                  zIndex: 1,
                  animation: 'pulseGlow 4s ease-in-out infinite alternate',
                  '@keyframes pulseGlow': {
                    '0%': {
                      opacity: 0.2,
                      transform: 'translateY(-50%) scale(0.95)',
                    },
                    '100%': {
                      opacity: 0.35,
                      transform: 'translateY(-50%) scale(1.05)',
                    },
                  },
                }}
              />

              {/* Phone Mockup Graphic */}
              <Box
                sx={{
                  position: 'relative',
                  zIndex: 2,
                  transition: 'transform 0.5s ease',
                  '&:hover': {
                    transform: 'scale(1.03)',
                  },
                }}
              >
                <Box
                  component="img"
                  src="https://stage.predcare.in/images/banner-mobile2-1.png"
                  alt="PRED Care Mobile App"
                  sx={{
                    width: '100%',
                    maxWidth: { xs: 360, sm: 440, lg: 500 },
                    height: 'auto',
                    display: 'block',
                    filter: 'drop-shadow(0 25px 25px rgba(0, 0, 0, 0.45))',
                  }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;
