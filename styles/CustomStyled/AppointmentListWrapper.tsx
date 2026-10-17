'use client';

import { Box, styled } from '@mui/material';

export const AppointmentListWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 0;

  .page-action.MuiButton-contained {
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

  .patient-name {
    display: block;
    max-width: 160px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
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
  }

  .status-pill {
    display: inline-flex;
    align-items: center;
    height: 26px;
    padding: 0 10px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
    white-space: nowrap;
  }

  .row-actions {
    flex-wrap: nowrap;
    gap: 8px;
    justify-content: flex-end;
    white-space: nowrap;
  }

  .action-icon.MuiIconButton-root {
    position: relative;
    flex-shrink: 0;
    width: 34px;
    height: 34px;
    padding: 0;
    border-radius: 10px;
    border: 1px solid transparent;
    transition:
      background-color 0.15s ease,
      color 0.15s ease,
      border-color 0.15s ease,
      transform 0.15s ease;

    .MuiSvgIcon-root {
      font-size: 18px;
    }

    &:hover {
      transform: translateY(-1px);
    }

    &.join {
      color: ${({ theme }) => theme.palette.customColors.brandTeal};
      background: ${({ theme }) => theme.palette.customColors.brandTealLight};
      border-color: ${({ theme }) => theme.palette.customColors.brandTeal}33;

      &:hover {
        color: ${({ theme }) => theme.palette.common.white};
        background: ${({ theme }) => theme.palette.customColors.brandTeal};
      }
    }

    &.rejoin {
      color: ${({ theme }) => theme.palette.customColors.warning};
      background: ${({ theme }) => theme.palette.customColors.warningBg};
      border-color: ${({ theme }) => theme.palette.customColors.warning}33;

      &:hover {
        color: ${({ theme }) => theme.palette.common.white};
        background: ${({ theme }) => theme.palette.customColors.warning};
      }
    }

    &.consult {
      color: ${({ theme }) => theme.palette.customColors.info};
      background: ${({ theme }) => theme.palette.customColors.infoBg};
      border-color: ${({ theme }) => theme.palette.customColors.info}33;

      &:hover {
        color: ${({ theme }) => theme.palette.common.white};
        background: ${({ theme }) => theme.palette.customColors.info};
      }
    }

    &.rejoin::after,
    &.live::after {
      content: '';
      position: absolute;
      top: -3px;
      right: -3px;
      width: 9px;
      height: 9px;
      border-radius: 50%;
      border: 2px solid ${({ theme }) => theme.palette.customColors.cardBg};
      background: ${({ theme }) => theme.palette.customColors.success};
      animation: actionLivePulse 1.6s ease-in-out infinite;
    }

  }

  @keyframes actionLivePulse {
    0%,
    100% {
      box-shadow: 0 0 0 0
        ${({ theme }) => theme.palette.customColors.success}66;
    }
    50% {
      box-shadow: 0 0 0 4px
        ${({ theme }) => theme.palette.customColors.success}00;
    }
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    gap: 16px;
  }
`;
