import { useNavigate } from '@tanstack/react-router';
import { ChevronRight, CircleDot, Monitor, Sparkles } from 'lucide-react';
import React, { useMemo } from 'react';
import { useStore } from '../store';
import { cn } from '../utils/cn';
import { getGenerationConfig } from '../utils/generationConfig';

export function PokedexGrid({ pokemonList }: { pokemonList: { id: number; name: string }[] }) {
  const saveData = useStore((s) => s.saveData);
  const isLivingDex = useStore((s) => s.isLivingDex);
  const searchTerm = useStore((s) => s.searchTerm);
  const filters = useStore((s) => s.filters);
  const navigate = useNavigate();

  // ⚡ Bolt: Decouple rapid search typing from expensive grid re-renders
  const deferredSearchTerm = React.useDeferredValue(searchTerm);

  const filtersSet = React.useMemo(() => new Set(filters), [filters]);
  const genConfig = saveData ? getGenerationConfig(saveData.generation) : null;
  const displayLimit = genConfig?.maxDex ?? 151;

  const partySet = React.useMemo(() => new Set(saveData?.party || []), [saveData?.party]);
  const pcSet = React.useMemo(() => new Set(saveData?.pc || []), [saveData?.pc]);
  // ⚡ Bolt: Removed redundant shinyPartySet and shinyPcSet which were unused and doing O(N) operations.

  const finalPokemon = React.useMemo(() => {
    // ⚡ Bolt: Hoist string allocation outside the loop
    const term = deferredSearchTerm ? deferredSearchTerm.toLowerCase() : '';

    return pokemonList.slice(0, displayLimit).filter((pokemon) => {
      // ⚡ Bolt: Combined filters into single pass to reduce O(N) iterations
      // 1. Search term check
      if (term) {
        const matchesTerm = pokemon.name.toLowerCase().includes(term) || pokemon.id.toString().includes(term);
        if (!matchesTerm) return false;
      }

      // 2. Storage/Dex filters check
      if (!saveData || filtersSet.size === 0) return true;

      const inParty = partySet.has(pokemon.id);
      const inPC = pcSet.has(pokemon.id);
      const hasInStorage = inParty || inPC;

      if (filtersSet.has('secured') && hasInStorage) return true;
      if (filtersSet.has('missing') && !hasInStorage) return true;
      if (filtersSet.has('dex-only') && saveData.owned.has(pokemon.id) && !hasInStorage) return true;

      return false;
    });
  }, [pokemonList, displayLimit, deferredSearchTerm, saveData, filtersSet, partySet, pcSet]);

  const shinySpeciesIds = useMemo(() => {
    const set = new Set<number>();
    if (saveData) {
      saveData.partyDetails.forEach((p) => {
        if (p.isShiny) set.add(p.speciesId);
      });
      saveData.pcDetails.forEach((p) => {
        if (p.isShiny) set.add(p.speciesId);
      });
    }
    return set;
  }, [saveData]);

  return (
    <div className="fade-in grid animate-in grid-cols-2 gap-5 px-1 pb-10 duration-500 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
      {finalPokemon.map((pokemon, idx) => {
        const inParty = saveData ? partySet.has(pokemon.id) : false;
        const inPC = saveData ? pcSet.has(pokemon.id) : false;
        const hasInStorage = inParty || inPC;

        const isOwnedInDex = saveData ? saveData.owned.has(pokemon.id) : false;
        const isSeenInDex = saveData ? saveData.seen.has(pokemon.id) : false;

        const isOwned = saveData ? (isLivingDex ? hasInStorage : isOwnedInDex || hasInStorage) : false;
        const _hadButLost = saveData ? isOwnedInDex && !hasInStorage : false;

        const isSeen = saveData ? isSeenInDex || isOwned || hasInStorage : false;
        const isUnseen = saveData && !isSeen;
        const isSeenNotOwned = saveData && isSeen && !isOwned;

        const isShiny = shinySpeciesIds.has(pokemon.id);

        return (
          <button
            type="button"
            data-testid="pokedex-card"
            data-pokemon-id={pokemon.id}
            key={pokemon.id}
            onClick={() => navigate({ to: `/pokemon/${pokemon.id}`, search: { from: '/' } })}
            className={cn(
              'group relative w-full cursor-pointer rounded-3xl border-2 p-4 text-left transition-all duration-500 hover:scale-[1.02] active:scale-[0.98]',
              hasInStorage
                ? 'border-emerald-500/30 bg-zinc-900 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]'
                : 'border-white/5 bg-zinc-900 hover:border-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]',
              saveData?.owned.has(pokemon.id) && !hasInStorage && 'border-amber-500/30 hover:border-amber-500/50',
            )}
            style={{ animationDelay: `${(idx % 20) * 0.02}s` }}
          >
            {/* Card Header: Num & Icons */}
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-1 rounded-full border border-white/5 bg-white/5 px-2 py-0.5">
                <span className="font-black text-[9px] text-zinc-500 uppercase tracking-tighter">ID</span>
                <span className="font-black font-mono text-[10px] text-zinc-300">
                  {pokemon.id.toString().padStart(3, '0')}
                </span>
              </div>

              {saveData && !isUnseen && (
                <div className="flex gap-1">
                  {inParty && <CircleDot size={12} className="animate-pulse text-rose-500" />}
                  {inPC && <Monitor size={12} className="text-[var(--theme-primary)]" />}
                </div>
              )}
            </div>

            {/* Sprite Container */}
            <div className="relative mb-4 flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-black/20 transition-colors group-hover:bg-black/40">
              {/* LCD Grid Background */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                  backgroundSize: '4px 4px',
                }}
              />

              {isShiny && (
                <div className="absolute -top-1 -right-1 z-10 animate-[spin_4s_linear_infinite] text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]">
                  <Sparkles
                    size={16}
                    fill="currentColor"
                    className="animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]"
                  />
                </div>
              )}

              <img
                src={
                  genConfig
                    ? genConfig.spriteUrl(pokemon.id, isShiny)
                    : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/transparent/${pokemon.id}.png`
                }
                alt={pokemon.name}
                className={cn(
                  'pixelated z-10 h-[85%] w-[85%] object-contain transition-all duration-500',
                  isUnseen
                    ? 'opacity-10 brightness-0'
                    : isSeenNotOwned
                      ? 'opacity-50 grayscale'
                      : 'drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:scale-110',
                )}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = (genConfig?.fallbackSpriteUrl ?? getGenerationConfig(1).fallbackSpriteUrl)(
                    pokemon.id,
                  );
                }}
              />

              {/* Scanline overlay for sprite */}
              <div className="scanline-overlay pointer-events-none absolute inset-0 opacity-20" />
            </div>

            {/* Card Footer: Name & Status */}
            <div className="space-y-2">
              <h3
                className={cn(
                  'truncate text-center font-black text-[10px] uppercase tracking-widest sm:text-[11px]',
                  isUnseen ? 'text-zinc-700' : isShiny ? 'text-amber-400' : 'text-white',
                )}
              >
                {pokemon.name}
              </h3>

              {saveData && (
                <div className="flex justify-center">
                  {hasInStorage ? (
                    <div
                      className={cn(
                        'flex items-center gap-1.5 rounded-lg border px-2.5 py-1',
                        isShiny ? 'border-amber-500/20 bg-amber-500/10' : 'border-emerald-500/20 bg-emerald-500/10',
                      )}
                    >
                      <div className={cn('h-1 w-1 rounded-full', isShiny ? 'bg-amber-400' : 'bg-emerald-500')} />
                      <span
                        className={cn(
                          'font-black text-[8px] uppercase tracking-tighter',
                          isShiny ? 'text-amber-400' : 'text-emerald-400',
                        )}
                      >
                        Secured
                      </span>
                    </div>
                  ) : isOwnedInDex ? (
                    <div className="flex items-center gap-1.5 rounded-lg border border-amber-500/20 bg-amber-500/10 px-2.5 py-1">
                      <div className="h-1 w-1 rounded-full bg-amber-500" />
                      <span className="font-black text-[8px] text-amber-400 uppercase tracking-tighter">Dex Only</span>
                    </div>
                  ) : isSeenInDex ? (
                    <div className="flex items-center gap-1.5 rounded-lg border border-rose-500/20 bg-rose-500/10 px-2.5 py-1">
                      <div className="h-1 w-1 rounded-full bg-rose-500" />
                      <span className="font-black text-[8px] text-rose-400 uppercase tracking-tighter">Seen</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 rounded-lg border border-white/5 bg-white/5 px-2.5 py-1">
                      <span className="font-black text-[8px] text-zinc-600 uppercase tracking-tighter">Unknown</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Corner Accent */}
            <div className="absolute right-[-10px] bottom-[-10px] p-4 opacity-0 transition-opacity group-hover:opacity-100">
              <ChevronRight size={14} className="text-[var(--theme-primary)]" />
            </div>
          </button>
        );
      })}
    </div>
  );
}
