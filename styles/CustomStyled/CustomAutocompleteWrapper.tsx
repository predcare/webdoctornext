'use client';

import { Box, Paper, styled } from '@mui/material';

export const CustomAutocompleteWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== '$inputSize',
})<{ $inputSize?: 'medium' | 'large' }>`
  width: 100%;

  .MuiAutocomplete-root .MuiInputBase-root {
    padding: 0 40px 0 14px;
    flex-wrap: nowrap;

    .MuiAutocomplete-input {
      padding: 0;
      min-width: 0;
    }
  }

  .MuiAutocomplete-root.MuiAutocomplete-hasClearIcon .MuiInputBase-root {
    padding-right: 66px;
  }

  .MuiAutocomplete-endAdornment {
    right: 10px;

    .MuiIconButton-root {
      padding: 2px;
      color: ${({ theme }) => theme.palette.customColors.textMuted};
    }

    .MuiSvgIcon-root {
      font-size: 20px;
    }
  }

  ${({ $inputSize }) =>
    $inputSize === 'large' &&
    `
    .MuiAutocomplete-root .MuiInputBase-root {
      padding: 0 44px 0 16px;
    }

    .MuiAutocomplete-root.MuiAutocomplete-hasClearIcon .MuiInputBase-root {
      padding-right: 72px;
    }

    .MuiAutocomplete-endAdornment {
      right: 12px;

      .MuiSvgIcon-root {
        font-size: 22px;
      }
    }
  `}
`;

export const CustomAutocompletePaper = styled(Paper)`
  margin-top: 4px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.palette.customColors.border};
  background: ${({ theme }) => theme.palette.customColors.cardBg};
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.12);

  .MuiAutocomplete-listbox {
    padding: 4px;
  }

  .MuiAutocomplete-option {
    min-height: 36px;
    border-radius: 6px;
    font-size: 13px;
    color: ${({ theme }) => theme.palette.customColors.heading};

    &.Mui-focused {
      background: ${({ theme }) => theme.palette.customColors.hoverBg};
    }

    &[aria-selected='true'],
    &[aria-selected='true'].Mui-focused {
      font-weight: 600;
      color: ${({ theme }) => theme.palette.customColors.brandTeal};
      background: ${({ theme }) => theme.palette.customColors.brandTealLight};
    }
  }

  .option-row {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
  }

  .option-avatar {
    display: grid;
    place-items: center;
    width: 32px;
    height: 32px;
    flex-shrink: 0;
    border-radius: 50%;
    font-size: 12px;
    font-weight: 700;
    color: ${({ theme }) => theme.palette.common.white};
    background: ${({ theme }) => theme.palette.customColors.brandTeal};
  }

  .option-copy {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
    padding: 2px 0;
  }

  .option-tag {
    display: inline-block;
    margin-left: 6px;
    padding: 1px 6px;
    border-radius: 4px;
    font-size: 10px;
    font-weight: 600;
    line-height: 16px;
    text-transform: capitalize;
    vertical-align: middle;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
    background: ${({ theme }) => theme.palette.customColors.pageBg};
  }

  .option-title {
    font-size: 13px;
    font-weight: 600;
    line-height: 18px;
    color: inherit;
  }

  .option-subtitle {
    font-size: 11px;
    line-height: 16px;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
  }

  .MuiAutocomplete-noOptions {
    font-size: 13px;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
  }
`;
