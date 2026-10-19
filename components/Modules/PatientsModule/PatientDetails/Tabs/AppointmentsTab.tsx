'use client';

import PatientAppointmentFilters from '@/components/Modules/PatientsModule/PatientDetails/Appointments/PatientAppointmentFilters';
import PatientAppointmentRow from '@/components/Modules/PatientsModule/PatientDetails/Appointments/PatientAppointmentRow';
import PatientAppointmentStatsCards from '@/components/Modules/PatientsModule/PatientDetails/CardForms/PatientAppointmentStatsCards';
import CustomTable from '@/components/ui/CustomTable/CustomTable';
import { formatTimeSlot } from '@/lib/commons/common.utils';
import { getPatientAppointments, type PatientDetails } from '@/resources/mock';
import { PatientAppointmentsWrapper } from '@/styles/CustomStyled/PatientAppointmentsWrapper';
import { memo, useMemo } from 'react';

const headList = ['Appointment', 'Modality', 'Appointment Date', 'Appointment Time', 'Status', 'Actions'];

type AppointmentsTabProps = {
  details: PatientDetails;
};

function AppointmentsTab({ details }: AppointmentsTabProps) {
  const appointments = useMemo(() => getPatientAppointments(details), [details]);

  return (
    <PatientAppointmentsWrapper>
      <PatientAppointmentStatsCards />
      <PatientAppointmentFilters />
      <CustomTable
        className="patient-appointment-table"
        headList={headList}
        page={1}
        totalPages={1}
        isEmpty={appointments.length === 0}
        emptyText="No appointments found"
      >
        {appointments.map((row) => (
          <PatientAppointmentRow
            key={row.id}
            id={row.id}
            appointmentId={row.appointmentId}
            consultationType={row.visitType}
            reason={row.reason}
            appointmentDate={row.date}
            appointmentTime={formatTimeSlot(row.startTime, row.endTime)}
            appointmentStatus={row.status}
          />
        ))}
      </CustomTable>
    </PatientAppointmentsWrapper>
  );
}

export default memo(AppointmentsTab);
