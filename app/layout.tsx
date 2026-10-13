import ReactQueryProvider from '@/components/Providers/ReactQueryProvider';
import ProjectThemeProvider from '@/themes/ProjectThemeProvider';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'PredCare - Doctor Portal',
  description: 'PredCare Doctor Portal - Clinical Practice & Patient Management',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body>
        <AppRouterCacheProvider>
          <ProjectThemeProvider>
            <ReactQueryProvider>
              {children}
            </ReactQueryProvider>
          </ProjectThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}