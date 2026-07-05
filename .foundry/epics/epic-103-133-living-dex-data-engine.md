---
id: epic-103-133-living-dex-data-engine
type: EPIC
title: Living Dex Data Engine & Mapping
status: ACTIVE
owner_persona: story_owner
created_at: '2026-07-04'
updated_at: '2026-07-05'
depends_on: []
jules_session_id: '208956527569696541'
pr_number: null
parent: prd-056-103-living-dex-tracker
tags:
  - feature
  - living-dex
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Epic: Living Dex Data Engine & Mapping

## Context
This epic covers the backend/data layer requirements of the Living Dex Tracker PRD. It involves creating logic to determine "ghosts" (missing Pokémon in the Dex) and map out duplicate or evolution path Pokémon from the existing PC boxes.

## Acceptance Criteria
- [ ] Determine how to track missing Pokémon in the regional/national Pokédex.
- [ ] Implement data mapping to identify existing Pokémon and their PC Box/Slot locations.
- [ ] Implement logic to detect raw materials for evolution to fill missing slots.
