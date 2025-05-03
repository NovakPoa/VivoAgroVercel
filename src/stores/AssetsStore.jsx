import { create } from 'zustand';
import { TextureLoader } from 'three';
import { useGLTF } from '@react-three/drei';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { Howl } from 'howler';

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
    '/models/intro/IntroNeon.glb',

    // Products
    //  AgroCobertura
    '/models/products/AgroCobertura/Antena.glb',
    '/models/products/AgroCobertura/AntenaSmall.glb',
    '/models/products/AgroCobertura/TabletAgro.glb',
    '/models/products/AgroCobertura/AgroNeon.glb',
    //  GestaoMaquinario
    '/models/products/GestaoMaquinario/DispositivoMaquinario.glb',
    '/models/products/GestaoMaquinario/DispositivoMaquinarioSmall.glb',
    '/models/products/GestaoMaquinario/TratorA3.glb',
    '/models/products/GestaoMaquinario/TratorB3.glb',
    '/models/products/GestaoMaquinario/TratorC3.glb',
    '/models/products/GestaoMaquinario/TabletMaquinario.glb',
    '/models/products/GestaoMaquinario/MaquinarioNeon.glb',
    //  GestaoPecuaria
    '/models/products/GestaoPecuaria/DispositivosPecuaria.glb',
    '/models/products/GestaoPecuaria/Brinco.glb',
    '/models/products/GestaoPecuaria/BrincoSmall.glb',
    '/models/products/GestaoPecuaria/VacaHolandesa.glb',
    '/models/products/GestaoPecuaria/VacaNelore.glb',
    '/models/products/GestaoPecuaria/TabletPecuaria.glb',
    '/models/products/GestaoPecuaria/PecuariaNeon.glb',
    //  ClimaInteligente
    '/models/products/ClimaInteligente/Estacao.glb',
    '/models/products/ClimaInteligente/EstacaoSmall.glb',
    '/models/products/ClimaInteligente/TabletClima.glb',
    '/models/products/ClimaInteligente/ClimaNeon.glb',

  ],
  textures: [
    // Skybox
    '/textures/skybox/skybox.jpg',

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
  videos: [
    '/videos/TabletAgroCobertura.mp4',
    '/videos/TabletGestaoMaquinario.mp4',
    '/videos/TabletGestaoPecuaria.mp4',
    '/videos/TabletClimaInteligente.mp4'
  ],
  sounds: {
    // Interface
    BUTTON_CLICK: '/audio/Geral/Click.wav',
    SLOT_CLICK: '/audio/Geral/Grab.wav',

    // Efeitos
    NEON_APPEAR: '/audio/Produtos/Geral/Swoosh.wav',
    ACTIVATION: '/audio/Produtos/Geral/Activation.wav',
    ENDING: '/audio/Produtos/Geral/Ending.wav',

    // Sons de produtos
    TRATOR_A: '/audio/Produtos/GestaoMaquinario/tractor.wav',
    TRATOR_B: '/audio/Produtos/GestaoMaquinario/tractor.wav',
    TRATOR_C: '/audio/Produtos/GestaoMaquinario/tractor.wav',
    VACA_A: '/audio/Produtos/GestaoPecuaria/Vaca-A.wav',
    VACA_B: '/audio/Produtos/GestaoPecuaria/Vaca-B.wav',

    // Ambiente
    AMBIENT: '/audio/Fazenda/Ambiance.wav',
  }
};

const useAssetsStore = create((set, get) => ({
  isLoading: true,
  loadingProgress: 0,
  totalAssets: assets.models.length + assets.textures.length +
    assets.images.length + assets.videos.length +
    Object.keys(assets.sounds).length,
  loadedAssets: 0,

  //modelCache: {},
  textureCache: {},
  imageCache: {},
  videoCache: {},
  soundCache: {},

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

    // Carregar vídeos
    assets.videos.forEach(videoPath => {
      const video = document.createElement('video');
      video.crossOrigin = 'anonymous';
      video.loop = true;
      video.muted = true; // Necessario para autoplay sem interação
      video.playsInline = true;

      // Para alguns navegadores é necessario definir o tamanho
      video.width = 1920;
      video.height = 1080;

      // Indica que o vídeo está pronto para ser usado
      video.oncanplaythrough = () => {
        get().videoCache[videoPath] = video;
        incrementLoadedAssets();
      };

      video.onerror = () => {
        console.error(`Erro ao carregar vídeo: ${videoPath}`);
        incrementLoadedAssets();
      };

      video.src = videoPath;
      video.load();
    });

    Object.entries(assets.sounds).forEach(([soundId, soundPath]) => {
      const sound = new Howl({
        src: [soundPath],
        preload: true,
        onload: () => {
          get().soundCache[soundId] = sound;
          incrementLoadedAssets();
        },
        onloaderror: (id, error) => {
          console.error(`Erro ao carregar som ${soundId}:`, error);
          incrementLoadedAssets();
        }
      });
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
  },
  // Obter video
  getVideo: (path) => {
    return get().videoCache[path];
  },
  // Obter sounds
  getSound: (soundId) => {
    return get().soundCache[soundId];
  },

}));

export default useAssetsStore;