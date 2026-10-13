import type { Patient, PatientGender, PatientStatus } from '@/resources/mock';

export type PatientSort = 'recent' | 'oldest' | 'name';

export type PatientFilterState = {
  search: string;
  gender: 'all' | PatientGender;
  clinicStatus: 'all' | PatientStatus;
  sort: PatientSort;
};

export const defaultPatientFilters: PatientFilterState = {
  search: '',
  gender: 'all',
  clinicStatus: 'all',
  sort: 'recent',
};

export const genderOptions: PatientFilterState['gender'][] = ['all', 'Male', 'Female', 'Other'];
export const clinicStatusOptions: PatientFilterState['clinicStatus'][] = ['all', 'Active', 'Inactive'];

export const sortOptions: { value: PatientSort; label: string }[] = [
  { value: 'recent', label: 'Recent' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'name', label: 'Name A-Z' },
];

export const activePatientFilterCount = (filters: PatientFilterState) =>
  Number(filters.gender !== 'all') + Number(filters.clinicStatus !== 'all');

export const hasActivePatientFilters = (filters: PatientFilterState) =>
  activePatientFilterCount(filters) > 0 || filters.search.trim().length > 0;

const sortPatients = (rows: Patient[], sort: PatientSort) => {
  const sorted = [...rows];
  if (sort === 'name') return sorted.sort((a, b) => a.name.localeCompare(b.name));
  const direction = sort === 'recent' ? -1 : 1;
  return sorted.sort((a, b) => a.lastVisitValue.localeCompare(b.lastVisitValue) * direction);
};

export const filterPatients = (rows: Patient[], filters: PatientFilterState) => {
  const query = filters.search.trim().toLowerCase();

  const filtered = rows.filter((row) => {
    if (filters.gender !== 'all' && row.gender !== filters.gender) return false;
    if (filters.clinicStatus !== 'all' && row.clinicStatus !== filters.clinicStatus) return false;
    if (!query) return true;
    return [row.name, row.patientCode, row.phone, row.email, row.city].join(' ').toLowerCase().includes(query);
  });

  return sortPatients(filtered, filters.sort);
};
