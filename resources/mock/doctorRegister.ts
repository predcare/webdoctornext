import { cities } from './locations';

export type RegisterSelectOption = {
  id: string;
  name: string;
};

export const registerCities: RegisterSelectOption[] = cities.map(
  ({ id, name }) => ({ id, name }),
);

export const registerSpecializations: RegisterSelectOption[] = [
  { id: 'anesthesiology', name: 'Anesthesiology' },
  { id: 'cardiology', name: 'Cardiology' },
  { id: 'dermatology', name: 'Dermatology' },
  { id: 'endocrinology', name: 'Endocrinology' },
  { id: 'ent', name: 'ENT' },
  { id: 'gastroenterology', name: 'Gastroenterology' },
  { id: 'general-medicine', name: 'General Medicine' },
  { id: 'general-surgery', name: 'General Surgery' },
  { id: 'gynecology', name: 'Gynecology' },
  { id: 'neurology', name: 'Neurology' },
  { id: 'ophthalmology', name: 'Ophthalmology' },
  { id: 'orthopedics', name: 'Orthopedics' },
  { id: 'pediatrics', name: 'Pediatrics' },
  { id: 'psychiatry', name: 'Psychiatry' },
  { id: 'pulmonology', name: 'Pulmonology' },
  { id: 'radiology', name: 'Radiology' },
  { id: 'urology', name: 'Urology' },
];

export const registerMedicalCouncils: RegisterSelectOption[] = [
  { id: 'nmc', name: 'National Medical Commission (NMC)' },
  { id: 'apmc', name: 'Andhra Pradesh Medical Council' },
  { id: 'dmc', name: 'Delhi Medical Council' },
  { id: 'gmc', name: 'Gujarat Medical Council' },
  { id: 'kmc', name: 'Karnataka Medical Council' },
  { id: 'knmc', name: 'Kerala State Medical Council' },
  { id: 'mmc', name: 'Maharashtra Medical Council' },
  { id: 'rmc', name: 'Rajasthan Medical Council' },
  { id: 'tnmc', name: 'Tamil Nadu Medical Council' },
  { id: 'tmgc', name: 'Telangana State Medical Council' },
  { id: 'upmc', name: 'Uttar Pradesh Medical Council' },
  { id: 'wbmc', name: 'West Bengal Medical Council' },
];

export const registerOptionLabel = (option: RegisterSelectOption) => option.name;

export const sameRegisterOption = (
  option: RegisterSelectOption,
  value: RegisterSelectOption,
) => option.id === value.id;
