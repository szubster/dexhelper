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
