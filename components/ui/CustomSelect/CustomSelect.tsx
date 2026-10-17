'use client';

import { CustomInputLabel } from '@/components/ui/CustomInput/CustomInput';
import {
  CustomSelectPaper,
  CustomSelectWrapper,
} from '@/styles/CustomStyled/CustomSelectWrapper';
import { FormHelperText, MenuItem, Select, Typography } from '@mui/material';
import { memo, useId, type ReactNode } from 'react';

export type TSelectOption = {
  label: ReactNode;
  value: string | number;
  disabled?: boolean;
};

type CustomSelectProps = {
  options: TSelectOption[];
  value?: string | number | '';
  onChange?: (value: string) => void;
  onBlur?: () => void;
  name?: string;
  id?: string;
  inputLabelName?: string;
  placeholder?: string;
  error?: boolean;
  helperText?: ReactNode;
  disabled?: boolean;
  className?: string;
  inputSize?: 'medium' | 'large';
  renderValue?: (value: string) => ReactNode;
};

function CustomSelect({
  options,
  value,
  onChange,
  onBlur,
  name,
  id,
  inputLabelName,
  placeholder = 'Select',
  error = false,
  helperText,
  disabled = false,
  className,
  inputSize = 'medium',
  renderValue,
}: CustomSelectProps) {
  const generatedId = useId();
  const selectId = id ?? `${name ?? 'select'}-${generatedId}`;
  const labelId = `${selectId}-label`;

  const renderSelected = (selected: unknown) => {
    const current = selected == null ? '' : String(selected);
    if (current === '') {
      return (
        <Typography component="span" className="select-placeholder">
          {placeholder}
        </Typography>
      );
    }
    if (renderValue) return renderValue(current);
    return (
      options.find((option) => String(option.value) === current)?.label ??
      current
    );
  };

  return (
    <>
      {inputLabelName && (
        <CustomInputLabel
          id={labelId}
          htmlFor={selectId}
          $inputSize={inputSize}
          className={`inputLabel-txt-global ${disabled ? 'disabled-cls' : ''}`}
        >
          {inputLabelName}
        </CustomInputLabel>
      )}
      <CustomSelectWrapper
        fullWidth
        error={error}
        disabled={disabled}
        className={className}
        $inputSize={inputSize}
      >
        <Select
          id={selectId}
          name={name}
          labelId={inputLabelName ? labelId : undefined}
          value={value ?? ''}
          displayEmpty
          onChange={(event) => onChange?.(String(event.target.value))}
          onBlur={onBlur}
          renderValue={renderSelected}
          MenuProps={{
            slots: { paper: CustomSelectPaper },
            anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
            transformOrigin: { vertical: 'top', horizontal: 'left' },
          }}
        >
          {options.map((option) => (
            <MenuItem
              key={String(option.value)}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
      </CustomSelectWrapper>
    </>
  );
}

export default memo(CustomSelect);
