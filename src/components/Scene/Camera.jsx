import { useEffect, useRef } from 'react';
import { CameraControls } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber'; 
import useCameraStore from '../../stores/CameraStore';

const CAMERA_POSITION = [0, 1.7, 0];
const INITIAL_TARGET = [10, 1.7, 0];

const Camera = () => {
  const controlsRef = useRef();
  const isAnimating = useRef(false);
  const { camera } = useThree();

  // Obtendo estados do CameraStore para animação
  const cameraAnimate = useCameraStore(state => state.cameraAnimate);
  const currentTarget = useCameraStore(state => state.currentTarget);
  const animationDuration = useCameraStore(state => state.animationDuration);
  const finishAnimation = useCameraStore(state => state.finishAnimation);
  const resetCamera = useCameraStore(state => state.resetCamera);

  // Define posiçoes iniciais
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.setLookAt(
        CAMERA_POSITION[0], 
        CAMERA_POSITION[1], 
        CAMERA_POSITION[2],
        INITIAL_TARGET[0], 
        INITIAL_TARGET[1], 
        INITIAL_TARGET[2], 
        false 
      );

      controlsRef.current.mouseButtons.wheel = 0;
      controlsRef.current.mouseButtons.middle = 0;
      controlsRef.current.mouseButtons.left = 0;
      controlsRef.current.mouseButtons.right = 0;
      controlsRef.current.touches.one = 0;
      controlsRef.current.touches.two = 0;
      controlsRef.current.touches.three = 0;

      controlsRef.current.update(0);
    }
  }, [camera]);

  useEffect(() => {
    if (controlsRef.current && cameraAnimate) {
      
      isAnimating.current = true;

      controlsRef.current.setLookAt(
        CAMERA_POSITION[0], 
        CAMERA_POSITION[1], 
        CAMERA_POSITION[2],
        currentTarget[0], 
        currentTarget[1], 
        currentTarget[2], 
        true, 
        {
          duration: animationDuration,
          onComplete: () => {
            console.log("Animação de câmera concluída");
            finishAnimation();
          }
        }
      );
    }
  }, [cameraAnimate, currentTarget, animationDuration, finishAnimation]);
    
  useFrame((state, delta) => {
    if (controlsRef.current) {
      controlsRef.current.update(delta);
      
      // Opcional: logging para debug
      if (isAnimating.current && delta > 0) {
        console.log("Atualizando animação, delta:", delta);
      }
    }
  });

  return (
    <CameraControls 
      ref={controlsRef}
      makeDefault
      camera={camera}
      enabled={false}
    />
  );
};

export default Camera;