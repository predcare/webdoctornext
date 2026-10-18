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
  patientDetails: (id: string) => `/dashboard/patients/${id}`,
  availability: '/dashboard/availability',
  manageAvailability: '/dashboard/availability/manage-availability',
  availabilityCalendar: '/dashboard/availability/calendar',
  meeting: '/dashboard/meeting',
  profile: '/dashboard/profile',
  managePrescription: '/dashboard/prescriptions/manage',

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
