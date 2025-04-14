import { useEffect, useRef, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';
import { PerspectiveCamera, CameraControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import useCameraStore from '../../stores/CameraStore';

const INITIAL_CAMERA_POSITION = [0, 1.7, 0];
const INITIAL_ROTATION = [0, -90, 0];
const ENABLE_DEBUG_CONTROLS = false;

const BASE_FOV = 65;
const REFERENCE_ASPECT = 16/9;
const FOV_ADJUSTMENT_FACTOR = 0.5; 
const MIN_FOV = 45;
const MAX_FOV = 80;

const Camera = () => {
  const isAnimating = useRef(false);
  const cameraRef = useRef();
  const controlsRef = useRef();
  
  const { size} = useThree();
  
  const cameraAnimate = useCameraStore(state => state.cameraAnimate);
  const cameraTargetPoint = useCameraStore(state => state.cameraTargetPoint);
  const animationDuration = useCameraStore(state => state.animationDuration);
  const finishAnimation = useCameraStore(state => state.finishAnimation);  
  const resetCamera = useCameraStore(state => state.resetCamera);
  
  const aspectRatio = size.width / size.height;
  //const isPortrait = aspectRatio < 1;
  
  const adjustedFOV = useMemo(() => {
    const aspectDifference = REFERENCE_ASPECT / aspectRatio;
    const calculatedFOV = BASE_FOV * (1 + (aspectDifference - 1) * FOV_ADJUSTMENT_FACTOR);

    return Math.min(Math.max(calculatedFOV, MIN_FOV), MAX_FOV);
  }, [aspectRatio, BASE_FOV]);
  
  // Debug: mostrar valores atualizados
/*   useEffect(() => {
    console.log(`Aspect ratio: ${aspectRatio}, FOV: ${adjustedFOV}`);
  }, [aspectRatio, adjustedFOV]); */


  const rotationInRadians = [
    INITIAL_ROTATION[0] * Math.PI / 180,
    INITIAL_ROTATION[1] * Math.PI / 180,
    INITIAL_ROTATION[2] * Math.PI / 180
  ];

  // Reset da câmera
  useEffect(() => {
    if (!cameraRef.current || !resetCamera) return;
    
    const camera = cameraRef.current;
    
    if (isAnimating.current) {
      gsap.killTweensOf(camera.rotation);
      isAnimating.current = false;
    }
    
    camera.rotation.set(...rotationInRadians);
    camera.updateProjectionMatrix();
    
  }, [resetCamera, rotationInRadians]);

  const animateCamera = useCallback((targetPoint) => {
    if (!cameraRef.current || isAnimating.current) return;
    
    const camera = cameraRef.current;
    isAnimating.current = true;
    
    const targetRotation = {
      x: targetPoint[0],
      y: targetPoint[1],
      z: targetPoint[2]
    };
    
    const currentRotation = {
      x: camera.rotation.x * 180 / Math.PI,
      y: camera.rotation.y * 180 / Math.PI,
      z: camera.rotation.z * 180 / Math.PI
    };

    gsap.to(currentRotation, {
      duration: animationDuration,
      x: targetRotation.x,
      y: targetRotation.y,
      z: targetRotation.z,
      onUpdate: () => {
        camera.rotation.set(
          currentRotation.x * Math.PI / 180,
          currentRotation.y * Math.PI / 180,
          currentRotation.z * Math.PI / 180
        );
        camera.updateProjectionMatrix();
      },
      onComplete: () => {
        camera.rotation.set(
          targetRotation.x * Math.PI / 180,
          targetRotation.y * Math.PI / 180,
          targetRotation.z * Math.PI / 180
        );
        camera.updateProjectionMatrix();
        
        isAnimating.current = false;
        finishAnimation();
      },
      ease: "power2.inOut"
    });
  }, [animationDuration, finishAnimation]);

  useEffect(() => {
    if (cameraAnimate && cameraRef.current) {
      animateCamera(cameraTargetPoint);
    }
  }, [cameraAnimate, cameraTargetPoint, animateCamera]);

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        fov={adjustedFOV}
        position={INITIAL_CAMERA_POSITION}
        rotation={rotationInRadians}
        near={0.1}
        far={1000}
      />

      {ENABLE_DEBUG_CONTROLS && (
        <CameraControls 
          ref={controlsRef}
          makeDefault
          enabled={ENABLE_DEBUG_CONTROLS}
          mouseButtons={{
            left: 1,
            right: 2 | 64,
            wheel: 8
          }}
        />
      )}
    </>
  );
};

export default Camera;