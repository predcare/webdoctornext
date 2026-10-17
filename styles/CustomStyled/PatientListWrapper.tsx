'use client';

import { Box, Popover, styled } from '@mui/material';

export const PatientListWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 0;

  .patient-table {
    width: 100%;
    min-width: 0;

    .MuiTableContainer-root {
      overflow-x: auto;
    }

    .MuiTable-root {
      min-width: 960px;
    }
  }

  .patient-toolbar {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .toolbar-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
  }

  .patient-search {
    width: 260px;

    .MuiInputBase-root {
      height: 36px;
      border-radius: 8px;
      font-size: 13px;
      background: ${({ theme }) => theme.palette.customColors.inputBg};
    }

    .MuiSvgIcon-root {
      color: ${({ theme }) => theme.palette.customColors.textMuted};
    }
  }

  .toolbar-actions {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }

  .toolbar-btn.MuiButton-root,
  .toolbar-btn.MuiInputBase-root {
    height: 36px;
    border-radius: 8px;
    text-transform: none;
    font-size: 13px;
    font-weight: 600;
    white-space: nowrap;
  }

  .filter-btn.MuiButton-root,
  .sort-select.MuiInputBase-root {
    color: ${({ theme }) => theme.palette.customColors.heading};
    border-color: ${({ theme }) => theme.palette.customColors.border};
    background: ${({ theme }) => theme.palette.customColors.cardBg};
  }

  .filter-btn.MuiButton-root {
    padding-left: 14px;
    padding-right: 14px;

    &:hover,
    &.active {
      color: ${({ theme }) => theme.palette.customColors.brandTeal};
      border-color: ${({ theme }) => theme.palette.customColors.brandTeal};
      background: ${({ theme }) => theme.palette.customColors.hoverBg};
    }
  }

  .filter-badge .MuiBadge-badge {
    font-size: 10px;
    font-weight: 700;
    min-width: 18px;
    height: 18px;
  }

  .sort-select.MuiInputBase-root {
    min-width: 170px;

    .MuiOutlinedInput-notchedOutline {
      border-color: ${({ theme }) => theme.palette.customColors.border};
    }
  }

  .add-patient.MuiButton-root {
    padding-left: 14px;
    padding-right: 14px;
    box-shadow: none;
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

  .patient-cell {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
  }

  .patient-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    overflow: hidden;
    color: ${({ theme }) => theme.palette.common.white};
    font-size: 14px;
    font-weight: 700;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &.tone-teal {
      background: ${({ theme }) => theme.palette.customColors.brandTeal};
    }

    &.tone-info {
      background: ${({ theme }) => theme.palette.customColors.info};
    }

    &.tone-success {
      background: ${({ theme }) => theme.palette.customColors.success};
    }

    &.tone-warning {
      background: ${({ theme }) => theme.palette.customColors.warning};
    }
  }

  .patient-copy {
    min-width: 0;
  }

  .patient-name-row {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .verified-icon {
    font-size: 16px;
    color: ${({ theme }) => theme.palette.customColors.success};
  }

  .patient-name,
  .patient-meta,
  .patient-code,
  .cell-title,
  .cell-note {
    margin: 0;
  }

  .patient-name,
  .cell-title {
    font-size: 13px;
    font-weight: 600;
    line-height: 18px;
    color: ${({ theme }) => theme.palette.customColors.heading};
  }

  .patient-meta {
    font-size: 12px;
    line-height: 16px;
    color: ${({ theme }) => theme.palette.customColors.textSecondary};
  }

  .patient-code,
  .cell-note {
    font-size: 11px;
    line-height: 16px;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
  }

  .row-menu.MuiIconButton-root {
    width: 28px;
    height: 28px;
    border-radius: 6px;
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
    color: ${({ theme }) => theme.palette.customColors.textSecondary};
  }

  ${({ theme }) => theme.breakpoints.down('md')} {
    .patient-search {
      width: 100%;
    }

    .toolbar-actions {
      width: 100%;
    }
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    gap: 16px;

    .filter-badge {
      flex: 1 1 calc(50% - 5px);

      .filter-btn.MuiButton-root {
        width: 100%;
      }
    }

    .sort-select.MuiInputBase-root {
      flex: 1 1 calc(50% - 5px);
      min-width: 0;
    }

    .add-patient.MuiButton-root {
      flex: 1 1 100%;
    }
  }
`;

export const PatientFilterPopover = styled(Popover)`
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
