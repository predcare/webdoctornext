'use client';

import Assets from '@/resources/assets';
import { AuthLayoutWrapper } from '@/styles/CustomStyled/AuthLayoutWrapper';
import { Box, Container, Typography } from '@mui/material';
import { usePathname } from 'next/navigation';
import React, { Suspense } from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

function AuthColumnContent({ children }: AuthLayoutProps) {
  const pathname = usePathname();
  const isRegisterPage = pathname?.includes('/register');
  const isPolicyAcceptancePage = pathname?.includes('/policy-acceptance');
  const columnModifier = isRegisterPage
    ? ' is-register'
    : isPolicyAcceptancePage
      ? ' is-policy'
      : '';

  return (
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
  );
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <AuthLayoutWrapper>
      <Container maxWidth="xl" className="auth-container">
        <Suspense
          fallback={
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
              <Typography className="copyright">
                © 2026 PRED Care. All rights reserved.
              </Typography>
            </Box>
          }
        >
          <AuthColumnContent>{children}</AuthColumnContent>
        </Suspense>
      </Container>
    </AuthLayoutWrapper>
  );
};

export default AuthLayout;
