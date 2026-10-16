'use client';

import Assets from '@/resources/assets';
import { AuthLayoutWrapper } from '@/styles/CustomStyled/AuthLayoutWrapper';
import { Box, Container, Typography } from '@mui/material';
import { usePathname } from 'next/navigation';
import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const pathname = usePathname();
  const isRegisterPage = pathname.includes('/register');
  const isPolicyAcceptancePage = pathname.includes('/policy-acceptance');
  const columnModifier = isRegisterPage
    ? ' is-register'
    : isPolicyAcceptancePage
      ? ' is-policy'
      : '';

  return (
    <AuthLayoutWrapper>
      <Container maxWidth="xl" className="auth-container">
        <Box className={`auth-column${columnModifier}`}>
          <Box className="logo-wrap">
            <Box
              component="img"
              className="auth-logo"
              src={Assets.webLogo}
              alt="PRED Care Logo"
            />
          </Box>
          {children}
          <Typography className="copyright">
            © 2026 PRED Care. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </AuthLayoutWrapper>
  );
};

export default AuthLayout;
