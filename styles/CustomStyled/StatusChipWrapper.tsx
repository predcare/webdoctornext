'use client';

import { styled } from '@mui/material';

export const StatusChipWrapper = styled('span')`
  display: inline-flex;
  align-items: center;
  height: 22px;
  padding: 0 8px;
  border-radius: 6px;
  border: 1px solid transparent;
  font-size: 11px;
  font-weight: 700;
  line-height: 14px;
  white-space: nowrap;

  &.active {
    color: ${({ theme }) => theme.palette.customColors.success};
    background: ${({ theme }) => theme.palette.customColors.successBg};
    border-color: ${({ theme }) => theme.palette.customColors.success};
  }

  &.inactive {
    color: ${({ theme }) => theme.palette.customColors.error};
    background: ${({ theme }) => theme.palette.customColors.errorBg};
    border-color: ${({ theme }) => theme.palette.customColors.error};
  }
`;
