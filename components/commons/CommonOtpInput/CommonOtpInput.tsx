import { Box, styled } from '@mui/material';
import { useState } from 'react';
import OTPInput from 'react-otp-input';
import CommonErrorText from '../CommonErrorText/CommonErrorText';

interface ICommonOtpInputProps {
    numDigits?: number;
    onOtpChange: (otp: string) => void;
    error?: string;
    autoFocus?: boolean;
}

const OtpInputStyle = styled(Box)`
  display: flex;
  justify-content: center;

  & > div {
    justify-content: center;
  }

  input {
    width: 48px !important;
    height: 56px;
    border: 1px solid ${({ theme }) => theme.palette.customColors.inputBorder};
    border-radius: 12px;
    background: ${({ theme }) => theme.palette.customColors.inputBg};
    color: ${({ theme }) => theme.palette.text.primary};
    font-size: 20px;
    font-weight: 600;
    font-family: var(--font-inter), 'Inter', sans-serif;
    text-align: center;
    outline: none;
    transition: transform 0.2s ease;
  }

  input:focus {
    transform: scale(1.05);
    border-color: ${({ theme }) => theme.palette.customColors.inputBorder};
    box-shadow: none;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }
`;

const CommonOtpInput = ({ numDigits = 4, onOtpChange, error = '' }: ICommonOtpInputProps) => {
    const [otp, setOtp] = useState('');

    const handleChange = (val: string) => {
        setOtp(val);
        onOtpChange(val);
    };

    return (
        <OtpInputStyle className='otpContainer'>
            <OTPInput
                value={otp}
                onChange={handleChange}
                numInputs={numDigits}
                containerStyle={{ width: '100%', display: 'flex', justifyContent: 'center' }}
                renderSeparator={<span style={{ width: '8px' }}></span>}
                renderInput={props => (
                    <input
                        {...props}
                        type='text'
                        inputMode='numeric'
                        pattern='[0-9]*'
                        autoComplete='one-time-code'
                        style={{ ...props.style, width: '48px', height: '56px' }}
                    />
                )}
            />
            <CommonErrorText message={error} />
        </OtpInputStyle>
    );
};

export default CommonOtpInput;
