export const ImageAccept = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/jpeg',
];

export const FileAccept = ['application/pdf'];

export const MaxImageSize = 2000000; // 8MB
export const MaxFileSize = 2000000; // 8MB

export const CountryCode = {
  US: '+1',
  CA: '+1',
  IN: '+91',
  GB: '+44',
  AU: '+61',
};
export const ProjectCurrency = {
  USD: '$',
  INR: '₹',
  GBP: '£',
  AUD: '$',
  CAD: '$',
  EUR: '€',
};

export const mediaPaths: Record<string, string> = {
  profileImage: 'users/profile_image',
};

export const genderOptions = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Others', value: 'others' },
];

export const DayList = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
] as const;

export const BaseDurations = [5, 10];

export const AdminDurations = [
  5, 10, 15, 20, 30, 45, 60, 90, 120, 180, 240, 360, 480, 720, 1440,
];
