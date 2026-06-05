---
id: prd-054-025-robust-session-completion
type: PRD
title: Robust Handling of Session Completion in Heartbeat
status: COMPLETED
owner_persona: epic_planner
created_at: '2026-05-18'
updated_at: '2026-05-17'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-054-robust-session-completion
tags:
  - foundry
  - dag
  - orchestrator
  - heartbeat
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: Robust Handling of Session Completion in Heartbeat

## Objective
Enhance the Foundry's heartbeat script (`foundry-heartbeat.ts`) to robustly handle Jules sessions that complete successfully without opening a Pull Request (the "Empty PR" policy). This prevents falsely failing nodes and endless resurrection loops when agents legitimately make zero file changes.

## Background
Currently, the `foundry-heartbeat.ts` script checks the status of Jules sessions via the Jules API. If the API reports `COMPLETED` but no GitHub pull request is discovered (in session outputs or via fallback searches), the heartbeat treats the session as a zombie/crashed run and marks the corresponding task node as `FAILED`.
However, under the "Empty PR" policy, agents are instructed to submit an empty PR if the target artifact is already complete or no work is required. Sometimes agents simply finish their session without an explicit PR. The current logic wrongly punishes these successful empty runs.

## Requirements

1. **Differentiate Crashes from Empty Successes**:
   - The heartbeat script must distinguish between a session that crashed silently and a session that legitimately completed without generating a PR.

2. **Graceful Completion of Empty Runs**:
   - If a session state is `COMPLETED` but no PR exists, the orchestrator should gracefully allow the node to transition to `COMPLETED` instead of `FAILED`.

3. **Acceptance Criteria Validation Check (ADR 007/009)**:
   - Before allowing a PR-less `COMPLETED` session to transition the node to `COMPLETED`, the orchestrator MUST verify that the node does not violate the Acceptance Criteria rules (e.g., no unchecked `- [ ]` markdown boxes for leaf nodes).

## User Experience
- Developers and the TPM will see fewer false-positive `FAILED` nodes in the DAG Dashboard.
- Agents following the Empty PR policy will see their nodes correctly progress to `COMPLETED` without being trapped in the Resurrection Loop.

## Next Steps
- [x] Architect: Produce an Architecture Decision Record (ADR) detailing the technical implementation of this robust empty-run completion handling.


## Downstream Nodes
- ADR: `.foundry/docs/adrs/011-robust-session-completion.md`
- EPIC: `.foundry/epics/epic-025-033-robust-session-completion.md`
