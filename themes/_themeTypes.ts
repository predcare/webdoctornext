import '@mui/material/styles';
import '@mui/material/Typography';
import React from 'react';

declare module '@mui/material/styles' {
  interface ICustomColors {
    // 🏥 PredCare Primary Brand (Teal)
    brandTeal: string;
    brandTealDark: string;
    brandTealLight: string;
    brandTealGlow: string;
    accent: string;

    // 🖥️ Shell Layout Backgrounds
    pageBg: string;
    headerBg: string;
    sidebarBg: string;
    sidebarActiveBg: string;
    sidebarActiveText: string;
    cardBg: string;

    // 📝 Typography Colors
    heading: string;
    textPrimary: string;
    textSecondary: string;
    textMuted: string;

    // 🔲 Borders & Dividers
    border: string;
    cardBorder: string;

    // ✍️ Form Controls
    inputBg: string;
    inputBorder: string;
    inputFocusBorder: string;

    // 🚦 Status & Feedback
    success: string;
    successBg: string;
    warning: string;
    warningBg: string;
    error: string;
    errorBg: string;
    info: string;
    infoBg: string;

    // 💡 Surface & Overlays
    hoverBg: string;
    scrollbarThumb: string;
  }

  interface Palette {
    customColors: ICustomColors;
  }

  interface PaletteOptions {
    customColors?: Partial<ICustomColors>;
  }

  // ✍️ Custom Typography Variants
  interface TypographyVariants {
    topbarGreeting: React.CSSProperties;
    metricValue: React.CSSProperties;
    metricLabel: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    topbarGreeting?: React.CSSProperties;
    metricValue?: React.CSSProperties;
    metricLabel?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    topbarGreeting: true;
    metricValue: true;
    metricLabel: true;
  }
}
