export type Country = { id: string; name: string };
export type State = { id: string; countryId: string; name: string };
export type City = { id: string; stateId: string; name: string };

export const countries: Country[] = [
  { id: 'in', name: 'India' },
  { id: 'bd', name: 'Bangladesh' },
  { id: 'ae', name: 'United Arab Emirates' },
];

export const states: State[] = [
  { id: 'in-wb', countryId: 'in', name: 'West Bengal' },
  { id: 'in-mh', countryId: 'in', name: 'Maharashtra' },
  { id: 'in-ka', countryId: 'in', name: 'Karnataka' },
  { id: 'in-dl', countryId: 'in', name: 'Delhi' },
  { id: 'bd-dh', countryId: 'bd', name: 'Dhaka Division' },
  { id: 'bd-ct', countryId: 'bd', name: 'Chittagong Division' },
  { id: 'ae-du', countryId: 'ae', name: 'Dubai' },
  { id: 'ae-ab', countryId: 'ae', name: 'Abu Dhabi' },
];

export const cities: City[] = [
  { id: 'in-wb-kol', stateId: 'in-wb', name: 'Kolkata' },
  { id: 'in-wb-how', stateId: 'in-wb', name: 'Howrah' },
  { id: 'in-wb-dgp', stateId: 'in-wb', name: 'Durgapur' },
  { id: 'in-wb-sil', stateId: 'in-wb', name: 'Siliguri' },
  { id: 'in-wb-asn', stateId: 'in-wb', name: 'Asansol' },
  { id: 'in-mh-mum', stateId: 'in-mh', name: 'Mumbai' },
  { id: 'in-mh-pun', stateId: 'in-mh', name: 'Pune' },
  { id: 'in-mh-nag', stateId: 'in-mh', name: 'Nagpur' },
  { id: 'in-mh-nas', stateId: 'in-mh', name: 'Nashik' },
  { id: 'in-ka-blr', stateId: 'in-ka', name: 'Bengaluru' },
  { id: 'in-ka-mys', stateId: 'in-ka', name: 'Mysuru' },
  { id: 'in-ka-mng', stateId: 'in-ka', name: 'Mangaluru' },
  { id: 'in-dl-nd', stateId: 'in-dl', name: 'New Delhi' },
  { id: 'in-dl-dwk', stateId: 'in-dl', name: 'Dwarka' },
  { id: 'in-dl-rhn', stateId: 'in-dl', name: 'Rohini' },
  { id: 'bd-dh-dha', stateId: 'bd-dh', name: 'Dhaka' },
  { id: 'bd-dh-gaz', stateId: 'bd-dh', name: 'Gazipur' },
  { id: 'bd-ct-ctg', stateId: 'bd-ct', name: 'Chattogram' },
  { id: 'bd-ct-cox', stateId: 'bd-ct', name: "Cox's Bazar" },
  { id: 'ae-du-dub', stateId: 'ae-du', name: 'Dubai City' },
  { id: 'ae-du-jbl', stateId: 'ae-du', name: 'Jebel Ali' },
  { id: 'ae-ab-abu', stateId: 'ae-ab', name: 'Abu Dhabi City' },
  { id: 'ae-ab-ain', stateId: 'ae-ab', name: 'Al Ain' },
];

export const getStates = (countryId: string) => states.filter((state) => state.countryId === countryId);

export const getCities = (stateId: string) => cities.filter((city) => city.stateId === stateId);
