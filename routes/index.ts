import { encodeUrlParam } from '@/lib/functions/_urlParams.lib';

export const normalizePathname = (path: string) => {
  if (path.length > 1 && path.endsWith('/')) {
    return path.slice(0, -1);
  }
  return path;
};

export const projectRoutes = {
  home: '/',
  aboutUs: '/about-us',
  comingSoon: '/coming-soon',
  articleNews: '/article-news',
  askPage: '/ask-page',
  blogs: '/blogs',
  contact: '/contact-us',

  // Auth Pages
  doctorLogin: '/auth/doctor/login',
  doctorRegister: '/auth/doctor/register',
  patientLogin: '/auth/patient/login',
  policyAcceptance: '/auth/doctor/policy-acceptance',
  patientPolicyAcceptance: '/auth/patient/policy-acceptance',

  // Doctor portal
  dashboard: '/dashboard',
  appointments: '/dashboard/appointments',
  appointmentDetails: (id: string) => `/dashboard/appointments/${id}`,
  bookAppointment: `/dashboard/appointments/book-appointment`,
  patients: '/dashboard/patients',
  addPatient: '/dashboard/patients/add-patient',
  patientDetails: (id: string) => `/dashboard/patients/${encodeUrlParam(id)}`,
  availability: '/dashboard/availability',
  manageAvailability: '/dashboard/availability/manage-availability',
  editAvailability: (id: string | number) =>
    `/dashboard/availability/manage-availability?availabilityId=${encodeUrlParam(id)}`,
  availabilityCalendar: '/dashboard/availability/calendar',
  meeting: '/dashboard/meeting',
  meetingSummary: (id?: string | number) =>
    id
      ? `/dashboard/meeting/summary?appointmentId=${encodeUrlParam(id)}`
      : '/dashboard/meeting/summary',
  profile: '/dashboard/profile',
  managePrescriptions: '/dashboard/prescriptions/manage',
  managePrescription: (urlParams: {
    patientId: string;
    prescriptionId?: string | number;
    tab?: string;
  }) => {
    const { patientId, prescriptionId, tab } = urlParams;
    const params = new URLSearchParams();
    params.set('patientId', encodeUrlParam(patientId));
    if (prescriptionId) {
      params.set('prescriptionId', encodeUrlParam(prescriptionId));
    }
    if (tab) {
      params.set('tab', tab);
    }
    return `/dashboard/prescriptions/manage?${params.toString()}`;
  },

  // Legal Pages
  privacyPolicy: '/privacy-policy',
  termsOfService: '/terms-conditions',
  cookiePolicy: '/cookie-policy',
  disclaimer: '/disclaimer',

  // Additional Pages
  faq: '/faq',
  sitemap: '/sitemap',
  rssFeed: '/rss-feed',
};
