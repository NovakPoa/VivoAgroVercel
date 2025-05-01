import * as THREE from 'three';

const TubeRevealShader = {
  uniforms: {
    baseColor: { value: new THREE.Color('#660099') },
    glowColor: { value: new THREE.Color('#9933FF') }, 
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
    
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 baseColor;
    uniform vec3 glowColor;
    uniform float progress;
    uniform float glowWidth;
    uniform float fadeWidth;
    uniform bool useXCoord;
    uniform bool invertDirection;
    uniform float bloomStrength;
    uniform float opacity;
    
    varying vec2 vUv;
    
    void main() {
      // Escolher a coordenada (X ou Y)
      float coord = useXCoord ? vUv.x : vUv.y;
      
      // Inverter se necessário
      if (invertDirection) {
        coord = 1.0 - coord;
      }
      
      // Determinar visibilidade baseada na coordenada
      float visibility = 1.0 - smoothstep(coord - fadeWidth, coord, progress);
      
      // Efeito de brilho na borda da revelação
      float glow = smoothstep(coord - glowWidth, coord, progress) * 
                  (1.0 - smoothstep(coord, coord + 0.01, progress));
      
      // Para bloom: aumentar a intensidade das cores (HDR)
      vec3 brightColor = baseColor * bloomStrength;
      vec3 brightGlow = glowColor * bloomStrength * 1.5; // Glow ainda mais brilhante
      
      // Cor final com emissão para bloom
      vec3 finalColor = mix(brightColor, brightGlow, glow);
      
      // Aplicar opacidade 
      gl_FragColor = vec4(finalColor, visibility * opacity);
    }
  `
};

export default TubeRevealShader;


export const createTubeRevealMaterial = ({
  baseColor = '#660099',
  glowColor = '#9933FF',
  progress = 1.2,
  glowWidth = 0.05,
  fadeWidth = 0.1,
  useXCoord = true,
  invertDirection = false,
  bloomStrength = 2.0,
  opacity = 1.0
} = {}) => {
  const material = new THREE.ShaderMaterial({
    uniforms: {
      baseColor: { value: new THREE.Color(baseColor) },
      glowColor: { value: new THREE.Color(glowColor) },
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
    blending: THREE.AdditiveBlending
  });
  
  return material;
};