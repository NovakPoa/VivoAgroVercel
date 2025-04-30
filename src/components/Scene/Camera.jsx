import { useEffect, useRef } from 'react';
import { OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';;
import gsap from 'gsap';
import useCameraStore from '../../stores/CameraStore';

const CAMERA_POSITION = [0, 1.7, 0];
const INITIAL_TARGET = [10, 1.7, 0];

const Camera = () => {
  const controlsRef = useRef();
  const gsapAnimationRef = useRef(null);
  const { camera } = useThree();

  // Obtendo estados do CameraStore para animação
  const cameraAnimate = useCameraStore(state => state.cameraAnimate);
  const currentTarget = useCameraStore(state => state.currentTarget);
  const animationDuration = useCameraStore(state => state.animationDuration);
  const finishAnimation = useCameraStore(state => state.finishAnimation);
  const resetCamera = useCameraStore(state => state.resetCamera);

  // Configurar posição inicial da câmera
  useEffect(() => {
    if (controlsRef.current) {
      camera.position.set(CAMERA_POSITION[0], CAMERA_POSITION[1], CAMERA_POSITION[2]);
      
      controlsRef.current.target.set(
        INITIAL_TARGET[0],
        INITIAL_TARGET[1], 
        INITIAL_TARGET[2]
      );
      
      controlsRef.current.enableZoom = false;
      controlsRef.current.enablePan = false;
      controlsRef.current.enableRotate = false;
      controlsRef.current.enableDamping = true;
      controlsRef.current.dampingFactor = 0.1;
      
      controlsRef.current.update();
    }
  }, [camera]);

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
  }, [cameraAnimate, currentTarget, animationDuration, finishAnimation]);

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      camera={camera}
    />
  );
};

export default Camera;