'use client';

import { IconButton, Menu, styled } from '@mui/material';

export const CustomActionMenuStyled = styled(Menu)`
  .MuiPaper-root {
    min-width: 180px;
    margin-top: 6px;
    border-radius: 12px;
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
    background: ${({ theme }) => theme.palette.customColors.cardBg};
    box-shadow: 0 12px 28px rgba(15, 23, 42, 0.12);
  }

  .MuiMenu-list {
    padding: 6px;
  }

  .action-menu-divider {
    height: 1px;
    margin: 4px 0;
    background: ${({ theme }) => theme.palette.customColors.border};
  }

  .action-menu-item.MuiMenuItem-root {
    display: flex;
    align-items: center;
    gap: 10px;
    min-height: 38px;
    padding: 8px 10px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 500;
    color: ${({ theme }) => theme.palette.customColors.heading};
    transition:
      background-color 0.15s ease,
      color 0.15s ease;

    .action-menu-icon {
      display: grid;
      place-items: center;
      width: 28px;
      height: 28px;
      flex-shrink: 0;
      border-radius: 8px;
      color: ${({ theme }) => theme.palette.customColors.brandTeal};
      background: ${({ theme }) => theme.palette.customColors.brandTealLight};

      .MuiSvgIcon-root {
        font-size: 16px;
      }
    }

    .action-menu-label {
      flex: 1;
    }

    .action-menu-chevron {
      font-size: 16px;
      color: ${({ theme }) => theme.palette.customColors.textMuted};
      transition: transform 0.15s ease;
    }

    &:hover,
    &.Mui-focusVisible {
      color: ${({ theme }) => theme.palette.customColors.brandTeal};
      background: ${({ theme }) => theme.palette.customColors.hoverBg};

      .action-menu-chevron {
        transform: translateX(2px);
        color: ${({ theme }) => theme.palette.customColors.brandTeal};
      }
    }

    &.tone-danger {
      .action-menu-icon {
        color: ${({ theme }) => theme.palette.customColors.error};
        background: ${({ theme }) => theme.palette.customColors.errorBg};
      }

      &:hover,
      &.Mui-focusVisible {
        color: ${({ theme }) => theme.palette.customColors.error};
        background: ${({ theme }) => theme.palette.customColors.errorBg};

        .action-menu-chevron {
          color: ${({ theme }) => theme.palette.customColors.error};
        }
      }
    }

    &.tone-warning {
      .action-menu-icon {
        color: ${({ theme }) => theme.palette.customColors.warning};
        background: ${({ theme }) => theme.palette.customColors.warningBg};
      }

      &:hover,
      &.Mui-focusVisible {
        color: ${({ theme }) => theme.palette.customColors.warning};
        background: ${({ theme }) => theme.palette.customColors.warningBg};

        .action-menu-chevron {
          color: ${({ theme }) => theme.palette.customColors.warning};
        }
      }
    }

    &.Mui-disabled {
      opacity: 0.5;
    }
  }
`;

export const CustomActionMenuTriggerButton = styled(IconButton)`
  flex-shrink: 0;
  width: 34px;
  height: 34px;
  padding: 0;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.palette.customColors.border};
  background: transparent;
  color: ${({ theme }) => theme.palette.customColors.textMuted};
  transition:
    background-color 0.15s ease,
    color 0.15s ease,
    transform 0.15s ease;

  .MuiSvgIcon-root {
    font-size: 18px;
  }

  &:hover {
    transform: translateY(-1px);
    color: ${({ theme }) => theme.palette.customColors.heading};
    background: ${({ theme }) => theme.palette.customColors.hoverBg};
  }
`;
