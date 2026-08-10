---
id: task-408-412-schema-status-mapping
type: TASK
title: Update Schema.md with Status to Gen 1 Mappings
status: ACTIVE
owner_persona: coder
created_at: '2026-08-09'
updated_at: '2026-08-10'
depends_on:
  - task-408-411-schema-role-mapping
jules_session_id: '18337688729149320349'
pr_number: null
parent: story-405-408-schema-role-status-mapping
tags:
  - foundry
  - schema
  - gamification
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Update Schema.md with Status to Gen 1 Mappings

## Objective
Update the Status Enum in `.foundry/docs/schema.md` to map standard DAG statuses to Gen 1 progression mechanics.

## Technical Specifications
- Edit the `4.1 Status Enum` table in `.foundry/docs/schema.md`.
- Add the Gen 1 progression mechanics mappings to each status (e.g. `PENDING` -> Pokémon Egg, `COMPLETED` -> Fully Evolved / Hall of Fame).
- Mappings should logically follow the lifecycle stages using a Gen 1 theme.
- Ensure all standard statuses have a mapping.

## Acceptance Criteria
- [ ] Coder: Update `.foundry/docs/schema.md` with Gen 1 mappings for DAG statuses.
