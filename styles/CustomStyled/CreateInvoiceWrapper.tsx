'use client';

import { Box, styled } from '@mui/material';

export const CreateInvoiceWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  margin: 0 auto;

  .invoice-card {
    border-radius: 14px;
    background: ${({ theme }) => theme.palette.customColors.cardBg};
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
    padding: 20px 24px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
  }

  .card-header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    gap: 12px;
  }

  .card-title {
    font-size: 16px;
    font-weight: 700;
    color: ${({ theme }) => theme.palette.customColors.heading};
    margin: 0;
  }

  .patient-top-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 20px;
    align-items: stretch;

    .invoice-card {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  }

  /* Patient Details Card */
  .patient-type-pill {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: #0f766e;
    color: #ffffff;
    font-size: 12px;
    font-weight: 600;
    padding: 3px 10px;
    border-radius: 4px;
    margin-bottom: 12px;
    cursor: default;
  }

  .patient-selected-box {
    margin-top: 14px;
    padding: 12px 14px;
    border-radius: 8px;
    background: ${({ theme }) => theme.palette.customColors.pageBg};
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
    display: flex;
    flex-direction: column;
    gap: 8px;

    .patient-header-line {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;

      .patient-name-id {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
        font-weight: 700;
        color: ${({ theme }) => theme.palette.customColors.heading};

        .patient-code {
          color: ${({ theme }) => theme.palette.customColors.textMuted};
          font-weight: 500;
          font-size: 13px;
        }
      }

      .clear-patient-btn {
        color: #ef4444;
        cursor: pointer;
        padding: 4px;
        display: inline-flex;
        border-radius: 4px;
        transition: background 0.2s;

        &:hover {
          background: rgba(239, 68, 68, 0.1);
        }
      }
    }

    .patient-details-line {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
      font-size: 12px;
      color: ${({ theme }) => theme.palette.customColors.textSecondary};

      .detail-item {
        display: inline-flex;
        align-items: center;
        gap: 5px;

        svg {
          font-size: 15px;
          color: ${({ theme }) => theme.palette.customColors.textMuted};
        }
      }
    }
  }

  /* Payment Status Card */
  .status-fields {
    display: flex;
    flex-direction: column;
    gap: 16px;
    flex: 1;
    justify-content: space-between;

    .status-select-wrap {
      display: flex;
      flex-direction: column;
      gap: 6px;

      .field-label {
        font-size: 13px;
        font-weight: 500;
        color: ${({ theme }) => theme.palette.customColors.textSecondary};
      }
    }

    .clinic-meta-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 14px;
      margin-top: auto;
      border-top: 1px solid ${({ theme }) => theme.palette.customColors.border};
      font-size: 12px;
      color: ${({ theme }) => theme.palette.customColors.textSecondary};

      .meta-item {
        display: flex;
        flex-direction: column;
        gap: 3px;

        .meta-val {
          font-weight: 700;
          font-size: 13px;
          color: ${({ theme }) => theme.palette.customColors.heading};
        }
      }
    }
  }

  /* Items Table */
  .items-table-wrapper {
    overflow-x: auto;
    margin-top: 12px;

    table {
      width: 100%;
      border-collapse: collapse;

      th {
        background: ${({ theme }) => theme.palette.customColors.pageBg};
        color: ${({ theme }) => theme.palette.customColors.textSecondary};
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.02em;
        padding: 10px 12px;
        text-align: left;
        border-bottom: 1px solid ${({ theme }) => theme.palette.customColors.border};
        white-space: nowrap;

        &:last-child {
          text-align: center;
        }
      }

      td {
        padding: 12px 8px;
        border-bottom: 1px solid ${({ theme }) => theme.palette.customColors.border};
        vertical-align: top;
      }

      tr:hover td {
        background: rgba(15, 118, 110, 0.015);
      }
    }

    .item-desc-cell {
      display: flex;
      flex-direction: column;
      gap: 6px;
      min-width: 260px;
    }

    .discount-cell {
      display: flex;
      align-items: center;
      gap: 6px;
      min-width: 140px;
    }

    .calc-val {
      font-size: 13.5px;
      font-weight: 700;
      color: ${({ theme }) => theme.palette.customColors.heading};
      white-space: nowrap;
      padding-top: 10px;
      display: block;
    }
  }

  /* Payment Details Section */
  .payment-stats-header {
    display: flex;
    align-items: center;
    gap: 16px;
    font-size: 13px;
    color: ${({ theme }) => theme.palette.customColors.textSecondary};

    .stat-badge {
      font-weight: 600;
      color: ${({ theme }) => theme.palette.customColors.heading};
    }
  }

  .payment-input-row {
    display: grid;
    grid-template-columns: 1.5fr 1.5fr 1fr 2fr auto;
    gap: 12px;
    align-items: end;
    margin-top: 12px;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  }

  .payments-table {
    margin-top: 16px;
    width: 100%;
    border-collapse: collapse;

    th, td {
      padding: 8px 12px;
      font-size: 12px;
      text-align: left;
      border-bottom: 1px solid ${({ theme }) => theme.palette.customColors.border};
    }

    th {
      font-weight: 600;
      color: ${({ theme }) => theme.palette.customColors.textSecondary};
      background: ${({ theme }) => theme.palette.customColors.pageBg};
    }
  }

  /* Bottom Grid: Notes & Summary */
  .bottom-grid {
    display: grid;
    grid-template-columns: 1.8fr 1.2fr;
    gap: 20px;
    align-items: stretch;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  }

  .summary-rows {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 12px;

    .summary-line {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
      color: ${({ theme }) => theme.palette.customColors.textSecondary};

      &.grand-total {
        font-size: 16px;
        font-weight: 700;
        color: ${({ theme }) => theme.palette.customColors.heading};
        padding-top: 8px;
        border-top: 1px solid ${({ theme }) => theme.palette.customColors.border};
      }
    }
  }

  .save-invoice-btn {
    margin-top: 20px;
    background-color: #0f766e !important;
    color: #ffffff !important;
    font-weight: 600 !important;
    text-transform: none !important;
    height: 44px;
    border-radius: 8px;
    font-size: 14px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

    &:hover {
      background-color: #115e59 !important;
    }

    &:disabled {
      background-color: #9ca3af !important;
      color: #ffffff !important;
    }
  }
`;
