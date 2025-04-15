import { create } from 'zustand';

const introStore = (set) => ({
  introVisibility: false,
  introNeonVisibility: false,
  startIntro: false,
  setStartIntro: (animate) => set({ startIntro: animate }),
  setIntroVisibility: (visible) => set({ introVisibility: visible }),
  setIntroNeonVisibility: (value) => set({ introNeonVisibility: value }),
});

const useIntroStore = create(introStore);

export default useIntroStore;