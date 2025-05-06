import { create } from 'zustand';

const endStore = (set) => ({
  showEndCard: false,
  setShowEndCard: (show) => set({ showEndCard: show }),
});

const useEndStore = create(endStore);

export default useEndStore;