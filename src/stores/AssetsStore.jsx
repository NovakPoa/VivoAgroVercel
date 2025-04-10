import { create } from 'zustand';
import { TextureLoader } from 'three';
import { useGLTF } from '@react-three/drei';

const assets = {
  models: [
    // Fazenda
    '/models/fazenda/Solo/Solo.glb',
    '/models/fazenda/Casa/Casa.glb',
    '/models/fazenda/Cercas/Cercas.glb',
    '/models/fazenda/Galpao/Galpao.glb',
    '/models/fazenda/Ornamentos/Ornamentos-2.glb',
    '/models/fazenda/Mesa.glb',

    // Vegetação
    '/models/vegetaçao/Grama.glb',
    '/models/vegetaçao/PlantaçaoDeSoja.glb',
    '/models/vegetaçao/ArvoresDistantes.glb',
    '/models/vegetaçao/VegetaçaoPerto.glb',
    
    // Intro
    '/models/intro/LogoVivoAgro.glb',

    // Products
    //  AgroCobertura
    '/models/products/AgroCobertura/Antena.glb',
    //  GestaoMaquinario
    '/models/products/GestaoMaquinario/DispositivoMaquinario.glb',
    '/models/products/GestaoMaquinario/TratorA3.glb',
    '/models/products/GestaoMaquinario/TratorB3.glb',
    '/models/products/GestaoMaquinario/TratorC3.glb',
    //  GestaoPecuaria
    '/models/products/GestaoPecuaria/DispositivosPecuaria.glb',
    '/models/products/GestaoPecuaria/Brinco.glb',
    '/models/products/GestaoPecuaria/VacaHolandesa.glb',
    '/models/products/GestaoPecuaria/VacaNelore.glb',
    //  ClimaInteligente
    '/models/products/ClimaInteligente/Estacao.glb',
  ],
  textures: [
    // Skybox
    '/skybox/px.png',
    '/skybox/nx.png',
    '/skybox/py.png',
    '/skybox/ny.png',
    '/skybox/pz.png',
    '/skybox/nz.png',
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

    // Carregar modelos
    assets.models.forEach(modelPath => {
      useGLTF.preload(modelPath);
      incrementLoadedAssets();
    });    

    // Carregar texturas
    assets.textures.forEach(texturePath => {
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
          console.error(`Erro carregando 3D textura ${texturePath}:`, error);
          incrementLoadedAssets();
        }
      );
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