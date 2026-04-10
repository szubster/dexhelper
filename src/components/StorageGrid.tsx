import { useNavigate } from '@tanstack/react-router';
import { Sparkles } from 'lucide-react';
import React from 'react';
import type { PokemonInstance } from '../engine/saveParser/index';
import { useStore } from '../store';
import { getGenerationConfig } from '../utils/generationConfig';

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
    const map = new Map<string, PokemonInstance[]>();
    if (!saveData) return map;

    // Group all pokemon by their storage location in a single pass O(N)
    const allPokemon = [...saveData.partyDetails, ...saveData.pcDetails];
    for (const p of allPokemon) {
      if (!p.storageLocation) continue;
      let current = map.get(p.storageLocation);
      if (!current) {
        current = [];
        map.set(p.storageLocation, current);
      }
      current.push(p);
    }
    return map;
  }, [saveData]);

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
                pokemonInLocation.map((p, idx) => {
                  const pokemon = pokemonMap.get(p.speciesId);
                  if (!pokemon) return null;

                  let cardStyle = 'bg-zinc-900 border border-zinc-800 hover:border-zinc-700 shadow-sm';
                  if (p.isShiny) {
                    cardStyle = 'bg-amber-900/10 border border-amber-500/30 hover:bg-amber-900/20';
                  } else if (location === 'Party') {
                    cardStyle = 'bg-red-900/10 border border-red-900/30 hover:bg-red-900/20';
                  } else {
                    cardStyle = 'bg-emerald-900/10 border border-emerald-900/30 hover:bg-emerald-900/20';
                  }

                  return (
                    <button
                      type="button"
                      // biome-ignore lint/suspicious/noArrayIndexKey: Array index is stable and required for duplicates
                      key={`${location}-${p.speciesId}-${idx}`}
                      onClick={() => navigate({ to: `/pokemon/${pokemon.id}`, search: { from: '/storage' } })}
                      className={`relative flex w-full cursor-pointer flex-col items-center rounded-2xl p-5 text-left transition-all duration-200 hover:-translate-y-1 active:scale-95 ${cardStyle}`}
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
                        <img
                          src={genConfig.spriteUrl(pokemon.id, p.isShiny)}
                          alt={pokemon.name}
                          className="pixelated h-full w-full object-contain drop-shadow-xl"
                          style={{ imageRendering: 'pixelated' }}
                        />
                      </div>
                      <div className="w-full truncate px-1 text-center font-bold text-[10px] text-zinc-100 uppercase tracking-wider">
                        {pokemon.name}
                      </div>
                    </button>
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
