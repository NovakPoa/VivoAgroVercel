import { create } from 'zustand';

const introStore = (set) => ({
  introObjectVisible: false,
  introObjectAnimate: false,
  setIntroObjectAnimate: (animate) => set({ introObjectAnimate: animate }),
  setIntroObjectVisible: (visible) => set({ introObjectVisible: visible }),
});

const useIntroStore = create(introStore);

export default useIntroStore;