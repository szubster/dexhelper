---
id: research-640-676-investigate-relocate-scripts-replacement-failure-retry
type: RESEARCH
title: Investigate Relocate Scripts Replacement Failure Retry
status: ACTIVE
owner_persona: researcher
created_at: '2026-10-10'
updated_at: '2026-10-14'
depends_on: []
jules_session_id: '10771314756622357671'
pr_number: null
parent: story-525-640-relocate-foundry-scripts
tags:
  - architecture
  - monorepo
  - pnpm
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
---

# Investigate Relocate Scripts Replacement Failure Retry

The replacement task `task-640-669-relocate-foundry-scripts-replacement-v2` permanently failed due to its dependency `research-640-668-investigate-relocate-scripts-replacement-failure` permanently failing. Investigate the root cause to ensure the next replacement task succeeds.

## Acceptance Criteria
- [x] Determine why `task-640-653-relocate-foundry-scripts-replacement` or `research-640-668` failed permanently.
- [x] Document findings and provide actionable steps to resolve the issue for the next replacement task.

## Findings
The replacement task `task-640-669-relocate-foundry-scripts-replacement-v2` was permanently cancelled because its upstream dependency, `research-640-668-investigate-relocate-scripts-replacement-failure`, failed permanently (reaching the maximum rejection count of 3).

The root cause of `research-640-668` failing permanently was that the assigned agent repeatedly failed to successfully complete the node's lifecycle. Specifically, the agent either failed to explicitly call the `submit` tool (resulting in an Orchestrator timeout/crash with "Session terminated with state: COMPLETED") or submitted an empty PR without checking off the Acceptance Criteria checkboxes in the markdown body (violating ADR 007 completeness contract, leading to immediate rejection). As observed in the markdown of `research-640-668`, the checkboxes were left unchecked (`- [ ]`).

Similarly, `task-640-653-relocate-foundry-scripts-replacement` permanently failed and was replaced because of similar lifecycle crashes or failure to correctly mark the Acceptance Criteria as checked before submitting.

## Recommendations
For the next replacement task (e.g., `task-640-677-relocate-foundry-scripts-replacement-v3`), ensure that:
1. The assigned agent explicitly uses the `submit` tool to open a PR.
2. The agent explicitly checks off all Acceptance Criteria checkboxes (`- [x]`) in the task's markdown body before submitting, satisfying the strict completeness contract (ADR 007).
3. If no file changes are needed, the Empty PR Policy must still be followed, combined with marking the checkboxes.
