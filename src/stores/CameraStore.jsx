import { create } from 'zustand';

const cameraStore = (set, get) => ({
  cameraTargetPoint: [0, 0, 0],
  cameraAnimate: false,
  animationDuration: 2,
  productRotations: {},
  resetCamera: false,
  
  registerProductRotation: (productId, rotation) => set(state => ({
    productRotations: {
      ...state.productRotations,
      [productId]: rotation
    }
  })),
  
  animateToProduct: (productId, duration = 2) => {
    const rotation = get().productRotations[productId];
    if (rotation) {
      set({
        cameraAnimate: true,
        cameraTargetPoint: rotation,
        animationDuration: duration
      });
    }
  },
  
  finishAnimation: () => set({
    cameraAnimate: false
  }),
  
  resetCameraPosition: () => {
    set({ resetCamera: true });
    
    setTimeout(() => {
      set({ resetCamera: false });
    }, 100);
  },

});

const useCameraStore = create(cameraStore);

export default useCameraStore;