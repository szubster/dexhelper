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
          <div key={location} className="slide-in-from-bottom-4 animate-in space-y-6 duration-500">
            {/* Tactical Location Header */}
            <div className="flex items-end justify-between border-white/10 border-b border-dashed pb-2">
              <div className="flex items-center gap-4">
                <div className="flex h-6 w-6 items-center justify-center border border-[var(--theme-primary)]/30 bg-[var(--theme-primary)]/10">
                  <div className="h-1.5 w-1.5 animate-pulse bg-[var(--theme-primary)]" />
                </div>
                <h2 className="font-black font-mono text-white text-xl uppercase tracking-widest">
                  [ SYS.{location.replace(' ', '_').toUpperCase()} ]
                </h2>
              </div>
              <span className="font-black font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                VOL: {pokemonInLocation.length.toString().padStart(2, '0')}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {pokemonInLocation.length === 0 ? (
                <div className="group relative col-span-full flex min-h-[140px] flex-col items-center justify-center rounded-none border border-white/5 border-dashed bg-zinc-900/20 p-5 text-center transition-all duration-300 hover:border-white/10">
                  <div className="scanline-overlay pointer-events-none absolute inset-0 opacity-5" />
                  <div className="mb-4 flex h-10 w-10 items-center justify-center border border-white/10 bg-black/40 transition-transform group-hover:scale-110">
                    <div className="h-4 w-4 animate-spin-slow border-2 border-zinc-600 border-t-zinc-400 border-dashed" />
                  </div>
                  <span className="font-black font-mono text-[10px] text-zinc-600 uppercase tracking-[0.4em]">
                    NO_DATA_FOUND
                  </span>
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
                      title={`View details for ${pokemon.name} in ${location}`}
                      // biome-ignore lint/suspicious/noArrayIndexKey: Array index is stable and required for duplicates
                      key={`${location}-${p.speciesId}-${idx}`}
                      onClick={() => navigate({ to: `/pokemon/${pokemon.id}`, search: { from: '/storage' } })}
                      variant={variant}
                    >
                      <div className="absolute top-3 left-3 font-black font-mono text-[9px] text-zinc-500 tracking-wider">
                        LV.{p.level.toString().padStart(3, '0')}
                      </div>
                      <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
                        {p.isShiny && <Sparkles size={14} className="animate-pulse text-amber-400 drop-shadow-sm" />}
                        {p.otName && (
                          <div className="max-w-[60px] truncate border border-zinc-700 border-dashed bg-black/60 px-1.5 py-0.5 font-black font-mono text-[8px] text-zinc-400 uppercase">
                            {p.otName}
                          </div>
                        )}
                      </div>

                      <div className="relative mt-4 mb-3 flex aspect-square w-20 items-center justify-center overflow-hidden border border-white/5 bg-black/40 transition-colors group-hover:bg-black/60 sm:w-24">
                        {/* Sprite scanner overlay */}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[var(--theme-primary)]/10 to-transparent opacity-0 transition-opacity group-hover:animate-[scan_2s_linear_infinite] group-hover:opacity-100" />

                        <PokemonSprite
                          pokemonId={pokemon.id}
                          generation={saveData?.generation ?? 1}
                          isShiny={p.isShiny}
                          alt={pokemon.name}
                          className="z-10 h-[80%] w-[80%] object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="w-full truncate border border-white/5 bg-black/40 px-2 py-1 text-center font-black font-mono text-[9px] text-zinc-300 uppercase tracking-widest">
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
