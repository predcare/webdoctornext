"use client";

import { Box, Button, Chip, Container, Stack, Typography } from "@mui/material";

const AppleIconDark = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.36c.64-.78 1.08-1.86.96-2.95-1 .04-2.19.67-2.88 1.48-.59.69-1.12 1.8-0.98 2.87 1.12.09 2.26-.62 2.9-1.4z" />
  </svg>
);

const GooglePlayIconDark = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3.609 1.814L13.793 12 3.61 22.186c-.372-.34-.61-.83-.61-1.398V3.212c0-.568.238-1.058.61-1.398zm11.255 11.257l2.254-2.254-9.356-5.346 7.102 7.6zm0 1.858l-7.102 7.6 9.356-5.346-2.254-2.254zm1.563-1.563l2.878-1.644c.915-.523.915-1.375 0-1.898l-2.878-1.644-2.33 2.593 2.33 2.593z" />
  </svg>
);

const AppDownloadSection = () => {
  return (
    <Box id="download" className="cms-download" component="section">
      <Container maxWidth="md">
        <Box className="download-card">
          <Box className="download-content">
            <Chip className="download-chip" label="GET STARTED TODAY" />

            <Typography className="download-title" variant="h2">
              Download the app now
            </Typography>

            <Typography className="download-text" variant="body1">
              Smart, Seamless Clinic Management App. Available on iOS and
              Android.
            </Typography>

            <Stack
              className="download-actions"
              direction={{ xs: "column", sm: "row" }}
              spacing={2.5}
            >
              <Button
                className="store-btn store-btn-light"
                variant="contained"
                component="a"
                href="https://apps.apple.com/us/developer/pred-solutions/id1889453659"
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<AppleIconDark />}
              >
                <Box className="store-copy">
                  <Typography className="store-kicker">
                    Download on the
                  </Typography>
                  <Typography className="store-label">App Store</Typography>
                </Box>
              </Button>

              <Button
                className="store-btn store-btn-light"
                variant="contained"
                component="a"
                href="https://play.google.com/store/apps/developer?id=PRED+CARE"
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<GooglePlayIconDark />}
              >
                <Box className="store-copy">
                  <Typography className="store-kicker">Get it on</Typography>
                  <Typography className="store-label">Google Play</Typography>
                </Box>
              </Button>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default AppDownloadSection;
