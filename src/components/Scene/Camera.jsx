import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { gsap } from 'gsap';
import useCameraStore from '../../stores/CameraStore';

const ENABLE_DEBUG_CONTROLS = true;

const Camera = () => {
  const { camera, gl } = useThree();
  const { cameraTargetPoint, cameraAnimate, animationDuration, setCameraAnimate } = useCameraStore();
  const controlsRef = useRef();

  useEffect(() => {
    if (cameraAnimate && !ENABLE_DEBUG_CONTROLS) {
      const target = { x: cameraTargetPoint[0], y: cameraTargetPoint[1], z: cameraTargetPoint[2] };

      const onComplete = () => {
        setCameraAnimate({ animate: false, point: cameraTargetPoint });
      };

      gsap.to(controlsRef.current.target, {
        duration: animationDuration,
        x: target.x,
        y: target.y,
        z: target.z,
        onUpdate: () => {
          controlsRef.current.update();
        },
        onComplete: onComplete,
      });
    }
  }, [cameraAnimate, cameraTargetPoint, setCameraAnimate, animationDuration]);

  return (
    <OrbitControls 
      ref={controlsRef} 
      args={[camera, gl.domElement]} 
      enablePan={ENABLE_DEBUG_CONTROLS}
      enableRotate={ENABLE_DEBUG_CONTROLS}
      enableZoom={ENABLE_DEBUG_CONTROLS}
    />
  );
};

export default Camera;