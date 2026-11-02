1. **Analyze Failure:** The CI failure is in `codecov/patch` stating `0.00% of diff hit (target 60.00%)`. This means I added code (`src/contexts/Gen3BattleFrontierContext.tsx` and modified `src/main.tsx`) without adding any corresponding tests, dropping the patch coverage below the 60% threshold.
2. **Consult Core Policies:** As an implementation task (Coder), I must provide unit tests for my changes to satisfy coverage requirements.
3. **Plan:**
   - I will create a unit test file for the context: `src/contexts/__tests__/Gen3BattleFrontierContext.test.tsx`.
   - The test will mock the store, render the provider, and verify that `gen3BattleFrontierWinStreaks` and `gen3BattleFrontierSymbols` are exposed when a Gen 3 save with that data is present, and null when not Gen 3 or data is absent.
   - I will run `pnpm test src/contexts/__tests__/Gen3BattleFrontierContext.test.tsx` to verify.
   - I will submit the PR to fix the coverage issue.
