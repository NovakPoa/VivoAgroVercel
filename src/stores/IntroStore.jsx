import { create } from 'zustand';

const introStore = (set) => ({
  introVisibility: false,
  startIntro: false,
  setStartIntro: (animate) => set({ startIntro: animate }),
  setIntroVisibility: (visible) => set({ introVisibility: visible }),
});

const useIntroStore = create(introStore);

export default useIntroStore;