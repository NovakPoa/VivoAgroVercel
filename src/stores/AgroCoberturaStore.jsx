import { create } from 'zustand';

const agroCoberturaStore = (set) => ({
  agroCoberturaObjectVisible: false,
  agroCoberturaObjectAnimate: false,
  setAgroCoberturaObjectAnimate: (animate) => set({ agroCoberturaObjectVisible: animate }),
  setAgroCoberturaObjectVisible: (visible) => set({ agroCoberturaObjectAnimate: visible }),
});

const useAgroCoberturaStore = create(agroCoberturaStore);

export default useAgroCoberturaStore;