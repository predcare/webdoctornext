'use client';

import { Box, styled } from '@mui/material';

export const AppointmentFiltersWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  border-radius: 16px;
  background: ${({ theme }) => theme.palette.customColors.cardBg};
  border: 1px solid ${({ theme }) => theme.palette.customColors.border};

  .filter-row {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }

  .chip-group,
  .status-group {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .period-group {
    display: flex;
    align-items: center;
    gap: 4px;
    flex-wrap: wrap;
  }

  .row-divider {
    height: 24px;
    align-self: center;
    border-color: ${({ theme }) => theme.palette.customColors.border};
  }

  .visit-chip.MuiButton-root,
  .period-chip.MuiButton-root,
  .status-chip.MuiButton-root {
    min-width: 0;
    height: 34px;
    padding: 0 12px;
    border-radius: 10px;
    text-transform: none;
    font-size: 13px;
    font-weight: 600;
    line-height: 18px;
    white-space: nowrap;
    box-shadow: none;
    color: ${({ theme }) => theme.palette.customColors.textSecondary};
    background: ${({ theme }) => theme.palette.customColors.cardBg};
  }

  .visit-chip.MuiButton-root,
  .status-chip.MuiButton-root {
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
  }

  .period-chip.MuiButton-root {
    border: 1px solid transparent;
    background: transparent;
  }

  .visit-chip.MuiButton-root.active,
  .period-chip.MuiButton-root.active {
    background: ${({ theme }) => theme.palette.customColors.brandTeal};
    border-color: ${({ theme }) => theme.palette.customColors.brandTeal};
    color: ${({ theme }) => theme.palette.common.white};
  }

  .status-chip.MuiButton-root.active {
    background: ${({ theme }) => theme.palette.customColors.info};
    border-color: ${({ theme }) => theme.palette.customColors.info};
    color: ${({ theme }) => theme.palette.common.white};
  }

  .status-count {
    margin-left: 4px;
    font-weight: 600;
  }

  .instant-check {
    margin: 0;
    height: 34px;
    padding: 0 10px 0 4px;
    border-radius: 999px;
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};

    .MuiFormControlLabel-label {
      color: ${({ theme }) => theme.palette.customColors.textSecondary};
      font-size: 13px;
      font-weight: 600;
    }

    .MuiCheckbox-root {
      color: ${({ theme }) => theme.palette.customColors.textMuted};
      padding: 4px;
    }

    .MuiCheckbox-root.Mui-checked {
      color: ${({ theme }) => theme.palette.customColors.brandTeal};
    }
  }

  .timeline {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-left: auto;
    min-height: 42px;
    padding: 4px 4px 4px 12px;
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
    border-radius: 12px;
    background: ${({ theme }) => theme.palette.customColors.cardBg};
  }

  .timeline-label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
    white-space: nowrap;
  }

  .reset-filters.MuiButton-root {
    height: 34px;
    margin-left: auto;
    padding: 0 14px;
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.palette.customColors.error};
    text-transform: none;
    font-size: 13px;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.customColors.error};
    background: ${({ theme }) => theme.palette.customColors.errorBg};
    box-shadow: none;

    &:hover {
      border-color: ${({ theme }) => theme.palette.customColors.error};
      background: ${({ theme }) => theme.palette.customColors.errorBg};
    }
  }

  .search-field {
    flex: 1 1 280px;
    min-width: 220px;

    .MuiOutlinedInput-root {
      height: 40px;
      border-radius: 999px;
      background: ${({ theme }) => theme.palette.customColors.inputBg};
      padding-left: 12px;

      fieldset {
        border-color: ${({ theme }) => theme.palette.customColors.inputBorder};
      }

      &:hover fieldset {
        border-color: ${({ theme }) => theme.palette.customColors.brandTeal};
      }

      &.Mui-focused fieldset {
        border-color: ${({ theme }) => theme.palette.customColors.brandTeal};
        border-width: 1px;
      }
    }

    .MuiInputAdornment-root {
      color: ${({ theme }) => theme.palette.customColors.textMuted};
    }

    input {
      font-size: 14px;
      padding: 0;

      &::placeholder {
        color: ${({ theme }) => theme.palette.customColors.textMuted};
        opacity: 1;
      }
    }
  }

  .search-hint {
    font-size: 11px;
    font-weight: 600;
    line-height: 16px;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
    white-space: nowrap;
  }

  .date-field.MuiButton-root {
    width: 148px;
    height: 40px;
    justify-content: space-between;
    padding: 0 12px;
    border-radius: 12px;
    border-color: ${({ theme }) => theme.palette.customColors.inputBorder};
    background: ${({ theme }) => theme.palette.customColors.inputBg};
    color: ${({ theme }) => theme.palette.customColors.textPrimary};
    text-transform: none;
    font-size: 13px;
    font-weight: 500;

    &.empty {
      color: ${({ theme }) => theme.palette.customColors.textMuted};
    }
  }

  .sort-select {
    width: 196px;
    height: 40px;
    border-radius: 12px;
    background: ${({ theme }) => theme.palette.customColors.inputBg};
    color: ${({ theme }) => theme.palette.customColors.textPrimary};
    font-size: 13px;
    font-weight: 600;

    .MuiOutlinedInput-notchedOutline {
      border-color: ${({ theme }) => theme.palette.customColors.inputBorder};
      border-radius: 12px;
    }

    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: ${({ theme }) => theme.palette.customColors.brandTeal};
    }

    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: ${({ theme }) => theme.palette.customColors.brandTeal};
      border-width: 1px;
    }
  }

  ${({ theme }) => theme.breakpoints.down('lg')} {
    .timeline {
      flex: 1 1 100%;
      width: 100%;
      margin-left: 0;
      justify-content: space-between;
    }

    .timeline-label {
      display: none;
    }

    .period-group {
      flex: 1;
    }

    .period-chip.MuiButton-root {
      flex: 1;
    }

    .status-row {
      align-items: stretch;
    }

    .status-group {
      flex: 1 1 100%;
      width: 100%;
    }

    .status-chip.MuiButton-root {
      flex: 1 1 150px;
      justify-content: center;
    }

    .reset-filters.MuiButton-root {
      flex: 1 1 100%;
      width: 100%;
      margin-left: 0;
      justify-content: center;
    }
  }

  ${({ theme }) => theme.breakpoints.down('md')} {
    gap: 14px;
    padding: 14px;

    .search-field,
    .sort-select {
      flex: 1 1 100%;
      width: 100%;
      min-width: 0;
    }

    .date-field.MuiButton-root {
      flex: 1 1 calc(50% - 8px);
      width: auto;
      min-width: 140px;
    }
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    padding: 12px;
    gap: 12px;

    .filter-row {
      gap: 10px;
    }

    .search-hint {
      display: none;
    }

    .instant-check,
    .date-field.MuiButton-root {
      width: 100%;
    }

    .period-group {
      justify-content: stretch;
    }
  }
`;
