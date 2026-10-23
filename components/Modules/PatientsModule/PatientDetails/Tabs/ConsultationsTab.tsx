'use client';

import PatientAppointmentRow from '@/components/Modules/PatientsModule/PatientDetails/Appointments/PatientAppointmentRow';
import CustomTable from '@/components/ui/CustomTable/CustomTable';
import { useMyPatientConsults } from '@/hooks/react-query/patients/patients.hooks';
import { formatDate, formatTimeSlot } from '@/lib/commons/common.utils';
import { PatientAppointmentsWrapper } from '@/styles/CustomStyled/PatientAppointmentsWrapper';
import { memo, useState } from 'react';

const headList = [
  'Appointment',
  'Modality',
  'Appointment Date',
  'Appointment Time',
  'Status',
  'Actions',
];

type ConsultationsTabProps = {
  patientId: string;
};

function ConsultationsTab({ patientId }: ConsultationsTabProps) {
  const [page, setPage] = useState(1);
  const { data: ptConsults, isPending: ptConsultPending } =
    useMyPatientConsults({
      limit: 5,
      page,
      patientId,
      status: 'completed,confirmed,in-progress',
    });

  return (
    <PatientAppointmentsWrapper>
      <CustomTable
        className="patient-appointment-table"
        headList={headList}
        totalResults={ptConsults?.meta?.total ?? 0}
        page={page}
        totalPages={ptConsults?.meta?.totalPages ?? 1}
        onPageChange={setPage}
        isLoading={ptConsultPending}
        isEmpty={!ptConsultPending && ptConsults?.meta?.total === 0}
        emptyText="No consultations found"
        zebraStriping={false}
      >
        {ptConsults?.data.map((consult) => (
          <PatientAppointmentRow
            key={consult.id}
            id={String(consult.id)}
            appointmentId={consult.appointment_id}
            consultationType={consult.consultation_type}
            reason={consult.reason || ''}
            appointmentDate={formatDate(consult.appointment_date)}
            appointmentTime={formatTimeSlot(
              consult.start_time,
              consult.end_time,
            )}
            appointmentStatus={consult.appointment_status}
          />
        ))}
      </CustomTable>
    </PatientAppointmentsWrapper>
  );
}

export default memo(ConsultationsTab);
