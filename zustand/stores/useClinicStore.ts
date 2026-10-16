import { IMyClinicsDoc } from '@/typescripts/interfaces/profile.interfaces';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type TClinicState = {
  clinics: IMyClinicsDoc[];
  activeClinic: string | null;
  isClinicsLoaded: boolean;
  setClinics: (clinics: IMyClinicsDoc[]) => void;
  setActiveClinic: (clinicId: string | null) => void;
  resetClinics: () => void;
};

export const useClinicStore = create<TClinicState>()(
  persist(
    (set) => ({
      clinics: [],
      activeClinic: null,
      isClinicsLoaded: false,
      setClinics: (clinics) =>
        set({
          clinics,
          isClinicsLoaded: true,
        }),
      setActiveClinic: (clinicId) => set({ activeClinic: clinicId }),
      resetClinics: () =>
        set({
          clinics: [],
          activeClinic: null,
          isClinicsLoaded: false,
        }),
    }),
    {
      name: 'predcare-doctor-clinic',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        activeClinic: state.activeClinic,
      }),
    },
  ),
);
