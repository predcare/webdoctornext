import { PaletteMode, PaletteOptions } from '@mui/material';

type TCustomPalette = PaletteOptions & {
  text: {
    primary: string;
    secondary: string;
    disabled: string;
  };
};

export const defaultPalette = (mode: PaletteMode): TCustomPalette => {
  const isLight = mode === 'light';
  const lightVals = {
    brandTeal: '#0F7C73',
    brandTealDark: '#0B645D',
    brandTealLight: 'rgba(15, 124, 115, 0.1)',
    brandTealGlow: 'rgba(15, 124, 115, 0.2)',
    accent: '#0F7C73',

    pageBg: '#F5F6F8',
    headerBg: '#FFFFFF',
    sidebarBg: '#FFFFFF',
    sidebarActiveBg: 'rgba(15, 124, 115, 0.08)',
    sidebarActiveText: '#0F7C73',
    cardBg: '#FFFFFF',

    heading: '#0A1B39',
    textPrimary: '#0F172A',
    textSecondary: '#475569',
    textMuted: '#858D9C',

    border: '#E7E8EB',
    cardBorder: '#E2E8F0',

    inputBg: '#FFFFFF',
    inputBorder: '#E2E8F0',
    inputFocusBorder: '#0F7C73',

    success: '#10B981',
    successBg: 'rgba(16, 185, 129, 0.1)',
    warning: '#F59E0B',
    warningBg: 'rgba(245, 158, 11, 0.1)',
    error: '#EF4444',
    errorBg: 'rgba(239, 68, 68, 0.1)',
    info: '#0EA5E9',
    infoBg: 'rgba(14, 165, 233, 0.1)',

    hoverBg: 'rgba(15, 124, 115, 0.04)',
    scrollbarThumb: '#CBD5E1',
  };

  // 🌙 PredCare Doctor Dark Theme Color Tokens (predcare-dark-text.css parity)
  const darkVals = {
    brandTeal: '#0F7C73',
    brandTealDark: '#0B645D',
    brandTealLight: 'rgba(45, 212, 191, 0.15)',
    brandTealGlow: 'rgba(45, 212, 191, 0.25)',
    accent: '#2DD4BF',

    pageBg: '#0B1224',
    headerBg: '#0B1224',
    sidebarBg: '#070C1C',
    sidebarActiveBg: 'rgba(45, 212, 191, 0.12)',
    sidebarActiveText: '#2DD4BF',
    cardBg: '#111A35',

    heading: '#F1F5F9',
    textPrimary: '#F1F5F9',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',

    border: '#334155',
    cardBorder: '#1E293B',

    inputBg: '#0B1224',
    inputBorder: '#334155',
    inputFocusBorder: '#2DD4BF',

    success: '#34D399',
    successBg: 'rgba(52, 211, 153, 0.15)',
    warning: '#FBBF24',
    warningBg: 'rgba(251, 191, 36, 0.15)',
    error: '#F87171',
    errorBg: 'rgba(248, 113, 113, 0.15)',
    info: '#38BDF8',
    infoBg: 'rgba(56, 189, 248, 0.15)',

    hoverBg: 'rgba(255, 255, 255, 0.04)',
    scrollbarThumb: '#334155',
  };

  const v = isLight ? lightVals : darkVals;

  return {
    mode,

    primary: {
      main: v.brandTeal,
      light: v.brandTealLight,
      dark: v.brandTealDark,
      contrastText: '#FFFFFF',
    },

    secondary: {
      main: isLight ? '#475569' : '#94A3B8',
      light: isLight ? '#64748B' : '#CBD5E1',
      dark: isLight ? '#334155' : '#64748B',
      contrastText: '#FFFFFF',
    },

    success: {
      main: v.success,
      contrastText: '#FFFFFF',
    },

    warning: {
      main: v.warning,
      contrastText: '#FFFFFF',
    },

    error: {
      main: v.error,
      contrastText: '#FFFFFF',
    },

    info: {
      main: v.info,
      contrastText: '#FFFFFF',
    },

    background: {
      default: v.pageBg,
      paper: v.cardBg,
    },

    text: {
      primary: v.textPrimary,
      secondary: v.textSecondary,
      disabled: v.textMuted,
    },

    divider: v.border,

    action: {
      hover: v.hoverBg,
      selected: v.sidebarActiveBg,
      focus: v.brandTealLight,
      disabled: v.textMuted,
      disabledBackground: isLight
        ? 'rgba(0, 0, 0, 0.06)'
        : 'rgba(255, 255, 255, 0.08)',
    },

    customColors: {
      ...v,
    },
  };
};
