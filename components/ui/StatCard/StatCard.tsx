"use client"

import { StatCardWrapper } from '@/styles/CustomStyled/StatCardWrapper';
import { Typography } from '@mui/material';
import type { ReactNode } from 'react';

export type StatCardTone = 'info' | 'teal' | 'warning' | 'success';

type StatCardProps = {
  title: string;
  value: string;
  icon: ReactNode;
  period?: string;
  tone?: StatCardTone;
};

const StatCard = ({ title, value, icon, period, tone = 'teal' }: StatCardProps) => {
  return (
    <StatCardWrapper className={`tone-${tone}`}>
      <div className="stat-top">
        <span className="stat-icon">{icon}</span>
        {period ? <span className="stat-period">{period}</span> : null}
      </div>
      <Typography className="stat-title" component="p">
        {title}
      </Typography>
      <Typography className="stat-value" component="p">
        {value}
      </Typography>
    </StatCardWrapper>
  );
};

export default StatCard;
