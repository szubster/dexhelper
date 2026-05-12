# 2026-04-23 - Task 018

Successfully implemented the Scheduled Agent Registry by creating the GitHub Actions workflows for TPM and Agile Coach personas.

Verified empty state prompt inclusion in scheduled-agent workflow by extracting the jq construction step and confirming the format locally. Also checked the task as completed.

### Task: task-017-041-fix-jest-standalone-expect
- Re-enabled `jest/no-standalone-expect` in `.oxlintrc.json`.
- To avoid oxlint throwing false positives on `expect` calls inside Vitest's custom test functions, added `additionalTestBlockFunctions` to the rule configuration:
  `"jest/no-standalone-expect": ["error", { "additionalTestBlockFunctions": ["customTest", "customTest.for", "customTest.each"] }]`
- Verified `pnpm exec oxlint .` and `pnpm test` passed.

## 2026-04-29
- **task-016-039-oxlint-type-aware**: Successfully updated package.json to enable oxlint's `--type-aware` and `--type-check` flags. Verified changes by resolving TypeScript errors in `.github/scripts/foundry-orchestrator.ts` and `.github/scripts/foundry-heartbeat.ts`. Also added a tech debt task `task-016-056-fix-heartbeat-test-types` to address the type mismatch in `foundry-heartbeat.test.ts`. Verified the final state via pnpm lint, test, and test:e2e.

## 2026-04-29 - task-032-052-implement-migration-logic
- **What**: Implemented safe migration of legacy save files from `localStorage` to IndexedDB (`saveDB`) during app startup.
- **How**: Added a migration block inside `store.ts` (`loadSaveFromStorage`) which reads the legacy base64 file, decodes it into a `Uint8Array`, and passes it to `saveDB.putSave()`. It then strictly deletes the old `localStorage` entry only if it was successfully moved or parsed as corrupted. Also removed `localStorage` write references from `AppLayout.tsx` and `SettingsModal.tsx`, and updated `store.test.ts` to mock `saveDB`.
- **Learnings**: When mocking stores with Zustand `persist`, handle missing `getItem` data gracefully. In Playwright UI, always ensure async state reads use `await`.

## 2026-04-29
- Fixed type errors in `.github/scripts/foundry-heartbeat.test.ts`.
- Removed `// @ts-nocheck` directive.
- Verified by running `pnpm exec oxlint --type-check --type-aware`, `pnpm test`, and `pnpm lint`.

## 2026-04-29 (Update)
- CodeQL caught incomplete substring matching of URL string in `.github/scripts/foundry-heartbeat.test.ts`. Fixed it to use `startsWith('https://jules.googleapis.com')` instead of `includes('jules.googleapis.com')`. This avoids CWE-285 vulnerabilities as noted in `.foundry/docs/knowledge_base/onboarding/autonomous_memory_protocol.md` and standard security practices.

## 2026-04-29 (CodeQL Follow-up)
- CodeQL caught incomplete substring matching of URL string in `.github/scripts/foundry-heartbeat.test.ts`. Modified `startsWith('https://jules.googleapis.com')` to `startsWith('https://jules.googleapis.com/')` (adding trailing slash) to satisfy the arbitrary host name vulnerability check (e.g. preventing `https://jules.googleapis.com.evil.com/`). This adheres to the strict URL validation principles outlined in `.foundry/docs/knowledge_base/onboarding/autonomous_memory_protocol.md` to prevent CWE-285 vulnerabilities.
- Removed localStorage sync logic and Base64 decoding from src/store.ts

### Task: task-026-044-refactor-state-store-sync
- Removed `localStorage` save file logic and Base64 encoding/decoding/validation logic from `src/store.ts`.
- Replaced the implementation to directly rely on `IndexedDB` via `saveDB.getSave`.
- Updated test cases in `src/store.test.ts` to mock `saveDB.getSave` successfully instead of `localStorage`.
- Verified the changes by running `pnpm lint`, `pnpm test`, and `pnpm test:e2e` to ensure no regressions were introduced.

## 2026-05-04: Implement Cascading Cancellation in Orchestrator
The target artifact already exists and is complete. The cascading cancellation logic is already implemented in `cascadeCancel` at Phase 3.1 in `.github/scripts/foundry-orchestrator.ts`. The corresponding unit tests covering all required cases are already present in `.github/scripts/foundry-orchestrator.test.ts`. Submitting an empty PR to allow the DAG to progress.

## task-038-064-implement-mapping-validation

The mapping validation logic and unit tests are already implemented. Submitting empty PR as per EMPTY PR POLICY.

- **2026-05-12**: Implemented branch identification logic in `.github/scripts/foundry-heartbeat.ts` for epic `epic-019-030-automated-branch-cleanup`.
  - Exported `identifyBranchesForCleanup(repoRoot: string, remoteBranches: string[], openPrHeadRefs: string[] = []): Promise<string[]>`.
  - Added test coverage in `.github/scripts/foundry-heartbeat.test.ts`.
  - Ensure to ignore active PR branches based on explicit requirements.
  - Used GitHub APIs to check active PRs for branches would be the consumer's responsibility. The identification logic accepts open PR refs and protects them.
- 2026-05-10: Refactored `foundry-heartbeat.ts` to use `gray-matter`. Replaced regex frontmatter manipulations with `gray-matter` logic in `transitionNodeToFailed`, `transitionNodeToCompleted`, and `transitionNodeToReady`. `gray-matter` writes yaml strings unquoted, so tests were updated accordingly.

## Memory from Task task-043-071-implement-gen2-map-graph
- Gen 2 `UnifiedLocation.id` values are encoded as `(group << 8) | id` rather than simple array indices as in Gen 1. For example, Goldenrod City is map group 3, map ID 6, which translates to `0x0306`.
- We successfully implemented `src/engine/mapGraph/gen2Graph.ts` with explicit definition of `gen2MapGraph` which contains nodes and connections across Johto and Kanto.
## 2026-05-10
Task task-046-077-standardize-orchestrator-test-factories: Implemented `foundry-test-utils.ts` and refactored the orchestrator tests to dynamically create mock nodes passing Phase 4.8 Mapping Validations. Ensure `gray-matter.stringify` is not used in frontmatter body replacements but we manually wrote a serializer for frontmatter stringification during mock file creation. Ensure `pr_number` handles null without TS errors.

## 2026-05-12 - task-042-069-extract-roamers
The roamer location extraction logic for Gen 2 (Raikou, Entei, Suicune) is already implemented in `src/engine/saveParser/parsers/gen2.ts`, and the corresponding tests exist in `src/engine/saveParser/parsers/gen2.test.ts`. Submitting an empty PR to allow the DAG to progress.

## 2026-05-12: Resolved Architect-Owned Task Validation Failure

### Insight
Foundry task nodes were failing orchestration because the `architect` persona was not recognized as a valid owner for `TASK` types in `scripts/validate-foundry-schema.ts` and `.github/scripts/foundry-orchestrator.ts`. This restricted architects to only `PRD` and `EPIC` nodes, preventing them from owning evaluative or research tasks.

### Pattern
When updating node type-to-persona mappings, ensure consistency across:
1. `scripts/validate-foundry-schema.ts`: Used for pre-commit and local validation.
2. `.github/scripts/foundry-orchestrator.ts`: Used for engine orchestration and state transitions.
3. `.github/scripts/foundry-orchestrator.test.ts`: To verify the mapping logic and prevent regressions.

### Action
Added `architect` to `TASK` mappings in both scripts and updated the test suite to include a test case for architect-owned tasks. Also synchronized `RESEARCH` type in `validate-foundry-schema.ts`.
