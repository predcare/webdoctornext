'use client';

import CommonOtpInput from '@/components/commons/CommonOtpInput/CommonOtpInput';
import CustomInput from '@/components/ui/CustomInput/CustomInput';
import CustomTabsGroup from '@/components/ui/CustomTabsGroup/CustomTabsGroup';
import { projectRoutes } from '@/routes';
import { AuthLoginWrapper } from '@/styles/CustomStyled/AuthLoginWrapper';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import SendIcon from '@mui/icons-material/Send';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Typography,
} from '@mui/material';
import NextLink from 'next/link';
import { FormEvent, useState } from 'react';

type LoginMethod = 'mobile' | 'email';
type LoginStep = 'input' | 'otp';

const DoctorLoginPage = () => {
  const [method, setMethod] = useState<LoginMethod>('mobile');
  const [step, setStep] = useState<LoginStep>('input');
  const [remember, setRemember] = useState(false);

  const handleSendOtp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStep('otp');
  };

  return (
    <AuthLoginWrapper elevation={0}>
      <Box className="login-header">
        <Typography className="login-title">Doctor Login</Typography>
        <Typography className="login-subtitle">
          Choose your preferred login method
        </Typography>
      </Box>

      <Box className="login-tabs">
        <CustomTabsGroup
          variant="segmented"
          showCount={false}
          value={method === 'mobile' ? 0 : 1}
          onChange={(_event, nextValue) => {
            setMethod(nextValue === 0 ? 'mobile' : 'email');
            setStep('input');
          }}
          tabs={[{ label: 'Mobile' }, { label: 'Email' }]}
        />
      </Box>

      <Box className="form-panel" key={`${method}-${step}`}>
        {method === 'mobile' && step === 'input' && (
          <Box component="form" onSubmit={handleSendOtp}>
            <Box className="field-lg">
              <CustomInput
                inputLabelName="Mobile Number"
                placeholder="Enter 10-digit mobile number"
                type="tel"
                autoComplete="off"
                startAdornment={<PhoneIphoneOutlinedIcon />}
              />
            </Box>
            <Button type="submit" variant="contained" className="submit-btn">
              <SendIcon />
              Send OTP
            </Button>
          </Box>
        )}

        {method === 'mobile' && step === 'otp' && (
          <Box component="form" onSubmit={(event) => event.preventDefault()}>
            <Typography className="otp-copy">Enter the 6-digit OTP</Typography>
            <Box className="otp-boxes">
              <CommonOtpInput numDigits={6} onOtpChange={() => undefined} />
            </Box>
            <Button type="submit" variant="contained" className="submit-btn">
              Verify OTP
            </Button>
            <Box className="resend-row">
              <Button
                type="button"
                variant="text"
                disableRipple
                className="resend-btn"
              >
                Resend OTP
              </Button>
            </Box>
          </Box>
        )}

        {method === 'email' && (
          <Box component="form" onSubmit={(event) => event.preventDefault()}>
            <Box className="field-md">
              <CustomInput
                inputLabelName="Email Address"
                placeholder="Enter your email"
                type="email"
                autoComplete="off"
                startAdornment={<EmailOutlinedIcon />}
              />
            </Box>
            <Box className="field-sm">
              <CustomInput
                inputLabelName="Password"
                placeholder="Enter your password"
                isPassword
                autoComplete="current-password"
              />
            </Box>
            <FormControlLabel
              className="remember-label"
              control={
                <Checkbox
                  checked={remember}
                  onChange={(event) => setRemember(event.target.checked)}
                />
              }
              label="Remember me"
            />
            <Button type="submit" variant="contained" className="submit-btn">
              Login
            </Button>
          </Box>
        )}
      </Box>

      <Box className="login-footer">
        <Typography className="footer-copy">
          Don&apos;t have an account?{' '}
          <Link
            component={NextLink}
            href={projectRoutes.doctorRegister}
            className="register-link"
          >
            Register Now
          </Link>
        </Typography>
        <Link
          component={NextLink}
          href={projectRoutes.home}
          className="back-home-link"
        >
          <ArrowBackIcon />
          Back to Home
        </Link>
      </Box>
    </AuthLoginWrapper>
  );
};

export default DoctorLoginPage;
