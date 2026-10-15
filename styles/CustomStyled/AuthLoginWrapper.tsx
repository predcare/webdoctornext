import { Paper, styled } from '@mui/material';

export const AuthLoginWrapper = styled(Paper)`
  width: 100%;
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 24px;
  background-color: ${({ theme }) => theme.palette.customColors.cardBg};
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175);
  overflow: hidden;
  padding: 24px;

  @media (min-width: 1200px) {
    padding: 48px;
  }

  .login-header {
    text-align: center;
    margin-bottom: 32px;
  }

  && .login-title {
    font-size: 1.875rem;
    font-weight: 600;
    line-height: 1.2;
    color: ${({ theme }) => theme.palette.customColors.heading};
    margin-bottom: 8px;
  }

  && .login-subtitle {
    font-size: 1.1rem;
    color: ${({ theme }) => theme.palette.text.secondary};
  }

  .login-tabs {
    margin-bottom: 32px;
  }

  .form-panel {
    animation: authFormIn 0.3s ease-out;
  }

  .field-lg {
    margin-bottom: 32px;
  }

  .field-md {
    margin-bottom: 24px;
  }

  .field-sm {
    margin-bottom: 8px;
  }

  && .otp-copy {
    text-align: center;
    color: ${({ theme }) => theme.palette.text.secondary};
    font-size: 1rem;
    margin-bottom: 24px;
  }

  .otp-boxes {
    margin-bottom: 24px;
  }

  .resend-row {
    text-align: center;
    margin-top: 16px;
  }

  .login-footer {
    text-align: center;
    margin-top: 32px;
    padding-top: 24px;
    border-top: 1px solid ${({ theme }) => theme.palette.customColors.border};
  }

  && .footer-copy {
    color: ${({ theme }) => theme.palette.text.secondary};
    font-size: 1rem;
  }

  && .remember-label {
    margin-bottom: 16px;
    margin-left: 0;
  }

  && .register-link {
    color: ${({ theme }) => theme.palette.primary.main};
    font-weight: 500;
    text-decoration: none;
  }

  && .back-home-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    margin-top: 16px;
    color: ${({ theme }) => theme.palette.text.secondary};
    font-weight: 600;
    font-size: 0.95rem;
    line-height: 1;
    text-decoration: none;

    &:hover {
      color: ${({ theme }) => theme.palette.primary.main};
    }

    svg {
      font-size: 18px;
    }
  }

  && .submit-btn {
    width: 100%;
    margin-top: 8px;
    height: 56px;
    border-radius: 12px;
    font-size: 1.125rem;
    font-weight: 600;
    color: #ffffff;
    text-transform: none;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.palette.customColors.authAccentStart} 0%,
      ${({ theme }) => theme.palette.customColors.authAccentEnd} 100%
    );

    svg {
      font-size: 18px;
      margin-right: 8px;
    }

    &:hover {
      background: linear-gradient(
        135deg,
        ${({ theme }) => theme.palette.customColors.authAccentHoverStart} 0%,
        ${({ theme }) => theme.palette.customColors.authAccentHoverEnd} 100%
      );
      transform: translateY(-1px);
    }
  }

  && .resend-btn {
    color: ${({ theme }) => theme.palette.primary.main};
    font-weight: 600;
    font-size: 1rem;
    text-transform: none;

    &:hover {
      background: transparent;
    }
  }

  @keyframes authFormIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
