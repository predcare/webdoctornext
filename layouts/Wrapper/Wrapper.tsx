"use client";
import { Box } from "@mui/material";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper = ({ children }: WrapperProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Box
        component="main"
        sx={{ flexGrow: 1, pt: { xs: "64px", sm: "72px" } }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Wrapper;
