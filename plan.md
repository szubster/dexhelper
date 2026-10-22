1. Use `replace_with_git_merge_diff` on `src/components/PokedexGrid.tsx` with the following diff to import `hasPerfectIVsOrDVs`.
   ```
   <<<<<<< SEARCH
   import type { PokemonListItem } from '../engine/dex/pokedex';
   import { getGenerationConfig } from '../engine/generationConfig';
   =======
   import type { PokemonListItem } from '../engine/dex/pokedex';
   import { hasPerfectIVsOrDVs } from '../engine/filtering/IVFilters';
   import { getGenerationConfig } from '../engine/generationConfig';
   >>>>>>> REPLACE
   ```
2. Use `replace_with_git_merge_diff` on `src/components/PokedexGrid.tsx` with the following diff to add `perfectIvSet`. (Note: `saveData.partyDetails` and `saveData.pcDetails` are explicitly confirmed to exist in `SaveData` interface in `src/engine/saveParser/parsers/common.ts:287-289`, and are also used in `shinySpeciesIds` block in `src/components/PokedexGrid.tsx`).
   ```
   <<<<<<< SEARCH
     const partySet = React.useMemo(() => new Set(saveData?.party || []), [saveData?.party]);
     const pcSet = React.useMemo(() => new Set(saveData?.pc || []), [saveData?.pc]);

     const finalPokemon = React.useMemo(() => {
   =======
     const partySet = React.useMemo(() => new Set(saveData?.party || []), [saveData?.party]);
     const pcSet = React.useMemo(() => new Set(saveData?.pc || []), [saveData?.pc]);

     const perfectIvSet = React.useMemo(() => {
       const set = new Set<number>();
       if (saveData) {
         for (let i = 0; i < saveData.partyDetails.length; i++) {
           const p = saveData.partyDetails[i];
           if (p && hasPerfectIVsOrDVs(p)) set.add(p.speciesId);
         }
         for (let i = 0; i < saveData.pcDetails.length; i++) {
           const p = saveData.pcDetails[i];
           if (p && hasPerfectIVsOrDVs(p)) set.add(p.speciesId);
         }
       }
       return set;
     }, [saveData]);

     const finalPokemon = React.useMemo(() => {
   >>>>>>> REPLACE
   ```
3. Use `replace_with_git_merge_diff` on `src/components/PokedexGrid.tsx` with the following diff to use `perfectIvSet` in `finalPokemon`.
   ```
   <<<<<<< SEARCH
         if (filtersSet.has('missing') && !hasInStorage) {
           result.push(pokemon);
           continue;
         }
         if (filtersSet.has('dex-only') && saveData.owned.has(pokemon.id) && !hasInStorage) {
           result.push(pokemon);
         }
       }
       return result;
     }, [pokemonList, displayLimit, deferredSearchTerm, saveData, filtersSet, partySet, pcSet, locationPokemonIds]);
   =======
         if (filtersSet.has('missing') && !hasInStorage) {
           result.push(pokemon);
           continue;
         }
         if (filtersSet.has('dex-only') && saveData.owned.has(pokemon.id) && !hasInStorage) {
           result.push(pokemon);
           continue;
         }
         if (filtersSet.has('perfect-ivs') && perfectIvSet.has(pokemon.id)) {
           result.push(pokemon);
         }
       }
       return result;
     }, [pokemonList, displayLimit, deferredSearchTerm, saveData, filtersSet, partySet, pcSet, locationPokemonIds, perfectIvSet]);
   >>>>>>> REPLACE
   ```
4. Verify the changes to `src/components/PokedexGrid.tsx` with `sed -n '1,10p;40,95p' src/components/PokedexGrid.tsx`.
5. Use `replace_with_git_merge_diff` on `src/components/SearchAndFilters.tsx` with the following diff to handle `'perfect-ivs'` in the label and ariaLabel.
   ```
   <<<<<<< SEARCH
                       <FilterBadge
                         isActive={filtersSet.has(f)}
                         label={f === 'secured' ? 'SECURED' : f === 'missing' ? 'MISSING' : 'DEX_ONLY'}
                       />
                     </div>
                   ),
                   ariaLabel: f === 'secured' ? 'Secured filter' : f === 'missing' ? 'Missing filter' : 'Dex Only filter',
                   testId: `filter-${f}`,
   =======
                       <FilterBadge
                         isActive={filtersSet.has(f)}
                         label={f === 'secured' ? 'SECURED' : f === 'missing' ? 'MISSING' : f === 'perfect-ivs' ? 'PERFECT_IVS' : 'DEX_ONLY'}
                       />
                     </div>
                   ),
                   ariaLabel: f === 'secured' ? 'Secured filter' : f === 'missing' ? 'Missing filter' : f === 'perfect-ivs' ? 'Perfect IVs filter' : 'Dex Only filter',
                   testId: `filter-${f}`,
   >>>>>>> REPLACE
   ```
6. Verify the changes to `src/components/SearchAndFilters.tsx` with `sed -n '180,210p' src/components/SearchAndFilters.tsx`.
7. Run `npx vitest run src/store.test.ts`.
8. Run `export NODE_OPTIONS="--max-old-space-size=4096" && pnpm lint && pnpm test && timeout 30s xvfb-run -a pnpm test:e2e || true`.
9. Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.
10. Use the `submit` tool to create a Pull Request.
