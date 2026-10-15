'use client';

import {
  ArrowBackIcon,
  LockIcon,
  LoginIcon,
  PersonAddIcon,
} from '@/components/ui/Icons/dashboard';
import { projectRoutes } from '@/routes';
import { NotFoundWrapper } from '@/styles/CustomStyled/NotFoundWrapper';
import { Button } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const AuthNotFoundView = () => {
  const router = useRouter();

  return (
    <NotFoundWrapper className="auth">
      <div className="not-found-card">
        <div className="icon-badge">
          <LockIcon size={36} />
        </div>

        <span className="status-chip">404 — Authentication Route</span>

        <h1 className="title">Auth Route Not Found</h1>

        <p className="copy">
          The sign-in link, password verification session, or portal gate you
          requested is invalid, expired, or has moved.
        </p>

        <div className="actions">
          <Button
            component={Link}
            href={projectRoutes.doctorLogin}
            variant="contained"
            className="primary-btn"
            startIcon={<LoginIcon size={18} />}
          >
            Return to Doctor Login
          </Button>

          <Button
            component="a"
            href="https://stage.predcare.in/doctor/register"
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            className="secondary-btn"
            startIcon={<PersonAddIcon size={18} />}
          >
            Register New Clinic
          </Button>

          <Button
            onClick={() => router.back()}
            className="ghost-btn"
            startIcon={<ArrowBackIcon size={18} />}
          >
            Go Back
          </Button>
        </div>
      </div>
    </NotFoundWrapper>
  );
};

export default AuthNotFoundView;
