import { create } from 'zustand';
import useAssetsStore from './AssetsStore';

const useSoundStore = create((set, get) => ({
  masterVolume: 0.8,
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
  
  toggleMute: () => {
    const newMuted = !get().muted;
    set({ muted: newMuted });
    Howler.mute(newMuted);
  },
  
}));

export default useSoundStore;