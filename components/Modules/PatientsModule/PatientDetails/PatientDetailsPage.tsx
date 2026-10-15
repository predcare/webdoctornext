'use client';
import PatientProfileCard from '@/components/Modules/PatientsModule/PatientDetails/CardForms/PatientProfileCard';
import PatientDetailTabs from '@/components/Modules/PatientsModule/PatientDetails/PatientDetailTabs';
import { getPatientDetails } from '@/resources/mock';
import { PatientDetailsWrapper } from '@/styles/CustomStyled/PatientDetailsWrapper';
import { useMemo } from 'react';

type PatientDetailsPageProps = {
  patientId: string;
};

export default function PatientDetailsPage({
  patientId,
}: PatientDetailsPageProps) {
  const details = useMemo(() => getPatientDetails(patientId), [patientId]);

  return (
    <PatientDetailsWrapper>
      <PatientProfileCard details={details} />
      <PatientDetailTabs details={details} />
    </PatientDetailsWrapper>
  );
}
