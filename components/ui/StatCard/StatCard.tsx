"use client"

import { StatCardWrapper } from '@/styles/CustomStyled/StatCardWrapper';
import { Skeleton, Typography } from '@mui/material';
import type { ReactNode } from 'react';

export type StatCardTone = 'info' | 'teal' | 'warning' | 'success';

type StatCardProps = {
  title: string;
  value: string;
  icon: ReactNode;
  period?: string;
  tone?: StatCardTone;
  compact?: boolean;
  loading?: boolean;
};

const StatCard = ({
  title,
  value,
  icon,
  period,
  tone = 'teal',
  compact = false,
  loading = false,
}: StatCardProps) => {
  const valueContent = loading ? (
    <Skeleton variant="text" width={compact ? 48 : 72} sx={{ display: 'inline-block' }} />
  ) : (
    value
  );

  return (
    <StatCardWrapper className={`tone-${tone}${compact ? ' compact' : ''}`}>
      {compact ? (
        <>
          <span className="stat-icon">{icon}</span>
          <div className="stat-copy">
            <Typography className="stat-title" component="p">
              {title}
            </Typography>
            <Typography className="stat-value" component="p">
              {valueContent}
            </Typography>
            {period ? <span className="stat-period">{period}</span> : null}
          </div>
        </>
      ) : (
        <>
          <div className="stat-top">
            <span className="stat-icon">{icon}</span>
            {period ? <span className="stat-period">{period}</span> : null}
          </div>
          <Typography className="stat-title" component="p">
            {title}
          </Typography>
          <Typography className="stat-value" component="p">
            {valueContent}
          </Typography>
        </>
      )}
    </StatCardWrapper>
  );
};

export default StatCard;
