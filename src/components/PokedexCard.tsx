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
        '!p-0 group/card relative h-32 overflow-hidden',
        variant === 'emerald'
          ? 'border-emerald-500/50'
          : variant === 'amber'
            ? 'border-amber-500/50'
            : 'border-cyan-500/30',
      )}
    >
      <div className="pointer-events-none absolute inset-0 z-20 border-[1px] border-cyan-400/0 transition-colors duration-300 group-hover/card:border-cyan-400/30 group-focus-visible/card:border-cyan-400/30">
        <div className="absolute top-1 left-1 h-2 w-2 border-cyan-400/0 border-t border-l transition-colors duration-300 group-hover/card:border-cyan-400/80 group-focus-visible/card:border-cyan-400/80" />
        <div className="absolute top-1 right-1 h-2 w-2 border-cyan-400/0 border-t border-r transition-colors duration-300 group-hover/card:border-cyan-400/80 group-focus-visible/card:border-cyan-400/80" />
        <div className="absolute bottom-1 left-1 h-2 w-2 border-cyan-400/0 border-b border-l transition-colors duration-300 group-hover/card:border-cyan-400/80 group-focus-visible/card:border-cyan-400/80" />
        <div className="absolute right-1 bottom-1 h-2 w-2 border-cyan-400/0 border-r border-b transition-colors duration-300 group-hover/card:border-cyan-400/80 group-focus-visible/card:border-cyan-400/80" />
      </div>

      <div className="relative z-10 flex h-full w-full">
        {/* Left Spine */}
        <div
          className={cn(
            'z-20 flex w-8 shrink-0 flex-col items-center justify-between border-r border-dashed py-2',
            variant === 'emerald'
              ? 'border-emerald-900/50 bg-emerald-950/40'
              : variant === 'amber'
                ? 'border-amber-900/50 bg-amber-950/40'
                : 'border-cyan-900/50 bg-cyan-950/20',
          )}
        >
          <div
            className={cn(
              'rotate-180 font-mono text-[8px] tracking-[0.3em]',
              variant === 'emerald'
                ? 'text-emerald-500'
                : variant === 'amber'
                  ? 'text-amber-500'
                  : 'text-cyan-600 group-hover/card:text-cyan-400',
            )}
            style={{ writingMode: 'vertical-rl' }}
          >
            SBJ_{pokemon.id.toString().padStart(3, '0')}
          </div>
          <div className="mb-1 flex flex-col gap-[3px]">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className={cn(
                  'h-[1px] w-3',
                  variant === 'emerald'
                    ? 'bg-emerald-900/60'
                    : variant === 'amber'
                      ? 'bg-amber-900/60'
                      : 'bg-cyan-900/60',
                )}
              />
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="relative flex flex-1 overflow-hidden bg-black/40">
          <LcdGrid className="opacity-[0.05] group-hover/card:opacity-[0.1]" />
          <HoverScanner />
          <ScanlineOverlay opacityClass="opacity-20 group-hover/card:opacity-40" />

          {/* Glitch Overlay */}
          <div className="pointer-events-none absolute inset-0 z-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(34,211,238,0.05)_2px,rgba(34,211,238,0.05)_4px)] opacity-0 transition-opacity duration-300 group-hover/card:opacity-100" />

          <div className="relative z-20 flex flex-1 flex-col justify-between p-3">
            <div>
              <div className="mb-1 flex items-center gap-2">
                <div
                  className={cn(
                    'h-[2px] w-4 rounded-none',
                    variant === 'emerald' ? 'bg-emerald-500' : variant === 'amber' ? 'bg-amber-500' : 'bg-cyan-500',
                  )}
                />
                <span
                  className={cn(
                    'font-mono text-[7px] tracking-widest',
                    isOwned ? 'text-emerald-400' : isSeen ? 'text-amber-400' : 'text-zinc-600',
                  )}
                >
                  {isOwned ? '[ SECURED ]' : isSeen ? '[ LOGGED ]' : '[ UNKNOWN ]'}
                </span>
                {saveData && !isUnseen && (
                  <div className="ml-auto flex items-center gap-1.5">
                    {inParty && <CircleDot size={10} className="animate-pulse text-rose-500" />}
                    {inPC && (
                      <Monitor size={10} className={variant === 'emerald' ? 'text-emerald-400' : 'text-cyan-400'} />
                    )}
                  </div>
                )}
              </div>
              <h3
                className={cn(
                  'mt-1 truncate font-black font-display text-xl uppercase leading-none tracking-widest',
                  isUnseen ? 'text-zinc-700' : isShiny ? 'text-amber-400' : 'text-white',
                )}
              >
                {pokemon.name}
              </h3>
            </div>

            <div className="relative z-30 mt-auto">
              {saveData && (
                <div className="w-fit">
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

          {/* Sprite Area */}
          <div
            className={cn(
              'relative flex w-28 shrink-0 items-center justify-center border-l border-dashed transition-colors',
              variant === 'emerald'
                ? 'border-emerald-900/30 bg-emerald-950/20'
                : variant === 'amber'
                  ? 'border-amber-900/30 bg-amber-950/20'
                  : 'border-cyan-900/30 bg-cyan-950/10',
            )}
          >
            {/* Tactical Rings */}
            <div
              className={cn(
                'absolute h-20 w-20 animate-[spin_10s_linear_infinite] rounded-full border border-dashed opacity-30',
                variant === 'emerald'
                  ? 'border-emerald-500'
                  : variant === 'amber'
                    ? 'border-amber-500'
                    : 'border-cyan-500',
              )}
            />
            <div
              className={cn(
                'absolute h-14 w-14 animate-[spin_7s_linear_infinite_reverse] rounded-full border opacity-20',
                variant === 'emerald'
                  ? 'border-emerald-400'
                  : variant === 'amber'
                    ? 'border-amber-400'
                    : 'border-cyan-400',
              )}
            />

            {isShiny && (
              <div className="absolute top-2 right-2 z-10 animate-[spin_4s_linear_infinite] text-amber-400">
                <Sparkles
                  size={14}
                  fill="currentColor"
                  className="animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]"
                />
              </div>
            )}

            <PokemonSprite
              pokemonId={pokemon.id}
              generation={saveData?.generation ?? 1}
              isShiny={isShiny}
              alt={pokemon.name}
              className={cn(
                'z-10 h-16 w-16 object-contain transition-all duration-500',
                isUnseen
                  ? 'opacity-10 brightness-0'
                  : isSeenNotOwned
                    ? 'opacity-50 grayscale'
                    : 'drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover/card:scale-125 group-hover/card:drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]',
              )}
            />
          </div>
        </div>
      </div>
    </TacticalCard>
  );
});
