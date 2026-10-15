'use client';

import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import MedicationOutlinedIcon from '@mui/icons-material/MedicationOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import { Box } from '@mui/material';
import Link from 'next/link';
import type { ReactElement } from 'react';
import { profileTabs, type ProfileTabId } from './profileTabs';

const tabIcons: Record<ProfileTabId, ReactElement> = {
  about: <PersonOutlineOutlinedIcon />,
  'basic-info': <BadgeOutlinedIcon />,
  education: <SchoolOutlinedIcon />,
  experience: <WorkOutlineOutlinedIcon />,
  certificates: <WorkspacePremiumOutlinedIcon />,
  prescription: <MedicationOutlinedIcon />,
  invoice: <ReceiptLongOutlinedIcon />,
  settings: <SettingsOutlinedIcon />,
};

type ProfileTabNavProps = {
  activeId: ProfileTabId;
};

export default function ProfileTabNav({ activeId }: ProfileTabNavProps) {
  return (
    <Box component="nav" className="tab-nav" aria-label="Profile sections">
      {profileTabs.map((tab) => {
        const isActive = tab.id === activeId;

        return (
          <Link
            key={tab.id}
            href={tab.id === 'about' ? '/dashboard/profile' : `/dashboard/profile?tab=${tab.id}`}
            scroll={false}
            className={isActive ? 'tab-link is-active' : 'tab-link'}
            aria-current={isActive ? 'page' : undefined}
          >
            {tabIcons[tab.id]}
            <span>{tab.label}</span>
          </Link>
        );
      })}
    </Box>
  );
}
