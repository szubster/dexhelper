1. Extract suggestion generators (`generateCatchSuggestions`, `generateGiftAndTradeSuggestions`, `generateBreedingSuggestions`, `generateEvolutionSuggestions`) into separate files in a new `generators/` directory.
2. Ensure they are correctly typed and exported, updating imports.
3. Keep `suggestionEngine.ts` clean, serving only as the orchestrator to fetch data and call these generators.
4. Update `src/engine/assistant/suggestionEngine.ts` to import these generators.
5. Create `.jules/sculptor.md` and log the refactoring.
6. Verify changes with `pnpm lint`, `pnpm test`, and `pnpm test:e2e`.
7. Complete pre-commit steps.
8. Submit the PR.
