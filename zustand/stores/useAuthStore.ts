import { clearAuthToken } from '@/lib/commons/authToken';
import { IMyProfileDoc } from '@/typescripts/interfaces/profile.interfaces';
import { useEffect, useState } from 'react';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type TAuthState = {
  userData: IMyProfileDoc | null;
  isLoggedIn: boolean;
  isDoctor?: boolean;
  setUserData: (user: IMyProfileDoc | null) => void;
  logout: () => Promise<void>;
};

export const useAuthStore = create<TAuthState>()(
  persist(
    (set) => ({
      userData: null,
      isLoggedIn: false,
      isDoctor: false,
      setUserData: (user: IMyProfileDoc | null) => {
        if (!user) {
          set({
            userData: null,
            isLoggedIn: false,
            isDoctor: false,
          });
          return;
        }
        set({
          userData: user,
          isLoggedIn: true,
          isDoctor: user?.role === 'doctor',
        });
      },

      logout: async () => {
        clearAuthToken();
        set({
          userData: null,
          isLoggedIn: false,
          isDoctor: false,
        });
      },
    }),
    {
      name: 'predcare-doctor-auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        userData: state.userData,
        isLoggedIn: state.isLoggedIn,
        isDoctor: state.isDoctor,
      }),
    },
  ),
);

export const useAuthStoreHydration = () => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const unsub = useAuthStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });
    setHydrated(useAuthStore.persist.hasHydrated());
    return () => {
      unsub();
    };
  }, []);

  return hydrated;
};
