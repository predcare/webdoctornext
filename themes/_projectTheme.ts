import { PaletteMode } from '@mui/material';
import { alpha, ThemeOptions } from '@mui/material/styles';
import { defaultPalette } from './_colorPalette';

export const MuiThemeOptions = (mode: PaletteMode): ThemeOptions => {
  const palette = defaultPalette(mode);
  const isLight = mode === 'light';

  return {
    palette,
    spacing: 8,
    shape: {
      borderRadius: 8,
    },
    typography: {
      fontFamily: "var(--font-inter), 'Inter', sans-serif",

      h1: {
        fontFamily: "var(--font-inter), 'Inter', sans-serif",
        fontSize: '32px',
        fontWeight: 700,
        lineHeight: '40px',
        letterSpacing: '-0.02em',
        color: palette.customColors?.heading,
      },
      h2: {
        fontFamily: "var(--font-inter), 'Inter', sans-serif",
        fontSize: '24px',
        fontWeight: 600,
        lineHeight: '32px',
        color: palette.customColors?.heading,
      },
      h3: {
        fontFamily: "var(--font-inter), 'Inter', sans-serif",
        fontSize: '20px',
        fontWeight: 600,
        lineHeight: '28px',
        color: palette.customColors?.heading,
      },
      h4: {
        fontFamily: "var(--font-inter), 'Inter', sans-serif",
        fontSize: '18px',
        fontWeight: 600,
        lineHeight: '26px',
        color: palette.customColors?.heading,
      },
      body1: {
        fontFamily: "var(--font-inter), 'Inter', sans-serif",
        fontSize: '16px',
        fontWeight: 400,
        lineHeight: '24px',
        color: palette.text.primary,
      },
      body2: {
        fontFamily: "var(--font-inter), 'Inter', sans-serif",
        fontSize: '14px',
        fontWeight: 400,
        lineHeight: '20px',
        color: palette.text.secondary,
      },
      caption: {
        fontFamily: "var(--font-inter), 'Inter', sans-serif",
        fontSize: '12px',
        fontWeight: 500,
        lineHeight: '16px',
        color: palette.text.disabled,
      },
      button: {
        fontFamily: "var(--font-inter), 'Inter', sans-serif",
        fontSize: '14px',
        fontWeight: 600,
        lineHeight: '20px',
        textTransform: 'none',
      },

      // Custom PredCare portal typography variants
      topbarGreeting: {
        fontFamily: "var(--font-inter), 'Inter', sans-serif",
        fontSize: '19px',
        fontWeight: 700,
        lineHeight: '26px',
        color: palette.customColors?.heading,
      },
      metricValue: {
        fontFamily: "var(--font-inter), 'Inter', sans-serif",
        fontSize: '24px',
        fontWeight: 700,
        lineHeight: '30px',
        color: palette.customColors?.heading,
      },
      metricLabel: {
        fontFamily: "var(--font-inter), 'Inter', sans-serif",
        fontSize: '13px',
        fontWeight: 500,
        lineHeight: '18px',
        color: palette.text.secondary,
      },
    },

    components: {
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            borderRadius: '8px',
            padding: '8px 18px',
            fontWeight: 600,
            fontSize: '14px',
            textTransform: 'none',
            fontFamily: "var(--font-inter), 'Inter', sans-serif",
            transition: 'all 0.18s ease-in-out',
          },
        },
        variants: [
          {
            props: { variant: 'contained', color: 'primary' },
            style: ({ theme }) => ({
              backgroundColor: theme.palette.customColors.brandTeal,
              color: '#FFFFFF',
              border: 'none',
              '&:hover': {
                backgroundColor: theme.palette.customColors.brandTealDark,
              },
            }),
          },
          {
            props: { variant: 'contained', color: 'secondary' },
            style: ({ theme }) => ({
              backgroundColor: theme.palette.customColors.brandTealLight,
              color: theme.palette.customColors.brandTeal,
              border: 'none',
              '&:hover': {
                backgroundColor: alpha(
                  theme.palette.customColors.brandTeal,
                  0.16,
                ),
              },
            }),
          },
          {
            props: { variant: 'outlined', color: 'primary' },
            style: ({ theme }) => ({
              backgroundColor: 'transparent',
              border: `1px solid ${theme.palette.customColors.brandTeal}`,
              color: theme.palette.customColors.brandTeal,
              '&:hover': {
                backgroundColor: theme.palette.customColors.hoverBg,
                borderColor: theme.palette.customColors.brandTealDark,
              },
            }),
          },
          {
            props: { variant: 'text', color: 'primary' },
            style: ({ theme }) => ({
              backgroundColor: 'transparent',
              color: theme.palette.customColors.brandTeal,
              '&:hover': {
                backgroundColor: theme.palette.customColors.hoverBg,
              },
            }),
          },
        ],
      },
      MuiChip: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor: theme.palette.customColors.brandTealLight,
            color: theme.palette.customColors.brandTeal,
            fontWeight: 500,
            borderRadius: '6px',
            fontFamily: "var(--font-inter), 'Inter', sans-serif",
            fontSize: '12px',
            textTransform: 'none',
            padding: '2px 8px',
          }),
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: '8px',
            backgroundColor: theme.palette.customColors.inputBg,
            transition:
              'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
            color: theme.palette.text.primary,
            fontSize: '14px',
            '& fieldset': {
              borderColor: theme.palette.customColors.inputBorder,
              borderWidth: '1px',
            },
            '&:hover fieldset': {
              borderColor: theme.palette.customColors.brandTeal,
            },
            '&.Mui-focused': {
              '& fieldset': {
                borderColor: theme.palette.customColors.inputFocusBorder,
                borderWidth: '1px',
                boxShadow: `0 0 0 3px ${theme.palette.customColors.brandTealGlow}`,
              },
            },
          }),
        },
      },
      MuiCard: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor: theme.palette.customColors.cardBg,
            borderRadius: '12px',
            border: `1px solid ${theme.palette.customColors.cardBorder}`,
            backgroundImage: 'none',
            overflow: 'hidden',
            padding: '20px',
            boxShadow: isLight
              ? '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px 0 rgba(0, 0, 0, 0.02)'
              : 'none',
            transition:
              'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          }),
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderColor: theme.palette.customColors.border,
          }),
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderBottom: `1px solid ${theme.palette.customColors.border}`,
          }),
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: ({ theme }) => ({
            color: theme.palette.text.secondary,
            '&.Mui-checked': {
              color: theme.palette.customColors.brandTeal,
            },
            transition: 'color 0.15s ease',
          }),
        },
      },
      MuiRadio: {
        styleOverrides: {
          root: ({ theme }) => ({
            color: theme.palette.text.secondary,
            '&.Mui-checked': {
              color: theme.palette.customColors.brandTeal,
            },
            transition: 'color 0.15s ease',
          }),
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: ({ theme }) => ({
            borderRadius: '8px',
            border: `1px solid ${theme.palette.customColors.cardBorder}`,
            backgroundColor: theme.palette.customColors.cardBg,
            boxShadow: isLight
              ? '0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)'
              : '0 10px 25px -5px rgba(0, 0, 0, 0.4)',
          }),
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
    },
  };
};
