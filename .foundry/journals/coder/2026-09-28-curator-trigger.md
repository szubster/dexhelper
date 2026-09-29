# Curator Trigger Logic Implementation

## Context
Implemented the logic in the Foundry Orchestrator to trigger the `curator` persona when an `IDEA` node is fully implemented but before final verification by the `auditor`.

## Key Changes
1. **Heartbeat:** Updated `.github/scripts/foundry-heartbeat.ts` to transition `IDEA` nodes not owned by `curator` or `auditor` to `READY` with `owner_persona: "curator"` instead of directly to `VERIFYING` with `auditor`.
2. **Orchestrator:** Updated `.github/scripts/foundry-orchestrator.ts`:
   - Modified `promoteNodeStatus` to optionally accept and apply a `newOwner`.
   - Intercepted `IDEA` node promotions to `COMPLETED` in Phase 4.1 (Late-Binding Parent completion) and Phase 4.5 (Idempotent checks), routing them instead to `READY` and `curator`.
   - Added `curator` to the Valid mapping bypass list in Phase 4.8.
3. **Tests:**
   - Updated existing `IDEA` tests in `.github/scripts/foundry-heartbeat.test.ts` to expect `READY` and `curator`.
   - Updated existing `IDEA` tests in `.github/scripts/foundry-orchestrator.test.ts` that expected direct transition to `COMPLETED` by changing the node types to `EPIC` and `STORY` to preserve the testing logic for standard macro nodes.
   - Added a specific new test for the Late-Binding `IDEA` node transitioning to `READY` with `curator` in `.github/scripts/foundry-orchestrator.test.ts`.

## Learnings
- **Test Preservation:** When modifying core orchestrator behavior that intercepts state transitions for specific node types (like `IDEA`), ensure existing tests covering the base promotion logic are preserved by switching their fixtures to non-intercepted node types (like `EPIC`).
