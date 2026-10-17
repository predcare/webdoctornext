'use client';

import { Box, styled } from '@mui/material';

export const BookAppointmentWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 20px;
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

  .book-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    min-width: 0;
  }

  .book-card {
    min-width: 0;
    padding: 24px;
    border-radius: 16px;
    background: ${({ theme }) => theme.palette.customColors.cardBg};
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
    box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
  }

  .card-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 16px;
  }

  .card-title {
    margin: 0;
    font-size: 15px;
    font-weight: 700;
    line-height: 22px;
    color: ${({ theme }) => theme.palette.customColors.heading};

    &.required::after {
      content: '*';
      margin-left: 2px;
      color: ${({ theme }) => theme.palette.customColors.error};
    }
  }

  .book-card > .card-title {
    margin-bottom: 16px;
  }

  .patient-search-foot {
    display: flex;
    justify-content: flex-end;
    margin-top: 8px;
  }

  .card-link {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 13px;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.customColors.brandTeal};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  .option-copy {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .option-title,
  .option-note {
    margin: 0;
  }

  .option-title {
    font-size: 13px;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.customColors.heading};
  }

  .option-note {
    font-size: 12px;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
  }

  .change-patient-btn.MuiButton-root {
    min-width: 0;
    padding: 0;
    text-transform: none;
    background: transparent;

    &:hover {
      background: transparent;
    }
  }

  .selected-panel {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 12px;
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
    border-left: 3px solid
      ${({ theme }) => theme.palette.customColors.brandTeal};
    background: ${({ theme }) => theme.palette.customColors.pageBg};
  }

  .selected-avatar.MuiAvatar-root {
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    font-size: 14px;
    font-weight: 700;
    color: ${({ theme }) => theme.palette.customColors.brandTeal};
    background: ${({ theme }) => theme.palette.customColors.brandTealLight};
  }

  .selected-copy {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1;
    min-width: 0;
  }

  .selected-title-row {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
  }

  .selected-name {
    margin: 0;
    overflow: hidden;
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: ${({ theme }) => theme.palette.customColors.heading};
  }

  .selected-id {
    flex-shrink: 0;
    padding: 0 6px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 600;
    line-height: 18px;
    color: ${({ theme }) => theme.palette.customColors.brandTeal};
    background: ${({ theme }) => theme.palette.customColors.brandTealLight};
  }

  .selected-meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 2px 12px;
    font-size: 12px;
    line-height: 18px;
    color: ${({ theme }) => theme.palette.customColors.textMuted};

    span {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      min-width: 0;
      overflow-wrap: anywhere;
    }

    .selected-profile {
      text-transform: capitalize;
    }

    .MuiSvgIcon-root {
      font-size: 13px;
    }
  }

  .choice-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;

    &.three {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  .choice-card {
    display: flex;
    align-items: center;
    gap: 12px;
    min-height: 76px;
    padding: 14px 16px;
    border-radius: 14px;
    width: 100%;
    font: inherit;
    text-align: left;
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
    background: ${({ theme }) => theme.palette.customColors.cardBg};
    cursor: pointer;
    transition:
      border-color 0.18s ease,
      background 0.18s ease,
      box-shadow 0.18s ease;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }

    .choice-icon {
      width: 44px;
      height: 44px;
      flex-shrink: 0;
      border-radius: 12px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: ${({ theme }) => theme.palette.customColors.brandTeal};
      background: ${({ theme }) => theme.palette.customColors.brandTealLight};

      .MuiSvgIcon-root,
      svg {
        font-size: 20px;
      }
    }

    .choice-copy {
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-width: 0;
      flex: 1;
    }

    .choice-label,
    .choice-hint {
      margin: 0;
    }

    .choice-label {
      font-size: 14px;
      font-weight: 700;
      line-height: 20px;
      color: ${({ theme }) => theme.palette.customColors.heading};
    }

    .choice-hint {
      font-size: 12px;
      font-weight: 500;
      line-height: 16px;
      color: ${({ theme }) => theme.palette.customColors.textMuted};
    }

    .choice-check {
      flex-shrink: 0;
      font-size: 18px;
      color: ${({ theme }) => theme.palette.customColors.brandTeal};
    }

    &:hover {
      border-color: ${({ theme }) => theme.palette.customColors.brandTeal};
    }

    &.active {
      border-color: ${({ theme }) => theme.palette.customColors.brandTeal};
      background: ${({ theme }) => theme.palette.customColors.brandTealLight};
      box-shadow: 0 8px 20px
        ${({ theme }) => theme.palette.customColors.brandTealGlow};
    }
  }

  .date-heading {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;

    .card-title {
      margin-bottom: 0;
    }
  }

  .date-month {
    margin: 0;
    font-size: 12px;
    font-weight: 600;
    line-height: 16px;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
  }

  .date-nav {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .calendar-btn.MuiIconButton-root,
  .nav-btn.MuiIconButton-root {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
    color: ${({ theme }) => theme.palette.customColors.heading};
    background: ${({ theme }) => theme.palette.customColors.cardBg};

    &:hover {
      border-color: ${({ theme }) => theme.palette.customColors.brandTeal};
      color: ${({ theme }) => theme.palette.customColors.brandTeal};
      background: ${({ theme }) => theme.palette.customColors.hoverBg};
    }
  }

  .calendar-btn.MuiIconButton-root {
    border-color: ${({ theme }) => theme.palette.customColors.brandTeal};
    color: ${({ theme }) => theme.palette.customColors.brandTeal};
    background: ${({ theme }) => theme.palette.customColors.brandTealLight};
  }

  .calendar-btn.MuiIconButton-root.Mui-disabled,
  .nav-btn.MuiIconButton-root.Mui-disabled {
    opacity: 0.45;
    border-color: ${({ theme }) => theme.palette.customColors.border};
    color: ${({ theme }) => theme.palette.customColors.textMuted};
    background: ${({ theme }) => theme.palette.customColors.cardBg};
  }

  .date-lock-hint {
    margin: -8px 0 12px;
    font-size: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
  }

  .empty-hint {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    min-height: 86px;
    padding: 16px;
    border-radius: 12px;
    border: 1px dashed ${({ theme }) => theme.palette.customColors.border};
    background: ${({ theme }) => theme.palette.customColors.pageBg};
    text-align: center;

    p {
      margin: 0;
      font-size: 13px;
      font-weight: 500;
      color: ${({ theme }) => theme.palette.customColors.textMuted};
    }
  }

  .date-skeleton {
    flex: 0 0 92px;
  }

  .slot-group-skeleton,
  .card-title-skeleton {
    margin-bottom: 12px;
  }

  .date-row {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    scrollbar-width: thin;
  }

  .date-card {
    position: relative;
    display: flex;
    flex: 0 0 92px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0;
    min-height: 86px;
    min-width: 0;
    padding: 10px 8px 8px;
    overflow: hidden;
    border-radius: 12px;
    font: inherit;
    text-transform: none;
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
    background: ${({ theme }) => theme.palette.customColors.cardBg};
    text-align: center;
    cursor: pointer;
    transition:
      border-color 0.18s ease,
      box-shadow 0.18s ease,
      opacity 0.18s ease;

    &.disabled {
      cursor: not-allowed;
      opacity: 0.5;

      &:hover {
        border-color: ${({ theme }) => theme.palette.customColors.border};
      }
    }

    .weekday,
    .day-num,
    .month {
      margin: 0;
    }

    .weekday {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: ${({ theme }) => theme.palette.customColors.textMuted};
    }

    .day-num {
      font-size: 20px;
      font-weight: 700;
      line-height: 24px;
      color: ${({ theme }) => theme.palette.customColors.heading};
    }

    .month {
      font-size: 11px;
      font-weight: 600;
      color: ${({ theme }) => theme.palette.customColors.textSecondary};
    }

    .slot-pill {
      margin-top: 6px;
      display: inline-flex;
      align-items: center;
      height: 18px;
      padding: 0 6px;
      border-radius: 999px;
      font-size: 10px;
      font-weight: 600;
      color: ${({ theme }) => theme.palette.customColors.textMuted};
      background: ${({ theme }) => theme.palette.customColors.pageBg};
    }

    &:hover {
      border-color: ${({ theme }) => theme.palette.customColors.brandTeal};
    }

    &.active {
      border-color: ${({ theme }) => theme.palette.customColors.brandTeal};
      box-shadow: 0 8px 20px
        ${({ theme }) => theme.palette.customColors.brandTealGlow};

      &::before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        height: 3px;
        background: ${({ theme }) => theme.palette.customColors.brandTeal};
      }

      .day-num {
        color: ${({ theme }) => theme.palette.customColors.brandTeal};
      }

      .slot-pill {
        color: ${({ theme }) => theme.palette.customColors.brandTeal};
        background: ${({ theme }) => theme.palette.customColors.brandTealLight};
      }
    }
  }

  .slot-group + .slot-group {
    margin-top: 20px;
  }

  .slot-group-head {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
    padding: 8px 12px;
    border-radius: 10px;
    background: ${({ theme }) => theme.palette.customColors.pageBg};
  }

  .slot-label {
    margin: 0;
    font-size: 13px;
    font-weight: 700;
    color: ${({ theme }) => theme.palette.customColors.heading};
  }

  .slot-count {
    margin-left: auto;
    padding: 2px 8px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 700;
    color: ${({ theme }) => theme.palette.customColors.brandTeal};
    background: ${({ theme }) => theme.palette.customColors.brandTealLight};
  }

  .slot-list {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 8px;
  }

  .slot-chip {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 36px;
    padding: 6px 8px;
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
    background: ${({ theme }) => theme.palette.customColors.cardBg};
    font-family: inherit;
    font-size: 12px;
    font-weight: 600;
    line-height: 16px;
    text-align: center;
    color: ${({ theme }) => theme.palette.customColors.textSecondary};
    cursor: pointer;
    transition:
      border-color 0.15s ease,
      color 0.15s ease,
      background 0.15s ease,
      box-shadow 0.15s ease;

    &:hover {
      border-color: ${({ theme }) => theme.palette.customColors.brandTeal};
      color: ${({ theme }) => theme.palette.customColors.brandTeal};
    }

    &.active {
      color: ${({ theme }) => theme.palette.customColors.brandTeal};
      background: ${({ theme }) => theme.palette.customColors.brandTealLight};
      border-color: ${({ theme }) => theme.palette.customColors.brandTeal};
      box-shadow: 0 4px 12px
        ${({ theme }) => theme.palette.customColors.brandTealGlow};
    }

    &.booked {
      cursor: not-allowed;
      opacity: 0.5;
      text-decoration: line-through;
      color: ${({ theme }) => theme.palette.customColors.textMuted};
      background: ${({ theme }) => theme.palette.customColors.pageBg};

      &:hover {
        border-color: ${({ theme }) => theme.palette.customColors.border};
        color: ${({ theme }) => theme.palette.customColors.textMuted};
      }
    }
  }

  .summary-card {
    padding: 20px;
    border-radius: 16px;
    background: ${({ theme }) => theme.palette.customColors.cardBg};
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
    box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
  }

  .summary-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 14px;
  }

  .summary-title {
    margin: 0;
    font-size: 15px;
    font-weight: 700;
    line-height: 22px;
    color: ${({ theme }) => theme.palette.customColors.heading};
  }

  .summary-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px 16px;
  }

  .summary-item {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
    padding: 8px 0;
    border-bottom: 1px dashed
      ${({ theme }) => theme.palette.customColors.border};
  }

  .summary-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    flex-shrink: 0;
    border-radius: 8px;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
    background: ${({ theme }) => theme.palette.customColors.pageBg};

    .MuiSvgIcon-root {
      font-size: 16px;
    }
  }

  .summary-item.filled .summary-icon {
    color: ${({ theme }) => theme.palette.customColors.brandTeal};
    background: ${({ theme }) => theme.palette.customColors.brandTealLight};
  }

  .summary-copy {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .summary-label,
  .summary-value {
    margin: 0;
  }

  .summary-label {
    font-size: 11px;
    font-weight: 600;
    line-height: 16px;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
  }

  .summary-value {
    overflow: hidden;
    font-size: 13px;
    font-weight: 700;
    line-height: 18px;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: ${({ theme }) => theme.palette.customColors.heading};

    &.muted {
      font-weight: 500;
      color: ${({ theme }) => theme.palette.customColors.textMuted};
    }
  }

  .summary-total {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-top: 14px;
    padding: 12px 14px;
    border-radius: 12px;
    background: ${({ theme }) => theme.palette.customColors.brandTealLight};
  }

  .summary-total-skeleton {
    margin-top: 14px;
  }

  .summary-total-label,
  .summary-total-note,
  .summary-total-amount {
    margin: 0;
  }

  .summary-total-label {
    font-size: 13px;
    font-weight: 700;
    line-height: 18px;
    color: ${({ theme }) => theme.palette.customColors.heading};
  }

  .summary-total-note {
    font-size: 11px;
    line-height: 16px;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
  }

  .summary-total-amount {
    flex-shrink: 0;
    font-size: 20px;
    font-weight: 800;
    line-height: 26px;
    color: ${({ theme }) => theme.palette.customColors.brandTeal};
  }

  .confirm-wrap {
    display: flex;
    justify-content: center;
  }

  .confirm-btn.MuiButton-root {
    height: 44px;
    min-width: 200px;
    padding-left: 28px;
    padding-right: 28px;
    border-radius: 10px;
    text-transform: none;
    font-size: 14px;
    font-weight: 700;
    box-shadow: none;
  }

  ${({ theme }) => theme.breakpoints.down('lg')} {
    .slot-list {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  ${({ theme }) => theme.breakpoints.down('md')} {
    .choice-grid.three {
      grid-template-columns: 1fr;
    }

    .slot-list {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    gap: 16px;

    .book-form {
      gap: 16px;
    }

    .book-card,
    .summary-card {
      padding: 16px;
    }

    .choice-grid {
      grid-template-columns: 1fr;
    }

    .selected-panel {
      align-items: flex-start;
    }

    .summary-grid {
      grid-template-columns: 1fr;
    }

    .confirm-btn.MuiButton-root {
      width: 100%;
    }
  }
`;
