import { useEffect, useRef, useMemo } from 'react';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import useCameraStore from '../../stores/CameraStore';

const CAMERA_POSITION = [0, 1.7, 0];

const BASE_FOV = 60;
const REFERENCE_ASPECT = 16/9;
const FOV_ADJUSTMENT_FACTOR = 0.4; 
const MIN_FOV = 50;
const MAX_FOV = 70;

const Camera = () => {
  const controlsRef = useRef();
  const cameraRef = useRef();
  const gsapAnimationRef = useRef(null);
  const { camera } = useThree();
  const { size} = useThree();

  // Obtendo estados do CameraStore para animação
  const cameraAnimate = useCameraStore(state => state.cameraAnimate);
  const currentTarget = useCameraStore(state => state.currentTarget);
  const animationDuration = useCameraStore(state => state.animationDuration);
  const finishAnimation = useCameraStore(state => state.finishAnimation);
  const resetCamera = useCameraStore(state => state.resetCamera);
  const isFreeLookMode = useCameraStore(state => state.isFreeLookMode);
  
  const aspectRatio = size.width / size.height;

  const adjustedFOV = useMemo(() => {
  
    const aspectDifference = aspectRatio / REFERENCE_ASPECT;
    let calculatedFOV;
  
    if (aspectDifference < 1) {
      // Tela mais estreita/alta (mobile) - aumentar FOV
      calculatedFOV = BASE_FOV + (10 * (1 - aspectDifference));
    } else {
      // Tela mais larga - reduzir FOV levemente
      calculatedFOV = BASE_FOV - (5 * (aspectDifference - 1));
    }
    console.log(Math.min(Math.max(calculatedFOV, MIN_FOV), MAX_FOV))
    // Limitar entre MIN_FOV e MAX_FOV
    return Math.min(Math.max(calculatedFOV, MIN_FOV), MAX_FOV);
  }, [aspectRatio, BASE_FOV]);

  // Configurar posição inicial da câmera
  useEffect(() => {
    if (controlsRef.current) {
      camera.position.set(CAMERA_POSITION[0], CAMERA_POSITION[1], CAMERA_POSITION[2]);
      
      controlsRef.current.target.set(
        CAMERA_POSITION[0] + 0.1,
        CAMERA_POSITION[1] + 0.006, 
        CAMERA_POSITION[2]
      );
      
      controlsRef.current.enableZoom = false;
      controlsRef.current.enablePan = false;
      controlsRef.current.enableDamping = true;
      controlsRef.current.dampingFactor = 0.1;
      controlsRef.current.rotateSpeed = 0.25;
      
      controlsRef.current.update();
    }
  }, [camera]);

  useEffect(() => {
    if (controlsRef.current) { 
      if (isFreeLookMode) {
        controlsRef.current.minDistance = 0.1;
        controlsRef.current.maxDistance = 0.1;
        controlsRef.current.enableRotate = true;
      } else {
        controlsRef.current.minDistance = 0;
        controlsRef.current.maxDistance = 100;
        controlsRef.current.enableRotate = false;

        const direction = new THREE.Vector3();
        camera.getWorldDirection(direction);
        const lookDistance = 10;
        direction.multiplyScalar(lookDistance);  
        const targetPosition = camera.position.clone().add(direction);      
        controlsRef.current.target.copy(targetPosition);
      }
      controlsRef.current.update();
    }
  }, [isFreeLookMode, camera]);

  useEffect(() => {
    if (controlsRef.current && cameraAnimate) {
      // Interromper animação anterior se existir
      if (gsapAnimationRef.current) {
        gsapAnimationRef.current.kill();
      }

      // Obter posição atual do target
      const currentX = controlsRef.current.target.x;
      const currentY = controlsRef.current.target.y;
      const currentZ = controlsRef.current.target.z;
      const targetY = currentTarget[1];

      // Calcular ângulos para animação circular horizontal
      const startAngle = Math.atan2(currentZ, currentX);
      const endAngle = Math.atan2(currentTarget[2], currentTarget[0]);
      
      // Calcular o raio atual
      const currentRadius = Math.sqrt(currentX * currentX + currentZ * currentZ);

      // Calcular o raio do target
      const targetRadius = Math.sqrt(
        currentTarget[0] * currentTarget[0] + 
        currentTarget[2] * currentTarget[2]
      );
      
      // Objeto para animar o ângulo e a altura Y
      const animObj = { 
        angle: startAngle,
        y: currentY,
        radius: currentRadius
      };
      
      // Criar animação com GSAP
      gsapAnimationRef.current = gsap.to(animObj, {
        angle: endAngle,
        y: targetY,
        radius: targetRadius,
        duration: animationDuration,
        ease: "power2.inOut", 
        onUpdate: () => {
          // Calcular novas coordenadas X e Z baseadas no ângulo
          const newX = Math.cos(animObj.angle) * animObj.radius;
          const newZ = Math.sin(animObj.angle) * animObj.radius;
          
          // Atualizar a posição do target
          controlsRef.current.target.set(newX, animObj.y, newZ);
          controlsRef.current.update();
        },
        onComplete: () => {
          controlsRef.current.target.set(
            currentTarget[0],
            currentTarget[1],
            currentTarget[2]
          );
          controlsRef.current.update();
          finishAnimation();
        }
      });
    }
  }, [cameraAnimate]);

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        fov={adjustedFOV}
      />    
      <OrbitControls
        ref={controlsRef}
        makeDefault
        camera={camera}
      />
    </>
  );
};

export default Camera;