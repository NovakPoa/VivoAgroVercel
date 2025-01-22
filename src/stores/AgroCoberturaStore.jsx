import { create } from 'zustand';

const agroCoberturaStore = (set) => ({
  startAgroCobertura: false,
  agroCoberturaAnimate: false,
  setStartAgroCobertura: (start) => set({ startAgroCobertura: start }),
  setAgroCoberturaAnimate: (animate) => set({ agroCoberturaAnimate: animate }),
});

const useAgroCoberturaStore = create(agroCoberturaStore);

export default useAgroCoberturaStore;