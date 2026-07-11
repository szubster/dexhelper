---
id: task-269-272-define-tactical-layout-utilities-impl
type: TASK
title: Implement Tactical Layout Utilities
status: READY
owner_persona: coder
created_at: '2026-07-06'
updated_at: '2026-07-06'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-123-269-define-tactical-layout-utilities
tags:
  - styling
  - tailwind
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---
# Task: Implement Tactical Layout Utilities

## Objective
Define `@utility` primitives in `src/index.css` for `tactical-panel`, `tactical-card`, and `tactical-button` based on the "tactical hardware" aesthetic described in ADR 024.

## Technical Blueprint
- Check `src/index.css` for existing `tactical-*` utilities.
- If `tactical-panel`, `tactical-card`, or `tactical-button` are missing or not matching the aesthetic, implement them in the "Tactical Primitives (@utility definitions)" section.
- **Constraints**:
  - Ensure strict adherence to the tactical hardware aesthetic: `rounded-none`, `border-dashed`, `font-mono`.
  - Use `Tailwind v4` `@utility` directive natively for automatic hover and focus variant handling.
  - Do not use inline magic numbers for `padding` inside the utilities if they vary. The utilities should consolidate structure (borders, backgrounds, fonts).
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task, you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task (e.g., they already exist), you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [x] `@utility tactical-panel` is properly defined.
- [x] `@utility tactical-card` is properly defined.
- [x] `@utility tactical-button` is properly defined.

### SCHEMA
https://github.com/szubster/dexhelper/blob/main/.foundry/docs/schema.md
