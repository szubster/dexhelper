import { useQuery } from '@tanstack/react-query';
import type React from 'react';
import { useMemo } from 'react';
import { TacticalPanel } from '../../../components/TacticalPanel';
import { TacticalSelect } from '../../../components/TacticalSelect';
import { TelemetryDecoration } from '../../../components/TelemetryDecoration';
import { useParsedSaveData } from '../../../contexts/EmulatorContext';
import { pokeDB } from '../../../db/PokeDB';
import type { PokemonWithMetadata } from '../../../engine/breeding/pair_algorithm';
import { calculateShinyOdds } from '../../../engine/breeding/shiny';
import type { PokemonInstance } from '../../../engine/saveParser/parsers/common';
import { getDerivedParentStats, useShinyBreedingStore } from '../store';

function getBoxLocation(index: number): string {
  const boxNum = Math.floor(index / 20) + 1;
  const slotNum = (index % 20) + 1;
  return `BOX ${boxNum} - SLOT ${slotNum}`;
}

export const ShinyBreedingManualSelector: React.FC = () => {
  const saveData = useParsedSaveData();
  const store = useShinyBreedingStore();

  const { data: pokemonMetaList } = useQuery({
    queryKey: ['pokemonMetaList'],
    queryFn: async () => pokeDB.getAllPokemon(),
  });

  const metadataMap = useMemo(() => {
    const map = new Map();
    if (pokemonMetaList) {
      for (const p of pokemonMetaList) map.set(p.id, p);
    }
    return map;
  }, [pokemonMetaList]);

  const allPokemon = useMemo(() => {
    if (saveData?.generation !== 2) return [];
    const list: { mon: PokemonInstance; label: string; indexId: string }[] = [];
    saveData.partyDetails.forEach((p, i) => {
      const meta = metadataMap.get(p.speciesId);
      list.push({
        mon: p,
        label: `PARTY - SLOT ${i + 1} (${meta?.n?.toUpperCase() || 'UNKNOWN'})`,
        indexId: `party-${i}`,
      });
    });
    saveData.pcDetails.forEach((p, i) => {
      const meta = metadataMap.get(p.speciesId);
      list.push({ mon: p, label: `${getBoxLocation(i)} (${meta?.n?.toUpperCase() || 'UNKNOWN'})`, indexId: `pc-${i}` });
    });
    return list;
  }, [saveData, metadataMap]);

  const renderParentSelector = (
    parent: PokemonInstance | null,
    setParent: (p: PokemonInstance | null) => void,
    label: string,
    _idPrefix: string,
  ) => {
    const meta = parent ? metadataMap.get(parent.speciesId) : undefined;
    const stats = getDerivedParentStats(parent, meta);

    return (
      <div className="flex flex-col gap-2">
        <div className="font-mono text-xs text-zinc-400">{label}</div>
        <TacticalSelect
          value={allPokemon.find((p) => p.mon === parent)?.indexId || ''}
          onChange={(e) => {
            const selected = allPokemon.find((p) => p.indexId === e.target.value);
            setParent(selected ? selected.mon : null);
          }}
        >
          <option value="">-- SELECT POKEMON --</option>
          {allPokemon.map((p) => (
            <option key={p.indexId} value={p.indexId}>
              {p.label}
            </option>
          ))}
        </TacticalSelect>
        {stats && (
          <TacticalPanel className="flex flex-col gap-1 p-2 font-mono text-xs">
            <div>SPECIES: {meta?.n?.toUpperCase() || stats.speciesId}</div>
            <div>GENDER: {stats.gender.toUpperCase()}</div>
            <div>DEF DV: {stats.defenseDv}</div>
            <div>SPC DV: {stats.specialDv}</div>
          </TacticalPanel>
        )}
      </div>
    );
  };

  let oddsResult = null;
  if (
    store.parent1 &&
    store.parent2 &&
    metadataMap.has(store.parent1.speciesId) &&
    metadataMap.has(store.parent2.speciesId)
  ) {
    const m1 = metadataMap.get(store.parent1.speciesId) as import('../../../db/schema').PokemonMetadata;
    const m2 = metadataMap.get(store.parent2.speciesId) as import('../../../db/schema').PokemonMetadata;
    const s1 = getDerivedParentStats(store.parent1, m1);
    const s2 = getDerivedParentStats(store.parent2, m2);
    if (s1 && s2 && store.parent1.dvs && store.parent2.dvs) {
      const pA: PokemonWithMetadata = {
        id: 'p1',
        speciesId: store.parent1.speciesId,
        gender: s1.gender === 'male' ? 'Male' : s1.gender === 'female' ? 'Female' : 'Genderless',
        eggGroups: m1.eg || [],
        isShiny: !!store.parent1.isShiny,
        dvs: {
          attack: store.parent1.dvs.atk,
          defense: store.parent1.dvs.def,
          speed: store.parent1.dvs.spd,
          special: store.parent1.dvs.spc,
        },
      };
      const pB: PokemonWithMetadata = {
        id: 'p2',
        speciesId: store.parent2.speciesId,
        gender: s2.gender === 'male' ? 'Male' : s2.gender === 'female' ? 'Female' : 'Genderless',
        eggGroups: m2.eg || [],
        isShiny: !!store.parent2.isShiny,
        dvs: {
          attack: store.parent2.dvs.atk,
          defense: store.parent2.dvs.def,
          speed: store.parent2.dvs.spd,
          special: store.parent2.dvs.spc,
        },
      };
      oddsResult = calculateShinyOdds(pA, pB);
    }
  }

  if (saveData?.generation !== 2) return null;

  return (
    <TacticalPanel className="relative mt-4 flex flex-col gap-4 border-t-2 border-[var(--theme-primary)]/50 p-4 pt-6">
      <TelemetryDecoration label="SYS.MANUAL_BREEDING" className="-top-[17px] left-[-1px]" />
      <span className="tactical-text z-10 text-lg font-black text-white">MANUAL PAIR EVALUATION</span>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {renderParentSelector(store.parent1, store.setParent1, 'PARENT 1', 'p1')}
        {renderParentSelector(store.parent2, store.setParent2, 'PARENT 2', 'p2')}
      </div>
      {oddsResult && (
        <TacticalPanel className="mt-2 border-dashed border-zinc-700 p-3 font-mono text-xs">
          <div className="mb-2 font-bold text-amber-500">SHINY ODDS:</div>
          <div>MALE OFFSPRING: {oddsResult.maleOffspringOdds}</div>
          <div>FEMALE OFFSPRING: {oddsResult.femaleOffspringOdds}</div>
        </TacticalPanel>
      )}
    </TacticalPanel>
  );
};
