'use client';

import { CustomRadioWrapper } from '@/styles/CustomStyled/CustomRadioWrapper';
import type { ReactNode } from 'react';

export type CustomRadioOption = {
  value: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
};

type CustomRadioProps = {
  name: string;
  value: string;
  label: string;
  icon?: ReactNode;
  defaultChecked?: boolean;
  disabled?: boolean;
};

export function CustomRadio({
  name,
  value,
  label,
  icon,
  defaultChecked = false,
  disabled = false,
}: CustomRadioProps) {
  return (
    <label className={disabled ? 'radio-option is-disabled' : 'radio-option'}>
      <input
        type="radio"
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        disabled={disabled}
      />
      {icon}
      <span>{label}</span>
    </label>
  );
}

type CustomRadioGroupProps = {
  name: string;
  options: CustomRadioOption[];
  defaultValue?: string;
  ariaLabel: string;
  variant?: 'segmented' | 'choice';
  disabled?: boolean;
};

export default function CustomRadioGroup({
  name,
  options,
  defaultValue,
  ariaLabel,
  variant = 'choice',
  disabled = false,
}: CustomRadioGroupProps) {
  return (
    <CustomRadioWrapper
      className={variant === 'segmented' ? 'is-segmented' : 'is-choice'}
      role="radiogroup"
      aria-label={ariaLabel}
    >
      {options.map((option) => (
        <CustomRadio
          key={option.value}
          name={name}
          value={option.value}
          label={option.label}
          icon={option.icon}
          defaultChecked={option.value === defaultValue}
          disabled={disabled || option.disabled}
        />
      ))}
    </CustomRadioWrapper>
  );
}
