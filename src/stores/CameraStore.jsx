import { create } from 'zustand';

const cameraStore = (set, get) => ({
  cameraTargetPoint: [0, 0, 0],
  cameraAnimate: false,
  animationDuration: 2,
  fov: 80,
  productRotations: {},
  
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
  
  setFov: (newFov) => set({
    fov: newFov,
  }),  
});

const useCameraStore = create(cameraStore);

export default useCameraStore;