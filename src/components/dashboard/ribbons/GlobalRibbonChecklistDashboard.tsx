import { useVirtualizer } from '@tanstack/react-virtual';
import type React from 'react';
import { useMemo, useRef } from 'react';
import { RibbonFilterProvider } from '../../../contexts/RibbonFilterContext';
import { useStore } from '../../../store';
import { cn } from '../../../utils/cn';
import {
  type ContestConditionType,
  ContestRibbonBadge,
  type ContestRibbonRank,
} from '../../pokemon/details/ContestRibbonBadge';
import { TacticalPanel } from '../../TacticalPanel';
import { TelemetryDecoration } from '../../TelemetryDecoration';

const GlobalRibbonChecklistDashboardContent: React.FC = () => {
  const saveData = useStore((s) => s.saveData);
  const isLivingDex = useStore((s) => s.isLivingDex);

  const pokemonList = useMemo(() => {
    if (saveData?.generation !== 3) {
      return [];
    }
    const allPokemon = [...saveData.partyDetails, ...saveData.pcDetails];
    // Deduplicate or filter if needed, for now just show all with ribbons
    // ⚡ Bolt: Replaced Object.values().some() with manual property checks to eliminate intermediate array allocations per pokemon in the hot path.
    return allPokemon.filter((p) => {
      if (!p.ribbons) return false;
      const r = p.ribbons;
      return r.cool > 0 || r.beauty > 0 || r.cute > 0 || r.smart > 0 || r.tough > 0;
    });
  }, [saveData]);

  const masterRanks = useMemo(() => {
    const status = { cool: false, beauty: false, cute: false, smart: false, tough: false };
    if (saveData?.generation !== 3) return status;
    const allPokemon = [...saveData.partyDetails, ...saveData.pcDetails];
    for (const p of allPokemon) {
      if (!p.ribbons) continue;
      if (p.ribbons.cool === 4) status.cool = true;
      if (p.ribbons.beauty === 4) status.beauty = true;
      if (p.ribbons.cute === 4) status.cute = true;
      if (p.ribbons.smart === 4) status.smart = true;
      if (p.ribbons.tough === 4) status.tough = true;
    }
    return status;
  }, [saveData]);

  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: pokemonList.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 60, // Increased slightly to account for flex-wrap or spacing
    overscan: 5,
  });

  if (saveData?.generation !== 3) {
    return null;
  }

  if (pokemonList.length === 0) {
    return (
      <TacticalPanel className="mt-6 p-4 text-center">
        <span className="tactical-text text-zinc-500">NO POKEMON WITH RIBBONS FOUND</span>
      </TacticalPanel>
    );
  }

  const rankMap: Record<number, ContestRibbonRank> = {
    1: 'Normal',
    2: 'Super',
    3: 'Hyper',
    4: 'Master',
  };

  const conditionMap: Record<keyof Exclude<(typeof pokemonList)[0]['ribbons'], undefined>, ContestConditionType> = {
    cool: 'Cool',
    beauty: 'Beauty',
    cute: 'Cute',
    smart: 'Smart',
    tough: 'Tough',
  };

  return (
    <div className="mt-6 flex flex-col gap-6">
      <TacticalPanel className="relative flex flex-col gap-4 border-[var(--theme-primary)]/50 border-t-2 p-4 pt-6">
        <TelemetryDecoration label="SYS.GLOBAL_RIBBONS" className="-top-[17px] left-[-1px]" />
        <div className="flex items-center justify-between">
          <span className="tactical-text z-10 font-black text-lg text-white">GLOBAL RIBBON CHECKLIST</span>
          <span className="tactical-text z-10 text-xs text-zinc-400">
            MODE: {isLivingDex ? 'LIVING DEX' : 'STANDARD'}
          </span>
        </div>

        <div className="flex flex-col gap-2 border-zinc-800 border-b border-dashed pb-4">
          <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">MASTER RANK TRACKING</span>
          <div className="flex gap-2">
            {(['cool', 'beauty', 'cute', 'smart', 'tough'] as const).map((key) => {
              const isMaster = masterRanks[key];
              return (
                <div
                  key={key}
                  className={cn(
                    'flex items-center justify-center rounded-none border border-dashed px-3 py-1 font-mono text-xs uppercase transition-colors',
                    isMaster
                      ? 'border-purple-500/50 bg-purple-950/20 text-purple-400'
                      : 'border-zinc-800 bg-zinc-950 text-zinc-600',
                  )}
                  title={`${conditionMap[key]} Contest Master Rank Tracker`}
                >
                  {key}
                </div>
              );
            })}
          </div>
        </div>

        <div ref={parentRef} className="max-h-[500px] overflow-y-auto">
          <div
            style={{
              height: `${virtualizer.getTotalSize()}px`,
              width: '100%',
              position: 'relative',
            }}
          >
            {virtualizer.getVirtualItems().map((virtualRow) => {
              const pokemon = pokemonList[virtualRow.index];
              if (!pokemon) return null;

              return (
                <div
                  key={virtualRow.key}
                  ref={virtualizer.measureElement}
                  data-index={virtualRow.index}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                  className="flex items-center justify-between border-zinc-800 border-b border-dashed p-2 mb-2"
                >
                  <span className="font-mono text-sm text-white">
                    {pokemon.nickname || `Species ${pokemon.speciesId}`} (Lv {pokemon.level})
                  </span>
                  <div className="flex flex-wrap justify-end gap-2">
                    {pokemon.ribbons &&
                      // ⚡ Bolt: Replaced objectEntries().map() with a static array literal to eliminate runtime Object iteration and intermediate tuple allocations.
                      (['cool', 'beauty', 'cute', 'smart', 'tough'] as const).map((key) => {
                        const rank = pokemon.ribbons?.[key] ?? 0;
                        if (rank === 0 || rankMap[rank] === undefined) return null;
                        return <ContestRibbonBadge key={key} type={conditionMap[key]} rank={rankMap[rank]} />;
                      })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </TacticalPanel>
    </div>
  );
};

export const GlobalRibbonChecklistDashboard: React.FC = () => {
  return (
    <RibbonFilterProvider>
      <GlobalRibbonChecklistDashboardContent />
    </RibbonFilterProvider>
  );
};
