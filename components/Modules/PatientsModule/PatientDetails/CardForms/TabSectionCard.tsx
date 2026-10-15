'use client';

import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Box, Button, Typography } from '@mui/material';
import { memo, type ReactNode } from 'react';

type TabSectionCardProps = {
  title: string;
  icon: ReactNode;
  subtitle?: string;
  actionLabel?: string;
  editable?: boolean;
  className?: string;
  children: ReactNode;
  actionOnClick?: () => void;
};

function TabSectionCard({
  title,
  icon,
  subtitle,
  actionLabel,
  editable = false,
  className,
  children,
  actionOnClick,
}: TabSectionCardProps) {
  return (
    <Box className={className ? `section-card ${className}` : 'section-card'}>
      <Box className="section-head">
        <Box className="section-title-wrap">
          <Box component="span" className="section-icon">
            {icon}
          </Box>
          <Box className="section-title-copy">
            <Typography component="h3" className="section-title">
              {title}
            </Typography>
            {subtitle ? (
              <Typography component="p" className="section-subtitle">
                {subtitle}
              </Typography>
            ) : null}
          </Box>
        </Box>
        {actionLabel ? (
          <Button
            className="section-action"
            variant="contained"
            disableElevation
            startIcon={<AddIcon fontSize="small" />}
            onClick={actionOnClick}
          >
            {actionLabel}
          </Button>
        ) : null}
        {editable ? (
          <Button
            className="section-edit"
            variant="outlined"
            size="small"
            startIcon={<EditOutlinedIcon fontSize="inherit" />}
            onClick={actionOnClick}
          >
            Edit
          </Button>
        ) : null}
      </Box>
      <Box className="section-body">{children}</Box>
    </Box>
  );
}

export default memo(TabSectionCard);
