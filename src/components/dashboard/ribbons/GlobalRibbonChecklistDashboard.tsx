import type React from 'react';
import { useMemo } from 'react';
import { RibbonFilterProvider } from '../../../contexts/RibbonFilterContext';
import { useStore } from '../../../store';
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

        <div className="flex max-h-[500px] flex-col gap-2 overflow-y-auto">
          {pokemonList.map((pokemon, i) => (
            <div
              key={`${pokemon.speciesId}-${pokemon.slot || i}`}
              className="flex items-center justify-between border-zinc-800 border-b border-dashed p-2"
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
          ))}
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
