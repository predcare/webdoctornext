const profilePath = '/dashboard/profile';

export const profileTabIds = [
  'about',
  'basic-info',
  'education',
  'experience',
  'certificates',
  'prescription',
  'invoice',
  'settings',
] as const;

export type ProfileTabId = (typeof profileTabIds)[number];

export type ProfileTabItem = {
  id: ProfileTabId;
  label: string;
  href: string;
};

export const profileTabs: ProfileTabItem[] = [
  { id: 'about', label: 'About', href: profilePath },
  {
    id: 'basic-info',
    label: 'Basic Info',
    href: `${profilePath}?tab=basic-info`,
  },
  {
    id: 'education',
    label: 'Education',
    href: `${profilePath}?tab=education`,
  },
  {
    id: 'experience',
    label: 'Experience',
    href: `${profilePath}?tab=experience`,
  },
  {
    id: 'certificates',
    label: 'Certificates',
    href: `${profilePath}?tab=certificates`,
  },
  {
    id: 'prescription',
    label: 'Prescription Settings',
    href: `${profilePath}?tab=prescription`,
  },
  {
    id: 'invoice',
    label: 'Invoice Settings',
    href: `${profilePath}?tab=invoice`,
  },
  {
    id: 'settings',
    label: 'Settings',
    href: `${profilePath}?tab=settings`,
  },
];

export const resolveProfileTab = (tab?: string): ProfileTabId =>
  profileTabs.find((item) => item.id === tab)?.id ?? 'about';
