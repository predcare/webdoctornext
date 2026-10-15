export const strengthUnits = ['mg', 'mcg', 'g', 'ml'] as const;

export const dosageOptions = ['1-0-0', '1-0-1', '1-1-1', '0-0-1', 'SOS'] as const;

export const durationUnits = ['days', 'weeks', 'months'] as const;

export const timingOptions = [
  'Before food',
  'After food',
  'With food',
  'Bedtime',
] as const;

export const primaryTabLabels = [
  { id: 'appointments', label: 'Appointments' },
  { id: 'consultations', label: 'Consultations' },
  { id: 'prescriptions', label: 'Prescriptions' },
  { id: 'medical-records', label: 'Medical Records' },
  { id: 'billing', label: 'Billing' },
  { id: 'family', label: 'Family' },
  { id: 'profile', label: 'Profile' },
] as const;

export const consultationTabIds = [
  'clinical-notes',
  'diagnosis',
  'prescription',
  'referrals',
] as const;

export type ConsultationTabId = (typeof consultationTabIds)[number];

export const secondaryTabLabels = [
  { id: 'clinical-notes', label: 'Clinical Notes' },
  { id: 'diagnosis', label: 'Diagnosis' },
  { id: 'prescription', label: 'Prescription' },
  { id: 'referrals', label: 'Referrals' },
] as const satisfies ReadonlyArray<{ id: ConsultationTabId; label: string }>;

export const resolveConsultationTab = (tab?: string): ConsultationTabId =>
  secondaryTabLabels.find((item) => item.id === tab)?.id ?? 'prescription';

export const clinicalNoteFields = [
  'symptoms',
  'examination',
  'diagnosis',
  'treatment',
] as const;

export type ClinicalNoteField = (typeof clinicalNoteFields)[number];

export const followUpReferralFields = ['follow-up', 'referral'] as const;

export type FollowUpReferralField = (typeof followUpReferralFields)[number];

export const prescriptionTableHeads = [
  'Drug Name',
  'Strength',
  'Dosage',
  'Duration',
  'Timing',
  'Instructions',
];
