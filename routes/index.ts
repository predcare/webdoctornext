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
  appointmentReschedule: (id: string) =>
    `/dashboard/appointments/reschedule-appointment/${encodeUrlParam(id)}`,
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
  meetingCall: (patientId: string | number, appointmentId: string | number) =>
    `/dashboard/meeting/${encodeUrlParam(patientId)}?appointmentId=${encodeUrlParam(appointmentId)}`,
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
    appointmentId?: string | number;
  }) => {
    const { patientId, prescriptionId, tab, appointmentId } = urlParams;
    const params = new URLSearchParams();
    params.set('patientId', encodeUrlParam(patientId));
    if (prescriptionId) {
      params.set('prescriptionId', encodeUrlParam(prescriptionId));
    }
    if (tab) {
      params.set('tab', tab);
    }
    if (appointmentId) {
      params.set('appointmentId', encodeUrlParam(appointmentId));
    }
    return `/dashboard/prescriptions/manage?${params.toString()}`;
  },
  invoices: '/dashboard/invoices',
  createInvoice: (patientId?: string | number) =>
    patientId
      ? `/dashboard/invoices/create?patientId=${encodeUrlParam(patientId)}`
      : '/dashboard/invoices/create',
  invoiceDetails: (id: string | number) =>
    `/dashboard/invoices/${encodeUrlParam(id)}`,
  editInvoice: (id: string | number) =>
    `/dashboard/invoices/${encodeUrlParam(id)}/edit`,
  predCareInvoices: '/dashboard/invoices/predcare-invoices',

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

export const isMeetingCallPath = (pathname: string) => {
  const path = normalizePathname(pathname);
  if (!path.startsWith(`${projectRoutes.meeting}/`)) return false;
  return !path.startsWith(`${projectRoutes.meeting}/summary`);
};
