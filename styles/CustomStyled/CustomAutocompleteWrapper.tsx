'use client';

import { Box, Paper, styled } from '@mui/material';

export const CustomAutocompleteWrapper = styled(Box)`
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

  .option-copy {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
    padding: 2px 0;
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
