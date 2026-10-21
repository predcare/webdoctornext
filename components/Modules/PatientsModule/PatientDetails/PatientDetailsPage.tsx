'use client';
import PatientProfileCard from '@/components/Modules/PatientsModule/PatientDetails/CardForms/PatientProfileCard';
import PatientDetailTabs from '@/components/Modules/PatientsModule/PatientDetails/PatientDetailTabs';
import { useMyPatientInfo } from '@/hooks/react-query/patients/patients.hooks';
import { _toTitleCase, formatDate, getAge } from '@/lib/commons/common.utils';
import { projectRoutes } from '@/routes';
import { PatientDetailsWrapper } from '@/styles/CustomStyled/PatientDetailsWrapper';
import { useRouter } from 'next/navigation';
import { memo, useCallback } from 'react';
import PatientDetailsSkeleton from './Skeletons/PatientDetailsSkeleton';

type PatientDetailsPageProps = {
  patientId: string;
};

function PatientDetailsPage({ patientId }: PatientDetailsPageProps) {
  const router = useRouter();
  const { data: patientInfo, isFetching: isPatientInfoLoading } =
    useMyPatientInfo({
      patientId: patientId,
    });
  const handleMove = useCallback(
    (type: 'appointment' | 'profile') => {
      if (type === 'appointment') {
        router.push(projectRoutes.bookAppointment);
      }
    },
    [router],
  );

  if (isPatientInfoLoading) {
    return (
      <PatientDetailsWrapper>
        <PatientDetailsSkeleton />
      </PatientDetailsWrapper>
    );
  }

  return (
    <PatientDetailsWrapper>
      <PatientProfileCard
        name={patientInfo?.name ?? ''}
        profileImg={patientInfo?.profile_image ?? ''}
        gender={_toTitleCase(patientInfo?.gender || '') ?? 'N/A'}
        age={getAge(patientInfo?.date_of_birth || '', { large: true }) ?? 'N/A'}
        dateOfBirth={formatDate(patientInfo?.date_of_birth) ?? ''}
        bloodType={patientInfo?.blood_type ?? '-'}
        patientCode={patientInfo?.patient_id ?? ''}
        ptStatus={_toTitleCase(patientInfo?.status || '') ?? 'N/A'}
        phone={patientInfo?.phone_number ?? ''}
        email={patientInfo?.email ?? ''}
        city={patientInfo?.city ?? ''}
        onAppointmentBook={() => {
          handleMove('appointment');
        }}
      />
      <PatientDetailTabs patientInfo={patientInfo!} patientId={patientId} />
    </PatientDetailsWrapper>
  );
}

export default memo(PatientDetailsPage);
