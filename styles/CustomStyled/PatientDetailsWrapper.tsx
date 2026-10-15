'use client';

import { Box, styled } from '@mui/material';

export const PatientDetailsWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 24px;
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

  .detail-card {
    min-width: 0;
    border-radius: 16px;
    background: ${({ theme }) => theme.palette.customColors.cardBg};
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
    box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
    overflow: hidden;
  }

  /* Profile card */
  .profile-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding: 24px;
    border-bottom: 1px solid ${({ theme }) => theme.palette.customColors.border};
    background: linear-gradient(
      180deg,
      ${({ theme }) => theme.palette.customColors.brandTealLight} 0%,
      ${({ theme }) => theme.palette.customColors.cardBg} 100%
    );
  }

  .profile-identity {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 18px;
    min-width: 0;
  }

  .profile-avatar {
    position: relative;
    width: 72px;
    height: 72px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: ${({ theme }) => theme.palette.common.white};
    font-size: 28px;
    font-weight: 700;
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

  .avatar-badge {
    position: absolute;
    right: -2px;
    bottom: -2px;
    font-size: 22px;
    border-radius: 50%;
    color: ${({ theme }) => theme.palette.customColors.success};
    background: ${({ theme }) => theme.palette.customColors.cardBg};
  }

  .profile-copy {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .profile-title-row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px 12px;
    min-width: 0;
  }

  .profile-title {
    margin: 0;
    min-width: 0;
    font-size: 20px;
    font-weight: 700;
    line-height: 26px;
    color: ${({ theme }) => theme.palette.customColors.heading};
    overflow-wrap: anywhere;
  }

  .profile-tags {
    display: inline-flex;
    align-items: center;
    gap: 8px;
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

  .profile-quick {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px 18px;
    min-width: 0;
  }

  .quick-item {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    min-width: 0;
    max-width: 100%;
    font-size: 13px;
    font-weight: 500;
    line-height: 18px;
    color: ${({ theme }) => theme.palette.customColors.textSecondary};
    overflow-wrap: anywhere;

    .MuiSvgIcon-root {
      flex-shrink: 0;
      font-size: 16px;
      color: ${({ theme }) => theme.palette.customColors.brandTeal};
    }
  }

  .profile-actions {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
  }

  .profile-btn.MuiButton-root {
    height: 38px;
    padding-left: 16px;
    padding-right: 16px;
    border-radius: 8px;
    text-transform: none;
    font-size: 13px;
    font-weight: 600;
    white-space: nowrap;
    box-shadow: none;

    &.MuiButton-outlined {
      color: ${({ theme }) => theme.palette.customColors.heading};
      border-color: ${({ theme }) => theme.palette.customColors.border};
      background: ${({ theme }) => theme.palette.customColors.cardBg};

      &:hover {
        color: ${({ theme }) => theme.palette.customColors.brandTeal};
        border-color: ${({ theme }) => theme.palette.customColors.brandTeal};
        background: ${({ theme }) => theme.palette.customColors.hoverBg};
      }
    }
  }

  .profile-info {
    padding: 24px;
  }

  .info-group {
    height: 100%;
    padding: 16px 18px;
    border-radius: 12px;
    background: ${({ theme }) => theme.palette.customColors.pageBg};
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
  }

  .info-group-head {
    display: flex;
    align-items: center;
    gap: 10px;
    padding-bottom: 12px;
    margin-bottom: 4px;
    border-bottom: 1px solid ${({ theme }) => theme.palette.customColors.border};
  }

  .info-group-icon {
    width: 30px;
    height: 30px;
    border-radius: 8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: ${({ theme }) => theme.palette.customColors.brandTeal};
    background: ${({ theme }) => theme.palette.customColors.brandTealLight};

    .MuiSvgIcon-root {
      font-size: 17px;
    }
  }

  .info-group-title {
    margin: 0;
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
    color: ${({ theme }) => theme.palette.customColors.heading};
  }

  .info-grid {
    margin-top: 12px;
    margin-bottom: 0;
  }

  .info-cell {
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-width: 0;
  }

  .info-label {
    margin: 0;
    font-size: 11px;
    font-weight: 600;
    line-height: 16px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
  }

  .info-value {
    margin: 0;
    min-width: 0;
    min-height: 22px;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    color: ${({ theme }) => theme.palette.customColors.heading};
    overflow-wrap: anywhere;
  }

  .blood-chip {
    display: inline-flex;
    align-items: center;
    height: 22px;
    padding: 0 9px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 700;
    white-space: nowrap;
    color: ${({ theme }) => theme.palette.customColors.error};
    background: ${({ theme }) => theme.palette.customColors.errorBg};
  }

  /* Tabs */
  .tabs-head {
    padding: 0 12px;
    border-bottom: 1px solid ${({ theme }) => theme.palette.customColors.border};
  }

  .detail-tabs.MuiTabs-root {
    min-height: 52px;

    .MuiTabs-indicator {
      height: 3px;
      border-radius: 3px 3px 0 0;
      background: ${({ theme }) => theme.palette.customColors.brandTeal};
    }

    .MuiTabs-scrollButtons.Mui-disabled {
      opacity: 0.3;
    }
  }

  .detail-tab.MuiTab-root {
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

  .tab-panel {
    padding: 24px;
  }

  ${({ theme }) => theme.breakpoints.up('md')} {
    .info-cell + .info-cell {
      padding-left: 16px;
      border-left: 1px solid ${({ theme }) => theme.palette.customColors.border};
    }
  }

  ${({ theme }) => theme.breakpoints.down('lg')} {
    .profile-head {
      flex-direction: column;
      align-items: stretch;
    }

    .profile-actions {
      justify-content: flex-end;
    }
  }

  ${({ theme }) => theme.breakpoints.down('md')} {
    .profile-head,
    .profile-info,
    .tab-panel {
      padding: 20px;
    }

    .profile-actions {
      justify-content: flex-start;
    }
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    gap: 16px;

    .profile-head {
      gap: 16px;
      padding: 16px;
    }

    .profile-identity {
      align-items: flex-start;
      gap: 14px;
    }

    .profile-avatar {
      width: 56px;
      height: 56px;
      font-size: 22px;
    }

    .avatar-badge {
      font-size: 18px;
    }

    .profile-title {
      font-size: 17px;
      line-height: 22px;
    }

    .profile-quick {
      flex-direction: column;
      align-items: flex-start;
    }

    .profile-actions {
      flex-direction: column;
      align-items: stretch;
    }

    .profile-btn.MuiButton-root {
      width: 100%;
    }

    .profile-info {
      padding: 16px;
    }

    .info-group {
      padding: 14px;
    }

    .tabs-head {
      padding: 0 4px;
    }

    .tab-panel {
      padding: 16px;
    }
  }
`;
