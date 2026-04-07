import React from 'react';
import { Sparkles } from 'lucide-react';
import { useStore } from '../store';
import { useNavigate } from '@tanstack/react-router';
import { getGenerationConfig } from '../utils/generationConfig';
import type { PokemonInstance } from '../engine/saveParser/index';

export function StorageGrid({ pokemonList }: { pokemonList: { id: number; name: string }[] }) {
  const saveData = useStore((s) => s.saveData);
  const navigate = useNavigate();

  const pokemonMap = React.useMemo(() => {
    const map = new Map<number, { id: number; name: string }>();
    pokemonList.forEach(p => map.set(p.id, p));
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
  const storageLocations = ['Party', 'Daycare', ...Array.from({ length: genConfig.boxCount }, (_, i) => `Box ${i + 1}`)];

  return (
    <div className="space-y-16 animate-in fade-in duration-500">
      {storageLocations.map(location => {
        const pokemonInLocation = pokemonByLocation.get(location) || [];

        return (
          <div key={location} className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-6">
              <h2 className="text-3xl font-display font-black uppercase tracking-tight text-white">{location}</h2>
              <div className="h-px flex-1 bg-zinc-900"></div>
              <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{pokemonInLocation.length} Units</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {pokemonInLocation.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-5 rounded-3xl bg-zinc-900/20 border-2 border-dashed border-zinc-800/30 text-center min-h-[180px] group transition-all duration-300 hover:border-zinc-700/50">
                  <div className="w-12 h-12 rounded-full bg-zinc-900/50 flex items-center justify-center mb-3 border border-zinc-800/50 group-hover:scale-110 transition-transform">
                    <div className="w-6 h-6 border-2 border-zinc-700/30 rounded-full border-t-zinc-500/50 animate-spin-slow" />
                  </div>
                  <span className="text-zinc-600 font-black tracking-[0.3em] uppercase text-[10px] italic">EMPTY</span>
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
                    <div
                      key={`${location}-${p.speciesId}-${idx}`}
                      onClick={() => navigate({ to: `/pokemon/${pokemon.id}`, search: { from: '/storage' } })}
                      className={`relative flex flex-col items-center p-5 rounded-2xl transition-all duration-200 cursor-pointer hover:-translate-y-1 active:scale-95 ${cardStyle}`}
                    >
                      <div className="absolute top-3 left-3 text-[10px] font-mono font-bold text-zinc-600">LV.{p.level}</div>
                      <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
                        {p.isShiny && <Sparkles size={14} className="text-amber-400 drop-shadow-sm" />}
                        {p.otName && <div className="text-[8px] font-black text-zinc-500 bg-zinc-950 px-1.5 py-0.5 rounded border border-zinc-800 truncate max-w-[60px]">{p.otName}</div>}
                      </div>
                      <div className="w-20 h-20 sm:w-24 sm:h-24 mb-4 flex items-center justify-center relative">
                        <img
                          src={genConfig.spriteUrl(pokemon.id, p.isShiny)}
                          alt={pokemon.name}
                          className="w-full h-full object-contain drop-shadow-xl pixelated"
                          style={{ imageRendering: 'pixelated' }}
                        />
                      </div>
                      <div className="text-center font-bold uppercase tracking-wider text-[10px] text-zinc-100 truncate w-full px-1">{pokemon.name}</div>
                    </div>
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
