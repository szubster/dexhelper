---
id: story-100-245-update-palette-persona-retry
type: STORY
title: Update palette agent prompt to define ownership of Tailwind styling
status: PENDING
owner_persona: tech_lead
created_at: '2026-06-29'
updated_at: '2026-07-02'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-071-100-tailwind-designer-persona-retry
tags:
  - styling
  - agents
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Update palette agent prompt to define ownership of Tailwind styling

## Objective
Update the relevant agent prompts or system configurations to explicitly define the scheduled `palette` persona's responsibility for maintaining `src/index.css`, enforcing the tactical hardware aesthetic, and managing custom `@utility` primitives.

## Scope
1. Update `.github/agents/palette.md` to clarify its ownership over `src/index.css`.
2. Explicitly define responsibility for tactical utility definitions via `@utility` per ADR 024.

## Acceptance Criteria
- [x] Agent prompt explicitly states `palette` persona owns `src/index.css`.
- [x] Palette persona is tasked with enforcing the tactical hardware aesthetic and managing custom `@utility` primitives.
- [ ] task-245-254-update-palette-persona-impl
- [ ] task-245-255-update-palette-persona-qa
