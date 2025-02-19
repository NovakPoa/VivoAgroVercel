import { create } from 'zustand';

const interactionStore = (set) => ({
  currentInteraction: null,
  setInteraction: (interaction) => set({ currentInteraction: interaction }),
  clearInteraction: () => set({ currentInteraction: null }),
});

const useInteractionStore = create(interactionStore);

export default useInteractionStore;