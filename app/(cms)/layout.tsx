import Wrapper from '@/layouts/Wrapper/Wrapper';
import React, { Suspense } from 'react';

interface ICmsLayoutProps {
  children: React.ReactNode;
}

const CmsLayout = ({ children }: ICmsLayoutProps) => {
  return (
    <Suspense fallback={null}>
      <Wrapper>{children}</Wrapper>
    </Suspense>
  );
};

export default CmsLayout;
