export type PrescriptionWorkspacePatient = {
  name: string;
  patientCode: string;
  initial: string;
  gender: string;
  age: number;
  phone: string;
  email: string;
  bloodType: string;
  lastVisit: string;
  registered: string;
  city: string;
};

export type PrescriptionWorkspaceVitals = {
  blood_pressure: string;
  pulse: string;
  temperature: string;
  spo2: string;
  weight: string;
  height: string;
  bmi: string;
};

export type PrescriptionWorkspaceStatus = {
  pdf: string;
  status: string;
  sent: string;
};

export type PrescriptionWorkspace = {
  patient: PrescriptionWorkspacePatient;
  vitals: PrescriptionWorkspaceVitals;
  status: PrescriptionWorkspaceStatus;
};

export const prescriptionWorkspace: PrescriptionWorkspace = {
  patient: {
    name: 'Sahil Mallick',
    patientCode: 'PT0002',
    initial: 'S',
    gender: 'Male',
    age: 28,
    phone: '8918030206',
    email: 'iamsahilmallick@gmail.com',
    bloodType: '—',
    lastVisit: '15 October 2026',
    registered: '29 September 2026',
    city: 'Gyalshing',
  },
  vitals: {
    blood_pressure: '120/80',
    pulse: '72',
    temperature: '36.6',
    spo2: '98',
    weight: '70',
    height: '170',
    bmi: '—',
  },
  status: {
    pdf: 'Opening PDF...',
    status: 'In Progress',
    sent: 'No',
  },
};
