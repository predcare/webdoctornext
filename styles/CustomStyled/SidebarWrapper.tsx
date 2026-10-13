import { SidebarWidth, SidebarWidthSm } from '@/themes/themeConstant';
import { styled } from '@mui/material';

export const SidebarWrapper = styled('aside', {
  shouldForwardProp: (prop) => prop !== '$collapsed' && prop !== '$variant',
}) <{ $collapsed?: boolean; $variant?: 'permanent' | 'drawer' }>`
  width: ${({ $collapsed, $variant }) =>
    $variant === 'drawer'
      ? '100%'
      : `${$collapsed ? SidebarWidthSm : SidebarWidth}px`};
  height: 100%;
  min-height: 0;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 30;
  background: ${({ theme }) => theme.palette.customColors.sidebarBg};
  border-right: ${({ theme, $variant }) =>
    $variant === 'drawer'
      ? 'none'
      : `1px solid ${theme.palette.customColors.border}`};
  color: ${({ theme }) => theme.palette.customColors.textPrimary};
  transition: width 0.2s ease;
  overflow: hidden;

  ${({ $variant, theme }) =>
    $variant !== 'drawer'
      ? `${theme.breakpoints.down('lg')} { display: none; }`
      : ''}

  .brand-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-shrink: 0;
    min-height: 72px;
    padding: 16px 16px 14px;
    box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .brand-logo-wrap {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
    flex: 1;
    height: 40px;
  }

  .brand-logo {
    height: 34px !important;
    width: auto !important;
    max-width: 66px;
    flex-shrink: 0;
    object-fit: contain;
    object-position: left center;
  }

  .brand-title {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 18px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: -0.02em;
    color: ${({ theme }) => theme.palette.customColors.heading};
    white-space: nowrap;
  }

  && .collapse-btn {
    min-width: 36px;
    width: 36px;
    height: 36px;
    padding: 0;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
    background: ${({ theme }) => theme.palette.customColors.headerBg};
    color: ${({ theme }) => theme.palette.customColors.textSecondary};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    box-shadow: none;
    transition: background-color 0.18s ease, color 0.18s ease, border-color 0.18s ease;

    &:hover {
      background: ${({ theme }) => theme.palette.customColors.brandTealLight};
      color: ${({ theme }) => theme.palette.customColors.brandTeal};
      border-color: ${({ theme }) => theme.palette.customColors.brandTeal};
      transform: translateY(-1px);
      box-shadow: 0 4px 10px ${({ theme }) => theme.palette.customColors.brandTealGlow};
    }

    &:active {
      transform: translateY(0) scale(0.96);
    }

    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.palette.customColors.brandTeal};
      outline-offset: 2px;
    }

    svg {
      transition: transform 0.2s ease;
    }
  }

  .sidebar-nav,
  .sidebar-footer {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 8px 12px;
  }

  .sidebar-nav {
    flex: 1;
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .sidebar-footer {
    margin-top: auto;
    flex-shrink: 0;
    padding-top: 12px;
    padding-bottom: 16px;
    border-top: 1px solid ${({ theme }) => theme.palette.customColors.border};
  }

  .section-label {
    margin: 8px 0 10px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
  }

  .nav-group {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  && .MuiButton-root.nav-item {
    min-width: 0;
    text-transform: none;
    justify-content: flex-start;
    box-shadow: none;
    font-weight: 500;
    letter-spacing: 0;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    min-height: 44px;
    padding: 10px 12px;
    border: none;
    border-radius: 12px;
    background: transparent;
    color: ${({ theme }) => theme.palette.customColors.textPrimary};
    font-family: inherit;
    font-size: 14.5px;
    font-weight: 500;
    line-height: 20px;
    text-align: left;
    text-decoration: none;
    cursor: pointer;
    transition: background-color 0.15s ease, color 0.15s ease;

    &:hover {
      background: ${({ theme }) => theme.palette.customColors.hoverBg};
      color: ${({ theme }) => theme.palette.customColors.textPrimary};
    }

    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.palette.customColors.brandTeal};
      outline-offset: 2px;
    }

    &.active {
      background: ${({ theme }) => theme.palette.customColors.sidebarActiveBg};
      color: ${({ theme }) => theme.palette.customColors.sidebarActiveText};
      font-weight: 600;
    }

    &.active:hover {
      background: ${({ theme }) => theme.palette.customColors.brandTealLight};
    }

    &.open {
      background: ${({ theme }) => theme.palette.customColors.sidebarActiveBg};
      color: ${({ theme }) => theme.palette.customColors.sidebarActiveText};
      font-weight: 600;
    }

    &.open .nav-chevron {
      color: ${({ theme }) => theme.palette.customColors.sidebarActiveText};
    }
  }

  .nav-icon {
    display: inline-flex;
    flex-shrink: 0;
  }

  .nav-label {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .nav-chevron {
    margin-left: auto;
    display: inline-flex;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
    flex-shrink: 0;
  }

  .submenu {
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin: 8px 0 4px 12px;
    padding: 2px 0 2px 12px;
    border-left: 2px solid ${({ theme }) => theme.palette.customColors.border};
  }

  .submenu-item {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    min-height: 36px;
    padding: 6px 10px;
    border: none;
    border-radius: 10px;
    background: transparent;
    color: ${({ theme }) => theme.palette.customColors.textSecondary};
    font-family: inherit;
    font-size: 13.5px;
    font-weight: 500;
    line-height: 20px;
    text-align: left;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      background: ${({ theme }) => theme.palette.customColors.hoverBg};
      color: ${({ theme }) => theme.palette.customColors.textPrimary};
    }

    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.palette.customColors.brandTeal};
      outline-offset: 2px;
    }

    &.active {
      background: ${({ theme }) => theme.palette.customColors.sidebarActiveBg};
      color: ${({ theme }) => theme.palette.customColors.sidebarActiveText};
      font-weight: 600;
    }
  }

  .submenu-icon {
    display: inline-flex;
    flex-shrink: 0;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
  }

  .submenu-label {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  ${({ $collapsed }) =>
    $collapsed
      ? `
    .brand-title,
    .brand-logo-wrap,
    .section-label,
    .nav-label,
    .nav-chevron,
    .submenu {
      display: none;
    }

    .brand-row {
      justify-content: center;
      padding-left: 8px;
      padding-right: 8px;
    }

    .sidebar-nav,
    .sidebar-footer {
      padding-left: 8px;
      padding-right: 8px;
      align-items: center;
    }

    .nav-group {
      width: auto;
      align-items: center;
    }

    .nav-item,
    .MuiButton-root.nav-item {
      justify-content: center;
      width: 44px;
      min-width: 44px;
      padding: 10px;
    }
  `
      : ''}
`;
