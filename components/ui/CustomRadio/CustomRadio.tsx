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
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function CustomRadio({
  name,
  value,
  label,
  icon,
  checked,
  defaultChecked,
  disabled = false,
  onChange,
}: CustomRadioProps) {
  return (
    <label className={disabled ? 'radio-option is-disabled' : 'radio-option'}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={onChange}
      />
      {icon}
      <span>{label}</span>
    </label>
  );
}

type CustomRadioGroupProps = {
  name: string;
  options: CustomRadioOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  ariaLabel: string;
  variant?: 'segmented' | 'choice';
  disabled?: boolean;
};

export default function CustomRadioGroup({
  name,
  options,
  value,
  defaultValue,
  onChange,
  ariaLabel,
  variant = 'choice',
  disabled = false,
}: CustomRadioGroupProps) {
  const isControlled = value !== undefined;

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
          checked={isControlled ? option.value === value : undefined}
          defaultChecked={!isControlled ? option.value === defaultValue : undefined}
          disabled={disabled || option.disabled}
          onChange={() => onChange?.(option.value)}
        />
      ))}
    </CustomRadioWrapper>
  );
}
