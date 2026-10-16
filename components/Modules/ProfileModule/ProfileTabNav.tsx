'use client';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MedicationOutlinedIcon from '@mui/icons-material/MedicationOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import { Box } from '@mui/material';
import { usePathname } from 'next/navigation';
import type { ReactElement } from 'react';
import { profileTabs, type ProfileTabId } from './profileTabs';

const tabIcons: Record<ProfileTabId, ReactElement> = {
  about: <PersonOutlineOutlinedIcon />,
  'basic-info': <AccountCircleOutlinedIcon />,
  education: <SchoolOutlinedIcon />,
  experience: <WorkOutlineOutlinedIcon />,
  certificates: <WorkspacePremiumOutlinedIcon />,
  prescription: <MedicationOutlinedIcon />,
  invoice: <ReceiptLongOutlinedIcon />,
  settings: <SettingsOutlinedIcon />,
};

type ProfileTabNavProps = {
  activeId: ProfileTabId;
  onTabChange: (tabId: ProfileTabId) => void;
};

export default function ProfileTabNav({
  activeId,
  onTabChange,
}: ProfileTabNavProps) {
  const pathname = usePathname();

  const handleTabClick = (tabId: ProfileTabId) => {
    if (tabId !== activeId) {
      window.history.replaceState(null, '', `${pathname}?tab=${tabId}`);
    }
    onTabChange(tabId);
  };

  return (
    <Box component="nav" className="tab-nav" aria-label="Profile sections">
      {profileTabs.map((tab) => {
        const isActive = tab.id === activeId;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => handleTabClick(tab.id)}
            className={isActive ? 'tab-link is-active' : 'tab-link'}
            aria-current={isActive ? 'page' : undefined}
          >
            {tabIcons[tab.id]}
            <span>{tab.label}</span>
          </button>
        );
      })}
    </Box>
  );
}
