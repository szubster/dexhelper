import type { PokemonInstance } from '../../engine/saveParser/index';
import type { GenerationConfig } from '../../utils/generationConfig';
import { EmptyLocation } from './EmptyLocation';
import { StorageCard } from './StorageCard';

interface StorageLocationSectionProps {
  location: string;
  pokemonInLocation: PokemonInstance[];
  pokemonMap: Map<number, { id: number; name: string }>;
  genConfig: GenerationConfig;
}

export function StorageLocationSection({
  location,
  pokemonInLocation,
  pokemonMap,
  genConfig,
}: StorageLocationSectionProps) {
  return (
    <div className="slide-in-from-bottom-4 animate-in space-y-8 duration-500">
      <div className="flex items-center gap-6">
        <h2 className="font-black font-display text-3xl text-white uppercase tracking-tight">{location}</h2>
        <div className="h-px flex-1 bg-zinc-900"></div>
        <span className="font-black text-[10px] text-zinc-600 uppercase tracking-widest">
          {pokemonInLocation.length} Units
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {pokemonInLocation.length === 0 ? (
          <EmptyLocation />
        ) : (
          pokemonInLocation.map((p, idx) => {
            const pokemon = pokemonMap.get(p.speciesId);
            if (!pokemon) return null;

            return (
              <StorageCard
                // biome-ignore lint/suspicious/noArrayIndexKey: Array index is stable and required for duplicates
                key={`${location}-${p.speciesId}-${idx}`}
                pokemonInstance={p}
                pokemon={pokemon}
                location={location}
                spriteUrl={genConfig.spriteUrl(pokemon.id, p.isShiny)}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
