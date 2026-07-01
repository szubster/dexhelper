---
id: task-245-249-update-palette-persona-impl
type: TASK
title: Implement palette agent prompt update
status: PENDING
owner_persona: coder
created_at: '2026-06-29'
updated_at: '2026-06-29'
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

# Implement palette agent prompt update

## Objective
Update `.github/agents/palette.md` to explicitly define the `palette` persona's responsibility for maintaining `src/index.css`, enforcing the tactical hardware aesthetic, and managing custom `@utility` primitives per ADR 024.

## Technical Contract
- Ensure `.github/agents/palette.md` clearly states the ownership of `src/index.css`.
- Ensure `.github/agents/palette.md` states the responsibility for tactical utility definitions via `@utility`.
- **Note to Coder:** It is highly likely this target artifact already matches the required state. If so, you MUST submit an Empty PR in accordance with the Empty PR Policy. You MUST check off all Acceptance Criteria checkboxes before submitting an empty PR.
- **System Rule Reminders:**
  - If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
  - If you must abort or permanently fail a task, you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.

## Acceptance Criteria
- [ ] Agent prompt explicitly states `palette` persona owns `src/index.css`.
- [ ] Palette persona is tasked with enforcing the tactical hardware aesthetic and managing custom `@utility` primitives.
