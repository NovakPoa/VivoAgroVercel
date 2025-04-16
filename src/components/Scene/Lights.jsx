import React, { useRef } from 'react';
import { useControls, folder } from 'leva';
import { useHelper } from '@react-three/drei';
import * as THREE from 'three';

const defaultLightSettings = {
  ambientIntensity: 0.3, 
  ambientColor: '#ffffff',
  dirIntensity: 3.0, 
  dirColor: '#FEBF71', 
  dirX: 20,
  dirY: 20,
  dirZ: 20,
  dirCastShadow: true, 
  showHelper: false
};

const Lights = () => {
  const directionalLightRef = useRef();
  
  useHelper(
    directionalLightRef,
    defaultLightSettings.showHelper ? THREE.DirectionalLightHelper : null,
    1
  );
  
  const lightSettings = useControls('Lights', {
    Ambient: folder({
      ambientIntensity: { value: defaultLightSettings.ambientIntensity, min: 0, max: 2, step: 0.01 },
      ambientColor: defaultLightSettings.ambientColor
    }),
    Directional: folder({
      dirIntensity: { value: defaultLightSettings.dirIntensity, min: 0, max: 2, step: 0.01 },
      dirColor: defaultLightSettings.dirColor,
      position: folder({
        dirX: { value: defaultLightSettings.dirX, min: -10, max: 10, step: 0.1 },
        dirY: { value: defaultLightSettings.dirY, min: -10, max: 10, step: 0.1 },
        dirZ: { value: defaultLightSettings.dirZ, min: 0, max: 20, step: 0.1 }
      }),
      dirCastShadow: defaultLightSettings.dirCastShadow,
      showHelper: defaultLightSettings.showHelper,
    }),
    'Shadow Settings': folder({
      shadowMapSize: { value: 1024, min: 256, max: 4096, step: 256 },
      shadowBias: { value: -0.0005, min: -0.01, max: 0.01, step: 0.0001 },
      shadowRadius: { value: 1, min: 0, max: 10, step: 0.1 }
    })
  });

  return (
    <>
      <ambientLight 
        intensity={lightSettings.ambientIntensity} 
        color={lightSettings.ambientColor} 
      />
      
      <directionalLight 
        ref={directionalLightRef}
        position={[lightSettings.dirX, lightSettings.dirY, lightSettings.dirZ]}
        intensity={lightSettings.dirIntensity}
        color={lightSettings.dirColor}
        castShadow={lightSettings.dirCastShadow}
        shadow-mapSize={[lightSettings.shadowMapSize, lightSettings.shadowMapSize]}
        shadow-bias={lightSettings.shadowBias}
        shadow-radius={lightSettings.shadowRadius}
      />
    </>
  );
};

export default Lights;