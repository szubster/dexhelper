1. **Implement Breeding Dashboard Component (`src/components/dashboard/breeding/ShinyCarrierBreedingDashboard.tsx`)**
    - The component should use the tactical hardware aesthetic.
    - It needs to compute `BreedingPair` list. To do this, it should extract both `saveData.partyDetails` and `saveData.pcDetails`.
    - It should convert these `PokemonInstance` items into `PokemonWithMetadata` items.
    - This requires grabbing `PokemonMetadata` from IndexedDB via `pokeDB.getAllPokemon()`. Since this is async, we'll need to use `useQuery` or `useEffect` to grab it.
    - The conversion will calculate `gender` using `calculateGen2Gender(pokemon.dvs?.atk || 0, meta.gr || -1)` (Wait, `calculateGen2Gender` is for Gen 2). Wait, `gr` in metadata is gender rate.
    - We will map `eggGroups` from `meta.eg`.
    - We use `calculateBreedingPairs(list)` and show the top combinations.
    - The UI should display parents, their box/party location, and a tactical score representation.

2. **Update App Navigation & Dashboard**
    - In `src/components/AppHeader.tsx`, modify the condition to show the dashboard tab: `(saveData.generation === 3 || saveData.generation === 2)`. Change the label based on generation? E.g., `SYS.BTFR` for Gen 3 and `SYS.BRD` for Gen 2. Or just `SYS.DASH`. Let's use `SYS.DASH`. Wait, `SYS.DASH` is good.
    - In `src/components/BottomNav.tsx`, change `ariaLabel="Dashboard"` and `label="DASH"`.
    - In `src/routes/dashboard.tsx`, handle Gen 2 vs Gen 3. If Gen 2, show `ShinyCarrierBreedingDashboard`. If Gen 3, show `BattleFrontierDashboard` and `GlobalRibbonChecklistDashboard`.

3. **Complete Pre commit steps**
    - Ensure `pnpm check:fix`, `pnpm lint`, `pnpm test` pass. Ensure Playwright passes if necessary, but we can verify component manually too via `run_in_bash_session`.

4. **Update Task Checkboxes and Submit**
