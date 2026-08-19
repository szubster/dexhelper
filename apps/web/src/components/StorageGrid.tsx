import { useNavigate } from '@tanstack/react-router';
import { Skull } from 'lucide-react';
import React from 'react';
import type { PokemonInstance } from '@dexhelper/engine/saveParser/index';
import { useStore } from '../store';
import { getGenerationConfig } from '../utils/generationConfig';
import { getTimeCapsuleValidation } from '../utils/timeCapsule';
import { CapacitySegmentedBar } from './CapacitySegmentedBar';
import { HoverScanner } from './HoverScanner';
import { LcdGrid } from './LcdGrid';
import { PokerusBadge } from './PokerusBadge';
import { PokemonSprite } from './pokemon/PokemonSprite';
import { ScanlineOverlay } from './ScanlineOverlay';
import { ShinyBadge } from './ShinyBadge';
import { TacticalBadge } from './TacticalBadge';
import { TacticalCard } from './TacticalCard';
import { TacticalPanel } from './TacticalPanel';

const StorageCard = React.memo(
  ({
    p,
    pokemon,
    location,
    generation,
    onNavigate,
    isDead,
    timeCapsuleValidation,
  }: {
    p: PokemonInstance;
    pokemon: { id: number; name: string };
    location: string;
    generation: number;
    onNavigate: (id: number) => void;
    isDead?: boolean;
    timeCapsuleValidation?: { isEligible: boolean; reason?: string } | undefined;
  }) => {
    const handleClick = React.useCallback(() => onNavigate(pokemon.id), [onNavigate, pokemon.id]);

    let variant: 'storage-default' | 'storage-emerald' | 'storage-amber' | 'storage-red' | 'storage-cyan' =
      'storage-default';
    if (isDead) {
      variant = 'storage-red';
    } else if (p.isShiny) {
      variant = 'storage-amber';
    } else if (p.isShinyCarrier) {
      variant = 'storage-cyan';
    } else if (location === 'Party') {
      variant = 'storage-red';
    } else {
      variant = 'storage-emerald';
    }

    return (
      <TacticalCard
        ariaLabel={`View details for ${pokemon.name} in ${location}`}
        title={`View details for ${pokemon.name} in ${location}`}
        onClick={handleClick}
        variant={variant}
        className="!p-0 min-h-16"
      >
        <div className="flex h-full w-full flex-row">
          {/* Sprite Container - Left Side */}
          <div className="relative flex aspect-square h-16 w-16 shrink-0 items-center justify-center overflow-hidden border-zinc-800 border-r border-dashed bg-black/40 transition-colors group-hover:bg-black/60 sm:h-20 sm:w-20">
            <LcdGrid className="opacity-[0.05]" />
            <HoverScanner />
            <PokemonSprite
              pokemonId={pokemon.id}
              generation={generation}
              isShiny={p.isShiny}
              alt={pokemon.name}
              className={`z-10 h-[80%] w-[80%] object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-110 ${isDead ? 'opacity-50 grayscale' : ''}`}
            />
            {isDead && (
              <Skull
                size={32}
                className="pointer-events-none absolute inset-0 z-20 m-auto text-red-500/50 drop-shadow-md"
              />
            )}
            <ScanlineOverlay opacityClass="opacity-20" />
          </div>

          {/* Data Container - Right Side */}
          <div className="flex flex-1 flex-row items-center justify-between overflow-hidden p-2 sm:p-3">
            {/* Primary Info */}
            <div className="flex min-w-0 flex-col justify-center">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest sm:text-[10px]">
                  LV.{p.level.toString().padStart(3, '0')}
                </span>
                {p.otName && (
                  <span className="truncate font-mono text-[8px] text-zinc-600 sm:text-[10px]">[{p.otName}]</span>
                )}
              </div>
              <h3 className="truncate font-bold font-mono text-sm text-white uppercase tracking-tight sm:text-base">
                {pokemon.name}
              </h3>
            </div>

            {/* Badges / Status */}
            <div className="flex shrink-0 flex-row items-center gap-2 pl-2 sm:gap-3">
              {p.pokerus && p.pokerus.strain > 0 && <PokerusBadge strain={p.pokerus.strain} />}
              <ShinyBadge isShiny={p.isShiny || false} isShinyCarrier={p.isShinyCarrier || false} size="sm" />
              {timeCapsuleValidation && (
                <div>
                  {timeCapsuleValidation.isEligible ? (
                    <TacticalBadge
                      variant="emerald"
                      className="rounded-none px-1.5 py-0.5 font-mono text-[8px] leading-none sm:text-[10px]"
                    >
                      [ READY ]
                    </TacticalBadge>
                  ) : (
                    <TacticalBadge
                      variant="red"
                      className="rounded-none px-1.5 py-0.5 font-mono text-[8px] leading-none sm:text-[10px]"
                      title={timeCapsuleValidation.reason}
                    >
                      [ ERR ]
                    </TacticalBadge>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </TacticalCard>
    );
  },
);

export function StorageGrid({ pokemonList }: { pokemonList: { id: number; name: string }[] }) {
  const saveData = useStore((s) => s.saveData);
  const nuzlockeGraveyardBox = useStore((s) => s.nuzlockeGraveyardBox);
  const navigate = useNavigate();
  const handleNavigate = React.useCallback(
    (id: number) => {
      void navigate({ to: `/pokemon/${id}`, search: { from: '/storage' } });
    },
    [navigate],
  );

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
    let lastLocation: string | undefined;
    let currentArray: { p: PokemonInstance; pokemon: { id: number; name: string } }[] | undefined;

    const processArray = (arr: PokemonInstance[]) => {
      for (const p of arr) {
        if (!p.storageLocation) continue;
        const pokemon = pokemonMap.get(p.speciesId);
        if (!pokemon) continue;

        if (p.storageLocation !== lastLocation || currentArray === undefined) {
          currentArray = map.get(p.storageLocation);
          if (!currentArray) {
            currentArray = [];
            map.set(p.storageLocation, currentArray);
          }
          lastLocation = p.storageLocation;
        }
        currentArray.push({ p, pokemon });
      }
    };

    processArray(saveData.partyDetails);
    processArray(saveData.pcDetails);

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
            {/* Server Rack Blade Header */}
            <div className="relative overflow-hidden rounded-none border border-zinc-800 border-dashed bg-zinc-950 p-1">
              <div className="relative flex items-stretch gap-4 bg-zinc-900/50 p-3">
                {/* Rack Handle */}
                <div className="flex w-4 shrink-0 flex-col justify-between border-zinc-700/50 border-r border-dashed pr-2">
                  <div className="h-2 w-2 rounded-full border border-zinc-600 bg-zinc-800 shadow-inner" />
                  <div className="my-2 w-1.5 flex-1 rounded-sm bg-gradient-to-b from-zinc-700 via-zinc-600 to-zinc-700 shadow-[inset_1px_0_2px_rgba(255,255,255,0.2)]" />
                  <div className="h-2 w-2 rounded-full border border-zinc-600 bg-zinc-800 shadow-inner" />
                </div>

                {/* Main Content Area */}
                <div className="flex flex-1 flex-col justify-between gap-2 py-1 sm:flex-row sm:items-center">
                  {/* Title & Sys Dir */}
                  <div className="flex items-center gap-3">
                    <span className="border border-[var(--theme-primary)]/30 border-dashed bg-[var(--theme-primary)]/10 px-1.5 font-mono text-[9px] text-[var(--theme-primary)] uppercase tracking-[0.2em]">
                      SYS.DIR
                    </span>
                    <h2 className="font-black font-mono text-white text-xl uppercase tracking-tight">{location}</h2>
                  </div>

                  {/* Telemetry & LEDs */}
                  <div className="flex items-center gap-4">
                    {/* Capacity Segmented Bar */}
                    <CapacitySegmentedBar
                      current={pokemonInLocation.length}
                      max={location === 'Party' ? 6 : location === 'Daycare' ? 2 : genConfig.boxCapacity}
                    />

                    <div className="h-6 w-px border-zinc-700 border-r border-dashed" />

                    {/* Status LEDs */}
                    <div className="flex gap-2">
                      {/* Carrier Anomaly LED */}
                      <div
                        className={`h-2 w-2 rounded-none border ${pokemonInLocation.some((p) => !p.p.isShiny && p.p.isShinyCarrier) ? 'animate-[pulse_1.5s_ease-in-out_infinite] border-cyan-400 border-dashed bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]' : 'border-zinc-700 bg-zinc-900'}`}
                        title="Carrier Detector"
                      />
                      {/* Shiny Anomaly LED */}
                      <div
                        className={`h-2 w-2 rounded-none border ${pokemonInLocation.some((p) => p.p.isShiny) ? 'animate-pulse border-amber-400 bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]' : 'border-zinc-700 bg-zinc-900'}`}
                        title="Anomaly Detector"
                      />
                      {/* Error / Dead LED */}
                      <div
                        className={`h-2 w-2 rounded-none border ${location === nuzlockeGraveyardBox || pokemonInLocation.some((p) => location === 'Party' && p.p.currentHp === 0) ? 'animate-[pulse_0.5s_ease-in-out_infinite] border-red-500 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]' : 'border-zinc-700 bg-zinc-900'}`}
                        title="System Error / Quarantine"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
              {pokemonInLocation.length === 0 ? (
                <TacticalPanel className="col-span-full flex min-h-[60px] flex-col items-center justify-center p-2 text-center transition-all duration-300 hover:border-zinc-700/50">
                  <span className="font-black font-mono text-[10px] text-zinc-600 uppercase tracking-[0.3em]">
                    [ EMPTY ]
                  </span>
                </TacticalPanel>
              ) : (
                pokemonInLocation.map(({ p, pokemon }, idx) => {
                  return (
                    <StorageCard
                      // biome-ignore lint/suspicious/noArrayIndexKey: Array index is stable and required for duplicates
                      key={`${location}-${p.speciesId}-${idx}`}
                      p={p}
                      pokemon={pokemon}
                      location={location}
                      generation={saveData?.generation ?? 1}
                      onNavigate={handleNavigate}
                      isDead={location === nuzlockeGraveyardBox || (location === 'Party' && p.currentHp === 0)}
                      timeCapsuleValidation={
                        saveData?.generation === 2 ? getTimeCapsuleValidation(p.speciesId, p.moves) : undefined
                      }
                    />
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
