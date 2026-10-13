import { Box, styled } from '@mui/material';

export const DashboardLayoutWrapper = styled(Box)`
  height: 100vh;
  display: flex;
  align-items: stretch;
  background: ${({ theme }) => theme.palette.customColors.pageBg};
  overflow: hidden;

  .dashboard-column {
    flex: 1;
    min-width: 0;
    min-height: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .dashboard-main {
    flex: 1;
    min-height: 0;
    width: 100%;
    min-width: 0;
    overflow-y: auto;
    padding-top: 16px;
    padding-bottom: 24px;
  }

  ${({ theme }) => theme.breakpoints.up('sm')} {
    .dashboard-main {
      padding-top: 20px;
      padding-bottom: 28px;
    }
  }

  ${({ theme }) => theme.breakpoints.up('lg')} {
    .dashboard-main {
      padding-top: 24px;
      padding-bottom: 32px;
    }
  }
`;
