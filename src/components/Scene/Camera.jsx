import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { gsap } from 'gsap';
import useCameraStore from '../../stores/CameraStore';

const ENABLE_DEBUG_CONTROLS = true;

const initialCameraPosition = [0, 1.7, 0];
const initialLookAt = [8, 0, 0];

const Camera = () => {
  const { camera, gl } = useThree();
  const { cameraTargetPoint, cameraAnimate, animationDuration, setCameraAnimate, fov } = useCameraStore();
  const controlsRef = useRef();

  useEffect(() => {
    camera.fov = fov;

    camera.position.set(
      initialCameraPosition[0],
      initialCameraPosition[1],
      initialCameraPosition[2]
    );
    camera.lookAt(
      initialLookAt[0],
      initialLookAt[1],
      initialLookAt[2]
    );

    camera.updateProjectionMatrix();

    if (controlsRef.current) {
      controlsRef.current.target.set(
        initialLookAt[0],
        initialLookAt[1],
        initialLookAt[2]
      );
      controlsRef.current.update();
    }
  }, [camera]);

  useEffect(() => {
    if (cameraAnimate) {
      const target = { x: cameraTargetPoint[0], y: cameraTargetPoint[1], z: cameraTargetPoint[2] };

      gsap.to(controlsRef.current.target, {
        duration: animationDuration,
        x: target.x,
        y: target.y,
        z: target.z,
        onUpdate: () => {
          controlsRef.current.update();
        },
        onComplete: () => {
          setCameraAnimate({ animate: false, point: cameraTargetPoint, duration: animationDuration });
        },
      }); 
    }
  }, [cameraAnimate]);

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