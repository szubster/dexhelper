---
id: idea-060-auditor-persona
type: IDEA
title: >-
  Introduce 'auditor' persona to verify work and possibly create new nodes based
  on status/learnings
status: COMPLETED
owner_persona: product_manager
created_at: '2026-05-20'
updated_at: '2026-05-20'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - process
  - orchestrator
  - persona
research_references: []
notes: ''
rejection_reason: ''
---

# Introduce 'auditor' Persona for Verification and Learning

## Objective
Introduce a new persona called `auditor` whose responsibility is to verify the work done after an epic, PRD, and idea are completed. Based on the status and learnings from these nodes, `auditor` can possibly create new nodes to feed back into the lifecycle.

## Requirements
- **New Persona**: Add `auditor` to the list of valid owner personas.
- **New State**: Introduce a new status or state for nodes that require verification by `auditor`. We might need a state like `VERIFYING` or `REVIEW_PENDING` to properly represent this stage in the DAG.
- **Workflow Update**: Modify the valid state transitions to accommodate the new status and the handoff to the `auditor` persona after an epic, prd, or idea node reaches completion.
- **Node Creation**: Empower `auditor` to spawn new `IDEA` or `RESEARCH` nodes based on their verification and learned insights.

## Acceptance Criteria
- [x] The `schema.md` is updated to include the new `auditor` persona.
- [x] A new state (e.g., `VERIFYING`) is added to the valid status lifecycle in `schema.md` and state diagram.
- [x] The core orchestration policies/docs are updated to document the `auditor` persona's role and responsibilities.


### SPONSORED NODES
- `.foundry/prds/prd-060-029-auditor-persona.md`
