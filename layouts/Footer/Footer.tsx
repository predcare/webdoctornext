'use client';
/* eslint-disable @next/next/no-img-element -- landing images stay native img tags inside figure */

import { CmsLandingWrapper } from '@/styles/CustomStyled/CmsLandingWrapper';
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

const LIGHT_LOGO = 'https://stage.predcare.in/images/pred-care-logo.png';

const Footer = () => {
  const handleLogoError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src =
      'https://placehold.co/150x50/transparent/white?text=PRED+CARE';
  };

  return (
    <CmsLandingWrapper className="cms-footer" component="footer">
      <Container maxWidth="lg">
        <Grid className="footer-grid" container spacing={{ xs: 5, md: 6 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <figure className="media footer-brand">
              <img
                src={LIGHT_LOGO}
                alt="PRED Care Logo"
                onError={handleLogoError}
              />
            </figure>
            <Typography className="footer-mission" variant="body2">
              Empowering healthcare providers with next-generation technology to
              deliver better patient care.
            </Typography>
          </Grid>

          <Grid size={{ xs: 6, sm: 4, md: 2.5 }}>
            <Typography
              className="footer-title"
              variant="subtitle1"
              component="p"
            >
              Solutions
            </Typography>
            <Stack className="footer-links">
              {SOLUTIONS_LINKS.map((item) => (
                <Link key={item.label} className="footer-link" href={item.href}>
                  {item.label}
                </Link>
              ))}
            </Stack>
          </Grid>

          <Grid size={{ xs: 6, sm: 4, md: 2.5 }}>
            <Typography
              className="footer-title"
              variant="subtitle1"
              component="p"
            >
              Company
            </Typography>
            <Stack className="footer-links">
              {COMPANY_LINKS.map((item) => (
                <Link
                  key={item.label}
                  className="footer-link"
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={
                    item.href.startsWith('http')
                      ? 'noopener noreferrer'
                      : undefined
                  }
                >
                  {item.label}
                </Link>
              ))}
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 4, md: 3 }}>
            <Typography
              className="footer-title footer-download-title"
              variant="subtitle1"
              component="p"
            >
              Download App
            </Typography>
            <Typography className="footer-note" variant="body2">
              Get the app for iOS and Android
            </Typography>
            <Stack className="footer-links">
              <a
                className="store-badge"
                href="https://apps.apple.com/us/developer/pred-solutions/id1889453659"
                target="_blank"
                rel="noopener noreferrer"
              >
                <figure className="media">
                  <img
                    src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83"
                    alt="Download on the App Store"
                  />
                </figure>
              </a>

              <a
                className="store-badge store-badge-play"
                href="https://play.google.com/store/apps/developer?id=PRED+CARE"
                target="_blank"
                rel="noopener noreferrer"
              >
                <figure className="media">
                  <img
                    src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                    alt="Get it on Google Play"
                  />
                </figure>
              </a>
            </Stack>
          </Grid>
        </Grid>

        <Box className="footer-bottom">
          <Typography className="footer-copy" variant="body2">
            © 2026 PRED Solutions. All rights reserved.
          </Typography>

          <Stack className="social-row" direction="row" spacing={2}>
            <IconButton
              className="social-link"
              component="a"
              href="https://x.com/PredCare"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X Twitter"
            >
              <XTwitterIcon />
            </IconButton>

            <IconButton
              className="social-link"
              component="a"
              href="https://www.youtube.com/@PREDCARE"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <YouTubeIcon />
            </IconButton>

            <IconButton
              className="social-link"
              component="a"
              href="https://www.facebook.com/profile.php?id=61580060363697"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FacebookIcon />
            </IconButton>

            <IconButton
              className="social-link"
              component="a"
              href="https://www.instagram.com/predcare/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </IconButton>
          </Stack>
        </Box>
      </Container>
    </CmsLandingWrapper>
  );
};

export default Footer;
