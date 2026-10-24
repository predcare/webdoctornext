'use client';

import { Box, styled } from '@mui/material';

export const InvoiceDetailsWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 100%;

  .top-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }

    .header-left {
      display: flex;
      flex-direction: column;
      gap: 6px;

      .back-nav {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 13.5px;
        font-weight: 600;
        color: ${({ theme }) => theme.palette.customColors.heading};
        cursor: pointer;
        background: transparent;
        border: none;
        padding: 0;
        transition: color 0.15s ease;

        &:hover {
          color: ${({ theme }) => theme.palette.customColors.brandTeal};
        }
      }

      .invoice-title-row {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;

        .invoice-id {
          font-size: 20px;
          font-weight: 700;
          color: ${({ theme }) => theme.palette.customColors.heading};
          letter-spacing: -0.01em;
        }

        .badge-doctor {
          background: #0f766e;
          color: #ffffff;
          padding: 2.5px 8px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.02em;
        }

        .invoice-timestamp {
          font-size: 12.5px;
          color: ${({ theme }) => theme.palette.customColors.textMuted};
        }
      }
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;

      @media (max-width: 768px) {
        width: 100%;
      }

      .btn-action {
        height: 32px;
        border-radius: 6px;
        text-transform: none;
        font-size: 12px;
        font-weight: 600;
        padding: 0 10px;
        white-space: nowrap;
        box-shadow: none;
        transition: all 0.15s ease-in-out;

        .MuiButton-startIcon {
          margin-right: 5px;
          margin-left: -2px;
        }
      }

      .btn-edit {
        color: #0f766e;
        border: 1px solid #0f766e;
        background: transparent;

        &:hover {
          background: #f0fdfa;
          border-color: #0d9488;
        }
      }

      .btn-download {
        background: #0f766e;
        color: #ffffff;
        border: 1px solid #0f766e;

        &:hover {
          background: #115e59;
          border-color: #115e59;
        }
      }

      .btn-outline {
        color: ${({ theme }) => theme.palette.customColors.heading};
        border: 1px solid ${({ theme }) => theme.palette.customColors.border};
        background: ${({ theme }) => theme.palette.customColors.cardBg};

        &:hover {
          background: ${({ theme }) => theme.palette.customColors.hoverBg};
          border-color: ${({ theme }) => theme.palette.customColors.textMuted};
        }
      }
    }
  }

  .details-card {
    background: ${({ theme }) => theme.palette.customColors.cardBg};
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
    border-radius: 12px;
    padding: 18px 22px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);

    @media (max-width: 600px) {
      padding: 14px 16px;
    }
  }

  .patient-card {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;
    flex-wrap: wrap;

    .patient-section-label {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: ${({ theme }) => theme.palette.customColors.textMuted};
      margin-bottom: 8px;
    }

    .patient-main-info {
      display: flex;
      flex-direction: column;
      gap: 4px;

      .patient-name-row {
        display: flex;
        align-items: center;
        gap: 8px;

        .patient-name {
          font-size: 15px;
          font-weight: 700;
          color: ${({ theme }) => theme.palette.customColors.heading};
        }

        .patient-code-tag {
          font-size: 11px;
          font-weight: 500;
          color: ${({ theme }) => theme.palette.customColors.textMuted};
          background: #f1f5f9;
          padding: 1px 6px;
          border-radius: 4px;
        }
      }

      .patient-contacts {
        font-size: 12.5px;
        color: ${({ theme }) => theme.palette.customColors.textMuted};
      }

      .patient-demographics {
        font-size: 12.5px;
        color: ${({ theme }) => theme.palette.customColors.textMuted};
      }

      .patient-address {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 12.5px;
        color: ${({ theme }) => theme.palette.customColors.textMuted};
        margin-top: 2px;
        flex-wrap: wrap;
      }
    }

    .status-section {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 6px;

      @media (max-width: 600px) {
        align-items: flex-start;
        width: 100%;
        margin-top: 6px;
        padding-top: 10px;
        border-top: 1px dashed ${({ theme }) => theme.palette.customColors.border};
      }

      .tag-unpaid {
        display: inline-block;
        padding: 3px 12px;
        background: #ebf5ff;
        color: #2563eb;
        border-radius: 6px;
        font-size: 11.5px;
        font-weight: 600;
      }
    }
  }

  .table-card {
    background: ${({ theme }) => theme.palette.customColors.cardBg};
    border-radius: 12px;
    overflow: hidden;
    width: 100%;

    .MuiTableContainer-root {
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }

    .MuiTable-root {
      min-width: 780px;
    }

    .MuiTableCell-head {
      font-size: 11.5px;
      font-weight: 700;
      letter-spacing: 0.03em;
      text-transform: uppercase;
      color: ${({ theme }) => theme.palette.customColors.textMuted};
      padding: 12px 16px;
    }

    .MuiTableCell-body {
      font-size: 13px;
      padding: 12px 16px;
      color: ${({ theme }) => theme.palette.customColors.heading};
    }
  }

  .bottom-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    align-items: stretch;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }

    .notes-card {
      display: flex;
      flex-direction: column;

      .card-title {
        font-size: 15px;
        font-weight: 700;
        color: ${({ theme }) => theme.palette.customColors.heading};
        margin-bottom: 12px;
      }

      .notes-body {
        font-size: 13px;
        color: ${({ theme }) => theme.palette.customColors.textMuted};
      }
    }

    .summary-card {
      .card-title {
        font-size: 15px;
        font-weight: 700;
        color: ${({ theme }) => theme.palette.customColors.heading};
        margin-bottom: 14px;
      }

      .summary-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 6px 0;
        font-size: 13px;
        color: ${({ theme }) => theme.palette.customColors.textMuted};

        &.grand-total {
          font-size: 16px;
          font-weight: 700;
          color: ${({ theme }) => theme.palette.customColors.heading};
          padding: 8px 0;
        }

        .value {
          font-weight: 600;
          color: ${({ theme }) => theme.palette.customColors.heading};
        }
      }

      .divider {
        height: 1px;
        background: ${({ theme }) => theme.palette.customColors.border};
        margin: 8px 0;
      }
    }
  }
`;
