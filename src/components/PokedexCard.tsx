import { useNavigate } from '@tanstack/react-router';
import { CircleDot, Monitor, Sparkles } from 'lucide-react';
import React from 'react';
import type { SaveData } from '../engine/saveParser';
import { cn } from '../utils/cn';
import { getGenerationConfig } from '../utils/generationConfig';

export interface PokedexCardProps {
  pokemon: { id: number; name: string };
  idx: number;
  saveData: SaveData | null;
  isLivingDex: boolean;
  partySet: Set<number>;
  pcSet: Set<number>;
  shinySpeciesIds: Set<number>;
  genConfig: ReturnType<typeof getGenerationConfig> | null;
}

// ⚡ Bolt: Wrapped PokedexCard in React.memo to prevent unnecessary re-renders when parent PokedexGrid updates.
// This prevents up to 251 (Gen 2 max dex) unneeded DOM re-evaluations on every search keystroke, significantly reducing main thread blocking time.
export const PokedexCard = React.memo(function PokedexCard({
  pokemon,
  idx,
  saveData,
  isLivingDex,
  partySet,
  pcSet,
  shinySpeciesIds,
  genConfig,
}: PokedexCardProps) {
  const navigate = useNavigate();

  const inParty = saveData ? partySet.has(pokemon.id) : false;
  const inPC = saveData ? pcSet.has(pokemon.id) : false;
  const hasInStorage = inParty || inPC;

  const isOwnedInDex = saveData ? saveData.owned.has(pokemon.id) : false;
  const isSeenInDex = saveData ? saveData.seen.has(pokemon.id) : false;

  const isOwned = saveData ? (isLivingDex ? hasInStorage : isOwnedInDex || hasInStorage) : false;

  const isSeen = saveData ? isSeenInDex || isOwned || hasInStorage : false;
  const isUnseen = saveData && !isSeen;
  const isSeenNotOwned = saveData && isSeen && !isOwned;

  const isShiny = shinySpeciesIds.has(pokemon.id);

  return (
    <button
      type="button"
      aria-label={`View details for ${pokemon.name}`}
      data-testid="pokedex-card"
      data-pokemon-id={pokemon.id}
      onClick={() => navigate({ to: `/pokemon/${pokemon.id}`, search: { from: '/' } })}
      className={cn(
        'group relative w-full cursor-pointer border-2 p-3 text-left transition-all duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 active:scale-[0.98]',
        hasInStorage
          ? 'border-emerald-500/30 bg-zinc-900/80 hover:border-emerald-500/50 hover:bg-emerald-950/30'
          : 'border-white/5 bg-zinc-900/80 hover:border-white/20 hover:bg-zinc-800/80',
        saveData?.owned.has(pokemon.id) && !hasInStorage && 'border-amber-500/30 hover:border-amber-500/50',
      )}
      style={{ animationDelay: `${(idx % 20) * 0.02}s` }}
    >
      {/* Viewfinder L-Brackets */}
      <div
        className={cn(
          'absolute top-0 left-0 h-3 w-3 border-t-2 border-l-2 transition-colors',
          hasInStorage ? 'border-emerald-500/50' : 'border-white/20',
        )}
      />
      <div
        className={cn(
          'absolute top-0 right-0 h-3 w-3 border-t-2 border-r-2 transition-colors',
          hasInStorage ? 'border-emerald-500/50' : 'border-white/20',
        )}
      />
      <div
        className={cn(
          'absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 transition-colors',
          hasInStorage ? 'border-emerald-500/50' : 'border-white/20',
        )}
      />
      <div
        className={cn(
          'absolute right-0 bottom-0 h-3 w-3 border-r-2 border-b-2 transition-colors',
          hasInStorage ? 'border-emerald-500/50' : 'border-white/20',
        )}
      />

      {/* Card Header: Num & Icons */}
      <div className="mb-2 flex items-center justify-between opacity-80 transition-opacity group-hover:opacity-100">
        <div className="flex items-center gap-1">
          <span className="font-black text-[9px] text-zinc-500 uppercase tracking-widest">NO.</span>
          <span className={cn('font-black font-mono text-[10px]', hasInStorage ? 'text-emerald-400' : 'text-zinc-300')}>
            {pokemon.id.toString().padStart(3, '0')}
          </span>
        </div>

        {saveData && !isUnseen && (
          <div className="flex gap-1">
            {inParty && <CircleDot size={10} className="animate-pulse text-rose-500" />}
            {inPC && <Monitor size={10} className="text-[var(--theme-primary)]" />}
          </div>
        )}
      </div>

      {/* Sprite Container */}
      <div className="relative mb-3 flex aspect-square items-center justify-center overflow-hidden border border-white/5 bg-black/40 transition-colors group-hover:bg-black/60">
        {/* Reticle / Target lines */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-10 transition-opacity group-hover:opacity-30">
          <div className="h-full w-[1px] bg-white" />
          <div className="absolute h-[1px] w-full bg-white" />
          <div className="absolute h-8 w-8 rounded-full border border-white" />
        </div>

        {/* LCD Grid Background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '4px 4px',
          }}
        />

        {isShiny && (
          <div className="absolute top-1 right-1 z-10 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]">
            <Sparkles size={12} fill="currentColor" className="animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]" />
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
            'pixelated z-10 h-[80%] w-[80%] object-contain transition-all duration-300',
            isUnseen
              ? 'opacity-10 brightness-0'
              : isSeenNotOwned
                ? 'opacity-50 grayscale'
                : 'drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] group-hover:scale-110',
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
      <div className="flex flex-col gap-1.5">
        <h3
          className={cn(
            'truncate font-black font-mono text-[10px] uppercase tracking-widest',
            isUnseen ? 'text-zinc-700' : isShiny ? 'text-amber-400' : 'text-white',
          )}
        >
          {pokemon.name}
        </h3>

        {saveData && (
          <div className="flex">
            {hasInStorage ? (
              <div className="flex w-full items-center justify-between border-emerald-500/20 border-t pt-1.5">
                <span className="font-black text-[8px] text-emerald-500 uppercase tracking-widest">STATUS</span>
                <span className="font-black font-mono text-[9px] text-emerald-400">SECURED</span>
              </div>
            ) : isOwnedInDex ? (
              <div className="flex w-full items-center justify-between border-amber-500/20 border-t pt-1.5">
                <span className="font-black text-[8px] text-amber-500 uppercase tracking-widest">STATUS</span>
                <span className="font-black font-mono text-[9px] text-amber-400">DEX_ONLY</span>
              </div>
            ) : isSeenInDex ? (
              <div className="flex w-full items-center justify-between border-rose-500/20 border-t pt-1.5">
                <span className="font-black text-[8px] text-rose-500 uppercase tracking-widest">STATUS</span>
                <span className="font-black font-mono text-[9px] text-rose-400">SEEN</span>
              </div>
            ) : (
              <div className="flex w-full items-center justify-between border-white/5 border-t pt-1.5">
                <span className="font-black text-[8px] text-zinc-600 uppercase tracking-widest">STATUS</span>
                <span className="font-black font-mono text-[9px] text-zinc-500">UNKNOWN</span>
              </div>
            )}
          </div>
        )}
      </div>
    </button>
  );
});
