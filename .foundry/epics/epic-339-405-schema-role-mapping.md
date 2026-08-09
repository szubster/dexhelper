---
id: epic-339-405-schema-role-mapping
type: EPIC
title: 'Schema Updates: Map Roles to Pokemon Entities'
status: PENDING
owner_persona: story_owner
created_at: '2024-05-18'
updated_at: '2026-08-09'
depends_on: []
jules_session_id: '11206536485884555630'
pr_number: null
parent: prd-122-339-pokemon-themed-foundry-personas
tags:
  - foundry
  - schema
  - gamification
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Schema Updates: Map Roles to Pokemon Entities

## Objective
Update the `.foundry/docs/schema.md` to officially define the Pokemon Gen 1 narrative skin mappings for the 13 system roles and lifecycle statuses.

## Functional Requirements
- Map the 13 system roles to respective Gen 1 entities (e.g. `product_manager` -> Dragonite, `epic_planner` -> Alakazam).
- Map standard DAG statuses to Gen 1 progression mechanics (e.g., PENDING -> Pokémon Egg, COMPLETED -> Fully Evolved / Hall of Fame).
- Ensure strict adherence to Generation 1 Pokemon.

## Acceptance Criteria
- [x] Story Owner: Generate STORY node(s) for updating schema.md with role and status mappings.
- [x] Story Owner: Generate a final STORY node dedicated exclusively to Integration and E2E Verification (tagged with `e2e` or `integration`).
- [ ] story-405-408-schema-role-status-mapping
- [ ] story-405-409-schema-role-mapping-e2e
