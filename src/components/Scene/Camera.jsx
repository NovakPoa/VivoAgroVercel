import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { gsap } from 'gsap';
import useCameraStore from '../../stores/CameraStore';
import * as THREE from 'three';

const ENABLE_DEBUG_CONTROLS = true;

const initialCameraPosition = [0, 1.7, 0];
const initialLookAt = [0, 0, -8];

const Camera = () => {
  const { camera, gl } = useThree();
  const { cameraTargetPoint, cameraAnimate, animationDuration, setCameraAnimate } = useCameraStore();
  const controlsRef = useRef();

  useEffect(() => {
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
    
  }, [camera]);

  useEffect(() => {
    if (cameraAnimate) {
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
      target={new THREE.Vector3(initialLookAt[0], initialLookAt[1], initialLookAt[2])}
    />
  );
};

export default Camera;