---
id: task-245-255-update-palette-persona-qa
type: TASK
title: QA - Update palette agent prompt to define ownership of Tailwind styling
status: CANCELLED
owner_persona: qa
created_at: '2026-07-02'
updated_at: '2026-07-03'
depends_on:
  - task-245-254-update-palette-persona-impl
jules_session_id: null
pr_number: null
parent: story-100-245-update-palette-persona-retry
tags:
  - styling
  - agents
  - qa
research_references: []
rejection_count: 0
rejection_reason: Cancelled due to cascading cancellation from parent
notes: ''
---

# QA - Update palette agent prompt to define ownership of Tailwind styling

## Objective
Verify that `.github/agents/palette.md` has been successfully updated to define the `palette` persona's ownership of `src/index.css` and its responsibility for tactical `@utility` primitives.

## Instructions for QA
1. Review `.github/agents/palette.md`.
2. Verify the criteria listed below.
3. **CRITICAL:** If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
4. **CRITICAL:** If you must abort or permanently fail this task, you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
5. **CRITICAL:** If you submit an empty PR for this completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Verified that `.github/agents/palette.md` explicitly states the `palette` persona owns `src/index.css`.
- [ ] Verified that `.github/agents/palette.md` explicitly states the `palette` persona is tasked with enforcing the tactical hardware aesthetic and managing custom `@utility` primitives per ADR 024.
