'use client';

import { Box, styled } from '@mui/material';

export const CmsLayoutWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  .cms-main {
    flex-grow: 1;
    padding-top: 64px;
  }

  ${({ theme }) => theme.breakpoints.up('sm')} {
    .cms-main {
      padding-top: 72px;
    }
  }
`;
