import GlobalBackdropLoader from '@/components/commons/BackdropLoader/GlobalBackdropLoader';
import EventListener from '@/components/commons/EventListener/EventListener';
import ReactQueryProvider from '@/components/Providers/ReactQueryProvider';
import ProjectThemeProvider from '@/themes/ProjectThemeProvider';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'PredCare - Doctor Portal',
  description:
    'PredCare Doctor Portal - Clinical Practice & Patient Management',
  icons: {
    icon: '/assets/images/logo.png?v=1',
    shortcut: '/assets/images/logo.png?v=1',
    apple: '/assets/images/logo.png?v=1',
  },
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
              <GlobalBackdropLoader />
              <EventListener />
              <Toaster
                position="top-right"
                richColors
                expand={false}
                closeButton
                duration={2500}
                toastOptions={{
                  style: {
                    fontFamily: 'var(--font-inter), Inter, sans-serif',
                    fontSize: '13px',
                    borderRadius: '12px',
                  },
                }}
              />
            </ReactQueryProvider>
          </ProjectThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
