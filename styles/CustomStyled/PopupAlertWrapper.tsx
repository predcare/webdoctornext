'use client';

import { alpha, Box, styled } from '@mui/material';

export const PopupAlertWrapper = styled(Box)`
  --tone: ${({ theme }) => theme.palette.customColors.brandTeal};
  --tone-soft: ${({ theme }) => theme.palette.customColors.brandTealLight};
  --tone-ring: ${({ theme }) =>
    alpha(theme.palette.customColors.brandTeal, 0.22)};

  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 24px 24px;
  text-align: center;

  &.tone-success {
    --tone: ${({ theme }) => theme.palette.customColors.success};
    --tone-soft: ${({ theme }) => theme.palette.customColors.successBg};
    --tone-ring: ${({ theme }) =>
    alpha(theme.palette.customColors.success, 0.22)};
  }

  &.tone-error {
    --tone: ${({ theme }) => theme.palette.customColors.error};
    --tone-soft: ${({ theme }) => theme.palette.customColors.errorBg};
    --tone-ring: ${({ theme }) => alpha(theme.palette.customColors.error, 0.22)};
  }

  &.tone-warning {
    --tone: ${({ theme }) => theme.palette.customColors.warning};
    --tone-soft: ${({ theme }) => theme.palette.customColors.warningBg};
    --tone-ring: ${({ theme }) =>
    alpha(theme.palette.customColors.warning, 0.22)};
  }

  .popup-top-bar {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--tone);
  }

  .popup-icon-outer {
    display: grid;
    place-items: center;
    width: 72px;
    height: 72px;
    margin: 8px 0 16px;
    border-radius: 50%;
    background: var(--tone-soft);
  }

  .popup-icon-inner {
    display: grid;
    place-items: center;
    width: 52px;
    height: 52px;
    border-radius: 50%;
    color: var(--tone);
    background: var(--tone-ring);

    .MuiSvgIcon-root {
      font-size: 28px;
    }
  }

  .popup-title {
    margin: 0 0 8px;
    font-size: 20px;
    font-weight: 700;
    line-height: 1.3;
    letter-spacing: -0.3px;
    color: ${({ theme }) => theme.palette.customColors.heading};
  }

  .popup-message {
    margin: 0 0 24px;
    padding: 0 4px;
    font-size: 14.5px;
    line-height: 22px;
    color: ${({ theme }) => theme.palette.customColors.textSecondary};
    white-space: pre-line;
  }

  .popup-actions {
    display: flex;
    width: 100%;
    gap: 12px;
  }

  .popup-btn.MuiButton-root {
    flex: 1;
    min-height: 48px;
    padding: 0 20px;
    border-radius: 14px;
    font-size: 15px;
    font-weight: 700;
    text-transform: none;
    transition:
      transform 0.12s ease,
      opacity 0.12s ease,
      box-shadow 0.15s ease;

    &:active {
      transform: scale(0.985);
      opacity: 0.9;
    }
  }

  .popup-btn.cancel.MuiButton-root {
    font-weight: 600;
    color: ${({ theme }) => theme.palette.customColors.textSecondary};
    background: ${({ theme }) => theme.palette.customColors.pageBg};
    border: 1.5px solid ${({ theme }) => theme.palette.customColors.border};

    &:hover {
      background: ${({ theme }) => theme.palette.customColors.hoverBg};
    }
  }

  .popup-btn.primary.MuiButton-root {
    color: ${({ theme }) => theme.palette.common.white};
    background: var(--tone);
    box-shadow: 0 4px 12px var(--tone-ring);

    &:hover {
      background: var(--tone);
      box-shadow: 0 6px 16px var(--tone-ring);
      filter: brightness(0.95);
    }
  }
`;
