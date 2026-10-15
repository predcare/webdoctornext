'use client';

import { Box, Popover, styled } from '@mui/material';

export const AvailabilityListWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 0;

  .list-actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
    flex-wrap: wrap;
    margin-left: auto;
  }

  .doctor-select.MuiInputBase-root {
    height: 36px;
    min-width: 220px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.customColors.heading};
    background: ${({ theme }) => theme.palette.customColors.cardBg};

    .MuiSelect-select {
      display: flex;
      align-items: center;
      gap: 8px;
      padding-top: 6px;
      padding-bottom: 6px;
    }

    .MuiOutlinedInput-notchedOutline {
      border-color: ${({ theme }) => theme.palette.customColors.border};
    }

    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: ${({ theme }) => theme.palette.customColors.brandTeal};
    }

    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: ${({ theme }) => theme.palette.customColors.brandTeal};
    }
  }

  .doctor-select-icon {
    display: inline-flex;
    color: ${({ theme }) => theme.palette.customColors.brandTeal};
    font-size: 18px;
  }

  .filter-btn.MuiButton-root,
  .add-availability.MuiButton-root {
    height: 36px;
    border-radius: 8px;
    text-transform: none;
    font-size: 13px;
    font-weight: 600;
    white-space: nowrap;
    box-shadow: none;
  }

  .add-availability.MuiButton-contained {
    background-color: ${({ theme }) => theme.palette.customColors.brandTeal};
    color: ${({ theme }) => theme.palette.common.white};

    &:hover {
      --variant-containedColor: ${({ theme }) => theme.palette.common.white};
      --variant-containedBg: ${({ theme }) =>
        theme.palette.customColors.brandTealDark};
      background-color: ${({ theme }) =>
        theme.palette.customColors.brandTealDark};
      color: ${({ theme }) => theme.palette.common.white};
    }
  }

  .filter-btn.MuiButton-root {
    padding-left: 14px;
    padding-right: 14px;
    color: ${({ theme }) => theme.palette.customColors.brandTeal};
    border-color: ${({ theme }) => theme.palette.customColors.brandTeal};
    background: ${({ theme }) => theme.palette.customColors.cardBg};

    &:hover,
    &.active {
      color: ${({ theme }) => theme.palette.customColors.brandTealDark};
      border-color: ${({ theme }) => theme.palette.customColors.brandTealDark};
      background: ${({ theme }) => theme.palette.customColors.hoverBg};
    }
  }

  .filter-badge .MuiBadge-badge {
    font-size: 10px;
    font-weight: 700;
    min-width: 18px;
    height: 18px;
  }

  .active-filters {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
  }

  .active-chip.MuiChip-root {
    height: 26px;
    font-size: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.customColors.brandTeal};
    background: ${({ theme }) => theme.palette.customColors.brandTealLight};

    .MuiChip-deleteIcon {
      font-size: 16px;
      color: ${({ theme }) => theme.palette.customColors.brandTeal};
    }
  }

  .clear-all.MuiButton-root {
    min-width: 0;
    padding: 0 6px;
    text-transform: none;
    font-size: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.customColors.error};
  }

  .availability-table {
    width: 100%;
    min-width: 0;
    overflow: hidden;

    .MuiTableContainer-root {
      overflow-x: auto;
    }

    .MuiTable-root {
      min-width: 980px;
    }
  }

  .mode-chip,
  .date-chip,
  .more-chip,
  .fee-chip,
  .chip-row {
    display: inline-flex;
    align-items: center;
  }

  .chip-row {
    flex-wrap: wrap;
    gap: 8px;
  }

  .mode-chip {
    gap: 6px;
    height: 28px;
    padding: 0 10px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 700;
    white-space: nowrap;

    &.mode-specific {
      color: ${({ theme }) => theme.palette.customColors.success};
      background: ${({ theme }) => theme.palette.customColors.successBg};
    }

    &.mode-recurring {
      color: ${({ theme }) => theme.palette.customColors.brandTeal};
      background: ${({ theme }) => theme.palette.customColors.brandTealLight};
    }

    &.mode-leave {
      color: ${({ theme }) => theme.palette.customColors.error};
      background: ${({ theme }) => theme.palette.customColors.errorBg};
    }
  }

  .date-chip,
  .more-chip,
  .fee-chip {
    height: 28px;
    padding: 0 10px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 600;
    white-space: nowrap;
  }

  .date-chip {
    color: ${({ theme }) => theme.palette.customColors.heading};
    background: ${({ theme }) => theme.palette.customColors.cardBg};
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
  }

  .more-chip {
    color: ${({ theme }) => theme.palette.common.white};
    background: ${({ theme }) => theme.palette.customColors.brandTeal};
  }

  .fee-chip {
    gap: 6px;
    background: ${({ theme }) => theme.palette.customColors.cardBg};

    &.fee-in-person {
      color: ${({ theme }) => theme.palette.customColors.success};
      border: 1px solid ${({ theme }) => theme.palette.customColors.success};
    }

    &.fee-video {
      color: ${({ theme }) => theme.palette.customColors.heading};
      border: 1px solid ${({ theme }) => theme.palette.customColors.border};

      svg {
        color: ${({ theme }) => theme.palette.customColors.info};
      }
    }
  }

  .fee-amount {
    font-weight: 700;
  }

  .time-text,
  .duration-text {
    font-size: 13px;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.customColors.heading};
    white-space: nowrap;
  }

  .row-menu.MuiIconButton-root {
    color: ${({ theme }) => theme.palette.customColors.textMuted};
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    .list-actions {
      width: 100%;
      margin-left: 0;
    }

    .doctor-select.MuiInputBase-root,
    .filter-btn.MuiButton-root,
    .add-availability.MuiButton-root {
      width: 100%;
    }
  }
`;

export const AvailabilityFilterPopover = styled(Popover)`
  .MuiPopover-paper {
    width: 300px;
    max-width: calc(100vw - 32px);
    margin-top: 8px;
    padding: 16px;
    border-radius: 12px;
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
    background: ${({ theme }) => theme.palette.customColors.cardBg};
    box-shadow: 0 12px 32px rgba(15, 23, 42, 0.12);
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .popover-section {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .popover-label {
    margin: 0;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
  }

  .popover-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .popover-chip.MuiChip-root {
    height: 30px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.customColors.heading};
    background: ${({ theme }) => theme.palette.customColors.inputBg};
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};

    &.selected,
    &.selected:hover {
      color: ${({ theme }) => theme.palette.common.white};
      background: ${({ theme }) => theme.palette.customColors.brandTeal};
      border-color: ${({ theme }) => theme.palette.customColors.brandTeal};
    }
  }

  .popover-footer {
    display: flex;
    gap: 8px;
    padding-top: 12px;
    border-top: 1px solid ${({ theme }) => theme.palette.customColors.border};
  }

  .popover-btn.MuiButton-root {
    flex: 1;
    height: 36px;
    border-radius: 8px;
    text-transform: none;
    font-size: 13px;
    font-weight: 600;
    box-shadow: none;
  }
`;
