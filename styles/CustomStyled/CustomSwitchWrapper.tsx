'use client';

import { styled } from '@mui/material';

export const CustomSwitchWrapper = styled('label')`
  --switch-width: 40px;
  --switch-height: 22px;
  --switch-thumb: 16px;
  --switch-gap: 3px;

  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  cursor: pointer;
  user-select: none;

  &.is-small {
    --switch-width: 34px;
    --switch-height: 18px;
    --switch-thumb: 12px;
  }

  &.is-disabled {
    cursor: not-allowed;
  }

  .MuiSwitch-root {
    width: var(--switch-width);
    height: var(--switch-height);
    padding: 0;
    overflow: visible;
  }

  .MuiSwitch-switchBase {
    padding: 0;
    margin: var(--switch-gap);
    transition-duration: 200ms;

    &:hover {
      background: transparent;
    }

    &.Mui-checked {
      transform: translateX(
        calc(var(--switch-width) - var(--switch-thumb) - var(--switch-gap) * 2)
      );
      color: #fff;

      & + .MuiSwitch-track {
        opacity: 1;
        border-color: ${({ theme }) => theme.palette.primary.main};
        background-color: ${({ theme }) => theme.palette.primary.main};
      }
    }

    &.Mui-focusVisible + .MuiSwitch-track {
      box-shadow: 0 0 0 3px
        ${({ theme }) => theme.palette.customColors.brandTealLight};
    }

    &.Mui-disabled {
      color: #fff;

      & + .MuiSwitch-track {
        opacity: 0.5;
      }

      .MuiSwitch-thumb {
        box-shadow: none;
      }
    }
  }

  .MuiSwitch-thumb {
    width: var(--switch-thumb);
    height: var(--switch-thumb);
    box-sizing: border-box;
    background: #fff;
    box-shadow:
      0 1px 2px rgba(15, 23, 42, 0.2),
      0 1px 1px rgba(15, 23, 42, 0.08);
  }

  .MuiSwitch-track {
    box-sizing: border-box;
    border-radius: 999px;
    opacity: 1;
    border: 1px solid ${({ theme }) => theme.palette.customColors.inputBorder};
    background-color: ${({ theme }) => theme.palette.customColors.inputBorder};
    transition:
      background-color 200ms ease,
      border-color 200ms ease,
      box-shadow 150ms ease;
  }

  .switch-label {
    font-size: 13px;
    font-weight: 500;
    line-height: 18px;
    color: ${({ theme }) => theme.palette.text.primary};
  }
`;
