import { create } from 'zustand';
import { TextureLoader } from 'three';
import { useGLTF } from '@react-three/drei';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { Howl } from 'howler';

// Função para gerenciar caminhos de assets
const basePath = import.meta.env.BASE_URL;
const getPath = (path) => {
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  return basePath.endsWith('/') ? `${basePath}${cleanPath}` : `${basePath}/${cleanPath}`;
};

// Lista de assets usando os caminhos originais (sem aplicar getPath ainda)
const assets = {
  models: [
    // fazenda
    '/models/fazenda/Solo.glb',
    '/models/fazenda/Casa.glb',
    '/models/fazenda/Cercas.glb',
    '/models/fazenda/Galpao.glb',
    '/models/fazenda/Ornamentos.glb',

    // geral
    '/models/geral/Mesas.glb',
    '/models/geral/Placeholder.glb',

    // intro
    '/models/intro/Logo.glb',

    // neons
    '/models/neons/NeonCasa.glb',
    '/models/neons/NeonAntena.glb',
    '/models/neons/NeonTrator.glb',
    '/models/neons/NeonVaca.glb',
    '/models/neons/NeonEstacaoMeteorologica.glb',

    // products
    //  AgroCobertura
    '/models/products/AgroCobertura/Antena.glb',
    '/models/products/AgroCobertura/AntenaMiniatura.glb',
    //  ClimaInteligente
    '/models/products/ClimaInteligente/EstacaoMeteorologica.glb',
    '/models/products/ClimaInteligente/EstacaoMeteorologicaMiniatura.glb',
    //  GestaoMaquinario
    '/models/products/GestaoMaquinario/DispositivoGestaoDeMaquinario-Miniatura.glb',
    '/models/products/GestaoMaquinario/DispositivoGestaoDeMaquinario.glb',
    '/models/products/GestaoMaquinario/Trator.glb',
    //  GestaoPecuaria
    '/models/products/GestaoPecuaria/Brinco.glb',
    '/models/products/GestaoPecuaria/BrincoMiniatura.glb',
    '/models/products/GestaoPecuaria/DispositivosPecuaria.glb',
    '/models/products/GestaoPecuaria/VacaHolandesa.glb',
    '/models/products/GestaoPecuaria/VacaNelore.glb',

    // tablets
    '/models/neons/TabletAgro.glb',
    '/models/neons/TabletClima.glb',
    '/models/neons/TabletMaquinario.glb',
    '/models/neons/TabletPecuaria.glb',

    // vegetaçao
    '/models/vegetacao/ArvoresDistantes.glb',
    '/models/vegetacao/Grama.glb',
    '/models/vegetacao/Soja.glb',
    '/models/vegetacao/SojaFundo.glb',
    '/models/vegetacao/VegetacaoPerto.glb',
  ],
  textures: [
    // Skybox
    '/textures/skybox/skybox.jpg',

    // Environment
    '/textures/skybox/environment.jpg',
  ],
  images: [
    // Product images
    '/ui/agroCobertura.jpg',
    '/ui/climaInteligente.jpg',
    '/ui/gestaoMaquinario.jpg',
    '/ui/gestaoPecuaria.jpg',

    // UI Icons
    '/ui/icons/vivo-icon.png',
    '/ui/icons/vivo-icon-dark.png',
    '/ui/icons/check-icon.png'    
  ],
  videos: [
    '/videos/TabletAgroCobertura.mp4',
    '/videos/TabletGestaoMaquinario.mp4',
    '/videos/TabletGestaoPecuaria.mp4',
    '/videos/TabletClimaInteligente.mp4'
  ],
  sounds: {
    // Interface
    BUTTON_CLICK: '/audio/Geral/Click.mp3',
    SLOT_CLICK: '/audio/Geral/Grab.mp3',

    // Efeitos
    NEON_APPEAR: '/audio/Produtos/Geral/Swoosh.mp3',
    ACTIVATION: '/audio/Produtos/Geral/Activation.mp3',
    ENDING: '/audio/Produtos/Geral/Ending.mp3',

    // Sons de produtos
    TRATOR_A: '/audio/Produtos/GestaoMaquinario/tractor.mp3',
    TRATOR_B: '/audio/Produtos/GestaoMaquinario/tractor.mp3',
    TRATOR_C: '/audio/Produtos/GestaoMaquinario/tractor.mp3',
    VACA_A: '/audio/Produtos/GestaoPecuaria/Vaca-A.mp3',
    VACA_B: '/audio/Produtos/GestaoPecuaria/Vaca-B.mp3',

    // Ambiente
    AMBIENT: '/audio/Fazenda/Ambiance.mp3',
  }
};

const useAssetsStore = create((set, get) => ({
  isLoading: true,
  loadingProgress: 0,
  totalAssets: assets.models.length + assets.textures.length +
    assets.images.length + assets.videos.length +
    Object.keys(assets.sounds).length,
  loadedAssets: 0,

  textureCache: {},
  imageCache: {},
  videoCache: {},
  soundCache: {},

  loadAllAssets: () => {
    const { incrementLoadedAssets } = get();
    const textureLoader = new TextureLoader();
    const rgbeLoader = new RGBELoader();

    // Carregar modelos - Aplicar getPath em cada caminho
    assets.models.forEach(modelPath => {
      // Usar getPath para obter caminho correto
      const path = getPath(modelPath);
      useGLTF.preload(path);
      incrementLoadedAssets();
    });

    // Carregar texturas - Aplicar getPath em cada caminho
    assets.textures.forEach(texturePath => {
      // Obter caminho ajustado
      const path = getPath(texturePath);
      
      // Verificar se é um arquivo HDR
      if (path.endsWith('.hdr')) {
        rgbeLoader.load(
          path, // Usar path com getPath aplicado
          (loadedTexture) => {
            get().textureCache[texturePath] = loadedTexture; // Armazenar com chave original
            incrementLoadedAssets();
          },
          (progress) => {
            // Progress callback
          },
          (error) => {
            console.error(`Erro carregando HDR ${path}:`, error);
            incrementLoadedAssets();
          }
        );
      } else {
        textureLoader.load(
          path, // Usar path com getPath aplicado
          (loadedTexture) => {
            get().textureCache[texturePath] = loadedTexture; // Armazenar com chave original
            incrementLoadedAssets();
          },
          (progress) => {
            // Progress callback
          },
          (error) => {
            console.error(`Erro carregando textura ${path}:`, error);
            incrementLoadedAssets();
          }
        );
      }
    });

    // Carregar imagens - Aplicar getPath em cada caminho
    assets.images.forEach(imagePath => {
      const img = new Image();
      const path = getPath(imagePath);

      img.onload = () => {
        // Armazenar a imagem carregada no cache usando o caminho original como chave
        get().imageCache[imagePath] = img;
        incrementLoadedAssets();
      };

      img.onerror = () => {
        console.error(`Erro ao carregar imagem: ${path}`);
        incrementLoadedAssets();
      };

      img.src = path; // Usar path com getPath aplicado
    });

    // Carregar vídeos - Aplicar getPath em cada caminho
    assets.videos.forEach(videoPath => {
      const video = document.createElement('video');
      const path = getPath(videoPath);
      
      video.crossOrigin = 'anonymous';
      video.loop = true;
      video.muted = true; // Necessario para autoplay sem interação
      video.playsInline = true;

      // Para alguns navegadores é necessario definir o tamanho
      video.width = 1920;
      video.height = 1080;

      // Indica que o vídeo está pronto para ser usado
      video.oncanplaythrough = () => {
        get().videoCache[videoPath] = video; // Armazenar com chave original
        incrementLoadedAssets();
      };

      video.onerror = () => {
        console.error(`Erro ao carregar vídeo: ${path}`);
        incrementLoadedAssets();
      };

      video.src = path; // Usar path com getPath aplicado
      video.load();
    });

    // Carregar sons - Aplicar getPath em cada caminho
    Object.entries(assets.sounds).forEach(([soundId, soundPath]) => {
      const path = getPath(soundPath);
      
      const sound = new Howl({
        src: [path], // Usar path com getPath aplicado
        preload: true,
        onload: () => {
          get().soundCache[soundId] = sound;
          incrementLoadedAssets();
        },
        onloaderror: (id, error) => {
          console.error(`Erro ao carregar som ${soundId} (${path}):`, error);
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

  // Métodos de acesso permanecem os mesmos, mas agora usam caches com caminhos consistentes
  getTexture: (path) => {
    return get().textureCache[path];
  },
  
  getUIImage: (path) => {
    return get().imageCache[path];
  },
  
  getVideo: (path) => {
    return get().videoCache[path];
  },
  
  getSound: (soundId) => {
    return get().soundCache[soundId];
  },

  // Adicionando um utilitário getPath para uso em outros componentes
  getPath: (path) => getPath(path)
}));

export default useAssetsStore;