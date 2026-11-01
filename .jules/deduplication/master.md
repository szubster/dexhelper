# Map Graph Distance Deduplication

## Learnings
- **Unified Generation Fallback Mapping**: Consolidated generation-specific fallback hubs (`DEFAULT_FALLBACK_MAP_IDS`) into `src/engine/mapGraph/index.ts` (Gen 1 -> 10 / Saffron City, Gen 2 -> 0x0306 / Goldenrod City, Gen 3 -> 0 / Littleroot Town).
- **Consolidated Strategy Interfaces**: Updated Gen 1, Gen 2, and Gen 3 assistant strategies to consume the unified `getDistanceToMap` API with generation parameter.
- **Unified Test Suite**: Replaced individual `gen1Graph.test.ts`, `gen2Graph.test.ts`, and `gen3Graph.test.ts` files with `src/engine/mapGraph/index.test.ts`.

---

# Roamer Dossier Component & Test Deduplication

## Learnings
- **Unified Component**: Consolidated `Gen2RoamerDossier` and `Gen3RoamerDossier` into a single `RoamerDossier` component located in `src/features/roamer/components/RoamerDossier.tsx`.
- **Generation-aware UI Adaptation**: Unified rendering logic based on `saveData.generation`. Gen 2 displays tracking active/inactive status alongside map group/location translation, while Gen 3 displays detailed identification, personality values, IV breakdown, and IV truncation glitch warnings.
- **Unified Test Suite**: Consolidated redundant component test files (`Gen2RoamerDossier.browser.test.tsx` and `Gen3RoamerDossier.browser.test.tsx`) into `src/features/roamer/components/__tests__/RoamerDossier.browser.test.tsx`, maintaining 100% test coverage across both Gen 2 and Gen 3 roamer behaviors.

---

# useAssistant Hook Test Suite Deduplication

## Learnings
- **Duplicate Test Suite Elimination**: Consolidated redundant test suite `src/hooks/useAssistant.test.tsx` (which resided outside the standard `__tests__` directory) into `src/hooks/__tests__/useAssistant.test.tsx`.
- **Selective Mocking Strategy**: By mocking only `fetchAssistantApiData` while keeping `generateSuggestions` as the real implementation in `src/hooks/__tests__/useAssistant.test.tsx`, both hook logic (null state, Mewtwo filtering, living dex, manual version, heatmap) and suggestion generation integration rules (ancestor catchability, version exclusive trades, "Catch Right Here" deduplication) are tested within a single unified suite without code or test duplication.

---

# Safari Zone Missing Encounter Deduplication

## Learnings
- **Parallel Generation Logic**: `getMissingGen1SafariEncounters` and `getMissingGen3SafariEncounters` implemented identical filtering loops over `SafariArea[]` using `SaveData` properties (`gameVersion`, `owned`, `party`, `pc`).
- **Unification Strategy**: Abstracted the game version lookup into `getSafariAreasForVersion(gameVersion)` while unifying `getMissingSafariEncounters(saveData)` to handle both Gen 1 and Gen 3 seamlessly.
- **Backward Compatibility**: Retained legacy exports (`getMissingGen1SafariEncounters`, `getMissingGen3SafariEncounters`) delegating to the unified function for non-breaking API usage if referenced downstream.

---

# Version Exclusive Reason Evaluator Deduplication

## Learnings
- **Unified Exclusives Evaluator**: Consolidated version exclusive lookup (`GEN1_VERSION_EXCLUSIVES`, `GEN2_VERSION_EXCLUSIVES`, `GEN3_VERSION_EXCLUSIVES`) and message formatting into `src/engine/exclusives/index.ts` and `common.ts`.
- **Eliminated Generation Branching**: Removed repetitive `if (generation === 3) getGen3UnobtainableReason ...` checks in `tradeGenerator.ts` and gen-specific strategy files by providing a unified `getUnobtainableReason` evaluator with flexible 3-arg and 4-arg signatures.
- **Consolidated Tests**: Merged redundant version exclusive test cases from `gen2Exclusives.test.ts` and `gen3Exclusives.test.ts` into a unified suite in `src/engine/exclusives/__tests__/index.test.ts`.