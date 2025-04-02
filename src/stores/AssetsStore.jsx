import { create } from 'zustand';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { TextureLoader } from 'three';

const assets = {
  models: [
    '/models/fazenda/Solo/Solo.fbx',
    '/models/fazenda/Casa/Casa.fbx',
    '/models/fazenda/Cercas/Cercas.fbx',
    '/models/fazenda/Galpao/Galpao.fbx',
    '/models/fazenda/Ornamentos/Ornamentos-2.fbx',
    '/models/products/AgroCobertura/Antena.fbx',
    '/models/intro/LogoVivoAgro.fbx',
  ],
  textures3D: [
    // Solo
    '/models/fazenda/Solo/Textures/Solo_Baked-1001.png',
    '/models/fazenda/Solo/Textures/Solo_Baked-1002.png',
    '/models/fazenda/Solo/Textures/Solo_Baked-1003.png',
    
    // Casa
    '/models/fazenda/Casa/Textures/Sede-Madeira-Bordas-Bake.png',
    '/models/fazenda/Casa/Textures/madeira-clara_Bake.png',
    
    // Cercas
    '/models/fazenda/Cercas/Textures/Cerca-arame_CercaMadeira_BaseColor.png',
    '/models/fazenda/Cercas/Textures/acbd.png',
    
    // Galpao
    '/models/fazenda/Galpao/Textures/Galpao-madeira-bordas_Bake.png',
    '/models/fazenda/Galpao/Textures/Galpao-Telhado_Bake.png',
    
    // Ornamentos
    '/models/fazenda/Ornamentos/Textures/Balde_Bake.png',
    '/models/fazenda/Ornamentos/Textures/Image_12.jpg',
    
    // Skybox
    '/skybox/px.png',
    '/skybox/nx.png',
    '/skybox/py.png',
    '/skybox/ny.png',
    '/skybox/pz.png',
    '/skybox/nz.png',

  ],
  texturesUI: [
    // Product images
    '/ui/agroCobertura.png',
    '/ui/climaInteligente.jpg',
    '/ui/gestaoMaquinario.jpg',
    '/ui/gestaoPecuaria.png'
  ]  
};

const useAssetsStore = create((set, get) => ({
  isLoading: true,
  loadingProgress: 0,
  totalAssets: assets.models.length + assets.textures3D.length + assets.texturesUI.length,
  loadedAssets: 0,
  
  modelCache: {},
  textureCache: {},
  uiImageCache: {},

  loadAllAssets: () => {
    const { incrementLoadedAssets } = get();
    const fbxLoader = new FBXLoader();
    const textureLoader = new TextureLoader();

    // Carregar modelos
    assets.models.forEach(modelPath => {
      fbxLoader.load(
        modelPath,
        (loadedModel) => {
          get().modelCache[modelPath] = loadedModel;
          incrementLoadedAssets();
        },
        (progress) => {
          // 
        },
        (error) => {
          console.error(`Erro carregando modelo ${modelPath}:`, error);
          incrementLoadedAssets();
        }
      );
    });

    // Carregar 3D texturas
    assets.textures3D.forEach(texturePath => {
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

    // Carregar UI texturas  
    assets.texturesUI.forEach(imagePath => {
      const img = new Image();
      
      img.onload = () => {
        // Armazenar a imagem carregada no cache
        get().uiImageCache[imagePath] = img;
        incrementLoadedAssets();
      };
      
      img.onerror = () => {
        console.error(`Erro ao carregar imagem de UI: ${imagePath}`);
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
  getModel: (path) => {
    const model = get().modelCache[path];
    if (model) {
      return model.clone();
    }
    console.warn(`Modelo não encontrado no cache: ${path}`);
    return null;
  },

  // Obter textura 
  getTexture: (path) => {
    return get().textureCache[path] || null;
  },

  // Obter imagem UI
  getUIImage: (path) => {
    const cachedImage = get().uiImageCache[path];
    if (cachedImage) {
      return cachedImage;
    }
    console.warn(`Imagem UI não encontrada no cache: ${path}`);
    return null;
  }
}));

export default useAssetsStore;