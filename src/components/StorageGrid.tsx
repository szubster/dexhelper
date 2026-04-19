import { useNavigate } from '@tanstack/react-router';
import { Database, Monitor, Sparkles } from 'lucide-react';
import React, { useState } from 'react';
import type { PokemonInstance } from '../engine/saveParser/index';
import { useStore } from '../store';
import { cn } from '../utils/cn';
import { getGenerationConfig } from '../utils/generationConfig';

export function StorageGrid({ pokemonList }: { pokemonList: { id: number; name: string }[] }) {
  const saveData = useStore((s) => s.saveData);
  const navigate = useNavigate();

  const [activeLocation, setActiveLocation] = useState<string>('Party');

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
    const allPokemon = [...saveData.partyDetails, ...saveData.pcDetails];
    for (const p of allPokemon) {
      if (!p.storageLocation) continue;
      const pokemon = pokemonMap.get(p.speciesId);
      if (!pokemon) continue;

      let current = map.get(p.storageLocation);
      if (!current) {
        current = [];
        map.set(p.storageLocation, current);
      }
      current.push({ p, pokemon });
    }
    return map;
  }, [saveData, pokemonMap]);

  if (!saveData) return null;

  const genConfig = getGenerationConfig(saveData.generation);
  const storageLocations = [
    'Party',
    'Daycare',
    ...Array.from({ length: genConfig.boxCount }, (_, i) => `Box ${i + 1}`),
  ];

  const currentPokemonInLocation = pokemonByLocation.get(activeLocation) || [];

  return (
    <div className="fade-in flex animate-in flex-col gap-6 duration-500 lg:flex-row">
      {/* Sidebar for locations */}
      <div className="w-full shrink-0 space-y-2 lg:w-64">
        <div className="mb-4 flex items-center gap-2 border-white/10 border-b pb-4">
          <Database className="text-[var(--theme-primary)]" size={18} />
          <h2 className="font-black font-display text-white text-xl uppercase tracking-tight">Terminal</h2>
        </div>
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:pb-0">
          {storageLocations.map((location) => {
            const count = (pokemonByLocation.get(location) || []).length;
            const isActive = activeLocation === location;
            return (
              <button
                key={location}
                type="button"
                onClick={() => setActiveLocation(location)}
                className={cn(
                  'group flex shrink-0 items-center justify-between rounded-xl border px-4 py-3 text-left transition-all',
                  isActive
                    ? 'border-[var(--theme-primary)]/50 bg-[var(--theme-primary)]/10 text-white'
                    : 'border-white/5 bg-zinc-900/50 text-zinc-400 hover:bg-zinc-900 hover:text-white',
                )}
              >
                <div className="flex items-center gap-3">
                  <Monitor size={14} className={cn(isActive ? 'text-[var(--theme-primary)]' : 'text-zinc-600')} />
                  <span className="font-black text-[10px] uppercase tracking-widest">{location}</span>
                </div>
                <span
                  className={cn(
                    'rounded-full px-2 py-0.5 font-bold font-mono text-[10px]',
                    isActive ? 'bg-[var(--theme-primary)]/20 text-[var(--theme-primary)]' : 'bg-white/5 text-zinc-500',
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid for active location */}
      <div className="flex-1 space-y-6">
        <div className="flex items-center gap-4">
          <h3 className="font-black font-display text-2xl text-white uppercase tracking-tight">{activeLocation}</h3>
          <div className="h-px flex-1 bg-zinc-800" />
          <span className="font-black text-[10px] text-zinc-500 uppercase tracking-widest">
            {currentPokemonInLocation.length} Units Secured
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
          {currentPokemonInLocation.length === 0 ? (
            <div className="group col-span-full flex min-h-[300px] flex-col items-center justify-center rounded-3xl border-2 border-zinc-800/30 border-dashed bg-zinc-900/20 p-5 text-center transition-all duration-300 hover:border-zinc-700/50">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-zinc-800/50 bg-zinc-900/50 transition-transform group-hover:scale-110">
                <div className="h-6 w-6 animate-spin-slow rounded-full border-2 border-zinc-700/30 border-t-zinc-500/50" />
              </div>
              <span className="font-black text-[10px] text-zinc-600 uppercase italic tracking-[0.3em]">
                EMPTY SECTOR
              </span>
            </div>
          ) : (
            currentPokemonInLocation.map(({ p, pokemon }, idx) => {
              let cardStyle = 'bg-zinc-900 border border-zinc-800 hover:border-zinc-700 shadow-sm';
              if (p.isShiny) {
                cardStyle = 'bg-amber-900/10 border border-amber-500/30 hover:bg-amber-900/20';
              } else if (activeLocation === 'Party') {
                cardStyle = 'bg-red-900/10 border border-red-900/30 hover:bg-red-900/20';
              } else {
                cardStyle = 'bg-emerald-900/10 border border-emerald-900/30 hover:bg-emerald-900/20';
              }

              return (
                <button
                  type="button"
                  aria-label={`View details for ${pokemon.name} in ${activeLocation}`}
                  // biome-ignore lint/suspicious/noArrayIndexKey: Array index is stable and required for duplicates
                  key={`${activeLocation}-${p.speciesId}-${idx}`}
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
    </div>
  );
}
