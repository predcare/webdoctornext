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
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
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
    gap: 8px;
    min-width: 0;
    min-height: 44px;
    padding: 4px 10px 4px 4px;
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
    width: 32px;
    height: 32px;
    border-radius: 10px;
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
    min-width: 0;
    flex: 1;
  }

  .clinic-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    line-height: 14px;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
  }

  .clinic-name {
    font-size: 13px;
    font-weight: 600;
    line-height: 20px;
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
    gap: 8px;
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
      gap: 10px;
    }
  }

  ${({ theme }) => theme.breakpoints.up('lg')} {
    column-gap: 20px;
    padding: 16px 28px;
    grid-template-columns: minmax(0, 1fr) minmax(180px, 340px) auto;
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
      width: auto;
      max-width: 340px;
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
    font-size: 13px;
    font-weight: 600;
    line-height: 18px;
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
    width: 260px;
    margin-top: 8px;
    border-radius: 12px;
    background: ${({ theme }) => theme.palette.customColors.cardBg};
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
  }

  .MuiList-root {
    padding: 8px;
  }

  .profile-head {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 8px 12px;
  }

  .profile-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: ${({ theme }) => theme.palette.customColors.brandTeal};
    color: #ffffff;
    font-size: 16px;
    font-weight: 700;
  }

  .profile-copy {
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
    line-height: 20px;
    color: ${({ theme }) => theme.palette.customColors.heading};
  }

  .profile-role {
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
    color: ${({ theme }) => theme.palette.customColors.textSecondary};
  }

  .profile-item,
  .logout-item {
    min-height: 40px;
    border-radius: 8px;
    gap: 10px;
    font-size: 14px;
    font-weight: 500;
  }

  .profile-item {
    color: ${({ theme }) => theme.palette.customColors.textPrimary};
  }

  .profile-divider {
    margin: 4px 8px;
    border-color: ${({ theme }) => theme.palette.customColors.border};
  }

  .logout-item {
    color: ${({ theme }) => theme.palette.customColors.error};
  }
`;
