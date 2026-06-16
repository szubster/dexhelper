---
id: task-113-167-update-palette-persona-impl
type: TASK
title: Update palette agent prompt to define ownership of Tailwind styling
status: ACTIVE
owner_persona: coder
created_at: '2026-06-12'
updated_at: '2026-06-16'
depends_on: []
jules_session_id: '9500246549235336819'
pr_number: null
parent: story-077-113-update-palette-persona
tags:
  - styling
  - agents
research_references: []
rejection_count: 2
rejection_reason: ''
notes: ''
---

# Update palette agent prompt to define ownership of Tailwind styling

## Objective
Update `.github/agents/palette.md` to explicitly define the scheduled `palette` persona's responsibility for maintaining `src/index.css`, enforcing the tactical hardware aesthetic, and managing custom `@utility` primitives via ADR 024.

## Context
As per `story-077-113-update-palette-persona` and `ADR 024`, the Tailwind v4 migration necessitates custom primitive utilities in `src/index.css` to define the project's strict tactical hardware aesthetic (sharp edges, dashed borders, monospaced fonts). The `palette` agent must be instructed to own these primitives and aesthetic.

## Task Details
1. Update `.github/agents/palette.md` to state that the `palette` persona owns `src/index.css`.
2. Update the "Focus Areas" and/or "Boundaries" to instruct the persona to enforce the tactical hardware aesthetic.
3. Update the instructions so that the persona manages custom `@utility` primitives per ADR 024.
4. Modify the boundary "Use existing design system classes — don't add custom CSS" to reflect that `palette` CAN and SHOULD maintain custom `@utility` primitives in `src/index.css` for the design system.

## Acceptance Criteria
- [x] `.github/agents/palette.md` is updated to define `palette` ownership of `src/index.css`.
- [x] `.github/agents/palette.md` explicitly tasks the `palette` persona with enforcing the tactical hardware aesthetic and managing custom `@utility` primitives via ADR 024.

## Critical Reminders
- If you abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
