'use client';

import { Box, styled } from '@mui/material';

export const ManagePrescriptionWrapper = styled(Box)`
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .patient-head,
  .workspace-nav,
  .section-card,
  .nested-card,
  .actions-bar {
    min-width: 0;
    border-radius: 14px;
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
    background: ${({ theme }) => theme.palette.customColors.cardBg};
    box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04);
  }

  .section-card,
  .nested-card,
  .actions-bar {
    padding: 20px 24px;
  }

  .patient-head {
    display: flex;
    flex-direction: column;
    gap: 18px;
    padding: 20px 24px;
    overflow: hidden;
    background: linear-gradient(
      180deg,
      ${({ theme }) => theme.palette.customColors.brandTealLight} 0%,
      ${({ theme }) => theme.palette.customColors.cardBg} 100%
    );
  }

  .patient-identity {
    display: flex;
    align-items: center;
    gap: 16px;
    min-width: 0;
  }

  .patient-avatar {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 22px;
    font-weight: 700;
    color: ${({ theme }) => theme.palette.common.white};
    background: ${({ theme }) => theme.palette.customColors.brandTeal};
    border: 3px solid ${({ theme }) => theme.palette.customColors.cardBg};
    box-shadow: 0 4px 14px rgba(15, 23, 42, 0.1);

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

  .patient-copy {
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 0;
  }

  .patient-title-row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px 10px;
  }

  .patient-name {
    margin: 0;
    font-size: 20px;
    font-weight: 700;
    line-height: 26px;
    color: ${({ theme }) => theme.palette.customColors.heading};
  }

  .code-chip {
    display: inline-flex;
    align-items: center;
    height: 22px;
    padding: 0 8px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 700;
    color: ${({ theme }) => theme.palette.customColors.brandTeal};
    background: ${({ theme }) => theme.palette.customColors.cardBg};
    border: 1px solid ${({ theme }) => theme.palette.customColors.brandTeal};
  }

  .patient-meta {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px 16px;
  }

  .meta-item {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    font-weight: 500;
    line-height: 18px;
    color: ${({ theme }) => theme.palette.customColors.textSecondary};

    .MuiSvgIcon-root {
      font-size: 16px;
      color: ${({ theme }) => theme.palette.customColors.brandTeal};
    }
  }

  .patient-stats {
    padding-top: 16px;
    border-top: 1px solid ${({ theme }) => theme.palette.customColors.border};
  }

  .stat-cell {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
    padding: 0 16px;

    &:first-of-type {
      padding-left: 0;
    }

    &:last-of-type {
      padding-right: 0;
    }
  }

  .stat-label {
    margin: 0;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
  }

  .stat-value {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    color: ${({ theme }) => theme.palette.customColors.heading};
  }

  .workspace-nav {
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .tabs-head {
    width: 100%;
    padding: 0 12px;
    border-bottom: 1px solid ${({ theme }) => theme.palette.customColors.border};
  }

  .workspace-tabs.MuiTabs-root {
    min-height: 52px;
    width: 100%;

    .MuiTabs-indicator {
      height: 3px;
      border-radius: 3px 3px 0 0;
      background: ${({ theme }) => theme.palette.customColors.brandTeal};
    }

    .MuiTabs-scrollButtons.Mui-disabled {
      opacity: 0.3;
    }
  }

  .workspace-tab.MuiTab-root {
    min-height: 52px;
    padding: 0 16px;
    gap: 6px;
    text-transform: none;
    font-size: 13px;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.customColors.textSecondary};

    .MuiSvgIcon-root {
      font-size: 18px;
      margin-bottom: 0;
    }

    &:hover {
      color: ${({ theme }) => theme.palette.customColors.heading};
    }

    &.Mui-selected {
      color: ${({ theme }) => theme.palette.customColors.brandTeal};
    }
  }

  .sub-tabs-row {
    width: 100%;
    padding: 12px 16px 14px;
    background: ${({ theme }) => theme.palette.customColors.pageBg};
  }

  .sub-tabs.MuiTabs-root {
    min-height: 0;
    width: 100%;
    padding: 4px;
    border-radius: 12px;
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
    background: ${({ theme }) => theme.palette.customColors.cardBg};

    .MuiTabs-flexContainer {
      gap: 4px;
    }

    .MuiTabs-indicator {
      display: none;
    }

    .MuiTabs-scroller {
      overflow: auto hidden !important;
    }
  }

  .sub-tab.MuiTab-root {
    min-height: 40px;
    min-width: 0;
    flex: 1;
    padding: 8px 14px;
    gap: 8px;
    border-radius: 9px;
    text-transform: none;
    font-size: 13px;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.customColors.textSecondary};
    opacity: 1;

    .MuiSvgIcon-root {
      font-size: 18px;
      margin-bottom: 0;
      padding: 3px;
      border-radius: 7px;
      background: ${({ theme }) => theme.palette.customColors.brandTealLight};
      color: ${({ theme }) => theme.palette.customColors.brandTeal};
    }

    &:hover {
      color: ${({ theme }) => theme.palette.customColors.heading};
      background: ${({ theme }) => theme.palette.customColors.hoverBg};
    }

    &.Mui-selected {
      color: ${({ theme }) => theme.palette.common.white};
      background: ${({ theme }) => theme.palette.customColors.brandTeal};

      .MuiSvgIcon-root {
        color: ${({ theme }) => theme.palette.customColors.brandTeal};
        background: ${({ theme }) => theme.palette.common.white};
      }
    }

    &.Mui-selected:hover {
      color: ${({ theme }) => theme.palette.common.white};
      background: ${({ theme }) => theme.palette.customColors.brandTealDark};

      .MuiSvgIcon-root {
        color: ${({ theme }) => theme.palette.customColors.brandTealDark};
        background: ${({ theme }) => theme.palette.common.white};
      }
    }
  }

  .section-card {
    display: flex;
    flex-direction: column;
    gap: 16px;
    height: 100%;
  }

  .card-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .card-title-wrap {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
  }

  .card-icon {
    width: 28px;
    height: 28px;
    border-radius: 8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: ${({ theme }) => theme.palette.customColors.brandTeal};
    background: ${({ theme }) => theme.palette.customColors.brandTealLight};

    .MuiSvgIcon-root {
      font-size: 16px;
    }
  }

  .card-title {
    margin: 0;
    font-size: 15px;
    font-weight: 700;
    line-height: 22px;
    color: ${({ theme }) => theme.palette.customColors.heading};
  }

  .nested-card {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 18px 20px;
    border-color: ${({ theme }) => theme.palette.customColors.brandTeal}55;
    box-shadow: none;
  }

  .chip-add-row,
  .vital-add-row {
    display: flex;
    align-items: flex-end;
    gap: 10px;
    min-width: 0;

    > .MuiTextField-root,
    > .MuiBox-root {
      flex: 1;
      min-width: 0;
    }
  }

  .vital-add-row > .MuiBox-root,
  .vital-add-row > .MuiTextField-root {
    flex: 1;
  }

  .add-btn.MuiButton-root,
  .ghost-btn.MuiButton-root,
  .action-btn.MuiButton-root {
    height: 44px;
    min-width: 0;
    padding: 0 16px;
    border-radius: 10px;
    font-size: 13px;
    font-weight: 600;
    text-transform: none;
    white-space: nowrap;
    flex-shrink: 0;
    box-shadow: none;
  }

  .add-btn.MuiButton-root {
    color: ${({ theme }) => theme.palette.common.white};
    background: ${({ theme }) => theme.palette.customColors.brandTeal};

    &:hover {
      background: ${({ theme }) => theme.palette.customColors.brandTealDark};
    }
  }

  .ghost-btn.MuiButton-root {
    color: ${({ theme }) => theme.palette.customColors.heading};
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
    background: ${({ theme }) => theme.palette.customColors.cardBg};

    &:hover {
      border-color: ${({ theme }) => theme.palette.customColors.brandTeal};
      color: ${({ theme }) => theme.palette.customColors.brandTeal};
      background: ${({ theme }) => theme.palette.customColors.hoverBg};
    }
  }

  .unit-adornment {
    font-size: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
    white-space: nowrap;
  }

  .select-placeholder {
    font-size: 13px;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
  }

  .is-required .inputLabel-txt-global::after {
    content: '*';
    margin-left: 2px;
    font-weight: 700;
    color: ${({ theme }) => theme.palette.customColors.error};
  }

  .split-field {
    display: grid;
    grid-template-columns: 1fr 88px;
    gap: 8px;
    align-items: end;
  }

  .custom-vital-block {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-top: 4px;
  }

  .custom-vital-label {
    margin: 0;
    font-size: 13px;
    font-weight: 700;
    color: ${({ theme }) => theme.palette.customColors.heading};
  }

  .prescription-table {
    border-radius: 10px;
    box-shadow: none !important;
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};

    &:hover {
      box-shadow: none !important;
    }

    .MuiTableHead-root .MuiTableCell-root {
      padding: 12px 16px;
    }

    .stickyContainer {
      max-height: none;
    }
  }

  .actions-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }

  .scroll-to-end.MuiIconButton-root {
    position: fixed;
    right: 28px;
    bottom: 28px;
    z-index: 12;
    width: 48px;
    height: 48px;
    color: ${({ theme }) => theme.palette.common.white};
    background: ${({ theme }) => theme.palette.customColors.brandTeal};
    box-shadow: 0 8px 20px rgba(15, 23, 42, 0.16);

    &:hover {
      background: ${({ theme }) => theme.palette.customColors.brandTealDark};
    }
  }

  .status-copy {
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-width: 0;
  }

  .status-meta {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 4px 16px;
  }

  .status-pdf {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin: 0;
    font-size: 13px;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.customColors.brandTeal};

    .MuiSvgIcon-root {
      font-size: 18px;
    }
  }

  .status-line {
    margin: 0;
    font-size: 13px;
    color: ${({ theme }) => theme.palette.customColors.textSecondary};

    strong {
      font-weight: 600;
      color: ${({ theme }) => theme.palette.customColors.heading};
    }
  }

  .actions-group {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 10px;
  }

  .action-btn.MuiButton-root.MuiButton-outlined {
    color: ${({ theme }) => theme.palette.customColors.heading};
    border-color: ${({ theme }) => theme.palette.customColors.border};
    background: ${({ theme }) => theme.palette.customColors.cardBg};

    &:hover {
      border-color: ${({ theme }) => theme.palette.customColors.brandTeal};
      color: ${({ theme }) => theme.palette.customColors.brandTeal};
      background: ${({ theme }) => theme.palette.customColors.hoverBg};
    }
  }

  .action-btn.MuiButton-root.MuiButton-contained {
    color: ${({ theme }) => theme.palette.common.white};
    background: ${({ theme }) => theme.palette.customColors.brandTeal};

    &:hover {
      background: ${({ theme }) => theme.palette.customColors.brandTealDark};
    }
  }

  ${({ theme }) => theme.breakpoints.up('md')} {
    .stat-cell + .stat-cell {
      border-left: 1px solid ${({ theme }) => theme.palette.customColors.border};
    }
  }

  ${({ theme }) => theme.breakpoints.down('md')} {
    .patient-head,
    .section-card,
    .nested-card,
    .actions-bar {
      padding: 18px 20px;
    }

    .actions-bar {
      flex-direction: column;
      align-items: stretch;
    }

    .actions-group {
      justify-content: stretch;
    }

    .action-btn.MuiButton-root {
      flex: 1;
    }
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    gap: 16px;

    .patient-head,
    .workspace-nav,
    .section-card,
    .nested-card,
    .actions-bar {
      border-radius: 12px;
    }

    .patient-head,
    .section-card,
    .nested-card,
    .actions-bar {
      padding: 16px;
    }

    .scroll-to-end.MuiIconButton-root {
      right: 16px;
      bottom: 16px;
    }

    .patient-avatar {
      width: 48px;
      height: 48px;
      font-size: 18px;
    }

    .patient-name {
      font-size: 17px;
      line-height: 22px;
    }

    .stat-cell {
      padding: 8px 0 0;
    }

    .tabs-head {
      padding: 0 4px;
    }

    .sub-tabs-row {
      padding: 10px 12px 12px;
    }

    .chip-add-row,
    .vital-add-row {
      flex-direction: column;
      align-items: stretch;
    }

    .add-btn.MuiButton-root,
    .ghost-btn.MuiButton-root,
    .action-btn.MuiButton-root {
      width: 100%;
    }

    .split-field {
      grid-template-columns: 1fr 80px;
    }
  }
`;
