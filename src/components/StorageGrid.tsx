import { useNavigate } from '@tanstack/react-router';
import { Sparkles } from 'lucide-react';
import React from 'react';
import type { PokemonInstance } from '../engine/saveParser/index';
import { useStore } from '../store';
import { getGenerationConfig } from '../utils/generationConfig';
import { PokemonSprite } from './pokemon/PokemonSprite';
import { TacticalCard } from './TacticalCard';

export function StorageGrid({ pokemonList }: { pokemonList: { id: number; name: string }[] }) {
  const saveData = useStore((s) => s.saveData);
  const navigate = useNavigate();

  const pokemonMap = React.useMemo(() => {
    const map = new Map<number, { id: number; name: string }>();
    pokemonList.forEach((p) => {
      map.set(p.id, p);
    });
    return map;
  }, [pokemonList]);

  const pokemonByLocation = React.useMemo(() => {
    const map = new Map<string, { p: PokemonInstance; pokemon: { id: number; name: string } }[]>();
    if (!saveData) return map;

    // Group all pokemon by their storage location in a single pass O(N)
    let lastLocation: string | undefined;
    let currentArray: { p: PokemonInstance; pokemon: { id: number; name: string } }[] | undefined;

    const processArray = (arr: PokemonInstance[]) => {
      for (const p of arr) {
        if (!p.storageLocation) continue;
        const pokemon = pokemonMap.get(p.speciesId);
        if (!pokemon) continue;

        if (p.storageLocation !== lastLocation || currentArray === undefined) {
          currentArray = map.get(p.storageLocation);
          if (!currentArray) {
            currentArray = [];
            map.set(p.storageLocation, currentArray);
          }
          lastLocation = p.storageLocation;
        }
        currentArray.push({ p, pokemon });
      }
    };

    processArray(saveData.partyDetails);
    processArray(saveData.pcDetails);

    return map;
  }, [saveData, pokemonMap]);

  if (!saveData) return null;

  const genConfig = getGenerationConfig(saveData.generation);
  const storageLocations = [
    'Party',
    'Daycare',
    ...Array.from({ length: genConfig.boxCount }, (_, i) => `Box ${i + 1}`),
  ];

  return (
    <div className="fade-in animate-in space-y-16 duration-500">
      {storageLocations.map((location) => {
        const pokemonInLocation = pokemonByLocation.get(location) || [];

        return (
          <div key={location} className="slide-in-from-bottom-4 animate-in space-y-8 duration-500">
            <div className="flex items-center gap-6">
              <h2 className="font-black font-display text-3xl text-white uppercase tracking-tight">{location}</h2>
              <div className="h-px flex-1 bg-zinc-900"></div>
              <span className="font-black text-[10px] text-zinc-600 uppercase tracking-widest">
                {pokemonInLocation.length} Units
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {pokemonInLocation.length === 0 ? (
                <div className="group flex min-h-[180px] flex-col items-center justify-center rounded-3xl border-2 border-zinc-800/30 border-dashed bg-zinc-900/20 p-5 text-center transition-all duration-300 hover:border-zinc-700/50">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-zinc-800/50 bg-zinc-900/50 transition-transform group-hover:scale-110">
                    <div className="h-6 w-6 animate-spin-slow rounded-full border-2 border-zinc-700/30 border-t-zinc-500/50" />
                  </div>
                  <span className="font-black text-[10px] text-zinc-600 uppercase italic tracking-[0.3em]">EMPTY</span>
                </div>
              ) : (
                pokemonInLocation.map(({ p, pokemon }, idx) => {
                  let variant: 'storage-default' | 'storage-emerald' | 'storage-amber' | 'storage-red' =
                    'storage-default';
                  if (p.isShiny) {
                    variant = 'storage-amber';
                  } else if (location === 'Party') {
                    variant = 'storage-red';
                  } else {
                    variant = 'storage-emerald';
                  }

                  return (
                    <TacticalCard
                      ariaLabel={`View details for ${pokemon.name} in ${location}`}
                      // biome-ignore lint/suspicious/noArrayIndexKey: Array index is stable and required for duplicates
                      key={`${location}-${p.speciesId}-${idx}`}
                      onClick={() => navigate({ to: `/pokemon/${pokemon.id}`, search: { from: '/storage' } })}
                      variant={variant}
                    >
                      <div className="absolute top-3 left-3 font-bold font-mono text-[10px] text-zinc-600">
                        LV.{p.level}
                      </div>
                      <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
                        {p.isShiny && <Sparkles size={14} className="text-amber-400 drop-shadow-sm" />}
                        {p.otName && (
                          <div className="max-w-[60px] truncate rounded border border-zinc-800 bg-zinc-950 px-1.5 py-0.5 font-black text-[8px] text-zinc-500">
                            {p.otName}
                          </div>
                        )}
                      </div>
                      <div className="relative mb-4 flex h-20 w-20 items-center justify-center sm:h-24 sm:w-24">
                        <PokemonSprite
                          pokemonId={pokemon.id}
                          generation={saveData?.generation ?? 1}
                          isShiny={p.isShiny}
                          alt={pokemon.name}
                          className="h-full w-full object-contain drop-shadow-xl"
                        />
                      </div>
                      <div className="w-full truncate px-1 text-center font-bold text-[10px] text-zinc-100 uppercase tracking-wider">
                        {pokemon.name}
                      </div>
                    </TacticalCard>
                  );
                })
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
