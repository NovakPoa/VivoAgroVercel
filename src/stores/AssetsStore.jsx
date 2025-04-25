import { create } from 'zustand';
import { TextureLoader } from 'three';
import { useGLTF } from '@react-three/drei';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

const assets = {
  models: [
    // Fazenda
    '/models/fazenda/Solo/Solo.glb',
    '/models/fazenda/Casa/Casa.glb',
    '/models/fazenda/Cercas/Cercas.glb',
    '/models/fazenda/Galpao/Galpao.glb',
    '/models/fazenda/Ornamentos/Ornamentos-2.glb',

    // Vegetação
    '/models/vegetaçao/Grama.glb',
    '/models/vegetaçao/PlantaçaoDeSoja.glb',
    '/models/vegetaçao/ArvoresDistantes.glb',
    '/models/vegetaçao/VegetaçaoPerto.glb',
    
    // Geral
    '/models/geral/Mesa.glb',
    
    // Intro
    '/models/intro/LogoVivoAgro.glb',
    '/models/Intro/IntroNeon.glb',

    // Products
    //  AgroCobertura
    '/models/products/AgroCobertura/Antena.glb',
    '/models/products/AgroCobertura/AntenaSmall.glb',
    '/models/products/AgroCobertura/TabletAgro.glb',
    //  GestaoMaquinario
    '/models/products/GestaoMaquinario/DispositivoMaquinario.glb',
    '/models/products/GestaoMaquinario/DispositivoMaquinarioSmall.glb',
    '/models/products/GestaoMaquinario/TratorA3.glb',
    '/models/products/GestaoMaquinario/TratorB3.glb',
    '/models/products/GestaoMaquinario/TratorC3.glb',
    '/models/products/GestaoMaquinario/TabletMaquinario.glb',
    //  GestaoPecuaria
    '/models/products/GestaoPecuaria/DispositivosPecuaria.glb',
    '/models/products/GestaoPecuaria/Brinco.glb',
    '/models/products/GestaoPecuaria/BrincoSmall.glb',
    '/models/products/GestaoPecuaria/VacaHolandesa.glb',
    '/models/products/GestaoPecuaria/VacaNelore.glb',
    '/models/products/GestaoPecuaria/TabletPecuaria.glb',
    //  ClimaInteligente
    '/models/products/ClimaInteligente/Estacao.glb',
    '/models/products/ClimaInteligente/EstacaoSmall.glb',
    '/models/products/ClimaInteligente/TabletClima.glb',

  ],
  textures: [
    // Skybox
    '/textures/skybox/px.png',
    '/textures/skybox/nx.png',
    '/textures/skybox/py.png',
    '/textures/skybox/ny.png',
    '/textures/skybox/pz.png',
    '/textures/skybox/nz.png',

    // HDR
    '/textures/environment.hdr',
  ],   
  images: [
    // Product images
    '/ui/agroCobertura.png',
    '/ui/climaInteligente.jpg',
    '/ui/gestaoMaquinario.jpg',
    '/ui/gestaoPecuaria.png'
  ], 
};

const useAssetsStore = create((set, get) => ({
  isLoading: true,
  loadingProgress: 0,
  totalAssets: assets.models.length + assets.textures.length + assets.images.length,
  loadedAssets: 0,
  
  //modelCache: {},
  textureCache: {},
  imageCache: {},

  loadAllAssets: () => {
    const { incrementLoadedAssets } = get();
    const textureLoader = new TextureLoader();
    const rgbeLoader = new RGBELoader();

    // Carregar modelos
    assets.models.forEach(modelPath => {
      useGLTF.preload(modelPath);
      incrementLoadedAssets();
    });    

    // Carregar texturas
    assets.textures.forEach(texturePath => {
      // Verificar se é um arquivo HDR
      if (texturePath.endsWith('.hdr')) {
        rgbeLoader.load(
          texturePath,
          (loadedTexture) => {
            get().textureCache[texturePath] = loadedTexture;
            incrementLoadedAssets();
          },
          (progress) => {
            // 
          },
          (error) => {
            console.error(`Erro carregando HDR ${texturePath}:`, error);
            incrementLoadedAssets();
          }
        );
      } else {
        textureLoader.load(
          texturePath,
          (loadedTexture) => {
            get().textureCache[texturePath] = loadedTexture;
            incrementLoadedAssets();
          },
          (progress) => {
            // 
          },
          (error) => {
            console.error(`Erro carregando textura ${texturePath}:`, error);
            incrementLoadedAssets();
          }
        );
      }
    });

    // Carregar images 
    assets.images.forEach(imagePath => {
      const img = new Image();
      
      img.onload = () => {
        // Armazenar a imagem carregada no cache
        get().imageCache[imagePath] = img;
        incrementLoadedAssets();
      };
      
      img.onerror = () => {
        console.error(`Erro ao carregar imagem: ${imagePath}`);
        incrementLoadedAssets();
      };
      
      img.src = imagePath;
    });
  },

  // Atualizar o progresso
  incrementLoadedAssets: () => {
    set(state => {
      const loadedAssets = state.loadedAssets + 1;
      const loadingProgress = (loadedAssets / state.totalAssets) * 100;
      const isLoading = loadedAssets < state.totalAssets;
      
      return {
        loadedAssets,
        loadingProgress,
        isLoading
      };
    });
  },

  // Obter modelo
/*   getModel: (path) => {
    return get().modelCache[path];
  }, */

  // Obter textura 
  getTexture: (path) => {
    return get().textureCache[path];
  },

  // Obter imagem
  getUIImage: (path) => {
    return get().imageCache[path];
  }
}));

export default useAssetsStore;