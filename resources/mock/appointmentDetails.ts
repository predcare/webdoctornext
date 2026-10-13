import { dashboardAppointments, type DashboardAppointment } from './appointments';

export type PaymentStatus = 'Pending' | 'Paid';

export type AppointmentPrescription = {
  id: string;
  medicine: string;
  form: string;
  dosage: string;
  timing: string;
  frequency: string;
  duration: string;
  instructions: string;
  sentOn: string;
};

export type AppointmentClinic = {
  name: string;
  address: string;
  contact: string;
};

export type AppointmentDetails = DashboardAppointment & {
  bloodType: string;
  lastVisit: string;
  registered: string;
  city: string;
  appointmentType: 'First Visit' | 'Follow-up';
  consultationFee: string;
  paymentStatus: PaymentStatus;
  reasonForVisit: string;
  prescribedBy: string;
  prescriptions: AppointmentPrescription[];
  clinic: AppointmentClinic;
};

type PrescriptionTemplate = Omit<AppointmentPrescription, 'sentOn'>;

const generalPhysicianSet: PrescriptionTemplate[] = [
  {
    id: 'gp-1',
    medicine: 'Paracetamol 650 mg',
    form: 'Tablet',
    dosage: '1 tablet',
    timing: 'After food',
    frequency: 'Twice a day',
    duration: '5 days',
    instructions: 'Take only if temperature is above 100°F',
  },
  {
    id: 'gp-2',
    medicine: 'Cetirizine 10 mg',
    form: 'Tablet',
    dosage: '1 tablet',
    timing: 'After food',
    frequency: 'Once at night',
    duration: '7 days',
    instructions: 'May cause drowsiness',
  },
  {
    id: 'gp-3',
    medicine: 'Pantoprazole 40 mg',
    form: 'Capsule',
    dosage: '1 capsule',
    timing: 'Before food',
    frequency: 'Once a day',
    duration: '10 days',
    instructions: 'Take 30 minutes before breakfast',
  },
  {
    id: 'gp-4',
    medicine: 'ORS Electrolyte',
    form: 'Sachet',
    dosage: '1 sachet in 1 L water',
    timing: 'Any time',
    frequency: 'Three times a day',
    duration: '3 days',
    instructions: 'Sip slowly through the day',
  },
];

const dermatologySet: PrescriptionTemplate[] = [
  {
    id: 'derm-1',
    medicine: 'Adapalene 0.1%',
    form: 'Gel',
    dosage: 'Pea-sized amount',
    timing: 'At bedtime',
    frequency: 'Once a day',
    duration: '8 weeks',
    instructions: 'Apply on clean, dry skin',
  },
  {
    id: 'derm-2',
    medicine: 'Clindamycin 1%',
    form: 'Gel',
    dosage: 'Thin layer',
    timing: 'Morning',
    frequency: 'Once a day',
    duration: '6 weeks',
    instructions: 'Avoid contact with eyes',
  },
  {
    id: 'derm-3',
    medicine: 'Sunscreen SPF 50',
    form: 'Lotion',
    dosage: 'Two finger lengths',
    timing: 'Before going out',
    frequency: 'Every 3 hours',
    duration: 'Ongoing',
    instructions: 'Reapply after sweating',
  },
  {
    id: 'derm-4',
    medicine: 'Cetirizine 10 mg',
    form: 'Tablet',
    dosage: '1 tablet',
    timing: 'After food',
    frequency: 'Once at night',
    duration: '10 days',
    instructions: 'For itching, may cause drowsiness',
  },
];

const cardiologySet: PrescriptionTemplate[] = [
  {
    id: 'cardio-1',
    medicine: 'Amlodipine 5 mg',
    form: 'Tablet',
    dosage: '1 tablet',
    timing: 'After food',
    frequency: 'Once a day',
    duration: '30 days',
    instructions: 'Check BP every morning',
  },
  {
    id: 'cardio-2',
    medicine: 'Atorvastatin 10 mg',
    form: 'Tablet',
    dosage: '1 tablet',
    timing: 'At bedtime',
    frequency: 'Once a day',
    duration: '30 days',
    instructions: 'Avoid grapefruit juice',
  },
  {
    id: 'cardio-3',
    medicine: 'Aspirin 75 mg',
    form: 'Tablet',
    dosage: '1 tablet',
    timing: 'After food',
    frequency: 'Once a day',
    duration: '30 days',
    instructions: 'Report any unusual bleeding',
  },
  {
    id: 'cardio-4',
    medicine: 'Telmisartan 40 mg',
    form: 'Tablet',
    dosage: '1 tablet',
    timing: 'Before food',
    frequency: 'Once a day',
    duration: '30 days',
    instructions: 'Limit salt intake',
  },
];

const prescriptionSets: Record<string, PrescriptionTemplate[]> = {
  'General Physician': generalPhysicianSet,
  Dermatology: dermatologySet,
  Cardiology: cardiologySet,
};

const clinic: AppointmentClinic = {
  name: 'Anusri Gupta Pure Cure Clinic',
  address: '2nd Floor, MG Marg, Gangtok, Sikkim 737101',
  contact: '+91 98765 43210',
};

const bloodTypes = ['O+', 'A+', 'B+', 'AB+', 'O-'];
const cities = ['Gangtok', 'Kolkata', 'Bengaluru', 'Mumbai', 'Delhi'];

export const getAppointmentDetails = (id: string): AppointmentDetails => {
  const index = Math.max(
    dashboardAppointments.findIndex((row) => row.id === id),
    0,
  );
  const row = dashboardAppointments[index];
  const set = prescriptionSets[row.specialty] ?? generalPhysicianSet;

  return {
    ...row,
    bloodType: bloodTypes[index % bloodTypes.length],
    lastVisit: '28 Sep 2026',
    registered: '12 Mar 2025',
    city: cities[index % cities.length],
    appointmentType: index % 2 === 0 ? 'First Visit' : 'Follow-up',
    consultationFee: row.visitType === 'video' ? '500.00' : '800.00',
    paymentStatus: row.status === 'Completed' ? 'Paid' : 'Pending',
    reasonForVisit: row.reason,
    prescribedBy: row.specialist,
    prescriptions: set.map((item) => ({ ...item, sentOn: row.date })),
    clinic,
  };
};
