import { create } from 'zustand';

const introStore = (set) => ({
  introObjectVisible: true,
  introObjectAnimate: false,
  setIntroObjectAnimate: (animate) => set({ introObjectAnimate: animate }),
  setIntroObjectVisible: (visible) => set({ introObjectVisible: visible }),
});

const useIntroStore = create(introStore);

export default useIntroStore;