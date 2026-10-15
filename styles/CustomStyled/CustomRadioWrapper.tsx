'use client';

import { Box, styled } from '@mui/material';

export const CustomRadioWrapper = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  min-width: 0;

  &.is-segmented {
    width: fit-content;
    max-width: 100%;
    padding: 4px;
    border-radius: 12px;
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
    background: ${({ theme }) => theme.palette.customColors.pageBg};
    gap: 4px;
  }

  &.is-choice {
    gap: 4px 18px;
  }

  .radio-option {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin: 0;
    cursor: pointer;
    user-select: none;
  }

  .radio-option input {
    margin: 0;
    cursor: pointer;
  }

  .radio-option.is-disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &.is-segmented .radio-option {
    min-height: 36px;
    padding: 6px 14px;
    border-radius: 9px;
    color: ${({ theme }) => theme.palette.customColors.textSecondary};
    font-size: 13px;
    font-weight: 600;
    line-height: 18px;
    transition: background-color 0.15s ease, color 0.15s ease, box-shadow 0.15s ease;

    input {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
    }

    .MuiSvgIcon-root {
      font-size: 16px;
    }

    &:hover {
      color: ${({ theme }) => theme.palette.customColors.heading};
      background: ${({ theme }) => theme.palette.customColors.cardBg};
    }

    &:has(input:checked) {
      color: ${({ theme }) => theme.palette.common.white};
      background: ${({ theme }) => theme.palette.customColors.brandTeal};
      box-shadow: 0 4px 12px ${({ theme }) => theme.palette.customColors.brandTealGlow};
    }

    &:has(input:focus-visible) {
      box-shadow: 0 0 0 3px ${({ theme }) => theme.palette.customColors.brandTealLight};
    }
  }

  &.is-choice .radio-option {
    min-height: 36px;
    color: ${({ theme }) => theme.palette.customColors.heading};
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;

    input {
      appearance: none;
      width: 18px;
      height: 18px;
      flex-shrink: 0;
      border-radius: 50%;
      border: 2px solid ${({ theme }) => theme.palette.customColors.inputBorder};
      background: ${({ theme }) => theme.palette.customColors.cardBg};
      display: grid;
      place-content: center;
    }

    input::before {
      content: '';
      width: 8px;
      height: 8px;
      border-radius: 50%;
      transform: scale(0);
      background: ${({ theme }) => theme.palette.common.white};
      transition: transform 0.15s ease;
    }

    input:checked {
      border-color: ${({ theme }) => theme.palette.customColors.brandTeal};
      background: ${({ theme }) => theme.palette.customColors.brandTeal};
    }

    input:checked::before {
      transform: scale(1);
    }

    input:focus-visible {
      outline: 2px solid ${({ theme }) => theme.palette.customColors.brandTeal};
      outline-offset: 2px;
    }
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    &.is-segmented {
      width: 100%;
    }

    &.is-segmented .radio-option {
      flex: 1 1 calc(50% - 4px);
    }
  }
`;
