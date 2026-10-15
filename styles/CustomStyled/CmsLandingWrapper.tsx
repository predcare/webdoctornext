'use client';

import { Box, BoxProps, styled } from '@mui/material';
import { keyframes } from '@mui/material/styles';
import { createGlobalStyle } from 'styled-components';

const pulseGlow = keyframes`
  0% {
    opacity: 0.2;
    transform: translateY(-50%) scale(0.95);
  }
  100% {
    opacity: 0.35;
    transform: translateY(-50%) scale(1.05);
  }
`;

const CmsLandingRoot = styled(Box)`
  width: 100%;

  &.cms-chrome {
    height: 0;
    overflow: visible;
  }

  figure.media {
    margin: 0;
  }

  figure.media img {
    display: block;
    max-width: 100%;
    height: auto;
  }

  .cms-header.MuiAppBar-root {
    background-color: transparent;
    background-image: none;
    box-shadow: none;
    border-bottom: 1px solid transparent;
    transition: background-color 0.3s ease;
    z-index: ${({ theme }) => theme.zIndex.drawer + 1};
  }

  .cms-header.is-scrolled.MuiAppBar-root {
    background-color: #041b66;
  }

  .cms-toolbar.MuiToolbar-root {
    min-height: 64px;
    height: 64px;
    min-width: 0;
    padding: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;

    ${({ theme }) => theme.breakpoints.up('sm')} {
      min-height: 68px;
      height: 68px;
    }

    ${({ theme }) => theme.breakpoints.up('md')} {
      min-height: 76px;
      height: 76px;
      gap: 16px;
    }
  }

  .brand-logo {
    display: flex;
    flex: 0 1 auto;
    align-items: center;
    min-width: 0;
    max-width: min(148px, 46vw);
    height: 32px;
    margin: 0;
    padding: 0;
    border: 0;
    background: none;
    line-height: 0;
    cursor: pointer;
    user-select: none;

    ${({ theme }) => theme.breakpoints.up('sm')} {
      max-width: 168px;
      height: 36px;
    }

    ${({ theme }) => theme.breakpoints.up('md')} {
      max-width: 186px;
      height: 40px;
    }
  }

  .brand-logo figure.media {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: 0;
  }

  .brand-logo figure.media img {
    display: block;
    width: auto;
    height: 32px;
    max-width: 100%;
    max-height: 32px;
    object-fit: contain;
    object-position: left center;

    ${({ theme }) => theme.breakpoints.up('sm')} {
      height: 36px;
      max-height: 36px;
    }

    ${({ theme }) => theme.breakpoints.up('md')} {
      height: 40px;
      max-height: 40px;
    }
  }

  .desktop-nav.MuiStack-root,
  .desktop-actions.MuiStack-root {
    display: none;
    align-items: center;

    ${({ theme }) => theme.breakpoints.up('md')} {
      display: flex;
    }
  }

  .desktop-nav.MuiStack-root {
    flex-shrink: 1;
    gap: 18px;
    min-width: 0;

    ${({ theme }) => theme.breakpoints.up('lg')} {
      gap: 28px;
    }
  }

  .desktop-actions.MuiStack-root {
    gap: 16px;
  }

  .nav-link.MuiTypography-root {
    color: #ffffff;
    font-size: 0.9rem;
    font-weight: 400;
    text-decoration: none;
    white-space: nowrap;
    cursor: pointer;
    transition: color 0.2s ease;

    ${({ theme }) => theme.breakpoints.up('lg')} {
      font-size: 1rem;
    }
  }

  .nav-link.MuiTypography-root:hover {
    color: #93c5fd;
  }

  .login-btn.MuiButton-contained,
  .register-btn.MuiButton-contained {
    text-transform: none;
    font-size: 0.95rem;
    font-weight: 600;
    padding: 8.8px 24px;
    border-radius: 50px;
  }

  .login-btn.MuiButton-contained {
    background-color: #2563eb;
    color: #ffffff;
    box-shadow: 0 4px 14px 0 rgba(37, 99, 235, 0.39);
  }

  .login-btn.MuiButton-contained:hover {
    background-color: #1d4ed8;
  }

  .login-chevron {
    transition: transform 0.2s ease;
  }

  .login-chevron.is-open {
    transform: rotate(180deg);
  }

  .register-btn.MuiButton-contained {
    background-color: #ffffff;
    color: #1d4ed8;
    box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.1);
  }

  .register-btn.MuiButton-contained:hover {
    background-color: #eff6ff;
    color: #1e40af;
  }

  .mobile-toggle {
    display: flex;

    ${({ theme }) => theme.breakpoints.up('md')} {
      display: none;
    }
  }

  .menu-button.MuiIconButton-root {
    color: #ffffff;
  }

  .menu-button .MuiSvgIcon-root {
    font-size: 2rem;
  }

  .cms-hero {
    position: relative;
    padding: 128px 0 64px;
    color: #ffffff;
    background-image: url('https://stage.predcare.in/images/bg.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    overflow: hidden;

    ${({ theme }) => theme.breakpoints.up('sm')} {
      padding-top: 144px;
    }

    ${({ theme }) => theme.breakpoints.up('lg')} {
      padding-top: 176px;
      padding-bottom: 0;
    }
  }

  .hero-container {
    position: relative;
    z-index: 2;
  }

  .hero-grid {
    align-items: center;
  }

  .hero-copy {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;

    ${({ theme }) => theme.breakpoints.up('lg')} {
      text-align: left;
    }
  }

  .hero-title.MuiTypography-root {
    margin-bottom: 24px;
    color: #ffffff;
    font-size: 2.75rem;
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.15;

    ${({ theme }) => theme.breakpoints.up('sm')} {
      font-size: 3.5rem;
    }

    ${({ theme }) => theme.breakpoints.up('md')} {
      font-size: 4rem;
    }

    ${({ theme }) => theme.breakpoints.up('lg')} {
      font-size: 4.25rem;
      line-height: 1.1;
    }
  }

  .hero-text.MuiTypography-root {
    margin-bottom: 32px;
    color: #dbeafe;
    font-size: 1.1rem;
    line-height: 1.6;

    ${({ theme }) => theme.breakpoints.up('md')} {
      font-size: 1.2rem;
    }
  }

  .store-row.MuiStack-root {
    align-items: center;
    justify-content: center;

    ${({ theme }) => theme.breakpoints.up('lg')} {
      justify-content: flex-start;
    }
  }

  .store-btn.MuiButton-contained {
    justify-content: flex-start;
    gap: 10px;
    width: 100%;
    min-width: 190px;
    padding: 11px 24px;
    border-radius: 12px;
    text-transform: none;

    ${({ theme }) => theme.breakpoints.up('sm')} {
      width: auto;
    }
  }

  .store-btn .MuiButton-startIcon {
    margin: 0;
  }

  .store-btn-dark.MuiButton-contained {
    border: 1px solid #374151;
    background-color: #000000;
    color: #ffffff;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.4);
  }

  .store-btn-dark.MuiButton-contained:hover {
    background-color: #111827;
  }

  .store-btn-light.MuiButton-contained {
    background-color: #ffffff;
    color: #0f172a;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
  }

  .store-btn-light.MuiButton-contained:hover {
    background-color: #f1f5f9;
  }

  .store-copy {
    line-height: 1;
    text-align: left;
  }

  .store-kicker.MuiTypography-root {
    color: #9ca3af;
    font-size: 0.68rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .store-btn-light .store-kicker.MuiTypography-root {
    color: #64748b;
    font-weight: 600;
    font-size: 0.65rem;
  }

  .store-label.MuiTypography-root {
    margin-top: 2px;
    color: #ffffff;
    font-size: 1.2rem;
    font-weight: 600;
  }

  .store-btn-light .store-label.MuiTypography-root {
    color: #0f172a;
    font-size: 1.15rem;
  }

  .hero-visual {
    position: relative;
    display: flex;
    justify-content: center;
    margin-top: 32px;

    ${({ theme }) => theme.breakpoints.up('lg')} {
      justify-content: flex-end;
      margin-top: 0;
    }
  }

  .hero-glow {
    position: absolute;
    top: 50%;
    right: 10%;
    z-index: 1;
    width: 260px;
    height: 260px;
    border-radius: 50%;
    background: linear-gradient(to bottom right, #60a5fa, #a855f7);
    opacity: 0.25;
    filter: blur(48px);
    animation: ${pulseGlow} 4s ease-in-out infinite alternate;

    ${({ theme }) => theme.breakpoints.up('md')} {
      width: 320px;
      height: 320px;
    }

    ${({ theme }) => theme.breakpoints.up('lg')} {
      right: 0;
    }
  }

  .hero-phone {
    position: relative;
    z-index: 2;
    transition: transform 0.5s ease;
  }

  .hero-phone:hover {
    transform: scale(1.03);
  }

  .hero-phone img {
    width: 100%;
    max-width: 360px;
    height: auto;
    filter: drop-shadow(0 25px 25px rgba(0, 0, 0, 0.45));

    ${({ theme }) => theme.breakpoints.up('sm')} {
      max-width: 440px;
    }

    ${({ theme }) => theme.breakpoints.up('lg')} {
      max-width: 500px;
    }
  }

  .cms-features {
    padding: 80px 0;
    background-color: #f8fafc;

    ${({ theme }) => theme.breakpoints.up('md')} {
      padding: 112px 0;
    }
  }

  .section-heading {
    margin-bottom: 56px;
    text-align: center;

    ${({ theme }) => theme.breakpoints.up('md')} {
      margin-bottom: 72px;
    }
  }

  .section-heading-compact {
    margin-bottom: 48px;

    ${({ theme }) => theme.breakpoints.up('md')} {
      margin-bottom: 64px;
    }
  }

  .section-eyebrow.MuiTypography-root {
    display: block;
    margin-bottom: 8px;
    font-size: 0.875rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .section-eyebrow-accent.MuiTypography-root {
    color: #2563eb;
  }

  .section-eyebrow-muted.MuiTypography-root {
    color: #475569;
    letter-spacing: 0.15em;
  }

  .section-title.MuiTypography-root {
    margin-bottom: 16px;
    color: #0f172a;
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: -0.02em;

    ${({ theme }) => theme.breakpoints.up('sm')} {
      font-size: 2.5rem;
    }

    ${({ theme }) => theme.breakpoints.up('md')} {
      font-size: 3rem;
    }
  }

  .section-lead.MuiTypography-root {
    max-width: 640px;
    margin: 0 auto;
    color: #64748b;
    font-size: 1rem;
    line-height: 1.6;

    ${({ theme }) => theme.breakpoints.up('md')} {
      font-size: 1.125rem;
    }
  }

  .feature-grid {
    margin-bottom: 56px;

    ${({ theme }) => theme.breakpoints.up('md')} {
      margin-bottom: 72px;
    }
  }

  .feature-card.MuiCard-root,
  .contact-card.MuiCard-root {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    border: 1px solid rgba(59, 130, 246, 0.12);
    border-radius: 20px;
    box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04);
    text-align: center;
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
  }

  .feature-card.MuiCard-root {
    padding: 24px;
    background-color: #ffffff;

    ${({ theme }) => theme.breakpoints.up('sm')} {
      padding: 32px;
    }
  }

  .feature-card.MuiCard-root:hover,
  .contact-card.MuiCard-root:hover {
    transform: translateY(-6px);
    box-shadow: 0 14px 28px -4px rgba(37, 99, 235, 0.12);
  }

  .feature-card .MuiCardContent-root,
  .contact-card .MuiCardContent-root {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 0;
  }

  .feature-card .MuiCardContent-root:last-child,
  .contact-card .MuiCardContent-root:last-child {
    padding-bottom: 0;
  }

  .feature-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    margin-bottom: 24px;
  }

  .feature-icon img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  .feature-title.MuiTypography-root,
  .contact-title.MuiTypography-root,
  .queue-point-title.MuiTypography-root {
    color: #0f172a;
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1.35;
  }

  .feature-title.MuiTypography-root {
    margin-bottom: 12px;
  }

  .feature-text.MuiTypography-root,
  .contact-text.MuiTypography-root {
    color: #64748b;
    font-size: 0.95rem;
    line-height: 1.6;
  }

  .features-cta {
    display: flex;
    justify-content: center;
  }

  .register-cta.MuiButton-contained {
    border-radius: 50px;
    background-color: #2563eb;
    color: #ffffff;
    padding: 14px 32px;
    font-size: 1.05rem;
    font-weight: 600;
    text-transform: none;
    box-shadow: 0 10px 25px -3px rgba(37, 99, 235, 0.4);
    transition: all 0.3s ease;

    ${({ theme }) => theme.breakpoints.up('md')} {
      padding: 16px 48px;
      font-size: 1.2rem;
    }
  }

  .register-cta.MuiButton-contained:hover {
    background-color: #1d4ed8;
    box-shadow: 0 15px 30px -3px rgba(37, 99, 235, 0.5);
    transform: translateY(-3px);
  }

  .cms-queue {
    overflow: hidden;
    padding: 80px 0;
    background-color: #ffffff;

    ${({ theme }) => theme.breakpoints.up('md')} {
      padding: 112px 0;
    }
  }

  .queue-title.MuiTypography-root {
    margin-bottom: 12px;
  }

  .queue-grid {
    align-items: center;
  }

  .queue-headline.MuiTypography-root {
    margin-bottom: 16px;
    color: #0f172a;
    font-size: 1.75rem;
    font-weight: 700;
    line-height: 1.25;

    ${({ theme }) => theme.breakpoints.up('sm')} {
      font-size: 2.25rem;
    }

    ${({ theme }) => theme.breakpoints.up('md')} {
      font-size: 2.5rem;
    }
  }

  .queue-intro.MuiTypography-root {
    margin-bottom: 40px;
    color: #64748b;
    font-size: 1.05rem;
    line-height: 1.6;
  }

  .queue-points.MuiStack-root {
    gap: 32px;
  }

  .queue-point {
    display: flex;
    align-items: flex-start;
    gap: 20px;
  }

  .queue-point-icon {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    color: #2563eb;
  }

  .queue-point-icon .MuiSvgIcon-root {
    font-size: 48px;
  }

  .queue-point-title.MuiTypography-root {
    margin-bottom: 6px;
  }

  .queue-point-text.MuiTypography-root {
    color: #64748b;
    font-size: 1rem;
    line-height: 1.6;
  }

  .queue-visual {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .queue-figure {
    overflow: hidden;
    border-radius: 24px;
    box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.25);
    transition: transform 0.4s ease;
  }

  .queue-figure:hover {
    transform: scale(1.02);
  }

  .queue-figure img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  .cms-download {
    padding: 64px 16px;
    background-color: #ffffff;

    ${({ theme }) => theme.breakpoints.up('md')} {
      padding: 80px 16px;
    }
  }

  .download-card {
    position: relative;
    overflow: hidden;
    border-radius: 28px;
    background-color: #041b66;
    padding: 64px 24px;
    text-align: center;
    box-shadow: 0 25px 50px -12px rgba(4, 27, 102, 0.4);

    ${({ theme }) => theme.breakpoints.up('sm')} {
      padding-right: 48px;
      padding-left: 48px;
    }

    ${({ theme }) => theme.breakpoints.up('md')} {
      padding-top: 72px;
      padding-bottom: 72px;
    }
  }

  .download-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at top,
      rgba(255, 255, 255, 0.16),
      transparent 55%
    );
    pointer-events: none;
  }

  .download-content {
    position: relative;
    z-index: 1;
  }

  .download-chip.MuiChip-filled {
    height: 28px;
    margin-bottom: 24px;
    border: 1px solid #1d4ed8;
    background-color: #1e40af;
    color: #bfdbfe;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.08em;
  }

  .download-title.MuiTypography-root {
    margin-bottom: 16px;
    color: #ffffff;
    font-size: 1.85rem;
    font-weight: 600;

    ${({ theme }) => theme.breakpoints.up('sm')} {
      font-size: 2.25rem;
    }

    ${({ theme }) => theme.breakpoints.up('md')} {
      font-size: 2.5rem;
    }
  }

  .download-text.MuiTypography-root {
    max-width: 550px;
    margin: 0 auto 40px;
    color: #bfdbfe;
    font-size: 1rem;
    line-height: 1.6;

    ${({ theme }) => theme.breakpoints.up('md')} {
      font-size: 1.1rem;
    }
  }

  .download-actions.MuiStack-root {
    align-items: center;
    justify-content: center;
  }

  .cms-contact {
    padding: 80px 0 64px;
    background-color: #ffffff;

    ${({ theme }) => theme.breakpoints.up('md')} {
      padding: 112px 0 96px;
    }
  }

  .contact-title-main.MuiTypography-root {
    margin-bottom: 12px;
  }

  .contact-card.MuiCard-root {
    padding: 28px;
    background-color: #f8fafc;

    ${({ theme }) => theme.breakpoints.up('sm')} {
      padding: 36px;
    }
  }

  .contact-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    margin-bottom: 20px;
    border-radius: 16px;
    background-color: #eff6ff;
    color: #2563eb;
  }

  .contact-icon .MuiSvgIcon-root {
    font-size: 28px;
  }

  .contact-title.MuiTypography-root {
    margin-bottom: 8px;
  }

  .contact-text.MuiTypography-root {
    margin-bottom: 12px;
  }

  .contact-card .contact-text-last.MuiTypography-root {
    margin-bottom: 0;
  }

  .contact-link.MuiLink-root {
    color: #2563eb;
    font-size: 1.05rem;
    font-weight: 600;
    transition: color 0.2s ease;
  }

  .contact-link.MuiLink-root:hover {
    color: #1d4ed8;
  }

  &.cms-footer {
    border-top: 1px solid #0a2f8f;
    background-color: #041b66;
    padding: 64px 0 40px;
    color: #ffffff;

    ${({ theme }) => theme.breakpoints.up('md')} {
      padding-top: 80px;
    }
  }

  .footer-grid {
    margin-bottom: 48px;
  }

  .footer-brand {
    margin-bottom: 20px;
  }

  .footer-brand img {
    height: 40px;
    width: auto;
    object-fit: contain;
  }

  .footer-mission.MuiTypography-root {
    max-width: 320px;
    color: #dbeafe;
    font-size: 0.95rem;
    line-height: 1.7;
  }

  .footer-title.MuiTypography-root {
    margin-bottom: 20px;
    color: #ffffff;
    font-size: 1rem;
    font-weight: 600;
  }

  .footer-download-title.MuiTypography-root {
    margin-bottom: 8px;
  }

  .footer-note.MuiTypography-root {
    margin-bottom: 20px;
    color: #dbeafe;
    font-size: 0.875rem;
  }

  .footer-links.MuiStack-root {
    align-items: flex-start;
    gap: 12px;
  }

  .footer-link.MuiLink-root {
    color: #bfdbfe;
    font-size: 0.95rem;
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .footer-link.MuiLink-root:hover {
    color: #ffffff;
  }

  .store-badge {
    display: inline-block;
    transition: opacity 0.2s ease;
  }

  .store-badge:hover {
    opacity: 0.85;
  }

  .store-badge img {
    width: 160px;
  }

  .store-badge-play {
    margin-left: -10px;
  }

  .store-badge-play img {
    width: 180px;
  }

  .footer-bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    border-top: 1px solid #0a2f8f;
    padding-top: 32px;

    ${({ theme }) => theme.breakpoints.up('sm')} {
      flex-direction: row;
    }
  }

  .footer-copy.MuiTypography-root {
    color: #bfdbfe;
    font-size: 0.875rem;
    text-align: center;

    ${({ theme }) => theme.breakpoints.up('sm')} {
      text-align: left;
    }
  }

  .social-row.MuiStack-root {
    align-items: center;
  }

  .social-link.MuiIconButton-root {
    color: #bfdbfe;
    padding: 8px;
  }

  .social-link.MuiIconButton-root:hover {
    background-color: rgba(255, 255, 255, 0.08);
    color: #ffffff;
  }

  .social-link .MuiSvgIcon-root {
    font-size: 22px;
  }
`;

const CmsPortalStyles = createGlobalStyle`
  .cms-drawer-paper {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 360px;
    padding: 24px;
    background-color: #041b66;
    color: #ffffff;
  }

  .drawer-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 32px;
  }

  .drawer-logo {
    display: flex;
    align-items: center;
    max-width: 150px;
    height: 32px;
    margin: 0;
  }

  .drawer-logo img {
    display: block;
    width: auto;
    height: 32px;
    max-width: 150px;
    max-height: 32px;
    object-fit: contain;
    object-position: left center;
  }

  .drawer-close.MuiIconButton-root {
    color: #ffffff;
  }

  .drawer-close .MuiSvgIcon-root {
    font-size: 1.75rem;
  }

  .drawer-links {
    margin-bottom: 32px;
  }

  .drawer-link.MuiTypography-root {
    display: block;
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
    padding: 8px 0;
    color: #ffffff;
    font-size: 1.2rem;
    font-weight: 500;
    text-decoration: none;
  }

  .drawer-link.MuiTypography-root:hover {
    color: #93c5fd;
  }

  .drawer-auth {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: auto;
  }

  .drawer-kicker.MuiTypography-root {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
    font-weight: 600;
  }

  .drawer-login.MuiButton-outlined,
  .drawer-register.MuiButton-contained {
    border-radius: 12px;
    padding: 12px 16px;
    font-size: 1rem;
    font-weight: 600;
    text-transform: none;
  }

  .drawer-login.MuiButton-outlined {
    border-color: #ffffff;
    color: #ffffff;
  }

  .drawer-login.MuiButton-outlined:hover {
    border-color: #ffffff;
    background-color: rgba(255, 255, 255, 0.1);
  }

  .drawer-register.MuiButton-contained {
    background-color: #ffffff;
    color: #041b66;
    font-weight: 700;
  }

  .drawer-register.MuiButton-contained:hover {
    background-color: #eff6ff;
  }

  .login-menu-paper {
    min-width: 220px;
    margin-top: 12px;
    border-radius: 16px;
    padding: 4px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
  }

  .login-menu-item {
    display: flex;
    align-items: center;
    gap: 12px;
    border-radius: 10px;
    padding: 12px 16px;
    color: #1e293b;
    font-weight: 500;
  }

  .login-menu-item:hover {
    background-color: #eff6ff;
    color: #2563eb;
  }

  .login-menu-item .MuiSvgIcon-root {
    color: #2563eb;
  }

  .cms-modal-paper {
    position: relative;
    border-radius: 28px;
    background-color: #ffffff;
    padding: 20px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }

  @media (min-width: 600px) {
    .cms-modal-paper {
      padding: 32px;
    }
  }

  .cms-modal-paper .MuiDialogContent-root {
    padding: 0;
  }

  .modal-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  .modal-back.MuiButton-text {
    color: #64748b;
    font-size: 0.95rem;
    font-weight: 600;
    text-transform: none;
  }

  .modal-back.MuiButton-text:hover {
    background-color: transparent;
    color: #2563eb;
  }

  .modal-close {
    color: #64748b;
  }

  .modal-header {
    margin-bottom: 32px;
    text-align: center;
  }

  .modal-logo img {
    height: 44px;
    width: auto;
    margin: 0 auto 20px;
    object-fit: contain;
  }

  .modal-title.MuiTypography-root {
    margin-bottom: 8px;
    color: #0f172a;
    font-size: 1.75rem;
    font-weight: 700;
  }

  @media (min-width: 600px) {
    .modal-title.MuiTypography-root {
      font-size: 2rem;
    }
  }

  .modal-subtitle.MuiTypography-root {
    color: #64748b;
    font-size: 0.95rem;
  }

  .modal-fields {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .modal-field .MuiOutlinedInput-root {
    border-radius: 14px;
    background-color: #f8fafc;
  }

  .modal-field .MuiSvgIcon-root {
    color: #94a3b8;
  }

  .cms-modal-paper .MuiCheckbox-root {
    color: #94a3b8;
  }

  .cms-modal-paper .MuiCheckbox-root.Mui-checked {
    color: #2563eb;
  }

  .modal-terms.MuiTypography-root {
    color: #1e293b;
    font-size: 0.875rem;
  }

  .modal-link.MuiLink-root {
    color: #2563eb;
    font-weight: 600;
    text-decoration: none;
  }

  .modal-submit.MuiButton-contained {
    border-radius: 14px;
    background-color: #2563eb;
    color: #ffffff;
    padding: 12.8px 16px;
    font-size: 1.05rem;
    font-weight: 600;
    text-transform: none;
    box-shadow: 0 10px 20px -3px rgba(37, 99, 235, 0.4);
  }

  .modal-submit.MuiButton-contained:hover {
    background-color: #1d4ed8;
    transform: translateY(-1px);
  }
`;

interface CmsLandingWrapperProps extends BoxProps {
  withPortals?: boolean;
}

export const CmsLandingWrapper = ({
  withPortals = false,
  children,
  ...props
}: CmsLandingWrapperProps) => {
  return (
    <CmsLandingRoot {...props}>
      {withPortals ? <CmsPortalStyles /> : null}
      {children}
    </CmsLandingRoot>
  );
};
