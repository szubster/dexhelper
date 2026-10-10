---
id: research-551-668-investigate-orchestrator-priority-tests-failure
type: RESEARCH
title: Investigate Orchestrator Priority Tests Failure
status: READY
owner_persona: researcher
created_at: '2026-10-07'
updated_at: '2026-10-10'
depends_on: []
jules_session_id: null
parent: story-540-551-priority-engine-dispatch
rejection_reason: ''
locks: []
rejection_count: 1
---

# Investigate Orchestrator Priority Tests Failure

## Context
The task `task-551-565-update-orchestrator-priority-tests` has permanently failed due to reaching the max rejection count. We need to investigate why the tests for orchestrator priority sorting failed to complete successfully.

## Acceptance Criteria
- [x] Researcher: Investigate the orchestrator priority test failures. Review the rejection history and auditor/qa logs for `task-551-565-update-orchestrator-priority-tests`.
- [x] Document the root cause of the failures and provide guidelines or constraints on how to properly test orchestrator priority sorting.

## Research Findings
An investigation of the `git` history, `.foundry/journals/auditor/`, and `.foundry/journals/qa/` revealed no evidence of manual rejections or QA logs for `task-551-565-update-orchestrator-priority-tests`. According to core system policies, when a task permanently fails with `Max rejection count reached` but leaves no auditor/QA trace, it indicates a false permanent failure caused by system-level agent session crashes or session timeouts.

A common root cause for timeouts during test implementation tasks is the failure to properly run tests in the isolated `.github/scripts/` environment or the execution of blocking test runners without the correct Vitest flags.

### Testing Guidelines & Constraints
To properly write and execute tests for the Orchestrator's priority sorting logic (`.github/scripts/foundry-orchestrator.ts`), the following constraints must be strictly adhered to:
1. **Target Directory**: The tests must be added directly to the existing test file: `.github/scripts/foundry-orchestrator.test.ts`.
2. **Priority Logic Expectations**: The tests must verify that `priority ?? 50` is evaluated as the first sorting condition, ordering higher priority values before lower ones. `critical_weight` should only be evaluated as the secondary fallback condition when priority values are identical.
3. **Execution Context**: The tests must not be run globally from the repository root. The developer must navigate to the scripts directory and use `vitest run` instead of a continuous watch command to prevent session timeouts: `cd .github/scripts && pnpm install && npx vitest run foundry-orchestrator.test.ts`.
