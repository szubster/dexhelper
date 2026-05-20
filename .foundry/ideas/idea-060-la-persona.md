---
id: idea-060-la-persona
type: IDEA
title: "Introduce 'la' persona to verify work and possibly create new nodes based on status/learnings"
status: PENDING
owner_persona: "product_manager"
created_at: "2026-05-20"
updated_at: "2026-05-20"
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags: ["process", "orchestrator", "persona"]
research_references: []
notes: ""
---

# Introduce 'la' Persona for Verification and Learning

## Objective
Introduce a new persona called `la` whose responsibility is to verify the work done after an epic, PRD, and idea are completed. Based on the status and learnings from these nodes, `la` can possibly create new nodes to feed back into the lifecycle.

## Requirements
- **New Persona**: Add `la` to the list of valid owner personas.
- **New State**: Introduce a new status or state for nodes that require verification by `la`. We might need a state like `VERIFYING` or `REVIEW_PENDING` to properly represent this stage in the DAG.
- **Workflow Update**: Modify the valid state transitions to accommodate the new status and the handoff to the `la` persona after an epic, prd, or idea node reaches completion.
- **Node Creation**: Empower `la` to spawn new `IDEA` or `RESEARCH` nodes based on their verification and learned insights.

## Acceptance Criteria
- [ ] The `schema.md` is updated to include the new `la` persona.
- [ ] A new state (e.g., `VERIFYING`) is added to the valid status lifecycle in `schema.md` and state diagram.
- [ ] The core orchestration policies/docs are updated to document the `la` persona's role and responsibilities.
