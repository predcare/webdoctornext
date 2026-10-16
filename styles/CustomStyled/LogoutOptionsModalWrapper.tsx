'use client';

import { Box, styled } from '@mui/material';

export const LogoutOptionsModalWrapper = styled(Box)`
  .option-card {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    margin: 0 0 10px;
    padding: 12px;
    border-radius: 12px;
    text-align: left;
    cursor: pointer;
    font-family: inherit;
    background: ${({ theme }) => theme.palette.customColors.cardBg};
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};

    &:disabled {
      cursor: default;
    }
  }

  .option-card.is-selected {
    border-color: ${({ theme }) => theme.palette.customColors.brandTeal};
  }

  .option-card.is-danger.is-selected {
    border-color: ${({ theme }) => theme.palette.customColors.error};
  }

  .option-icon {
    display: grid;
    place-items: center;
    width: 36px;
    height: 36px;
    flex-shrink: 0;
    border-radius: 10px;
    background: ${({ theme }) => theme.palette.customColors.brandTealLight};
    color: ${({ theme }) => theme.palette.customColors.brandTeal};

    .MuiSvgIcon-root {
      font-size: 20px;
    }
  }

  .option-icon.is-danger {
    background: ${({ theme }) => theme.palette.customColors.errorBg};
    color: ${({ theme }) => theme.palette.customColors.error};
  }

  .option-copy {
    min-width: 0;
    flex: 1;
  }

  .option-title,
  .option-description {
    margin: 0;
  }

  .option-title {
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    color: ${({ theme }) => theme.palette.customColors.heading};
  }

  .option-title.is-danger {
    color: ${({ theme }) => theme.palette.customColors.error};
  }

  .option-description {
    margin-top: 2px;
    font-size: 12px;
    line-height: 16px;
    color: ${({ theme }) => theme.palette.customColors.textSecondary};
  }

  .option-radio {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    border-radius: 50%;
    border: 2px solid ${({ theme }) => theme.palette.customColors.border};
    display: grid;
    place-items: center;
  }

  .option-radio.is-selected {
    border-color: ${({ theme }) => theme.palette.customColors.brandTeal};

    &::after {
      content: '';
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: ${({ theme }) => theme.palette.customColors.brandTeal};
    }
  }

  .option-radio.is-danger.is-selected {
    border-color: ${({ theme }) => theme.palette.customColors.error};

    &::after {
      background: ${({ theme }) => theme.palette.customColors.error};
    }
  }

  && .confirm-btn {
    width: 100%;
    min-height: 44px;
    margin-top: 6px;
    border-radius: 10px;
    text-transform: none;
    font-weight: 600;
    background: ${({ theme }) => theme.palette.customColors.brandTeal};

    &:hover {
      background: ${({ theme }) => theme.palette.customColors.brandTealDark};
    }
  }

  && .cancel-btn {
    width: 100%;
    min-height: 40px;
    margin-top: 8px;
    border-radius: 10px;
    text-transform: none;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.customColors.textSecondary};
  }
`;
