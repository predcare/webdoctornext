'use client';

import {
  ArrowForwardIcon,
  AvailabilityIcon,
  ClinicIcon,
  DoctorsIcon,
  HelpIcon,
  HomeIcon,
} from '@/components/ui/Icons/dashboard';
import { projectRoutes } from '@/routes';
import { NotFoundWrapper } from '@/styles/CustomStyled/NotFoundWrapper';
import { Button } from '@mui/material';
import Link from 'next/link';

const CMS_QUICK_FEATURES = [
  {
    title: 'Clinic Management',
    description: 'Digital prescriptions, appointments, and EMR records.',
    href: '/#features',
    icon: <ClinicIcon size={28} />,
  },
  {
    title: 'QEase Queue System',
    description: 'Scan QR code to join clinic queues with zero waiting.',
    href: '/#about',
    icon: <AvailabilityIcon size={28} />,
  },
  {
    title: 'Doctor Registration',
    description: 'Start your 14-day free trial as a healthcare provider.',
    href: 'https://stage.predcare.in/doctor/register',
    icon: <DoctorsIcon size={28} />,
  },
];

const CmsNotFoundView = () => {
  return (
    <NotFoundWrapper className="cms">
      <div className="cms-inner">
        <div className="centerpiece">
          <span className="status-chip">404 — Page Not Found</span>

          <h1 className="code">404</h1>

          <h2 className="title">Looking for PRED Care Healthcare Solutions?</h2>

          <p className="copy">
            The page you are trying to access does not exist or may have been
            moved. Explore our clinic features, check our queue management
            system, or return home.
          </p>

          <div className="actions">
            <Button
              component={Link}
              href={projectRoutes.home}
              variant="contained"
              className="primary-btn"
              startIcon={<HomeIcon size={18} />}
            >
              Back to Homepage
            </Button>

            <Button
              component={Link}
              href="/#features"
              variant="outlined"
              className="secondary-btn"
              endIcon={<ArrowForwardIcon size={18} />}
            >
              Explore Features
            </Button>

            <Button
              component="a"
              href="mailto:info@predcare.in"
              className="ghost-btn"
              startIcon={<HelpIcon size={18} />}
            >
              Contact Support
            </Button>
          </div>
        </div>

        <div className="destinations">
          <p className="section-label">Popular destinations</p>

          <div className="feature-grid">
            {CMS_QUICK_FEATURES.map((item) => (
              <Link key={item.title} href={item.href} className="feature-card">
                <span className="feature-icon">{item.icon}</span>
                <h3 className="feature-title">{item.title}</h3>
                <p className="feature-copy">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </NotFoundWrapper>
  );
};

export default CmsNotFoundView;
