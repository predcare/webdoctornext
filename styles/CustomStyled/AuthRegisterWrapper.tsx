import { styled } from '@mui/material';
import { AuthLoginWrapper } from './AuthLoginWrapper';

export const AuthRegisterWrapper = styled(AuthLoginWrapper)`
  width: 100%;
  max-width: 740px;
  padding: 24px;

  @media (min-width: 1200px) {
    padding: 32px;
  }

  .form-panel {
    width: 100%;
  }

  .login-header {
    margin-bottom: 24px;
  }

  .register-avatar {
    width: 56px;
    height: 56px;
    margin: 0 auto 12px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) =>
      `${theme.palette.customColors.authAccentStart}1F`};
    color: ${({ theme }) => theme.palette.customColors.authAccentEnd};

    svg {
      font-size: 28px;
    }
  }

  && .login-subtitle {
    font-size: 0.95rem;
    line-height: 1.4;
  }

  .register-fields {
    margin-bottom: 8px;
  }

  .is-required .inputLabel-txt-global::after {
    content: '*';
    margin-left: 2px;
    font-weight: 700;
    color: ${({ theme }) => theme.palette.customColors.error};
  }
`;
