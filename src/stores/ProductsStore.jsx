import { create } from 'zustand';

const productsStore = (set) => ({
  startProduct: false,
  currentProduct: 'agro-cobertura',
  setStartProduct: (start) => set({ startProduct: start }),
  setCurrentProduct: (name) => set({ currentProduct: name }),
});

const useProductsStore = create(productsStore);

export default useProductsStore;