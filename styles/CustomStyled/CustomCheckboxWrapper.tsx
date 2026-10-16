'use client';

import { Box, styled } from '@mui/material';

export const CustomCheckboxWrapper = styled(Box)`
  display: inline-flex;
  align-items: flex-start;
  gap: 10px;
  margin: 0;
  cursor: pointer;
  user-select: none;

  &.is-disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }

  &.is-card {
    width: 100%;
    gap: 12px;
    padding: 12px;
    border-radius: 12px;
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
    background: ${({ theme }) => theme.palette.customColors.cardBg};
    transition:
      border-color 0.15s ease,
      background-color 0.15s ease;

    &.is-checked {
      border-color: ${({ theme }) => theme.palette.primary.main};
      background: ${({ theme }) => theme.palette.customColors.brandTealLight};
    }
  }

  .checkbox-control {
    position: relative;
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    margin-top: 1px;
  }

  .checkbox-control.is-small {
    width: 18px;
    height: 18px;
  }

  .checkbox-input {
    position: absolute;
    inset: 0;
    margin: 0;
    opacity: 0;
    cursor: inherit;
  }

  .checkbox-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-radius: 6px;
    border: 1.5px solid ${({ theme }) => theme.palette.customColors.inputBorder};
    background: ${({ theme }) => theme.palette.customColors.inputBg};
    color: #fff;
    transition:
      border-color 0.15s ease,
      background-color 0.15s ease,
      box-shadow 0.15s ease;

    svg {
      width: 12px;
      height: 12px;
      opacity: 0;
      transform: scale(0.7);
      transition:
        opacity 0.12s ease,
        transform 0.12s ease;
    }
  }

  .checkbox-control.is-small .checkbox-box {
    border-radius: 5px;

    svg {
      width: 11px;
      height: 11px;
    }
  }

  .checkbox-input:focus-visible + .checkbox-box {
    box-shadow: 0 0 0 3px
      ${({ theme }) => theme.palette.customColors.brandTealLight};
    border-color: ${({ theme }) => theme.palette.primary.main};
  }

  &.is-checked .checkbox-box {
    border-color: ${({ theme }) => theme.palette.primary.main};
    background: ${({ theme }) => theme.palette.primary.main};

    svg {
      opacity: 1;
      transform: scale(1);
    }
  }

  .checkbox-label {
    flex: 1;
    min-width: 0;
    font-size: 0.9rem;
    line-height: 1.45;
    color: ${({ theme }) => theme.palette.text.primary};
  }

  .checkbox-label .policy-link {
    color: ${({ theme }) => theme.palette.primary.main};
    font-weight: 600;
    cursor: pointer;
    text-decoration: underline;
  }
`;
