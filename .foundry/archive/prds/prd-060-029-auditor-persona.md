---
id: prd-060-029-auditor-persona
type: PRD
title: >-
  Introduce 'auditor' persona to verify work and possibly create new nodes based
  on status/learnings
status: COMPLETED
owner_persona: epic_planner
created_at: '2026-05-20'
updated_at: '2026-05-21'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-060-auditor-persona
tags:
  - process
  - orchestrator
  - persona
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: Introduce 'auditor' Persona for Verification and Learning

## Objective
Detail the technical and structural approach to introducing the `auditor` persona, as outlined in IDEA 060. The auditor will verify work after an epic, PRD, and idea are completed, and potentially create new nodes based on the status and learnings.

## Scope
- Update The Foundry master schema (`.foundry/docs/schema.md`) to register the `auditor` persona.
- Add a new state `VERIFYING` to the valid status lifecycle.
- Update core orchestration policies to document the auditor's responsibilities.

## Requirements
1. **Schema Update**: Add `auditor` to the Owner Persona Enum in `.foundry/docs/schema.md`.
2. **Status Update**: Add `VERIFYING` to the Status Enum in `.foundry/docs/schema.md`, along with state transition modifications.
3. **Core Policies**: Update `.foundry/docs/knowledge_base/agents/core_policies.md` (or a similar appropriate document) to detail how the `auditor` persona operates and when handoffs occur.

## Acceptance Criteria
- [x] ADR is created outlining the precise state machine changes to accommodate the `VERIFYING` state.
- [x] Schema document (`.foundry/docs/schema.md`) is updated.
- [x] Core policies document is updated.

Spawned `.foundry/research/research-029-003-auditor-implementation-details.md` to figure out orchestrator and prompt changes.
Depends on: `research-029-003-auditor-implementation-details`

Spawned `.foundry/epics/epic-029-040-auditor-implementation.md` to coordinate the implementation.
