'use client';

import { Box, styled } from '@mui/material';

export const EditInvoiceWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;

  .top-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;

    .header-left {
      display: flex;
      flex-direction: column;
      gap: 6px;

      .back-nav {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 14px;
        font-weight: 600;
        color: ${({ theme }) => theme.palette.customColors.heading};
        cursor: pointer;
        background: transparent;
        border: none;
        padding: 0;
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
        }

        .badge-doctor {
          background: #0f766e;
          color: #ffffff;
          padding: 3px 8px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 600;
        }

        .badge-notice {
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          color: #1d4ed8;
          padding: 3px 8px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 500;
        }

        .invoice-timestamp {
          font-size: 13px;
          color: ${({ theme }) => theme.palette.customColors.textMuted};
        }
      }
    }
  }

  .form-section-card {
    background: ${({ theme }) => theme.palette.customColors.cardBg};
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
    border-radius: 14px;
    padding: 20px 24px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);

    .section-title {
      font-size: 15px;
      font-weight: 700;
      color: ${({ theme }) => theme.palette.customColors.heading};
      margin-bottom: 14px;
    }

    .section-header-flex {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
      margin-bottom: 14px;

      .section-title {
        margin-bottom: 0;
      }

      .sub-stats {
        display: flex;
        align-items: center;
        gap: 16px;
        font-size: 13px;
        font-weight: 600;
        color: ${({ theme }) => theme.palette.customColors.heading};

        .pending-text {
          color: #ef4444;
        }
      }
    }
  }

  .patient-summary {
    .patient-name {
      font-size: 15px;
      font-weight: 700;
      color: ${({ theme }) => theme.palette.customColors.heading};
      margin-bottom: 4px;
    }

    .patient-contact {
      font-size: 13px;
      color: ${({ theme }) => theme.palette.customColors.textMuted};
    }
  }

  .locked-note {
    font-size: 12px;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
    margin-top: 10px;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .payment-inputs-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1.5fr auto;
    gap: 14px;
    align-items: flex-end;

    @media (max-width: 992px) {
      grid-template-columns: 1fr 1fr;
    }

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }

    .add-btn {
      height: 44px;
      padding: 0 20px;
      background: #0f766e;
      color: #ffffff;
      border-radius: 8px;
      text-transform: none;
      font-weight: 600;

      &:hover {
        background: #115e59;
      }
    }
  }

  .payment-status-row {
    display: flex;
    align-items: center;
    gap: 14px;
    max-width: 380px;

    .select-wrap {
      flex: 1;
    }

    .update-btn {
      height: 44px;
      padding: 0 18px;
      background: #0f766e;
      color: #ffffff;
      border-radius: 8px;
      text-transform: none;
      font-weight: 600;
      white-space: nowrap;

      &:hover {
        background: #115e59;
      }
    }
  }

  .summary-box {
    margin-left: auto;
    width: 320px;
    max-width: 100%;

    .summary-title {
      font-size: 15px;
      font-weight: 700;
      color: ${({ theme }) => theme.palette.customColors.heading};
      margin-bottom: 12px;
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

      .discount {
        color: #ef4444;
        font-weight: 600;
      }
    }
  }
`;
