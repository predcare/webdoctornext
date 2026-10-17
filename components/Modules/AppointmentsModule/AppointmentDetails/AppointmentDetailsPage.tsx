'use client';

import EmptyState from '@/components/commons/EmptyState/EmptyState';
import PageBreadcrumb from '@/components/commons/PageBreadcrumb/PageBreadcrumb';
import AppointmentInfoCard from '@/components/Modules/AppointmentsModule/AppointmentDetails/AppointmentInfoCard';
import ClinicInfoCard from '@/components/Modules/AppointmentsModule/AppointmentDetails/ClinicInfoCard';
import PatientSummaryCard from '@/components/Modules/AppointmentsModule/AppointmentDetails/PatientSummaryCard';
import PrescriptionsCard from '@/components/Modules/AppointmentsModule/AppointmentDetails/PrescriptionsCard';
import AppointmentDetailsSkeleton from '@/components/Modules/AppointmentsModule/AppointmentDetails/Skeletons/AppointmentDetailsSkeleton';
import UpdateStatusCard from '@/components/Modules/AppointmentsModule/AppointmentDetails/UpdateStatusCard';
import { useMyAppointmentInfo } from '@/hooks/react-query/appointments/appointments.hooks';
import {
  _toTitleCase,
  formatDate,
  formatTimeSlot,
  getAge,
} from '@/lib/commons/common.utils';
import { showErrorToast } from '@/lib/commons/toast';
import {
  getApiErrorMessage,
  getApiErrorStatus,
} from '@/lib/functions/_helpers.lib';
import { getAppointmentDetails } from '@/resources/mock';
import { projectRoutes } from '@/routes';
import { AppointmentDetailsWrapper } from '@/styles/CustomStyled/AppointmentDetailsWrapper';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, Grid } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

type AppointmentDetailsPageProps = {
  appointmentId: string;
};

export default function AppointmentDetailsPage({
  appointmentId,
}: AppointmentDetailsPageProps) {
  const router = useRouter();
  const details = useMemo(
    () => getAppointmentDetails(appointmentId),
    [appointmentId],
  );

  const {
    data: apptInfo,
    isPending: isApptInfoPending,
    isFetching: isApptInfoFetching,
    isError: isApptInfoError,
    error: apptInfoError,
    refetch: refetchApptInfo,
  } = useMyAppointmentInfo({ id: appointmentId });

  const breadcrumbItems = useMemo(
    () => [
      { label: 'Dashboard', href: projectRoutes.dashboard },
      { label: 'Appointment List', href: projectRoutes.appointments },
      { label: apptInfo?.appointment_id || '' },
    ],
    [apptInfo?.appointment_id],
  );

  const isNotFoundError = getApiErrorStatus(apptInfoError) === 404;

  const handleProfileView = () => {
    if (apptInfo?.patient?.user_id) {
      router.push(projectRoutes.patientDetails(apptInfo.patient.user_id));
    } else {
      showErrorToast('Patient not found in the system');
    }
  };

  return (
    <AppointmentDetailsWrapper>
      <PageBreadcrumb
        items={breadcrumbItems}
        action={
          <Button
            className="page-action"
            variant="outlined"
            component={Link}
            href={projectRoutes.appointments}
            startIcon={<ArrowBackIcon fontSize="small" />}
          >
            Back to List
          </Button>
        }
      />

      {isApptInfoPending ? (
        <AppointmentDetailsSkeleton />
      ) : isApptInfoError ? (
        <EmptyState
          compact
          variant={isNotFoundError ? 'not-found' : 'error'}
          text={
            isNotFoundError
              ? 'Appointment not found'
              : 'Unable to load appointment'
          }
          textVariant="h6"
          description={getApiErrorMessage(apptInfoError)}
          onRetry={isNotFoundError ? undefined : () => refetchApptInfo()}
          retrying={isApptInfoFetching}
          backHref={projectRoutes.appointments}
        />
      ) : !apptInfo ? (
        <EmptyState
          compact
          variant="not-found"
          text="Appointment not found"
          textVariant="h6"
          description="This appointment may have been removed or you may not have access to it."
          backHref={projectRoutes.appointments}
        />
      ) : (
        <Grid container spacing={{ xs: 2, sm: 2.5, lg: 3 }}>
          <Grid size={12}>
            <PatientSummaryCard
              details={details}
              patientName={apptInfo.patient?.name || 'N/A'}
              patientCode={apptInfo.patient?.patient_id || 'N/A'}
              gender={_toTitleCase(apptInfo.patient?.gender || '')}
              age={getAge(apptInfo.patient?.date_of_birth || '')}
              phone={apptInfo.patient?.phone_number || 'N/A'}
              email={apptInfo.patient?.email || ''}
              bloodType={apptInfo.patient?.blood_type || 'N/A'}
              city={apptInfo.patient?.city || 'N/A'}
              onProfileView={handleProfileView}
            />
          </Grid>
          <Grid size={{ xs: 12, lg: 8 }}>
            <AppointmentInfoCard
              appointmentId={apptInfo.appointment_id || ''}
              appointmentStatus={apptInfo.appointment_status || ''}
              appointmentDate={formatDate(apptInfo.appointment_date)}
              appointmentTime={formatTimeSlot(
                apptInfo.start_time,
                apptInfo.end_time,
              )}
              appointmentType={apptInfo.appointment_type || ''}
              consultationType={apptInfo.consultation_type || ''}
              specialization={apptInfo.specialization}
              consultationFee={apptInfo.appointment_fee}
              feeType={apptInfo.fee_type}
              paymentStatus={apptInfo.payment_status}
              paymentType={apptInfo.payment_type}
              reasonForVisit={apptInfo.reason}
              doctorNote={apptInfo.doctor_note}
            />
          </Grid>
          {Boolean(apptInfo.appointment_status) && Boolean(appointmentId) && (
            <Grid size={{ xs: 12, lg: 4 }}>
              <UpdateStatusCard
                status={apptInfo.appointment_status}
                appointmentId={appointmentId}
              />
            </Grid>
          )}
          <Grid size={12}>
            <PrescriptionsCard
              prescriptions={details.prescriptions}
              prescribedBy={details.prescribedBy}
            />
          </Grid>
          <Grid size={12}>
            <ClinicInfoCard
              clinicName={apptInfo.clinic?.name || 'N/A'}
              clinicAddress={apptInfo.clinic?.full_address || 'N/A'}
              clinicContact={
                apptInfo.clinic?.contact_numbers?.join(', ') || 'N/A'
              }
              gstNumber={apptInfo.clinic?.gst_number || 'N/A'}
              clinicEmail={apptInfo.clinic?.email || 'N/A'}
              clinicRegistrationNumber={
                apptInfo.clinic?.clinic_reg_number || 'N/A'
              }
            />
          </Grid>
        </Grid>
      )}
    </AppointmentDetailsWrapper>
  );
}
