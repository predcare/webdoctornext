'use client';

import { Button, styled } from '@mui/material';
import Link from 'next/link';
import type { ReactNode } from 'react';

type CustomButtonProps = {
  text: string;
  action: string | (() => void);
  className?: string;
  variant?: 'contained' | 'outlined' | 'text';
  disabled?: boolean;
  startIcon?: ReactNode;
};

const CustomButtonRoot = styled(Button)`
  &.MuiButton-contained {
    background-color: ${({ theme }) => theme.palette.customColors.brandTeal};
    color: ${({ theme }) => theme.palette.common.white};

    &:hover {
      --variant-containedColor: ${({ theme }) => theme.palette.common.white};
      --variant-containedBg: ${({ theme }) => theme.palette.customColors.brandTealDark};
      background-color: ${({ theme }) => theme.palette.customColors.brandTealDark};
      color: ${({ theme }) => theme.palette.common.white};
    }
  }
`;

export default function CustomButton({
  text,
  action,
  className,
  variant = 'contained',
  disabled,
  startIcon,
}: CustomButtonProps) {
  if (typeof action === 'string') {
    return (
      <CustomButtonRoot
        className={className}
        variant={variant}
        disabled={disabled}
        startIcon={startIcon}
        component={Link}
        href={action}
      >
        {text}
      </CustomButtonRoot>
    );
  }

  return (
    <CustomButtonRoot
      className={className}
      variant={variant}
      disabled={disabled}
      startIcon={startIcon}
      type="button"
      onClick={action}
    >
      {text}
    </CustomButtonRoot>
  );
}
