import { Box, styled } from '@mui/material';

export const AuthLayoutWrapper = styled(Box)`
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  position: relative;
  overflow-x: hidden;
  padding: 32px 16px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.palette.customColors.authGradientStart} 0%,
    ${({ theme }) => theme.palette.customColors.authGradientMid} 50%,
    ${({ theme }) => theme.palette.customColors.authGradientEnd} 100%
  );
  background-attachment: fixed;

  @media (min-height: 700px) {
    align-items: center;
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.5;
    pointer-events: none;
  }

  .auth-container {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: center;
    padding-left: 0;
    padding-right: 0;
  }

  .auth-column {
    width: 100%;
    max-width: 480px;
    max-height: 100%;
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    animation: authFadeIn 0.5s ease-in;
  }

  .auth-column.is-register {
    max-width: 740px;
  }

  .logo-wrap {
    text-align: center;
    margin-bottom: clamp(6px, 1.2vh, 14px);
    flex-shrink: 0;
  }

  .auth-logo {
    height: clamp(40px, 7.5vh, 64px) !important;
    width: auto;
    max-width: min(220px, 70vw);
    margin-left: auto;
    margin-right: auto;
  }

  && .copyright {
    margin-top: clamp(6px, 1vh, 12px);
    text-align: center;
    color: ${({ theme }) => theme.palette.customColors.authOnGradient};
    font-size: clamp(11px, 1.5vh, 13px);
    line-height: 1.2;
    flex-shrink: 0;
  }

  @media (max-height: 560px) {
    padding-top: 16px;
    padding-bottom: 8px;

    .auth-logo {
      height: 32px !important;
    }

    .logo-wrap {
      margin-bottom: 4px;
    }

    && .copyright {
      margin-top: 4px;
    }
  }

  @keyframes authFadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
