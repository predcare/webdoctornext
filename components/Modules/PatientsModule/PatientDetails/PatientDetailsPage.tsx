'use client';
import PatientProfileCard from '@/components/Modules/PatientsModule/PatientDetails/CardForms/PatientProfileCard';
import PatientDetailTabs from '@/components/Modules/PatientsModule/PatientDetails/PatientDetailTabs';
import { useMyPatientInfo } from '@/hooks/react-query/patients/patients.hooks';
import { getAge } from '@/lib/commons/common.utils';
import { projectRoutes } from '@/routes';
import { PatientDetailsWrapper } from '@/styles/CustomStyled/PatientDetailsWrapper';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

type PatientDetailsPageProps = {
  patientId: string;
};

export default function PatientDetailsPage({
  patientId,
}: PatientDetailsPageProps) {
  const router = useRouter();
  const { data: patientInfo, isPending: isPatientInfoLoading } =
    useMyPatientInfo({
      patientId: patientId,
    });
  const handleMove = useCallback((type: "appointment" | "profile",) => {
    if (type === "appointment") {
      router.push(projectRoutes.bookAppointment)
    }
  }, [router])

  return (
    <PatientDetailsWrapper>
      <PatientProfileCard
        name={patientInfo?.name ?? ''}
        gender={patientInfo?.gender ?? ''}
        age={getAge(patientInfo?.date_of_birth || '') ?? 'N/A'}
        dateOfBirth={patientInfo?.date_of_birth ?? ''}
        bloodType={patientInfo?.blood_type ?? ''}
        patientCode={patientInfo?.patient_id ?? ''}
        ptStatus={patientInfo?.status ?? ''}
        phone={patientInfo?.phone_number ?? ''}
        email={patientInfo?.email ?? ''}
        city={patientInfo?.city ?? ''}
        onAppointmentBook={() => { handleMove("appointment") }}
      />
      <PatientDetailTabs patientInfo={patientInfo!} patientId={patientId} />
    </PatientDetailsWrapper>
  );
}
