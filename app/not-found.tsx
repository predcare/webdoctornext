'use client';

import AuthLayout from '@/app/(auth)/layout';
import CmsLayout from '@/app/(cms)/layout';
import DashboardLayout from '@/app/(dashboard)/layout';
import AuthNotFoundView from '@/components/Modules/NotFoundModule/AuthNotFoundView';
import CmsNotFoundView from '@/components/Modules/NotFoundModule/CmsNotFoundView';
import DashboardNotFoundView from '@/components/Modules/NotFoundModule/DashboardNotFoundView';
import { usePathname } from 'next/navigation';

export default function RootNotFound() {
  const pathname = usePathname() || '';

  // 1. Dashboard 404 Experience
  if (pathname.startsWith('/dashboard')) {
    return (
      <DashboardLayout>
        <DashboardNotFoundView />
      </DashboardLayout>
    );
  }

  // 2. Auth 404 Experience
  if (pathname.startsWith('/auth')) {
    return (
      <AuthLayout>
        <AuthNotFoundView />
      </AuthLayout>
    );
  }

  // 3. CMS / Public 404 Experience (Default)
  return (
    <CmsLayout>
      <CmsNotFoundView />
    </CmsLayout>
  );
}
