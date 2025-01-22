import { create } from 'zustand';

const cameraStore = (set) => ({
  cameraTargetPoint: [0, 0, 0],
  cameraAnimate: false,
  cameraAnimationDuration: 2,
  setCameraTarget: ({ point, duration }) => set({
    cameraTargetPoint: point,
    cameraAnimationDuration: duration,
  }),
  setCameraAnimate: (animate) => set({ cameraAnimate: animate }),
});

const useCameraStore = create(cameraStore);

export default useCameraStore;