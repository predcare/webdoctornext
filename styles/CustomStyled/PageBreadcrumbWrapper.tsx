'use client';

import { Box, styled } from '@mui/material';

export const PageBreadcrumbWrapper = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;

  .crumb-link {
    color: ${({ theme }) => theme.palette.customColors.textSecondary};
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    text-decoration: none;

    &:hover {
      color: ${({ theme }) => theme.palette.customColors.brandTeal};
    }
  }

  .crumb-current {
    color: ${({ theme }) => theme.palette.customColors.heading};
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
  }

  .MuiBreadcrumbs-separator {
    color: ${({ theme }) => theme.palette.customColors.textMuted};
  }

  .page-action.MuiButton-root {
    height: 36px;
    margin-left: auto;
    padding-left: 14px;
    padding-right: 14px;
    border-radius: 8px;
    text-transform: none;
    font-size: 13px;
    font-weight: 600;
    white-space: nowrap;
    box-shadow: none;
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    align-items: stretch;

    .page-action.MuiButton-root {
      width: 100%;
      margin-left: 0;
    }
  }
`;
