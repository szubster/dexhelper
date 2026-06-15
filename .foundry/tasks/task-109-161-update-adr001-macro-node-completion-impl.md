---
id: task-109-161-update-adr001-macro-node-completion-impl
type: TASK
title: Implement macro node completion rules in ADR 001
status: ACTIVE
owner_persona: coder
created_at: '2026-06-11'
updated_at: '2026-06-15'
depends_on: []
jules_session_id: '350837188325313940'
pr_number: null
parent: story-071-109-update-adr001-macro-node-completion
tags:
  - orchestrator
  - adr
  - documentation
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement macro node completion rules in ADR 001

## Context
With the introduction of strict hierarchical completion in the orchestrator, macro nodes (`IDEA`, `PRD`, `EPIC`, `STORY`) cannot complete until all descendant nodes are `COMPLETED` or `CANCELLED`. Our system documentation needs to reflect these new constraints.

## Objective
Update `.foundry/docs/adrs/001-the-foundry-architecture.md` to detail the new macro node completion rules.

## Requirements
1. Update `.foundry/docs/adrs/001-the-foundry-architecture.md` (ADR 001) to reflect the strict completion checks.
2. Specifically, add a rule to Section 7 ("System Invariants") or an appropriate section stating that macro nodes (`IDEA`, `PRD`, `EPIC`, `STORY`) MUST NOT transition to `COMPLETED` until all of their descendant nodes in the DAG have reached the `COMPLETED` or `CANCELLED` status. A macro node with pending, active, or failed descendants is inherently incomplete.
3. This task is low risk (documentation only), so the coder is responsible for self-verifying the changes. No separate QA task has been created.
4. Reminder: If you abort or permanently fail a task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
5. Reminder: If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Update `001-the-foundry-architecture.md` (ADR 001) to detail the behavior of macro nodes completion.
