export type LocationOption = {
  id: string;
  name: string;
};

export const profileCountries: LocationOption[] = [
  { id: 'in', name: 'India' },
  { id: 'bd', name: 'Bangladesh' },
  { id: 'ae', name: 'United Arab Emirates' },
  { id: 'us', name: 'United States' },
];

export const profileStates: LocationOption[] = [
  { id: 'in-wb', name: 'West Bengal' },
  { id: 'in-mh', name: 'Maharashtra' },
  { id: 'in-ka', name: 'Karnataka' },
  { id: 'in-dl', name: 'Delhi' },
  { id: 'in-tn', name: 'Tamil Nadu' },
];

export const profileCities: LocationOption[] = [
  { id: 'in-wb-how', name: 'Howrah' },
  { id: 'in-wb-kol', name: 'Kolkata' },
  { id: 'in-mh-mum', name: 'Mumbai' },
  { id: 'in-ka-blr', name: 'Bengaluru' },
  { id: 'in-dl-nd', name: 'New Delhi' },
];

export const defaultProfileCountry = profileCountries[0];
export const defaultProfileState = profileStates[0];
export const defaultProfileCity = profileCities[0];

export const sameLocation = (option: LocationOption, value: LocationOption) =>
  option.id === value.id;
