'use client';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

interface RegistrationModalProps {
  open: boolean;
  onClose: () => void;
}

const RegistrationModal = ({ open, onClose }: RegistrationModalProps) => {
  const [formData, setFormData] = useState({
    clinicName: '',
    name: '',
    email: '',
    phone: '',
    agreeTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Registration successful! Welcome to PRED Care.');
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      slotProps={{
        paper: {
          sx: {
            borderRadius: '28px',
            p: { xs: 2.5, sm: 4 },
            bgcolor: '#FFFFFF',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            position: 'relative',
          },
        },
      }}
    >
      {/* Top action row */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Button
          onClick={onClose}
          startIcon={<ArrowBackIcon />}
          sx={{
            color: '#64748B',
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.95rem',
            '&:hover': { color: '#2563EB', bgcolor: 'transparent' },
          }}
        >
          Back to Home
        </Button>
        <IconButton onClick={onClose} size="small" sx={{ color: '#64748B' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent sx={{ p: 0 }}>
        {/* Modal Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box
            component="img"
            src="https://stage.predcare.in/images/pred-care-logo.png"
            alt="PRED Care"
            sx={{
              height: 44,
              width: 'auto',
              mx: 'auto',
              mb: 2.5,
              objectFit: 'contain',
            }}
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              e.currentTarget.src =
                'https://placehold.co/150x50/transparent/1e3a8a?text=PRED+CARE';
            }}
          />
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: '1.75rem', sm: '2rem' },
              fontWeight: 700,
              color: '#0F172A',
              mb: 1,
            }}
          >
            Create your account
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: '#64748B', fontSize: '0.95rem' }}
          >
            Start your 14-day free trial. No credit card required.
          </Typography>
        </Box>

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2.5}>
            {/* Clinic Name */}
            <TextField
              required
              fullWidth
              name="clinicName"
              placeholder="Clinic / Hospital Name"
              value={formData.clinicName}
              onChange={handleChange}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocalHospitalOutlinedIcon sx={{ color: '#94A3B8' }} />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: '14px',
                    bgcolor: '#F8FAFC',
                  },
                },
              }}
            />

            {/* Doctor Name */}
            <TextField
              required
              fullWidth
              name="name"
              placeholder="Doctor / Admin Name"
              value={formData.name}
              onChange={handleChange}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircleOutlinedIcon sx={{ color: '#94A3B8' }} />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: '14px',
                    bgcolor: '#F8FAFC',
                  },
                },
              }}
            />

            {/* Email Address */}
            <TextField
              required
              fullWidth
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon sx={{ color: '#94A3B8' }} />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: '14px',
                    bgcolor: '#F8FAFC',
                  },
                },
              }}
            />

            {/* Phone Number */}
            <TextField
              required
              fullWidth
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneOutlinedIcon sx={{ color: '#94A3B8' }} />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: '14px',
                    bgcolor: '#F8FAFC',
                  },
                },
              }}
            />

            {/* Terms checkbox */}
            <FormControlLabel
              control={
                <Checkbox
                  required
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  sx={{
                    color: '#94A3B8',
                    '&.Mui-checked': {
                      color: '#2563EB',
                    },
                  }}
                />
              }
              label={
                <Typography
                  variant="body2"
                  sx={{ color: '#1E293B', fontSize: '0.875rem' }}
                >
                  I agree to the{' '}
                  <Link
                    href="https://stage.predcare.in/terms.html"
                    target="_blank"
                    sx={{
                      color: '#2563EB',
                      fontWeight: 600,
                      textDecoration: 'none',
                    }}
                  >
                    Terms
                  </Link>{' '}
                  and{' '}
                  <Link
                    href="https://stage.predcare.in/privacy-policy.html"
                    target="_blank"
                    sx={{
                      color: '#2563EB',
                      fontWeight: 600,
                      textDecoration: 'none',
                    }}
                  >
                    Privacy Policy
                  </Link>
                </Typography>
              }
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                bgcolor: '#2563EB',
                color: '#FFFFFF',
                py: 1.6,
                borderRadius: '14px',
                fontSize: '1.05rem',
                fontWeight: 600,
                textTransform: 'none',
                boxShadow: '0 10px 20px -3px rgba(37, 99, 235, 0.4)',
                '&:hover': {
                  bgcolor: '#1D4ED8',
                  transform: 'translateY(-1px)',
                },
              }}
            >
              Register Clinic
            </Button>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationModal;
