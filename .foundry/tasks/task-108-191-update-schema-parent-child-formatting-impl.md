---
id: task-108-191-update-schema-parent-child-formatting-impl
type: TASK
title: Update schema.md with parent-child relationship formatting constraints
status: ACTIVE
owner_persona: coder
created_at: '2026-06-16'
updated_at: '2026-06-19'
depends_on: []
jules_session_id: '14643769167712650168'
pr_number: null
parent: story-071-108-update-schema-macro-node-completion
tags:
  - schema
  - orchestrator
  - documentation
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Update schema.md with parent-child relationship formatting constraints

## Context
While rule 15 was added to `schema.md` stating that macro nodes cannot complete until descendants are completed, it failed to provide the explicit formatting rules on how personas should construct these relationships.

## Objective
Update `schema.md` (specifically under rule 15 or in a new paragraph) to explicitly detail how parent-child relationships must be formatted to comply with the new rules.

## Requirements
Update rule 15 in `.foundry/docs/schema.md` to include these exact instructions:
- When creating downstream/child nodes, personas MUST append references to newly generated child nodes as unchecked tasks (`- [ ]`) directly into the markdown body of the parent node.
- You must check off your specific acceptance criteria checkboxes in the parent node WITHOUT modifying its YAML frontmatter.
- Do NOT submit an Empty PR to transition a parent node to VERIFYING (by checking off its own acceptance criteria) until ALL of its generated child nodes have transitioned to COMPLETED.
- If a parent node has incomplete children, you must leave its own acceptance criteria checkboxes unchecked to keep it in PENDING status.

## Contract / Reminders
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task, you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Intelligent Verification Protocol
This is a low-risk documentation task. The `coder` is designated to self-verify.

## Acceptance Criteria
- [x] Ensure `.foundry/docs/schema.md` rule 15 fully explains parent-child formatting constraints.
