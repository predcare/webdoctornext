'use client';

import {
  ArrowBackIcon,
  DashboardIcon,
  MonitorIcon,
} from '@/components/ui/Icons/dashboard';
import { projectRoutes } from '@/routes';
import { NotFoundWrapper } from '@/styles/CustomStyled/NotFoundWrapper';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { memo, useCallback, useEffect, useRef, useState } from 'react';

type DashboardInvalidParamViewProps = {
  title?: string;
  message?: string;
  fallbackHref?: string;
  seconds?: number;
};

const DashboardInvalidParamView = ({
  title = 'Invalid or Expired Link',
  message = 'The record you are trying to open is invalid or no longer exists.',
  fallbackHref = projectRoutes.dashboard,
  seconds = 5,
}: DashboardInvalidParamViewProps) => {
  const router = useRouter();
  const [secondsLeft, setSecondsLeft] = useState(seconds);
  const hasNavigated = useRef(false);

  const goBack = useCallback(() => {
    if (hasNavigated.current) return;
    hasNavigated.current = true;

    if (window.history.length > 1) {
      router.back();
    } else {
      router.replace(fallbackHref);
    }
  }, [router, fallbackHref]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((value) => Math.max(value - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (secondsLeft === 0) {
      goBack();
    }
  }, [secondsLeft, goBack]);

  return (
    <NotFoundWrapper className="dashboard error">
      <div className="not-found-card">
        <div className="glow" />

        <div className="chip-row">
          <span className="status-chip">
            <MonitorIcon size={16} />
            Diagnosis: Invalid Reference
          </span>
        </div>

        <h1 className="code">Oops</h1>

        <h2 className="title">{title}</h2>

        <p className="copy">{message}</p>

        <p className="countdown" aria-live="polite">
          Redirecting you back in <strong>{secondsLeft}s</strong>...
        </p>

        <div className="actions">
          <Button
            onClick={goBack}
            variant="contained"
            className="primary-btn"
            startIcon={<ArrowBackIcon size={18} />}
          >
            Go Back Now
          </Button>

          <Button
            href={projectRoutes.dashboard}
            variant="outlined"
            className="secondary-btn"
            startIcon={<DashboardIcon size={18} />}
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    </NotFoundWrapper>
  );
};

export default memo(DashboardInvalidParamView);
