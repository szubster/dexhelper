import type React from 'react';
import { PokeblockProvider } from '../../contexts/pokeblock/PokeblockContext';
import { PokeblockRecommendationDisplay } from './PokeblockRecommendationDisplay';
import { PokeblockSelectionForm } from './PokeblockSelectionForm';

export const PokeblockOptimizerPanel: React.FC = () => {
  return (
    <PokeblockProvider>
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4">
        <div className="flex items-center gap-3 border-b border-dashed border-blue-900 pb-2">
          <div className="h-2 w-2 animate-pulse bg-blue-500" />
          <h2 className="font-mono text-xl font-bold text-blue-400">POKEBLOCK OPTIMIZER</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <PokeblockSelectionForm />
          <PokeblockRecommendationDisplay />
        </div>
      </div>
    </PokeblockProvider>
  );
};
