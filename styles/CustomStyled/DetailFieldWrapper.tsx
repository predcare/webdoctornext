'use client';

import { Box, styled } from '@mui/material';

export const DetailFieldWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;

  .detail-label {
    margin: 0;
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
  }

  .detail-value {
    display: flex;
    align-items: center;
    gap: 6px;
    min-width: 0;
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    color: ${({ theme }) => theme.palette.customColors.heading};
    overflow-wrap: anywhere;
  }

  .detail-icon {
    display: inline-flex;
    flex-shrink: 0;
    color: ${({ theme }) => theme.palette.customColors.brandTeal};
  }

  &.tile {
    height: 100%;
    gap: 8px;
    padding: 14px 16px;
    border-radius: 12px;
    background: ${({ theme }) => theme.palette.customColors.inputBg};
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
    transition: border-color 0.2s ease;

    &:hover {
      border-color: ${({ theme }) => theme.palette.customColors.inputBorder};
    }

    .detail-value {
      min-height: 26px;
    }
  }

  &.caps .detail-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
`;
