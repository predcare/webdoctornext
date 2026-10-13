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
                renderSeparator={<span style={{ width: '8px' }}></span>}
                renderInput={props => (
                    <input
                        {...props}
                        type='text'
                        inputMode='numeric'
                        pattern='[0-9]*'
                        autoComplete='one-time-code'
                    />
                )}
            />
            <CommonErrorText message={error} />
        </OtpInputStyle>
    );
};

export default CommonOtpInput;
