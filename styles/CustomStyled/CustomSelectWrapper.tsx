'use client';

import { FormControl, Paper, styled } from '@mui/material';

export const CustomSelectWrapper = styled(FormControl, {
  shouldForwardProp: (prop) => prop !== '$inputSize',
}) <{ $inputSize?: 'medium' | 'large' }>`
  width: 100%;

  .MuiInputBase-root {
    min-height: 44px;
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.palette.customColors.inputBorder};
    background: ${({ theme }) => theme.palette.customColors.inputBg};
    box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
    transition:
      border-color 0.15s ease,
      box-shadow 0.15s ease,
      background-color 0.15s ease;

    &:hover {
      border-color: ${({ theme }) => theme.palette.customColors.textMuted};
    }

    &.Mui-focused {
      border-color: ${({ theme }) => theme.palette.customColors.brandTeal};
      box-shadow: 0 0 0 3px
        ${({ theme }) => theme.palette.customColors.brandTealLight};
    }

    &.Mui-error {
      border-color: ${({ theme }) => theme.palette.customColors.error};

      &.Mui-focused {
        box-shadow: 0 0 0 3px
          ${({ theme }) => theme.palette.customColors.errorBg};
      }
    }

    &.Mui-disabled {
      cursor: not-allowed;
      box-shadow: none;
      border-color: ${({ theme }) => theme.palette.customColors.inputBorder};
      background: ${({ theme }) => theme.palette.customColors.pageBg};
    }
  }

  .MuiSelect-select {
    display: flex;
    align-items: center;
    min-height: 42px;
    padding: 0 28px 0 14px !important;
    box-sizing: border-box;
    font-size: 13px;
    font-weight: 400;
    color: ${({ theme }) => theme.palette.customColors.heading};

    &.Mui-disabled {
      color: ${({ theme }) => theme.palette.customColors.textMuted};
      -webkit-text-fill-color: ${({ theme }) =>
    theme.palette.customColors.textMuted};
    }
  }

  .MuiSelect-icon {
    right: 10px;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
  }

  fieldset {
    display: none;
  }

  .select-placeholder {
    font-size: 13px;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
  }

  .MuiFormHelperText-root {
    margin: 6px 0 0;
    font-size: 11px;
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    .MuiInputBase-root {
      min-height: 40px;
    }

    .MuiSelect-select {
      min-height: 38px;
    }
  }

  ${({ $inputSize }) =>
    $inputSize === 'large' &&
    `
    .MuiInputBase-root {
      min-height: 56px;
      border-radius: 12px;
    }

    .MuiSelect-select {
      min-height: 54px;
      padding: 0 32px 0 16px !important;
      font-size: 16px;
    }

    .select-placeholder {
      font-size: 16px;
    }
  `}
`;

export const CustomSelectPaper = styled(Paper)`
  position: absolute;
  min-width: 16px;
  min-height: 16px;
  max-width: calc(100% - 32px);
  max-height: min(180px, calc(100% - 96px));
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior: contain;
  outline: 0;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.palette.customColors.scrollbarThumb}
    transparent;
  margin-top: 4px;

  &::-webkit-scrollbar {
    width: 2px;
  }

  &::-webkit-scrollbar-track {
    margin: 6px 0;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background: ${({ theme }) => theme.palette.customColors.scrollbarThumb};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.palette.customColors.textMuted};
  }
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.palette.customColors.border};
  background: ${({ theme }) => theme.palette.customColors.cardBg};
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.12);

  .MuiMenu-list {
    padding: 4px;
  }

  .MuiMenuItem-root {
    min-height: 36px;
    border-radius: 6px;
    font-size: 13px;
    color: ${({ theme }) => theme.palette.customColors.heading};

    &:hover {
      background: ${({ theme }) => theme.palette.customColors.hoverBg};
    }

    &.Mui-selected,
    &.Mui-selected:hover,
    &.Mui-selected.Mui-focusVisible {
      font-weight: 600;
      color: ${({ theme }) => theme.palette.customColors.brandTeal};
      background: ${({ theme }) => theme.palette.customColors.brandTealLight};
    }
  }
`;
