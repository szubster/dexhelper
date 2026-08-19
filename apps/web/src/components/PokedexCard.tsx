import { useNavigate } from '@tanstack/react-router';
import { CircleDot, Monitor, Sparkles } from 'lucide-react';
import React from 'react';
import type { SaveData } from '@dexhelper/engine/saveParser';
import { cn } from '../utils/cn';
import type { PokemonListItem } from '../utils/pokemonQueries';
import { HoverScanner } from './HoverScanner';
import { LcdGrid } from './LcdGrid';
import { PokemonSprite } from './pokemon/PokemonSprite';
import { PokemonStatusBadge } from './pokemon/PokemonStatusBadge';
import { ScanlineOverlay } from './ScanlineOverlay';
import { TacticalCard } from './TacticalCard';

interface PokedexCardProps {
  pokemon: PokemonListItem;
  idx: number;
  saveData: SaveData | null;
  isLivingDex: boolean;
  partySet: Set<number>;
  pcSet: Set<number>;
  shinySpeciesIds: Set<number>;
}

// ⚡ Bolt: Wrapped PokedexCard in React.memo to prevent unnecessary re-renders when parent PokedexGrid updates.
// This prevents up to 251 (Gen 2 max dex) unneeded DOM re-evaluations on every search keystroke, significantly reducing main thread blocking time.
function getPokemonStatusFlags(
  pokemonId: number,
  saveData: SaveData | null,
  isLivingDex: boolean,
  partySet: Set<number>,
  pcSet: Set<number>,
  shinySpeciesIds: Set<number>,
) {
  const inParty = saveData ? partySet.has(pokemonId) : false;
  const inPC = saveData ? pcSet.has(pokemonId) : false;
  const hasInStorage = inParty || inPC;

  const isOwnedInDex = saveData ? saveData.owned.has(pokemonId) : false;
  const isSeenInDex = saveData ? saveData.seen.has(pokemonId) : false;

  const isOwned = saveData ? (isLivingDex ? hasInStorage : isOwnedInDex || hasInStorage) : false;

  const isSeen = saveData ? isSeenInDex || isOwned || hasInStorage : false;
  const isUnseen = saveData && !isSeen;
  const isSeenNotOwned = saveData && isSeen && !isOwned;

  const isShiny = shinySpeciesIds.has(pokemonId);

  let variant: 'default' | 'emerald' | 'amber' = 'default';
  if (hasInStorage) {
    variant = 'emerald';
  } else if (saveData?.owned.has(pokemonId)) {
    variant = 'amber';
  }

  return {
    inParty,
    inPC,
    hasInStorage,
    isOwnedInDex,
    isSeenInDex,
    isUnseen,
    isSeenNotOwned,
    isShiny,
    variant,
  };
}

export const PokedexCard = React.memo(function PokedexCard({
  pokemon,
  idx,
  saveData,
  isLivingDex,
  partySet,
  pcSet,
  shinySpeciesIds,
}: PokedexCardProps) {
  const navigate = useNavigate();

  const { inParty, inPC, hasInStorage, isOwnedInDex, isSeenInDex, isUnseen, isSeenNotOwned, isShiny, variant } =
    getPokemonStatusFlags(pokemon.id, saveData, isLivingDex, partySet, pcSet, shinySpeciesIds);

  // Derive isOwned and isSeen from the status flags
  const isOwned = isOwnedInDex || hasInStorage;
  const isSeen = isSeenInDex || isOwned || hasInStorage;

  return (
    <TacticalCard
      ariaLabel={`View details for ${pokemon.name}`}
      title={`View details for ${pokemon.name}`}
      testId="pokedex-card"
      pokemonId={pokemon.id}
      onClick={() => navigate({ to: `/pokemon/${pokemon.id}`, search: { from: '/' } })}
      variant={variant}
      style={{ animationDelay: `${(idx % 20) * 0.02}s` }}
      className={cn(
        '!p-0 group/card relative overflow-hidden',
        variant === 'emerald'
          ? 'border-emerald-500/50'
          : variant === 'amber'
            ? 'border-amber-500/50'
            : 'border-cyan-500/30',
      )}
    >
      {/* Decorative Target Lock overlay on hover */}
      <div className="pointer-events-none absolute inset-0 z-20 border-[1px] border-cyan-400/0 transition-colors duration-300 group-hover/card:border-cyan-400/30 group-focus-visible/card:border-cyan-400/30">
        <div className="absolute top-1 left-1 h-2 w-2 border-cyan-400/0 border-t border-l transition-colors duration-300 group-hover/card:border-cyan-400/80 group-focus-visible/card:border-cyan-400/80" />
        <div className="absolute top-1 right-1 h-2 w-2 border-cyan-400/0 border-t border-r transition-colors duration-300 group-hover/card:border-cyan-400/80 group-focus-visible/card:border-cyan-400/80" />
        <div className="absolute bottom-1 left-1 h-2 w-2 border-cyan-400/0 border-b border-l transition-colors duration-300 group-hover/card:border-cyan-400/80 group-focus-visible/card:border-cyan-400/80" />
        <div className="absolute right-1 bottom-1 h-2 w-2 border-cyan-400/0 border-r border-b transition-colors duration-300 group-hover/card:border-cyan-400/80 group-focus-visible/card:border-cyan-400/80" />
      </div>

      <div className="relative z-10 flex h-full w-full flex-row">
        {/* Sprite Container - Left Side */}
        <div
          className={cn(
            'relative flex aspect-square h-24 w-24 shrink-0 items-center justify-center overflow-hidden border-r border-dashed bg-black/40 transition-colors group-hover/card:bg-black/60',
            variant === 'emerald'
              ? 'border-emerald-900'
              : variant === 'amber'
                ? 'border-amber-900'
                : 'border-cyan-900/50',
          )}
        >
          {/* Enhanced LCD Grid Background */}
          <LcdGrid className="opacity-[0.05] transition-opacity group-hover/card:opacity-[0.1]" />

          {/* Glitch Overlay on Hover */}
          <div className="pointer-events-none absolute inset-0 z-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(34,211,238,0.05)_2px,rgba(34,211,238,0.05)_4px)] opacity-0 transition-opacity duration-300 group-hover/card:opacity-100" />
          <div className="pointer-events-none absolute inset-0 z-0 opacity-0 mix-blend-overlay transition-opacity duration-300 group-hover/card:animate-[pulse_1s_cubic-bezier(0.4,0,0.6,1)_infinite] group-hover/card:bg-cyan-900/20 group-hover/card:opacity-100" />

          {isShiny && (
            <div className="absolute top-1 left-1 z-10 animate-[spin_4s_linear_infinite] text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]">
              <Sparkles
                size={12}
                fill="currentColor"
                className="animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]"
              />
            </div>
          )}

          <HoverScanner />

          {/* Matrix Targeting Ring (Appears on Hover) */}
          <div className="absolute inset-2 rounded-full border border-cyan-500/0 opacity-0 transition-all duration-500 group-hover/card:animate-[spin_4s_linear_infinite] group-hover/card:border-cyan-500/30 group-hover/card:opacity-100" />
          <div className="absolute inset-4 rounded-full border border-cyan-400/0 border-dashed opacity-0 transition-all duration-500 group-hover/card:animate-[spin_3s_linear_infinite_reverse] group-hover/card:border-cyan-400/20 group-hover/card:opacity-100" />

          <PokemonSprite
            pokemonId={pokemon.id}
            generation={saveData?.generation ?? 1}
            isShiny={isShiny}
            alt={pokemon.name}
            className={cn(
              'z-10 h-[80%] w-[80%] object-contain transition-all duration-500',
              isUnseen
                ? 'opacity-10 brightness-0'
                : isSeenNotOwned
                  ? 'opacity-50 grayscale'
                  : 'drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover/card:scale-110 group-hover/card:drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]',
            )}
          />

          {/* Extra intense scanline on hover */}
          <ScanlineOverlay opacityClass="opacity-20 group-hover/card:opacity-40" />
        </div>

        {/* Data Container - Right Side */}
        <div className="relative flex flex-1 flex-col justify-between overflow-hidden">
          {/* Data stream overlay on right side on hover */}
          <div className="pointer-events-none absolute inset-0 z-0 flex flex-col justify-end p-2 opacity-0 transition-opacity duration-300 group-hover/card:opacity-5">
            <div className="break-all font-mono text-[8px] text-cyan-400 leading-tight">
              {'0123456789ABCDEF'.repeat(20)}
            </div>
          </div>

          <div className="relative z-10 flex flex-col gap-1 p-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span
                  className={cn(
                    'font-mono text-[8px] uppercase tracking-widest transition-colors',
                    variant === 'emerald'
                      ? 'text-emerald-500'
                      : variant === 'amber'
                        ? 'text-amber-500'
                        : 'text-cyan-600 group-hover/card:text-cyan-400',
                  )}
                >
                  ID.{pokemon.id.toString().padStart(3, '0')}
                </span>
              </div>
              {saveData && !isUnseen && (
                <div className="flex items-center gap-1.5">
                  {inParty && <CircleDot size={10} className="animate-pulse text-rose-500" />}
                  {inPC && (
                    <Monitor size={10} className={variant === 'emerald' ? 'text-emerald-400' : 'text-cyan-400'} />
                  )}
                </div>
              )}
            </div>

            <div className="flex items-baseline gap-2">
              <h3
                className={cn(
                  'truncate font-bold font-mono text-sm uppercase tracking-tight',
                  isUnseen ? 'text-zinc-700' : isShiny ? 'text-amber-400' : 'text-white',
                )}
              >
                {pokemon.name}
              </h3>
              {/* Fake Status indicators next to name */}
              {!isUnseen && (
                <div className="hidden h-1 w-1 rounded-none bg-cyan-500/50 shadow-[0_0_5px_rgba(34,211,238,0)] group-hover/card:animate-pulse group-hover/card:bg-cyan-400 group-hover/card:shadow-[0_0_5px_rgba(34,211,238,0.8)] sm:flex" />
              )}
            </div>

            {/* Tactical data readouts */}
            <div className="mt-1 hidden items-center gap-2 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 sm:flex">
              <span className="font-mono text-[7px] text-zinc-500">
                STS: {isOwned ? 'SECURED' : isSeen ? 'LOGGED' : 'UNKNOWN'}
              </span>
              <div className="relative h-[2px] w-full flex-1 overflow-hidden bg-zinc-800">
                <div
                  className="absolute inset-y-0 left-0 w-full -translate-x-full bg-cyan-500/50 group-hover/card:animate-[slide_2s_ease-in-out_infinite]"
                  style={{ animationName: 'slideRight' }}
                />
              </div>
            </div>
          </div>

          {saveData && (
            <div
              className={cn(
                'mt-auto border-t border-dashed transition-colors',
                variant === 'emerald'
                  ? 'border-emerald-900/50'
                  : variant === 'amber'
                    ? 'border-amber-900/50'
                    : 'border-zinc-800 group-hover/card:border-cyan-900/50',
              )}
            >
              <PokemonStatusBadge
                hasInStorage={hasInStorage}
                isOwnedInDex={isOwnedInDex}
                isSeenInDex={isSeenInDex}
                isShiny={isShiny}
              />
            </div>
          )}
        </div>
      </div>
    </TacticalCard>
  );
});
