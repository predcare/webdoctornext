'use client';

import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';

const QueueSection = () => {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 14 },
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Typography
            variant="overline"
            sx={{
              color: '#475569', // slate-600
              fontWeight: 700,
              letterSpacing: '0.15em',
              fontSize: '0.875rem',
              textTransform: 'uppercase',
              display: 'block',
              mb: 1,
            }}
          >
            EXTENDED FEATURES
          </Typography>

          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              fontWeight: 700,
              color: '#0F172A',
              mb: 1.5,
              letterSpacing: '-0.02em',
            }}
          >
            QEase - Queue Management System
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: '#64748B',
              fontSize: { xs: '1.05rem', md: '1.2rem' },
            }}
          >
            Simple, Yet Powerful Features
          </Typography>
        </Box>

        {/* Content Grid */}
        <Grid
          container
          spacing={{ xs: 6, lg: 8 }}
          sx={{ alignItems: 'center' }}
        >
          {/* Left Content */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.5rem' },
                fontWeight: 700,
                color: '#0F172A',
                mb: 2,
                lineHeight: 1.25,
              }}
            >
              Cut the Wait, Elevate
              <br />
              the Care.
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: '#64748B',
                fontSize: '1.05rem',
                mb: 5,
                lineHeight: 1.6,
              }}
            >
              Reducing wait times, enhancing patient experience.
            </Typography>

            <Stack spacing={4}>
              {/* Feature 1: Improved patient experience */}
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2.5 }}>
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#2563EB',
                  }}
                >
                  <SentimentSatisfiedAltOutlinedIcon sx={{ fontSize: 48 }} />
                </Box>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      color: '#0F172A',
                      mb: 0.75,
                    }}
                  >
                    Improved patient experience
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#64748B',
                      fontSize: '1rem',
                      lineHeight: 1.6,
                    }}
                  >
                    The queue system helps manage patient flow more efficiently.
                  </Typography>
                </Box>
              </Box>

              {/* Feature 2: Mobile Token */}
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2.5 }}>
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#2563EB',
                  }}
                >
                  <HourglassEmptyOutlinedIcon sx={{ fontSize: 48 }} />
                </Box>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      color: '#0F172A',
                      mb: 0.75,
                    }}
                  >
                    Mobile Token
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#64748B',
                      fontSize: '1rem',
                      lineHeight: 1.6,
                    }}
                  >
                    Scan the clinic&apos;s QR code and join the queue.
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Grid>

          {/* Right Image Container */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  zIndex: 2,
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
                  transition: 'transform 0.4s ease',
                  '&:hover': {
                    transform: 'scale(1.02)',
                  },
                }}
              >
                <Box
                  component="img"
                  src="https://stage.predcare.in/images/Queue-Management-System.png"
                  alt="QEase Queue Management System"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    objectFit: 'cover',
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

export default QueueSection;
