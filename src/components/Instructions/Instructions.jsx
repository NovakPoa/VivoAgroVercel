import React from 'react';
import useProductsStore from '../../stores/ProductsStore';
import AgroCoberturaInstruction1 from './AgroCoberturaInstruction1';
import AgroCoberturaInstruction2 from './AgroCoberturaInstruction2';
import GestaoMaquinarioInstruction1 from './GestaoMaquinarioInstruction1';
import GestaoMaquinarioInstruction2 from './GestaoMaquinarioInstruction2';
import GestaoPecuariaInstruction1 from './GestaoPecuariaInstruction1';
import GestaoPecuariaInstruction2 from './GestaoPecuariaInstruction2';
import GestaoFazendaInstruction1 from './GestaoFazendaInstruction1';
import GestaoFazendaInstruction2 from './GestaoFazendaInstruction2';
import ClimaInteligenteInstruction1 from './ClimaInteligenteInstruction1';
import ClimaInteligenteInstruction2 from './ClimaInteligenteInstruction2';

const Instructions = () => {
  const { currentProduct, showFirstInstruction, showSecondInstruction } = useProductsStore();

  const instructionComponents = {
    'agro-cobertura': [AgroCoberturaInstruction1, AgroCoberturaInstruction2],
    'gestao-maquinario': [GestaoMaquinarioInstruction1, GestaoMaquinarioInstruction2],
    'gestao-pecuaria': [GestaoPecuariaInstruction1, GestaoPecuariaInstruction2],
    'clima-inteligente': [ClimaInteligenteInstruction1, ClimaInteligenteInstruction2],
    'gestao-fazenda': [GestaoFazendaInstruction1, GestaoFazendaInstruction2],
  };

  const [InstructionComponent1, InstructionComponent2] = instructionComponents[currentProduct] || [null, null];

  return (
    <div className="instructions-container">
      {InstructionComponent1 && showFirstInstruction && <InstructionComponent1 />}
      {InstructionComponent2 && showSecondInstruction && <InstructionComponent2 />}
    </div>
  );
};

export default Instructions;