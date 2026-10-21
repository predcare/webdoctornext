'use client';

import { Box, styled } from '@mui/material';

export const NetworkStatusWrapper = styled(Box)`
  .network-banner {
    position: fixed;
    top: 16px;
    left: 50%;
    z-index: 1600;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    width: min(420px, calc(100vw - 32px));
    padding: 12px 14px;
    border-radius: 16px;
    color: #ffffff;
    transform: translateX(-50%);
    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.16);
  }

  .network-banner.is-offline {
    background: ${({ theme }) => theme.palette.customColors.error};
  }

  .network-banner.is-online {
    background: ${({ theme }) => theme.palette.customColors.success};
  }

  .banner-copy {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .banner-title {
    font-size: 14px;
    font-weight: 700;
    line-height: 1.3;
  }

  .banner-subtitle {
    font-size: 12px;
    line-height: 1.4;
    opacity: 0.92;
  }

  .network-blocker {
    position: fixed;
    inset: 0;
    z-index: 1700;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 24px;
    padding: 24px;
    background: ${({ theme }) => theme.palette.customColors.pageBg};
  }

  .blocker-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    width: min(440px, 100%);
    padding: 32px 24px;
    text-align: center;
    background: ${({ theme }) => theme.palette.customColors.cardBg};
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
    border-radius: 16px;
    box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
  }

  .blocker-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 72px;
    height: 72px;
    border-radius: 50%;
    color: #ffffff;
    background: ${({ theme }) => theme.palette.customColors.error};
  }

  .blocker-badge {
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 700;
    color: ${({ theme }) => theme.palette.customColors.error};
    background: ${({ theme }) => theme.palette.customColors.errorBg};
  }

  .blocker-title {
    margin: 0;
    color: ${({ theme }) => theme.palette.customColors.heading};
    font-size: 22px;
    font-weight: 700;
  }

  .blocker-description {
    margin: 0;
    max-width: 360px;
    color: ${({ theme }) => theme.palette.customColors.textSecondary};
    font-size: 14px;
    line-height: 1.5;
  }

  .blocker-actions {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: min(440px, 100%);
  }

  .retry-button,
  .leave-button {
    width: 100%;
    height: 44px;
    border: 0;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
  }

  .retry-button {
    color: #ffffff;
    background: ${({ theme }) => theme.palette.customColors.brandTeal};
  }

  .retry-button:disabled {
    cursor: default;
    opacity: 0.7;
  }

  .leave-button {
    color: ${({ theme }) => theme.palette.customColors.heading};
    background: ${({ theme }) => theme.palette.customColors.cardBg};
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
  }
`;
