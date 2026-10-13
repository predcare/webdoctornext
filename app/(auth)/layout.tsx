'use client';

import Assets from '@/resources/assets';
import { AuthLayoutWrapper } from '@/styles/CustomStyled/AuthLayoutWrapper';
import { Box, Typography } from '@mui/material';
import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <AuthLayoutWrapper>
      <Box className="auth-column">
        <Box className="logo-wrap">
          <Box
            component="img"
            className="auth-logo"
            src={Assets.webLogo}
            alt="PRED Care Logo"
          />
        </Box>
        {children}
        <Typography className="copyright">© 2026 PRED Care. All rights reserved.</Typography>
      </Box>
    </AuthLayoutWrapper>
  );
};

export default AuthLayout;
