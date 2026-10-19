'use client';

import { CustomSwitchWrapper } from '@/styles/CustomStyled/CustomSwitchWrapper';
import Switch from '@mui/material/Switch';
import type { ChangeEvent, ReactNode } from 'react';

export type CustomSwitchProps = {
  checked: boolean;
  onChange: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void;
  label?: ReactNode;
  name?: string;
  id?: string;
  disabled?: boolean;
  size?: 'small' | 'medium';
  className?: string;
  ariaLabel?: string;
};

const CustomSwitch = ({
  checked,
  onChange,
  label,
  name,
  id,
  disabled = false,
  size = 'medium',
  className = '',
  ariaLabel,
}: CustomSwitchProps) => {
  const rootClassName = [
    'custom-switch',
    size === 'small' ? 'is-small' : '',
    disabled ? 'is-disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <CustomSwitchWrapper className={rootClassName}>
      <Switch
        id={id}
        name={name}
        checked={checked}
        disabled={disabled}
        disableRipple
        onChange={(event) => onChange(event.target.checked, event)}
        slotProps={{ input: { 'aria-label': ariaLabel } }}
      />
      {label ? <span className="switch-label">{label}</span> : null}
    </CustomSwitchWrapper>
  );
};

export default CustomSwitch;
