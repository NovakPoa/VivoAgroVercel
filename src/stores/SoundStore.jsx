import { create } from 'zustand';
import * as THREE from 'three';
import useAssetsStore from './AssetsStore';

const useSoundStore = create((set, get) => ({
  masterVolume: 0.8,
  sfxVolume: 0.7,
  musicVolume: 0.5,
  muted: false,
  activeAudioIds: {},

  playSound: (soundId, options = {}) => {
    const sound = useAssetsStore.getState().getSound(soundId);
    if (!sound || get().muted) return null;
    
    // Configurar options
    const volume = options.volume !== undefined ? options.volume : get().sfxVolume;
    sound.volume(volume);
    
    if (options.loop !== undefined) sound.loop(options.loop);
    
    // Configurar posição espacial se necessário
    if (options.spatial && options.position) {
      sound.pos(options.position[0], options.position[1], options.position[2]);
    }
    
    // Tocar e retornar o ID para controle
    const id = sound.play();
    
    // Configurar eventos
    if (options.onEnd) {
      sound.once('end', options.onEnd, id);
    }
    
    // Armazenar para controle
    set(state => ({
      activeAudioIds: {
        ...state.activeAudioIds,
        [soundId]: [...(state.activeAudioIds[soundId] || []), id]
      }
    }));
    
    return id;
  },
  
  stopSound: (soundId, id) => {
    const sound = useAssetsStore.getState().getSound(soundId);
    if (!sound) return;
    
    if (id !== undefined) {
      sound.stop(id);
      
      // Remover do registro
      set(state => {
        const updatedIds = state.activeAudioIds[soundId]?.filter(activeId => activeId !== id) || [];
        return {
          activeAudioIds: {
            ...state.activeAudioIds,
            [soundId]: updatedIds
          }
        };
      });
    } else {
      sound.stop();
      
      // Limpar todos os IDs para este som
      set(state => ({
        activeAudioIds: {
          ...state.activeAudioIds,
          [soundId]: []
        }
      }));
    }
  },
  
  pauseSound: (soundId, id) => {
    const sound = useAssetsStore.getState().getSound(soundId);
    if (!sound) return;
    
    if (id !== undefined) {
      sound.pause(id);
    } else {
      sound.pause();
    }
  },
  
  setMasterVolume: (volume) => {
    set({ masterVolume: volume });
    Howler.volume(volume);
  },
  
  setSfxVolume: (volume) => {
    set({ sfxVolume: volume });
    
    // Atualizar volume dos efeitos ativos
    const soundCache = useAssetsStore.getState().soundCache;
    Object.entries(soundCache).forEach(([id, sound]) => {
      if (id.startsWith('UI_') || id.startsWith('NEON_')) {
        sound.volume(volume);
      }
    });
  },
  
  setMusicVolume: (volume) => {
    set({ musicVolume: volume });
    
    // Atualizar volume da música ambiente ativa
    const soundCache = useAssetsStore.getState().soundCache;
    Object.entries(soundCache).forEach(([id, sound]) => {
      if (id.startsWith('AMBIENT_')) {
        sound.volume(volume);
      }
    });
  },
  
  toggleMute: () => {
    const newMuted = !get().muted;
    set({ muted: newMuted });
    Howler.mute(newMuted);
  },
  
  // Cria um objeto THREE.PositionalAudio
  createSpatialSound: (soundId, listener, options = {}) => {
    const sound = useAssetsStore.getState().getSound(soundId);
    if (!sound || get().muted) return null;
    
    const positionalAudio = new THREE.PositionalAudio(listener);
    
    // Configurar parâmetros espaciais
    if (options.refDistance) positionalAudio.setRefDistance(options.refDistance);
    if (options.maxDistance) positionalAudio.setMaxDistance(options.maxDistance);
    if (options.rolloffFactor) positionalAudio.setRolloffFactor(options.rolloffFactor);
    
    // Outros parâmetros
    if (options.loop !== undefined) positionalAudio.setLoop(options.loop);
    if (options.volume !== undefined) positionalAudio.setVolume(options.volume);
    
    return positionalAudio;
  }
}));

export default useSoundStore;