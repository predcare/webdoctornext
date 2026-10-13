"use client";
import { CmsLayoutWrapper } from "@/styles/CustomStyled/CmsLayoutWrapper";
import { Box, Container } from "@mui/material";
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
        <Container maxWidth="xl">{children}</Container>
      </Box>
      <Footer />
    </CmsLayoutWrapper>
  );
};

export default Wrapper;
