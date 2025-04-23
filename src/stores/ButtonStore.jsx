import { create } from 'zustand';

const buttonStore = (set) => ({
  isAnyButtonClicked: false,
  
  setButtonClicked: (value) => set({ isAnyButtonClicked: value }),
  
  clickButton: () => {
    set({ isAnyButtonClicked: true });
    setTimeout(() => {
      set({ isAnyButtonClicked: false });
    }, 500);
  },
  
  resetButtonState: () => set({ isAnyButtonClicked: false })
});

const useButtonStore = create(buttonStore);

export default useButtonStore;