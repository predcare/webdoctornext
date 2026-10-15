"use client";

import AppDownloadSection from "@/components/Modules/CmsModule/sections/AppDownloadSection";
import ContactSection from "@/components/Modules/CmsModule/sections/ContactSection";
import FeaturesSection from "@/components/Modules/CmsModule/sections/FeaturesSection";
import HeroSection from "@/components/Modules/CmsModule/sections/HeroSection";
import QueueSection from "@/components/Modules/CmsModule/sections/QueueSection";
import RegistrationModal from "@/components/Modules/CmsModule/modals/RegistrationModal";
import { Box } from "@mui/material";
import React, { useState } from "react";

const CmsHomePage = () => {
  const [registerModalOpen, setRegisterModalOpen] = useState(false);

  const handleOpenRegister = () => {
    setRegisterModalOpen(true);
  };

  const handleCloseRegister = () => {
    setRegisterModalOpen(false);
  };

  return (
    <Box sx={{ width: "100%", overflowX: "hidden" }}>
      {/* Hero Section */}
      <HeroSection onRegisterClick={handleOpenRegister} />

      {/* About & Clinic Features Grid Section */}
      <FeaturesSection onRegisterClick={handleOpenRegister} />

      {/* Extended Features - QEase Queue Management Section */}
      <QueueSection />

      {/* App Download Banner CTA */}
      <AppDownloadSection />

      {/* Contact Us Section */}
      <ContactSection />

      {/* Clinic Registration Modal Dialog */}
      <RegistrationModal
        open={registerModalOpen}
        onClose={handleCloseRegister}
      />
    </Box>
  );
};

export default CmsHomePage;
