import { create } from 'zustand';

const cameraStore = (set) => ({
  cameraTargetPoint: [0, 0, 0],
  cameraAnimate: false,
  animationDuration: 2,
  setCameraAnimate: ({ animate, point, duration }) => set({
    cameraAnimate: animate,
    cameraTargetPoint: point,
    animationDuration: duration,
  }),
});

const useCameraStore = create(cameraStore);

export default useCameraStore;