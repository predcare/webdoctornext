'use client';

import SocketProvider from '@/components/commons/Sockets/SocketProvider';
import AuthGate from '@/components/Modules/AuthModule/AuthGate';
import MeetingSessionSlot from '@/components/Modules/MeetingModule/MeetingSessionSlot';
import DashboardHeader from '@/layouts/Dashboard/DashboardHeader';
import Sidebar from '@/layouts/Dashboard/Sidebar';
import { DashboardLayoutWrapper } from '@/styles/CustomStyled/DashboardLayoutWrapper';
import { SidebarWidth } from '@/themes/themeConstant';
import { Box, Container, Drawer } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect, useState } from 'react';

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (isDesktop) {
      setMobileOpen(false);
    }
  }, [isDesktop]);

  return (
    <AuthGate>
      <SocketProvider>
        <DashboardLayoutWrapper>
          <Container maxWidth="xl" disableGutters className="dashboard-shell">
            <Sidebar
              variant="permanent"
              collapsed={collapsed}
              onToggleCollapse={() => setCollapsed((value) => !value)}
            />
            <Drawer
              anchor="left"
              open={mobileOpen}
              onClose={() => setMobileOpen(false)}
              sx={{
                display: { lg: 'none' },
                '& .MuiDrawer-paper': {
                  width: SidebarWidth,
                  maxWidth: 'calc(100vw - 48px)',
                  backgroundColor: theme.palette.customColors.sidebarBg,
                  backgroundImage: 'none',
                  borderRight: `1px solid ${theme.palette.customColors.border}`,
                },
              }}
            >
              <Sidebar variant="drawer" onClose={() => setMobileOpen(false)} />
            </Drawer>
            <Box className="dashboard-column">
              <DashboardHeader onMenuClick={() => setMobileOpen(true)} />
              <Box component="main" className="dashboard-main">
                <Box className="dashboard-content">
                  <MeetingSessionSlot>{children}</MeetingSessionSlot>
                </Box>
              </Box>
            </Box>
          </Container>
        </DashboardLayoutWrapper>
      </SocketProvider>
    </AuthGate>
  );
}
