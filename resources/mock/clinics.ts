export type Clinic = {
  id: string;
  label: string;
  name: string;
};

export const clinics: Clinic[] = [
  {
    id: 'pure-cure',
    label: 'Primary center',
    name: 'Anusri Gupta Pure Cure Clinic',
  },
  {
    id: 'city',
    label: 'City branch',
    name: 'Pred Care City Clinic',
  },
  {
    id: 'wellness',
    label: 'Wellness center',
    name: 'Pred Care Wellness Center',
  },
];
