import { dashboardAppointments, type DashboardAppointment } from './appointments';
import { patients, type Patient } from './patients';

export type PatientDetails = Patient & {
  bloodType: string;
  registered: string;
  dateOfBirth: string;
  address: string;
  emergencyContact: string;
  allergies: string[];
  conditions: string[];
};

const bloodTypes = ['O+', 'A+', 'B+', 'AB+', 'O-'];

export const getPatientDetails = (id: string): PatientDetails => {
  const index = Math.max(
    patients.findIndex((row) => row.id === id),
    0,
  );
  const row = patients[index];

  return {
    ...row,
    bloodType: bloodTypes[index % bloodTypes.length],
    registered: '12 Mar 2025',
    dateOfBirth: '04 Jun 2012',
    address: `MG Marg, ${row.city}, Sikkim 737101`,
    emergencyContact: '+91 98765 43210',
    allergies: index % 2 === 0 ? ['Penicillin', 'Dust'] : [],
    conditions: index % 3 === 0 ? ['Asthma'] : ['Hypertension', 'Type 2 Diabetes'],
  };
};

export const getPatientAppointments = (patient: Patient): DashboardAppointment[] =>
  dashboardAppointments.map((row) => ({
    ...row,
    name: patient.name,
    initial: patient.initial,
    age: patient.age,
    gender: patient.gender === 'Female' ? 'F' : 'M',
    patientCode: patient.patientCode,
    email: patient.email,
    phone: patient.phone,
  }));
