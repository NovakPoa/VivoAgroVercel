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
    '/models/products/AgroCobertura/Antena.fbx'
  ],
  textures: [
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
    
    // Product images
    '/textures/agroCobertura.png',
    '/textures/climaInteligente.jpg',
    '/textures/gestaoMaquinario.jpg',
    '/textures/gestaoPecuaria.png'
  ]
};

const useAssetsStore = create((set, get) => ({
  isLoading: true,
  loadingProgress: 0,
  totalAssets: assets.models.length + assets.textures.length,
  loadedAssets: 0,
  
  modelCache: {},
  textureCache: {},

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
          console.error(`Erro carregando textura ${texturePath}:`, error);
          incrementLoadedAssets();
        }
      );
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
  }
}));

export default useAssetsStore;