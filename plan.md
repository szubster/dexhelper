1. cat << 'INNER_EOF' > src/features/shiny-breeding/components/ShinyBreedingManualSelector.tsx
import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParsedSaveData } from '../../../contexts/EmulatorContext';
import { useShinyBreedingStore, getDerivedParentStats } from '../store';
import { TacticalSelect } from '../../../components/TacticalSelect';
import { TacticalPanel } from '../../../components/TacticalPanel';
import { TelemetryDecoration } from '../../../components/TelemetryDecoration';
import { calculateShinyOdds } from '../../../engine/breeding/shiny';
import { pokeDB } from '../../../db/PokeDB';
import type { PokemonInstance } from '../../../engine/saveParser/parsers/common';
import type { PokemonWithMetadata } from '../../../engine/breeding/pair_algorithm';

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
      list.push({ mon: p, label: `PARTY - SLOT ${i + 1} (${meta?.n?.toUpperCase() || 'UNKNOWN'})`, indexId: `party-${i}` });
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
    idPrefix: string
  ) => {
    const meta = parent ? metadataMap.get(parent.speciesId) : undefined;
    const stats = getDerivedParentStats(parent, meta);

    return (
      <div className="flex flex-col gap-2">
        <label className="font-mono text-xs text-zinc-400">{label}</label>
        <TacticalSelect
          value={allPokemon.find(p => p.mon === parent)?.indexId || ''}
          onChange={(e) => {
            const selected = allPokemon.find(p => p.indexId === e.target.value);
            setParent(selected ? selected.mon : null);
          }}
        >
          <option value="">-- SELECT POKEMON --</option>
          {allPokemon.map(p => (
            <option key={p.indexId} value={p.indexId}>{p.label}</option>
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
  if (store.parent1 && store.parent2 && metadataMap.has(store.parent1.speciesId) && metadataMap.has(store.parent2.speciesId)) {
    const m1 = metadataMap.get(store.parent1.speciesId)!;
    const m2 = metadataMap.get(store.parent2.speciesId)!;
    const s1 = getDerivedParentStats(store.parent1, m1);
    const s2 = getDerivedParentStats(store.parent2, m2);
    if (s1 && s2 && store.parent1.dvs && store.parent2.dvs) {
        const pA: PokemonWithMetadata = {
          id: 'p1', speciesId: store.parent1.speciesId, gender: s1.gender === 'male' ? 'Male' : s1.gender === 'female' ? 'Female' : 'Genderless', eggGroups: m1.eg || [], isShiny: !!store.parent1.isShiny, dvs: { attack: store.parent1.dvs.atk, defense: store.parent1.dvs.def, speed: store.parent1.dvs.spd, special: store.parent1.dvs.spc }
        };
        const pB: PokemonWithMetadata = {
          id: 'p2', speciesId: store.parent2.speciesId, gender: s2.gender === 'male' ? 'Male' : s2.gender === 'female' ? 'Female' : 'Genderless', eggGroups: m2.eg || [], isShiny: !!store.parent2.isShiny, dvs: { attack: store.parent2.dvs.atk, defense: store.parent2.dvs.def, speed: store.parent2.dvs.spd, special: store.parent2.dvs.spc }
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
INNER_EOF

2. ls -l src/features/shiny-breeding/components/ShinyBreedingManualSelector.tsx

3. sed -i '/const ShinyCarrierBreedingDashboard = React.lazy/i const ShinyBreedingManualSelector = React.lazy(() => import("../features/shiny-breeding/components/ShinyBreedingManualSelector").then((m) => ({ default: m.ShinyBreedingManualSelector })));' src/routes/dashboard.tsx

4. sed -i '/<ShinyCarrierBreedingDashboard \/>/a \            <ShinyBreedingManualSelector />' src/routes/dashboard.tsx

5. cat src/routes/dashboard.tsx | grep "ShinyBreedingManualSelector"

6. mkdir -p src/features/shiny-breeding/components/__tests__ && cat << 'INNER_EOF' > src/features/shiny-breeding/components/__tests__/ShinyBreedingManualSelector.test.tsx
import { render } from 'vitest-browser-react';
import { expect, test, vi, beforeEach } from 'vitest';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ShinyBreedingManualSelector } from '../ShinyBreedingManualSelector';
import { EmulatorContext } from '../../../../contexts/EmulatorContext';
import { useShinyBreedingStore } from '../../store';

vi.mock('../../../../db/PokeDB', () => ({
  pokeDB: {
    getAllPokemon: vi.fn().mockResolvedValue([
      { id: 25, n: 'Pikachu', gr: 4, eg: [1] },
      { id: 132, n: 'Ditto', gr: -1, eg: [15] }
    ])
  }
}));

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

const mockSaveData = {
  generation: 2,
  partyDetails: [
    { speciesId: 25, dvs: { atk: 15, def: 10, spd: 10, spc: 10 }, isShiny: true }
  ],
  pcDetails: [
    { speciesId: 132, dvs: { atk: 7, def: 10, spd: 10, spc: 10 }, isShiny: false }
  ]
};

beforeEach(() => {
    useShinyBreedingStore.getState().clearParents();
});

test('renders manual selector and calculates odds', async () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <EmulatorContext.Provider value={{ parsedSaveData: mockSaveData as any } as any}>
        {children}
      </EmulatorContext.Provider>
    </QueryClientProvider>
  );

  const { getByText } = await render(<ShinyBreedingManualSelector />, { wrapper });

  await expect.element(getByText('MANUAL PAIR EVALUATION')).toBeVisible();

  const selects = document.querySelectorAll('select');
  expect(selects.length).toBe(2);

  useShinyBreedingStore.getState().setParent1(mockSaveData.partyDetails[0] as any);
  useShinyBreedingStore.getState().setParent2(mockSaveData.pcDetails[0] as any);

  await expect.element(getByText('MALE OFFSPRING: 1/64')).toBeVisible();
});
INNER_EOF

7. ls -l src/features/shiny-breeding/components/__tests__/ShinyBreedingManualSelector.test.tsx

8. sed -i '/^});/i \
  test("should manually select breeding parents and calculate shiny odds", async ({ page }) => {\
    await initializeWithSave(page, "tests/fixtures/saves/gen2/Pokemon Gold - TID 15051.sav");\
    await page.goto("./dashboard");\
    await expect(page.getByText("MANUAL PAIR EVALUATION").first()).toBeVisible({ timeout: 15000 });\
\
    await page.evaluate(() => {\
      const state = window.useStore.getState();\
      window.useStore.setState({\
        ...state,\
        saveData: {\
          ...state.saveData,\
          generation: 2,\
          partyDetails: [\
            { speciesId: 25, isShiny: true, isShinyCarrier: false, dvs: { atk: 15, def: 10, spd: 10, spc: 10 } },\
            { speciesId: 132, isShiny: false, isShinyCarrier: false, dvs: { atk: 7, def: 5, spd: 10, spc: 12 } }\
          ],\
          pcDetails: [],\
        } as unknown as typeof state.saveData,\
      });\
    });\
\
    const dropdowns = page.locator(".tactical-select");\
    await dropdowns.nth(0).selectOption({ index: 1 });\
    await dropdowns.nth(1).selectOption({ index: 2 });\
\
    await expect(page.getByText("MALE OFFSPRING: 1/64").first()).toBeVisible({ timeout: 15000 });\
  });' tests/e2e/gen2_breeding.spec.ts

9. tail -n 30 tests/e2e/gen2_breeding.spec.ts

10. sed -i 's/- \[ \]/- [x]/g' .foundry/tasks/task-676-703-gen2-pokemon-selection-ui.md

11. pnpm lint && pnpm test && xvfb-run -a pnpm test:e2e tests/e2e/gen2_breeding.spec.ts

12. Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.

13. Use the submit tool to create the final Pull Request.
