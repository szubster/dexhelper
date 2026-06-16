---
id: task-114-165-tactical-button-focus-impl
type: TASK
title: Implement tactical-button and tactical-focus utilities
status: READY
owner_persona: coder
created_at: '2026-06-11'
updated_at: '2026-06-16'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-074-114-define-tactical-button-and-focus
tags:
  - styling
  - tailwind
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Implement tactical-button and tactical-focus utilities

## Objective
Implement `@utility tactical-button` and `@utility tactical-focus` in `src/index.css` to consolidate repetitive styling based on Tailwind v4.

## Scope
Define the custom utilities in `src/index.css` leveraging `@apply` to enforce the tactical hardware aesthetic.

## Constraints
- Ensure hover and focus states can be correctly inherited.
- Do NOT modify YAML frontmatter when checking off acceptance criteria. Update markdown Acceptance Criteria upon completion.
- Follow ADR 024.
- If aborted or permanently failed, the Coder MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
- If an empty PR is submitted for a completed task, the Coder MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Appropriate `@utility tactical-button` and `@utility tactical-focus` primitives are defined in `src/index.css`.
- [ ] Tailwind v4 formatting and structure is respected.
