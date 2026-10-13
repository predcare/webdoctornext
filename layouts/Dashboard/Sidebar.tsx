'use client';

import {
  AppointmentsIcon,
  AvailabilityIcon,
  BillingIcon,
  ChevronIcon,
  DashboardIcon,
  DoctorsIcon,
  HelpIcon,
  MoonIcon,
  PatientsIcon,
  ReportsIcon,
  SettingsIcon,
  SunIcon,
} from '@/components/ui/Icons/dashboard';
import { sideNavItems, type SideNavIcon, type SideNavItem } from '@/configs/navItems';
import Assets from '@/resources/assets';
import { SidebarWrapper } from '@/styles/CustomStyled/SidebarWrapper';
import { useThemeStore } from '@/zustand/stores/useThemeStore';
import { Box, Button, Tooltip } from '@mui/material';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Suspense, type ReactNode } from 'react';
import SidebarNavItem from './SidebarNavItem';

const navIcons: Record<SideNavIcon, ReactNode> = {
  dashboard: <DashboardIcon />,
  appointments: <AppointmentsIcon />,
  patients: <PatientsIcon />,
  availability: <AvailabilityIcon />,
  reports: <ReportsIcon />,
  billing: <BillingIcon />,
  doctors: <DoctorsIcon />,
  settings: <SettingsIcon />,
  help: <HelpIcon />,
};

type NavListProps = {
  items: SideNavItem[];
  collapsed: boolean;
  onNavigate?: () => void;
};

const NavList = ({ items, collapsed, onNavigate, currentPath }: NavListProps & { currentPath: string }) => (
  <>
    {items.map((item) => (
      <SidebarNavItem
        key={item.id}
        item={item}
        icon={navIcons[item.icon]}
        currentPath={currentPath}
        collapsed={collapsed}
        onNavigate={onNavigate}
      />
    ))}
  </>
);

const PathNavList = (props: NavListProps) => {
  const pathname = usePathname();
  const currentPath = pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

  return <NavList {...props} currentPath={currentPath} />;
};

const SuspendedNavList = (props: NavListProps) => (
  <Suspense fallback={<NavList {...props} currentPath="" />}>
    <PathNavList {...props} />
  </Suspense>
);

type SidebarProps = {
  variant: 'permanent' | 'drawer';
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  onClose?: () => void;
};

const Sidebar = ({
  variant,
  collapsed = false,
  onToggleCollapse,
  onClose,
}: SidebarProps) => {
  const mode = useThemeStore((state) => state.mode);
  const toggleMode = useThemeStore((state) => state.toggleMode);
  const isDrawer = variant === 'drawer';
  const isCollapsed = !isDrawer && collapsed;
  const isDark = mode === 'dark';
  const mainItems = sideNavItems.filter((item) => item.section === 'main');
  const footerItems = sideNavItems.filter((item) => item.section === 'footer');

  const handleEdgeClick = () => {
    if (isDrawer) {
      onClose?.();
      return;
    }
    onToggleCollapse?.();
  };

  return (
    <SidebarWrapper
      $collapsed={isCollapsed}
      $variant={variant}
      aria-label="Sidebar"
    >
      <Box className="brand-row">
        <Box className="brand-logo-wrap">
          <Image
            className="brand-logo"
            src={isDark ? Assets.webLogo : Assets.webLogoBlue}
            alt=""
            width={40}
            height={40}
            priority
          />
          <span className="brand-title">PRED Care</span>
        </Box>
        <Button
          className="collapse-btn"
          disableElevation
          onClick={handleEdgeClick}
          aria-label={
            isDrawer
              ? 'Close menu'
              : isCollapsed
                ? 'Expand sidebar'
                : 'Collapse sidebar'
          }
        >
          <ChevronIcon direction={isCollapsed ? 'right' : 'left'} />
        </Button>
      </Box>

      <nav className="sidebar-nav" aria-label="Main menu">
        <SuspendedNavList
          items={mainItems}
          collapsed={isCollapsed}
          onNavigate={isDrawer ? onClose : undefined}
        />
      </nav>

      <Box className="sidebar-footer">
        <SuspendedNavList
          items={footerItems}
          collapsed={isCollapsed}
          onNavigate={isDrawer ? onClose : undefined}
        />
        <Tooltip
          title={isCollapsed ? (isDark ? 'Light mode' : 'Dark mode') : ''}
          placement="right"
          arrow
        >
          <Button className="nav-item" disableElevation onClick={toggleMode}>
            <span className="nav-icon">{isDark ? <SunIcon /> : <MoonIcon />}</span>
            <span className="nav-label">{isDark ? 'Light mode' : 'Dark mode'}</span>
          </Button>
        </Tooltip>
      </Box>
    </SidebarWrapper>
  );
};

export default Sidebar;
