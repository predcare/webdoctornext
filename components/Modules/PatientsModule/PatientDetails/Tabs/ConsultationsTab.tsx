'use client';

import PatientAppointmentRow from '@/components/Modules/PatientsModule/PatientDetails/Appointments/PatientAppointmentRow';
import CustomTable from '@/components/ui/CustomTable/CustomTable';
import { getPatientAppointments, type PatientDetails } from '@/resources/mock';
import { PatientAppointmentsWrapper } from '@/styles/CustomStyled/PatientAppointmentsWrapper';
import { memo, useMemo } from 'react';

const headList = ['Appointment', 'Modality', 'Schedule', 'Specialist', 'Status', ''];

type ConsultationsTabProps = {
  details: PatientDetails;
};

function ConsultationsTab({ details }: ConsultationsTabProps) {
  const appointments = useMemo(() => getPatientAppointments(details), [details]);

  return (
    <PatientAppointmentsWrapper>
      <CustomTable
        className="patient-appointment-table"
        headList={headList}
        showSearch
        searchPlaceholder="Search consultations..."
        totalResults={appointments.length}
        page={1}
        totalPages={1}
        isEmpty={appointments.length === 0}
        emptyText="No consultations found"
      >
        {appointments.map((row) => (
          <PatientAppointmentRow key={row.id} row={row} />
        ))}
      </CustomTable>
    </PatientAppointmentsWrapper>
  );
}

export default memo(ConsultationsTab);
