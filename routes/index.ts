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
  patientLogin: '/auth/patient/login',

  // Doctor portal
  dashboard: '/dashboard',
  appointments: '/appointments',
  appointmentDetails: (id: string) => `/appointments/${id}`,
  patients: '/patients',
  addPatient: '/patients/add-patient',

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
