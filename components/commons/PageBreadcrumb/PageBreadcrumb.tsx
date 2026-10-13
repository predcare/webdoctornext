'use client';

import { PageBreadcrumbWrapper } from '@/styles/CustomStyled/PageBreadcrumbWrapper';
import { Breadcrumbs, Link as MuiLink, Typography } from '@mui/material';
import Link from 'next/link';
import { memo, type ReactNode } from 'react';

export type BreadcrumbItem = {
  label: string;
  href?: string;
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
            <MuiLink key={item.label} className="crumb-link" component={Link} href={item.href} underline="none">
              {item.label}
            </MuiLink>
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
