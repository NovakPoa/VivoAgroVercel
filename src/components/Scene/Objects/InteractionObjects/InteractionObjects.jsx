import React from 'react';
import useInteractionStore from '../../../../stores/InteractionStore';
import AgroCoberturaInteraction from './AgroCobertura/AgroCoberturaInteraction';
/* import GestaoMaquinarioInteraction from './GestaoMaquinario/GestaoMaquinarioInteraction';
import GestaoPecuariaInteraction from './GestaoPecuaria/GestaoPecuariaInteraction';
import ClimaInteligenteInteraction from './ClimaInteligente/ClimaInteligenteInteraction';
import GestaoFazendaInteraction from './GestaoFazenda/GestaoFazendaInteraction'; */

const InteractionManager = () => {
  const { currentInteraction } = useInteractionStore();

  const renderProductInteraction = () => {
    switch (currentInteraction) {
      case 'agro-cobertura':
        return <AgroCoberturaInteraction />;
      case 'gestao-maquinario':
        return <GestaoMaquinarioInteraction />;
      case 'gestao-pecuaria':
        return <GestaoPecuariaInteraction />;
      case 'clima-inteligente':
        return <ClimaInteligenteInteraction />;
      case 'gestao-fazenda':
        return <GestaoFazendaInteraction />;
      default:
        return null;
    }
  };

  return (
    <>
      {renderProductInteraction()}
    </>
  );
};

export default InteractionManager;