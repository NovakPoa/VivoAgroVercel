import { create } from 'zustand';

const introStore = (set) => ({
  introLogoVisibility: false,
  introNeonVisibility: false,
  setIntroLogoVisibility: (visible) => set({ introLogoVisibility: visible }),
  setIntroNeonVisibility: (visible) => set({ introNeonVisibility: visible }),
});

const useIntroStore = create(introStore);

export default useIntroStore;