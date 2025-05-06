import * as THREE from 'three';

const TubeRevealShader = {
  uniforms: {
    baseColor: { value: new THREE.Color('#660099') },
    emissiveColor: { value: new THREE.Color('#9933FF') },
    emissiveIntensity: { value: 2.0 },
    progress: { value: 1.2 },
    glowWidth: { value: 0.05 },
    fadeWidth: { value: 0.1 },
    useXCoord: { value: true },
    invertDirection: { value: false },
    bloomStrength: { value: 2.0 },
    opacity: { value: 1.0 }
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewDir;
    
    void main() {
      vUv = uv;
      
      // Calcular normal para efeito de borda
      vNormal = normalize(normalMatrix * normal);
      
      // Calcular a posição em view space
      vec4 viewPos = modelViewMatrix * vec4(position, 1.0);
      
      // Direção para a câmera (oposta à posição no view space)
      vViewDir = normalize(-viewPos.xyz);
      
      gl_Position = projectionMatrix * viewPos;
    }
  `,
  fragmentShader: `
    uniform vec3 baseColor;
    uniform vec3 emissiveColor;
    uniform float emissiveIntensity;
    uniform float progress;
    uniform float glowWidth;
    uniform float fadeWidth;
    uniform bool useXCoord;
    uniform bool invertDirection;
    uniform float bloomStrength;
    uniform float opacity;
    
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewDir;
    
    void main() {
      // Escolher a coordenada (X ou Y) para animação de revelação
      float coord = useXCoord ? vUv.x : vUv.y;
      
      // Inverter se necessário
      if (invertDirection) {
        coord = 1.0 - coord;
      }
      
      // Determinar visibilidade baseada na coordenada (animação de revelação)
      float visibility = 1.0 - smoothstep(coord - fadeWidth, coord, progress);
      
      // Efeito de brilho na borda da revelação
      float revealGlow = smoothstep(coord - glowWidth, coord, progress) * 
                        (1.0 - smoothstep(coord, coord + 0.01, progress));
      
      // Cálculo básico do efeito de borda (rim)
      float NdotV = max(0.0, dot(vNormal, vViewDir));
      float rimFactor = 1.0 - NdotV;
      
      // Efeito de borda simples com suavização
      float rimIntensity = smoothstep(0.4, 0.5, rimFactor);
      
      // Cor base + emissiva nas bordas 
      vec3 rimColor = mix(
        baseColor * bloomStrength, 
        emissiveColor * emissiveIntensity * bloomStrength, 
        rimIntensity
      );
      
      // Adicionar brilho extra nas bordas externas
      rimColor += emissiveColor * bloomStrength * 0.3 * pow(rimFactor, 3.0);
      
      // Combinar efeito de borda com o brilho da animação de revelação
      vec3 revealColor = mix(baseColor * bloomStrength, 
                          emissiveColor * bloomStrength * 3.0, 
                          revealGlow);
      
      // Cor final: combinação do efeito de borda com a animação de revelação
      vec3 finalColor = mix(rimColor, revealColor, revealGlow * 0.8);
      
      // Aplicar opacidade da animação de revelação
      gl_FragColor = vec4(finalColor, visibility * opacity);
    }
  `
};

export default TubeRevealShader;

export const createTubeRevealMaterial = ({
  baseColor = '#660099',
  emissiveColor = '#9933FF',
  emissiveIntensity = 2.0,
  progress = 1.2,
  glowWidth = 0.05,
  fadeWidth = 0.1,
  useXCoord = true,
  invertDirection = false,
  bloomStrength = 5.0,
  opacity = 1.0
} = {}) => {
  const material = new THREE.ShaderMaterial({
    uniforms: {
      baseColor: { value: new THREE.Color(baseColor) },
      emissiveColor: { value: new THREE.Color(emissiveColor) },
      emissiveIntensity: { value: emissiveIntensity },
      progress: { value: progress },
      glowWidth: { value: glowWidth },
      fadeWidth: { value: fadeWidth },
      useXCoord: { value: useXCoord },
      invertDirection: { value: invertDirection },
      bloomStrength: { value: bloomStrength },
      opacity: { value: opacity }
    },
    vertexShader: TubeRevealShader.vertexShader,
    fragmentShader: TubeRevealShader.fragmentShader,
    transparent: true,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
    depthWrite: false
  });

  return material;
};