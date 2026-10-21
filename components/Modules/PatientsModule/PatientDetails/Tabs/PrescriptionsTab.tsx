'use client';

import TabSectionCard from '@/components/Modules/PatientsModule/PatientDetails/CardForms/TabSectionCard';
import PrescriptionRow from '@/components/Modules/PatientsModule/PatientDetails/Prescriptions/PrescriptionRow';
import CustomTable from '@/components/ui/CustomTable/CustomTable';
import { useMyPatientPrescriptions } from '@/hooks/react-query/patients/patients.hooks';
import { formatDate, openInNewTab } from '@/lib/commons/common.utils';
import { showErrorToast } from '@/lib/commons/toast';
import { projectRoutes } from '@/routes';
import { PatientTabContentWrapper } from '@/styles/CustomStyled/PatientTabContentWrapper';
import type {
  IPatientLabTest,
  IPatientMedication,
} from '@/typescripts/interfaces/prescriptions.interfaces';
import MedicationOutlinedIcon from '@mui/icons-material/MedicationOutlined';
import { useRouter } from 'next/navigation';
import { memo, useCallback } from 'react';

const headList = [
  'Date',
  'Diagnosis',
  'Medications',
  'Lab Tests',
  'Follow-up',
  'Email Status',
  'Actions',
];

interface IPrescriptionsTabProps {
  patientId: string;
}

function PrescriptionsTab({ patientId }: IPrescriptionsTabProps) {
  const router = useRouter();
  const { data: prescriptions, isPending: isPrescriptionsPending } =
    useMyPatientPrescriptions({
      patientId,
    });

  const handleNewPrescription = useCallback(() => {
    if (!patientId) return showErrorToast('Invalid patient ID.');
    router.push(
      projectRoutes.managePrescription({
        patientId,
      }),
    );
  }, [router, patientId]);

  return (
    <PatientTabContentWrapper>
      <TabSectionCard
        title="Prescriptions"
        icon={<MedicationOutlinedIcon />}
        actionLabel="New Prescription"
        actionOnClick={handleNewPrescription}
      >
        <CustomTable
          className="tab-table prescriptions-table"
          headList={headList}
          zebraStriping={false}
          isLoading={isPrescriptionsPending}
          isEmpty={!isPrescriptionsPending && !prescriptions?.length}
          emptyText="No prescriptions found"
          emptyDescription="Prescriptions created for this patient will appear here."
        >
          {prescriptions?.map((prescription) => {
            const consultedAt =
              prescription.consultation_date || prescription.created_at;
            const followUp =
              prescription.follow_up_date || prescription.follow_up;

            return (
              <PrescriptionRow
                key={prescription.id}
                prescriptionId={prescription.prescription_id}
                date={formatDate(consultedAt)}
                time={formatDate(prescription.created_at, 'hh:mm A')}
                diagnosis={prescription.diagnosis}
                complaints={
                  prescription.chief_complaints || prescription.symptoms || ''
                }
                medicationNames={(prescription.medications ?? [])
                  .map((medication: IPatientMedication) =>
                    medication.name?.trim(),
                  )
                  .filter(Boolean)}
                labTestNames={(prescription.lab_tests ?? [])
                  .map((labTest: IPatientLabTest) =>
                    (labTest.name || labTest.text || '').trim(),
                  )
                  .filter(Boolean)}
                followUpDate={formatDate(followUp)}
                emailSentAt={formatDate(
                  prescription.email_sent_at,
                  'DD MMM, hh:mm A',
                )}
                onView={() => openInNewTab(prescription.pdf_url)}
                onEdit={() =>
                  router.push(
                    projectRoutes.managePrescription({
                      patientId,
                      prescriptionId: prescription.id,
                    }),
                  )
                }
              />
            );
          })}
        </CustomTable>
      </TabSectionCard>
    </PatientTabContentWrapper>
  );
}

export default memo(PrescriptionsTab);
