'use client';

import PageBreadcrumb from '@/components/commons/PageBreadcrumb/PageBreadcrumb';
import { projectRoutes } from '@/routes';
import { ProfileWrapper } from '@/styles/CustomStyled/ProfileWrapper';
import { Box } from '@mui/material';
import { useState } from 'react';
import ProfileTabNav from './ProfileTabNav';
import type { ProfileTabId } from './profileTabs';
import AboutSection from './sections/AboutSection';
import BasicInfoSection from './sections/BasicInfoSection';
import CertificatesSection from './sections/CertificatesSection';
import EducationSection from './sections/EducationSection';
import ExperienceSection from './sections/ExperienceSection';
import InvoiceSettingsSection from './sections/InvoiceSettingsSection';
import PrescriptionSettingsSection from './sections/PrescriptionSettingsSection';
import SettingsSection from './sections/SettingsSection';

const breadcrumbItems = [
  { label: 'Dashboard', href: projectRoutes.dashboard },
  { label: 'Doctor Profile' },
];

function ProfileSection({ tab }: { tab: ProfileTabId }) {
  switch (tab) {
    case 'about':
      return <AboutSection />;
    case 'basic-info':
      return <BasicInfoSection />;
    case 'education':
      return <EducationSection />;
    case 'experience':
      return <ExperienceSection />;
    case 'certificates':
      return <CertificatesSection />;
    case 'prescription':
      return <PrescriptionSettingsSection />;
    case 'invoice':
      return <InvoiceSettingsSection />;
    case 'settings':
      return <SettingsSection />;
  }
}

type ProfilePageProps = {
  tab: ProfileTabId;
};

export default function ProfilePage({ tab }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState(tab);
  const [sectionKey, setSectionKey] = useState(0);

  const handleTabChange = (tabId: ProfileTabId) => {
    setActiveTab(tabId);
    setSectionKey((current) => current + 1);
  };

  return (
    <ProfileWrapper>
      <PageBreadcrumb items={breadcrumbItems} />
      <Box
        className={
          activeTab === 'about' ? 'profile-layout is-about' : 'profile-layout'
        }
      >
        <ProfileTabNav activeId={activeTab} onTabChange={handleTabChange} />
        <Box className="profile-main">
          <ProfileSection key={`${activeTab}-${sectionKey}`} tab={activeTab} />
        </Box>
      </Box>
    </ProfileWrapper>
  );
}
