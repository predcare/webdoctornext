'use client';

import { PageBreadcrumbWrapper } from '@/styles/CustomStyled/PageBreadcrumbWrapper';
import { Breadcrumbs, Typography } from '@mui/material';
import Link from 'next/link';
import { memo, type ReactNode } from 'react';

export type BreadcrumbItem = {
  label: string;
  href?: string;
  replace?: boolean;
};

type PageBreadcrumbProps = {
  items: BreadcrumbItem[];
  action?: ReactNode;
};

function PageBreadcrumb({ items, action }: PageBreadcrumbProps) {
  return (
    <PageBreadcrumbWrapper>
      <Breadcrumbs aria-label="Breadcrumb">
        {items.map((item) =>
          item.href ? (
            <Link
              key={item.label}
              className="crumb-link"
              href={item.href}
              replace={item.replace}
            >
              {item.label}
            </Link>
          ) : (
            <Typography key={item.label} className="crumb-current" component="span">
              {item.label}
            </Typography>
          ),
        )}
      </Breadcrumbs>
      {action}
    </PageBreadcrumbWrapper>
  );
}

export default memo(PageBreadcrumb);
