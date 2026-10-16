'use client';

import LogoutOptionsModal from '@/components/Modules/AuthModule/Modals/LogoutOptionsModal';
import { queryClient } from '@/components/Providers/ReactQueryProvider';
import {
  BellIcon,
  ChevronIcon,
  ClinicIcon,
  LogoutIcon,
  MenuIcon,
  SettingsIcon,
} from '@/components/ui/Icons/dashboard';
import { dashboardDoctor } from '@/configs/dashboardNav';
import { useUserLogout } from '@/hooks/react-query/auth/auth.hooks';
import {
  _formatDoctorName,
  _toTitleCase,
  getAvatarColor,
  getInitials,
} from '@/lib/commons/common.utils';
import { notifications } from '@/resources/mock';
import { projectRoutes } from '@/routes';
import { setIntentionalLogoutMode } from '@/services/api/apiClient';
import {
  ClinicMenu,
  DashboardHeaderWrapper,
  NoticeMenu,
  ProfileMenu,
} from '@/styles/CustomStyled/DashboardHeaderWrapper';
import { useAuthStore } from '@/zustand/stores/useAuthStore';
import { useClinicStore } from '@/zustand/stores/useClinicStore';
import { useLoadingStore } from '@/zustand/stores/useLoadingStore';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  MenuItem,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

dayjs.extend(advancedFormat);

type DashboardHeaderProps = {
  onMenuClick: () => void;
};

const menuOrigin = {
  anchorOrigin: { vertical: 'bottom' as const, horizontal: 'right' as const },
  transformOrigin: { vertical: 'top' as const, horizontal: 'right' as const },
};

const DashboardHeader = ({ onMenuClick }: DashboardHeaderProps) => {
  const [clinicAnchor, setClinicAnchor] = useState<HTMLElement | null>(null);
  const [bellAnchor, setBellAnchor] = useState<HTMLElement | null>(null);
  const [profileAnchor, setProfileAnchor] = useState<HTMLElement | null>(null);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [todayLabel, setTodayLabel] = useState('');
  const router = useRouter();

  const { userData, logout } = useAuthStore((state) => state);
  const { showLoader, hideLoader } = useLoadingStore((state) => state);
  const { mutate: userLogout, isPending: isLogoutLoading } = useUserLogout();
  const { clinics, activeClinic, setActiveClinic, isClinicsLoaded } =
    useClinicStore((state) => state);

  const clinicMenuWidth = clinicAnchor?.classList.contains('clinic-btn')
    ? clinicAnchor.offsetWidth
    : undefined;

  const { clinicLabel, clinicName } = useMemo(() => {
    const selectedClinic = clinics.find(
      (clinic) => String(clinic.id) === String(userData?.clinic?.id),
    );

    return {
      clinicLabel: selectedClinic?.is_primary ? 'Primary center' : 'Clinic',
      clinicName:
        selectedClinic?.name || userData?.clinic_name || 'Select clinic',
    };
  }, [clinics, userData?.clinic?.id, userData?.clinic_name]);

  const handleLogout = (allDevices: boolean) => {
    showLoader(allDevices ? 'Signing out of all devices...' : 'Signing out...');
    setIntentionalLogoutMode(true);
    userLogout(
      { all_devices: allDevices },
      {
        onSettled: async () => {
          setLogoutOpen(false);
          await queryClient.cancelQueries();
          await queryClient.clear();
          await logout();
          hideLoader();
          router.replace(projectRoutes.doctorLogin);
          setTimeout(() => {
            setIntentionalLogoutMode(false);
          }, 1000);
        },
        onError: (error) => {
          hideLoader();
          console.error(error);
        },
      },
    );
  };

  useEffect(() => {
    setTodayLabel(`Today is ${dayjs().format('dddd, MMMM Do, YYYY')}`);
  }, []);

  return (
    <DashboardHeaderWrapper>
      <Button
        className="menu-btn"
        disableElevation
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <MenuIcon />
      </Button>

      <Box className="identity">
        <Box className="greeting-row">
          <Typography component="h1" className="greeting-text">
            {`Welcome back, ${_formatDoctorName(userData?.name || '', userData?.salutation)}`}
          </Typography>
          <Chip label={dashboardDoctor.plan} className="plan-chip" />
        </Box>
        <Typography className="date-line" component="p">
          {todayLabel}
        </Typography>
      </Box>

      <Button
        className="clinic-btn"
        disableElevation
        aria-haspopup="menu"
        aria-expanded={Boolean(clinicAnchor)}
        disabled={!isClinicsLoaded}
        onClick={(event) => setClinicAnchor(event.currentTarget)}
      >
        <span className="clinic-icon">
          <ClinicIcon />
        </span>
        <span className="clinic-copy">
          <span className="clinic-label">{clinicLabel}</span>
          <span className="clinic-name">{clinicName}</span>
        </span>
        <span className="clinic-caret">
          <ChevronIcon direction="down" />
        </span>
      </Button>

      <Box className="icon-actions">
        <Button
          className="clinic-icon-btn"
          disableElevation
          aria-label="Clinics"
          aria-haspopup="menu"
          aria-expanded={Boolean(clinicAnchor)}
          disabled={!isClinicsLoaded}
          onClick={(event) => setClinicAnchor(event.currentTarget)}
        >
          <ClinicIcon />
        </Button>
        <Button
          className="bell-btn"
          disableElevation
          aria-label="Notifications"
          aria-haspopup="menu"
          aria-expanded={Boolean(bellAnchor)}
          onClick={(event) => setBellAnchor(event.currentTarget)}
        >
          <BellIcon />
        </Button>
        <Button
          className="avatar-btn"
          disableElevation
          aria-label="Open profile menu"
          aria-haspopup="menu"
          aria-expanded={Boolean(profileAnchor)}
          onClick={(event) => setProfileAnchor(event.currentTarget)}
        >
          <Avatar
            className="profile-avatar"
            src={userData?.profile_image}
            alt={userData?.name}
            sx={{ bgcolor: getAvatarColor(userData?.name) }}
          >
            {getInitials(userData?.name || '')}
          </Avatar>
        </Button>
      </Box>

      <ClinicMenu
        anchorEl={clinicAnchor}
        open={Boolean(clinicAnchor)}
        onClose={() => setClinicAnchor(null)}
        slotProps={{
          paper: {
            style: clinicMenuWidth
              ? {
                width: clinicMenuWidth,
                minWidth: clinicMenuWidth,
                maxWidth: clinicMenuWidth,
              }
              : undefined,
          },
        }}
        {...menuOrigin}
      >
        {clinics.map((clinic) => (
          <MenuItem
            key={clinic.id}
            className="clinic-item"
            selected={String(clinic.id) === String(userData?.clinic?.id)}
            disabled={String(clinic.id) === String(userData?.clinic?.id)}
            onClick={() => {
              setActiveClinic(String(clinic.id));
              setClinicAnchor(null);
            }}
          >
            <span className="clinic-item-icon">
              <ClinicIcon size={16} />
            </span>
            <span className="clinic-item-copy">
              <span className="clinic-item-label">
                {clinic.is_primary ? 'Primary center' : 'Clinic'}
              </span>
              <span className="clinic-item-name">{clinic.name}</span>
            </span>
          </MenuItem>
        ))}
      </ClinicMenu>

      <NoticeMenu
        anchorEl={bellAnchor}
        open={Boolean(bellAnchor)}
        onClose={() => setBellAnchor(null)}
        {...menuOrigin}
      >
        <Typography className="notice-title" component="p">
          Notifications
        </Typography>
        {notifications.map((item) => (
          <MenuItem
            key={item.id}
            className={item.unread ? 'notice-item unread' : 'notice-item'}
            onClick={() => setBellAnchor(null)}
          >
            <span className="notice-dot" />
            <span className="notice-copy">
              <span className="notice-item-title">{item.title}</span>
              <span className="notice-message">{item.message}</span>
              <span className="notice-time">{item.time}</span>
            </span>
          </MenuItem>
        ))}
      </NoticeMenu>

      <ProfileMenu
        anchorEl={profileAnchor}
        open={Boolean(profileAnchor)}
        onClose={() => setProfileAnchor(null)}
        {...menuOrigin}
      >
        <Box className="profile-head">
          <Avatar
            className="profile-avatar"
            src={userData?.profile_image}
            alt={userData?.name}
            sx={{ bgcolor: getAvatarColor(userData?.name) }}
          >
            {getInitials(userData?.name || '')}
          </Avatar>
          <Box className="profile-copy">
            <Typography className="profile-name" component="p">
              {_formatDoctorName(userData?.name || '', userData?.salutation)}
            </Typography>
            <Typography className="profile-role" component="p">
              {_toTitleCase(userData?.user_type || 'User')}
            </Typography>
          </Box>
        </Box>
        <MenuItem
          className="profile-item"
          onClick={() => setProfileAnchor(null)}
        >
          <Link href="/dashboard/profile" className="profile-menu-link">
            <span className="profile-item-icon">
              <SettingsIcon size={16} />
            </span>
            <span className="profile-item-label">Profile Settings</span>
          </Link>
        </MenuItem>
        <Divider className="profile-divider" />
        <MenuItem
          className="logout-item"
          onClick={() => {
            setProfileAnchor(null);
            setLogoutOpen(true);
          }}
        >
          <span className="profile-item-icon">
            <LogoutIcon size={16} />
          </span>
          <span className="profile-item-label">Log Out</span>
        </MenuItem>
      </ProfileMenu>

      {logoutOpen && (
        <LogoutOptionsModal
          open={logoutOpen}
          isLoading={isLogoutLoading}
          onClose={() => setLogoutOpen(false)}
          onConfirmLogout={(allDevices) => {
            handleLogout(allDevices);
          }}
        />
      )}
    </DashboardHeaderWrapper>
  );
};

export default DashboardHeader;
