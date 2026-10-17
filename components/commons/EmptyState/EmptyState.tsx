'use client';

import NoFoundIcon from '@/components/ui/Icons/NoFoundIcon';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import SearchOffRoundedIcon from '@mui/icons-material/SearchOffRounded';
import {
  Box,
  Button,
  CircularProgress,
  styled,
  Typography,
  TypographyProps,
} from '@mui/material';
import Link from 'next/link';
import type { ReactNode } from 'react';

export const EmptyStateWrap = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100dvh - 350px);
  gap: 10px;
  text-align: center;
  padding: 24px;
  width: 100%;
  i {
    display: inline-flex;
  }
  .title {
    color: ${({ theme }) => theme.palette.customColors.heading};
    font-family: 'outfit';
  }

  .desc {
    max-width: 420px;
    margin: 4px auto 0;
    font-size: 13px;
    color: ${({ theme }) => theme.palette.customColors.textMuted};
  }

  &.compact {
    height: auto;
    padding: 48px 24px;
    border-radius: 16px;
    border: 1px solid ${({ theme }) => theme.palette.customColors.border};
    background: ${({ theme }) => theme.palette.customColors.cardBg};
  }

  .empty-icon {
    display: grid;
    place-items: center;
    width: 56px;
    height: 56px;
    border-radius: 50%;

    .MuiSvgIcon-root {
      font-size: 28px;
    }

    &.error {
      color: ${({ theme }) => theme.palette.customColors.error};
      background: ${({ theme }) => theme.palette.customColors.errorBg};
    }

    &.not-found {
      color: ${({ theme }) => theme.palette.customColors.warning};
      background: ${({ theme }) => theme.palette.customColors.warningBg};
    }
  }

  .empty-actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    margin-top: 8px;

    .MuiButton-root {
      height: 38px;
      padding: 0 16px;
      border-radius: 10px;
      font-size: 13px;
      font-weight: 600;
      text-transform: none;
    }

    .retry-btn.MuiButton-root {
      color: ${({ theme }) => theme.palette.common.white};
      background: ${({ theme }) => theme.palette.customColors.brandTeal};

      &:hover {
        background: ${({ theme }) => theme.palette.customColors.brandTealDark};
      }

      &.Mui-disabled {
        opacity: 0.7;
        color: ${({ theme }) => theme.palette.common.white};
      }
    }

    .back-btn.MuiButton-root {
      color: ${({ theme }) => theme.palette.customColors.heading};
      border-color: ${({ theme }) => theme.palette.customColors.border};

      &:hover {
        background: ${({ theme }) => theme.palette.customColors.hoverBg};
      }
    }
  }
`;

type TEmptyStateVariant = 'empty' | 'error' | 'not-found';

interface IEmptyStateProps {
  text?: string;
  description?: string;
  textVariant?: TypographyProps['variant'];
  variant?: TEmptyStateVariant;
  icon?: ReactNode;
  onRetry?: () => void;
  retrying?: boolean;
  retryLabel?: string;
  backHref?: string;
  backLabel?: string;
  compact?: boolean;
  className?: string;
}

const variantIcons: Record<Exclude<TEmptyStateVariant, 'empty'>, ReactNode> = {
  error: <ErrorOutlineRoundedIcon />,
  'not-found': <SearchOffRoundedIcon />,
};

const EmptyState = ({
  text = 'Data',
  description,
  textVariant = 'h2',
  variant = 'empty',
  icon,
  onRetry,
  retrying = false,
  retryLabel = 'Try Again',
  backHref,
  backLabel = 'Back to List',
  compact = false,
  className,
}: IEmptyStateProps) => {
  const renderIcon = () => {
    if (icon) return <i>{icon}</i>;
    if (variant === 'empty') {
      return (
        <i>
          <NoFoundIcon IconHeight="50" IconWidth="50" />
        </i>
      );
    }
    return (
      <Box component="span" className={`empty-icon ${variant}`}>
        {variantIcons[variant]}
      </Box>
    );
  };

  const hasActions = Boolean(onRetry || backHref);

  return (
    <EmptyStateWrap
      className={[compact ? 'compact' : '', className ?? '']
        .filter(Boolean)
        .join(' ')}
      role={variant === 'error' ? 'alert' : undefined}
    >
      {renderIcon()}
      <Box>
        <Typography variant={textVariant} className="title">
          {text}
        </Typography>
        {description && (
          <Typography variant="body2" className="desc">
            {description}
          </Typography>
        )}
      </Box>
      {hasActions ? (
        <Box className="empty-actions">
          {onRetry ? (
            <Button
              type="button"
              variant="contained"
              disableElevation
              className="retry-btn"
              onClick={onRetry}
              disabled={retrying}
              startIcon={
                retrying ? (
                  <CircularProgress size={14} color="inherit" />
                ) : (
                  <RefreshRoundedIcon fontSize="small" />
                )
              }
            >
              {retryLabel}
            </Button>
          ) : null}
          {backHref ? (
            <Button
              component={Link}
              href={backHref}
              variant="outlined"
              className="back-btn"
            >
              {backLabel}
            </Button>
          ) : null}
        </Box>
      ) : null}
    </EmptyStateWrap>
  );
};

export default EmptyState;
