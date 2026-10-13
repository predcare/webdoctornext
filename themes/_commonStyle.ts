import { Theme } from '@mui/material/styles';

const GlobalStyling = (theme: Theme) => ({
  html: {
    height: '100%',
  },

  body: {
    backgroundColor: theme.palette.customColors.pageBg,
    color: theme.palette.customColors.textPrimary,
    fontFamily: "var(--font-inter), 'Inter', sans-serif",
    margin: 0,
    padding: 0,
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  },

  '.main_body': {
    minHeight: '100vh',
    background: theme.palette.customColors.pageBg,
  },

  p: {
    margin: 0,
    color: theme.palette.customColors.textSecondary,
  },

  a: {
    textDecoration: 'none',
    color: theme.palette.customColors.brandTeal,
    transition: 'all 0.2s ease',

    '&:hover': {
      color: theme.palette.customColors.brandTealDark,
    },
  },

  img: {
    maxWidth: '100%',
    height: 'auto',
    display: 'block',
  },

  ul: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
  },

  '.main-wrapper': {
    width: '100%',
    minHeight: '100vh',
  },

  '.page-wrapper': {
    minHeight: 'calc(100vh - 64px)',
    padding: '24px',
    backgroundColor: theme.palette.customColors.pageBg,
    transition: 'all 0.2s ease-in-out',
  },

  '.metric-card': {
    borderRadius: '16px',
    border: `1px solid ${theme.palette.customColors.cardBorder}`,
    backgroundColor: theme.palette.customColors.cardBg,
    padding: '20px',
  },

  /* ===== 🔥 HIDE SCROLLBAR (WHERE NEEDED) ===== */
  '.no-scrollbar': {
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },

  /* ===== 🔘 PredCare Border Radius Utilities ===== */
  '.rounded-xs': {
    borderRadius: '4px',
  },

  '.rounded-sm': {
    borderRadius: '6px',
  },

  '.rounded-md': {
    borderRadius: '8px',
  },

  '.rounded-lg': {
    borderRadius: '12px',
  },

  '.rounded-xl': {
    borderRadius: '16px',
  },

  /* ===== ✍️ Selection ===== */
  '::selection': {
    background: theme.palette.customColors.brandTeal,
    color: '#FFFFFF',
  },
});

export default GlobalStyling;
