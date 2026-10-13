'use client';

import { Box, styled } from '@mui/material';

export const AppointmentListWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 0;

  .appointment-table {
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

  .col-fit {
    width: 1%;
    white-space: nowrap;
  }

  .patient-cell,
  .patient-name-row,
  .stack-cell,
  .modality-pill,
  .row-actions {
    display: flex;
    align-items: center;
  }

  .patient-cell {
    gap: 12px;
  }

  .patient-copy,
  .stack-cell {
    min-width: 0;
    flex-direction: column;
    align-items: flex-start;
  }

  .patient-name-row {
    gap: 8px;
  }

  .patient-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: ${({ theme }) => theme.palette.common.white};
    font-size: 14px;
    font-weight: 700;

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

  .patient-name,
  .cell-title,
  .patient-meta,
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

  .patient-meta,
  .cell-note {
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
  }

  .instant-chip {
    display: inline-flex;
    align-items: center;
    height: 18px;
    padding: 0 6px;
    border-radius: 999px;
    font-size: 10px;
    font-weight: 700;
    line-height: 14px;
    letter-spacing: 0.02em;
    color: ${({ theme }) => theme.palette.customColors.warning};
    background: ${({ theme }) => theme.palette.customColors.warningBg};
  }

  .modality-pill {
    gap: 6px;
    height: 28px;
    padding: 0 10px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
    white-space: nowrap;

    &.video {
      color: ${({ theme }) => theme.palette.customColors.info};
      background: ${({ theme }) => theme.palette.customColors.infoBg};
    }

    &.in-person {
      color: ${({ theme }) => theme.palette.customColors.success};
      background: ${({ theme }) => theme.palette.customColors.successBg};
    }
  }

  .row-actions {
    flex-wrap: nowrap;
    gap: 8px;
    white-space: nowrap;
  }

  .row-action.MuiButton-root {
    flex-shrink: 0;
    text-transform: none;
    white-space: nowrap;
    font-size: 12px;
    font-weight: 600;
    height: 32px;
    min-width: 108px;
    padding-left: 12px;
    padding-right: 12px;
    border-radius: 8px;
    box-shadow: none;
    color: ${({ theme }) => theme.palette.common.white};

    &.join {
      background: ${({ theme }) => theme.palette.customColors.brandTeal};
    }
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    gap: 16px;
  }
`;
