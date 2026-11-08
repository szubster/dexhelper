# Roamer Dossier Component & Test Deduplication

## Learnings
- **Unified Component**: Consolidated `Gen2RoamerDossier` and `Gen3RoamerDossier` into a single `RoamerDossier` component located in `src/features/roamer/components/RoamerDossier.tsx`.
- **Generation-aware UI Adaptation**: Unified rendering logic based on `saveData.generation`. Gen 2 displays tracking active/inactive status alongside map group/location translation, while Gen 3 displays detailed identification, personality values, IV breakdown, and IV truncation glitch warnings.
- **Unified Test Suite**: Consolidated redundant component test files (`Gen2RoamerDossier.browser.test.tsx` and `Gen3RoamerDossier.browser.test.tsx`) into `src/features/roamer/components/__tests__/RoamerDossier.browser.test.tsx`, maintaining 100% test coverage across both Gen 2 and Gen 3 roamer behaviors.
