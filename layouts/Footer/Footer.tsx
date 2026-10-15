'use client';

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import {
  Box,
  Container,
  Grid,
  IconButton,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';

// X (Twitter) Vector Icon
const XTwitterIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const SOLUTIONS_LINKS = [
  { label: 'Clinic Management', href: '#' },
  { label: 'Queue Management', href: '#' },
  { label: 'Website & Promotions', href: '#' },
];

const COMPANY_LINKS = [
  { label: 'About Us', href: 'https://stage.predcare.in#about' },
  { label: 'Contact', href: 'https://stage.predcare.in#contact' },
  {
    label: 'Privacy Policy',
    href: 'https://stage.predcare.in/privacy-policy.html',
  },
  {
    label: 'Terms & Conditions',
    href: 'https://stage.predcare.in/terms.html',
  },
  {
    label: 'Informed Consent',
    href: 'https://stage.predcare.in/informed-consent.html',
  },
  {
    label: 'Cancellation & Refund Policy',
    href: 'https://stage.predcare.in/privacy-policy.html',
  },
];

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#041B66',
        borderTop: '1px solid #0A2F8F',
        pt: { xs: 8, md: 10 },
        pb: 5,
        color: '#FFFFFF',
      }}
    >
      <Container maxWidth="lg">
        {/* Main 4-Column Footer Grid */}
        <Grid container spacing={{ xs: 5, md: 6 }} sx={{ mb: 6 }}>
          {/* Column 1: Logo & Mission Statement */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ mb: 2.5 }}>
              <Box
                component="img"
                src="https://stage.predcare.in/images/pred-care-logo.png"
                alt="PRED Care Logo"
                sx={{
                  height: 40,
                  width: 'auto',
                  objectFit: 'contain',
                }}
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  e.currentTarget.src =
                    'https://placehold.co/150x50/transparent/white?text=PRED+CARE';
                }}
              />
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: '#DBEAFE', // blue-100
                fontSize: '0.95rem',
                lineHeight: 1.7,
                maxWidth: 320,
              }}
            >
              Empowering healthcare providers with next-generation technology to
              deliver better patient care.
            </Typography>
          </Grid>

          {/* Column 2: Solutions */}
          <Grid size={{ xs: 6, sm: 4, md: 2.5 }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                color: '#FFFFFF',
                fontSize: '1rem',
                mb: 2.5,
              }}
            >
              Solutions
            </Typography>
            <Stack spacing={1.5}>
              {SOLUTIONS_LINKS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  underline="none"
                  sx={{
                    color: '#BFDBFE', // blue-200
                    fontSize: '0.95rem',
                    transition: 'color 0.2s ease',
                    '&:hover': {
                      color: '#FFFFFF',
                    },
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Column 3: Company */}
          <Grid size={{ xs: 6, sm: 4, md: 2.5 }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                color: '#FFFFFF',
                fontSize: '1rem',
                mb: 2.5,
              }}
            >
              Company
            </Typography>
            <Stack spacing={1.5}>
              {COMPANY_LINKS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  underline="none"
                  target={item.href.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  sx={{
                    color: '#BFDBFE',
                    fontSize: '0.95rem',
                    transition: 'color 0.2s ease',
                    '&:hover': {
                      color: '#FFFFFF',
                    },
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Column 4: Download App Badges */}
          <Grid size={{ xs: 12, sm: 4, md: 3 }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                color: '#FFFFFF',
                fontSize: '1rem',
                mb: 1,
              }}
            >
              Download App
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#DBEAFE',
                fontSize: '0.875rem',
                mb: 2.5,
              }}
            >
              Get the app for iOS and Android
            </Typography>
            <Stack spacing={1.5} sx={{ alignItems: 'flex-start' }}>
              {/* Apple App Store */}
              <Box
                component="a"
                href="https://apps.apple.com/us/developer/pred-solutions/id1889453659"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'inline-block',
                  transition: 'opacity 0.2s',
                  '&:hover': { opacity: 0.85 },
                }}
              >
                <Box
                  component="img"
                  src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83"
                  alt="Download on the App Store"
                  sx={{ width: 160, height: 'auto', display: 'block' }}
                />
              </Box>

              {/* Google Play Store */}
              <Box
                component="a"
                href="https://play.google.com/store/apps/developer?id=PRED+CARE"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'inline-block',
                  ml: '-10px',
                  transition: 'opacity 0.2s',
                  '&:hover': { opacity: 0.85 },
                }}
              >
                <Box
                  component="img"
                  src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                  alt="Get it on Google Play"
                  sx={{ width: 180, height: 'auto', display: 'block' }}
                />
              </Box>
            </Stack>
          </Grid>
        </Grid>

        {/* Bottom Bar: Copyright & Social Links */}
        <Box
          sx={{
            borderTop: '1px solid #0A2F8F',
            pt: 4,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: '#BFDBFE',
              fontSize: '0.875rem',
              textAlign: { xs: 'center', sm: 'left' },
            }}
          >
            © 2026 PRED Solutions. All rights reserved.
          </Typography>

          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <IconButton
              component="a"
              href="https://x.com/PredCare"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X Twitter"
              sx={{
                color: '#BFDBFE',
                p: 1,
                '&:hover': {
                  color: '#FFFFFF',
                  bgcolor: 'rgba(255,255,255,0.08)',
                },
              }}
            >
              <XTwitterIcon />
            </IconButton>

            <IconButton
              component="a"
              href="https://www.youtube.com/@PREDCARE"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              sx={{
                color: '#BFDBFE',
                p: 1,
                '&:hover': {
                  color: '#FFFFFF',
                  bgcolor: 'rgba(255,255,255,0.08)',
                },
              }}
            >
              <YouTubeIcon sx={{ fontSize: 22 }} />
            </IconButton>

            <IconButton
              component="a"
              href="https://www.facebook.com/profile.php?id=61580060363697"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              sx={{
                color: '#BFDBFE',
                p: 1,
                '&:hover': {
                  color: '#FFFFFF',
                  bgcolor: 'rgba(255,255,255,0.08)',
                },
              }}
            >
              <FacebookIcon sx={{ fontSize: 22 }} />
            </IconButton>

            <IconButton
              component="a"
              href="https://www.instagram.com/predcare/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              sx={{
                color: '#BFDBFE',
                p: 1,
                '&:hover': {
                  color: '#FFFFFF',
                  bgcolor: 'rgba(255,255,255,0.08)',
                },
              }}
            >
              <InstagramIcon sx={{ fontSize: 22 }} />
            </IconButton>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
