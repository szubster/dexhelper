---
id: story-077-113-update-designer-persona
type: STORY
title: Update relevant agent prompts to define designer persona's ownership of Tailwind styling
status: PENDING
owner_persona: tech_lead
created_at: '2026-06-11'
updated_at: '2026-06-11'
depends_on: []
jules_session_id: null
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

# Update relevant agent prompts to define designer persona's ownership of Tailwind styling

## Objective
Update the relevant agent prompts or system configurations to explicitly define the `designer` persona's responsibility for maintaining `src/index.css`, enforcing the tactical hardware aesthetic, and managing custom `@utility` primitives.

## Scope
1. Update `.github/agents/designer.md` or `.github/agents/palette.md` (whichever applies) to clarify its ownership over `src/index.css`.
2. Explicitly define responsibility for tactical utility definitions via `@utility` per ADR 024.

## Acceptance Criteria
- [ ] Agent prompt explicitly states `designer` persona owns `src/index.css`.
- [ ] Designer persona is tasked with enforcing the tactical hardware aesthetic and managing custom `@utility` primitives.
