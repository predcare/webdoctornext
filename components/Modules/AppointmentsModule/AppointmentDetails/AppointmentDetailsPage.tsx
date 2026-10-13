'use client';

import PageBreadcrumb from '@/components/commons/PageBreadcrumb/PageBreadcrumb';
import AppointmentInfoCard from '@/components/Modules/AppointmentsModule/AppointmentDetails/AppointmentInfoCard';
import ClinicInfoCard from '@/components/Modules/AppointmentsModule/AppointmentDetails/ClinicInfoCard';
import PatientSummaryCard from '@/components/Modules/AppointmentsModule/AppointmentDetails/PatientSummaryCard';
import PrescriptionsCard from '@/components/Modules/AppointmentsModule/AppointmentDetails/PrescriptionsCard';
import UpdateStatusCard from '@/components/Modules/AppointmentsModule/AppointmentDetails/UpdateStatusCard';
import { getAppointmentDetails } from '@/resources/mock';
import { projectRoutes } from '@/routes';
import { AppointmentDetailsWrapper } from '@/styles/CustomStyled/AppointmentDetailsWrapper';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, Grid } from '@mui/material';
import Link from 'next/link';
import { useMemo } from 'react';

const backAction = (
  <Button
    className="page-action"
    variant="outlined"
    component={Link}
    href={projectRoutes.appointments}
    startIcon={<ArrowBackIcon fontSize="small" />}
  >
    Back to List
  </Button>
);

type AppointmentDetailsPageProps = {
  appointmentId: string;
};

export default function AppointmentDetailsPage({
  appointmentId,
}: AppointmentDetailsPageProps) {
  const details = useMemo(
    () => getAppointmentDetails(appointmentId),
    [appointmentId],
  );
  const breadcrumbItems = useMemo(
    () => [
      { label: 'Dashboard', href: projectRoutes.dashboard },
      { label: 'Appointment List', href: projectRoutes.appointments },
      { label: details.appointmentId },
    ],
    [details.appointmentId],
  );

  return (
    <AppointmentDetailsWrapper>
      <PageBreadcrumb items={breadcrumbItems} action={backAction} />

      <Grid container spacing={{ xs: 2, sm: 2.5, lg: 3 }}>
        <Grid size={12}>
          <PatientSummaryCard details={details} />
        </Grid>
        <Grid size={{ xs: 12, lg: 8 }}>
          <AppointmentInfoCard details={details} />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <UpdateStatusCard status={details.status} />
        </Grid>
        <Grid size={12}>
          <PrescriptionsCard prescriptions={details.prescriptions} prescribedBy={details.prescribedBy} />
        </Grid>
        <Grid size={12}>
          <ClinicInfoCard clinic={details.clinic} />
        </Grid>
      </Grid>
    </AppointmentDetailsWrapper>
  );
}
