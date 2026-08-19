import { Ghost } from 'lucide-react';
import type { PokemonInstance } from '@dexhelper/engine/saveParser/parsers/common';
import { CornerCrosshairs } from '../CornerCrosshairs';
import { EmptyState } from '../EmptyState';
import { PokemonSprite } from '../pokemon/PokemonSprite';
import { TacticalPanel } from '../TacticalPanel';
import { TelemetryDecoration } from '../TelemetryDecoration';

export interface GraveyardViewProps {
  graveyard: PokemonInstance[];
  generation: number;
}

export function GraveyardView({ graveyard, generation }: GraveyardViewProps) {
  return (
    <TacticalPanel variant="default" className="mb-6 flex flex-col gap-3 p-4 sm:p-6">
      <TelemetryDecoration label="SYS.GRAVEYARD" className="-top-3 left-4" />
      <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
        {graveyard.map((pokemon, idx) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: Graveyard members might not have unique identifiers
            key={`grave-${idx}-${pokemon.speciesId}`}
            className="group relative flex flex-col items-center rounded-none border border-zinc-900/50 border-dashed bg-zinc-950/20 p-3 opacity-80 grayscale transition-colors hover:border-zinc-500/50"
          >
            <CornerCrosshairs className="h-1.5 w-1.5 border-zinc-700/50 transition-colors group-hover:border-zinc-500" />

            <div className="relative mb-2 h-16 w-16">
              <PokemonSprite
                pokemonId={pokemon.speciesId}
                generation={generation}
                isShiny={pokemon.isShiny}
                className="h-full w-full object-contain"
              />
            </div>
            <div className="flex w-full flex-col items-center">
              <span className="w-full truncate text-center font-bold text-[10px] text-zinc-400 uppercase tracking-wider">
                {pokemon.otName ? pokemon.otName : `ID: ${pokemon.speciesId.toString().padStart(3, '0')}`}
              </span>
              <div className="mt-1 flex w-full items-center justify-between px-1">
                <span className="font-mono text-[9px] text-zinc-600">LVL {pokemon.level}</span>
                <span className="font-bold font-mono text-[9px] text-red-900/70">DEAD</span>
              </div>
            </div>
          </div>
        ))}
        {graveyard.length === 0 && (
          <EmptyState
            label="NO CASUALTIES RECORDED"
            icon={<Ghost className="h-8 w-8" />}
            className="p-8"
            labelClassName="tactical-text font-bold text-sm"
          />
        )}
      </div>
    </TacticalPanel>
  );
}
