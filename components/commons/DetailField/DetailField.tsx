'use client';

import { DetailFieldWrapper } from '@/styles/CustomStyled/DetailFieldWrapper';
import { Box, Typography } from '@mui/material';
import { memo, type ReactNode } from 'react';

type DetailFieldProps = {
  label: string;
  children: ReactNode;
  icon?: ReactNode;
  caps?: boolean;
  variant?: 'plain' | 'tile';
};

function DetailField({ label, children, icon, caps = false, variant = 'plain' }: DetailFieldProps) {
  const className = [caps ? 'caps' : '', variant === 'tile' ? 'tile' : ''].filter(Boolean).join(' ');

  return (
    <DetailFieldWrapper className={className || undefined}>
      <Typography component="p" className="detail-label">
        {label}
      </Typography>
      <Box className="detail-value">
        {icon ? <Box component="span" className="detail-icon">{icon}</Box> : null}
        {children}
      </Box>
    </DetailFieldWrapper>
  );
}

export default memo(DetailField);
