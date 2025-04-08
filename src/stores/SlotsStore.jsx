import { create } from 'zustand';

const slotsStore = (set) => ({
  selectedIndex: -1,
  setSelectedIndex: (idx) => set({ selectedIndex: idx }),
  showSlots: false,
  setShowSlots: (val) => set({ showSlots: val }),  
  slotsLength: 3,
  setSlotsLength: (val) => set({ slotsLength: val }),    
});

const useSlotsStore = create(slotsStore);

export default useSlotsStore;