'use client';

import CommonErrorText from '@/components/commons/CommonErrorText/CommonErrorText';
import CommonOtpInput from '@/components/commons/CommonOtpInput/CommonOtpInput';
import CustomInput from '@/components/ui/CustomInput/CustomInput';
import CustomTabsGroup from '@/components/ui/CustomTabsGroup/CustomTabsGroup';
import { _isPolicyAccepted, _isUserRole } from '@/configs/keys.constants';
import {
  useReSendOtp,
  useSendOtp,
  useVerifyOTP,
} from '@/hooks/react-query/auth/auth.hooks';
import { ILoginVerifyOtpPayload } from '@/hooks/react-query/auth/payload.interfaces';
import { getProfile } from '@/hooks/react-query/profile/profile.funcs';
import { clearAuthToken, setAuthToken } from '@/lib/commons/authToken';
import { setCookieClient } from '@/lib/functions/_storage.lib';
import {
  LoginFormSchema,
  TLoginFormSchemaType,
} from '@/lib/schemas/auth.schema';
import { projectRoutes } from '@/routes';
import { AuthLoginWrapper } from '@/styles/CustomStyled/AuthLoginWrapper';
import { TLoginMode, UserRoles } from '@/typescripts/enums';
import { useAuthStore } from '@/zustand/stores/useAuthStore';
import { useLoadingStore } from '@/zustand/stores/useLoadingStore';
import { yupResolver } from '@hookform/resolvers/yup';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import SendIcon from '@mui/icons-material/Send';
import { Box, Button, Link, Typography } from '@mui/material';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

const DoctorLoginPage = () => {
  const router = useRouter();
  const [loginMode, setLoginMode] = useState<TLoginMode>('mobile');
  const [otpSent, setOtpSent] = useState(false);

  const { setUserData } = useAuthStore((state) => state);
  const { isLoading, hideLoader, showLoader } = useLoadingStore(
    (state) => state,
  );
  const { mutate: sendOtpMutation, isPending: sendOtpPending } = useSendOtp();
  const { mutate: resendOtpMutation, isPending: resendOtpPending } =
    useReSendOtp();
  const { mutate: verifyOtpMutation, isPending: verifyOtpPending } =
    useVerifyOTP();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<TLoginFormSchemaType>({
    resolver: yupResolver(LoginFormSchema),
    defaultValues: {
      mode: 'mobile',
      identifier: '',
      otp: '',
    },
    mode: 'onChange',
  });

  const identifier = watch('identifier') || '';
  const otpValue = watch('otp') || '';

  const maskedIdentifier = () => {
    if (!identifier) return '';
    if (loginMode === 'email') {
      const [name, domain] = identifier.split('@');
      if (!name || !domain) return identifier;
      return `${name.slice(0, 2)}${'*'.repeat(Math.max(0, name.length - 2))}@${domain}`;
    }
    return `+91 ${identifier.slice(0, 2)}****${identifier.slice(-2)}`;
  };

  const switchMode = (mode: TLoginMode) => {
    if (otpSent) return;
    setLoginMode(mode);
    clearErrors();
    setValue('mode', mode, { shouldValidate: false });
    setValue('identifier', '', { shouldValidate: false });
    setValue('otp', '', { shouldValidate: false });
    setOtpSent(false);
  };

  const getOtpPayload = (value: string, mode: string) => {
    const cleanIdentifier = value.trim();
    if (mode === 'mobile') {
      return {
        phone_number: cleanIdentifier,
        user_type: 'doctor' as const,
      };
    }
    return {
      email: cleanIdentifier.toLowerCase(),
      user_type: 'doctor' as const,
    };
  };

  const isVerifyDisabled =
    otpSent && (otpValue.length !== 6 || verifyOtpPending || isLoading);

  const handleSendOtp = (
    data: TLoginFormSchemaType,
    type: 'send' | 'resend' = 'send',
  ) => {
    if (type === 'resend' && resendOtpPending) return;
    if (type === 'send' && sendOtpPending) return;

    const payload = getOtpPayload(data.identifier || '', data.mode || loginMode);
    const mutateFn = type === 'resend' ? resendOtpMutation : sendOtpMutation;

    showLoader(type === 'resend' ? 'Resending OTP...' : 'Sending OTP...');
    mutateFn(payload, {
      onSuccess: (res) => {
        hideLoader();
        if (res?.success) {
          if (type === 'send') setOtpSent(true);
          setValue('otp', '');
        }
      },
      onError: () => {
        hideLoader();
      },
    });
  };

  const onSubmitSendOtp = (data: TLoginFormSchemaType) => {
    handleSendOtp(data, 'send');
  };

  const onSubmitResendOtp = (data: TLoginFormSchemaType) => {
    handleSendOtp(data, 'resend');
  };

  const onSubmitVerifyOtp = async (data: TLoginFormSchemaType) => {
    if (verifyOtpPending || isLoading) return;
    if (!data.otp || data.otp.length < 6) return;
    if (!identifier) return;

    const cleanIdentifier = identifier.trim();
    const payload: ILoginVerifyOtpPayload = {
      ...(loginMode === 'email'
        ? { email: cleanIdentifier.toLowerCase() }
        : { phone_number: cleanIdentifier }),
      otp: data.otp,
      user_type: UserRoles.DOCTOR,
      device_id: '',
      device_name: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      platform: 'web',
      fcm_token: '',
      os_version: '',
      app_version: '1.0.0',
    };

    showLoader('Verifying OTP...');
    verifyOtpMutation(payload, {
      onSuccess: async (res) => {
        if (res?.success) {
          const token = res?.token;
          if (token) {
            showLoader('Signing you in...');
            setAuthToken(token);

            let doctorData: Awaited<ReturnType<typeof getProfile>>['data'] | null =
              null;
            try {
              showLoader('Loading your profile...');
              const profileRes = await getProfile();
              if (profileRes?.data) {
                doctorData = profileRes.data;
                setUserData(profileRes.data);
              }
            } catch (err) {
              console.error('Failed to fetch doctor profile after login:', err);
            }
            hideLoader();
            setCookieClient(_isPolicyAccepted, `${doctorData?.has_accepted_policies}`, '7d');
            setCookieClient(_isUserRole, `${UserRoles.DOCTOR}`, '7d');
            if (doctorData?.has_accepted_policies) {
              router.replace(projectRoutes.dashboard);
            } else {
              router.replace(projectRoutes.policyAcceptance);
            }
          } else {
            hideLoader();
            clearAuthToken();
          }
        } else {
          hideLoader();
        }
      },
      onError: () => {
        hideLoader();
      },
    });
  };

  const handlePrimaryPress = () => {
    if (!otpSent) {
      handleSubmit(onSubmitSendOtp)();
    } else {
      handleSubmit(onSubmitVerifyOtp)();
    }
  };

  return (
    <AuthLoginWrapper elevation={0}>
      <Box className="login-header">
        <Typography className="login-title">Doctor Login</Typography>
        <Typography className="login-subtitle">
          {otpSent
            ? `Enter the OTP sent to ${maskedIdentifier()}`
            : 'Choose your preferred login method'}
        </Typography>
      </Box>

      {!otpSent && (
        <Box className="login-tabs">
          <CustomTabsGroup
            variant="segmented"
            showCount={false}
            value={loginMode === 'mobile' ? 0 : 1}
            onChange={(_event, nextValue) => {
              switchMode(nextValue === 0 ? 'mobile' : 'email');
            }}
            tabs={[{ label: 'Mobile' }, { label: 'Email' }]}
          />
        </Box>
      )}

      <Box
        className="form-panel"
        key={`${loginMode}-${otpSent ? 'otp' : 'input'}`}
      >
        {!otpSent ? (
          <Box
            component="form"
            onSubmit={(event) => {
              event.preventDefault();
              handlePrimaryPress();
            }}
          >
            <Box className="field-lg">
              <Controller
                name="identifier"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    inputLabelName={
                      loginMode === 'mobile'
                        ? 'Mobile Number'
                        : 'Email Address'
                    }
                    placeholder={
                      loginMode === 'mobile'
                        ? 'Enter 10-digit mobile number'
                        : 'Enter your email'
                    }
                    type={loginMode === 'mobile' ? 'tel' : 'email'}
                    autoComplete="off"
                    error={Boolean(errors.identifier)}
                    helperText={errors.identifier?.message}
                    startAdornment={
                      loginMode === 'mobile' ? (
                        <PhoneIphoneOutlinedIcon />
                      ) : (
                        <EmailOutlinedIcon />
                      )
                    }
                  />
                )}
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              className="submit-btn"
              disabled={sendOtpPending || isLoading}
            >
              <SendIcon />
              Send OTP
            </Button>
          </Box>
        ) : (
          <Box
            component="form"
            onSubmit={(event) => {
              event.preventDefault();
              handlePrimaryPress();
            }}
          >
            <Typography className="otp-copy">Enter the 6-digit OTP</Typography>
            <Box className="otp-boxes">
              <Controller
                name="otp"
                control={control}
                render={({ field }) => (
                  <CommonOtpInput
                    numDigits={6}
                    onOtpChange={(otp) => field.onChange(otp)}
                  />
                )}
              />
              <CommonErrorText message={errors.otp?.message || ''} />
            </Box>
            <Button
              type="submit"
              variant="contained"
              className="submit-btn"
              disabled={isVerifyDisabled}
            >
              Verify OTP
            </Button>
            <Box className="resend-row">
              <Button
                type="button"
                variant="text"
                disableRipple
                className="resend-btn"
                disabled={resendOtpPending || isLoading}
                onClick={() => handleSubmit(onSubmitResendOtp)()}
              >
                Resend OTP
              </Button>
              <Button
                type="button"
                variant="text"
                disableRipple
                className="resend-btn"
                disabled={isLoading}
                onClick={() => {
                  setOtpSent(false);
                  setValue('otp', '');
                  clearErrors('otp');
                }}
              >
                Change {loginMode === 'mobile' ? 'Mobile' : 'Email'}
              </Button>
            </Box>
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
