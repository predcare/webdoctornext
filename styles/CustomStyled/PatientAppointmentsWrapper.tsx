'use client';

import { Box, styled } from '@mui/material';

export const PatientAppointmentsWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 0;

  .patient-appointment-table {
    width: 100%;
    min-width: 0;
    overflow: hidden;

    .MuiTableContainer-root {
      overflow-x: auto;
    }

    .MuiTable-root {
      min-width: 760px;
      table-layout: fixed;
    }

    .MuiTableHead-root .MuiTableCell-root,
    .MuiTableBody-root .MuiTableCell-root,
    .MuiTableBody-root .MuiTableCell-root:first-of-type {
      padding: 12px 14px;
    }
  }

  .col-fit {
    width: 1%;
    white-space: nowrap;
  }

  .stack-cell,
  .title-row {
    display: flex;
    align-items: center;
  }

  .modality-pill {
    display: inline-flex;
    align-items: center;
  }

  .stack-cell {
    min-width: 0;
    flex-direction: column;
    align-items: flex-start;

    .cell-title,
    .cell-note {
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .title-row {
    gap: 8px;
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

  .row-view.MuiButton-root {
    height: 32px;
    padding-left: 12px;
    padding-right: 12px;
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

  ${({ theme }) => theme.breakpoints.down('sm')} {
    gap: 16px;
  }
`;
