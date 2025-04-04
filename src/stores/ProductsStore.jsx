import { create } from 'zustand';

const productsStore = (set) => ({
  startProduct: false,
  currentProduct: 'agro-cobertura',
  lastProductName: '',
  productsOrder: ['agro-cobertura', 'gestao-maquinario', 'gestao-pecuaria', 'clima-inteligente'],
  productsStatus: {
    'agro-cobertura': 'completed',
    'gestao-maquinario': 'unlocked',
    'gestao-pecuaria': 'locked',
    'clima-inteligente': 'locked',
  },
  showFirstInstruction: false,
  showFirstInteraction: false,
  showSecondInstruction: false,
  showSecondInteraction: false,
  setStartProduct: (start) => set({ startProduct: start }),
  setCurrentProduct: (name) => set({ currentProduct: name }),
  setLastProductName: (name) => set({ lastProductName: name }),
  setProductStatus: (name, status) => set((state) => ({
    productsStatus: {
      ...state.productsStatus,
      [name]: status,
    },
  })),
  setShowFirstInstruction: (show) => set({ showFirstInstruction: show }),
  setShowSecondInstruction: (show) => set({ showSecondInstruction: show }),
  setShowFirstInteraction: (show) => set({ showFirstInteraction: show }),
  setShowSecondInteraction: (show) => set({ showSecondInteraction: show }),  
});

const useProductsStore = create(productsStore);

export default useProductsStore;