import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export function useGLTFAnimations(modelPath, options = {}) {
  const {
    cloneScene = true
  } = options;

  // Carrega o modelo 
  const { scene: originalScene, animations } = useGLTF(modelPath);
  
  // Clona a cena se necessário
  const scene = useMemo(() => {
    if (!originalScene) return null;
    return cloneScene ? originalScene.clone() : originalScene;
  }, [originalScene, cloneScene]);
  
  // Referências
  const mixerRef = useRef(null);
  const actionsRef = useRef({});
  const callbacksRef = useRef({});
  const batchRef = useRef(new Map());
  
  // Estados minimizados para evitar re-renders
  const [activeAnimations, setActiveAnimations] = useState(new Set());

  // Setup inicial do mixer e ações
  useEffect(() => {
    if (!scene || !animations || animations.length === 0) return;
    
    const mixer = new THREE.AnimationMixer(scene);
    mixerRef.current = mixer;
    
    const actionMap = {};
    animations.forEach(clip => {
      const action = mixer.clipAction(clip);
      actionMap[clip.name] = action;
      //console.log(`Animação "${clip.name}" carregada.`);
    });
    
    actionsRef.current = actionMap;
    
    // Handler para eventos finished
    const handleFinish = (e) => {
      const clipName = e.action._clip.name;
      
      // Remover do set de animações ativas
      setActiveAnimations(prev => {
        const newSet = new Set(prev);
        newSet.delete(clipName);
        return newSet;
      });
      
      // Verificar se é parte de um lote de playAll
      if (batchRef.current.size > 0) {
        // Só executa este código se houver lotes registrados
        for (const [batchId, data] of batchRef.current.entries()) {
          if (data.animations.has(clipName)) {
            data.animations.delete(clipName);
            
            // Se foi a última animação do lote, chamar o callback
            if (data.animations.size === 0 && data.onFinish) {
              data.onFinish({ type: 'batchComplete', batchId });
              batchRef.current.delete(batchId);
            }
            break;
          }
        }
      }
      
      // Executar callback específico para esta animação (se existir)
      const callback = callbacksRef.current[clipName];
      if (callback) {
        callback({ ...e, clipName });
        delete callbacksRef.current[clipName];
      }
    };
    
    mixer.addEventListener('finished', handleFinish);
    
    return () => {
      mixer.removeEventListener('finished', handleFinish);
      mixer.stopAllAction();
      mixer.uncacheRoot(scene);
      batchRef.current.clear();
    };
  }, [scene, animations]);

  useFrame((_, delta) => {
    if (mixerRef.current && activeAnimations.size > 0) {
      mixerRef.current.update(delta);
    }
  });

  const configAndPlayAction = useCallback((animName, action, options = {}) => {
    const {
      loop = false,
      clampWhenFinished = true,
      repetitions = Infinity,
      timeScale = 1.0,
      startOffset = 0,
      onFinish = null,
      batchId = null
    } = options;
    
    if (loop) {
      action.setLoop(THREE.LoopRepeat, repetitions);
    } else {
      action.setLoop(THREE.LoopOnce);
      action.clampWhenFinished = clampWhenFinished;
    }
    
    action.timeScale = timeScale;
    
    if (onFinish && !batchId) {
      callbacksRef.current[animName] = onFinish;
    }

    action.reset();

    if (startOffset > 0 && startOffset <= 1) {
      const duration = action._clip.duration;
      if (timeScale < 0) {
        action.time = duration * (1 - startOffset);
      } else {
        action.time = duration * startOffset;
      }
    } else if (timeScale < 0) {
      // Se não tem offset mas é reversa
      action.time = action._clip.duration;
    }
    
    action.play();
  
    setActiveAnimations(prev => new Set([...prev, animName]));
  }, []);
  
  // play - tocar animação específica
  const play = useCallback((name, options = {}) => {
    if (!mixerRef.current || !name) {
      console.warn('É necessário fornecer um nome de animação para play()');
      return;
    }
    
    const action = actionsRef.current[name];
    if (action) {
      configAndPlayAction(name, action, options);
    } else {
      console.warn(`Animação "${name}" não encontrada no modelo.`);
    }
  }, [configAndPlayAction]);

  // playAll - tocar todas as animações
  const playAll = useCallback((options = {}) => {
    if (!mixerRef.current) return;
    
    const { onFinish, ...restOptions } = options;
    
    // Criar um ID de lote único se tiver callback
    const batchId = onFinish ? Date.now() + Math.random() : null;
    const animationNames = Object.keys(actionsRef.current);
    
    if (batchId) {
      // Registrar animações iniciadas neste lote
      batchRef.current.set(batchId, { 
        animations: new Set(animationNames),
        onFinish 
      });
    }
    
    // Iniciar todas as animações com o mesmo ID de lote
    Object.entries(actionsRef.current).forEach(([animName, action]) => {
      configAndPlayAction(animName, action, { 
        ...restOptions,
        batchId
      });
    });
  }, [configAndPlayAction]);

  // stop - parar apenas uma animação específica
  const stop = useCallback((name) => {
    if (!mixerRef.current) {
      return;
    }
    
    if (!name) {
      console.warn('É necessário fornecer um nome de animação para stop()');
      return;
    }
    
    const action = actionsRef.current[name];
    if (action) {
      action.stop();
      
      // Remover callbacks associados
      if (callbacksRef.current[name]) {
        delete callbacksRef.current[name];
      }
      
      // Remover das animações ativas
      setActiveAnimations(prev => {
        const newSet = new Set(prev);
        newSet.delete(name);
        return newSet;
      });
      
      // Remover de qualquer lote de playAll
      for (const [batchId, data] of batchRef.current.entries()) {
        if (data.animations.has(name)) {
          data.animations.delete(name);
        }
      }
    } else {
      console.warn(`Tentativa de parar animação "${name}" que não existe.`);
    }
  }, []);

  // stopAll - parar todas as animações
  const stopAll = useCallback(() => {
    if (!mixerRef.current) return;
    
    // Parar todas as animações
    Object.values(actionsRef.current).forEach(action => {
      action.stop();
    });
    
    // Limpar todos os callbacks
    callbacksRef.current = {};
    
    // Limpar todos os lotes
    batchRef.current.clear();
    
    // Limpar animações ativas
    setActiveAnimations(new Set());
  }, []);

  const jumpToEnd = useCallback((name) => {
    if (!mixerRef.current || !name) {
      console.warn('É necessário fornecer um nome de animação para jumpToEnd()');
      return;
    }
        
    const action = actionsRef.current[name];
    if (!action) {
      console.warn(`Animação "${name}" não encontrada no modelo.`);
      return;
    }
    
    // Parar a animação atual se estiver rodando
    stop(name);
    
    // Definir para o último frame e aplicar uma única atualização
    action.time = action._clip.duration;
    action.play();
    action.paused = true;
    mixerRef.current.update(0.01);
    action.stop();
    
  }, [stop]);

  return {
    scene,
    isPlaying: activeAnimations.size > 0,
    activeAnimations: [...activeAnimations],
    availableAnimations: Object.keys(actionsRef.current),
    play,   
    playAll, 
    stop,  
    stopAll,
    jumpToEnd
  };
}