import { Box, styled } from '@mui/material';

export const DashboardLayoutWrapper = styled(Box)`
  width: 100%;
  height: 100vh;
  background: ${({ theme }) => theme.palette.customColors.pageBg};
  overflow: hidden;

  .dashboard-shell {
    height: 100%;
    display: flex;
    align-items: stretch;
    overflow: hidden;
  }

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
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .dashboard-content {
    width: 100%;
    min-width: 0;
    padding-left: 16px;
    padding-right: 16px;
  }

  ${({ theme }) => theme.breakpoints.up('sm')} {
    .dashboard-main {
      padding-top: 20px;
      padding-bottom: 28px;
    }

    .dashboard-content {
      padding-left: 24px;
      padding-right: 24px;
    }
  }

  ${({ theme }) => theme.breakpoints.up('lg')} {
    .dashboard-main {
      padding-top: 24px;
      padding-bottom: 32px;
    }

    .dashboard-content {
      padding-left: 28px;
      padding-right: 28px;
    }
  }

  ${({ theme }) => theme.breakpoints.up('xl')} {
    .dashboard-shell {
      border-left: 1px solid ${({ theme }) => theme.palette.customColors.border};
      border-right: 1px solid
        ${({ theme }) => theme.palette.customColors.border};
    }
  }
`;
