import { create } from 'zustand';

const cameraStore = (set) => ({
  cameraTargetPoint: [0, 0, 0],
  cameraAnimate: false,
  animationDuration: 2,
  fov: 90,
  setCameraAnimate: ({ animate, point, duration }) => set({
    cameraAnimate: animate,
    cameraTargetPoint: point,
    animationDuration: duration,
  }),
  setFov: (newFov) => set({
    fov: newFov,
  }),  
});

const useCameraStore = create(cameraStore);

export default useCameraStore;