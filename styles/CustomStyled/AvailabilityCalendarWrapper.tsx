'use client';

import { Box, styled } from '@mui/material';

export const AvailabilityCalendarWrapper = styled(Box)`
  min-width: 0;

  .calendar-card {
    min-width: 0;
    overflow: hidden;
    border-radius: 12px;
    background: ${({ theme }) => theme.palette.customColors.cardBg};
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
  }

  .calendar-top,
  .calendar-toolbar,
  .legend {
    padding-left: 16px;
    padding-right: 16px;
  }

  .calendar-top {
    padding-top: 14px;
    padding-bottom: 4px;
  }

  .calendar-title {
    margin: 0;
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
    color: ${({ theme }) => theme.palette.customColors.heading};
  }

  .calendar-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
    padding-top: 8px;
    padding-bottom: 8px;
  }

  .month-controls {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    flex-wrap: wrap;
  }

  .nav-btn.MuiIconButton-root {
    width: 28px;
    height: 28px;
    color: ${({ theme }) => theme.palette.customColors.heading};
  }

  .month-label {
    margin: 0;
    min-width: 132px;
    font-size: 18px;
    font-weight: 700;
    line-height: 24px;
    color: ${({ theme }) => theme.palette.customColors.heading};
  }

  .today-btn.MuiButton-root {
    height: 32px;
    min-width: 64px;
    padding: 0 12px;
    border-radius: 8px;
    text-transform: none;
    font-size: 13px;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.customColors.heading};
    border-color: ${({ theme }) => theme.palette.customColors.border};
    background: ${({ theme }) => theme.palette.customColors.cardBg};

    &:hover {
      border-color: ${({ theme }) => theme.palette.customColors.brandTeal};
      color: ${({ theme }) => theme.palette.customColors.brandTeal};
      background: ${({ theme }) => theme.palette.customColors.hoverBg};
    }
  }

  .key-hint {
    margin: 0;
    font-size: 12px;
    line-height: 16px;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
  }

  .stats {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-left: auto;
  }

  .stat {
    display: flex;
    align-items: baseline;
    gap: 6px;
    padding: 0 14px;
  }

  .stat + .stat {
    border-left: 1px solid ${({ theme }) => theme.palette.customColors.border};
  }

  .stat-label {
    font-size: 12px;
    line-height: 16px;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
  }

  .stat-value {
    font-size: 14px;
    font-weight: 700;
    line-height: 18px;
    color: ${({ theme }) => theme.palette.customColors.heading};
  }

  .legend {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
    padding-bottom: 12px;
  }

  .legend-item {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    line-height: 16px;
    color: ${({ theme }) => theme.palette.customColors.textSecondary};
  }

  .swatch {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }

  .swatch.available {
    background: #3dbe9a;
  }

  .swatch.booked {
    background: #ef4444;
  }

  .legend-icon.MuiSvgIcon-root {
    font-size: 14px;
    color: ${({ theme }) => theme.palette.customColors.textSecondary};
  }

  .swatch.leave {
    width: 10px;
    height: 2px;
    border-radius: 1px;
    background: ${({ theme }) => theme.palette.customColors.textMuted};
  }

  .weekday-row,
  .day-grid {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
  }

  .weekday-label {
    margin: 0;
    padding: 8px 10px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
    background: ${({ theme }) => theme.palette.customColors.pageBg};
    border-top: 1px solid ${({ theme }) => theme.palette.customColors.border};
    border-right: 1px solid ${({ theme }) => theme.palette.customColors.border};

    &:nth-of-type(7n) {
      border-right: 0;
    }
  }

  .day-cell {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-height: 168px;
    padding: 8px;
    background: ${({ theme }) => theme.palette.customColors.cardBg};
    border-top: 1px solid ${({ theme }) => theme.palette.customColors.border};
    border-right: 1px solid ${({ theme }) => theme.palette.customColors.border};

    &:nth-of-type(7n) {
      border-right: 0;
    }

    &.is-outside {
      background: ${({ theme }) => theme.palette.customColors.pageBg};
    }

    &.is-today {
      box-shadow: inset 0 0 0 1px ${({ theme }) => theme.palette.customColors.brandTeal};
      z-index: 1;
    }
  }

  .day-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 6px;
  }

  .day-number {
    font-size: 13px;
    font-weight: 600;
    line-height: 18px;
    color: ${({ theme }) => theme.palette.customColors.heading};
  }

  .is-outside .day-number {
    color: ${({ theme }) => theme.palette.customColors.textMuted};
    font-weight: 500;
  }

  .open-count {
    font-size: 11px;
    font-weight: 600;
    line-height: 16px;
    white-space: nowrap;
    color: ${({ theme }) => theme.palette.customColors.brandTeal};
  }

  .no-slots,
  .leave-label {
    font-size: 12px;
    line-height: 16px;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
  }

  .slot-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
    max-height: 132px;
    margin: 0;
    padding: 0 2px 16px 0;
    overflow: auto;
  }

  .slot-chip {
    display: flex;
    align-items: center;
    gap: 4px;
    min-width: 0;
    padding: 3px 6px;
    border-radius: 6px;
    background: #e7f8f2;
    color: ${({ theme }) => theme.palette.customColors.heading};
  }

  .slot-chip.is-booked {
    background: #fdecec;
    color: #dc2626;

    .slot-label {
      text-decoration: line-through;
    }
  }

  .slot-icon.MuiSvgIcon-root {
    flex: 0 0 auto;
    font-size: 13px;
  }

  .slot-label {
    min-width: 0;
    overflow: hidden;
    font-size: 11px;
    font-weight: 600;
    line-height: 16px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .more-btn.MuiIconButton-root {
    position: absolute;
    right: 4px;
    bottom: 2px;
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
  }
`;
