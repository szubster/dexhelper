
## 2026-05-02 - Task FAILED: QA Legacy Save Migration Hook

**Task**: task-032-060-qa-legacy-save-migration
**Outcome**: FAILED
**Notes**: Notified TPM and Agile Coach: The `depends_on` order was broken. The migration logic (`migrateLegacySave`) was not actually implemented in the codebase by the coder, despite the dependency being marked as COMPLETED.
Completed task-034-059-qa-orchestrator-preflight. Verified preflight logic testing.

## 2026-05-04 - Task COMPLETED: QA Cascading Cancellation in Orchestrator

**Task**: task-036-063-qa-cascade-cancellation
**Outcome**: COMPLETED
**Notes**: Verified that the Coder's implementation of cascading cancellation in `.github/scripts/foundry-orchestrator.ts` meets requirements. Unit tests in `.github/scripts/foundry-orchestrator.test.ts` thoroughly cover the recursive cascading behavior, ensuring `COMPLETED` children are not overwritten, and maintaining idempotency. All tests pass cleanly.
# QA Journal

## 2026-05-10
Verified implementation of Hall of Fame count and roaming legendary (Raikou, Entei, Suicune) map location extraction for Gen 2 save files. The implementation matches the technical contract (`SaveData` updated correctly with `roamingLegendaries` and `parseGen2` properly calculates Hall of Fame counts and roamer locations via specified offsets for GS/Crystal). All checks passed (`pnpm lint` and `pnpm test`), and the unit tests adequately cover the mock GS/Crystal offset behaviors. Since the feature is fully implemented and tested, I have updated the task's markdown acceptance criteria to complete. Because there are no legitimate code modifications left to make, an empty PR will be submitted to allow the DAG to progress per the empty PR policy.

## [task-046-074-qa-branch-identification]
- Validated `identifyBranchesForCleanup` logic for branch identification corresponding to `FAILED` or `CANCELLED` nodes.
- Implementation for `FAILED` status was correct, but missing a test for `CANCELLED` nodes. Appended a new test case explicitly testing `CANCELLED` nodes to verify full coverage.
## [2026-05-10] QA Validation: task-043-074-qa-refactor-heartbeat-matter
- Verified that regex frontmatter manipulation in `foundry-heartbeat.ts` was successfully replaced with `gray-matter` compliant with ADR-006.
- Checked code in `transitionNodeToFailed` and `transitionNodeToReady` handles state updating cleanly using `matter.stringify` without regex.
- Verified tests successfully run indicating no regressions.

## 2026-05-11: QA Rejected Task 047-078
Rejected `task-047-078-implement-cleanup-remote-branches` and marked `task-047-079-qa-cleanup-remote-branches` as FAILED.
The QA check failed because the coder did not implement the `cleanupRemoteBranches` function in `.github/scripts/foundry-heartbeat.ts` nor did they write the required tests in `.github/scripts/foundry-heartbeat.test.ts`. I have updated the markdown bodies of both task nodes and recorded the rejection reasons.
## 2026-05-11: DAG Parser Verification

**Task Verified:** `.foundry/tasks/task-043-076-qa-dag-parser.md`

### Verification Summary
- Reviewed `src/utils/dag/readFoundryFiles.ts`, `src/utils/dag/parser.ts`, and `src/utils/dag/builder.ts` implementing DAG generation components.
- Implementation correctly utilizes `gray-matter` for safe YAML parsing and constructs the expected dependency structures.
- Ran all tests via `pnpm test`. All 334 tests passed, including the newly added tests inside `src/utils/dag/` (`builder.test.ts`, `parser.test.ts`, `readFoundryFiles.test.ts`).
- Verification successful. Marked the Acceptance Criteria checkboxes as completed in the corresponding task node.

## 2026-05-11
- **Mock Leakage in Vitest:** Encountered an issue where `globalFetch.mock.calls` contained `DELETE` calls from a previous test within the same block, despite `vi.clearAllMocks()` being called in `beforeEach()`. For highly dynamic global stubs like `vi.stubGlobal('fetch', globalFetch)`, it is sometimes necessary to explicitly call `globalFetch.mockClear()` immediately before critical `globalFetch.mockImplementation()` setups if delayed or background promises are bleeding state across tests.
- **GitHub API Response Types:** The `pulls?state=open` and `matching-refs` endpoints may return `{ ok: false }` or a generic object `{}` on error or during unexpected mock configurations. Directly mapping `await res.json() as any[]` without checking `Array.isArray()` can lead to `TypeError: openPrs.map is not a function`, silently failing async functions and masking test failures.
## 2026-05-11: QA Validation for task-042-070-qa-hall-of-fame-roamers
- Verified that Hall of Fame count and roaming legendary extraction for Gen 2 save files is properly implemented in `src/engine/saveParser/parsers/gen2.ts`.
- Verified offsets used match the knowledge base instructions (e.g. `0xA8` relative to Johto badges for Hall of Fame count).
- Confirmed unit tests and fixture tests pass successfully (`pnpm test`).
- Updated task node markdown body with checked acceptance criteria. Submitting an empty PR to allow DAG progression.

### 2026-05-12 - Gen 2 Map Resolution
Successfully verified `resolveOutdoorMapId` logic in `gen1Graph.ts` and `gen2Graph.ts`. Added comprehensive tests to ensure multi-level graph routing works, and verified the implementation correctly handles protection against circular prnt references by using a `Set`.

## 2026-05-12 - Acceptance Criteria Regex Bug Fix
Verified the changes made in `task-050-083-enforce-acceptance-criteria.md`. Wrote orchestrator and heartbeat tests for leaf/parent task failure state logic with unfulfilled criteria. Also identified and fixed a bug where the orchestrator validated the *entire* markdown body instead of just the `## Acceptance Criteria` block.

## 2026-05-13: DAG Dashboard Graph Integration Validation

- **Task**: `task-048-082-qa-graph-integration`
- **Result**: PASSED (Empty PR)
- **Learning/Pattern**: The React Flow integration successfully renders nodes and handles panning/zooming. The lack of filtering and highlighting dependencies will be addressed in a future task. All acceptance criteria checked in the markdown body.

## 2026-05-14
- Verified that `foundry-heartbeat.test.ts` and `foundry-orchestrator.test.ts` contain the appropriate tests to enforce acceptance criteria as per ADR 007. The orchestrator logic tasks for `task-050-083-enforce-acceptance-criteria.md` were successfully implemented. The target artifact already exists and is complete. Applied Empty PR policy and logged the decision.

## 2026-05-14 - Task FAILED: QA Verification for Graph Component

**Task**: task-051-087-implement-core-graph-visualizer
**Outcome**: FAILED
**Notes**: The implementation violated the aesthetic constraints defined in ADR 008. The `DagNode` component passes a className with `rounded-t` to `TelemetryDecoration`, which violates the strict `rounded-none` requirement. The task has been marked as `FAILED` with a detailed rejection reason.

## 2026-05-16 - Task COMPLETED: QA Verification for Graph Component
**Task**: task-051-088-qa-core-graph-visualizer
**Outcome**: COMPLETED
**Notes**: Verified that the coder successfully implemented the Core Graph Visualizer using React Flow. The custom `DagNode` component correctly renders `id`, `type`, `status`, and `owner_persona`. Specifically, the aesthetic violations from previous rejections (e.g., `rounded-t`) have been fixed; the implementation now strictly adheres to the ADR 008 "tactical hardware" aesthetics (`rounded-none`, `border-dashed`, `font-mono`). All tests pass (`pnpm lint` and `pnpm test`). The markdown acceptance criteria were already checked. Submitting an empty PR to allow DAG progression.

## QA Validation for Gen 2 Cross-Region Distance

Verified the `getDistanceToMap` cross-region calculation using a local `.cjs` script loading `locations.jsonl`.
Since `scripts/generate-pokedata.ts` was properly updated to include all nodes and connect cross-region distances,
distances such as Saffron City (ID: 10) to Goldenrod City (ID: 774) show correctly as 1.
Verified via `pnpm test` that `gen2Graph.test.ts` handles the simulated structure perfectly.
No YAML changes were made per standard Foundry architecture rules.

## 2026-05-16
- Verified `task-052-090-implement-graph-filtering`. React Flow components (like `Controls` and `MiniMap`) can be successfully styled to match the tactical hardware aesthetic using strict Tailwind overrides (e.g., `!rounded-none !border-dashed`), proving the library selection from ADR 008 is effective for custom aesthetic requirements.

## 2026-05-18 - Task FAILED: Implement Gen3 Map Graph Structure

**Task**: task-059-098-gen3-map-graph-structure-impl
**Outcome**: FAILED
**Notes**: The coder failed to implement `gen3Graph.ts` in `src/engine/mapGraph/` as required. Validation for `task-059-099-gen3-map-graph-structure-qa` could not be completed.
