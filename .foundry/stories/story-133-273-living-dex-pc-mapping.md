---
id: story-133-273-living-dex-pc-mapping
type: STORY
title: Living Dex PC Mapping
status: FAILED
owner_persona: tech_lead
created_at: '2026-07-06'
updated_at: '2026-07-15'
depends_on:
  - story-133-272-living-dex-ghost-tracker
jules_session_id: '1958304095104093980'
pr_number: null
parent: epic-103-133-living-dex-data-engine
tags:
  - feature
  - living-dex
research_references: []
rejection_count: 0
rejection_reason: >-
  Zombie node detected: Session 1958304095104093980 is TERMINATED without
  resolving the node
notes: ''
---

# Story: Living Dex PC Mapping

## Context
This story involves creating the mapping layer to identify which Pokémon the player currently owns, and exactly which PC Box and Slot they reside in. This allows the Living Dex Tracker to display owned Pokémon in their current positions.

## Acceptance Criteria
- [ ] Implement data mapping to identify existing Pokémon and their PC Box/Slot locations.

### SCHEMA
https://github.com/szubster/dexhelper/blob/main/.foundry/docs/schema.md
