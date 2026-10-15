'use client';

import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact Us', href: '#contact' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openLoginMenu = Boolean(anchorEl);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLoginClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLoginClose = () => {
    setAnchorEl(null);
  };

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      setMobileOpen(false);
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={isScrolled ? 6 : 0}
        sx={{
          backgroundColor: isScrolled ? '#041B66' : 'transparent',
          backgroundImage: 'none',
          transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            sx={{
              height: { xs: 72, md: 80 },
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {/* Logo */}
            <Box
              onClick={scrollToTop}
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                userSelect: 'none',
              }}
            >
              <Box
                component="img"
                src="https://stage.predcare.in/images/pred-care-logo.png"
                alt="PRED Care Logo"
                sx={{
                  height: { xs: 40, md: 48 },
                  width: 'auto',
                  objectFit: 'contain',
                }}
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  e.currentTarget.src =
                    'https://placehold.co/150x50/transparent/white?text=PRED+CARE';
                }}
              />
            </Box>

            {/* Desktop Navigation Links */}
            <Stack
              direction="row"
              spacing={4}
              sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}
            >
              {NAV_LINKS.map((link) => (
                <Typography
                  key={link.label}
                  component="a"
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  sx={{
                    color: '#FFFFFF',
                    fontSize: '1rem',
                    fontWeight: 400,
                    textDecoration: 'none',
                    cursor: 'pointer',
                    transition: 'color 0.2s ease-in-out',
                    '&:hover': {
                      color: '#93C5FD', // light blue accent
                    },
                  }}
                >
                  {link.label}
                </Typography>
              ))}
            </Stack>

            {/* Desktop Action Buttons */}
            <Stack
              direction="row"
              spacing={2}
              sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}
            >
              {/* Login Button with Dropdown */}
              <Box sx={{ position: 'relative' }}>
                <Button
                  variant="contained"
                  onClick={handleLoginClick}
                  endIcon={
                    <KeyboardArrowDownIcon
                      sx={{
                        transform: openLoginMenu
                          ? 'rotate(180deg)'
                          : 'rotate(0deg)',
                        transition: 'transform 0.2s ease',
                      }}
                    />
                  }
                  sx={{
                    bgcolor: '#2563EB',
                    color: '#FFFFFF',
                    textTransform: 'none',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    px: 3,
                    py: 1.1,
                    borderRadius: '50px',
                    boxShadow: '0 4px 14px 0 rgba(37,99,235,0.39)',
                    '&:hover': {
                      bgcolor: '#1D4ED8',
                    },
                  }}
                >
                  Login
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={openLoginMenu}
                  onClose={handleLoginClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  slotProps={{
                    paper: {
                      sx: {
                        mt: 1.5,
                        minWidth: 220,
                        borderRadius: '16px',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
                        p: 0.5,
                      },
                    },
                  }}
                >
                  <MenuItem
                    component="a"
                    href="https://stage.predcare.in/doctor/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleLoginClose}
                    sx={{
                      py: 1.5,
                      px: 2,
                      borderRadius: '10px',
                      color: '#1E293B',
                      fontWeight: 500,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      '&:hover': {
                        bgcolor: '#EFF6FF',
                        color: '#2563EB',
                      },
                    }}
                  >
                    <MedicalServicesOutlinedIcon sx={{ color: '#2563EB' }} />
                    Login as Doctor
                  </MenuItem>
                </Menu>
              </Box>

              {/* Register Button */}
              <Button
                component="a"
                href="https://stage.predcare.in/doctor/register"
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
                sx={{
                  bgcolor: '#FFFFFF',
                  color: '#1D4ED8',
                  textTransform: 'none',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  px: 3,
                  py: 1.1,
                  borderRadius: '50px',
                  boxShadow: '0 4px 14px 0 rgba(0,0,0,0.1)',
                  '&:hover': {
                    bgcolor: '#EFF6FF',
                    color: '#1E40AF',
                  },
                }}
              >
                Register
              </Button>
            </Stack>

            {/* Mobile Hamburger Button */}
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                aria-label="open drawer"
                onClick={() => setMobileOpen(true)}
                sx={{ color: '#FFFFFF' }}
              >
                <MenuIcon sx={{ fontSize: '2rem' }} />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: '100%',
              maxWidth: 360,
              bgcolor: '#041B66',
              color: '#FFFFFF',
              p: 3,
              display: 'flex',
              flexDirection: 'column',
            },
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 4,
          }}
        >
          <Box
            component="img"
            src="https://stage.predcare.in/images/pred-care-logo.png"
            alt="PRED Care Logo"
            sx={{ height: 36, width: 'auto' }}
          />
          <IconButton
            onClick={() => setMobileOpen(false)}
            sx={{ color: '#FFFFFF' }}
          >
            <CloseIcon sx={{ fontSize: '1.75rem' }} />
          </IconButton>
        </Box>

        <Stack spacing={2} sx={{ mb: 4 }}>
          {NAV_LINKS.map((link) => (
            <Typography
              key={link.label}
              component="a"
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              sx={{
                color: '#FFFFFF',
                fontSize: '1.2rem',
                fontWeight: 500,
                textDecoration: 'none',
                py: 1,
                borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
                '&:hover': {
                  color: '#93C5FD',
                },
              }}
            >
              {link.label}
            </Typography>
          ))}
        </Stack>

        <Box
          sx={{ mt: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <Typography
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontWeight: 600,
              fontSize: '0.9rem',
            }}
          >
            AUTHENTICATION
          </Typography>

          <Button
            component="a"
            href="https://stage.predcare.in/doctor/login"
            target="_blank"
            variant="outlined"
            startIcon={<MedicalServicesOutlinedIcon />}
            sx={{
              borderColor: '#FFFFFF',
              color: '#FFFFFF',
              py: 1.5,
              borderRadius: '12px',
              fontWeight: 600,
              textTransform: 'none',
              fontSize: '1rem',
              '&:hover': {
                borderColor: '#FFFFFF',
                bgcolor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            Doctor Login
          </Button>

          <Button
            component="a"
            href="https://stage.predcare.in/doctor/register"
            target="_blank"
            variant="contained"
            startIcon={<PersonAddOutlinedIcon />}
            sx={{
              bgcolor: '#FFFFFF',
              color: '#041B66',
              py: 1.5,
              borderRadius: '12px',
              fontWeight: 700,
              textTransform: 'none',
              fontSize: '1rem',
              '&:hover': {
                bgcolor: '#EFF6FF',
              },
            }}
          >
            Register Clinic
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
