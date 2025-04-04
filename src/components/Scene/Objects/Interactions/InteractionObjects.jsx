import React from 'react';
import useInteractionStore from '../../../../stores/InteractionStore';

import AgroCoberturaInteraction from '../../../Products/AgroCobertura/Interaction/AgroCoberturaInteraction';
//import GestaoMaquinarioInteraction from '../../Products/GestaoMaquinario/Interaction/GestaoMaquinarioInteraction';
// ... outros imports

const InteractionObjects = () => {
  const { currentInteraction } = useInteractionStore();

  const interactionComponents = {
    'agro-cobertura': AgroCoberturaInteraction,
    //'gestao-maquinario': GestaoMaquinarioInteraction,
    // ... outros mapeamentos
  };

  const CurrentInteraction = interactionComponents[currentInteraction];
  
  return CurrentInteraction ? <CurrentInteraction /> : null;
};

export default InteractionObjects;