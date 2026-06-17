---
id: epic-025-033-robust-session-completion
type: EPIC
title: Implement Robust Session Completion in Heartbeat
status: COMPLETED
owner_persona: epic_planner
created_at: '2026-05-18'
updated_at: '2026-05-18'
depends_on:
  - adr-011-robust-session-completion
jules_session_id: null
pr_number: null
parent: prd-054-025-robust-session-completion
tags:
  - foundry
  - dag
  - orchestrator
  - heartbeat
rejection_count: 0
rejection_reason: ''
notes: ''
---

# EPIC: Implement Robust Session Completion in Heartbeat

## Objective
Implement the changes described in ADR 011 and PRD 054-025 to enable the `foundry-heartbeat.ts` script to properly handle Jules sessions that complete successfully without opening a Pull Request.

## Context
Under the "Empty PR" policy, agents are allowed to complete tasks without making file changes if the artifact is already correct. Sometimes, they simply finish their session (Jules API state `COMPLETED`) without opening a PR. The current heartbeat script treats these as crashed sessions and fails the node.

We need to differentiate between a silent crash and a legitimate PR-less completion. When the Jules API reports `COMPLETED` but no PR exists, we should evaluate the node according to the strict acceptance criteria validations outlined in ADR 007 and ADR 011.

## Requirements

1. Update `foundry-heartbeat.ts` to detect when a session is in the `COMPLETED` state but has no associated PR.
2. If `COMPLETED` and no PR, do not automatically mark as `FAILED`.
3. Check the node's markdown content for unchecked acceptance criteria (`- [ ]`).
4. If it's a leaf task with unchecked boxes, transition to `FAILED` with a `rejection_reason`.
5. If it's a valid late-binding parent (has children or is of type `IDEA`, `PRD`, `EPIC`, `STORY`, or a `TASK`/`RESEARCH` that has generated children) with unchecked boxes, transition to `PENDING` (or remain `READY`).
6. If all boxes are checked (or no boxes exist), transition the node gracefully to `COMPLETED`.
7. Ensure adequate logging to the TPM journal for these PR-less completions.

## Acceptance Criteria
- [x] Heartbeat script correctly parses Jules session state even without a PR.
- [x] PR-less `COMPLETED` sessions for leaf tasks with unchecked boxes are marked `FAILED`.
- [x] PR-less `COMPLETED` sessions for leaf tasks with all boxes checked are marked `COMPLETED`.
- [x] Appropriate logs are written to `.foundry/journals/tpm.md`.

## Downstream Nodes
- STORY: `.foundry/stories/story-033-066-heartbeat-prless-detection.md`
- STORY: `.foundry/stories/story-033-067-heartbeat-state-transitions.md`
- STORY: `.foundry/stories/story-033-068-heartbeat-tpm-logging.md`
