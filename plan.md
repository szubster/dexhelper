1. **Add unit tests for `ShinyCarrierBreedingDashboard.tsx`:**
   - Create `src/components/dashboard/breeding/__tests__/ShinyCarrierBreedingDashboard.test.tsx`
   - Test that it returns null if generation is not 2.
   - Mock `useStore` to provide Gen 2 mock save data (party and pc details) including `isShinyCarrier` and `isShiny`.
   - Mock `pokeDB.getAllPokemon()` or intercept the query to provide metadata (`eggGroups`, `genderRate`).
   - Mock `calculateBreedingPairs` if needed, or use the actual function and provide correct mock data.
   - Assert that "OPTIMAL BREEDING PAIRS" is rendered.
   - Assert that pairs with `score > 0` are rendered.
   - Assert that "NO SHINY CARRIER BREEDING PAIRS AVAILABLE" is rendered when no valid pairs exist.
2. **Run tests to verify:**
   - Execute `pnpm test src/components/dashboard/breeding/__tests__/` and resolve any issues.
3. **Complete Pre commit steps:**
   - Run `pnpm check:fix`, `pnpm lint`, `pnpm test`
4. **Submit PR:**
   - Submit the PR using the `submit` tool to fix the codecov error.
