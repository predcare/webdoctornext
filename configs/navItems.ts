import { projectRoutes } from '@/routes';

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
