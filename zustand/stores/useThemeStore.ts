import { PaletteMode } from '@mui/material';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type TThemeState = {
  mode: PaletteMode;
  toggleMode: () => void;
  setMode: (mode: PaletteMode) => void;
};

export const useThemeStore = create<TThemeState>()(
  persist(
    (set, get) => ({
      mode: 'light',
      toggleMode: () => {
        const current = get().mode;
        set({ mode: current === 'light' ? 'dark' : 'light' });
      },

      setMode: (mode: PaletteMode) => set({ mode }),
    }),
    {
      name: 'vaani-theme',
    },
  ),
);
