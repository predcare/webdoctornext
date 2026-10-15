'use client';

import RegistrationModal from '@/components/Modules/CmsModule/modals/RegistrationModal';
import AppDownloadSection from '@/components/Modules/CmsModule/sections/AppDownloadSection';
import ContactSection from '@/components/Modules/CmsModule/sections/ContactSection';
import FeaturesSection from '@/components/Modules/CmsModule/sections/FeaturesSection';
import HeroSection from '@/components/Modules/CmsModule/sections/HeroSection';
import QueueSection from '@/components/Modules/CmsModule/sections/QueueSection';
import { CmsLandingWrapper } from '@/styles/CustomStyled/CmsLandingWrapper';
import { useState } from 'react';

const CmsHomePage = () => {
  const [registerModalOpen, setRegisterModalOpen] = useState(false);

  const handleOpenRegister = () => {
    setRegisterModalOpen(true);
  };

  const handleCloseRegister = () => {
    setRegisterModalOpen(false);
  };

  return (
    <CmsLandingWrapper withPortals>
      <HeroSection />
      <FeaturesSection onRegisterClick={handleOpenRegister} />
      <QueueSection />
      <AppDownloadSection />
      <ContactSection />
      <RegistrationModal
        open={registerModalOpen}
        onClose={handleCloseRegister}
      />
    </CmsLandingWrapper>
  );
};

export default CmsHomePage;
