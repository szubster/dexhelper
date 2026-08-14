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

  return (
    <TacticalCard
      ariaLabel={`View details for ${pokemon.name}`}
      title={`View details for ${pokemon.name}`}
      testId="pokedex-card"
      pokemonId={pokemon.id}
      onClick={() => navigate({ to: `/pokemon/${pokemon.id}`, search: { from: '/' } })}
      variant={variant}
      style={{ animationDelay: `${(idx % 20) * 0.02}s` }}
      className="!p-0"
    >
      <div className="flex h-full w-full flex-row">
        {/* Sprite Container - Left Side */}
        <div className="relative flex aspect-square h-24 w-24 shrink-0 items-center justify-center overflow-hidden border-zinc-800 border-r border-dashed bg-black/40 transition-colors group-hover:bg-black/60">
          {/* LCD Grid Background */}
          <LcdGrid className="opacity-[0.05]" />

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
                  : 'drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:scale-110',
            )}
          />

          {/* Scanline overlay for sprite */}
          <ScanlineOverlay opacityClass="opacity-20" />
        </div>

        {/* Data Container - Right Side */}
        <div className="flex flex-1 flex-col justify-between">
          <div className="flex flex-col gap-1 p-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest">
                NO.{pokemon.id.toString().padStart(3, '0')}
              </span>
              {saveData && !isUnseen && (
                <div className="flex gap-1.5">
                  {inParty && <CircleDot size={10} className="animate-pulse text-rose-500" />}
                  {inPC && <Monitor size={10} className="text-[var(--theme-primary)]" />}
                </div>
              )}
            </div>
            <h3
              className={cn(
                'truncate font-bold font-mono text-sm uppercase tracking-tight',
                isUnseen ? 'text-zinc-700' : isShiny ? 'text-amber-400' : 'text-white',
              )}
            >
              {pokemon.name}
            </h3>
          </div>

          {saveData && (
            <div className="mt-auto border-zinc-800 border-t border-dashed">
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
