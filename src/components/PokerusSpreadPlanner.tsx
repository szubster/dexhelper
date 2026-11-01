import { PokerusBadge, TacticalIconButton } from '@dexhelper/ui';
import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useMemo } from 'react';
import type { PokemonInstance } from '../engine/saveParser/parsers/common';
import { usePokerusSpreadPlanner } from '../hooks/usePokerusSpreadPlanner';
import { cn } from '../utils/cn';

interface PokerusSpreadPlannerProps {
  initialParty: (PokemonInstance | null)[];
  className?: string;
}

// ⚡ Bolt: Wrapped in React.memo and pre-built atRiskSet to convert atRiskIndices.includes scans to O(1) Set lookups.
function PokerusSpreadPlannerComponent({ initialParty, className }: PokerusSpreadPlannerProps) {
  const { party, swapSlots, atRiskIndices } = usePokerusSpreadPlanner(initialParty);

  const atRiskSet = useMemo(() => new Set(atRiskIndices), [atRiskIndices]);

  return (
    <div className={cn('tactical-panel flex flex-col gap-2 p-4', className)}>
      <h2 className="mb-2 border-b border-dashed border-zinc-800 pb-2 text-sm font-bold uppercase">
        Pokérus Spread Planner
      </h2>

      {party.some((p) => p?.pokerus && p.pokerus.daysRemaining > 0) && (
        <div className="mb-4 flex items-center justify-between border border-dashed border-yellow-500/50 bg-yellow-500/10 px-2 py-1 text-xs text-yellow-400">
          <span>
            <span aria-hidden="true">[</span>WARNING<span aria-hidden="true">]</span>
          </span>
          <span>Clock approaching midnight. Curing possible.</span>
        </div>
      )}

      <div className="flex flex-col gap-2">
        {party.map((pokemon, index) => {
          const isAtRisk = atRiskSet.has(index);
          const hasPokerus = pokemon?.pokerus !== undefined;
          const isContagious = pokemon?.pokerus && pokemon.pokerus.daysRemaining > 0;
          const isCured = pokemon?.pokerus && pokemon.pokerus.daysRemaining === 0;

          return (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: order is semantically fixed to 6 party slots
              key={index}
              className={cn(
                'flex items-center justify-between border border-dashed border-zinc-800 p-2',
                isAtRisk && 'border-pink-500/50 bg-pink-500/10',
                isContagious && 'border-pink-500/80',
                isCured && 'border-zinc-700',
              )}
            >
              <div className="flex items-center gap-4">
                <span className="w-4 text-zinc-500">#{index + 1}</span>
                <span className="font-bold">
                  {pokemon ? pokemon.nickname || `Species ${pokemon.speciesId}` : '--- EMPTY ---'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {isAtRisk && (
                  <span className="tactical-text text-[10px] text-pink-400">
                    <span aria-hidden="true">[</span>AT RISK<span aria-hidden="true">]</span>
                  </span>
                )}
                {hasPokerus && pokemon.pokerus && (
                  <PokerusBadge strain={pokemon.pokerus.strain} daysRemaining={pokemon.pokerus.daysRemaining} />
                )}
                {pokemon && index > 0 && (
                  <TacticalIconButton
                    onClick={() => swapSlots(index, index - 1)}
                    className="ml-2 !p-1"
                    aria-label={`Move ${pokemon.nickname || `Species ${pokemon.speciesId}`} up`}
                    title={`Move ${pokemon.nickname || `Species ${pokemon.speciesId}`} up`}
                  >
                    <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />
                  </TacticalIconButton>
                )}
                {pokemon && index < 5 && (
                  <TacticalIconButton
                    onClick={() => swapSlots(index, index + 1)}
                    className="ml-1 !p-1"
                    aria-label={`Move ${pokemon.nickname || `Species ${pokemon.speciesId}`} down`}
                    title={`Move ${pokemon.nickname || `Species ${pokemon.speciesId}`} down`}
                  >
                    <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                  </TacticalIconButton>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const PokerusSpreadPlanner = React.memo(PokerusSpreadPlannerComponent);
