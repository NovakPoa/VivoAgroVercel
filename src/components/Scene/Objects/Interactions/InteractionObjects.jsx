import React from 'react';
import useInteractionStore from '../../../../stores/InteractionStore';
import useProductsStore from '../../../../stores/ProductsStore';

import AgroCoberturaInteraction from '../../../Products/AgroCobertura/Interaction/AgroCoberturaInteraction';
//import GestaoMaquinarioInteraction from '../../Products/GestaoMaquinario/Interaction/GestaoMaquinarioInteraction';
// ... outros imports

const InteractionObjects = () => {
  const { currentInteraction } = useInteractionStore();
  const { currentProduct, showInteraction } = useProductsStore();

  const interactionComponents = {
    'agro-cobertura': AgroCoberturaInteraction,
    //'gestao-maquinario': GestaoMaquinarioInteraction,
    // ... outros mapeamentos
  };

  const CurrentInteraction = interactionComponents[currentProduct];
  
  return CurrentInteraction && showInteraction ? <CurrentInteraction /> : null;
};

export default InteractionObjects;