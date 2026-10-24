'use client';

import { Box, styled } from '@mui/material';

export const ClinicInvoicesWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;

  .page-title {
    font-size: 20px;
    font-weight: 700;
    color: ${({ theme }) => theme.palette.customColors.heading};
    margin: 0;
  }

  .invoices-stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;

    @media (max-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }
  }

  .stat-card-box {
    background: ${({ theme }) => theme.palette.customColors.cardBg};
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
    border-radius: 14px;
    padding: 18px 20px;
    display: flex;
    align-items: center;
    gap: 16px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);

    .stat-icon-wrapper {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;

      &.info {
        background: #e0f2fe;
        color: #0284c7;
      }

      &.teal {
        background: #ccfbf1;
        color: #0f766e;
      }

      &.success {
        background: #dcfce7;
        color: #16a34a;
      }

      &.warning {
        background: #fee2e2;
        color: #dc2626;
      }
    }

    .stat-content {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .stat-label {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: ${({ theme }) => theme.palette.customColors.textMuted};
    }

    .stat-value {
      font-size: 20px;
      font-weight: 700;
      color: ${({ theme }) => theme.palette.customColors.heading};
      line-height: 1.2;
    }

    .stat-subtext {
      font-size: 12px;
      color: ${({ theme }) => theme.palette.customColors.textMuted};
    }
  }

  .invoices-toolbar {
    background: ${({ theme }) => theme.palette.customColors.cardBg};
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
    border-radius: 12px;
    padding: 14px 18px;
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;

    .toolbar-field {
      height: 38px;
    }

    .search-input {
      flex: 1 1 200px;
      min-width: 180px;

      .MuiInputBase-root {
        height: 38px;
        border-radius: 8px;
        font-size: 13px;
        background: ${({ theme }) => theme.palette.customColors.inputBg};
      }
    }

    .select-field {
      width: 140px;

      .MuiInputBase-root {
        height: 38px;
        border-radius: 8px;
        font-size: 13px;
        background: ${({ theme }) => theme.palette.customColors.inputBg};
      }
    }

    .date-field {
      width: 130px;

      .MuiInputBase-root {
        height: 38px;
        border-radius: 8px;
        font-size: 13px;
        background: ${({ theme }) => theme.palette.customColors.inputBg};
      }
    }

    .reset-btn {
      height: 38px;
      border-radius: 8px;
      text-transform: none;
      font-size: 13px;
      font-weight: 600;
      color: ${({ theme }) => theme.palette.customColors.heading};
      border-color: ${({ theme }) => theme.palette.customColors.border};
      padding: 0 14px;
      display: inline-flex;
      gap: 6px;
      align-items: center;
    }

    .new-btn {
      height: 38px;
      border-radius: 8px;
      text-transform: none;
      font-size: 13px;
      font-weight: 600;
      background: ${({ theme }) => theme.palette.customColors.brandTeal};
      color: #ffffff;
      padding: 0 16px;
      box-shadow: none;

      &:hover {
        background: ${({ theme }) => theme.palette.customColors.brandTealDark};
      }
    }
  }

  .table-card {
    background: ${({ theme }) => theme.palette.customColors.cardBg};
    border-radius: 14px;
    overflow: hidden;
  }

  .patient-cell {
    display: flex;
    align-items: center;
    gap: 10px;

    .patient-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #0f766e;
      color: #ffffff;
      font-size: 13px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .patient-info {
      display: flex;
      flex-direction: column;
    }

    .patient-name {
      font-size: 13px;
      font-weight: 600;
      color: ${({ theme }) => theme.palette.customColors.heading};
    }

    .patient-phone {
      font-size: 12px;
      color: ${({ theme }) => theme.palette.customColors.textMuted};
    }
  }

  .tag-cash {
    display: inline-block;
    padding: 2px 8px;
    background: #ecfdf5;
    color: #059669;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 600;
  }

  .tag-unpaid {
    display: inline-block;
    padding: 2px 8px;
    background: #ebf5ff;
    color: #2563eb;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 600;
  }

  .discount-text {
    color: #ef4444;
    font-weight: 500;
  }

  .grand-total-text {
    font-weight: 700;
    color: ${({ theme }) => theme.palette.customColors.heading};
  }

  .table-actions {
    display: flex;
    align-items: center;
    gap: 6px;

    .action-btn {
      width: 30px;
      height: 30px;
      border: 1px solid ${({ theme }) => theme.palette.customColors.border};
      border-radius: 6px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: ${({ theme }) => theme.palette.customColors.textMuted};
      background: transparent;
      padding: 0;
      transition: all 0.15s ease;

      &:hover {
        background: ${({ theme }) => theme.palette.customColors.hoverBg};
        color: ${({ theme }) => theme.palette.customColors.brandTeal};
        border-color: ${({ theme }) => theme.palette.customColors.brandTeal};
      }

      &.void-btn:hover {
        color: #ef4444;
        border-color: #ef4444;
      }
    }
  }

  .table-footer {
    padding: 12px 16px;
    font-size: 12.5px;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
    border-top: 1px solid ${({ theme }) => theme.palette.customColors.border};
  }
`;
