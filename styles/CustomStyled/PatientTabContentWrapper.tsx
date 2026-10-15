'use client';

import { Box, styled } from '@mui/material';

export const PatientTabContentWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 0;

  .section-card {
    min-width: 0;
    border-radius: 14px;
    background: ${({ theme }) => theme.palette.customColors.cardBg};
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
    overflow: hidden;
  }

  .section-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
    padding: 14px 20px;
    border-bottom: 1px solid ${({ theme }) => theme.palette.customColors.border};
  }

  .section-title-wrap {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
  }

  .section-icon {
    width: 30px;
    height: 30px;
    border-radius: 8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: ${({ theme }) => theme.palette.customColors.brandTeal};
    background: ${({ theme }) => theme.palette.customColors.brandTealLight};

    .MuiSvgIcon-root {
      font-size: 17px;
    }
  }

  .section-card.fill {
    height: 100%;
    display: flex;
    flex-direction: column;

    .section-body {
      flex: 1;
    }
  }

  .section-title-copy {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .section-title,
  .section-subtitle {
    margin: 0;
  }

  .section-title {
    font-size: 15px;
    font-weight: 700;
    line-height: 22px;
    color: ${({ theme }) => theme.palette.customColors.heading};
  }

  .section-subtitle {
    font-size: 12px;
    line-height: 16px;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
  }

  .section-edit.MuiButton-root {
    height: 30px;
    padding-left: 10px;
    padding-right: 12px;
    border-radius: 8px;
    text-transform: none;
    font-size: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.customColors.textSecondary};
    border-color: ${({ theme }) => theme.palette.customColors.border};

    &:hover {
      color: ${({ theme }) => theme.palette.customColors.brandTeal};
      border-color: ${({ theme }) => theme.palette.customColors.brandTeal};
      background: ${({ theme }) => theme.palette.customColors.hoverBg};
    }
  }

  .section-action.MuiButton-root {
    height: 34px;
    padding-left: 14px;
    padding-right: 14px;
    border-radius: 8px;
    text-transform: none;
    font-size: 13px;
    font-weight: 600;
    white-space: nowrap;
    box-shadow: none;
  }

  .section-body {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 20px;
    min-width: 0;
  }

  .tab-table {
    width: 100%;
    min-width: 0;
    overflow: hidden;

    .MuiTableContainer-root {
      overflow-x: auto;
    }

    .MuiTable-root {
      min-width: 820px;
    }

    &.wide .MuiTable-root {
      min-width: 1040px;
    }

    &.narrow .MuiTable-root {
      min-width: 560px;
    }
  }

  .stack-cell {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    min-width: 0;
  }

  .cell-title,
  .cell-note {
    margin: 0;
  }

  .cell-title {
    font-size: 13px;
    font-weight: 600;
    line-height: 18px;
    color: ${({ theme }) => theme.palette.customColors.heading};
  }

  .cell-note {
    font-size: 12px;
    line-height: 16px;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
  }

  .cell-link {
    font-size: 13px;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.customColors.brandTeal};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  .amount-cell {
    font-size: 13px;
    font-weight: 700;
    color: ${({ theme }) => theme.palette.customColors.heading};
    white-space: nowrap;
  }

  .doc-cell,
  .member-cell {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
  }

  .doc-icon {
    width: 34px;
    height: 34px;
    border-radius: 8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: ${({ theme }) => theme.palette.customColors.brandTeal};
    background: ${({ theme }) => theme.palette.customColors.brandTealLight};

    .MuiSvgIcon-root {
      font-size: 18px;
    }
  }

  .member-avatar {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 13px;
    font-weight: 700;
    color: ${({ theme }) => theme.palette.common.white};
    background: ${({ theme }) => theme.palette.customColors.info};
  }

  .tag {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    height: 22px;
    padding: 0 9px;
    border-radius: 6px;
    font-size: 11px;
    font-weight: 700;
    white-space: nowrap;

    .MuiSvgIcon-root {
      font-size: 13px;
    }

    &.info {
      color: ${({ theme }) => theme.palette.customColors.info};
      background: ${({ theme }) => theme.palette.customColors.infoBg};
    }

    &.success {
      color: ${({ theme }) => theme.palette.customColors.success};
      background: ${({ theme }) => theme.palette.customColors.successBg};
    }

    &.warning {
      color: ${({ theme }) => theme.palette.customColors.warning};
      background: ${({ theme }) => theme.palette.customColors.warningBg};
    }

    &.teal {
      color: ${({ theme }) => theme.palette.customColors.brandTeal};
      background: ${({ theme }) => theme.palette.customColors.brandTealLight};
    }

    &.danger {
      color: ${({ theme }) => theme.palette.customColors.error};
      background: ${({ theme }) => theme.palette.customColors.errorBg};
    }

    &.neutral {
      color: ${({ theme }) => theme.palette.customColors.heading};
      background: ${({ theme }) => theme.palette.customColors.inputBg};
      border: 1px solid ${({ theme }) => theme.palette.customColors.border};
    }
  }

  .row-icons {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .icon-action.MuiIconButton-root {
    width: 30px;
    height: 28px;
    border-radius: 6px;
    border: 1px solid ${({ theme }) => theme.palette.customColors.brandTeal};
    color: ${({ theme }) => theme.palette.customColors.brandTeal};

    .MuiSvgIcon-root {
      font-size: 15px;
    }

    &:hover {
      background: ${({ theme }) => theme.palette.customColors.brandTealLight};
    }

    &.danger {
      border-color: ${({ theme }) => theme.palette.customColors.error};
      color: ${({ theme }) => theme.palette.customColors.error};

      &:hover {
        background: ${({ theme }) => theme.palette.customColors.errorBg};
      }
    }
  }

  .record-filters {
    display: grid;
    grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) auto;
    align-items: end;
    gap: 14px;
  }

  .filter-field {
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-width: 0;
  }

  .filter-label {
    margin: 0;
    font-size: 12px;
    font-weight: 600;
    line-height: 16px;
    color: ${({ theme }) => theme.palette.customColors.heading};
  }

  .filter-input .MuiInputBase-root,
  .filter-select.MuiInputBase-root {
    height: 40px;
    border-radius: 8px;
    font-size: 13px;
    background: ${({ theme }) => theme.palette.customColors.inputBg};
  }

  .filter-input .MuiOutlinedInput-notchedOutline,
  .filter-select .MuiOutlinedInput-notchedOutline {
    border-color: ${({ theme }) => theme.palette.customColors.inputBorder};
  }

  .reset-btn.MuiButton-root {
    min-width: 0;
    width: 48px;
    height: 40px;
    border-radius: 8px;
    box-shadow: none;
  }

  .field-tile {
    height: 100%;
    display: flex;
    align-items: flex-start;
    gap: 12px;
    min-width: 0;
    padding: 12px 14px;
    border-radius: 10px;
    background: ${({ theme }) => theme.palette.customColors.pageBg};
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
    transition: border-color 0.2s ease, background 0.2s ease;

    &:hover {
      border-color: ${({ theme }) => theme.palette.customColors.inputBorder};
      background: ${({ theme }) => theme.palette.customColors.cardBg};
    }
  }

  .field-tile-icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: ${({ theme }) => theme.palette.customColors.brandTeal};
    background: ${({ theme }) => theme.palette.customColors.cardBg};
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};

    .MuiSvgIcon-root {
      font-size: 17px;
    }
  }

  .field-tile-copy {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .field-empty {
    font-size: 13px;
    font-weight: 500;
    font-style: italic;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
  }

  .medical-block {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .chip-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    .tag {
      height: 26px;
      padding: 0 12px;
      border-radius: 999px;
      font-size: 12px;
    }
  }

  .field-label {
    margin: 0;
    font-size: 11px;
    font-weight: 600;
    line-height: 16px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
  }

  .field-value {
    margin: 0;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
    min-height: 22px;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    color: ${({ theme }) => theme.palette.customColors.heading};
    overflow-wrap: anywhere;
  }

  .field-hint {
    display: inline-flex;
    align-items: center;
    height: 20px;
    padding: 0 8px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.customColors.brandTeal};
    background: ${({ theme }) => theme.palette.customColors.brandTealLight};
  }

  .history-box {
    margin: 0;
    padding: 14px 16px;
    border-radius: 10px;
    font-size: 13px;
    font-weight: 500;
    line-height: 22px;
    color: ${({ theme }) => theme.palette.customColors.textPrimary};
    background: ${({ theme }) => theme.palette.customColors.pageBg};
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
    border-left: 3px solid ${({ theme }) => theme.palette.customColors.brandTeal};
  }

  ${({ theme }) => theme.breakpoints.down('lg')} {
    .record-filters {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .record-filters .reset-btn.MuiButton-root {
      width: 100%;
    }
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    gap: 16px;

    .section-head {
      padding: 12px 14px;
    }

    .section-action.MuiButton-root {
      width: 100%;
    }

    .section-body {
      padding: 14px;
    }

    .record-filters {
      grid-template-columns: 1fr;
    }
  }
`;
