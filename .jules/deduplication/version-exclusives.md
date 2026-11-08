# Version Exclusive Reason Evaluator Deduplication

## Learnings
- **Unified Exclusives Evaluator**: Consolidated version exclusive lookup (`GEN1_VERSION_EXCLUSIVES`, `GEN2_VERSION_EXCLUSIVES`, `GEN3_VERSION_EXCLUSIVES`) and message formatting into `src/engine/exclusives/index.ts` and `common.ts`.
- **Eliminated Generation Branching**: Removed repetitive `if (generation === 3) getGen3UnobtainableReason ...` checks in `tradeGenerator.ts` and gen-specific strategy files by providing a unified `getUnobtainableReason` evaluator with flexible 3-arg and 4-arg signatures.
- **Consolidated Tests**: Merged redundant version exclusive test cases from `gen2Exclusives.test.ts` and `gen3Exclusives.test.ts` into a unified suite in `src/engine/exclusives/__tests__/index.test.ts`.
