'use client';

import { alpha, Box, keyframes, styled } from '@mui/material';

const pulse = keyframes`
  0%, 100% {
    transform: scale(0.94);
    opacity: 0.45;
  }
  50% {
    transform: scale(1.08);
    opacity: 0.9;
  }
`;

export const ProjectThemeLoaderWrapper = styled(Box)`
  position: fixed;
  inset: 0;
  z-index: 1400;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => alpha(theme.palette.customColors.pageBg, 0.72)};
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);

  .loader-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
    max-width: 280px;
    padding: 0 24px;
  }

  .loader-brand {
    position: relative;
    display: grid;
    place-items: center;
    width: 88px;
    height: 88px;
  }

  .loader-glow {
    position: absolute;
    inset: -14px;
    z-index: 0;
    border-radius: 32px;
    background: radial-gradient(
      circle,
      ${({ theme }) => theme.palette.customColors.brandTealGlow} 0%,
      transparent 70%
    );
    animation: ${pulse} 2.4s ease-in-out infinite;
    pointer-events: none;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }

  .loader-logo-tile {
    position: relative;
    z-index: 1;
    display: grid;
    place-items: center;
    width: 88px;
    height: 88px;
    border-radius: 24px;
    background: ${({ theme }) => theme.palette.customColors.cardBg};
    border: 1px solid
      ${({ theme }) => alpha(theme.palette.customColors.brandTeal, 0.18)};
    box-shadow: 0 10px 30px
      ${({ theme }) => alpha(theme.palette.customColors.brandTeal, 0.16)};
  }

  .loader-logo {
    width: 60px;
    height: 60px;
    object-fit: contain;
  }

  .loader-progress {
    position: relative;
    display: grid;
    place-items: center;
    width: 30px;
    height: 30px;
  }

  .loader-progress-track {
    position: absolute;
    color: ${({ theme }) => alpha(theme.palette.customColors.brandTeal, 0.14)};
  }

  .loader-progress-spinner {
    color: ${({ theme }) => theme.palette.customColors.brandTeal};

    .MuiCircularProgress-circle {
      stroke-linecap: round;
    }
  }

  .loader-message {
    margin-top: -4px;
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.7;
    letter-spacing: 0.01em;
    overflow-wrap: anywhere;
    color: ${({ theme }) => theme.palette.customColors.textSecondary};
  }
`;
