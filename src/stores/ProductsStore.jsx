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
  
  setStartProduct: (start) => set({ startProduct: start }),
  setCurrentProduct: (name) => set({ currentProduct: name }),
  setLastProductName: (name) => set({ lastProductName: name }),
  setProductStatus: (name, status) => set((state) => ({
    productsStatus: {
      ...state.productsStatus,
      [name]: status,
    },
  })),
});

const useProductsStore = create(productsStore);

export default useProductsStore;