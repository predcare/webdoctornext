import { InputLabel, styled } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField, { StandardTextFieldProps } from '@mui/material/TextField';
import React, { forwardRef, useCallback, useState } from 'react';
import PasswordNonVisibilityIcon from '../Icons/PasswordNonVisibilityIcon';
import PasswordVisibilityIcon from '../Icons/PasswordVisibilityIcon';

export const CustomInputWrap = styled(TextField, {
    shouldForwardProp: (data) => data !== 'labelName',
}) <{ labelName?: boolean }>`
  .MuiInputBase-root {
    background: ${({ theme }) => theme.palette.customColors.inputBg};
    border: 0.5px solid ${({ theme }) => theme.palette.customColors.inputBorder};
    border-radius: 8px;
    min-height: 44px;
    height: 100%;
    padding: 0 10px;
    box-shadow: none;
    transition: border-color 0.15s ease;

    &:hover {
      border-color: ${({ theme }) => theme.palette.primary.main};
    }

    &.Mui-focused {
      border-color: ${({ theme }) => theme.palette.primary.light};
      box-shadow: 0 0 0 3px ${({ theme }) => theme.palette.primary.light}1F;
    }

    &.Mui-disabled {
      background: ${({ theme }) => theme.palette.action.disabledBackground};
      border-color: ${({ theme }) => theme.palette.customColors.inputBorder};
      opacity: 0.6;
    }

    @media (max-width: 599px) {
      min-height: 34px;
      height: 34px;
      padding: 0 10px;
    }

    .MuiInputBase-input {
      font-size: 13px;
      font-weight: 400;
      font-family: 'Poppins', sans-serif !important;
      color: ${({ theme }) => theme.palette.text.primary};
      padding: 0;
      height: 34px;
      box-sizing: border-box;

      &::placeholder {
        color: ${({ theme }) => theme.palette.text.secondary};
        opacity: 1;
        -webkit-text-fill-color: ${({ theme }) => theme.palette.text.secondary};
        font-size: 13px;
      }

      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus,
      &:-webkit-autofill:active {
        -webkit-box-shadow: 0 0 0 1000px transparent inset !important;
        box-shadow: 0 0 0 1000px transparent inset !important;
        -webkit-text-fill-color: ${({ theme }) => theme.palette.text.primary};
        caret-color: ${({ theme }) => theme.palette.text.primary};
        transition: background-color 9999s ease-out 0s;
      }

      &::-ms-input-placeholder {
        color: ${({ theme }) => theme.palette.text.secondary};
        -webkit-text-fill-color: ${({ theme }) => theme.palette.text.secondary};
      }

      &.Mui-disabled {
        opacity: 1;
        color: ${({ theme }) => theme.palette.text.disabled};
        -webkit-text-fill-color: ${({ theme }) => theme.palette.text.disabled};
      }
    }

    .MuiInputAdornment-positionEnd {
      margin-left: 6px;

      .MuiIconButton-root {
        padding: 0;
        color: ${({ theme }) => theme.palette.text.secondary};

        svg {
          width: 16px;
          height: 16px;
        }
      }
    }

    .MuiInputAdornment-positionStart {
      margin-right: 6px;
      color: ${({ theme }) => theme.palette.text.secondary};

      svg {
        width: 16px;
        height: 16px;
      }
    }
  }

  fieldset {
    display: none;
  }

  input[type='number'] {
    appearance: textfield;
    -webkit-appearance: none;
    -moz-appearance: textfield;

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;

type TCommonInputProps = StandardTextFieldProps & {
    isPassword?: boolean;
    startAdornment?: React.ReactNode;
    endAdornment?: React.ReactNode;
    inputLabelName?: string;
};

const CustomInput = forwardRef<HTMLInputElement, TCommonInputProps>(
    (
        {
            isPassword = false,
            startAdornment,
            endAdornment,
            inputLabelName,
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
                    <InputLabel
                        className={`inputLabel-txt-global ${others.disabled ? 'disabled-cls' : ''}`}
                        sx={{
                            fontSize: '11px',
                            fontWeight: 500,
                            color: 'text.secondary',
                            fontFamily: "'Poppins', sans-serif",
                            marginBottom: '4px',
                            lineHeight: 1.4,
                            '&.disabled-cls': {
                                opacity: 0.5,
                            },
                        }}
                    >
                        {inputLabelName}
                    </InputLabel>
                )}
                <CustomInputWrap
                    fullWidth
                    variant={others.variant ?? 'outlined'}
                    type={
                        isPassword ? (showPassword ? 'text' : 'password') : others?.type
                    }
                    labelName={!!inputLabelName}
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
