---
id: task-245-254-update-palette-persona-impl
type: TASK
title: Update palette agent prompt to define ownership of Tailwind styling
status: READY
owner_persona: coder
created_at: '2026-07-02'
updated_at: '2026-07-02'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-100-245-update-palette-persona-retry
tags:
  - styling
  - agents
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Update palette agent prompt to define ownership of Tailwind styling

## Objective
Update `.github/agents/palette.md` to explicitly define the scheduled `palette` persona's responsibility for maintaining `src/index.css`, enforcing the tactical hardware aesthetic, and managing custom `@utility` primitives per ADR 024.

## Instructions for Coder
1. Review `.github/agents/palette.md`.
2. Ensure it explicitly states the `palette` persona owns `src/index.css`.
3. Ensure it tasks the `palette` persona with enforcing the tactical hardware aesthetic and managing custom `@utility` primitives, specifically referencing ADR 024.
4. **CRITICAL:** If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
5. **CRITICAL:** If you must abort or permanently fail this task, you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
6. **CRITICAL:** If you submit an empty PR for this completed task (e.g. changes are already present), you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] `.github/agents/palette.md` explicitly states the `palette` persona owns `src/index.css`.
- [ ] `.github/agents/palette.md` explicitly states the `palette` persona is tasked with enforcing the tactical hardware aesthetic and managing custom `@utility` primitives per ADR 024.
