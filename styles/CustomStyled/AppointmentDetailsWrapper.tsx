'use client';

import { Box, styled } from '@mui/material';

export const AppointmentDetailsWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 24px;
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

  .detail-card {
    min-width: 0;
    border-radius: 16px;
    background: ${({ theme }) => theme.palette.customColors.cardBg};
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
    box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
    overflow: hidden;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &:hover {
      border-color: ${({ theme }) => theme.palette.customColors.inputBorder};
      box-shadow: 0 4px 16px rgba(15, 23, 42, 0.06);
    }

    &.fill {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  }

  .card-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
    padding: 16px 24px;
    border-bottom: 1px solid ${({ theme }) => theme.palette.customColors.border};
  }

  .card-head-title {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
  }

  .card-icon {
    width: 32px;
    height: 32px;
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

  .card-title-copy {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .card-title {
    margin: 0;
    font-size: 15px;
    font-weight: 700;
    line-height: 22px;
    color: ${({ theme }) => theme.palette.customColors.heading};
  }

  .card-subtitle {
    margin: 0;
    font-size: 12px;
    line-height: 16px;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
  }

  .card-body {
    padding: 24px;
  }

  .card-foot {
    padding: 12px 24px;
    border-top: 1px solid ${({ theme }) => theme.palette.customColors.border};
    background: ${({ theme }) => theme.palette.customColors.pageBg};
    font-size: 12px;
    line-height: 16px;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
  }

  .head-action.MuiButton-root {
    height: 34px;
    padding-left: 14px;
    padding-right: 14px;
    border-radius: 8px;
    text-transform: none;
    font-size: 12px;
    font-weight: 600;
    white-space: nowrap;
    color: ${({ theme }) => theme.palette.customColors.brandTeal};
    border-color: ${({ theme }) => theme.palette.customColors.brandTeal};

    &:hover {
      background: ${({ theme }) => theme.palette.customColors.brandTealLight};
    }
  }

  /* Patient summary */
  .patient-head {
    display: flex;
    align-items: center;
    gap: 16px;
    min-width: 0;
  }

  .patient-avatar {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: ${({ theme }) => theme.palette.common.white};
    font-size: 24px;
    font-weight: 700;
    box-shadow: 0 0 0 4px ${({ theme }) => theme.palette.customColors.brandTealLight};

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

  .patient-head-copy {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .patient-title-row {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }

  .patient-title {
    margin: 0;
    font-size: 20px;
    font-weight: 700;
    line-height: 26px;
    color: ${({ theme }) => theme.palette.customColors.heading};
  }

  .code-chip {
    display: inline-flex;
    align-items: center;
    height: 22px;
    padding: 0 8px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 700;
    color: ${({ theme }) => theme.palette.customColors.brandTeal};
    background: ${({ theme }) => theme.palette.customColors.brandTealLight};
  }

  .patient-contact {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
  }

  .contact-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    height: 28px;
    max-width: 100%;
    padding: 0 10px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    color: ${({ theme }) => theme.palette.customColors.textSecondary};
    background: ${({ theme }) => theme.palette.customColors.inputBg};
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    .MuiSvgIcon-root {
      font-size: 14px;
      color: ${({ theme }) => theme.palette.customColors.brandTeal};
    }
  }

  .meta-strip {
    margin-top: 20px;
    padding: 16px;
    border-radius: 12px;
    background: ${({ theme }) => theme.palette.customColors.pageBg};
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
  }

  /* Pills */
  .time-pill,
  .payment-pill,
  .frequency-pill {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    height: 26px;
    padding: 0 10px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
    white-space: nowrap;
  }

  .time-pill {
    color: ${({ theme }) => theme.palette.customColors.heading};
    background: ${({ theme }) => theme.palette.customColors.cardBg};
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};

    .MuiSvgIcon-root {
      font-size: 14px;
      color: ${({ theme }) => theme.palette.customColors.brandTeal};
    }
  }

  .payment-pill {
    &.pending {
      color: ${({ theme }) => theme.palette.customColors.warning};
      background: ${({ theme }) => theme.palette.customColors.warningBg};
    }

    &.paid {
      color: ${({ theme }) => theme.palette.customColors.success};
      background: ${({ theme }) => theme.palette.customColors.successBg};
    }
  }

  .frequency-pill {
    height: 24px;
    color: ${({ theme }) => theme.palette.customColors.brandTeal};
    background: ${({ theme }) => theme.palette.customColors.brandTealLight};
  }

  /* Update status */
  .status-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .current-status {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 8px;
    padding: 12px 14px;
    border-radius: 10px;
    border-left: 3px solid ${({ theme }) => theme.palette.customColors.info};
    background: ${({ theme }) => theme.palette.customColors.infoBg};
  }

  .current-status-label {
    font-size: 13px;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.customColors.info};
  }

  .status-field {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .field-label {
    font-size: 13px;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.customColors.heading};
  }

  .field-helper {
    margin: 0;
    font-size: 12px;
    line-height: 16px;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
  }

  .status-select.MuiInputBase-root {
    height: 42px;
    border-radius: 8px;
    font-size: 13px;
    background: ${({ theme }) => theme.palette.customColors.inputBg};
  }

  .update-status.MuiButton-root {
    height: 42px;
    margin-top: auto;
    border-radius: 8px;
    text-transform: none;
    font-size: 13px;
    font-weight: 600;
    box-shadow: none;
  }

  /* Prescriptions */
  .prescription-table {
    border: none;
    border-radius: 0;
    box-shadow: none;

    .MuiTableContainer-root {
      overflow-x: auto;
    }

    .MuiTable-root {
      min-width: 760px;
    }

    .MuiTableHead-root .MuiTableCell-root {
      padding: 12px 20px;
      background: ${({ theme }) => theme.palette.customColors.pageBg};
    }

    .MuiTableBody-root .MuiTableCell-root {
      padding: 14px 20px;
    }
  }

  .medicine-cell {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .medicine-icon {
    width: 32px;
    height: 32px;
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

  .cell-note,
  .cell-muted {
    font-size: 12px;
    line-height: 16px;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
  }

  ${({ theme }) => theme.breakpoints.up('sm')} {
    .meta-item + .meta-item {
      border-left: 1px solid ${({ theme }) => theme.palette.customColors.border};
      padding-left: 16px;
    }
  }

  ${({ theme }) => theme.breakpoints.down('md')} {
    .card-body {
      padding: 20px;
    }

    .card-head {
      padding: 14px 20px;
    }

    .card-foot {
      padding: 12px 20px;
    }
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    gap: 16px;

    .card-body {
      padding: 16px;
    }

    .card-head {
      padding: 12px 16px;
    }

    .card-foot {
      padding: 10px 16px;
    }

    .patient-head {
      flex-wrap: wrap;
      align-items: flex-start;
    }

    .patient-avatar {
      width: 52px;
      height: 52px;
      font-size: 20px;
    }

    .patient-head-copy {
      flex: 1 1 calc(100% - 68px);
    }

    .patient-title {
      font-size: 17px;
      line-height: 22px;
    }

    .meta-strip {
      padding: 14px;
    }

    .head-action.MuiButton-root {
      width: 100%;
    }
  }
`;
