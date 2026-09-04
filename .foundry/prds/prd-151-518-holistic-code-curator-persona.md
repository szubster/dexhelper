---
id: prd-151-518-holistic-code-curator-persona
type: PRD
title: Holistic Code Curator Persona
status: PENDING
owner_persona: epic_planner
created_at: '2026-09-03'
updated_at: '2026-09-04'
depends_on: []
jules_session_id: null
parent: idea-151-holistic-code-curator-persona
tags:
  - foundry
  - personas
  - refactoring
  - architecture
  - quality
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Holistic Code Curator Persona: Architectural Refactoring & Historical Backtracking

## Summary
The "curator" persona acts as the Guardian of Code Quality (mapped to Gen 1 Persian, #053). It takes a wide-angle, repository-wide view after features are implemented, seeking out architectural decay, missing test coverage, and subtle regressions across legacy features. It does not modify code directly; rather, it spawns follow-up nodes (IDEA, EPIC, STORY, TASK, RESEARCH, ADR) and loops control back to the originating IDEA for re-verification.

## Rationale
- **Isolation Risks:** Isolated task implementations frequently miss opportunities for DRY consolidation, cross-module optimization, and unified error handling.
- **Separation of Concerns:** Direct code fixes by a reviewer persona lead to scope creep. By spawning structured nodes, refactoring is properly verified and planned.
- **Re-Verification Guardrails:** Code refactors can introduce subtle regressions. Returning control to the initiating Idea node ensures re-verification by QA/Verifiers.
- **Historical Backtracking:** Ensures legacy capabilities remain sound by cross-referencing past feature requirements against new changes.

## Requirements

### 1. Persona Registration & Mapping
- A new persona named `curator` must be officially defined in the Foundry architecture.
- Must be mapped to **Persian (#053 - The Discerning Evaluator)** and associated with the **Kadabra (#064 - Inspector/Curator)** agent companion.
- The `curator` must be registered in the `owner_persona` Enum in `.foundry/docs/schema.md`.

### 2. Node Spawning Capabilities (The Curator Loop)
- The Curator must have the capability to analyze the codebase and dynamically spawn new nodes based on its findings.
- **Valid Nodes to Spawn:** `TASK` (cleanups, unit tests), `STORY`/`EPIC` (module consolidation), `IDEA`/`RESEARCH` (architectural redesign), `ADR` (new policies).
- After spawning nodes, the Curator must link dependencies and return control to the originating `IDEA` node.
- The originating `IDEA` node must enter a Re-Verification Stage to ensure that spawned refactoring tasks are verified before final closure.

### 3. Orchestrator Integration
- The `.github/scripts/foundry-orchestrator.ts` must be updated to support the post-implementation Curator trigger.
- The Orchestrator must correctly manage the control handoff back to the originating `IDEA` node for re-verification.

### 4. Historical Backtracking
- Implement a Historical Backtracking Process where the Curator reviews implemented/archived Ideas whose domain boundaries overlap with recent changes.
- Maintain a lightweight historical mapping (`.foundry/docs/architecture/idea_dependency_matrix.md` or similar metadata index) to track these overlaps.
- The Curator must spawn remediation tasks (`TASK` or `STORY`) if a legacy feature is found to be degraded, linking them to both the legacy idea and current codebase context.

### 5. Journal and Documentation
- Create a default journal directory `.foundry/journals/curator/` for the new persona.
- The Curator must maintain base instructions detailing its responsibilities, limitations (no direct code changes), and its node spawning procedures.

## Acceptance Criteria
- [x] Create EPIC nodes for the implementation of the Curator Persona.
- [x] Create EPIC nodes for updating the Orchestrator with the Curator Loop and Re-Verification Stage.
- [x] Create EPIC nodes for implementing the Historical Backtracking mechanisms.
- [ ] epic-518-530-curator-persona-implementation
- [ ] epic-518-531-orchestrator-curator-loop
- [ ] epic-518-532-historical-backtracking
- [ ] epic-518-533-curator-e2e-integration
