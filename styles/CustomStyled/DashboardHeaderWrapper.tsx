'use client';
import { TopbarHeight } from '@/themes/themeConstant';
import { Menu, styled } from '@mui/material';

export const DashboardHeaderWrapper = styled('header')`
  position: sticky;
  top: 0;
  z-index: 20;
  flex-shrink: 0;
  min-height: ${TopbarHeight}px;
  display: grid;
  align-items: center;
  column-gap: 8px;
  row-gap: 0;
  padding: 10px 12px;
  background: ${({ theme }) => theme.palette.customColors.headerBg};
  border-bottom: 1px solid ${({ theme }) => theme.palette.customColors.border};
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  cursor: pointer;
  &:hover {
    border-color: ${({ theme }) => theme.palette.customColors.inputBorder};
    box-shadow: 0 4px 16px rgba(15, 23, 42, 0.06);
  }
  grid-template-columns: auto minmax(0, 1fr) auto;
  grid-template-areas: 'menu identity icons';

  .menu-btn {
    grid-area: menu;
  }

  .identity {
    grid-area: identity;
    min-width: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2px;
  }

  .greeting-row {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    gap: 6px;
    min-width: 0;
  }

  .greeting-text {
    min-width: 0;
    flex: 0 1 auto;
    font-size: 14px;
    font-weight: 600;
    line-height: 18px;
    color: ${({ theme }) => theme.palette.customColors.heading};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .date-line {
    margin: 0;
    min-height: 16px;
    min-width: 0;
    color: ${({ theme }) => theme.palette.customColors.textSecondary};
    font-size: 11px;
    font-weight: 400;
    line-height: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  && .clinic-btn {
    display: none;
  }

  .icon-actions {
    grid-area: icons;
    justify-self: end;
  }

  && .menu-btn,
  && .bell-btn,
  && .avatar-btn,
  && .clinic-icon-btn,
  && .clinic-btn {
    font-family: inherit;
    text-transform: none;
    box-shadow: none;

    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.palette.customColors.brandTeal};
      outline-offset: 2px;
    }
  }

  && .menu-btn,
  && .bell-btn,
  && .avatar-btn,
  && .clinic-icon-btn {
    min-width: 36px;
    width: 36px;
    height: 36px;
    padding: 0;
    border-radius: 50%;
    display: inline-flex;
    flex-shrink: 0;
  }

  && .clinic-icon-btn {
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
    background: ${({ theme }) => theme.palette.customColors.brandTealLight};
    color: ${({ theme }) => theme.palette.customColors.brandTeal};

    &:hover {
      background: ${({ theme }) => theme.palette.customColors.hoverBg};
    }
  }

  && .menu-btn {
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
    background: transparent;
    color: ${({ theme }) => theme.palette.customColors.textPrimary};

    &:hover {
      background: ${({ theme }) => theme.palette.customColors.hoverBg};
    }
  }

  && .bell-btn {
    border: none;
    background: ${({ theme }) => theme.palette.customColors.brandTeal};
    color: #ffffff;

    &:hover {
      background: ${({ theme }) => theme.palette.customColors.brandTealDark};
    }
  }

  && .plan-chip {
    height: 20px;
    border-radius: 999px;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.04em;
    flex-shrink: 0;
  }

  && .clinic-btn {
    align-items: center;
    justify-content: flex-start;
    gap: 6px;
    min-width: 0;
    min-height: 40px;
    padding: 3px 8px 3px 3px;
    border-radius: 12px;
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
    background: ${({ theme }) => theme.palette.customColors.headerBg};
    color: ${({ theme }) => theme.palette.customColors.heading};
    text-align: left;

    &:hover {
      background: ${({ theme }) => theme.palette.customColors.hoverBg};
    }
  }

  .clinic-icon {
    width: 30px;
    height: 30px;
    border-radius: 9px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: ${({ theme }) => theme.palette.customColors.brandTealLight};
    color: ${({ theme }) => theme.palette.customColors.brandTeal};
  }

  .clinic-copy {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0;
    min-width: 0;
    flex: 0 1 auto;
  }

  .clinic-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    line-height: 12px;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
  }

  .clinic-name {
    font-size: 13px;
    font-weight: 600;
    line-height: 16px;
    color: ${({ theme }) => theme.palette.customColors.heading};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .clinic-caret {
    display: inline-flex;
    flex-shrink: 0;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
  }

  .icon-actions {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  && .avatar-btn {
    position: relative;
    background: ${({ theme }) => theme.palette.customColors.brandTeal};
    color: #ffffff;
    font-size: 14px;
    font-weight: 700;
    line-height: 1;

    &:hover {
      background: ${({ theme }) => theme.palette.customColors.brandTealDark};
    }
  }

  .online-dot {
    position: absolute;
    right: -1px;
    bottom: -1px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${({ theme }) => theme.palette.customColors.success};
    border: 2px solid ${({ theme }) => theme.palette.customColors.headerBg};
  }

  ${({ theme }) => theme.breakpoints.up('sm')} {
    column-gap: 12px;
    padding: 12px 20px;

    .greeting-row {
      gap: 8px;
    }

    .greeting-text {
      font-size: 15px;
      line-height: 20px;
    }

    .date-line {
      font-size: 12px;
    }

    .icon-actions {
      gap: 8px;
    }
  }

  ${({ theme }) => theme.breakpoints.up('lg')} {
    column-gap: 12px;
    padding: 14px 24px;
    grid-template-columns: minmax(0, 1fr) auto auto;
    grid-template-areas: 'identity clinic icons';

    && .menu-btn {
      display: none;
    }

    .greeting-text {
      font-size: 16px;
      font-weight: 600;
      line-height: 22px;
    }

    && .clinic-btn {
      display: flex;
      grid-area: clinic;
      justify-self: end;
      width: max-content;
      max-width: 320px;
      margin-top: 0;
      align-self: center;
    }

    && .clinic-icon-btn {
      display: none;
    }
  }
`;

export const ClinicMenu = styled(Menu)`
  .MuiPaper-root {
    width: 280px;
    max-width: calc(100vw - 32px);
    margin-top: 8px;
    border-radius: 12px;
    background: ${({ theme }) => theme.palette.customColors.cardBg};
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
  }

  .MuiList-root {
    padding: 8px;
  }

  .clinic-item {
    align-items: flex-start;
    gap: 10px;
    min-height: 52px;
    border-radius: 8px;
    white-space: normal;
  }

  .clinic-item-icon {
    width: 28px;
    height: 28px;
    margin-top: 2px;
    border-radius: 8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: ${({ theme }) => theme.palette.customColors.brandTealLight};
    color: ${({ theme }) => theme.palette.customColors.brandTeal};
  }

  .clinic-item-copy {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .clinic-item-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    line-height: 14px;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
  }

  .clinic-item-name {
    font-size: 11px;
    font-weight: 600;
    line-height: 16px;
    color: ${({ theme }) => theme.palette.customColors.heading};
  }
`;

export const NoticeMenu = styled(Menu)`
  .MuiPaper-root {
    width: 320px;
    max-width: calc(100vw - 32px);
    margin-top: 8px;
    border-radius: 12px;
    background: ${({ theme }) => theme.palette.customColors.cardBg};
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
  }

  .MuiList-root {
    padding: 8px;
  }

  .notice-title {
    margin: 0;
    padding: 6px 8px 10px;
    font-size: 13px;
    font-weight: 600;
    line-height: 18px;
    color: ${({ theme }) => theme.palette.customColors.heading};
  }

  .notice-item {
    align-items: flex-start;
    gap: 10px;
    min-height: 0;
    padding: 8px;
    border-radius: 8px;
    white-space: normal;
  }

  .notice-dot {
    width: 8px;
    height: 8px;
    margin-top: 6px;
    border-radius: 50%;
    flex-shrink: 0;
    background: transparent;
  }

  .notice-item.unread .notice-dot {
    background: ${({ theme }) => theme.palette.customColors.brandTeal};
  }

  .notice-copy {
    display: flex;
    flex-direction: column;
    min-width: 0;
    gap: 2px;
  }

  .notice-item-title {
    font-size: 13px;
    font-weight: 600;
    line-height: 18px;
    color: ${({ theme }) => theme.palette.customColors.heading};
  }

  .notice-message {
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
    color: ${({ theme }) => theme.palette.customColors.textSecondary};
  }

  .notice-time {
    font-size: 11px;
    font-weight: 500;
    line-height: 14px;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
  }
`;

export const ProfileMenu = styled(Menu)`
  .MuiPaper-root {
    width: 280px;
    margin-top: 8px;
    border-radius: 14px;
    background: ${({ theme }) => theme.palette.customColors.cardBg};
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
    box-shadow: 0 12px 32px rgba(15, 23, 42, 0.1);
    overflow: hidden;
  }

  .MuiList-root {
    padding: 8px;
  }

  .profile-head {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 0 0 8px;
    padding: 12px;
    border-radius: 10px;
    background: ${({ theme }) => theme.palette.customColors.brandTealLight};
  }

  && .profile-avatar {
    width: 44px;
    height: 44px;
    flex-shrink: 0;
    font-size: 15px;
    font-weight: 700;
    color: #ffffff;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.palette.customColors.cardBg};
  }

  .profile-copy {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .profile-name,
  .profile-role {
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .profile-name {
    font-size: 14px;
    font-weight: 600;
    line-height: 18px;
    color: ${({ theme }) => theme.palette.customColors.heading};
  }

  .profile-role {
    font-size: 11px;
    font-weight: 600;
    line-height: 14px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.palette.customColors.brandTeal};
  }

  .profile-item,
  .logout-item {
    min-height: 44px;
    margin: 0;
    padding: 6px 8px;
    border-radius: 10px;
    gap: 10px;
    font-size: 14px;
    font-weight: 500;
  }

  .profile-item {
    color: ${({ theme }) => theme.palette.customColors.textPrimary};

    &:hover {
      background: ${({ theme }) => theme.palette.customColors.hoverBg};
    }
  }

  .profile-menu-link {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    color: inherit;
    font: inherit;
    text-decoration: none;
  }

  .profile-item-icon {
    width: 28px;
    height: 28px;
    border-radius: 8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: ${({ theme }) => theme.palette.customColors.brandTealLight};
    color: ${({ theme }) => theme.palette.customColors.brandTeal};
  }

  .profile-item-label {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .profile-divider {
    margin: 6px 8px;
    border-color: ${({ theme }) => theme.palette.customColors.border};
  }

  .logout-item {
    color: ${({ theme }) => theme.palette.customColors.error};

    .profile-item-icon {
      background: ${({ theme }) => theme.palette.customColors.errorBg};
      color: ${({ theme }) => theme.palette.customColors.error};
    }

    &:hover {
      background: ${({ theme }) => theme.palette.customColors.errorBg};
    }
  }
`;
