'use client';
/* eslint-disable @next/next/no-img-element -- landing images stay native img tags inside figure */

import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';

const QueueSection = () => {
  return (
    <Box className="cms-queue" component="section">
      <Container maxWidth="lg">
        <Box className="section-heading section-heading-compact">
          <Typography
            className="section-eyebrow section-eyebrow-muted"
            variant="overline"
          >
            EXTENDED FEATURES
          </Typography>

          <Typography className="section-title queue-title" variant="h2">
            QEase - Queue Management System
          </Typography>

          <Typography className="section-lead" variant="body1">
            Simple, Yet Powerful Features
          </Typography>
        </Box>

        <Grid className="queue-grid" container spacing={{ xs: 6, lg: 8 }}>
          <Grid size={{ xs: 12, lg: 6 }}>
            <Typography className="queue-headline" variant="h3">
              Cut the Wait, Elevate
              <br />
              the Care.
            </Typography>

            <Typography className="queue-intro" variant="body1">
              Reducing wait times, enhancing patient experience.
            </Typography>

            <Stack className="queue-points">
              <Box className="queue-point">
                <Box className="queue-point-icon">
                  <SentimentSatisfiedAltOutlinedIcon />
                </Box>
                <Box>
                  <Typography className="queue-point-title" variant="h4">
                    Improved patient experience
                  </Typography>
                  <Typography className="queue-point-text" variant="body2">
                    The queue system helps manage patient flow more efficiently.
                  </Typography>
                </Box>
              </Box>

              <Box className="queue-point">
                <Box className="queue-point-icon">
                  <HourglassEmptyOutlinedIcon />
                </Box>
                <Box>
                  <Typography className="queue-point-title" variant="h4">
                    Mobile Token
                  </Typography>
                  <Typography className="queue-point-text" variant="body2">
                    Scan the clinic&apos;s QR code and join the queue.
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, lg: 6 }}>
            <Box className="queue-visual">
              <figure className="media queue-figure">
                <img
                  src="https://stage.predcare.in/images/Queue-Management-System.png"
                  alt="QEase Queue Management System"
                />
              </figure>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default QueueSection;
