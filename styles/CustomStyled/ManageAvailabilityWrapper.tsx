'use client';

import { Box, styled } from '@mui/material';

export const ManageAvailabilityWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 0;

  .page-action.MuiButton-root {
    border-color: ${({ theme }) => theme.palette.customColors.border};
    color: ${({ theme }) => theme.palette.customColors.heading};
    background: ${({ theme }) => theme.palette.customColors.cardBg};

    &:hover {
      border-color: ${({ theme }) => theme.palette.customColors.brandTeal};
      color: ${({ theme }) => theme.palette.customColors.brandTeal};
      background: ${({ theme }) => theme.palette.customColors.hoverBg};
    }
  }

  .form-card {
    min-width: 0;
    padding: 24px;
    border-radius: 16px;
    background: ${({ theme }) => theme.palette.customColors.cardBg};
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
    box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
  }

  .card-title,
  .field-label {
    margin: 0 0 12px;
    font-size: 15px;
    font-weight: 700;
    line-height: 22px;
    color: ${({ theme }) => theme.palette.customColors.heading};
  }

  .field-label {
    margin-bottom: 8px;
    font-size: 13px;
    font-weight: 600;
  }

  .fees-title {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .fees-icon {
    display: inline-flex;
    color: ${({ theme }) => theme.palette.customColors.brandTeal};
  }

  .field-select.MuiInputBase-root,
  .time-select.MuiInputBase-root {
    border-radius: 10px;
    background: ${({ theme }) => theme.palette.customColors.inputBg};
    color: ${({ theme }) => theme.palette.customColors.heading};

    .MuiOutlinedInput-notchedOutline {
      border-color: ${({ theme }) => theme.palette.customColors.inputBorder};
    }

    &:hover .MuiOutlinedInput-notchedOutline,
    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: ${({ theme }) => theme.palette.customColors.brandTeal};
    }
  }

  .field-select.MuiInputBase-root {
    height: 44px;
  }

  .time-select.MuiInputBase-root {
    height: 44px;
  }

  .mode-switch,
  .weekday-row,
  .consult-options,
  .check-list,
  .chip-wrap,
  .time-picks,
  .legend,
  .form-footer {
    display: flex;
    align-items: center;
  }

  .mode-switch {
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 18px;
  }

  .mode-btn,
  .weekday-btn,
  .day-cell,
  .nav-btn.MuiIconButton-root {
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
    background: ${({ theme }) => theme.palette.customColors.cardBg};
    color: ${({ theme }) => theme.palette.customColors.heading};
    cursor: pointer;
    font-family: inherit;
  }

  .mode-btn,
  .weekday-btn {
    height: 36px;
    padding: 0 16px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;

    &.active {
      color: ${({ theme }) => theme.palette.common.white};
      background: ${({ theme }) => theme.palette.customColors.brandTeal};
      border-color: ${({ theme }) => theme.palette.customColors.brandTeal};
    }
  }

  .calendar-shell {
    padding: 16px;
    border-radius: 14px;
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
  }

  .calendar-head {
    display: grid;
    grid-template-columns: 36px 1fr 36px;
    align-items: center;
    margin-bottom: 14px;
  }

  .month-label {
    margin: 0;
    text-align: center;
    font-size: 16px;
    font-weight: 700;
    color: ${({ theme }) => theme.palette.customColors.heading};
  }

  .nav-btn.MuiIconButton-root {
    width: 32px;
    height: 32px;
    border-radius: 8px;
  }

  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    gap: 10px;
  }

  .weekday-label {
    text-align: center;
    font-size: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
  }

  .day-cell {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 72px;
    border-radius: 12px;
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
    background: ${({ theme }) => theme.palette.customColors.pageBg};
    color: ${({ theme }) => theme.palette.customColors.heading};
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;

    &.is-today {
      border: 2px solid ${({ theme }) => theme.palette.customColors.brandTeal};
      background: ${({ theme }) => theme.palette.customColors.cardBg};
    }

    &.is-selected {
      border: 2px solid ${({ theme }) => theme.palette.customColors.brandTeal};
      background: ${({ theme }) => theme.palette.customColors.brandTealLight};
    }

    &.is-leave {
      border-color: transparent;
      color: ${({ theme }) => theme.palette.customColors.error};
      background: ${({ theme }) => theme.palette.customColors.errorBg};
    }

    &.is-leave.is-today,
    &.is-selected.is-leave {
      border: 2px solid ${({ theme }) => theme.palette.customColors.brandTeal};
    }
  }

  .legend {
    gap: 16px;
    flex-wrap: wrap;
    margin-top: 14px;
    font-size: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.customColors.textSecondary};
  }

  .legend-item {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .swatch {
    width: 14px;
    height: 14px;
    border-radius: 4px;
    display: inline-block;

    &.selected {
      background: ${({ theme }) => theme.palette.customColors.brandTeal};
    }

    &.leave {
      background: ${({ theme }) => theme.palette.customColors.errorBg};
      box-shadow: inset 0 0 0 1px
        ${({ theme }) => theme.palette.customColors.error};
    }

    &.today {
      background: ${({ theme }) => theme.palette.customColors.cardBg};
      box-shadow: inset 0 0 0 2px
        ${({ theme }) => theme.palette.customColors.brandTeal};
    }
  }

  .selected-panel {
    margin-top: 18px;
  }

  .selected-box {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    min-height: 52px;
    margin-top: 8px;
    padding: 12px;
    border-radius: 10px;
    background: ${({ theme }) => theme.palette.customColors.pageBg};
  }

  .empty-copy,
  .field-error,
  .time-hint {
    margin: 0;
  }

  .empty-copy,
  .time-hint {
    font-size: 12px;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
  }

  .field-error {
    margin-top: 8px;
    font-size: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.customColors.error};
  }

  .date-chip.MuiChip-root {
    height: 28px;
    font-size: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.customColors.brandTeal};
    background: ${({ theme }) => theme.palette.customColors.brandTealLight};

    .MuiChip-deleteIcon {
      font-size: 16px;
      color: ${({ theme }) => theme.palette.customColors.brandTeal};
    }
  }

  .weekday-row {
    gap: 8px;
    flex-wrap: wrap;
  }

  .date-pair,
  .time-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
  }

  .date-pair {
    margin-top: 16px;
  }

  .section-block + .section-block {
    margin-top: 20px;
  }

  .time-picks {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;
  }

  .time-hint {
    margin-top: 8px;
  }

  .consult-options {
    gap: 8px 20px;
    flex-wrap: wrap;
  }

  .check-list {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    margin-top: 8px;
  }

  .check-row .MuiFormControlLabel-label {
    font-size: 13px;
    color: ${({ theme }) => theme.palette.customColors.heading};
  }

  .form-footer {
    justify-content: flex-end;
    gap: 10px;
  }

  .footer-btn.MuiButton-root {
    height: 40px;
    min-width: 108px;
    border-radius: 8px;
    text-transform: none;
    font-size: 13px;
    font-weight: 700;
    box-shadow: none;
  }

  .save-btn.MuiButton-root {
    background: ${({ theme }) => theme.palette.customColors.brandTeal};
    color: ${({ theme }) => theme.palette.common.white};

    &:hover {
      background: ${({ theme }) => theme.palette.customColors.brandTealDark};
    }
  }

  ${({ theme }) => theme.breakpoints.down('md')} {
    .day-cell {
      min-height: 52px;
      font-size: 13px;
    }

    .calendar-grid {
      gap: 6px;
    }
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    .form-card {
      padding: 16px;
    }

    .date-pair,
    .time-grid,
    .time-picks {
      grid-template-columns: 1fr;
    }

    .form-footer {
      flex-direction: column-reverse;
      align-items: stretch;
    }

    .footer-btn.MuiButton-root {
      width: 100%;
    }
  }
`;
