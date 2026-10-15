"use client";
import { CmsLayoutWrapper } from "@/styles/CustomStyled/CmsLayoutWrapper";
import { Box } from "@mui/material";
import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper = ({ children }: WrapperProps) => {
  return (
    <CmsLayoutWrapper>
      <Header />
      <Box component="main" className="cms-main">
        {children}
      </Box>
      <Footer />
    </CmsLayoutWrapper>
  );
};

export default Wrapper;
