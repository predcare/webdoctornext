'use client';
/* eslint-disable @next/next/no-img-element -- landing images stay native img tags inside figure */

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
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

interface RegistrationModalProps {
  open: boolean;
  onClose: () => void;
}

const DARK_LOGO = '/assets/images/PRED_CARE_Logo_blue.png';

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

  const handleLogoError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src =
      'https://placehold.co/150x50/transparent/1e3a8a?text=PRED+CARE';
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      slotProps={{
        paper: {
          className: 'cms-modal-paper',
        },
      }}
    >
      <Box className="modal-top">
        <Button
          className="modal-back"
          onClick={onClose}
          startIcon={<ArrowBackIcon />}
        >
          Back to Home
        </Button>
        <IconButton className="modal-close" onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent>
        <Box className="modal-header">
          <figure className="media modal-logo">
            <img src={DARK_LOGO} alt="PRED Care" onError={handleLogoError} />
          </figure>
          <Typography className="modal-title" variant="h2">
            Create your account
          </Typography>
          <Typography className="modal-subtitle" variant="body2">
            Start your 14-day free trial. No credit card required.
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit}>
          <Box className="modal-fields">
            <TextField
              className="modal-field"
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
                      <LocalHospitalOutlinedIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              className="modal-field"
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
                      <AccountCircleOutlinedIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              className="modal-field"
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
                      <EmailOutlinedIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              className="modal-field"
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
                      <PhoneOutlinedIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  required
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                />
              }
              label={
                <Typography className="modal-terms" variant="body2">
                  I agree to the{' '}
                  <Link
                    className="modal-link"
                    href="https://stage.predcare.in/terms.html"
                    target="_blank"
                  >
                    Terms
                  </Link>{' '}
                  and{' '}
                  <Link
                    className="modal-link"
                    href="https://stage.predcare.in/privacy-policy.html"
                    target="_blank"
                  >
                    Privacy Policy
                  </Link>
                </Typography>
              }
            />

            <Button
              className="modal-submit"
              type="submit"
              variant="contained"
              fullWidth
            >
              Register Clinic
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationModal;
