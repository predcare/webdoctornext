'use client';

import CustomInput from '@/components/ui/CustomInput/CustomInput';
import {
  CustomAutocompletePaper,
  CustomAutocompleteWrapper,
} from '@/styles/CustomStyled/CustomAutocompleteWrapper';
import {
  Autocomplete,
  Box,
  InputAdornment,
  type AutocompleteInputChangeReason,
} from '@mui/material';
import { memo, type ReactNode } from 'react';

type CustomAutocompleteProps<T> = {
  options: T[];
  value?: T | null;
  defaultValue?: T | null;
  onChange?: (value: T | null) => void;
  getOptionLabel: (option: T) => string;
  isOptionEqualToValue?: (option: T, value: T) => boolean;
  renderOption?: (option: T) => ReactNode;
  startAdornment?: ReactNode;
  inputLabelName?: string;
  placeholder?: string;
  disabled?: boolean;
  disableClearable?: boolean;
  noOptionsText?: ReactNode;
  name?: string;
  className?: string;
  inputSize?: 'medium' | 'large';
  onInputChange?: (
    value: string,
    reason: AutocompleteInputChangeReason,
  ) => void;
};

const keepServerOptions = <T,>(options: T[]) => options;

function CustomAutocomplete<T>({
  options,
  value,
  defaultValue,
  onChange,
  getOptionLabel,
  isOptionEqualToValue,
  renderOption,
  startAdornment,
  inputLabelName,
  placeholder,
  disabled = false,
  disableClearable = false,
  noOptionsText = 'No options',
  name,
  className,
  inputSize = 'medium',
  onInputChange,
}: CustomAutocompleteProps<T>) {
  return (
    <CustomAutocompleteWrapper className={className} $inputSize={inputSize}>
      <Autocomplete<T, false, boolean, false>
        options={options}
        {...(value !== undefined ? { value } : {})}
        {...(value === undefined && defaultValue !== undefined
          ? { defaultValue }
          : {})}
        onChange={(_event, next) => {
          onChange?.(next);
        }}
        {...(onInputChange
          ? {
              onInputChange: (_event, next, reason) =>
                onInputChange(next, reason),
              filterOptions: keepServerOptions<T>,
            }
          : {})}
        getOptionLabel={getOptionLabel}
        isOptionEqualToValue={isOptionEqualToValue}
        disabled={disabled}
        disableClearable={disableClearable}
        noOptionsText={noOptionsText}
        slots={{ paper: CustomAutocompletePaper }}
        renderOption={
          renderOption
            ? ({ key, ...optionProps }, option) => (
                <Box component="li" key={key} {...optionProps}>
                  {renderOption(option)}
                </Box>
              )
            : undefined
        }
        renderInput={(params) => (
          <CustomInput
            {...params}
            name={name}
            inputSize={inputSize}
            inputLabelName={inputLabelName}
            placeholder={placeholder}
            slotProps={{
              ...params.slotProps,
              input: {
                ...params.slotProps.input,
                startAdornment: startAdornment ? (
                  <InputAdornment position="start">
                    {startAdornment}
                  </InputAdornment>
                ) : (
                  params.slotProps.input.startAdornment
                ),
              },
            }}
          />
        )}
      />
    </CustomAutocompleteWrapper>
  );
}

export default memo(CustomAutocomplete) as typeof CustomAutocomplete;
