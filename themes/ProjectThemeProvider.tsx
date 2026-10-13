'use client';

import { useThemeStore } from '@/zustand/stores/useThemeStore';
import { GlobalStyles } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useMemo } from 'react';
import GlobalStyling from './_commonStyle';
import { MuiThemeOptions } from './_projectTheme';

const ProjectThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const mode = useThemeStore((state) => state.mode);
  const theme = useMemo(() => {
    return createTheme(MuiThemeOptions(mode));
  }, [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={() => GlobalStyling(theme)} />
      {children}
    </ThemeProvider>
  );
};

export default ProjectThemeProvider;
