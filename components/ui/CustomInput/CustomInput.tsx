import { InputLabel, styled } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField, { StandardTextFieldProps } from '@mui/material/TextField';
import React, { forwardRef, useCallback, useState } from 'react';
import PasswordNonVisibilityIcon from '../Icons/PasswordNonVisibilityIcon';
import PasswordVisibilityIcon from '../Icons/PasswordVisibilityIcon';

export const CustomInputLabel = styled(InputLabel, {
  shouldForwardProp: (prop) => prop !== '$inputSize',
}) <{ $inputSize?: 'medium' | 'large' }>`
  display: flex;
  align-items: center;
  gap: 2px;
  margin-bottom: 8px;
  font-size: 12.5px;
  font-weight: 600;
  line-height: 18px;
  letter-spacing: 0.01em;
  white-space: normal;
  color: ${({ theme }) => theme.palette.customColors.heading};

  &.Mui-focused {
    color: ${({ theme }) => theme.palette.customColors.heading};
  }

  &.disabled-cls {
    opacity: 0.5;
  }

  ${({ $inputSize }) =>
    $inputSize === 'large' &&
    `
    margin-bottom: 8px;
    font-size: 14px;
  `}
`;

export const CustomInputWrap = styled(TextField, {
  shouldForwardProp: (data) => data !== 'labelName' && data !== 'inputSize',
}) <{ labelName?: boolean; inputSize?: 'medium' | 'large' }>`
  .MuiInputBase-root {
    min-height: 44px;
    padding: 0 14px;
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.palette.customColors.inputBorder};
    background: ${({ theme }) => theme.palette.customColors.inputBg};
    box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
    transition: border-color 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease;

    &:hover {
      border-color: ${({ theme }) => theme.palette.customColors.textMuted};
    }

    &.Mui-focused {
      border-color: ${({ theme }) => theme.palette.customColors.brandTeal};
      box-shadow: 0 0 0 3px ${({ theme }) => theme.palette.customColors.brandTealLight};
    }

    &.Mui-error {
      border-color: ${({ theme }) => theme.palette.customColors.error};

      &.Mui-focused {
        box-shadow: 0 0 0 3px ${({ theme }) => theme.palette.customColors.errorBg};
      }
    }

    &.Mui-disabled {
      cursor: not-allowed;
      box-shadow: none;
      border-color: ${({ theme }) => theme.palette.customColors.inputBorder};
      background: ${({ theme }) => theme.palette.customColors.pageBg};
    }

    &.MuiInputBase-multiline {
      height: auto;
      padding: 12px 14px;
      align-items: flex-start;

      .MuiInputBase-input {
        height: auto;
        line-height: 20px;
        resize: vertical;
      }
    }

    .MuiInputBase-input {
      height: 42px;
      padding: 0;
      box-sizing: border-box;
      font-size: 13px;
      font-weight: 400;
      color: ${({ theme }) => theme.palette.customColors.heading};

      &::placeholder {
        opacity: 1;
        font-size: 13px;
        color: ${({ theme }) => theme.palette.customColors.textMuted};
        -webkit-text-fill-color: ${({ theme }) => theme.palette.customColors.textMuted};
      }

      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus,
      &:-webkit-autofill:active {
        -webkit-box-shadow: 0 0 0 1000px transparent inset !important;
        box-shadow: 0 0 0 1000px transparent inset !important;
        -webkit-text-fill-color: ${({ theme }) => theme.palette.customColors.heading};
        caret-color: ${({ theme }) => theme.palette.customColors.heading};
        transition: background-color 9999s ease-out 0s;
      }

      &.Mui-disabled {
        color: ${({ theme }) => theme.palette.customColors.textMuted};
        -webkit-text-fill-color: ${({ theme }) => theme.palette.customColors.textMuted};
      }
    }

    .MuiSelect-select {
      display: flex;
      align-items: center;
      padding-right: 28px !important;
    }

    .MuiSelect-icon {
      right: 10px;
      color: ${({ theme }) => theme.palette.customColors.textMuted};
    }

    .MuiInputAdornment-positionStart {
      margin-right: 8px;
      color: ${({ theme }) => theme.palette.customColors.textMuted};

      svg {
        width: 18px;
        height: 18px;
      }
    }

    .MuiInputAdornment-positionEnd {
      margin-left: 8px;
      color: ${({ theme }) => theme.palette.customColors.textMuted};

      .MuiIconButton-root {
        padding: 0;
        color: inherit;
      }

      svg {
        width: 18px;
        height: 18px;
      }
    }

    ${({ theme }) => theme.breakpoints.down('sm')} {
      min-height: 40px;

      .MuiInputBase-input {
        height: 38px;
      }
    }
  }

  .MuiFormHelperText-root {
    margin: 6px 0 0;
    font-size: 11px;
  }

  fieldset {
    display: none;
  }

  input[type='number'] {
    appearance: textfield;
    -moz-appearance: textfield;

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  input[type='date']::-webkit-calendar-picker-indicator {
    cursor: pointer;
    opacity: 0.55;
  }

  ${({ inputSize }) =>
    inputSize === 'large' &&
    `
    .MuiInputBase-root {
      min-height: 56px;
      height: 56px;
      border-radius: 12px;
      padding: 0 16px;
    }

    .MuiInputBase-root .MuiInputBase-input {
      font-size: 16px;
      height: 56px;
    }

    .MuiInputBase-root .MuiInputBase-input::placeholder {
      font-size: 16px;
    }

    .MuiInputAdornment-positionStart svg,
    .MuiInputAdornment-positionEnd svg {
      width: 20px;
      height: 20px;
    }
  `}
`;

type TCommonInputProps = StandardTextFieldProps & {
  isPassword?: boolean;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  inputLabelName?: string;
  inputSize?: 'medium' | 'large';
};

const CustomInput = forwardRef<HTMLInputElement, TCommonInputProps>(
  (
    {
      isPassword = false,
      startAdornment,
      endAdornment,
      inputLabelName,
      inputSize = 'medium',
      ...others
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = useCallback(() => {
      setShowPassword((prev) => !prev);
    }, []);

    const handleMouseDownPassword = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
      },
      [],
    );

    return (
      <>
        {inputLabelName && (
          <CustomInputLabel
            htmlFor={others.id}
            $inputSize={inputSize}
            className={`inputLabel-txt-global ${others.disabled ? 'disabled-cls' : ''}`}
          >
            {inputLabelName}
          </CustomInputLabel>
        )}
        <CustomInputWrap
          fullWidth
          variant={others.variant ?? 'outlined'}
          type={
            isPassword ? (showPassword ? 'text' : 'password') : others?.type
          }
          labelName={!!inputLabelName}
          inputSize={inputSize}
          slotProps={{
            input: {
              inputRef: ref,
              startAdornment: startAdornment && (
                <InputAdornment position="start">
                  {startAdornment}
                </InputAdornment>
              ),
              endAdornment: isPassword ? (
                <InputAdornment position="end" className="password-icon">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    disableRipple
                  >
                    {showPassword ? (
                      <PasswordVisibilityIcon />
                    ) : (
                      <PasswordNonVisibilityIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ) : (
                endAdornment && (
                  <InputAdornment position="end">{endAdornment}</InputAdornment>
                )
              ),
            },
          }}
          {...others}
        />
      </>
    );
  },
);
CustomInput.displayName = 'CustomInput';
export default CustomInput;
