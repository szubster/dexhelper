import { useNavigate } from '@tanstack/react-router';
import { Skull, Sparkles } from 'lucide-react';
import React from 'react';
import type { PokemonInstance } from '../engine/saveParser/index';
import { useStore } from '../store';
import { getGenerationConfig } from '../utils/generationConfig';
import { getTimeCapsuleValidation } from '../utils/timeCapsule';
import { CapacitySegmentedBar } from './CapacitySegmentedBar';
import { PokemonSprite } from './pokemon/PokemonSprite';
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

    let variant: 'storage-default' | 'storage-emerald' | 'storage-amber' | 'storage-red' = 'storage-default';
    if (isDead) {
      variant = 'storage-red';
    } else if (p.isShiny) {
      variant = 'storage-amber';
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
      >
        {timeCapsuleValidation && (
          <div className="absolute right-2 bottom-2 z-10">
            {timeCapsuleValidation.isEligible ? (
              <TacticalBadge variant="emerald" className="rounded-none px-1 py-0 font-mono text-[8px] leading-none">
                [ TIME CAPSULE READY ]
              </TacticalBadge>
            ) : (
              <TacticalBadge
                variant="red"
                className="rounded-none px-1 py-0 font-mono text-[8px] leading-none"
                title={timeCapsuleValidation.reason}
              >
                [ ERR ]
              </TacticalBadge>
            )}
          </div>
        )}
        <div className="absolute top-3 left-3 font-bold font-mono text-[10px] text-zinc-600">LV.{p.level}</div>
        <div className="absolute top-3 right-3 z-10 flex flex-col items-end gap-1.5">
          {p.isShiny && <Sparkles size={14} className="text-amber-400 drop-shadow-sm" />}
          {p.otName && (
            <TacticalBadge variant="zinc" className="max-w-[60px] truncate px-1.5 py-0.5 font-mono">
              {p.otName}
            </TacticalBadge>
          )}
        </div>
        <div className="relative mb-4 flex h-20 w-20 items-center justify-center sm:h-24 sm:w-24">
          <PokemonSprite
            pokemonId={pokemon.id}
            generation={generation}
            isShiny={p.isShiny}
            alt={pokemon.name}
            className={`h-full w-full object-contain drop-shadow-xl ${isDead ? 'opacity-50 grayscale' : ''}`}
          />
          {isDead && (
            <Skull
              size={48}
              className="pointer-events-none absolute inset-0 z-20 m-auto text-red-500/50 drop-shadow-md"
            />
          )}
        </div>
        <div className="w-full truncate px-1 text-center font-bold text-[10px] text-zinc-100 uppercase tracking-wider">
          {pokemon.name}
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

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {pokemonInLocation.length === 0 ? (
                <TacticalPanel className="flex min-h-[180px] flex-col items-center justify-center p-5 text-center transition-all duration-300 hover:border-zinc-700/50">
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
