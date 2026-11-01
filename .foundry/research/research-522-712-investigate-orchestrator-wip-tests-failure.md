---
id: research-522-712-investigate-orchestrator-wip-tests-failure
type: RESEARCH
title: Investigate Orchestrator WIP Awareness E2E Tests Failure
status: COMPLETED
owner_persona: researcher
created_at: '2026-10-21'
updated_at: '2026-10-31'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-520-522-wip-awareness-e2e
tags:
  - foundry
  - orchestrator
  - wip
  - e2e
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
---

# Investigate Orchestrator WIP Awareness E2E Tests Failure

Investigate the root cause for why the orchestrator WIP awareness E2E tests (`task-522-685-wip-awareness-e2e-orchestrator-tests`) repeatedly failed and hit the maximum rejection limit.

## Acceptance Criteria
- [x]  Investigate the root cause of the previous failure.
- [x]  Propose a solution for a successful implementation.
### Investigation Report
The root cause for the failure of `task-522-685-wip-awareness-e2e-orchestrator-tests` stems from the strict mode validation logic in `packages/foundry/foundry-orchestrator.ts`. When the orchestrator encounters a dependency marked as `DRAFT` or `WIP`, it flags it by setting `hasUnresolvableDeps = true` and logging a warning. Under strict mode, any presence of warnings or unresolvable dependencies causes the orchestrator to exit with code `1`. This blocks the pipeline entirely instead of simply suspending the dependent nodes, triggering a CI pipeline failure.

### Proposed Solution
The orchestrator should distinguish between genuinely unresolvable nodes (missing files) and valid, existing nodes that are simply in a `DRAFT` or `WIP` state.
- In `packages/foundry/foundry-orchestrator.ts`, remove the `hasUnresolvableDeps = true` assignment within the `DRAFT` and `WIP` dependency checks (around lines 894 and 1209).
- Change the `warn()` calls to `info()` within these specific checks to prevent them from triggering the `hasWarnings` strict mode failure.
- Ensure that these checks still set `shouldSuspend = true` (or `blocked = true`) so that the dependent nodes are correctly deferred without crashing the pipeline.
- Update the E2E test in `packages/foundry/foundry-orchestrator.test.ts` to expect an exit code of `0` (instead of `1`) when encountering `DRAFT` or `WIP` dependencies, reflecting the new intentional suspension behavior.
