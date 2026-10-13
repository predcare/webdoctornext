'use client';

import {
  BellIcon,
  ChevronIcon,
  ClinicIcon,
  LogoutIcon,
  MenuIcon,
  PatientsIcon,
} from '@/components/ui/Icons/dashboard';
import { dashboardDoctor } from '@/configs/dashboardNav';
import { clinics, notifications } from '@/resources/mock';
import {
  ClinicMenu,
  DashboardHeaderWrapper,
  NoticeMenu,
  ProfileMenu,
} from '@/styles/CustomStyled/DashboardHeaderWrapper';
import { Box, Button, Chip, Divider, MenuItem, Typography } from '@mui/material';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { useEffect, useState } from 'react';

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
  const [activeClinicId, setActiveClinicId] = useState(clinics[0].id);
  const [todayLabel, setTodayLabel] = useState('');
  const activeClinic = clinics.find((clinic) => clinic.id === activeClinicId) ?? clinics[0];

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
            {dashboardDoctor.greeting}
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
        onClick={(event) => setClinicAnchor(event.currentTarget)}
      >
        <span className="clinic-icon">
          <ClinicIcon />
        </span>
        <span className="clinic-copy">
          <span className="clinic-label">{activeClinic.label}</span>
          <span className="clinic-name">{activeClinic.name}</span>
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
          {dashboardDoctor.avatar}
          <span className="online-dot" />
        </Button>
      </Box>

      <ClinicMenu
        anchorEl={clinicAnchor}
        open={Boolean(clinicAnchor)}
        onClose={() => setClinicAnchor(null)}
        {...menuOrigin}
      >
        {clinics.map((clinic) => (
          <MenuItem
            key={clinic.id}
            className="clinic-item"
            selected={clinic.id === activeClinic.id}
            onClick={() => {
              setActiveClinicId(clinic.id);
              setClinicAnchor(null);
            }}
          >
            <span className="clinic-item-icon">
              <ClinicIcon size={16} />
            </span>
            <span className="clinic-item-copy">
              <span className="clinic-item-label">{clinic.label}</span>
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
          <span className="profile-avatar">{dashboardDoctor.avatar}</span>
          <Box className="profile-copy">
            <Typography className="profile-name" component="p">
              {dashboardDoctor.name}
            </Typography>
            <Typography className="profile-role" component="p">
              {dashboardDoctor.role}
            </Typography>
          </Box>
        </Box>
        <MenuItem className="profile-item" onClick={() => setProfileAnchor(null)}>
          <PatientsIcon size={18} />
          Profile Settings
        </MenuItem>
        <Divider className="profile-divider" />
        <MenuItem className="logout-item" onClick={() => setProfileAnchor(null)}>
          <LogoutIcon />
          Log Out
        </MenuItem>
      </ProfileMenu>
    </DashboardHeaderWrapper>
  );
};

export default DashboardHeader;
