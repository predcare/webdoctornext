import { IMyApptQueryParams } from '@/hooks/react-query/appointments/payload.interafce';

export const todayAppointmentsHeadList = [
  'Patient details',
  'Consult Type',
  'Appointment ID',
  'Date',
  'Time',
  'Status',
  'Actions',
];

export const todayAppointmentsQueryParams: IMyApptQueryParams = {
  page: 1,
  limit: 2,
  status: 'upcoming,pending',
  date_range: 'today',
};
