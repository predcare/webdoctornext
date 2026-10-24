import { projectRoutes } from '@/routes';

export type SideNavSection = 'main' | 'footer';

export type SideNavIcon =
  | 'dashboard'
  | 'appointments'
  | 'patients'
  | 'availability'
  | 'reports'
  | 'billing'
  | 'doctors'
  | 'settings'
  | 'help';

export type SideNavChild = {
  id: string;
  name: string;
  href?: string;
};

export type SideNavItem = {
  id: string;
  name: string;
  icon: SideNavIcon;
  href?: string;
  children?: SideNavChild[];
  section: SideNavSection;
};

export const sideNavItems: SideNavItem[] = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    icon: 'dashboard',
    href: projectRoutes.dashboard,
    section: 'main',
  },
  {
    id: 'appointments',
    name: 'Appointments',
    icon: 'appointments',
    section: 'main',
    children: [
      {
        id: 'appointments-upcoming',
        name: 'Appointment List',
        href: projectRoutes.appointments,
      },
      { id: 'appointments-completed', name: 'Booked Appointment' },
    ],
  },
  {
    id: 'patients',
    name: 'Patients',
    icon: 'patients',
    section: 'main',
    children: [
      {
        id: 'patients-all',
        name: 'Patients List',
        href: projectRoutes.patients,
      },
      {
        id: 'patients-records',
        name: 'Add Patient',
        href: projectRoutes.addPatient,
      },
    ],
  },
  {
    id: 'availability',
    name: 'Doctor Availability',
    icon: 'availability',
    section: 'main',
    children: [
      {
        id: 'availability-weekly',
        name: 'Availability List',
        href: projectRoutes.availability,
      },
      {
        id: 'availability-time-off',
        name: 'Add Availability',
        href: projectRoutes.manageAvailability,
      },
      {
        id: 'availability-calendar',
        name: 'Calendar View',
        href: projectRoutes.availabilityCalendar,
      },
    ],
  },
  {
    id: 'reports',
    name: 'Reports',
    icon: 'reports',
    section: 'main',
    children: [{ id: 'reports-clinical', name: 'OverView' }],
  },
  {
    id: 'billing',
    name: 'Billing',
    icon: 'billing',
    section: 'main',
    children: [
      {
        id: 'billing-invoices',
        name: 'Clinic Invoices',
        href: projectRoutes.invoices,
      },
      {
        id: 'billing-payments',
        name: 'PRED Care Invoices',
        href: projectRoutes.predCareInvoices,
      },
    ],
  },
  {
    id: 'doctors',
    name: 'Doctors',
    icon: 'doctors',
    section: 'main',
    children: [
      { id: 'doctors-all', name: 'Doctors List' },
      { id: 'doctors-add', name: 'Add Doctor' },
    ],
  },
  {
    id: 'settings',
    name: 'Settings',
    icon: 'settings',
    section: 'footer',
    href: projectRoutes.profile,
  },
  {
    id: 'help',
    name: 'Help Center',
    icon: 'help',
    section: 'footer',
  },
];

export const navItems: { name: string; route: string }[] = [
  { name: 'Home', route: '/' },
  { name: 'Blogs', route: `${projectRoutes.blogs}` },
  { name: 'About', route: `${projectRoutes.aboutUs}` },
  { name: 'Contact', route: `${projectRoutes.contact}` },
];

export const footerLinks = {
  pages: [
    { name: 'About Us', route: projectRoutes.aboutUs },
    { name: 'Contact Us', route: projectRoutes.contact },
  ],

  legal: [
    { name: 'Privacy Policy', route: projectRoutes.privacyPolicy },
    { name: 'Terms of Service', route: projectRoutes.termsOfService },
    { name: 'Cookie Policy', route: projectRoutes.cookiePolicy },
    { name: 'Disclaimer', route: projectRoutes.disclaimer },
  ],
  categories: [
    { name: 'Technology', route: `#` },
    { name: 'Business', route: `#` },
    { name: 'Politics', route: `#` },
    { name: 'Sports', route: `#` },
    {
      name: 'Entertainment',
      route: `#`,
    },
  ],
  resources: [
    { name: 'Sitemap', route: projectRoutes.sitemap },
    { name: 'RSS Feed', route: projectRoutes.rssFeed },
  ],

  support: [{ name: 'FAQ', route: projectRoutes.faq }],
};
