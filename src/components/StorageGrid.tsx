import { useNavigate } from '@tanstack/react-router';
import { Sparkles } from 'lucide-react';
import React from 'react';
import type { PokemonInstance } from '../engine/saveParser/index';
import { useStore } from '../store';
import { getGenerationConfig } from '../utils/generationConfig';
import { PokemonSprite } from './pokemon/PokemonSprite';

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

  return (
    <div className="fade-in animate-in space-y-16 duration-500">
      {storageLocations.map((location) => {
        const pokemonInLocation = pokemonByLocation.get(location) || [];

        return (
          <div key={location} className="slide-in-from-bottom-4 animate-in space-y-8 duration-500">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 rounded-full border border-[var(--theme-primary)]/20 bg-[var(--theme-primary)]/10 px-3 py-1">
                <div className="h-2 w-2 animate-pulse rounded-full bg-[var(--theme-primary)]" />
                <h2 className="font-black font-mono text-[11px] text-[var(--theme-primary)] uppercase tracking-widest">
                  SYS.DIR {'//'} {location}
                </h2>
              </div>
              <div className="h-px flex-1 border-white/10 border-t border-dashed"></div>
              <div className="flex items-center gap-1.5 rounded-sm border border-zinc-800 bg-zinc-900/50 px-2 py-1">
                <span className="font-black text-[9px] text-zinc-500 uppercase tracking-widest">VOL</span>
                <span className="font-black font-mono text-[10px] text-zinc-300">
                  {pokemonInLocation.length.toString().padStart(2, '0')}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {pokemonInLocation.length === 0 ? (
                <div className="group relative flex min-h-[180px] flex-col items-center justify-center rounded-none border border-zinc-800/50 border-dashed bg-zinc-950/40 p-5 text-center transition-all duration-300 hover:border-zinc-700/50">
                  {/* Empty state crosshairs */}
                  <div className="absolute top-0 left-0 h-2 w-2 border-zinc-800 border-t-2 border-l-2" />
                  <div className="absolute top-0 right-0 h-2 w-2 border-zinc-800 border-t-2 border-r-2" />
                  <div className="absolute bottom-0 left-0 h-2 w-2 border-zinc-800 border-b-2 border-l-2" />
                  <div className="absolute right-0 bottom-0 h-2 w-2 border-zinc-800 border-r-2 border-b-2" />

                  <div className="relative mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-zinc-800/50 bg-black/40">
                    <div className="absolute inset-0 animate-spin-slow rounded-full border border-zinc-800 border-dashed" />
                    <div className="h-1 w-1 rounded-full bg-zinc-700" />
                  </div>
                  <span className="font-black font-mono text-[10px] text-zinc-600 uppercase tracking-[0.3em]">
                    [ NO SIGNAL ]
                  </span>
                </div>
              ) : (
                pokemonInLocation.map(({ p, pokemon }, idx) => {
                  let cardStyle = 'border-white/20 bg-zinc-900/50 hover:border-white/40 hover:bg-zinc-800/80';
                  let statusBadge = null;

                  if (p.isShiny) {
                    cardStyle = 'border-amber-500/50 bg-amber-950/20 hover:border-amber-400 hover:bg-amber-900/30';
                    statusBadge = (
                      <div className="flex items-center gap-1 rounded-sm border border-amber-500/20 bg-amber-500/10 px-1 py-0.5">
                        <Sparkles size={8} className="text-amber-400" />
                        <span className="font-black text-[7px] text-amber-400 uppercase tracking-tighter">ANOMALY</span>
                      </div>
                    );
                  } else if (location === 'Party') {
                    cardStyle = 'border-rose-500/50 bg-rose-950/20 hover:border-rose-400 hover:bg-rose-900/30';
                    statusBadge = (
                      <div className="flex items-center gap-1 rounded-sm border border-rose-500/20 bg-rose-500/10 px-1 py-0.5">
                        <div className="h-1 w-1 animate-pulse rounded-full bg-rose-500" />
                        <span className="font-black text-[7px] text-rose-400 uppercase tracking-tighter">ACTIVE</span>
                      </div>
                    );
                  } else {
                    cardStyle =
                      'border-emerald-500/50 bg-emerald-950/20 hover:border-emerald-400 hover:bg-emerald-900/30';
                  }

                  return (
                    <button
                      type="button"
                      aria-label={`View details for ${pokemon.name} in ${location}`}
                      // biome-ignore lint/suspicious/noArrayIndexKey: Array index is stable and required for duplicates
                      key={`${location}-${p.speciesId}-${idx}`}
                      onClick={() => navigate({ to: `/pokemon/${pokemon.id}`, search: { from: '/storage' } })}
                      className={`group relative flex w-full cursor-pointer flex-col rounded-none border border-dashed p-4 text-left transition-all duration-500 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 active:scale-[0.98] ${cardStyle}`}
                    >
                      {/* Corner Crosshairs */}
                      <div className="absolute top-0 left-0 h-2 w-2 border-white/40 border-t-2 border-l-2 transition-colors group-hover:border-[var(--theme-primary)]" />
                      <div className="absolute top-0 right-0 h-2 w-2 border-white/40 border-t-2 border-r-2 transition-colors group-hover:border-[var(--theme-primary)]" />
                      <div className="absolute bottom-0 left-0 h-2 w-2 border-white/40 border-b-2 border-l-2 transition-colors group-hover:border-[var(--theme-primary)]" />
                      <div className="absolute right-0 bottom-0 h-2 w-2 border-white/40 border-r-2 border-b-2 transition-colors group-hover:border-[var(--theme-primary)]" />

                      {/* Header row */}
                      <div className="relative z-10 mb-2 flex w-full items-start justify-between">
                        <div className="flex items-center gap-1 rounded-full border border-white/5 bg-white/5 px-1.5 py-0.5">
                          <span className="font-black text-[8px] text-zinc-500 uppercase tracking-tighter">LV</span>
                          <span className="font-black font-mono text-[9px] text-zinc-300">
                            {p.level.toString().padStart(3, '0')}
                          </span>
                        </div>
                        {statusBadge}
                      </div>

                      {/* Sprite area with scanlines */}
                      <div className="relative mb-3 flex h-16 w-16 items-center justify-center self-center overflow-hidden border border-white/5 bg-black/40 transition-colors group-hover:bg-black/60 sm:h-20 sm:w-20">
                        {/* LCD Grid */}
                        <div
                          className="pointer-events-none absolute inset-0 opacity-[0.05]"
                          style={{
                            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                            backgroundSize: '4px 4px',
                          }}
                        />

                        <PokemonSprite
                          pokemonId={pokemon.id}
                          generation={saveData?.generation ?? 1}
                          isShiny={p.isShiny}
                          alt={pokemon.name}
                          className="z-10 h-[85%] w-[85%] object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-all duration-500 group-hover:scale-110"
                        />

                        {/* Scanner overlay */}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[var(--theme-primary)]/20 to-transparent opacity-0 transition-opacity group-hover:animate-[scan_2s_linear_infinite] group-hover:opacity-100" />
                        <div className="scanline-overlay pointer-events-none absolute inset-0 opacity-20" />
                      </div>

                      {/* Name footer */}
                      <div className="relative z-10 flex w-full flex-col items-center gap-1">
                        <h3 className="w-full truncate text-center font-black text-[10px] text-white uppercase tracking-widest">
                          {pokemon.name}
                        </h3>
                        {p.otName && (
                          <div className="flex items-center gap-1">
                            <span className="font-black text-[7px] text-zinc-600 uppercase tracking-widest">OT</span>
                            <span className="max-w-[60px] truncate font-black font-mono text-[8px] text-zinc-400 uppercase">
                              {p.otName}
                            </span>
                          </div>
                        )}
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
