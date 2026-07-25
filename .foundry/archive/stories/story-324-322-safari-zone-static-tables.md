---
id: story-324-322-safari-zone-static-tables
type: STORY
title: Safari Zone Static Data Compilation (Gen 1 & 3)
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-07-15'
updated_at: '2026-07-22'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-113-324-safari-zone-data-integration
tags:
  - backend
  - safari-zone
  - gen1
  - gen3
  - static-data
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Safari Zone Static Data Compilation (Gen 1 & 3)

## Overview
This story covers compiling the static encounter tables for the Safari Zone in Gen 1 (Red/Blue/Yellow) and Gen 3 (Ruby/Sapphire/Emerald, FireRed/LeafGreen). This static data will act as the source of truth for tracking "missing" or "uncaught" Safari Zone encounters when cross-referenced with the user's Pokédex/PC Box state.

## Technical Scope
- Compile JSON or TypeScript data structures mapping Safari Zone areas to encounter rates and available Pokémon for Gen 1 (Red/Blue/Yellow).
- Compile JSON or TypeScript data structures mapping Safari Zone areas to encounter rates and available Pokémon for Gen 3 (R/S/E and FR/LG).
- Implement necessary interfaces/types for this static data.
- Integrate the static data into the backend's data layer.

## Acceptance Criteria
- [x] Break down into Tasks
- [x] task-322-331-safari-zone-static-tables-impl
