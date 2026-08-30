import { useNavigate } from '@tanstack/react-router';
import { CircleDot, Monitor, Sparkles } from 'lucide-react';
import React from 'react';
import type { SaveData } from '../engine/saveParser';
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
      className="!p-0 group/card relative flex-col overflow-hidden"
    >
      <div className="relative z-10 flex h-full w-full flex-col">
        {/* Top Header - ID and Status */}
        <div className="flex items-center justify-between border-black/40 border-b bg-black/60 px-3 py-1.5 shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                'font-black font-mono text-[10px] tracking-widest transition-colors',
                variant === 'emerald' ? 'text-emerald-500' : variant === 'amber' ? 'text-amber-500' : 'text-cyan-500',
              )}
            >
              No.{pokemon.id.toString().padStart(3, '0')}
            </span>
          </div>
          {saveData && !isUnseen && (
            <div className="flex items-center gap-1.5">
              {inParty && (
                <CircleDot
                  size={10}
                  className="animate-pulse text-rose-500 drop-shadow-[0_0_5px_rgba(244,63,94,0.8)]"
                />
              )}
              {inPC && (
                <Monitor
                  size={10}
                  className={
                    variant === 'emerald'
                      ? 'text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.8)]'
                      : 'text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]'
                  }
                />
              )}
            </div>
          )}
        </div>

        {/* Central Display - Sprite Area */}
        <div
          className={cn(
            'relative flex flex-1 items-center justify-center overflow-hidden bg-black/40 py-6 transition-colors group-hover/card:bg-black/60',
          )}
        >
          {/* Enhanced LCD Grid Background */}
          <LcdGrid className="opacity-[0.05] transition-opacity group-hover/card:opacity-[0.15]" />

          {/* Scanline overlay */}
          <ScanlineOverlay opacityClass="opacity-30 group-hover/card:opacity-50" />

          {isShiny && (
            <div className="absolute top-2 left-2 z-10 animate-[spin_4s_linear_infinite] text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]">
              <Sparkles
                size={14}
                fill="currentColor"
                className="animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]"
              />
            </div>
          )}

          <HoverScanner />

          <PokemonSprite
            pokemonId={pokemon.id}
            generation={saveData?.generation ?? 1}
            isShiny={isShiny}
            alt={pokemon.name}
            className={cn(
              'z-10 h-20 w-20 object-contain transition-all duration-300',
              isUnseen
                ? 'opacity-10 brightness-0'
                : isSeenNotOwned
                  ? 'opacity-50 grayscale'
                  : 'drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)] group-hover/card:-translate-y-1 group-hover/card:scale-110 group-hover/card:drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]',
            )}
          />
        </div>

        {/* Bottom Data Container - Name and Badges */}
        <div className="relative flex flex-col justify-between overflow-hidden border-black/40 border-t bg-zinc-950/80 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]">
          <div className="relative z-10 flex flex-col gap-1 px-3 pt-2 pb-2">
            <div className="flex items-baseline justify-between gap-2">
              <h3
                className={cn(
                  'truncate font-black font-mono text-sm uppercase tracking-tight',
                  isUnseen ? 'text-zinc-600' : isShiny ? 'text-amber-400' : 'text-zinc-100',
                )}
              >
                {pokemon.name}
              </h3>

              <span className="font-mono text-[7px] text-zinc-500 uppercase">
                {isOwned ? 'SECURED' : isSeen ? 'LOGGED' : 'UNKNOWN'}
              </span>
            </div>
          </div>

          {saveData && (
            <div className="border-zinc-800/50 border-t border-dashed bg-black/20">
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
