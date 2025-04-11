import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { gsap } from 'gsap';
import { OrbitControls } from '@react-three/drei';
import useCameraStore from '../../stores/CameraStore';

const INITIAL_CAMERA_POSITION = [0, 1.7, 0];
const INITIAL_ROTATION = [0, -90, 0];

/////////////
const ENABLE_DEBUG_CONTROLS = true;
/////////////

const Camera = () => {
  const { camera, gl } = useThree();
  const { cameraTargetPoint, cameraAnimate, animationDuration, fov, finishAnimation } = useCameraStore();
  const isAnimating = useRef(false);
  const controlsRef = useRef();

  useEffect(() => {
    camera.fov = fov;

    camera.position.set(
      INITIAL_CAMERA_POSITION[0],
      INITIAL_CAMERA_POSITION[1],
      INITIAL_CAMERA_POSITION[2]
    );
    
    camera.rotation.set(
      INITIAL_ROTATION[0] * Math.PI / 180,
      INITIAL_ROTATION[1] * Math.PI / 180,
      INITIAL_ROTATION[2] * Math.PI / 180
    );

    camera.updateProjectionMatrix();

  }, [camera, fov]);

  useEffect(() => {
    if (cameraAnimate && !isAnimating.current) {
      isAnimating.current = true;
      
      const targetRotation = {
        x: cameraTargetPoint[0],
        y: cameraTargetPoint[1],
        z: cameraTargetPoint[2]
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
          
        }
      });
    }
  }, [cameraAnimate, cameraTargetPoint, animationDuration, camera]);

  return ENABLE_DEBUG_CONTROLS ? (
    <OrbitControls 
      ref={controlsRef}
      args={[camera, gl.domElement]}
      enableDamping={true}
      enablePan={ENABLE_DEBUG_CONTROLS}
      enableRotate={ENABLE_DEBUG_CONTROLS}
      enableZoom={ENABLE_DEBUG_CONTROLS}
    />
  ) : null;
};

export default Camera;