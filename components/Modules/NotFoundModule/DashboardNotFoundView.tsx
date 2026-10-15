'use client';

import {
  AppointmentsIcon,
  ArrowBackIcon,
  DashboardIcon,
  MonitorIcon,
  PatientsIcon,
} from '@/components/ui/Icons/dashboard';
import { projectRoutes } from '@/routes';
import { NotFoundWrapper } from '@/styles/CustomStyled/NotFoundWrapper';
import { Button } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const DashboardNotFoundView = () => {
  const router = useRouter();

  return (
    <NotFoundWrapper className="dashboard">
      <div className="not-found-card">
        <div className="glow" />

        <div className="chip-row">
          <span className="status-chip">
            <MonitorIcon size={16} />
            Diagnosis: Route Not Found
          </span>
        </div>

        <h1 className="code">404</h1>

        <h2 className="title">Clinical Record or Page Not Found</h2>

        <p className="copy">
          The patient file, consultation room, or schedule configuration you are
          trying to view does not exist or has been relocated within the Doctor
          Portal.
        </p>

        <div className="actions">
          <Button
            component={Link}
            href={projectRoutes.dashboard}
            variant="contained"
            className="primary-btn"
            startIcon={<DashboardIcon size={18} />}
          >
            Back to Dashboard
          </Button>

          <Button
            onClick={() => router.back()}
            variant="outlined"
            className="secondary-btn"
            startIcon={<ArrowBackIcon size={18} />}
          >
            Go Back
          </Button>
        </div>

        <div className="shortcuts">
          <p className="section-label">Quick access to clinical modules</p>

          <div className="shortcut-grid">
            <Button
              component={Link}
              href={projectRoutes.appointments}
              variant="outlined"
              className="shortcut-btn"
              startIcon={<AppointmentsIcon size={18} />}
            >
              Today&apos;s Appointments
            </Button>

            <Button
              component={Link}
              href={projectRoutes.patients}
              variant="outlined"
              className="shortcut-btn"
              startIcon={<PatientsIcon size={18} />}
            >
              Patient Directory
            </Button>
          </div>
        </div>
      </div>
    </NotFoundWrapper>
  );
};

export default DashboardNotFoundView;
