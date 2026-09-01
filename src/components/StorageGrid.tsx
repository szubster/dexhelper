import { useNavigate } from '@tanstack/react-router';
import { Skull } from 'lucide-react';
import React from 'react';
import type { PokemonInstance } from '../engine/saveParser/index';
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
        className="!p-0 group/card relative min-h-24 overflow-hidden shadow-[0_5px_15px_rgba(0,0,0,0.5)]"
      >
        {/* Physical hardware drive base */}
        <div className="pointer-events-none absolute inset-0 border border-zinc-800 bg-zinc-900" />

        {/* Drive Grip/Handle (Left side) */}
        <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 flex w-3 flex-col items-center justify-around border-zinc-800 border-r bg-zinc-950 py-2">
          <div className="h-1 w-1 rounded-full bg-zinc-800 shadow-[inset_0_1px_1px_rgba(0,0,0,1)]" />
          <div className="h-8 w-1 rounded-none bg-zinc-800 shadow-[inset_1px_0_2px_rgba(0,0,0,1)]" />
          <div className="h-1 w-1 rounded-full bg-zinc-800 shadow-[inset_0_1px_1px_rgba(0,0,0,1)]" />
        </div>

        {/* Structural Corner Screws */}
        <div className="absolute top-1 right-1 z-10 flex h-1.5 w-1.5 items-center justify-center rounded-full bg-black shadow-[0_0_1px_rgba(255,255,255,0.2)]">
          <div className="h-px w-full rotate-45 bg-zinc-800" />
        </div>
        <div className="absolute right-1 bottom-1 z-10 flex h-1.5 w-1.5 items-center justify-center rounded-full bg-black shadow-[0_0_1px_rgba(255,255,255,0.2)]">
          <div className="h-px w-full -rotate-45 bg-zinc-800" />
        </div>

        <div className="relative flex h-full w-full flex-col pl-3">
          {/* Sprite Container - Top Side (Physical window) */}
          <div className="relative flex w-full flex-1 shrink-0 items-center justify-center overflow-hidden border-zinc-950 border-b-2 bg-black/60 transition-colors duration-500 group-hover/card:bg-black/80">
            {/* Inner window shadow */}
            <div className="pointer-events-none absolute inset-0 z-20 shadow-[inset_0_5px_10px_rgba(0,0,0,0.8)]" />

            {/* Target overlay */}
            <div className="pointer-events-none absolute inset-0 z-20 border-[1px] border-cyan-400/0 transition-colors duration-300 group-hover/card:border-cyan-400/30">
              <div className="absolute top-1 left-1 h-2 w-2 border-cyan-400/0 border-t border-l transition-colors duration-300 group-hover/card:border-cyan-400/80" />
              <div className="absolute top-1 right-1 h-2 w-2 border-cyan-400/0 border-t border-r transition-colors duration-300 group-hover/card:border-cyan-400/80" />
              <div className="absolute bottom-1 left-1 h-2 w-2 border-cyan-400/0 border-b border-l transition-colors duration-300 group-hover/card:border-cyan-400/80" />
              <div className="absolute right-1 bottom-1 h-2 w-2 border-cyan-400/0 border-r border-b transition-colors duration-300 group-hover/card:border-cyan-400/80" />
            </div>

            <LcdGrid className="opacity-[0.08]" />
            <HoverScanner />

            {/* Massive Faded ID Background */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover/card:opacity-100">
              <span className="select-none font-black font-display text-[4rem] text-cyan-500/10 italic leading-none">
                {pokemon.id.toString().padStart(3, '0')}
              </span>
            </div>

            <PokemonSprite
              pokemonId={pokemon.id}
              generation={generation}
              isShiny={p.isShiny}
              alt={pokemon.name}
              className={`z-10 h-[70%] w-[70%] object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-transform duration-500 group-hover/card:scale-110 group-hover/card:drop-shadow-[0_0_20px_rgba(34,211,238,0.3)] ${isDead ? 'opacity-50 grayscale' : ''}`}
            />
            {isDead && (
              <Skull
                size={32}
                className="pointer-events-none absolute inset-0 z-20 m-auto text-red-500/50 drop-shadow-md"
              />
            )}

            {/* Extra intense scanline on hover */}
            <ScanlineOverlay opacityClass="opacity-20 group-hover/card:opacity-40" />

            {/* Hardware LEDs for statuses */}
            <div className="absolute top-1 right-2 z-30 flex flex-col gap-1">
              {p.pokerus && p.pokerus.strain > 0 && <PokerusBadge strain={p.pokerus.strain} />}
              <ShinyBadge isShiny={p.isShiny || false} isShinyCarrier={p.isShinyCarrier || false} size="sm" />
            </div>
          </div>

          {/* Data Container - Physical Sticker Label */}
          <div className="relative m-1.5 mb-1 overflow-hidden rounded-none border border-white/20 bg-zinc-200 p-1.5 shadow-[inset_0_0_5px_rgba(0,0,0,0.1)]">
            {/* Fake barcode */}
            <div className="pointer-events-none absolute top-0 right-1 flex h-full w-4 flex-col justify-between py-1 opacity-30">
              <div className="h-px w-full bg-black" />
              <div className="h-0.5 w-full bg-black" />
              <div className="h-px w-full bg-black" />
              <div className="h-1 w-full bg-black" />
              <div className="h-0.5 w-full bg-black" />
              <div className="h-px w-full bg-black" />
            </div>

            {/* Sticker dirt/texture */}
            <div className="pointer-events-none absolute inset-0 z-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSJub25lIi8+CjxwYXRoIGQ9Ik0wIDBMMSAxTTAgMkwxIDNNMiAyTDMgM00yIDBMMyAxIiBzdHJva2U9InJnYmEoMCwwLDAsMC4wNSkiLz4KPC9zdmc+')] opacity-50" />

            <div className="relative z-10 flex flex-col gap-0">
              <div className="flex items-center justify-between pr-4">
                <span className="font-bold font-mono text-[8px] text-zinc-800 uppercase tracking-widest sm:text-[9px]">
                  LV.{p.level.toString().padStart(3, '0')}
                </span>
                {p.otName && (
                  <span className="truncate font-bold font-mono text-[7px] text-zinc-600 sm:text-[8px]">
                    OT:{p.otName}
                  </span>
                )}
              </div>
              <h3 className="mt-0.5 truncate font-black font-mono text-black text-sm uppercase leading-none tracking-tight sm:text-base">
                {pokemon.name}
              </h3>
            </div>

            {timeCapsuleValidation && (
              <div className="mt-1 flex justify-end">
                {timeCapsuleValidation.isEligible ? (
                  <span className="rounded-none border border-emerald-500/50 bg-emerald-500/20 px-1 py-px font-bold font-mono text-[8px] text-emerald-900 leading-none sm:text-[9px]">
                    [ READY ]
                  </span>
                ) : (
                  <span
                    className="rounded-none border border-red-500/50 bg-red-500/20 px-1 py-px font-bold font-mono text-[8px] text-red-900 leading-none sm:text-[9px]"
                    title={timeCapsuleValidation.reason}
                  >
                    [ ERR ]
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </TacticalCard>
    );
  },
);

export function StorageGrid({ pokemonList }: { pokemonList: { id: number; name: string }[] }) {
  const saveData = useStore((s) => s.saveData);
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
                  <div className="my-2 w-1.5 flex-1 rounded-none bg-gradient-to-b from-zinc-700 via-zinc-600 to-zinc-700 shadow-[inset_1px_0_2px_rgba(255,255,255,0.2)]" />
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
                        className={`h-2 w-2 rounded-none border ${pokemonInLocation.some((p) => location === 'Party' && p.p.currentHp === 0) ? 'animate-[pulse_0.5s_ease-in-out_infinite] border-red-500 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]' : 'border-zinc-700 bg-zinc-900'}`}
                        title="System Error / Quarantine"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
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
                      isDead={location === 'Party' && p.currentHp === 0}
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
