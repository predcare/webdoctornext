'use client';

import {
  AppointmentsIcon,
  ArrowBackIcon,
  AvailabilityIcon,
  DashboardIcon,
  MonitorIcon,
  PatientsIcon,
} from '@/components/ui/Icons/dashboard';
import { projectRoutes } from '@/routes';
import { NotFoundWrapper } from '@/styles/CustomStyled/NotFoundWrapper';
import { Button } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const DashboardComingSoonView = () => {
  const router = useRouter();

  return (
    <NotFoundWrapper className="dashboard">
      <div className="not-found-card">
        <div className="glow" />

        <div className="chip-row">
          <span className="status-chip">
            <MonitorIcon size={16} />
            In Development
          </span>
        </div>

        <h1 className="code">Soon</h1>

        <h2 className="title">This Feature Is Coming Soon</h2>

        <p className="copy">
          We are building this module for the Doctor Portal. It will be
          available in an upcoming release.
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

            <Button
              component={Link}
              href={projectRoutes.availability}
              variant="outlined"
              className="shortcut-btn"
              startIcon={<AvailabilityIcon size={18} />}
            >
              Doctor Availability
            </Button>
          </div>
        </div>
      </div>
    </NotFoundWrapper>
  );
};

export default DashboardComingSoonView;
