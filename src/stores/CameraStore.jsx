import { create } from 'zustand';

const cameraStore = (set, get) => ({
  currentTarget: [0, 0, 0],

  // Controle de animação
  cameraAnimate: false,
  animationDuration: 2,

  // Armazenar targets por produto
  productTargets: {},
  resetCamera: false,

  isFreeLookMode: false, // Govak - Tiramos para não ter free look
  setFreeLookMode: (isEnabled) => set({ isFreeLookMode: isEnabled }),

  // Registrar target para um produto
  registerProductTarget: (productId, target) => set(state => ({
    productTargets: {
      ...state.productTargets,
      [productId]: target
    }
  })),

  // Animar câmera para olhar para o target do produto
  animateToProduct: (productId, duration = 2) => {
    const target = get().productTargets[productId];
    if (target) {
      set({
        cameraAnimate: true,
        currentTarget: target,
        animationDuration: duration
      });
    }
  },

  // Animar câmera para um target específico
  animateToTarget: (target, duration = 2) => {
    set({
      isFollowingTarget: false,
      cameraAnimate: true,
      currentTarget: target,
      animationDuration: duration
    });
  },

  finishAnimation: () => set({
    cameraAnimate: false
  }),

  isFollowingTarget: false,

  setCurrentTarget: (target) => set({
    currentTarget: target,
  }),

  startFollowingTarget: () => set({
    isFollowingTarget: true
  }),

  stopFollowingTarget: () => set({
    isFollowingTarget: false
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