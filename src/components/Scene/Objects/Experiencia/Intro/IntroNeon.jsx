import React, { useRef, useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

// Caminho do modelo
const MODEL_PATH = '/models/intro/IntroNeon.glb';

const morphTargetVertexShader = `
  #include <morphtarget_pars_vertex>  // Adiciona suporte para morph targets
  
  varying vec3 vColor;
  
  void main() {
    #include <begin_vertex>
    #include <morphtarget_vertex>     // Aplica os morph targets
    
    // Definir uma cor baseada na posição
    vColor = position.xyz * 0.5 + 0.5; // Normalizar para 0-1
    
    // Usar transformed ao invés de position diretamente
    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
  }
`;

// Vertex shader completo com suporte a morph targets
const morphCompleteVertexShader = `
  #include <morphtarget_pars_vertex>  // Adiciona suporte para morph targets
  
  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec3 vWorldPos;
  
  void main() {
    #include <begin_vertex>
    #include <morphtarget_vertex>     // Aplica os morph targets
    
    // Usar transformed ao invés de position
    vNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
    vWorldPos = (modelMatrix * vec4(transformed, 1.0)).xyz;
    vViewDir = normalize(cameraPosition - vWorldPos);
    
    // Usar transformed para a posição
    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
  }
`;

// Shader vertex ultra-básico (sem variáveis, só posição)
const ultraBasicVertexShader = `
  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Shader fragment ultra-básico (apenas verde sólido)
const ultraBasicFragmentShader = `
  void main() {
    gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);  // Verde sólido
  }
`;

// Vertex shader com variáveis para verificar compilação
const basicVertexShader = `
  varying vec3 vColor;
  
  void main() {
    // Definir uma cor baseada na posição
    vColor = position.xyz * 0.5 + 0.5; // Normalizar para 0-1
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment shader que usa as variáveis
const basicFragmentShader = `
  varying vec3 vColor;
  
  void main() {
    gl_FragColor = vec4(vColor, 1.0);  // Usar cor passada do vertex shader
  }
`;

// Vertex shader original
const vertexShader = `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec3 vWorldPos;
  
  void main() {
    // Calcular posição e normal em espaço mundo
    vNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
    vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
    vViewDir = normalize(cameraPosition - vWorldPos);
    
    // Posição normal do vértice
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment shader original
const fragmentShader = `
  uniform vec3 baseColor;
  uniform vec3 rimColor;
  uniform float rimPower;
  uniform float rimThreshold;
  uniform float rimSmoothness;
  uniform float rimIntensity;
  uniform vec3 secondRimColor;
  uniform float secondRimPower;
  uniform float secondRimThreshold;
  uniform float secondRimSmoothness;
  uniform float secondRimIntensity;
  uniform float time;
  
  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec3 vWorldPos;
  
  void main() {
    // Calcular o fator de borda (rim factor)
    float NdotV = max(0.0, dot(vNormal, vViewDir));
    float rimFactor = 1.0 - NdotV;
    
    // Primeiro efeito de borda (rim) mais intenso
    float rimIntensityFactor = smoothstep(
      rimThreshold - rimSmoothness,
      rimThreshold + rimSmoothness,
      rimFactor
    );
    rimIntensityFactor = pow(rimIntensityFactor, rimPower);
    
    // Segundo efeito de borda com mais alcance
    float secondRimIntensityFactor = smoothstep(
      secondRimThreshold - secondRimSmoothness * 2.0,
      secondRimThreshold + secondRimSmoothness,
      rimFactor
    );
    secondRimIntensityFactor = pow(secondRimIntensityFactor, secondRimPower);
    
    // Adicionar pulsação leve
    float pulse = 1.0 + 0.2 * sin(time * 3.0);
    
    // Efeito de sobresaturação para parecer mais brilhante
    vec3 intensifiedRimColor = rimColor * rimIntensity * pulse;
    vec3 intensifiedSecondColor = secondRimColor * secondRimIntensity * pulse;
    
    // Misturar as cores com intensidade maior
    vec3 firstRimBlend = mix(baseColor, intensifiedRimColor, rimIntensityFactor * 1.5);
    vec3 finalColor = mix(firstRimBlend, intensifiedSecondColor, secondRimIntensityFactor);
    
    // Adicionar brilho extra nas bordas
    finalColor += rimColor * 0.5 * pow(rimFactor, 4.0);
    
    // Definir a cor final
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

const IntroNeon = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = [0.2, 0.2, 0.005] }) => {
  const groupRef = useRef();
  const { scene } = useGLTF(MODEL_PATH);
  const [meshWithMorphs, setMeshWithMorphs] = useState(null);
  const [materialMode, setMaterialMode] = useState(0); // 0=original, 1=básico, 2=ultra-básico, 3=shader básico, 4=completo, 5=wireframe
  
  useEffect(() => {
    if (!scene) return;
    
    // Função para procurar morph targets
    const findMorphTargetMesh = (object) => {
      if (object.morphTargetDictionary && Object.keys(object.morphTargetDictionary).length > 0) {
        return object;
      }
      
      if (object.children) {
        for (let child of object.children) {
          const found = findMorphTargetMesh(child);
          if (found) return found;
        }
      }
      
      return null;
    };
    
    // Configurar morph targets primeiro
    const morphMesh = findMorphTargetMesh(scene);
    setMeshWithMorphs(morphMesh);
    
    if (morphMesh) {
      console.log("Blend shapes encontrados:", Object.keys(morphMesh.morphTargetDictionary));
      
      if (morphMesh.morphTargetInfluences) {
        morphMesh.morphTargetInfluences.fill(0);
        
        const frameIndex = morphMesh.morphTargetDictionary["frame_0200"];
        if (frameIndex !== undefined) {
          console.log(`Definindo frame_0200 (índice ${frameIndex}) para 1.0`);
          morphMesh.morphTargetInfluences[frameIndex] = 1.0;
        } else {
          console.log("Nomes disponíveis:", Object.keys(morphMesh.morphTargetDictionary));
        }
      }
    }
    
    // Aplicar materiais baseado no modo atual
    applyMaterials();
    
    // Configurar evento de teclado para alternar modos
    const handleKeyDown = (e) => {
      if (e.key === '1') {
        console.log("Modo 1: Material Original");
        setMaterialMode(0);
      }
      else if (e.key === '2') {
        console.log("Modo 2: Material Básico Vermelho");
        setMaterialMode(1);
      }
      else if (e.key === '3') {
        console.log("Modo 3: Shader Ultra-Básico Verde");
        setMaterialMode(2);
      }
      else if (e.key === '4') {
        console.log("Modo 4: Shader Básico com Variáveis");
        setMaterialMode(3);
      }
      else if (e.key === '5') {
        console.log("Modo 5: Shader Completo");
        setMaterialMode(4);
      }
      else if (e.key === '6') {
        console.log("Modo 6: Wireframe");
        setMaterialMode(5);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [scene]);
  
  // Função para aplicar materiais baseado no modo
  const applyMaterials = () => {
    if (!scene) return;
    
    scene.traverse((object) => {
      if (object.isMesh) {
        // Salvar material original se ainda não foi salvo
        if (!object.originalMaterial) {
          object.originalMaterial = object.material;
        }
        
        // Log atributos da geometria para debug
        console.log(`Mesh "${object.name}" attributes:`, 
          object.geometry.attributes ? Object.keys(object.geometry.attributes) : "No attributes"
        );
        
        switch(materialMode) {
          case 0: // Material original
            object.material = object.originalMaterial;
            break;
            
          case 1: // MeshBasicMaterial simples
            object.material = new THREE.MeshBasicMaterial({
              color: new THREE.Color(1, 0, 0),
              side: THREE.DoubleSide
            });
            break;
            
            case 2: // Shader ultra-básico (verde)
            object.material = new THREE.ShaderMaterial({
              vertexShader: `
                #include <morphtarget_pars_vertex>
                
                void main() {
                  #include <begin_vertex>
                  #include <morphtarget_vertex>
                  
                  gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
                }
              `,
              fragmentShader: ultraBasicFragmentShader,
              side: THREE.DoubleSide,
              morphTargets: true // IMPORTANTE: ativa suporte a morph targets
            });
            break;
            
            case 3: // Shader básico com variáveis
            object.material = new THREE.ShaderMaterial({
              vertexShader: morphTargetVertexShader,
              fragmentShader: basicFragmentShader,
              side: THREE.DoubleSide,
              morphTargets: true // IMPORTANTE: ativa suporte a morph targets
            });
            break;
            
            case 4: // Shader completo
            object.material = new THREE.ShaderMaterial({
              vertexShader: morphCompleteVertexShader,
              fragmentShader: fragmentShader,
              uniforms: {
                // Cores mais vibrantes e intensas
                baseColor: { value: new THREE.Color(0.01, 0.05, 0.2) },    // Base escura azulada
                rimColor: { value: new THREE.Color(0.0, 1.0, 3.0) },       // Azul intenso para o glow principal
                rimPower: { value: 1.5 },                                  // Valor menor para mais área iluminada
                rimThreshold: { value: 0.15 },                             // Threshold menor para glow mais largo
                rimSmoothness: { value: 0.4 },                             // Suavização maior
                rimIntensity: { value: 4.0 },                              // Intensidade MUITO maior
                secondRimColor: { value: new THREE.Color(0.0, 0.5, 2.0) }, // Segunda cor azul para profundidade
                secondRimPower: { value: 2.0 },
                secondRimThreshold: { value: 0.3 },
                secondRimSmoothness: { value: 0.5 },                       // Suavização maior para o segundo rim
                secondRimIntensity: { value: 2.5 },                        // Intensidade maior
                time: { value: 0 },                                        // Para animação de pulsação
              },
              side: THREE.DoubleSide,
              depthWrite: true,
              // Adicionar blending aditivo para aumentar o brilho
              blending: THREE.AdditiveBlending,
              morphTargets: true
            });
            break;
           
          case 5: // Wireframe para visualizar a geometria
            object.material = new THREE.MeshBasicMaterial({
              color: new THREE.Color(0, 1, 0.5),
              wireframe: true,
              side: THREE.DoubleSide
            });
            break;
        }
      }
    });
  };
  
  // Aplicar materiais quando o modo mudar
  useEffect(() => {
    applyMaterials();
    console.log("Material mode alterado para:", materialMode);
  }, [materialMode]);
  
  // Adicionar textos de debug na tela com modo atual
  useEffect(() => {
    const debugDiv = document.createElement('div');
    debugDiv.id = 'shader-debug';
    debugDiv.style.position = 'fixed';
    debugDiv.style.top = '10px';
    debugDiv.style.right = '10px';
    debugDiv.style.backgroundColor = 'rgba(0,0,0,0.7)';
    debugDiv.style.color = 'white';
    debugDiv.style.padding = '10px';
    debugDiv.style.fontFamily = 'monospace';
    debugDiv.style.zIndex = '1000';
    
    const getModeText = () => {
      switch(materialMode) {
        case 0: return 'Original';
        case 1: return 'Basic Red';
        case 2: return 'Ultra-Basic Shader (Green)';
        case 3: return 'Basic Variable Shader';
        case 4: return 'Full Shader';
        case 5: return 'Wireframe';
        default: return 'Unknown';
      }
    };
    
    debugDiv.textContent = `Mode: ${getModeText()} (Press 1-6 to switch)`;
    
    document.body.appendChild(debugDiv);
    
    return () => {
      document.body.removeChild(debugDiv);
    };
  }, [materialMode]);
  
// Adicionar animação de pulsação do neon
useEffect(() => {
  let animationFrameId;
  let time = 0;
  
  const animate = () => {
    time += 0.01;
    
    // Atualizar o tempo para o efeito de pulsação
    scene?.traverse((object) => {
      if (object.isMesh && 
          object.material && 
          object.material.uniforms && 
          object.material.uniforms.time) {
        object.material.uniforms.time.value = time;
      }
    });
    
    animationFrameId = requestAnimationFrame(animate);
  };
  
  if (materialMode === 4) {
    animate();
  }
  
  return () => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
  };
}, [materialMode, scene]);

  // Adicionar plano de referência para ajudar a localizar o objeto no espaço
  useEffect(() => {
    if (!scene || !groupRef.current) return;
    
    const debugPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(5, 5),
      new THREE.MeshBasicMaterial({ color: 0x444444, side: THREE.DoubleSide })
    );
    debugPlane.rotation.x = Math.PI / 2;
    debugPlane.position.y = -0.5;
    debugPlane.visible = true;
    
    const debugSphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.2, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
    );
    debugSphere.position.y = 0.2;
    debugSphere.visible = true;
    
    groupRef.current.add(debugPlane);
    groupRef.current.add(debugSphere);
    
    return () => {
      groupRef.current.remove(debugPlane);
      groupRef.current.remove(debugSphere);
    };
  }, [scene]);

  if (!scene) return null;

  return (
<>
  <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
    <primitive object={scene} />
  </group>
  
  {/* Adicionar post-processing para o glow */}
  {materialMode === 4 && (
    <EffectComposer>
      <Bloom 
        intensity={1.5}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        height={300}
      />
    </EffectComposer>
  )}
</>
  );
};

useGLTF.preload(MODEL_PATH);

export default IntroNeon;