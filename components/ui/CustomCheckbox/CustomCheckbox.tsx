'use client';

import { CustomCheckboxWrapper } from '@/styles/CustomStyled/CustomCheckboxWrapper';
import type { ChangeEvent, ReactNode } from 'react';

export type CustomCheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void;
  label?: ReactNode;
  name?: string;
  id?: string;
  disabled?: boolean;
  size?: 'small' | 'medium';
  variant?: 'default' | 'card';
  className?: string;
  required?: boolean;
};

const CheckIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M3.5 8.2L6.4 11.1L12.5 4.9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CustomCheckbox = ({
  checked,
  onChange,
  label,
  name,
  id,
  disabled = false,
  size = 'medium',
  variant = 'default',
  className = '',
  required = false,
}: CustomCheckboxProps) => {
  const rootClassName = [
    'custom-checkbox',
    variant === 'card' ? 'is-card' : '',
    checked ? 'is-checked' : '',
    disabled ? 'is-disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const controlClassName = [
    'checkbox-control',
    size === 'small' ? 'is-small' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <CustomCheckboxWrapper
      component="label"
      className={rootClassName}
      aria-disabled={disabled || undefined}
    >
      <span className={controlClassName}>
        <input
          id={id}
          name={name}
          type="checkbox"
          className="checkbox-input"
          checked={checked}
          disabled={disabled}
          required={required}
          onChange={(event) => onChange(event.target.checked, event)}
        />
        <span className="checkbox-box">
          <CheckIcon />
        </span>
      </span>
      {label ? <span className="checkbox-label">{label}</span> : null}
    </CustomCheckboxWrapper>
  );
};

export default CustomCheckbox;
