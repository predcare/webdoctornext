'use client';
import Assets from '@/resources/assets';
/* eslint-disable @next/next/no-img-element -- landing images stay native img tags inside figure */

import { projectRoutes } from '@/routes';
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
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const NAV_LINKS = [
  { label: 'Home', id: 'home' },
  { label: 'About Us', id: 'about' },
  { label: 'Features', id: 'features' },
  { label: 'Pricing', id: 'pricing' },
  { label: 'Contact Us', id: 'contact' },
];

const HEADER_OFFSET = 88;

const getScroller = () =>
  document.scrollingElement || document.documentElement || document.body;

const scrollToSection = (sectionId: string) => {
  const scroller = getScroller();

  if (sectionId === 'home') {
    scroller.scrollTo({ top: 0, behavior: 'smooth' });
    return true;
  }

  const target = document.getElementById(sectionId);
  if (!target) {
    return false;
  }

  const top =
    target.getBoundingClientRect().top + scroller.scrollTop - HEADER_OFFSET;
  scroller.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  return true;
};

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openLoginMenu = Boolean(anchorEl);

  const handleLoginClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLoginClose = () => {
    setAnchorEl(null);
  };

  const goToDoctorLogin = () => {
    handleLoginClose();
    setMobileOpen(false);
    router.push(projectRoutes.doctorLogin);
  };

  const goToDoctorRegister = () => {
    setMobileOpen(false);
    router.push(projectRoutes.doctorRegister);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (sectionId: string) => {
    setMobileOpen(false);

    window.setTimeout(() => {
      const didScroll = scrollToSection(sectionId);
      if (didScroll) {
        return;
      }

      router.push(
        sectionId === 'home'
          ? projectRoutes.home
          : `${projectRoutes.home}#${sectionId}`,
      );
    }, 50);
  };

  const handleLogoError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src =
      'https://placehold.co/150x50/transparent/white?text=PRED+CARE';
  };

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

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (!hash) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      scrollToSection(hash);
    }, 120);

    return () => window.clearTimeout(timeoutId);
  }, [pathname]);

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
                  src={Assets.webLogo}
                  alt="PRED Care Logo"
                  onError={handleLogoError}
                />
              </figure>
            </button>

            <Stack className="desktop-nav" direction="row" component="nav">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.label}
                  className="nav-link"
                  type="button"
                  onClick={() => handleNavClick(link.id)}
                >
                  {link.label}
                </button>
              ))}
            </Stack>

            <Stack className="desktop-actions" direction="row">
              <Box>
                <Button
                  className="login-btn"
                  variant="contained"
                  type="button"
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
                    onClick={goToDoctorLogin}
                  >
                    <MedicalServicesOutlinedIcon />
                    Login as Doctor
                  </MenuItem>
                </Menu>
              </Box>

              <Button
                className="register-btn"
                variant="contained"
                type="button"
                onClick={goToDoctorRegister}
              >
                Register
              </Button>
            </Stack>

            <Box className="mobile-toggle">
              <IconButton
                className="menu-button"
                type="button"
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
            <img src={Assets.webLogo} alt="PRED Care Logo" />
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
            <button
              key={link.label}
              className="drawer-link"
              type="button"
              onClick={() => handleNavClick(link.id)}
            >
              {link.label}
            </button>
          ))}
        </Stack>

        <Box className="drawer-auth">
          <Typography className="drawer-kicker">AUTHENTICATION</Typography>

          <Button
            className="drawer-login"
            type="button"
            variant="outlined"
            startIcon={<MedicalServicesOutlinedIcon />}
            onClick={goToDoctorLogin}
          >
            Doctor Login
          </Button>

          <Button
            className="drawer-register"
            type="button"
            variant="contained"
            startIcon={<PersonAddOutlinedIcon />}
            onClick={goToDoctorRegister}
          >
            Register Clinic
          </Button>
        </Box>
      </Drawer>
    </CmsLandingWrapper>
  );
};

export default Header;
