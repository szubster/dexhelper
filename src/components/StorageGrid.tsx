import { useNavigate } from '@tanstack/react-router';
import { useWindowVirtualizer } from '@tanstack/react-virtual';
import { Skull } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { useParsedSaveData } from '../contexts/EmulatorContext';
import type { PokemonInstance } from '../engine/saveParser/index';
import { getGenerationConfig } from '../utils/generationConfig';
import { getTimeCapsuleValidation } from '../utils/timeCapsule';
import { CapacitySegmentedBar } from './CapacitySegmentedBar';
import { HoverScanner } from './HoverScanner';
import { LcdGrid } from './LcdGrid';
import { PokerusBadge } from './PokerusBadge';
import { PokemonSprite } from './pokemon/PokemonSprite';
import { RackHandle } from './RackHandle';
import { ScanlineOverlay } from './ScanlineOverlay';
import { ShinyBadge } from './ShinyBadge';
import { TacticalBadge } from './TacticalBadge';
import { TacticalCard } from './TacticalCard';
import { TacticalPanel } from './TacticalPanel';
import { TargetingRings } from './TargetingRings';
import { TargetLockOverlay } from './TargetLockOverlay';

export const StorageCard = React.memo(
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
        <div className="group/card relative flex h-full w-full flex-col">
          {/* Sprite Container - Top Side */}
          <div className="relative flex aspect-square w-full shrink-0 items-center justify-center overflow-hidden border-zinc-800 border-b border-dashed bg-black/40 transition-colors duration-500 group-hover:bg-black/60">
            {/* Target overlay */}
            <TargetLockOverlay />

            <LcdGrid className="opacity-[0.05]" />
            <HoverScanner />

            {/* Massive Faded ID Background */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover/card:opacity-100">
              <span className="select-none font-black font-display text-[4rem] text-cyan-500/10 italic leading-none">
                {pokemon.id.toString().padStart(3, '0')}
              </span>
            </div>

            {/* Matrix Targeting Ring (Appears on Hover) */}
            <TargetingRings />

            <PokemonSprite
              pokemonId={pokemon.id}
              generation={generation}
              isShiny={p.isShiny}
              alt={pokemon.name}
              className={`z-10 h-[60%] w-[60%] object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-transform duration-500 group-hover/card:scale-110 group-hover/card:drop-shadow-[0_0_20px_rgba(34,211,238,0.3)] ${isDead ? 'opacity-50 grayscale' : ''}`}
            />
            {isDead && (
              <Skull
                size={32}
                className="pointer-events-none absolute inset-0 z-20 m-auto text-red-500/50 drop-shadow-md"
              />
            )}

            {/* Extra intense scanline on hover */}
            <ScanlineOverlay opacityClass="opacity-20 group-hover/card:opacity-40" />

            <div className="absolute top-1 right-1 z-30">
              {p.pokerus && p.pokerus.strain > 0 && <PokerusBadge strain={p.pokerus.strain} />}
              <ShinyBadge isShiny={p.isShiny || false} isShinyCarrier={p.isShinyCarrier || false} size="sm" />
            </div>
          </div>

          {/* Data Container - Bottom Side */}
          <div className="relative flex flex-1 flex-col justify-between overflow-hidden p-2">
            {/* Data stream overlay on hover */}
            <div className="pointer-events-none absolute inset-0 z-0 flex flex-col justify-end p-1 opacity-0 transition-opacity duration-300 group-hover/card:opacity-[0.03]">
              <div className="break-all font-mono text-[6px] text-cyan-400 leading-tight">
                {'0123456789ABCDEF'.repeat(10)}
              </div>
            </div>

            <div className="relative z-10 flex flex-col gap-1">
              <div className="flex items-center justify-between">
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

            {timeCapsuleValidation && (
              <div className="mt-1 flex justify-end">
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
      </TacticalCard>
    );
  },
);

// ⚡ Bolt: Wrapped StorageGrid in React.memo and memoized storageLocations array creation to prevent
// unnecessary re-renders and eliminate array allocations on every render pass.

export const StorageGrid = React.memo(function StorageGrid({
  pokemonList,
}: {
  pokemonList: { id: number; name: string }[];
}) {
  const saveData = useParsedSaveData();
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

  const storageLocations = React.useMemo(() => {
    if (!saveData) return [];
    const genConfig = getGenerationConfig(saveData.generation);
    const locations = ['Party', 'Daycare'];
    for (let i = 1; i <= genConfig.boxCount; i++) {
      locations.push(`Box ${i}`);
    }
    return locations;
  }, [saveData]);

  const [columns, setColumns] = useState(2);
  const [containerNode, setContainerNode] = useState<HTMLDivElement | null>(null);

  const containerRef = React.useCallback((node: HTMLDivElement | null) => {
    setContainerNode(node);
  }, []);

  useEffect(() => {
    if (!containerNode) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        if (width >= 1280) setColumns(6);
        else if (width >= 1024) setColumns(5);
        else if (width >= 768) setColumns(4);
        else if (width >= 640) setColumns(3);
        else setColumns(2);
      }
    });

    observer.observe(containerNode);
    return () => observer.disconnect();
  }, [containerNode]);

  const flatList = React.useMemo(() => {
    if (!saveData) return [];
    type FlatListItem =
      | { type: 'header'; location: string; count: number }
      | { type: 'empty'; location: string }
      | {
          type: 'row';
          location: string;
          items: { p: PokemonInstance; pokemon: { id: number; name: string } }[];
          startIndex: number;
        };

    const list: FlatListItem[] = [];
    storageLocations.forEach((location) => {
      const pokemonInLocation = pokemonByLocation.get(location) || [];
      list.push({ type: 'header', location, count: pokemonInLocation.length });

      if (pokemonInLocation.length === 0) {
        list.push({ type: 'empty', location });
      } else {
        for (let i = 0; i < pokemonInLocation.length; i += columns) {
          list.push({
            type: 'row',
            location,
            items: pokemonInLocation.slice(i, i + columns),
            startIndex: i,
          });
        }
      }
    });
    return list;
  }, [saveData, storageLocations, pokemonByLocation, columns]);

  // oxlint-disable-next-line react/incompatible-library
  const virtualizer = useWindowVirtualizer({
    count: flatList.length,
    scrollMargin: containerNode?.offsetTop ?? 0,
    estimateSize: (index) => {
      const item = flatList[index];
      if (!item) return 80;
      if (item.type === 'header') return 80;
      if (item.type === 'empty') return 80;
      // Cards have roughly aspect-square + bottom container height,
      // but they are flexible grid items. We can estimate ~180px for a row depending on screen.
      // A safe estimate that allows overscan to work properly:
      return 220;
    },
    overscan: 3,
  });

  if (!saveData) return null;

  const genConfig = getGenerationConfig(saveData.generation);

  return (
    <div ref={containerRef} className="fade-in animate-in pb-20 duration-500">
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => {
          const rowData = flatList[virtualItem.index];
          if (!rowData) return null;

          return (
            <div
              key={virtualItem.key}
              ref={virtualizer.measureElement}
              data-index={virtualItem.index}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
                paddingBottom: rowData.type === 'header' ? '0px' : '20px',
              }}
            >
              {rowData.type === 'header' && 'count' in rowData && (
                <div className="relative mt-16 mb-8 overflow-hidden rounded-none border border-zinc-800 border-dashed bg-zinc-950 p-1 first:mt-0">
                  <div className="relative flex items-stretch gap-4 bg-zinc-900/50 p-3">
                    <RackHandle />
                    <div className="flex flex-1 flex-col justify-between gap-2 py-1 sm:flex-row sm:items-center">
                      <div className="flex items-center gap-3">
                        <span className="border border-[var(--theme-primary)]/30 border-dashed bg-[var(--theme-primary)]/10 px-1.5 font-mono text-[9px] text-[var(--theme-primary)] uppercase tracking-[0.2em]">
                          SYS.DIR
                        </span>
                        <h2 className="font-black font-mono text-white text-xl uppercase tracking-tight">
                          {rowData.location}
                        </h2>
                      </div>
                      <div className="flex items-center gap-4">
                        <CapacitySegmentedBar
                          current={rowData.count}
                          max={
                            rowData.location === 'Party'
                              ? 6
                              : rowData.location === 'Daycare'
                                ? 2
                                : genConfig.boxCapacity
                          }
                        />
                        <div className="h-6 w-px border-zinc-700 border-r border-dashed" />
                        <div className="flex gap-2">
                          <div
                            className={`h-2 w-2 rounded-none border ${(pokemonByLocation.get(rowData.location) || []).some((p) => !p.p.isShiny && p.p.isShinyCarrier) ? 'animate-[pulse_1.5s_ease-in-out_infinite] border-cyan-400 border-dashed bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]' : 'border-zinc-700 bg-zinc-900'}`}
                            title="Carrier Detector"
                          />
                          <div
                            className={`h-2 w-2 rounded-none border ${(pokemonByLocation.get(rowData.location) || []).some((p) => p.p.isShiny) ? 'animate-pulse border-amber-400 bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]' : 'border-zinc-700 bg-zinc-900'}`}
                            title="Anomaly Detector"
                          />
                          <div
                            className={`h-2 w-2 rounded-none border ${(pokemonByLocation.get(rowData.location) || []).some((p) => rowData.location === 'Party' && p.p.currentHp === 0) ? 'animate-[pulse_0.5s_ease-in-out_infinite] border-red-500 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]' : 'border-zinc-700 bg-zinc-900'}`}
                            title="System Error / Quarantine"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {rowData.type === 'empty' && (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                  <TacticalPanel className="col-span-full flex min-h-[60px] flex-col items-center justify-center p-2 text-center transition-all duration-300 hover:border-zinc-700/50">
                    <span className="font-black font-mono text-[10px] text-zinc-600 uppercase tracking-[0.3em]">
                      [ EMPTY ]
                    </span>
                  </TacticalPanel>
                </div>
              )}

              {rowData.type === 'row' && 'items' in rowData && 'startIndex' in rowData && (
                <div className="grid h-full grid-cols-2 gap-3 pb-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                  {rowData.items.map(({ p, pokemon }, idx) => (
                    <StorageCard
                      // biome-ignore lint/suspicious/noArrayIndexKey: Array index is stable and required for duplicates
                      key={`${rowData.location}-${p.speciesId}-${rowData.startIndex + idx}`}
                      p={p}
                      pokemon={pokemon}
                      location={rowData.location}
                      generation={saveData?.generation ?? 1}
                      onNavigate={handleNavigate}
                      isDead={rowData.location === 'Party' && p.currentHp === 0}
                      timeCapsuleValidation={
                        saveData?.generation === 2 ? getTimeCapsuleValidation(p.speciesId, p.moves) : undefined
                      }
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
});
