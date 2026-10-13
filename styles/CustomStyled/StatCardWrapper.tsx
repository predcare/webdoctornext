"use client"
import { Box, styled } from '@mui/material';

export const StatCardWrapper = styled(Box)`
  min-height: 132px;
  display: flex;
  flex-direction: column;
  padding: 16px 16px 14px;
  border-radius: 16px;
  background: ${({ theme }) => theme.palette.customColors.cardBg};
  border: 1px solid ${({ theme }) => theme.palette.customColors.border};
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);

  .stat-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 16px;
  }

  .stat-icon {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .stat-period {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    line-height: 16px;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
  }

  .stat-title {
    margin: 0;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    color: ${({ theme }) => theme.palette.customColors.textSecondary};
  }

  .stat-value {
    margin: 2px 0 0;
    font-size: 28px;
    font-weight: 700;
    line-height: 34px;
    color: ${({ theme }) => theme.palette.customColors.heading};
  }

  &.tone-info .stat-icon {
    background: ${({ theme }) => theme.palette.customColors.infoBg};
    color: ${({ theme }) => theme.palette.customColors.info};
  }

  &.tone-teal .stat-icon {
    background: ${({ theme }) => theme.palette.customColors.brandTealLight};
    color: ${({ theme }) => theme.palette.customColors.brandTeal};
  }

  &.tone-warning .stat-icon {
    background: ${({ theme }) => theme.palette.customColors.warningBg};
    color: ${({ theme }) => theme.palette.customColors.warning};
  }

  &.tone-success .stat-icon {
    background: ${({ theme }) => theme.palette.customColors.successBg};
    color: ${({ theme }) => theme.palette.customColors.success};
  }

  &.compact {
    min-height: 0;
    flex-direction: row;
    align-items: center;
    gap: 12px;
    padding: 12px 14px;
    border-radius: 12px;

    .stat-icon {
      width: 36px;
      height: 36px;
      border-radius: 10px;
    }

    .stat-copy {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    .stat-title {
      font-size: 12px;
      font-weight: 600;
      line-height: 16px;
    }

    .stat-value {
      margin-top: 2px;
      font-size: 20px;
      line-height: 24px;
    }

    .stat-period {
      margin-top: 1px;
      font-size: 10px;
      letter-spacing: 0.04em;
    }
  }
`;

export const DashboardStatsGrid = styled(Box)`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;

  ${({ theme }) => theme.breakpoints.up('sm')} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
  }

  ${({ theme }) => theme.breakpoints.up('lg')} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  &.fit-row {
    ${({ theme }) => theme.breakpoints.up('md')} {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    ${({ theme }) => theme.breakpoints.up('lg')} {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }

    > * {
      min-width: 0;
    }
  }
`;
