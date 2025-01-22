import { create } from 'zustand';

const cameraStore = (set) => ({
  cameraTargetPoint: [0, 0, 0],
  cameraAnimate: false,
  setCameraAnimate: ({animate, point}) => set({
    cameraTargetPoint: point,
    cameraAnimate: animate,
  }),
});

const useCameraStore = create(cameraStore);

export default useCameraStore;