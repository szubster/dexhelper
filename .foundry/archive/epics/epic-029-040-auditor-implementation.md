---
id: epic-029-040-auditor-implementation
type: EPIC
title: Auditor Persona Implementation
status: COMPLETED
owner_persona: epic_planner
created_at: '2026-05-21'
updated_at: '2026-05-21'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-060-029-auditor-persona
tags:
  - process
  - orchestrator
  - persona
research_references:
  - research-029-003-auditor-implementation-details
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Epic: Auditor Persona Implementation

## Objective
Implement the changes necessary for the new `auditor` persona and the new `VERIFYING` state across the Foundry orchestrator and heartbeat scripts.

## Scope
Based on PRD `prd-060-029-auditor-persona` and Research `research-029-003-auditor-implementation-details`:
1. **Orchestrator Updates (`.github/scripts/foundry-orchestrator.ts`)**:
   - Add `VERIFYING` to `VALID_STATUSES`.
   - Update matrix output to dynamically set `owner_persona: 'auditor'` for `VERIFYING` nodes (without modifying frontmatter).
   - Ensure `isHierarchicallyIncomplete` treats `VERIFYING` nodes as non-completed (blocking).
2. **Heartbeat Updates (`.github/scripts/foundry-heartbeat.ts`)**:
   - Update transition logic so merged PRs transition to `VERIFYING` instead of `COMPLETED` (if no unfulfilled late bindings exist).
   - Add "Pass 1" zombie detection for `VERIFYING` nodes to ensure crashed/timed-out auditor sessions revert to `VERIFYING` or `FAILED`.

## Implementation Details

We will create two specific stories for this epic:

1. **Story 1: Orchestrator `VERIFYING` State and Matrix Dispatch**
   - Update `foundry-orchestrator.ts` type definitions and matrix JSON formulation logic.

2. **Story 2: Heartbeat State Transition and Zombie Recovery**
   - Update `foundry-heartbeat.ts` PR merge state transition logic and zombie timeout recovery for the `VERIFYING` state.

## Acceptance Criteria
- [x] Story spawned for Orchestrator updates.
- [x] Story spawned for Heartbeat updates.

Spawned .foundry/stories/story-040-074-orchestrator-verifying-state.md and .foundry/stories/story-040-075-heartbeat-verifying-logic.md
