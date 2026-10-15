'use client';

import { Box, styled } from '@mui/material';

export const CmsLayoutWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow-x: hidden;
  background-color: #f8fafc;

  .cms-main {
    flex-grow: 1;
    width: 100%;
  }
`;
