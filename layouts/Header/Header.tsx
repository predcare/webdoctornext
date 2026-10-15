'use client';
/* eslint-disable @next/next/no-img-element -- landing images stay native img tags inside figure */

import { CmsLandingWrapper } from '@/styles/CustomStyled/CmsLandingWrapper';
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

const LIGHT_LOGO = 'https://stage.predcare.in/images/pred-care-logo.png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openLoginMenu = Boolean(anchorEl);

  useEffect(() => {
    const getScrollTop = () =>
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;

    const handleScroll = () => {
      setIsScrolled(getScrollTop() > 50);
    };

    document.addEventListener('scroll', handleScroll, {
      passive: true,
      capture: true,
    });
    handleScroll();
    return () =>
      document.removeEventListener('scroll', handleScroll, { capture: true });
  }, []);

  const handleLoginClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLoginClose = () => {
    setAnchorEl(null);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  const handleLogoError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src =
      'https://placehold.co/150x50/transparent/white?text=PRED+CARE';
  };

  return (
    <CmsLandingWrapper className="cms-chrome">
      <AppBar
        className={isScrolled ? 'cms-header is-scrolled' : 'cms-header'}
        position="fixed"
        elevation={0}
        color="transparent"
      >
        <Container maxWidth="lg">
          <Toolbar className="cms-toolbar" disableGutters>
            <button type="button" className="brand-logo" onClick={scrollToTop}>
              <figure className="media">
                <img
                  src={LIGHT_LOGO}
                  alt="PRED Care Logo"
                  onError={handleLogoError}
                />
              </figure>
            </button>

            <Stack className="desktop-nav" direction="row" component="nav">
              {NAV_LINKS.map((link) => (
                <Typography
                  key={link.label}
                  className="nav-link"
                  component="a"
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                </Typography>
              ))}
            </Stack>

            <Stack className="desktop-actions" direction="row">
              <Box>
                <Button
                  className="login-btn"
                  variant="contained"
                  onClick={handleLoginClick}
                  endIcon={
                    <KeyboardArrowDownIcon
                      className={
                        openLoginMenu
                          ? 'login-chevron is-open'
                          : 'login-chevron'
                      }
                    />
                  }
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
                      className: 'login-menu-paper',
                    },
                  }}
                >
                  <MenuItem
                    className="login-menu-item"
                    component="a"
                    href="https://stage.predcare.in/doctor/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleLoginClose}
                  >
                    <MedicalServicesOutlinedIcon />
                    Login as Doctor
                  </MenuItem>
                </Menu>
              </Box>

              <Button
                className="register-btn"
                component="a"
                href="https://stage.predcare.in/doctor/register"
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
              >
                Register
              </Button>
            </Stack>

            <Box className="mobile-toggle">
              <IconButton
                className="menu-button"
                aria-label="open drawer"
                onClick={() => setMobileOpen(true)}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        slotProps={{
          paper: {
            className: 'cms-drawer-paper',
          },
        }}
      >
        <Box className="drawer-top">
          <figure className="media drawer-logo">
            <img src={LIGHT_LOGO} alt="PRED Care Logo" />
          </figure>
          <IconButton
            className="drawer-close"
            onClick={() => setMobileOpen(false)}
            aria-label="close drawer"
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Stack className="drawer-links" spacing={2}>
          {NAV_LINKS.map((link) => (
            <Typography
              key={link.label}
              className="drawer-link"
              component="a"
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </Typography>
          ))}
        </Stack>

        <Box className="drawer-auth">
          <Typography className="drawer-kicker">AUTHENTICATION</Typography>

          <Button
            className="drawer-login"
            component="a"
            href="https://stage.predcare.in/doctor/login"
            target="_blank"
            variant="outlined"
            startIcon={<MedicalServicesOutlinedIcon />}
          >
            Doctor Login
          </Button>

          <Button
            className="drawer-register"
            component="a"
            href="https://stage.predcare.in/doctor/register"
            target="_blank"
            variant="contained"
            startIcon={<PersonAddOutlinedIcon />}
          >
            Register Clinic
          </Button>
        </Box>
      </Drawer>
    </CmsLandingWrapper>
  );
};

export default Header;
