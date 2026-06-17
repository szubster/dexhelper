---
id: story-077-113-update-palette-persona
type: STORY
title: Update palette agent prompt to define ownership of Tailwind styling
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-06-11'
updated_at: '2026-06-17'
depends_on: []
jules_session_id: '15190031644849670741'
pr_number: null
parent: epic-071-077-tailwind-designer-persona
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
Update the relevant agent prompts or system configurations to explicitly define the scheduled `palette` persona's responsibility for maintaining `src/index.css`, enforcing the tactical hardware aesthetic, and managing custom `@utility` primitives.

## Scope
1. Update `.github/agents/palette.md` to clarify its ownership over `src/index.css`.
2. Explicitly define responsibility for tactical utility definitions via `@utility` per ADR 024.

## Acceptance Criteria
- [ ] Agent prompt explicitly states `palette` persona owns `src/index.css`.
- [ ] Palette persona is tasked with enforcing the tactical hardware aesthetic and managing custom `@utility` primitives.
- [ ] task-113-167-update-palette-persona-impl
- [ ] task-113-168-update-palette-persona-qa
